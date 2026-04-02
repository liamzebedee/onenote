#include <node_api.h>
#import <Cocoa/Cocoa.h>
#import <objc/runtime.h>

#define LOG(fmt, ...) fprintf(stderr, "[drag-suppress] " fmt "\n", ##__VA_ARGS__)

static NSWindow *sTargetWindow = nil;
static NSImage *sTransparentImg = nil;

typedef NSDragOperation (*DragIMP)(id, SEL, id<NSDraggingInfo>);
typedef BOOL (*BoolIMP)(id, SEL);

static const void *kOrigEnteredKey = &kOrigEnteredKey;
static const void *kOrigUpdatedKey = &kOrigUpdatedKey;
static const void *kOrigPerformKey = &kOrigPerformKey;
static const void *kOrigWantsKey   = &kOrigWantsKey;

static DragIMP getOrigIMP(id self, const void *key) {
  Class cls = object_getClass(self);
  while (cls) {
    NSValue *val = objc_getAssociatedObject(cls, key);
    if (val) return (DragIMP)[val pointerValue];
    cls = class_getSuperclass(cls);
  }
  return NULL;
}

static void clearDragItems(id<NSDraggingInfo> sender, NSView *view) {
  __block int count = 0;
  @try {
    [sender enumerateDraggingItemsWithOptions:NSDraggingItemEnumerationClearNonenumeratedImages
      forView:view
      classes:@[[NSURL class], [NSPasteboardItem class]]
      searchOptions:@{}
      usingBlock:^(NSDraggingItem *item, NSInteger idx, BOOL *stop) {
        count++;
        [item setDraggingFrame:NSMakeRect(-9999, -9999, 1, 1) contents:sTransparentImg];
      }];
  } @catch (NSException *e) {
    LOG("clearDragItems exception: %s", e.reason.UTF8String);
  }
  static BOOL loggedCount = NO;
  if (!loggedCount) {
    LOG("enumerated %d items, pasteboard types: %s", count,
      [[[sender draggingPasteboard] types] componentsJoinedByString:@", "].UTF8String);
    loggedCount = YES;
  }
}

static NSDragOperation hookedEntered(id self, SEL _cmd, id<NSDraggingInfo> sender) {
  DragIMP orig = getOrigIMP(self, kOrigEnteredKey);
  NSDragOperation op = orig ? orig(self, _cmd, sender) : NSDragOperationNone;
  if (sTargetWindow && [(NSView *)self window] == sTargetWindow) {
    // Tell macOS we control the drag image rendering
    [sender setAnimatesToDestination:YES];
    [sender setDraggingFormation:NSDraggingFormationNone];
    clearDragItems(sender, (NSView *)self);
    LOG("hookedEntered fired on %s, op=%lu", class_getName([self class]), (unsigned long)op);
  }
  return op;
}

static NSDragOperation hookedUpdated(id self, SEL _cmd, id<NSDraggingInfo> sender) {
  // Clear BEFORE original (in case original re-renders)
  if (sTargetWindow && [(NSView *)self window] == sTargetWindow) {
    clearDragItems(sender, (NSView *)self);
  }
  DragIMP orig = getOrigIMP(self, kOrigUpdatedKey);
  NSDragOperation op = orig ? orig(self, _cmd, sender) : NSDragOperationNone;
  // Clear AFTER original too
  if (sTargetWindow && [(NSView *)self window] == sTargetWindow) {
    [sender setAnimatesToDestination:YES];
    clearDragItems(sender, (NSView *)self);
  }
  return op;
}

// wantsPeriodicDraggingUpdates must return YES for image mods to take effect
static BOOL hookedWantsPeriodic(id self, SEL _cmd) {
  return YES;
}

// ── Setup helpers ──────────────────────────────────────

static BOOL classDirectlyImplements(Class cls, SEL sel) {
  unsigned int count;
  Method *methods = class_copyMethodList(cls, &count);
  BOOL found = NO;
  for (unsigned int i = 0; i < count; i++) {
    if (method_getName(methods[i]) == sel) { found = YES; break; }
  }
  free(methods);
  return found;
}

static NSMutableSet *sSwizzledClasses = nil;

static void swizzleClass(Class cls) {
  NSString *name = NSStringFromClass(cls);
  if ([sSwizzledClasses containsObject:name]) return;
  [sSwizzledClasses addObject:name];

  // draggingEntered:
  if (classDirectlyImplements(cls, @selector(draggingEntered:))) {
    Method m = class_getInstanceMethod(cls, @selector(draggingEntered:));
    DragIMP orig = (DragIMP)method_getImplementation(m);
    objc_setAssociatedObject(cls, kOrigEnteredKey,
      [NSValue valueWithPointer:(void *)orig], OBJC_ASSOCIATION_RETAIN);
    method_setImplementation(m, (IMP)hookedEntered);
    LOG("swizzled draggingEntered: on %s", class_getName(cls));
  }

  // draggingUpdated:
  if (classDirectlyImplements(cls, @selector(draggingUpdated:))) {
    Method m = class_getInstanceMethod(cls, @selector(draggingUpdated:));
    DragIMP orig = (DragIMP)method_getImplementation(m);
    objc_setAssociatedObject(cls, kOrigUpdatedKey,
      [NSValue valueWithPointer:(void *)orig], OBJC_ASSOCIATION_RETAIN);
    method_setImplementation(m, (IMP)hookedUpdated);
    LOG("swizzled draggingUpdated: on %s", class_getName(cls));
  }

  // wantsPeriodicDraggingUpdates — add or replace
  Method wm = class_getInstanceMethod(cls, @selector(wantsPeriodicDraggingUpdates));
  if (wm) {
    method_setImplementation(wm, (IMP)hookedWantsPeriodic);
  } else {
    class_addMethod(cls, @selector(wantsPeriodicDraggingUpdates),
      (IMP)hookedWantsPeriodic, "B@:");
  }
  LOG("set wantsPeriodicDraggingUpdates=YES on %s", class_getName(cls));
}

static void swizzleTree(NSView *v) {
  if (classDirectlyImplements([v class], @selector(draggingEntered:)) ||
      classDirectlyImplements([v class], @selector(draggingUpdated:))) {
    swizzleClass([v class]);
  }
  for (NSView *c in v.subviews) swizzleTree(c);
}

// ── N-API entry ────────────────────────────────────────

static napi_value SuppressDragImage(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value args[1];
  napi_get_cb_info(env, info, &argc, args, NULL, NULL);

  void *data; size_t len;
  napi_get_buffer_info(env, args[0], &data, &len);
  NSView *nativeView = (__bridge NSView *)(*((void **)data));
  NSWindow *win = [nativeView window];
  if (!win) { napi_value r; napi_get_boolean(env, false, &r); return r; }

  sTargetWindow = win;
  if (!sSwizzledClasses) sSwizzledClasses = [NSMutableSet new];

  if (!sTransparentImg) {
    sTransparentImg = [[NSImage alloc] initWithSize:NSMakeSize(1, 1)];
    [sTransparentImg lockFocus];
    [[NSColor clearColor] set];
    NSRectFill(NSMakeRect(0, 0, 1, 1));
    [sTransparentImg unlockFocus];
  }

  const char *names[] = {
    "RenderWidgetHostViewCocoa", "BridgedContentView",
    "WebContentsViewCocoa", "ElectronRenderWidgetHostView", NULL
  };
  for (int i = 0; names[i]; i++) {
    Class cls = objc_getClass(names[i]);
    if (cls) swizzleClass(cls);
  }
  swizzleTree([win contentView]);

  LOG("swizzled %lu classes", (unsigned long)sSwizzledClasses.count);
  napi_value r; napi_get_boolean(env, true, &r); return r;
}

static napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, "suppressDragImage", NAPI_AUTO_LENGTH, SuppressDragImage, NULL, &fn);
  napi_set_named_property(env, exports, "suppressDragImage", fn);
  return exports;
}

NAPI_MODULE(suppress_drag_image, Init)
