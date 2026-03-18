{
  "targets": [{
    "target_name": "suppress_drag_image",
    "sources": ["suppress_drag_image.mm"],
    "conditions": [
      ["OS=='mac'", {
        "xcode_settings": {
          "CLANG_ENABLE_OBJC_ARC": "YES",
          "OTHER_LDFLAGS": ["-framework", "Cocoa"]
        }
      }]
    ]
  }]
}
