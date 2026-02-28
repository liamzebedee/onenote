var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/preact/dist/preact.module.js
function w(n2, l2) {
  for (var u2 in l2)
    n2[u2] = l2[u2];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l2, u2, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u2)
    o2 == "key" ? i2 = u2[o2] : o2 == "ref" ? r2 = u2[o2] : e2[o2] = u2[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), typeof l2 == "function" && l2.defaultProps != null)
    for (o2 in l2.defaultProps)
      e2[o2] === undefined && (e2[o2] = l2.defaultProps[o2]);
  return m(l2, e2, i2, r2, null);
}
function m(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: undefined, __v: o2 == null ? ++u : o2, __i: -1, __u: 0 };
  return o2 == null && l.vnode != null && l.vnode(e2), e2;
}
function k(n2) {
  return n2.children;
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function S(n2, l2) {
  if (l2 == null)
    return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u2;l2 < n2.__k.length; l2++)
    if ((u2 = n2.__k[l2]) != null && u2.__e != null)
      return u2.__e;
  return typeof n2.type == "function" ? S(n2) : null;
}
function C(n2) {
  if (n2.__P && n2.__d) {
    var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = w({}, u2);
    o2.__v = u2.__v + 1, l.vnode && l.vnode(o2), z(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, t2 == null ? S(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, V(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && M(o2);
  }
}
function M(n2) {
  if ((n2 = n2.__) != null && n2.__c != null)
    return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (l2 != null && l2.__e != null)
        return n2.__e = n2.__c.base = l2.__e;
    }), M(n2);
}
function $(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !I.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(I);
}
function I() {
  for (var n2, l2 = 1;i.length; )
    i.length > l2 && i.sort(e), n2 = i.shift(), l2 = i.length, C(n2);
  I.__r = 0;
}
function P(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, y2, d2, w2, g2, _2, m2 = t2 && t2.__k || v, b = l2.length;
  for (f2 = A(u2, l2, m2, f2, b), a2 = 0;a2 < b; a2++)
    (y2 = u2.__k[a2]) != null && (h2 = y2.__i != -1 && m2[y2.__i] || p, y2.__i = a2, g2 = z(n2, y2, h2, i2, r2, o2, e2, f2, c2, s2), d2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && D(h2.ref, null, y2), s2.push(y2.ref, y2.__c || d2, y2)), w2 == null && d2 != null && (w2 = d2), (_2 = !!(4 & y2.__u)) || h2.__k === y2.__k ? f2 = H(y2, f2, n2, _2) : typeof y2.type == "function" && g2 !== undefined ? f2 = g2 : d2 && (f2 = d2.nextSibling), y2.__u &= -7);
  return u2.__e = w2, f2;
}
function A(n2, l2, u2, t2, i2) {
  var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0;r2 < i2; r2++)
    (o2 = l2[r2]) != null && typeof o2 != "boolean" && typeof o2 != "function" ? (typeof o2 == "string" || typeof o2 == "number" || typeof o2 == "bigint" || o2.constructor == String ? o2 = n2.__k[r2] = m(null, o2, null, null, null) : d(o2) ? o2 = n2.__k[r2] = m(k, { children: o2 }, null, null, null) : o2.constructor === undefined && o2.__b > 0 ? o2 = n2.__k[r2] = m(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, (c2 = o2.__i = T(o2, u2, f2, a2)) != -1 && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), e2 == null || e2.__v == null ? (c2 == -1 && (i2 > s2 ? h2-- : i2 < s2 && h2++), typeof o2.type != "function" && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2)
    for (r2 = 0;r2 < s2; r2++)
      (e2 = u2[r2]) != null && (2 & e2.__u) == 0 && (e2.__e == t2 && (t2 = S(e2)), E(e2, e2));
  return t2;
}
function H(n2, l2, u2, t2) {
  var i2, r2;
  if (typeof n2.type == "function") {
    for (i2 = n2.__k, r2 = 0;i2 && r2 < i2.length; r2++)
      i2[r2] && (i2[r2].__ = n2, l2 = H(i2[r2], l2, u2, t2));
    return l2;
  }
  n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (l2 != null && l2.nodeType == 8);
  return l2;
}
function T(n2, l2, u2, t2) {
  var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = c2 != null && (2 & c2.__u) == 0;
  if (c2 === null && e2 == null || s2 && e2 == c2.key && f2 == c2.type)
    return u2;
  if (t2 > (s2 ? 1 : 0)) {
    for (i2 = u2 - 1, r2 = u2 + 1;i2 >= 0 || r2 < l2.length; )
      if ((c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) != null && (2 & c2.__u) == 0 && e2 == c2.key && f2 == c2.type)
        return o2;
  }
  return -1;
}
function j(n2, l2, u2) {
  l2[0] == "-" ? n2.setProperty(l2, u2 == null ? "" : u2) : n2[l2] = u2 == null ? "" : typeof u2 != "number" || y.test(l2) ? u2 : u2 + "px";
}
function F(n2, l2, u2, t2, i2) {
  var r2, o2;
  n:
    if (l2 == "style")
      if (typeof u2 == "string")
        n2.style.cssText = u2;
      else {
        if (typeof t2 == "string" && (n2.style.cssText = t2 = ""), t2)
          for (l2 in t2)
            u2 && l2 in u2 || j(n2.style, l2, "");
        if (u2)
          for (l2 in u2)
            t2 && u2[l2] == t2[l2] || j(n2.style, l2, u2[l2]);
      }
    else if (l2[0] == "o" && l2[1] == "n")
      r2 = l2 != (l2 = l2.replace(f, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || l2 == "onFocusOut" || l2 == "onFocusIn" ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c, n2.addEventListener(l2, r2 ? a : s, r2)) : n2.removeEventListener(l2, r2 ? a : s, r2);
    else {
      if (i2 == "http://www.w3.org/2000/svg")
        l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (l2 != "width" && l2 != "height" && l2 != "href" && l2 != "list" && l2 != "form" && l2 != "tabIndex" && l2 != "download" && l2 != "rowSpan" && l2 != "colSpan" && l2 != "role" && l2 != "popover" && l2 in n2)
        try {
          n2[l2] = u2 == null ? "" : u2;
          break n;
        } catch (n3) {}
      typeof u2 == "function" || (u2 == null || u2 === false && l2[4] != "-" ? n2.removeAttribute(l2) : n2.setAttribute(l2, l2 == "popover" && u2 == 1 ? "" : u2));
    }
}
function O(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (u2.t == null)
        u2.t = c++;
      else if (u2.t < t2.u)
        return;
      return t2(l.event ? l.event(u2) : u2);
    }
  };
}
function z(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, p2, y2, _2, m2, b, S2, C2, M2, $2, I2, A2, H2, L, T2 = u2.type;
  if (u2.constructor !== undefined)
    return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l.__b) && a2(u2);
  n:
    if (typeof T2 == "function")
      try {
        if (S2 = u2.props, C2 = "prototype" in T2 && T2.prototype.render, M2 = (a2 = T2.contextType) && i2[a2.__c], $2 = a2 ? M2 ? M2.props.value : a2.__ : i2, t2.__c ? b = (h2 = u2.__c = t2.__c).__ = h2.__E : (C2 ? u2.__c = h2 = new T2(S2, $2) : (u2.__c = h2 = new x(S2, $2), h2.constructor = T2, h2.render = G), M2 && M2.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), C2 && h2.__s == null && (h2.__s = h2.state), C2 && T2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = w({}, h2.__s)), w(h2.__s, T2.getDerivedStateFromProps(S2, h2.__s))), y2 = h2.props, _2 = h2.state, h2.__v = u2, p2)
          C2 && T2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), C2 && h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
        else {
          if (C2 && T2.getDerivedStateFromProps == null && S2 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(S2, $2), u2.__v == t2.__v || !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(S2, h2.__s, $2) === false) {
            u2.__v != t2.__v && (h2.props = S2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
              n3 && (n3.__ = u2);
            }), v.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
            break n;
          }
          h2.componentWillUpdate != null && h2.componentWillUpdate(S2, h2.__s, $2), C2 && h2.componentDidUpdate != null && h2.__h.push(function() {
            h2.componentDidUpdate(y2, _2, m2);
          });
        }
        if (h2.context = $2, h2.props = S2, h2.__P = n2, h2.__e = false, I2 = l.__r, A2 = 0, C2)
          h2.state = h2.__s, h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), v.push.apply(h2.__h, h2._sb), h2._sb = [];
        else
          do {
            h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
          } while (h2.__d && ++A2 < 25);
        h2.state = h2.__s, h2.getChildContext != null && (i2 = w(w({}, i2), h2.getChildContext())), C2 && !p2 && h2.getSnapshotBeforeUpdate != null && (m2 = h2.getSnapshotBeforeUpdate(y2, _2)), H2 = a2 != null && a2.type === k && a2.key == null ? q(a2.props.children) : a2, f2 = P(n2, d(H2) ? H2 : [H2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), b && (h2.__E = h2.__ = null);
      } catch (n3) {
        if (u2.__v = null, c2 || o2 != null)
          if (n3.then) {
            for (u2.__u |= c2 ? 160 : 128;f2 && f2.nodeType == 8 && f2.nextSibling; )
              f2 = f2.nextSibling;
            o2[o2.indexOf(f2)] = null, u2.__e = f2;
          } else {
            for (L = o2.length;L--; )
              g(o2[L]);
            N(u2);
          }
        else
          u2.__e = t2.__e, u2.__k = t2.__k, n3.then || N(u2);
        l.__e(n3, u2, t2);
      }
    else
      o2 == null && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = B(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
  return (a2 = l.diffed) && a2(u2), 128 & u2.__u ? undefined : f2;
}
function N(n2) {
  n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(N));
}
function V(n2, u2, t2) {
  for (var i2 = 0;i2 < t2.length; i2++)
    D(t2[i2], t2[++i2], t2[++i2]);
  l.__c && l.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l.__e(n3, u3.__v);
    }
  });
}
function q(n2) {
  return typeof n2 != "object" || n2 == null || n2.__b > 0 ? n2 : d(n2) ? n2.map(q) : w({}, n2);
}
function B(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, v2, y2, w2, _2, m2, b = i2.props || p, k2 = t2.props, x2 = t2.type;
  if (x2 == "svg" ? o2 = "http://www.w3.org/2000/svg" : x2 == "math" ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), e2 != null) {
    for (a2 = 0;a2 < e2.length; a2++)
      if ((w2 = e2[a2]) && "setAttribute" in w2 == !!x2 && (x2 ? w2.localName == x2 : w2.nodeType == 3)) {
        u2 = w2, e2[a2] = null;
        break;
      }
  }
  if (u2 == null) {
    if (x2 == null)
      return document.createTextNode(k2);
    u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l.__m && l.__m(t2, e2), c2 = false), e2 = null;
  }
  if (x2 == null)
    b === k2 || c2 && u2.data == k2 || (u2.data = k2);
  else {
    if (e2 = e2 && n.call(u2.childNodes), !c2 && e2 != null)
      for (b = {}, a2 = 0;a2 < u2.attributes.length; a2++)
        b[(w2 = u2.attributes[a2]).name] = w2.value;
    for (a2 in b)
      w2 = b[a2], a2 == "dangerouslySetInnerHTML" ? v2 = w2 : a2 == "children" || (a2 in k2) || a2 == "value" && ("defaultValue" in k2) || a2 == "checked" && ("defaultChecked" in k2) || F(u2, a2, null, w2, o2);
    for (a2 in k2)
      w2 = k2[a2], a2 == "children" ? y2 = w2 : a2 == "dangerouslySetInnerHTML" ? h2 = w2 : a2 == "value" ? _2 = w2 : a2 == "checked" ? m2 = w2 : c2 && typeof w2 != "function" || b[a2] === w2 || F(u2, a2, w2, b[a2], o2);
    if (h2)
      c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
    else if (v2 && (u2.innerHTML = ""), P(t2.type == "template" ? u2.content : u2, d(y2) ? y2 : [y2], t2, i2, r2, x2 == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), e2 != null)
      for (a2 = e2.length;a2--; )
        g(e2[a2]);
    c2 || (a2 = "value", x2 == "progress" && _2 == null ? u2.removeAttribute("value") : _2 != null && (_2 !== u2[a2] || x2 == "progress" && !_2 || x2 == "option" && _2 != b[a2]) && F(u2, a2, _2, b[a2], o2), a2 = "checked", m2 != null && m2 != u2[a2] && F(u2, a2, m2, b[a2], o2));
  }
  return u2;
}
function D(n2, u2, t2) {
  try {
    if (typeof n2 == "function") {
      var i2 = typeof n2.__u == "function";
      i2 && n2.__u(), i2 && u2 == null || (n2.__u = n2(u2));
    } else
      n2.current = u2;
  } catch (n3) {
    l.__e(n3, t2);
  }
}
function E(n2, u2, t2) {
  var i2, r2;
  if (l.unmount && l.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || D(i2, null, u2)), (i2 = n2.__c) != null) {
    if (i2.componentWillUnmount)
      try {
        i2.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u2);
      }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k)
    for (r2 = 0;r2 < i2.length; r2++)
      i2[r2] && E(i2[r2], u2, t2 || typeof n2.type != "function");
  t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = undefined;
}
function G(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function J(u2, t2, i2) {
  var r2, o2, e2, f2;
  t2 == document && (t2 = document.documentElement), l.__ && l.__(u2, t2), o2 = (r2 = typeof i2 == "function") ? null : i2 && i2.__k || t2.__k, e2 = [], f2 = [], z(t2, u2 = (!r2 && i2 || t2).__k = _(k, null, [u2]), o2 || p, p, t2.namespaceURI, !r2 && i2 ? [i2] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i2 ? i2 : o2 ? o2.__e : t2.firstChild, r2, f2), V(e2, u2, f2);
}
function R(n2) {
  function l2(n3) {
    var u2, t2;
    return this.getChildContext || (u2 = new Set, (t2 = {})[l2.__c] = this, this.getChildContext = function() {
      return t2;
    }, this.componentWillUnmount = function() {
      u2 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u2.forEach(function(n5) {
        n5.__e = true, $(n5);
      });
    }, this.sub = function(n4) {
      u2.add(n4);
      var l3 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u2 && u2.delete(n4), l3 && l3.call(n4);
      };
    }), n3.children;
  }
  return l2.__c = "__cC" + h++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
    return n3.children(l3);
  }).contextType = l2, l2;
}
var n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, d;
var init_preact_module = __esm(() => {
  p = {};
  v = [];
  y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  d = Array.isArray;
  n = v.slice, l = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2;l2 = l2.__; )
      if ((i2 = l2.__c) && !i2.__)
        try {
          if ((r2 = i2.constructor) && r2.getDerivedStateFromError != null && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), i2.componentDidCatch != null && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2)
            return i2.__E = i2;
        } catch (l3) {
          n2 = l3;
        }
    throw n2;
  } }, u = 0, t = function(n2) {
    return n2 != null && n2.constructor === undefined;
  }, x.prototype.setState = function(n2, l2) {
    var u2;
    u2 = this.__s != null && this.__s != this.state ? this.__s : this.__s = w({}, this.state), typeof n2 == "function" && (n2 = n2(w({}, u2), this.props)), n2 && w(u2, n2), n2 != null && this.__v && (l2 && this._sb.push(l2), $(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), $(this));
  }, x.prototype.render = k, i = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, I.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;
});

// node_modules/preact/hooks/dist/hooks.module.js
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u3, i3) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(undefined, u3), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f3 = function(n3, t3, r3) {
      if (!o3.__c.__H)
        return true;
      var u4 = o3.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u4.every(function(n4) {
        return !n4.__N;
      }))
        return !c3 || c3.call(this, n3, t3, r3);
      var i4 = o3.__c.props !== n3;
      return u4.some(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = undefined, t4 !== n4.__[0] && (i4 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i4;
    };
    r2.__f = true;
    var { shouldComponentUpdate: c3, componentWillUpdate: e3 } = r2;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u4 = c3;
        c3 = undefined, f3(n3, t3, r3), c3 = u4;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f3;
  }
  return o3.__N || o3.__;
}
function y2(n2, u3) {
  var i3 = p2(t2++, 3);
  !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
}
function A2(n2) {
  return o2 = 5, T2(function() {
    return { current: n2 };
  }, []);
}
function T2(n2, r3) {
  var u3 = p2(t2++, 7);
  return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
}
function q2(n2, t3) {
  return o2 = 8, T2(function() {
    return n2;
  }, t3);
}
function x2(n2) {
  var u3 = r2.context[n2.__c], i3 = p2(t2++, 9);
  return i3.c = n2, u3 ? (i3.__ == null && (i3.__ = true, u3.sub(r2)), u3.props.value) : n2.__;
}
function j2() {
  for (var n2;n2 = f2.shift(); ) {
    var t3 = n2.__H;
    if (n2.__P && t3)
      try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
  }
}
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u3 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u3 = n2.__c;
  typeof u3 == "function" && (n2.__c = undefined, u3()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return typeof t3 == "function" ? t3(n2) : t3;
}
var t2, r2, u2, i2, o2 = 0, f2, c2, e2, a2, v2, l2, m2, s2, k2;
var init_hooks_module = __esm(() => {
  init_preact_module();
  f2 = [];
  c2 = l;
  e2 = c2.__b;
  a2 = c2.__r;
  v2 = c2.diffed;
  l2 = c2.__c;
  m2 = c2.unmount;
  s2 = c2.__;
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = undefined;
    })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (f2.push(t3) !== 1 && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = undefined;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = undefined, t3 && c2.__e(t3, r3.__v));
  };
  k2 = typeof requestAnimationFrame == "function";
});

// node_modules/@preact/signals-core/dist/signals-core.module.js
function t3() {
  if (!(s3 > 1)) {
    var i4, t4 = false;
    while (h3 !== undefined) {
      var n2 = h3;
      h3 = undefined;
      v3++;
      while (n2 !== undefined) {
        var r3 = n2.o;
        n2.o = undefined;
        n2.f &= -3;
        if (!(8 & n2.f) && a3(n2))
          try {
            n2.c();
          } catch (n3) {
            if (!t4) {
              i4 = n3;
              t4 = true;
            }
          }
        n2 = r3;
      }
    }
    v3 = 0;
    s3--;
    if (t4)
      throw i4;
  } else
    s3--;
}
function o3(i4) {
  var t4 = r3;
  r3 = undefined;
  try {
    return i4();
  } finally {
    r3 = t4;
  }
}
function e3(i4) {
  if (r3 !== undefined) {
    var t4 = i4.n;
    if (t4 === undefined || t4.t !== r3) {
      t4 = { i: 0, S: i4, p: r3.s, n: undefined, t: r3, e: undefined, x: undefined, r: t4 };
      if (r3.s !== undefined)
        r3.s.n = t4;
      r3.s = t4;
      i4.n = t4;
      if (32 & r3.f)
        i4.S(t4);
      return t4;
    } else if (t4.i === -1) {
      t4.i = 0;
      if (t4.n !== undefined) {
        t4.n.p = t4.p;
        if (t4.p !== undefined)
          t4.p.n = t4.n;
        t4.p = r3.s;
        t4.n = undefined;
        r3.s.n = t4;
        r3.s = t4;
      }
      return t4;
    }
  }
}
function d3(i4, t4) {
  this.v = i4;
  this.i = 0;
  this.n = undefined;
  this.t = undefined;
  this.W = t4 == null ? undefined : t4.watched;
  this.Z = t4 == null ? undefined : t4.unwatched;
  this.name = t4 == null ? undefined : t4.name;
}
function c3(i4, t4) {
  return new d3(i4, t4);
}
function a3(i4) {
  for (var t4 = i4.s;t4 !== undefined; t4 = t4.n)
    if (t4.S.i !== t4.i || !t4.S.h() || t4.S.i !== t4.i)
      return true;
  return false;
}
function l3(i4) {
  for (var t4 = i4.s;t4 !== undefined; t4 = t4.n) {
    var n2 = t4.S.n;
    if (n2 !== undefined)
      t4.r = n2;
    t4.S.n = t4;
    t4.i = -1;
    if (t4.n === undefined) {
      i4.s = t4;
      break;
    }
  }
}
function y3(i4) {
  var t4 = i4.s, n2 = undefined;
  while (t4 !== undefined) {
    var r4 = t4.p;
    if (t4.i === -1) {
      t4.S.U(t4);
      if (r4 !== undefined)
        r4.n = t4.n;
      if (t4.n !== undefined)
        t4.n.p = r4;
    } else
      n2 = t4;
    t4.S.n = t4.r;
    if (t4.r !== undefined)
      t4.r = undefined;
    t4 = r4;
  }
  i4.s = n2;
}
function w3(i4, t4) {
  d3.call(this, undefined);
  this.x = i4;
  this.s = undefined;
  this.g = u3 - 1;
  this.f = 4;
  this.W = t4 == null ? undefined : t4.watched;
  this.Z = t4 == null ? undefined : t4.unwatched;
  this.name = t4 == null ? undefined : t4.name;
}
function b(i4, t4) {
  return new w3(i4, t4);
}
function _2(i4) {
  var n2 = i4.u;
  i4.u = undefined;
  if (typeof n2 == "function") {
    s3++;
    var o4 = r3;
    r3 = undefined;
    try {
      n2();
    } catch (t4) {
      i4.f &= -2;
      i4.f |= 8;
      p3(i4);
      throw t4;
    } finally {
      r3 = o4;
      t3();
    }
  }
}
function p3(i4) {
  for (var t4 = i4.s;t4 !== undefined; t4 = t4.n)
    t4.S.U(t4);
  i4.x = undefined;
  i4.s = undefined;
  _2(i4);
}
function g2(i4) {
  if (r3 !== this)
    throw new Error("Out-of-order effect");
  y3(this);
  r3 = i4;
  this.f &= -2;
  if (8 & this.f)
    p3(this);
  t3();
}
function S2(i4, t4) {
  this.x = i4;
  this.u = undefined;
  this.s = undefined;
  this.o = undefined;
  this.f = 32;
  this.name = t4 == null ? undefined : t4.name;
  if (f3)
    f3.push(this);
}
function m3(i4, t4) {
  var n2 = new S2(i4, t4);
  try {
    n2.c();
  } catch (i5) {
    n2.d();
    throw i5;
  }
  var r4 = n2.d.bind(n2);
  r4[Symbol.dispose] = r4;
  return r4;
}
var i3, r3 = undefined, f3, h3 = undefined, s3 = 0, v3 = 0, u3 = 0;
var init_signals_core_module = __esm(() => {
  i3 = Symbol.for("preact-signals");
  d3.prototype.brand = i3;
  d3.prototype.h = function() {
    return true;
  };
  d3.prototype.S = function(i4) {
    var t4 = this, n2 = this.t;
    if (n2 !== i4 && i4.e === undefined) {
      i4.x = n2;
      this.t = i4;
      if (n2 !== undefined)
        n2.e = i4;
      else
        o3(function() {
          var i5;
          (i5 = t4.W) == null || i5.call(t4);
        });
    }
  };
  d3.prototype.U = function(i4) {
    var t4 = this;
    if (this.t !== undefined) {
      var { e: n2, x: r4 } = i4;
      if (n2 !== undefined) {
        n2.x = r4;
        i4.e = undefined;
      }
      if (r4 !== undefined) {
        r4.e = n2;
        i4.x = undefined;
      }
      if (i4 === this.t) {
        this.t = r4;
        if (r4 === undefined)
          o3(function() {
            var i5;
            (i5 = t4.Z) == null || i5.call(t4);
          });
      }
    }
  };
  d3.prototype.subscribe = function(i4) {
    var t4 = this;
    return m3(function() {
      var n2 = t4.value, o4 = r3;
      r3 = undefined;
      try {
        i4(n2);
      } finally {
        r3 = o4;
      }
    }, { name: "sub" });
  };
  d3.prototype.valueOf = function() {
    return this.value;
  };
  d3.prototype.toString = function() {
    return this.value + "";
  };
  d3.prototype.toJSON = function() {
    return this.value;
  };
  d3.prototype.peek = function() {
    var i4 = r3;
    r3 = undefined;
    try {
      return this.value;
    } finally {
      r3 = i4;
    }
  };
  Object.defineProperty(d3.prototype, "value", { get: function() {
    var i4 = e3(this);
    if (i4 !== undefined)
      i4.i = this.i;
    return this.v;
  }, set: function(i4) {
    if (i4 !== this.v) {
      if (v3 > 100)
        throw new Error("Cycle detected");
      this.v = i4;
      this.i++;
      u3++;
      s3++;
      try {
        for (var n2 = this.t;n2 !== undefined; n2 = n2.x)
          n2.t.N();
      } finally {
        t3();
      }
    }
  } });
  w3.prototype = new d3;
  w3.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f)
      return false;
    if ((36 & this.f) == 32)
      return true;
    this.f &= -5;
    if (this.g === u3)
      return true;
    this.g = u3;
    this.f |= 1;
    if (this.i > 0 && !a3(this)) {
      this.f &= -2;
      return true;
    }
    var i4 = r3;
    try {
      l3(this);
      r3 = this;
      var t4 = this.x();
      if (16 & this.f || this.v !== t4 || this.i === 0) {
        this.v = t4;
        this.f &= -17;
        this.i++;
      }
    } catch (i5) {
      this.v = i5;
      this.f |= 16;
      this.i++;
    }
    r3 = i4;
    y3(this);
    this.f &= -2;
    return true;
  };
  w3.prototype.S = function(i4) {
    if (this.t === undefined) {
      this.f |= 36;
      for (var t4 = this.s;t4 !== undefined; t4 = t4.n)
        t4.S.S(t4);
    }
    d3.prototype.S.call(this, i4);
  };
  w3.prototype.U = function(i4) {
    if (this.t !== undefined) {
      d3.prototype.U.call(this, i4);
      if (this.t === undefined) {
        this.f &= -33;
        for (var t4 = this.s;t4 !== undefined; t4 = t4.n)
          t4.S.U(t4);
      }
    }
  };
  w3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i4 = this.t;i4 !== undefined; i4 = i4.x)
        i4.t.N();
    }
  };
  Object.defineProperty(w3.prototype, "value", { get: function() {
    if (1 & this.f)
      throw new Error("Cycle detected");
    var i4 = e3(this);
    this.h();
    if (i4 !== undefined)
      i4.i = this.i;
    if (16 & this.f)
      throw this.v;
    return this.v;
  } });
  S2.prototype.c = function() {
    var i4 = this.S();
    try {
      if (8 & this.f)
        return;
      if (this.x === undefined)
        return;
      var t4 = this.x();
      if (typeof t4 == "function")
        this.u = t4;
    } finally {
      i4();
    }
  };
  S2.prototype.S = function() {
    if (1 & this.f)
      throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _2(this);
    l3(this);
    s3++;
    var i4 = r3;
    r3 = this;
    return g2.bind(this, i4);
  };
  S2.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h3;
      h3 = this;
    }
  };
  S2.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f))
      p3(this);
  };
  S2.prototype.dispose = function() {
    this.d();
  };
});

// node_modules/@preact/signals/dist/signals.module.js
function l4(i4, n3) {
  l[i4] = n3.bind(null, l[i4] || function() {});
}
function d4(i4) {
  if (s4) {
    var r4 = s4;
    s4 = undefined;
    r4();
  }
  s4 = i4 && i4.S();
}
function h4(i4) {
  var r4 = this, f4 = i4.data, o4 = useSignal(f4);
  o4.value = f4;
  var e4 = T2(function() {
    var i5 = r4.__v;
    while (i5 = i5.__)
      if (i5.__c) {
        i5.__c.__$f |= 4;
        break;
      }
    r4.__$u.c = function() {
      var i6, t4 = r4.__$u.S(), f5 = e4.value;
      t4();
      if (t(f5) || ((i6 = r4.base) == null ? undefined : i6.nodeType) !== 3) {
        r4.__$f |= 1;
        r4.setState({});
      } else
        r4.base.data = f5;
    };
    return b(function() {
      var i6 = o4.value.value;
      return i6 === 0 ? 0 : i6 === true ? "" : i6 || "";
    });
  }, []);
  return e4.value;
}
function p4(i4, r4, n3, t4) {
  var f4 = r4 in i4 && i4.ownerSVGElement === undefined, o4 = c3(n3);
  return { o: function(i5, r5) {
    o4.value = i5;
    t4 = r5;
  }, d: m3(function() {
    var n4 = o4.value.value;
    if (t4[r4] !== n4) {
      t4[r4] = n4;
      if (f4)
        i4[r4] = n4;
      else if (n4)
        i4.setAttribute(r4, n4);
      else
        i4.removeAttribute(r4);
    }
  }) };
}
function useSignal(i4) {
  return T2(function() {
    return c3(i4);
  }, []);
}
var v4, s4;
var init_signals_module = __esm(() => {
  init_preact_module();
  init_hooks_module();
  init_signals_core_module();
  init_signals_core_module();
  h4.displayName = "_st";
  Object.defineProperties(d3.prototype, { constructor: { configurable: true, value: undefined }, type: { configurable: true, value: h4 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  l4("__b", function(i4, r4) {
    if (typeof r4.type == "string") {
      var n3, t4 = r4.props;
      for (var f4 in t4)
        if (f4 !== "children") {
          var o4 = t4[f4];
          if (o4 instanceof d3) {
            if (!n3)
              r4.__np = n3 = {};
            n3[f4] = o4;
            t4[f4] = o4.peek();
          }
        }
    }
    i4(r4);
  });
  l4("__r", function(i4, r4) {
    i4(r4);
    d4();
    var n3, t4 = r4.__c;
    if (t4) {
      t4.__$f &= -2;
      if ((n3 = t4.__$u) === undefined)
        t4.__$u = n3 = function(i5) {
          var r5;
          m3(function() {
            r5 = this;
          });
          r5.c = function() {
            t4.__$f |= 1;
            t4.setState({});
          };
          return r5;
        }();
    }
    v4 = t4;
    d4(n3);
  });
  l4("__e", function(i4, r4, n3, t4) {
    d4();
    v4 = undefined;
    i4(r4, n3, t4);
  });
  l4("diffed", function(i4, r4) {
    d4();
    v4 = undefined;
    var n3;
    if (typeof r4.type == "string" && (n3 = r4.__e)) {
      var { __np: t4, props: f4 } = r4;
      if (t4) {
        var o4 = n3.U;
        if (o4)
          for (var e4 in o4) {
            var u4 = o4[e4];
            if (u4 !== undefined && !(e4 in t4)) {
              u4.d();
              o4[e4] = undefined;
            }
          }
        else
          n3.U = o4 = {};
        for (var a4 in t4) {
          var c4 = o4[a4], s5 = t4[a4];
          if (c4 === undefined) {
            c4 = p4(n3, a4, s5, f4);
            o4[a4] = c4;
          } else
            c4.o(s5, f4);
        }
      }
    }
    i4(r4);
  });
  l4("unmount", function(i4, r4) {
    if (typeof r4.type == "string") {
      var n3 = r4.__e;
      if (n3) {
        var t4 = n3.U;
        if (t4) {
          n3.U = undefined;
          for (var f4 in t4) {
            var o4 = t4[f4];
            if (o4)
              o4.d();
          }
        }
      }
    } else {
      var e4 = r4.__c;
      if (e4) {
        var u4 = e4.__$u;
        if (u4) {
          e4.__$u = undefined;
          u4.d();
        }
      }
    }
    i4(r4);
  });
  l4("__h", function(i4, r4, n3, t4) {
    if (t4 < 3 || t4 === 9)
      r4.__$f |= 2;
    i4(r4, n3, t4);
  });
  x.prototype.shouldComponentUpdate = function(i4, r4) {
    if (this.__R)
      return true;
    var n3 = this.__$u, t4 = n3 && n3.s !== undefined;
    for (var f4 in r4)
      return true;
    if (this.__f || typeof this.u == "boolean" && this.u === true) {
      if (!(t4 || 2 & this.__$f || 4 & this.__$f))
        return true;
      if (1 & this.__$f)
        return true;
    } else {
      if (!(t4 || 4 & this.__$f))
        return true;
      if (3 & this.__$f)
        return true;
    }
    for (var o4 in i4)
      if (o4 !== "__source" && i4[o4] !== this.props[o4])
        return true;
    for (var e4 in this.props)
      if (!(e4 in i4))
        return true;
    return false;
  };
});

// src/store.js
var exports_store = {};
__export(exports_store, {
  updatePageView: () => updatePageView,
  updatePageTitleAndRefresh: () => updatePageTitleAndRefresh,
  updatePageTitle: () => updatePageTitle,
  updateBlockWidth: () => updateBlockWidth,
  updateBlockType: () => updateBlockType,
  updateBlockPos: () => updateBlockPos,
  updateBlockHtml: () => updateBlockHtml,
  uid: () => uid,
  setActiveSection: () => setActiveSection,
  setActivePage: () => setActivePage,
  setActiveNotebook: () => setActiveNotebook,
  reorderSections: () => reorderSections,
  reorderNotebooks: () => reorderNotebooks,
  renameSection: () => renameSection,
  renamePage: () => renamePage,
  renameNotebook: () => renameNotebook,
  removeFromTree: () => removeFromTree,
  movePage: () => movePage,
  getActivePage: () => getActivePage,
  findInTree: () => findInTree,
  deleteSection: () => deleteSection,
  deletePage: () => deletePage,
  deleteNotebook: () => deleteNotebook,
  deleteBlock: () => deleteBlock,
  appState: () => appState,
  addSection: () => addSection,
  addPage: () => addPage,
  addNotebook: () => addNotebook,
  addBlock: () => addBlock
});
function mkBlock(x3 = 0, y4 = 0, w4 = 480) {
  return { id: uid(), x: x3, y: y4, w: w4, html: "", type: "text" };
}
function mkPage(title = "Untitled Page") {
  const db = mkBlock(0, 0, 480);
  return { id: uid(), title, children: [], defaultBlockId: db.id, blocks: [db], panX: 0, panY: 0, zoom: 1 };
}
function mkSection(title = "New Section") {
  return { id: uid(), title, pages: [mkPage()] };
}
function mkNotebook(title = "My Notebook") {
  const sec = mkSection();
  return { id: uid(), title, sections: [sec] };
}
function load() {
  try {
    const r4 = localStorage.getItem(STORAGE_KEY);
    return r4 ? JSON.parse(r4) : null;
  } catch {
    return null;
  }
}
function scheduleSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.value));
    } catch (e4) {
      console.warn("Save failed", e4);
    }
  }, 300);
}
function defaultState() {
  const nb = mkNotebook();
  return { notebooks: [nb], ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id } };
}
function update(fn) {
  const draft = structuredClone(appState.value);
  fn(draft);
  appState.value = draft;
  scheduleSave();
}
function silent(fn) {
  fn(appState.value);
  scheduleSave();
}
function findInTree(pages, id) {
  for (const p5 of pages) {
    if (p5.id === id)
      return p5;
    if (p5.children?.length) {
      const f4 = findInTree(p5.children, id);
      if (f4)
        return f4;
    }
  }
  return null;
}
function removeFromTree(pages, id) {
  return pages.filter((p5) => p5.id !== id).map((p5) => ({ ...p5, children: removeFromTree(p5.children ?? [], id) }));
}
function getActivePage(s5 = appState.value) {
  const { ui, notebooks } = s5;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((sec2) => sec2.id === ui.sectionId);
  return sec ? findInTree(sec.pages, ui.pageId) : null;
}
function setActiveNotebook(id) {
  update((s5) => {
    s5.ui.notebookId = id;
    const nb = s5.notebooks.find((n3) => n3.id === id);
    s5.ui.sectionId = nb?.sections[0]?.id ?? null;
    s5.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
  });
}
function setActiveSection(id) {
  update((s5) => {
    s5.ui.sectionId = id;
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === id);
    s5.ui.pageId = sec?.pages[0]?.id ?? null;
  });
}
function setActivePage(id) {
  update((s5) => {
    s5.ui.pageId = id;
  });
}
function addNotebook() {
  const nb = mkNotebook("New Notebook");
  update((s5) => {
    s5.notebooks.push(nb);
    s5.ui.notebookId = nb.id;
    s5.ui.sectionId = nb.sections[0].id;
    s5.ui.pageId = nb.sections[0].pages[0].id;
  });
}
function renameNotebook(id, title) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === id);
    if (nb)
      nb.title = title;
  });
}
function deleteNotebook(id) {
  update((s5) => {
    s5.notebooks = s5.notebooks.filter((n3) => n3.id !== id);
    if (s5.ui.notebookId === id) {
      const nb = s5.notebooks[0];
      s5.ui.notebookId = nb?.id ?? null;
      s5.ui.sectionId = nb?.sections[0]?.id ?? null;
      s5.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
    }
  });
}
function reorderNotebooks(ids) {
  update((s5) => {
    s5.notebooks.sort((a4, b2) => ids.indexOf(a4.id) - ids.indexOf(b2.id));
  });
}
function addSection(nbId) {
  const sec = mkSection("New Section");
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === nbId);
    if (!nb)
      return;
    nb.sections.push(sec);
    s5.ui.sectionId = sec.id;
    s5.ui.pageId = sec.pages[0].id;
  });
}
function renameSection(nbId, secId, title) {
  update((s5) => {
    const sec = s5.notebooks.find((n3) => n3.id === nbId)?.sections.find((s6) => s6.id === secId);
    if (sec)
      sec.title = title;
  });
}
function deleteSection(nbId, secId) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === nbId);
    if (!nb)
      return;
    nb.sections = nb.sections.filter((sec) => sec.id !== secId);
    if (s5.ui.sectionId === secId) {
      const first = nb.sections[0];
      s5.ui.sectionId = first?.id ?? null;
      s5.ui.pageId = first?.pages[0]?.id ?? null;
    }
  });
}
function reorderSections(nbId, ids) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === nbId);
    if (nb)
      nb.sections.sort((a4, b2) => ids.indexOf(a4.id) - ids.indexOf(b2.id));
  });
}
function addPage(parentPageId = null) {
  const pg = mkPage("Untitled Page");
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
    if (!sec)
      return;
    if (parentPageId) {
      const parent = findInTree(sec.pages, parentPageId);
      if (parent) {
        parent.children = parent.children ?? [];
        parent.children.push(pg);
      }
    } else {
      sec.pages.push(pg);
    }
    s5.ui.pageId = pg.id;
  });
}
function renamePage(pageId, title) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
    if (!sec)
      return;
    const pg = findInTree(sec.pages, pageId);
    if (pg)
      pg.title = title;
  });
}
function deletePage(pageId) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
    if (!sec)
      return;
    sec.pages = removeFromTree(sec.pages, pageId);
    if (s5.ui.pageId === pageId)
      s5.ui.pageId = sec.pages[0]?.id ?? null;
  });
}
function movePage(pageId, targetSecId) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    if (!nb)
      return;
    let pg = null;
    for (const sec of nb.sections) {
      const found = findInTree(sec.pages, pageId);
      if (found) {
        pg = structuredClone(found);
        sec.pages = removeFromTree(sec.pages, pageId);
        break;
      }
    }
    if (!pg)
      return;
    const target = nb.sections.find((sec) => sec.id === targetSecId);
    if (target)
      target.pages.push(pg);
  });
}
function addBlock(x3, y4, w4 = 480, type = "text") {
  const blk = { id: uid(), x: x3, y: y4, w: w4, html: "", type };
  update((s5) => {
    const pg = getActivePage(s5);
    if (pg)
      pg.blocks.push(blk);
  });
  return blk;
}
function deleteBlock(blockId) {
  update((s5) => {
    const pg = getActivePage(s5);
    if (pg)
      pg.blocks = pg.blocks.filter((b2) => b2.id !== blockId);
  });
}
function updateBlockHtml(blockId, html) {
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.html = html;
  });
}
function updateBlockPos(blockId, x3, y4) {
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk) {
      blk.x = x3;
      blk.y = y4;
    }
  });
}
function updateBlockType(blockId, type) {
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.type = type;
  });
}
function updateBlockWidth(blockId, w4) {
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.w = w4;
  });
}
function updatePageView(panX, panY, zoom) {
  silent((s5) => {
    const pg = getActivePage(s5);
    if (pg) {
      pg.panX = panX;
      pg.panY = panY;
      pg.zoom = zoom;
    }
  });
}
function updatePageTitle(pageId, title) {
  silent((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg)
      pg.title = title;
  });
}
function updatePageTitleAndRefresh(pageId, title) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
    const pg = sec ? findInTree(sec.pages, pageId) : null;
    if (pg)
      pg.title = title;
  });
}
var STORAGE_KEY = "onenote_v4", uid = () => crypto.randomUUID(), _saveTimer = null, appState;
var init_store = __esm(() => {
  init_signals_module();
  appState = c3(load() || defaultState());
});

// src/main.jsx
init_preact_module();

// src/App.jsx
init_store();

// src/NotebookBar.jsx
init_hooks_module();
init_store();

// src/ContextMenu.jsx
init_signals_module();
init_hooks_module();

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
init_preact_module();
init_preact_module();
var f4 = 0;
function u4(e4, t4, n3, o4, i4, u5) {
  t4 || (t4 = {});
  var a4, c4, p5 = t4;
  if ("ref" in p5)
    for (c4 in p5 = {}, t4)
      c4 == "ref" ? a4 = t4[c4] : p5[c4] = t4[c4];
  var l5 = { type: e4, props: p5, key: n3, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: undefined, __v: --f4, __i: -1, __u: 0, __source: i4, __self: u5 };
  if (typeof e4 == "function" && (a4 = e4.defaultProps))
    for (c4 in a4)
      p5[c4] === undefined && (p5[c4] = a4[c4]);
  return l.vnode && l.vnode(l5), l5;
}

// src/ContextMenu.jsx
var contextMenu = c3(null);
function openContextMenu(x3, y4, items) {
  contextMenu.value = { x: x3, y: y4, items };
}
function closeContextMenu() {
  contextMenu.value = null;
}
function openRenameMenu(x3, y4, currentName, onRename) {
  contextMenu.value = {
    x: x3,
    y: y4,
    items: [{ type: "rename", value: currentName, action: onRename }]
  };
}
function ContextMenu() {
  const menu = contextMenu.value;
  const ref = A2(null);
  const [confirmId, setConfirmId] = d2(null);
  const [renameVal, setRenameVal] = d2("");
  const renameRef = A2(null);
  y2(() => {
    setConfirmId(null);
    if (menu) {
      const renameItem = menu.items.find((i4) => i4.type === "rename");
      if (renameItem)
        setRenameVal(renameItem.value || "");
    }
  }, [menu]);
  y2(() => {
    if (menu && renameRef.current) {
      renameRef.current.focus();
      renameRef.current.select();
    }
  }, [menu]);
  y2(() => {
    if (!menu)
      return;
    function onDown(e4) {
      if (ref.current && !ref.current.contains(e4.target))
        closeContextMenu();
    }
    function onKey(e4) {
      if (e4.key === "Escape")
        closeContextMenu();
    }
    function onScroll() {
      closeContextMenu();
    }
    document.addEventListener("mousedown", onDown, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [menu]);
  if (!menu)
    return null;
  const menuW = 200, menuH = menu.items.length * 32 + 8;
  const x3 = Math.min(menu.x, window.innerWidth - menuW - 4);
  const y4 = Math.min(menu.y, window.innerHeight - menuH - 4);
  function handleRenameSubmit(item) {
    const v5 = renameVal.trim();
    if (v5 && v5 !== item.value)
      item.action(v5);
    closeContextMenu();
  }
  return /* @__PURE__ */ u4("div", {
    class: "context-menu",
    ref,
    style: { left: x3 + "px", top: y4 + "px" },
    children: menu.items.map((item, i4) => {
      if (item.type === "separator") {
        return /* @__PURE__ */ u4("div", {
          class: "context-menu-separator"
        }, i4, false, undefined, this);
      }
      if (item.type === "rename") {
        return /* @__PURE__ */ u4("div", {
          class: "context-menu-rename",
          children: [
            /* @__PURE__ */ u4("input", {
              ref: renameRef,
              class: "context-menu-input",
              value: renameVal,
              onInput: (e4) => setRenameVal(e4.target.value),
              onKeyDown: (e4) => {
                if (e4.key === "Enter")
                  handleRenameSubmit(item);
                if (e4.key === "Escape")
                  closeContextMenu();
              }
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("button", {
              class: "context-menu-rename-ok",
              onClick: () => handleRenameSubmit(item),
              children: "✓"
            }, undefined, false, undefined, this)
          ]
        }, i4, true, undefined, this);
      }
      if (item.type === "confirm") {
        const isConfirming = confirmId === i4;
        return /* @__PURE__ */ u4("div", {
          class: `context-menu-item ${isConfirming ? "context-menu-item--danger" : ""}`,
          onClick: () => {
            if (isConfirming) {
              item.action();
              closeContextMenu();
            } else
              setConfirmId(i4);
          },
          children: isConfirming ? item.confirmLabel || "Confirm delete?" : item.label
        }, i4, false, undefined, this);
      }
      if (item.type === "submenu") {
        return /* @__PURE__ */ u4("div", {
          class: "context-menu-item context-menu-submenu",
          children: [
            /* @__PURE__ */ u4("span", {
              children: item.label
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("span", {
              class: "context-menu-arrow",
              children: "▸"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              class: "context-menu-sub",
              children: item.children.map((child, j3) => /* @__PURE__ */ u4("div", {
                class: "context-menu-item",
                onClick: () => {
                  child.action();
                  closeContextMenu();
                },
                children: child.label
              }, j3, false, undefined, this))
            }, undefined, false, undefined, this)
          ]
        }, i4, true, undefined, this);
      }
      return /* @__PURE__ */ u4("div", {
        class: "context-menu-item",
        onClick: () => {
          item.action();
          closeContextMenu();
        },
        children: item.label
      }, i4, false, undefined, this);
    })
  }, undefined, false, undefined, this);
}

// src/NotebookBar.jsx
function NotebookBar() {
  const { notebooks, ui } = appState.value;
  const dragId = A2(null);
  return /* @__PURE__ */ u4("div", {
    id: "notebook-bar",
    children: [
      notebooks.map((nb) => /* @__PURE__ */ u4("div", {
        class: ["nb-tab", nb.id === ui.notebookId && "nb-tab--active"].filter(Boolean).join(" "),
        onClick: () => setActiveNotebook(nb.id),
        onDblClick: (e4) => {
          openRenameMenu(e4.clientX, e4.clientY, nb.title, (t4) => renameNotebook(nb.id, t4));
        },
        onContextMenu: (e4) => {
          e4.preventDefault();
          openContextMenu(e4.clientX, e4.clientY, [
            { label: "Rename", action: () => openRenameMenu(e4.clientX, e4.clientY, nb.title, (t4) => renameNotebook(nb.id, t4)) },
            { type: "separator" },
            {
              type: "confirm",
              label: "Delete",
              confirmLabel: notebooks.length <= 1 ? "Cannot delete last notebook" : `Delete "${nb.title}"?`,
              action: () => {
                if (notebooks.length > 1)
                  deleteNotebook(nb.id);
              }
            }
          ]);
        },
        draggable: true,
        onDragStart: () => {
          dragId.current = nb.id;
        },
        onDragOver: (e4) => e4.preventDefault(),
        onDrop: (e4) => {
          e4.preventDefault();
          if (!dragId.current || dragId.current === nb.id)
            return;
          const ids = notebooks.map((n3) => n3.id);
          const from = ids.indexOf(dragId.current), to = ids.indexOf(nb.id);
          const next = [...ids];
          next.splice(from, 1);
          next.splice(to, 0, dragId.current);
          reorderNotebooks(next);
          dragId.current = null;
        },
        children: nb.title
      }, nb.id, false, undefined, this)),
      /* @__PURE__ */ u4("button", {
        class: "nb-add",
        onClick: addNotebook,
        title: "New notebook",
        children: "+"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/SectionPanel.jsx
init_hooks_module();
init_store();
function SectionPanel() {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sections = nb?.sections ?? [];
  const dragId = A2(null);
  return /* @__PURE__ */ u4("div", {
    id: "section-tabs",
    children: [
      sections.map((sec) => /* @__PURE__ */ u4("div", {
        class: ["sec-tab", sec.id === ui.sectionId && "sec-tab--active"].filter(Boolean).join(" "),
        onClick: () => setActiveSection(sec.id),
        onDblClick: (e4) => {
          openRenameMenu(e4.clientX, e4.clientY, sec.title, (t4) => renameSection(nb.id, sec.id, t4));
        },
        onContextMenu: (e4) => {
          e4.preventDefault();
          openContextMenu(e4.clientX, e4.clientY, [
            { label: "Rename", action: () => openRenameMenu(e4.clientX, e4.clientY, sec.title, (t4) => renameSection(nb.id, sec.id, t4)) },
            { type: "separator" },
            {
              type: "confirm",
              label: "Delete",
              confirmLabel: sections.length <= 1 ? "Cannot delete last section" : `Delete "${sec.title}"?`,
              action: () => {
                if (sections.length > 1)
                  deleteSection(nb.id, sec.id);
              }
            }
          ]);
        },
        draggable: true,
        onDragStart: () => {
          dragId.current = sec.id;
        },
        onDragOver: (e4) => e4.preventDefault(),
        onDrop: (e4) => {
          e4.preventDefault();
          if (!dragId.current || dragId.current === sec.id)
            return;
          const ids = sections.map((s5) => s5.id);
          const from = ids.indexOf(dragId.current), to = ids.indexOf(sec.id);
          const next = [...ids];
          next.splice(from, 1);
          next.splice(to, 0, dragId.current);
          reorderSections(nb.id, next);
          dragId.current = null;
        },
        children: sec.title
      }, sec.id, false, undefined, this)),
      /* @__PURE__ */ u4("button", {
        class: "sec-add",
        onClick: () => addSection(nb?.id),
        title: "New section",
        children: "+"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/PagesPanel.jsx
init_hooks_module();
init_store();
var drag = { pageId: null, over: null, mode: null };
function deletePageWithChildren(page) {
  if (!page.children?.length) {
    deletePage(page.id);
    return;
  }
  const s5 = appState.value;
  const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
  const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
  if (!sec)
    return;
  function promoteChildren(pages) {
    for (let i4 = 0;i4 < pages.length; i4++) {
      if (pages[i4].id === page.id) {
        const children = pages[i4].children ?? [];
        pages.splice(i4, 1, ...children);
        return true;
      }
      if (promoteChildren(pages[i4].children ?? []))
        return true;
    }
    return false;
  }
  promoteChildren(sec.pages);
  appState.value = { ...appState.value };
}
function PageItem({ page, activeId, depth = 0, dragState, onDragChange }) {
  const [open, setOpen] = d2(true);
  const hasKids = page.children?.length > 0;
  const isOver = dragState.over === page.id;
  const isOverAsChild = isOver && dragState.mode === "child";
  function onDragStart(e4) {
    e4.stopPropagation();
    drag.pageId = page.id;
    e4.dataTransfer.effectAllowed = "move";
  }
  function onDragOver(e4) {
    e4.preventDefault();
    e4.stopPropagation();
    if (drag.pageId === page.id)
      return;
    const rect = e4.currentTarget.getBoundingClientRect();
    const rel = (e4.clientY - rect.top) / rect.height;
    const mode = rel > 0.3 && rel < 0.7 ? "child" : "before";
    if (dragState.over !== page.id || dragState.mode !== mode) {
      onDragChange(page.id, mode);
    }
  }
  function onDragLeave(e4) {
    if (!e4.currentTarget.contains(e4.relatedTarget))
      onDragChange(null, null);
  }
  function onDrop(e4) {
    e4.preventDefault();
    e4.stopPropagation();
    const fromId = drag.pageId;
    drag.pageId = null;
    onDragChange(null, null);
    if (!fromId || fromId === page.id)
      return;
    if (dragState.mode === "child") {
      Promise.resolve().then(() => (init_store(), exports_store)).then((m4) => {
        const s5 = m4.appState.value;
        const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
        const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
        if (!sec)
          return;
        let extracted = null;
        function extract(pages) {
          for (let i4 = 0;i4 < pages.length; i4++) {
            if (pages[i4].id === fromId) {
              [extracted] = pages.splice(i4, 1);
              return true;
            }
            if (extract(pages[i4].children ?? []))
              return true;
          }
          return false;
        }
        extract(sec.pages);
        if (!extracted)
          return;
        const target = m4.findInTree(sec.pages, page.id);
        if (target) {
          target.children = target.children ?? [];
          target.children.push(extracted);
        }
        m4.appState.value = { ...m4.appState.value };
      });
    } else {
      Promise.resolve().then(() => (init_store(), exports_store)).then((m4) => {
        const s5 = m4.appState.value;
        const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
        const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
        if (!sec)
          return;
        let extracted = null;
        function extract(pages) {
          for (let i4 = 0;i4 < pages.length; i4++) {
            if (pages[i4].id === fromId) {
              [extracted] = pages.splice(i4, 1);
              return true;
            }
            if (extract(pages[i4].children ?? []))
              return true;
          }
          return false;
        }
        extract(sec.pages);
        if (!extracted)
          return;
        function insertBefore(pages) {
          for (let i4 = 0;i4 < pages.length; i4++) {
            if (pages[i4].id === page.id) {
              pages.splice(i4, 0, extracted);
              return true;
            }
            if (insertBefore(pages[i4].children ?? []))
              return true;
          }
          return false;
        }
        insertBefore(sec.pages);
        m4.appState.value = { ...m4.appState.value };
      });
    }
  }
  function openPageContextMenu(e4) {
    e4.preventDefault();
    const nb = appState.value.notebooks.find((n3) => n3.id === appState.value.ui.notebookId);
    const sections = nb?.sections ?? [];
    const moveChildren = sections.filter((s5) => s5.id !== appState.value.ui.sectionId).map((s5) => ({ label: s5.title, action: () => movePage(page.id, s5.id) }));
    const items = [
      { label: "Rename", action: () => openRenameMenu(e4.clientX, e4.clientY, page.title, (t4) => renamePage(page.id, t4)) },
      { label: "Add Subpage", action: () => addPage(page.id) }
    ];
    if (moveChildren.length > 0) {
      items.push({ type: "submenu", label: "Move to Section", children: moveChildren });
    }
    items.push({ type: "separator" });
    if (page.children?.length) {
      items.push({
        type: "confirm",
        label: "Delete (promote subpages)",
        confirmLabel: `Delete "${page.title}"?`,
        action: () => deletePageWithChildren(page)
      });
    } else {
      items.push({
        type: "confirm",
        label: "Delete",
        confirmLabel: `Delete "${page.title}"?`,
        action: () => deletePage(page.id)
      });
    }
    openContextMenu(e4.clientX, e4.clientY, items);
  }
  return /* @__PURE__ */ u4("div", {
    class: "page-item-wrap",
    children: [
      /* @__PURE__ */ u4("div", {
        class: [
          "panel-item page-item",
          page.id === activeId && "panel-item--active",
          isOver && !isOverAsChild && "page-item--drop-before",
          isOverAsChild && "page-item--drop-child"
        ].filter(Boolean).join(" "),
        style: { paddingLeft: 12 + depth * 16 + "px" },
        draggable: true,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onClick: () => setActivePage(page.id),
        onDblClick: (e4) => {
          e4.stopPropagation();
          openRenameMenu(e4.clientX, e4.clientY, page.title, (t4) => renamePage(page.id, t4));
        },
        onContextMenu: openPageContextMenu,
        children: [
          /* @__PURE__ */ u4("span", {
            class: "page-expand",
            style: { visibility: hasKids ? "visible" : "hidden" },
            onClick: (e4) => {
              e4.stopPropagation();
              setOpen((o4) => !o4);
            },
            children: open ? "▾" : "▸"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("span", {
            class: "page-title-text",
            children: page.title
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      hasKids && open && /* @__PURE__ */ u4("div", {
        class: "subpages",
        children: page.children.map((c4) => /* @__PURE__ */ u4(PageItem, {
          page: c4,
          activeId,
          depth: depth + 1,
          dragState,
          onDragChange
        }, c4.id, false, undefined, this))
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function PagesPanel() {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((s5) => s5.id === ui.sectionId);
  const pages = sec?.pages ?? [];
  const [dragOver, setDragOver] = d2({ id: null, mode: null });
  function onDragChange(id, mode) {
    setDragOver({ id, mode });
  }
  const dragState = { over: dragOver.id, mode: dragOver.mode };
  return /* @__PURE__ */ u4("div", {
    id: "pages-panel",
    children: [
      /* @__PURE__ */ u4("div", {
        class: "panel-header",
        children: /* @__PURE__ */ u4("button", {
          class: "add-btn",
          onClick: () => addPage(),
          children: "+ New Page"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "panel-list",
        children: pages.map((pg) => /* @__PURE__ */ u4(PageItem, {
          page: pg,
          activeId: ui.pageId,
          dragState,
          onDragChange
        }, pg.id, false, undefined, this))
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/Canvas.jsx
init_preact_module();
init_hooks_module();

// src/Block.jsx
init_hooks_module();
init_store();

// src/editor.js
function getSelectionInfo() {
  const sel = window.getSelection();
  if (!sel?.rangeCount)
    return null;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE)
    return null;
  return { sel, range, node, text: node.textContent, offset: range.startOffset };
}
function eatText(sel, node, start, end) {
  const r4 = document.createRange();
  r4.setStart(node, start);
  r4.setEnd(node, end);
  sel.removeAllRanges();
  sel.addRange(r4);
  document.execCommand("delete");
}
function wrapMatch(sel, node, match, tag) {
  const idx = match.index;
  const full = match[0];
  const inner = match[1];
  const before = node.textContent.slice(0, idx);
  const after = node.textContent.slice(idx + full.length);
  node.textContent = before;
  const el = document.createElement(tag);
  el.textContent = inner;
  node.parentNode.insertBefore(el, node.nextSibling);
  const afterNode = document.createTextNode(after);
  el.after(afterNode);
  const r4 = document.createRange();
  r4.setStart(afterNode, 0);
  r4.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r4);
}
function execFmt(cmd) {
  const map = {
    bold: () => document.execCommand("bold"),
    italic: () => document.execCommand("italic"),
    underline: () => document.execCommand("underline"),
    strikethrough: () => document.execCommand("strikeThrough"),
    h1: () => document.execCommand("formatBlock", false, "H1"),
    h2: () => document.execCommand("formatBlock", false, "H2"),
    h3: () => document.execCommand("formatBlock", false, "H3"),
    h4: () => document.execCommand("formatBlock", false, "H4"),
    p: () => document.execCommand("formatBlock", false, "P"),
    ul: () => document.execCommand("insertUnorderedList"),
    ol: () => document.execCommand("insertOrderedList"),
    link: () => {
      const u5 = prompt("URL:");
      if (u5)
        document.execCommand("createLink", false, u5);
    }
  };
  map[cmd]?.();
}
function handleMarkdownInput(el) {
  const info = getSelectionInfo();
  if (!info)
    return null;
  const { sel, range, node, text, offset } = info;
  const before = text.slice(0, offset);
  const hMatch = before.match(/^(#{1,4}) $/);
  if (hMatch) {
    eatText(sel, node, 0, offset);
    document.execCommand("formatBlock", false, `H${hMatch[1].length}`);
    return null;
  }
  if (before === "- " || before === "* ") {
    eatText(sel, node, 0, offset);
    document.execCommand("insertUnorderedList");
    return null;
  }
  if (/^\d+\. $/.test(before)) {
    eatText(sel, node, 0, offset);
    document.execCommand("insertOrderedList");
    return null;
  }
  if (before === "> ") {
    eatText(sel, node, 0, offset);
    document.execCommand("formatBlock", false, "BLOCKQUOTE");
    return null;
  }
  if (before === "``` ") {
    eatText(sel, node, 0, offset);
    el.setAttribute("data-code", "1");
    el.classList.add("code-block");
    return "code";
  }
  const boldM = before.match(/\*\*(.+?)\*\*$/) || before.match(/__(.+?)__$/);
  if (boldM) {
    wrapMatch(sel, node, boldM, "strong");
    return null;
  }
  const italicM = before.match(/(?<!\*)\*([^*\n]+)\*$/) || before.match(/(?<!_)_([^_\n]+)_$/);
  if (italicM) {
    wrapMatch(sel, node, italicM, "em");
    return null;
  }
  return null;
}
function handleInlineCode(el) {
  const info = getSelectionInfo();
  if (!info)
    return false;
  const { sel, range, node, offset } = info;
  const before = node.textContent.slice(0, offset);
  const m4 = before.match(/`([^`\n]+)`$/);
  if (!m4)
    return false;
  const idx = m4.index;
  const inner = m4[1];
  const before2 = node.textContent.slice(0, idx);
  const after = node.textContent.slice(idx + m4[0].length);
  node.textContent = before2;
  const code = document.createElement("code");
  code.textContent = inner;
  node.parentNode.insertBefore(code, node.nextSibling);
  const afterNode = document.createTextNode(after || "​");
  code.after(afterNode);
  const r4 = document.createRange();
  r4.setStart(afterNode, 0);
  r4.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r4);
  return true;
}
function handleListKey(e4) {
  const li = window.getSelection()?.getRangeAt(0)?.startContainer?.parentElement?.closest("li");
  if (!li)
    return false;
  if (e4.key === "Tab") {
    e4.preventDefault();
    document.execCommand(e4.shiftKey ? "outdent" : "indent");
    return true;
  }
  if (e4.key === "Enter" && li.textContent.trim() === "") {
    const listEl = li.parentElement;
    const isTopLevel = listEl && (listEl.tagName === "UL" || listEl.tagName === "OL") && listEl.parentElement?.tagName !== "LI";
    if (isTopLevel) {
      e4.preventDefault();
      document.execCommand("outdent");
      document.execCommand("formatBlock", false, "P");
      return true;
    }
    if (!isTopLevel) {
      e4.preventDefault();
      document.execCommand("outdent");
      return true;
    }
  }
  if (e4.key === "Backspace" && li.textContent.trim() === "") {
    e4.preventDefault();
    document.execCommand("outdent");
    return true;
  }
  return false;
}
function handleCodeTab(e4, el) {
  if (!el.getAttribute("data-code"))
    return false;
  if (e4.key !== "Tab")
    return false;
  e4.preventDefault();
  document.execCommand("insertText", false, "  ");
  return true;
}
function onBlockKeyDown(e4, el) {
  const mod = e4.ctrlKey || e4.metaKey;
  if (mod && !e4.shiftKey && !e4.altKey) {
    if (e4.key === "b") {
      e4.preventDefault();
      document.execCommand("bold");
      return true;
    }
    if (e4.key === "i") {
      e4.preventDefault();
      document.execCommand("italic");
      return true;
    }
    if (e4.key === "u") {
      e4.preventDefault();
      document.execCommand("underline");
      return true;
    }
  }
  if (handleCodeTab(e4, el))
    return true;
  if (handleListKey(e4))
    return true;
  if (e4.key === "`") {
    setTimeout(() => handleInlineCode(el), 0);
  }
  return false;
}

// src/undo.js
var stacks = new Map;
function get(pageId) {
  if (!stacks.has(pageId))
    stacks.set(pageId, { past: [], future: [] });
  return stacks.get(pageId);
}
function pushUndo(pageId, delta) {
  const s5 = get(pageId);
  s5.past.push(delta);
  s5.future = [];
  if (s5.past.length > 200)
    s5.past.shift();
}
function applyUndo(pageId, page) {
  const s5 = get(pageId);
  if (!s5.past.length)
    return false;
  const delta = s5.past.pop();
  const reverse = apply(page, delta);
  if (reverse)
    s5.future.push(reverse);
  return true;
}
function applyRedo(pageId, page) {
  const s5 = get(pageId);
  if (!s5.future.length)
    return false;
  const delta = s5.future.pop();
  const reverse = apply(page, delta);
  if (reverse)
    s5.past.push(reverse);
  return true;
}
function apply(page, delta) {
  const blocks = page.blocks;
  if (delta.type === "move") {
    const rev = [];
    for (const m4 of delta.moves) {
      const b2 = blocks.find((b3) => b3.id === m4.id);
      if (b2) {
        rev.push({ id: b2.id, x: b2.x, y: b2.y });
        b2.x = m4.x;
        b2.y = m4.y;
      }
    }
    return { type: "move", moves: rev };
  }
  if (delta.type === "resize") {
    const b2 = blocks.find((b3) => b3.id === delta.id);
    if (!b2)
      return null;
    const rev = { type: "resize", id: b2.id, w: b2.w };
    if (delta.x != null) {
      rev.x = b2.x;
      rev.y = b2.y;
      b2.x = delta.x;
      b2.y = delta.y;
    }
    b2.w = delta.w;
    return rev;
  }
  if (delta.type === "html") {
    const b2 = blocks.find((b3) => b3.id === delta.id);
    if (!b2)
      return null;
    const rev = { type: "html", id: b2.id, html: b2.html };
    b2.html = delta.html;
    return rev;
  }
  if (delta.type === "add") {
    const rev = { type: "delete", blocks: [blocks.find((b2) => b2.id === delta.id)].filter(Boolean) };
    page.blocks = blocks.filter((b2) => b2.id !== delta.id);
    return rev.blocks.length ? rev : null;
  }
  if (delta.type === "delete") {
    const ids = delta.blocks.map((b2) => b2.id);
    page.blocks = [...blocks, ...delta.blocks];
    return { type: "deleteForward", ids };
  }
  if (delta.type === "deleteForward") {
    const removed = blocks.filter((b2) => delta.ids.includes(b2.id));
    page.blocks = blocks.filter((b2) => !delta.ids.includes(b2.id));
    return { type: "delete", blocks: removed };
  }
  return null;
}

// src/Block.jsx
function Block({ block, page }) {
  const ctx = x2(CanvasCtx);
  const contentRef = A2(null);
  const isDefault = block.id === page.defaultBlockId;
  const isImage = block.type === "image";
  const isSelected = ctx.selectedIds.has(block.id);
  y2(() => {
    const el = contentRef.current;
    if (el && el.innerHTML !== block.html)
      el.innerHTML = block.html;
  }, [block.html]);
  const undoTimer = A2(null);
  const htmlAtFocus = A2(null);
  const handleInput = () => {
    const el = contentRef.current;
    if (!el)
      return;
    const result = handleMarkdownInput(el);
    if (result === "code")
      updateBlockType(block.id, "code");
    updateBlockHtml(block.id, el.innerHTML);
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      if (htmlAtFocus.current != null && htmlAtFocus.current !== el.innerHTML) {
        pushUndo(page.id, { type: "html", id: block.id, html: htmlAtFocus.current });
        htmlAtFocus.current = el.innerHTML;
      }
    }, 1500);
  };
  const handleKeyDown = (e4) => {
    const mod = e4.ctrlKey || e4.metaKey;
    if (mod && e4.key === "z") {
      e4.preventDefault();
      e4.shiftKey ? ctx.redo() : ctx.undo();
      return;
    }
    onBlockKeyDown(e4, contentRef.current);
  };
  const handleFocus = () => {
    htmlAtFocus.current = block.html;
    ctx.onBlockFocus?.(block.id);
  };
  const handleBlur = () => {
    clearTimeout(undoTimer.current);
    const el = contentRef.current;
    if (!el)
      return;
    const html = el.innerHTML;
    const isEmpty = !html || html === "<br>" || html.trim() === "";
    if (htmlAtFocus.current != null && htmlAtFocus.current !== html) {
      pushUndo(page.id, { type: "html", id: block.id, html: htmlAtFocus.current });
    }
    htmlAtFocus.current = null;
    if (isEmpty && !isDefault) {
      deleteBlock(block.id);
    } else {
      updateBlockHtml(block.id, html);
    }
    ctx.onBlockBlur?.(block.id);
  };
  const handleBlockPointerDown = (e4) => {
    e4.stopPropagation();
    const onContent = e4.target.closest(".block-content, .block-handle, .block-resize, .img-resize, .block-drag-overlay");
    if (!onContent) {
      ctx.onBlockDragStart(e4, block.id);
    }
  };
  return /* @__PURE__ */ u4("div", {
    class: ["block", isDefault && "block--default", isImage && "block--image", isSelected && "block--selected"].filter(Boolean).join(" "),
    "data-block-id": block.id,
    style: { left: block.x + "px", top: block.y + "px", width: block.w + "px" },
    onPointerDown: handleBlockPointerDown,
    children: [
      !isDefault && !isImage && /* @__PURE__ */ u4("div", {
        class: "block-handle",
        onPointerDown: (e4) => {
          e4.stopPropagation();
          ctx.onBlockDragStart(e4, block.id);
        }
      }, undefined, false, undefined, this),
      !isImage && /* @__PURE__ */ u4("div", {
        class: "block-resize",
        onPointerDown: (e4) => {
          e4.stopPropagation();
          ctx.onBlockResizeStart(e4, block.id);
        }
      }, undefined, false, undefined, this),
      isImage ? /* @__PURE__ */ u4(k, {
        children: [
          /* @__PURE__ */ u4("img", {
            src: block.src || "",
            draggable: false,
            style: { width: "100%", display: "block" }
          }, undefined, false, undefined, this),
          ["nw", "ne", "sw", "se"].map((dir) => /* @__PURE__ */ u4("div", {
            class: `img-resize img-resize--${dir}`,
            onPointerDown: (e4) => {
              e4.stopPropagation();
              ctx.onImgResizeStart(e4, block.id, dir);
            }
          }, dir, false, undefined, this)),
          /* @__PURE__ */ u4("div", {
            class: "block-drag-overlay",
            onPointerDown: (e4) => {
              e4.stopPropagation();
              ctx.onBlockDragStart(e4, block.id);
            }
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this) : /* @__PURE__ */ u4("div", {
        ref: contentRef,
        class: ["block-content", block.type === "code" && "code-block"].filter(Boolean).join(" "),
        contentEditable: "true",
        "data-placeholder": "Start typing…",
        "data-code": block.type === "code" ? "1" : undefined,
        onKeyDown: handleKeyDown,
        onInput: handleInput,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onPointerDown: (e4) => e4.stopPropagation(),
        suppressContentEditableWarning: true
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/Canvas.jsx
init_store();
var CanvasCtx = R(null);
function FormatToolbar() {
  const btns = [
    { cmd: "bold", node: /* @__PURE__ */ u4("b", {
      children: "B"
    }, undefined, false, undefined, this), title: "Bold" },
    { cmd: "italic", node: /* @__PURE__ */ u4("i", {
      children: "I"
    }, undefined, false, undefined, this), title: "Italic" },
    { cmd: "underline", node: /* @__PURE__ */ u4("u", {
      children: "U"
    }, undefined, false, undefined, this), title: "Underline" },
    { cmd: "strikethrough", node: /* @__PURE__ */ u4("s", {
      children: "S"
    }, undefined, false, undefined, this), title: "Strikethrough" },
    null,
    { cmd: "h1", node: "H1", title: "Heading 1" },
    { cmd: "h2", node: "H2", title: "Heading 2" },
    { cmd: "h3", node: "H3", title: "Heading 3" },
    { cmd: "h4", node: "H4", title: "Heading 4" },
    { cmd: "p", node: "P", title: "Paragraph" },
    null,
    { cmd: "ul", node: "• List", title: "Bullet list" },
    { cmd: "ol", node: "1. List", title: "Numbered list" },
    { cmd: "link", node: "⌘K", title: "Insert link" }
  ];
  return /* @__PURE__ */ u4("div", {
    id: "format-toolbar",
    children: [
      btns.map((b2, i4) => b2 === null ? /* @__PURE__ */ u4("span", {
        class: "fmt-sep"
      }, i4, false, undefined, this) : /* @__PURE__ */ u4("button", {
        class: "fmt-btn",
        title: b2.title,
        onMouseDown: (e4) => {
          e4.preventDefault();
          execFmt(b2.cmd);
        },
        children: b2.node
      }, b2.cmd, false, undefined, this)),
      /* @__PURE__ */ u4("span", {
        class: "canvas-hint",
        children: "Click to add block · Space+drag to pan · Ctrl+scroll zoom"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function PageTitle({ page, onEnter }) {
  const ref = A2(null);
  const editing = A2(false);
  y2(() => {
    if (ref.current && !editing.current)
      ref.current.textContent = page?.title ?? "";
  }, [page?.id]);
  if (!page)
    return /* @__PURE__ */ u4("div", {
      id: "page-title-bar"
    }, undefined, false, undefined, this);
  return /* @__PURE__ */ u4("div", {
    id: "page-title-bar",
    onClick: () => ref.current?.focus(),
    children: /* @__PURE__ */ u4("div", {
      ref,
      id: "page-title",
      contentEditable: true,
      suppressContentEditableWarning: true,
      onFocus: () => {
        editing.current = true;
      },
      onBlur: (e4) => {
        editing.current = false;
        const title = e4.target.textContent.trim() || "Untitled Page";
        updatePageTitleAndRefresh(page.id, title);
      },
      onKeyDown: (e4) => {
        if (e4.key === "Enter") {
          e4.preventDefault();
          onEnter?.();
        }
      },
      onInput: (e4) => {
        updatePageTitle(page.id, e4.target.textContent);
      }
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
function Canvas({ page }) {
  const containerRef = A2(null);
  const innerRef = A2(null);
  const marqueeRef = A2(null);
  const hScrollRef = A2(null);
  const vScrollRef = A2(null);
  const scrollHideTimer = A2(null);
  const viewRef = A2({ panX: 0, panY: 0, zoom: 1 });
  const spaceHeld = A2(false);
  const [selectedIds, setSelectedIds] = d2(new Set);
  const selectedRef = A2(selectedIds);
  function setSelected(ids) {
    selectedRef.current = ids;
    setSelectedIds(new Set(ids));
  }
  y2(() => {
    if (!page)
      return;
    viewRef.current = { panX: page.panX ?? 0, panY: page.panY ?? 0, zoom: page.zoom ?? 1 };
    applyTransform();
    setSelected(new Set);
  }, [page?.id]);
  function applyTransform() {
    if (!innerRef.current)
      return;
    const { panX, panY, zoom } = viewRef.current;
    innerRef.current.style.transform = `translate(${-panX * zoom}px, ${-panY * zoom}px) scale(${zoom})`;
    updateScrollbars();
  }
  function updateScrollbars() {
    if (!containerRef.current)
      return;
    const { panX, panY, zoom } = viewRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const viewW = rect.width / zoom;
    const viewH = rect.height / zoom;
    let maxX = 0, maxY = 0;
    if (page?.blocks?.length) {
      for (const b2 of page.blocks) {
        maxX = Math.max(maxX, b2.x + (b2.w || 480));
        maxY = Math.max(maxY, b2.y + 300);
      }
    }
    const totalW = Math.max(maxX + 100, panX + viewW);
    const totalH = Math.max(maxY + 100, panY + viewH);
    const showH = panX > 1 || maxX + 100 > viewW;
    const showV = panY > 1 || maxY + 100 > viewH;
    if (showH || showV) {
      containerRef.current.classList.add("scrollbar-active");
      clearTimeout(scrollHideTimer.current);
      scrollHideTimer.current = setTimeout(() => {
        containerRef.current?.classList.remove("scrollbar-active");
      }, 1200);
    }
    if (hScrollRef.current) {
      if (!showH) {
        hScrollRef.current.style.display = "none";
      } else {
        hScrollRef.current.style.display = "";
        const trackW = rect.width - 14;
        const ratio = viewW / totalW;
        const thumbW = Math.max(30, ratio * trackW);
        const thumbX = panX / totalW * trackW;
        hScrollRef.current.style.width = thumbW + "px";
        hScrollRef.current.style.left = Math.max(4, thumbX + 4) + "px";
      }
    }
    if (vScrollRef.current) {
      if (!showV) {
        vScrollRef.current.style.display = "none";
      } else {
        vScrollRef.current.style.display = "";
        const trackH = rect.height - 14;
        const ratio = viewH / totalH;
        const thumbH = Math.max(30, ratio * trackH);
        const thumbY = panY / totalH * trackH;
        vScrollRef.current.style.height = thumbH + "px";
        vScrollRef.current.style.top = Math.max(4, thumbY + 4) + "px";
      }
    }
  }
  function toCanvas(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    const { panX, panY, zoom } = viewRef.current;
    return { x: (clientX - rect.left) / zoom + panX, y: (clientY - rect.top) / zoom + panY };
  }
  function toScreen(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }
  const onBlockDragStart = q2((e4, blockId) => {
    e4.preventDefault();
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    const pg = getActivePage();
    if (!pg)
      return;
    if (pg.defaultBlockId === blockId)
      return;
    if (!selectedRef.current.has(blockId)) {
      if (!e4.shiftKey)
        setSelected(new Set([blockId]));
      else
        setSelected(new Set([...selectedRef.current, blockId]));
    }
    const ids = selectedRef.current.has(blockId) ? [...selectedRef.current] : [blockId];
    const origPos = new Map;
    for (const id of ids) {
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
      if (el)
        origPos.set(id, { x: parseInt(el.style.left), y: parseInt(el.style.top) });
    }
    const { clientX: startX, clientY: startY } = e4;
    const { zoom } = viewRef.current;
    function onMove(e22) {
      const dx = (e22.clientX - startX) / zoom;
      const dy = (e22.clientY - startY) / zoom;
      for (const [id, orig] of origPos) {
        const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
        if (!el)
          continue;
        el.style.left = Math.max(0, orig.x + dx) + "px";
        el.style.top = Math.max(0, orig.y + dy) + "px";
      }
    }
    function onUp() {
      const moves = [];
      for (const [id, orig] of origPos) {
        moves.push({ id, x: orig.x, y: orig.y });
        const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
        if (el)
          updateBlockPos(id, parseInt(el.style.left), parseInt(el.style.top));
      }
      pushUndo(pg.id, { type: "move", moves });
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, []);
  const onBlockResizeStart = q2((e4, blockId) => {
    e4.preventDefault();
    const el = innerRef.current?.querySelector(`[data-block-id="${blockId}"]`);
    if (!el)
      return;
    const origW = parseInt(el.style.width) || 480;
    const startX = e4.clientX;
    const pg = getActivePage();
    function onMove(e22) {
      const dx = (e22.clientX - startX) / viewRef.current.zoom;
      el.style.width = Math.max(120, origW + dx) + "px";
    }
    function onUp() {
      if (pg)
        pushUndo(pg.id, { type: "resize", id: blockId, w: origW });
      updateBlockWidth(blockId, parseInt(el.style.width));
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, []);
  const onImgResizeStart = q2((e4, blockId, dir) => {
    e4.preventDefault();
    const el = innerRef.current?.querySelector(`[data-block-id="${blockId}"]`);
    if (!el)
      return;
    const origW = el.offsetWidth;
    const origX = parseInt(el.style.left);
    const origY = parseInt(el.style.top);
    const startX = e4.clientX;
    const pg = getActivePage();
    function onMove(e22) {
      const dx = (e22.clientX - startX) / viewRef.current.zoom;
      const newW = Math.max(40, origW + (dir.includes("e") ? dx : -dx));
      el.style.width = newW + "px";
      if (dir.includes("w"))
        el.style.left = origX - (newW - origW) + "px";
    }
    function onUp() {
      if (pg)
        pushUndo(pg.id, { type: "resize", id: blockId, w: origW, x: origX, y: origY });
      updateBlockWidth(blockId, parseInt(el.style.width));
      updateBlockPos(blockId, parseInt(el.style.left), parseInt(el.style.top));
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, []);
  function startPan(startX, startY) {
    const origPan = { ...viewRef.current };
    function onMove(e4) {
      const dx = (e4.clientX - startX) / viewRef.current.zoom;
      const dy = (e4.clientY - startY) / viewRef.current.zoom;
      viewRef.current.panX = Math.max(0, origPan.panX - dx);
      viewRef.current.panY = Math.max(0, origPan.panY - dy);
      applyTransform();
    }
    function onUp() {
      updatePageView(viewRef.current.panX, viewRef.current.panY, viewRef.current.zoom);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }
  function startMarquee(startClientX, startClientY) {
    const startScreen = toScreen(startClientX, startClientY);
    const startCanvas = toCanvas(startClientX, startClientY);
    const mq = marqueeRef.current;
    if (mq) {
      mq.style.display = "block";
      mq.style.cssText += "; left:0;top:0;width:0;height:0";
    }
    function onMove(e4) {
      const cur = toScreen(e4.clientX, e4.clientY);
      const x3 = Math.min(startScreen.x, cur.x);
      const y4 = Math.min(startScreen.y, cur.y);
      const w4 = Math.abs(cur.x - startScreen.x);
      const h5 = Math.abs(cur.y - startScreen.y);
      if (mq) {
        mq.style.left = x3 + "px";
        mq.style.top = y4 + "px";
        mq.style.width = w4 + "px";
        mq.style.height = h5 + "px";
      }
    }
    function onUp(e4) {
      if (mq)
        mq.style.display = "none";
      const endCanvas = toCanvas(e4.clientX, e4.clientY);
      const rx = Math.min(startCanvas.x, endCanvas.x);
      const ry = Math.min(startCanvas.y, endCanvas.y);
      const rw = Math.abs(endCanvas.x - startCanvas.x);
      const rh = Math.abs(endCanvas.y - startCanvas.y);
      if (rw > 4 || rh > 4) {
        const hits = new Set;
        innerRef.current?.querySelectorAll(".block").forEach((el) => {
          const bx = parseInt(el.style.left), by = parseInt(el.style.top);
          const { offsetWidth: bw, offsetHeight: bh } = el;
          if (bx < rx + rw && bx + bw > rx && by < ry + rh && by + bh > ry)
            hits.add(el.dataset.blockId);
        });
        setSelected(hits);
      } else {
        setSelected(new Set);
      }
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }
  function handlePointerDown(e4) {
    if (e4.button === 1 || e4.button === 0 && spaceHeld.current) {
      e4.preventDefault();
      startPan(e4.clientX, e4.clientY);
      return;
    }
    if (e4.button !== 0)
      return;
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    e4.preventDefault();
    const { clientX: startX, clientY: startY } = e4;
    let moved = false;
    let marqueeActive = false;
    function onMove(e22) {
      const dx = e22.clientX - startX, dy = e22.clientY - startY;
      if (!moved && Math.sqrt(dx * dx + dy * dy) > 4) {
        moved = true;
        marqueeActive = true;
        startMarquee(startX, startY);
      }
    }
    function onUp(e22) {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      if (!marqueeActive) {
        setSelected(new Set);
        const pos = toCanvas(startX, startY);
        addBlock(pos.x, pos.y);
        requestAnimationFrame(() => {
          const pg = getActivePage();
          if (!pg)
            return;
          const lastBlock = pg.blocks[pg.blocks.length - 1];
          if (!lastBlock)
            return;
          const el = innerRef.current?.querySelector(`[data-block-id="${lastBlock.id}"] .block-content`);
          el?.focus();
        });
      }
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }
  function handleWheel(e4) {
    e4.preventDefault();
    const { panX, panY, zoom } = viewRef.current;
    if (e4.ctrlKey || e4.metaKey) {
      const factor = e4.deltaY < 0 ? 1.1 : 0.9;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e4.clientX - rect.left, my = e4.clientY - rect.top;
      const cx = mx / zoom + panX, cy = my / zoom + panY;
      const nz = Math.max(0.2, Math.min(4, zoom * factor));
      viewRef.current = { panX: Math.max(0, cx - mx / nz), panY: Math.max(0, cy - my / nz), zoom: nz };
    } else {
      viewRef.current = { panX: Math.max(0, panX + e4.deltaX / zoom), panY: Math.max(0, panY + e4.deltaY / zoom), zoom };
    }
    applyTransform();
    updatePageView(viewRef.current.panX, viewRef.current.panY, viewRef.current.zoom);
  }
  y2(() => {
    function onKeyDown(e4) {
      if (e4.code === "Space" && !e4.target.isContentEditable && e4.target.tagName !== "INPUT") {
        spaceHeld.current = true;
        if (containerRef.current)
          containerRef.current.style.cursor = "grab";
      }
      if ((e4.key === "Delete" || e4.key === "Backspace") && selectedRef.current.size && !e4.target.isContentEditable) {
        e4.preventDefault();
        const pg = getActivePage();
        if (!pg)
          return;
        const defaultId = pg.defaultBlockId;
        const toDelete = [...selectedRef.current].filter((id) => id !== defaultId);
        if (!toDelete.length)
          return;
        const deleted = toDelete.map((id) => pg.blocks.find((b2) => b2.id === id)).filter(Boolean).map((b2) => ({ ...b2 }));
        pushUndo(pg.id, { type: "delete", blocks: deleted });
        for (const id of toDelete)
          deleteBlock(id);
        setSelected(new Set);
      }
      const mod = e4.ctrlKey || e4.metaKey;
      if (mod && e4.key === "z" && !e4.target.isContentEditable) {
        e4.preventDefault();
        e4.shiftKey ? doRedo() : doUndo();
      }
    }
    function onKeyUp(e4) {
      if (e4.code === "Space") {
        spaceHeld.current = false;
        if (containerRef.current)
          containerRef.current.style.cursor = "";
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);
  function doUndo() {
    const pg = getActivePage();
    if (!pg)
      return;
    if (!applyUndo(pg.id, pg))
      return;
    appState.value = { ...appState.value };
  }
  function doRedo() {
    const pg = getActivePage();
    if (!pg)
      return;
    if (!applyRedo(pg.id, pg))
      return;
    appState.value = { ...appState.value };
  }
  function handleDrop(e4) {
    e4.preventDefault();
    const files = [...e4.dataTransfer.files].filter((f5) => f5.type.startsWith("image/"));
    if (!files.length)
      return;
    const pos = toCanvas(e4.clientX, e4.clientY);
    files.forEach((file, i4) => {
      const reader = new FileReader;
      reader.onload = (ev) => {
        const pg = getActivePage();
        if (!pg)
          return;
        const blk = { id: crypto.randomUUID(), x: pos.x + i4 * 20, y: pos.y + i4 * 20, w: 300, html: "", type: "image", src: ev.target.result };
        pg.blocks = [...pg.blocks, blk];
        appState.value = { ...appState.value };
        updateBlockPos(blk.id, blk.x, blk.y);
      };
      reader.readAsDataURL(file);
    });
  }
  function focusDefaultBlock() {
    const pg = getActivePage();
    if (!pg?.defaultBlockId)
      return;
    const el = innerRef.current?.querySelector(`[data-block-id="${pg.defaultBlockId}"] .block-content`);
    el?.focus();
  }
  const ctx = {
    selectedIds,
    onBlockDragStart,
    onBlockResizeStart,
    onImgResizeStart,
    onBlockFocus: (id) => {},
    onBlockBlur: (id) => {},
    undo: doUndo,
    redo: doRedo
  };
  return /* @__PURE__ */ u4(k, {
    children: [
      /* @__PURE__ */ u4(PageTitle, {
        page,
        onEnter: focusDefaultBlock
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4(CanvasCtx.Provider, {
        value: ctx,
        children: /* @__PURE__ */ u4("div", {
          ref: containerRef,
          id: "canvas-container",
          onPointerDown: handlePointerDown,
          onWheel: handleWheel,
          onDragOver: (e4) => {
            if (e4.dataTransfer.types.includes("Files"))
              e4.preventDefault();
          },
          onDrop: handleDrop,
          children: [
            /* @__PURE__ */ u4("div", {
              ref: marqueeRef,
              id: "marquee-rect"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              ref: innerRef,
              id: "canvas-inner",
              style: { transformOrigin: "0 0" },
              children: page?.blocks.map((b2) => /* @__PURE__ */ u4(Block, {
                block: b2,
                page
              }, b2.id, false, undefined, this))
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              ref: hScrollRef,
              class: "canvas-scroll-thumb canvas-scroll-thumb-h"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              ref: vScrollRef,
              class: "canvas-scroll-thumb canvas-scroll-thumb-v"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/App.jsx
function App() {
  const state = appState.value;
  const { notebooks, ui } = state;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((s5) => s5.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  return /* @__PURE__ */ u4(k, {
    children: [
      /* @__PURE__ */ u4(FormatToolbar, {}, undefined, false, undefined, this),
      /* @__PURE__ */ u4(SectionPanel, {}, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        id: "body-row",
        children: [
          /* @__PURE__ */ u4(NotebookBar, {}, undefined, false, undefined, this),
          /* @__PURE__ */ u4("div", {
            id: "main",
            children: [
              /* @__PURE__ */ u4("div", {
                id: "canvas-area",
                children: /* @__PURE__ */ u4(Canvas, {
                  page
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4(PagesPanel, {}, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4(ContextMenu, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/main.jsx
document.getElementById("app").addEventListener("contextmenu", (e4) => {
  e4.preventDefault();
});
J(/* @__PURE__ */ u4(App, {}, undefined, false, undefined, this), document.getElementById("app"));

//# debugId=F5881CB37075103E64756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCAibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9kaXN0L2hvb2tzLm1vZHVsZS5qcyIsICJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMvZGlzdC9zaWduYWxzLm1vZHVsZS5qcyIsICJzcmMvc3RvcmUuanMiLCAic3JjL21haW4uanN4IiwgInNyYy9BcHAuanN4IiwgInNyYy9Ob3RlYm9va0Jhci5qc3giLCAic3JjL0NvbnRleHRNZW51LmpzeCIsICJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCAic3JjL1NlY3Rpb25QYW5lbC5qc3giLCAic3JjL1BhZ2VzUGFuZWwuanN4IiwgInNyYy9DYW52YXMuanN4IiwgInNyYy9CbG9jay5qc3giLCAic3JjL2VkaXRvci5qcyIsICJzcmMvdW5kby5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxzLGEsaCxwPXt9LHY9W10seT0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGQ9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiB3KG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGcobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gXyhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIG0obCxlLGkscixudWxsKX1mdW5jdGlvbiBtKG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBiKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gayhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiB4KG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIFMobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP1Mobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP1Mobik6bnVsbH1mdW5jdGlvbiBDKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz13KHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSx6KG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10P1ModSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sVihpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZNKG8pfX1mdW5jdGlvbiBNKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxNKG4pfWZ1bmN0aW9uICQobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSS5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSSl9ZnVuY3Rpb24gSSgpe2Zvcih2YXIgbixsPTE7aS5sZW5ndGg7KWkubGVuZ3RoPmwmJmkuc29ydChlKSxuPWkuc2hpZnQoKSxsPWkubGVuZ3RoLEMobik7SS5fX3I9MH1mdW5jdGlvbiBQKG4sbCx1LHQsaSxyLG8sZSxmLGMscyl7dmFyIGEsaCx5LGQsdyxnLF8sbT10JiZ0Ll9fa3x8dixiPWwubGVuZ3RoO2ZvcihmPUEodSxsLG0sZixiKSxhPTA7YTxiO2ErKyludWxsIT0oeT11Ll9fa1thXSkmJihoPS0xIT15Ll9faSYmbVt5Ll9faV18fHAseS5fX2k9YSxnPXoobix5LGgsaSxyLG8sZSxmLGMscyksZD15Ll9fZSx5LnJlZiYmaC5yZWYhPXkucmVmJiYoaC5yZWYmJkQoaC5yZWYsbnVsbCx5KSxzLnB1c2goeS5yZWYseS5fX2N8fGQseSkpLG51bGw9PXcmJm51bGwhPWQmJih3PWQpLChfPSEhKDQmeS5fX3UpKXx8aC5fX2s9PT15Ll9faz9mPUgoeSxmLG4sXyk6XCJmdW5jdGlvblwiPT10eXBlb2YgeS50eXBlJiZ2b2lkIDAhPT1nP2Y9ZzpkJiYoZj1kLm5leHRTaWJsaW5nKSx5Ll9fdSY9LTcpO3JldHVybiB1Ll9fZT13LGZ9ZnVuY3Rpb24gQShuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMscz11Lmxlbmd0aCxhPXMsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09bShudWxsLG8sbnVsbCxudWxsLG51bGwpOmQobyk/bz1uLl9fa1tyXT1tKGsse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09bShvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9VChvLHUsZixhKSkmJihhLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+cz9oLS06aTxzJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihhKWZvcihyPTA7cjxzO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PVMoZSkpLEUoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gSChuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1IKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPVMobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gTChuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGQobik/bi5zb21lKGZ1bmN0aW9uKG4pe0wobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBUKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxzPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8cyYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihzPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIGoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fHkudGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIEYobixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHxqKG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8aihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UoZixcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dS51PXQudToodS51PWMsbi5hZGRFdmVudExpc3RlbmVyKGwscj9hOnMscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/YTpzLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBPKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dS50KXUudD1jKys7ZWxzZSBpZih1LnQ8dC51KXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiB6KG4sdSx0LGkscixvLGUsZixjLHMpe3ZhciBhLGgscCx5LF8sbSxiLFMsQyxNLCQsSSxBLEgsTCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwoYT1sLl9fYikmJmEodSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihTPXUucHJvcHMsQz1cInByb3RvdHlwZVwiaW4gVCYmVC5wcm90b3R5cGUucmVuZGVyLE09KGE9VC5jb250ZXh0VHlwZSkmJmlbYS5fX2NdLCQ9YT9NP00ucHJvcHMudmFsdWU6YS5fXzppLHQuX19jP2I9KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOihDP3UuX19jPWg9bmV3IFQoUywkKToodS5fX2M9aD1uZXcgeChTLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1HKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSxDJiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLEMmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz13KHt9LGguX19zKSksdyhoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhTLGguX19zKSkpLHk9aC5wcm9wcyxfPWguc3RhdGUsaC5fX3Y9dSxwKUMmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSxDJiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoQyYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJlMhPT15JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhTLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShTLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPVMsaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHYucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShTLGguX19zLCQpLEMmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUoeSxfLG0pfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1TLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixBPTAsQyloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSksYT1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx2LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxhPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrQTwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9dyh3KHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSxDJiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKG09aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh5LF8pKSxIPW51bGwhPWEmJmEudHlwZT09PWsmJm51bGw9PWEua2V5P3EoYS5wcm9wcy5jaGlsZHJlbik6YSxmPVAobixkKEgpP0g6W0hdLHUsdCxpLHIsbyxlLGYsYyxzKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksYiYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoTD1vLmxlbmd0aDtMLS07KWcob1tMXSk7Tih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Tih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUIodC5fX2UsdSx0LGkscixvLGUsYyxzKTtyZXR1cm4oYT1sLmRpZmZlZCkmJmEodSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIE4obil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShOKSl9ZnVuY3Rpb24gVihuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspRCh0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gcShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmQobik/bi5tYXAocSk6dyh7fSxuKX1mdW5jdGlvbiBCKHUsdCxpLHIsbyxlLGYsYyxzKXt2YXIgYSxoLHYseSx3LF8sbSxiPWkucHJvcHN8fHAsaz10LnByb3BzLHg9dC50eXBlO2lmKFwic3ZnXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI6XCJtYXRoXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjpvfHwobz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiksbnVsbCE9ZSlmb3IoYT0wO2E8ZS5sZW5ndGg7YSsrKWlmKCh3PWVbYV0pJiZcInNldEF0dHJpYnV0ZVwiaW4gdz09ISF4JiYoeD93LmxvY2FsTmFtZT09eDozPT13Lm5vZGVUeXBlKSl7dT13LGVbYV09bnVsbDticmVha31pZihudWxsPT11KXtpZihudWxsPT14KXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrKTt1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhvLHgsay5pcyYmayksYyYmKGwuX19tJiZsLl9fbSh0LGUpLGM9ITEpLGU9bnVsbH1pZihudWxsPT14KWI9PT1rfHxjJiZ1LmRhdGE9PWt8fCh1LmRhdGE9ayk7ZWxzZXtpZihlPWUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihiPXt9LGE9MDthPHUuYXR0cmlidXRlcy5sZW5ndGg7YSsrKWJbKHc9dS5hdHRyaWJ1dGVzW2FdKS5uYW1lXT13LnZhbHVlO2ZvcihhIGluIGIpdz1iW2FdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09YT92PXc6XCJjaGlsZHJlblwiPT1hfHxhIGluIGt8fFwidmFsdWVcIj09YSYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1hJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxGKHUsYSxudWxsLHcsbyk7Zm9yKGEgaW4gayl3PWtbYV0sXCJjaGlsZHJlblwiPT1hP3k9dzpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PWE/aD13OlwidmFsdWVcIj09YT9fPXc6XCJjaGVja2VkXCI9PWE/bT13OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHd8fGJbYV09PT13fHxGKHUsYSx3LGJbYV0sbyk7aWYoaCljfHx2JiYoaC5fX2h0bWw9PXYuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYodiYmKHUuaW5uZXJIVE1MPVwiXCIpLFAoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZCh5KT95Olt5XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJlMoaSwwKSxjLHMpLG51bGwhPWUpZm9yKGE9ZS5sZW5ndGg7YS0tOylnKGVbYV0pO2N8fChhPVwidmFsdWVcIixcInByb2dyZXNzXCI9PXgmJm51bGw9PV8/dS5yZW1vdmVBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTpudWxsIT1fJiYoXyE9PXVbYV18fFwicHJvZ3Jlc3NcIj09eCYmIV98fFwib3B0aW9uXCI9PXgmJl8hPWJbYV0pJiZGKHUsYSxfLGJbYV0sbyksYT1cImNoZWNrZWRcIixudWxsIT1tJiZtIT11W2FdJiZGKHUsYSxtLGJbYV0sbykpfXJldHVybiB1fWZ1bmN0aW9uIEQobix1LHQpe3RyeXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLl9fdTtpJiZuLl9fdSgpLGkmJm51bGw9PXV8fChuLl9fdT1uKHUpKX1lbHNlIG4uY3VycmVudD11fWNhdGNoKG4pe2wuX19lKG4sdCl9fWZ1bmN0aW9uIEUobix1LHQpe3ZhciBpLHI7aWYobC51bm1vdW50JiZsLnVubW91bnQobiksKGk9bi5yZWYpJiYoaS5jdXJyZW50JiZpLmN1cnJlbnQhPW4uX19lfHxEKGksbnVsbCx1KSksbnVsbCE9KGk9bi5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobil7bC5fX2Uobix1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPW4uX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmRShpW3JdLHUsdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbi50eXBlKTt0fHxnKG4uX19lKSxuLl9fYz1uLl9fPW4uX19lPXZvaWQgMH1mdW5jdGlvbiBHKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIEoodSx0LGkpe3ZhciByLG8sZSxmO3Q9PWRvY3VtZW50JiYodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLGwuX18mJmwuX18odSx0KSxvPShyPVwiZnVuY3Rpb25cIj09dHlwZW9mIGkpP251bGw6aSYmaS5fX2t8fHQuX19rLGU9W10sZj1bXSx6KHQsdT0oIXImJml8fHQpLl9faz1fKGssbnVsbCxbdV0pLG98fHAscCx0Lm5hbWVzcGFjZVVSSSwhciYmaT9baV06bz9udWxsOnQuZmlyc3RDaGlsZD9uLmNhbGwodC5jaGlsZE5vZGVzKTpudWxsLGUsIXImJmk/aTpvP28uX19lOnQuZmlyc3RDaGlsZCxyLGYpLFYoZSx1LGYpfWZ1bmN0aW9uIEsobixsKXtKKG4sbCxLKX1mdW5jdGlvbiBRKGwsdSx0KXt2YXIgaSxyLG8sZSxmPXcoe30sbC5wcm9wcyk7Zm9yKG8gaW4gbC50eXBlJiZsLnR5cGUuZGVmYXVsdFByb3BzJiYoZT1sLnR5cGUuZGVmYXVsdFByb3BzKSx1KVwia2V5XCI9PW8/aT11W29dOlwicmVmXCI9PW8/cj11W29dOmZbb109dm9pZCAwPT09dVtvXSYmbnVsbCE9ZT9lW29dOnVbb107cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MiYmKGYuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksbShsLnR5cGUsZixpfHxsLmtleSxyfHxsLnJlZixudWxsKX1mdW5jdGlvbiBSKG4pe2Z1bmN0aW9uIGwobil7dmFyIHUsdDtyZXR1cm4gdGhpcy5nZXRDaGlsZENvbnRleHR8fCh1PW5ldyBTZXQsKHQ9e30pW2wuX19jXT10aGlzLHRoaXMuZ2V0Q2hpbGRDb250ZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1PW51bGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMucHJvcHMudmFsdWUhPW4udmFsdWUmJnUuZm9yRWFjaChmdW5jdGlvbihuKXtuLl9fZT0hMCwkKG4pfSl9LHRoaXMuc3ViPWZ1bmN0aW9uKG4pe3UuYWRkKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3UmJnUuZGVsZXRlKG4pLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufXJldHVybiBsLl9fYz1cIl9fY0NcIitoKyssbC5fXz1uLGwuUHJvdmlkZXI9bC5fX2w9KGwuQ29uc3VtZXI9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0pLmNvbnRleHRUeXBlPWwsbH1uPXYuc2xpY2UsbD17X19lOmZ1bmN0aW9uKG4sbCx1LHQpe2Zvcih2YXIgaSxyLG87bD1sLl9fOylpZigoaT1sLl9fYykmJiFpLl9fKXRyeXtpZigocj1pLmNvbnN0cnVjdG9yKSYmbnVsbCE9ci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3ImJihpLnNldFN0YXRlKHIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSxvPWkuX19kKSxudWxsIT1pLmNvbXBvbmVudERpZENhdGNoJiYoaS5jb21wb25lbnREaWRDYXRjaChuLHR8fHt9KSxvPWkuX19kKSxvKXJldHVybiBpLl9fRT1pfWNhdGNoKGwpe249bH10aHJvdyBufX0sdT0wLHQ9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LHgucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT1udWxsIT10aGlzLl9fcyYmdGhpcy5fX3MhPXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9dyh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKHcoe30sdSksdGhpcy5wcm9wcykpLG4mJncodSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKGwmJnRoaXMuX3NiLnB1c2gobCksJCh0aGlzKSl9LHgucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSwkKHRoaXMpKX0seC5wcm90b3R5cGUucmVuZGVyPWssaT1bXSxvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LGU9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5fX3YuX19iLWwuX192Ll9fYn0sSS5fX3I9MCxmPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGM9MCxzPU8oITEpLGE9TyghMCksaD0wO2V4cG9ydHt4IGFzIENvbXBvbmVudCxrIGFzIEZyYWdtZW50LFEgYXMgY2xvbmVFbGVtZW50LFIgYXMgY3JlYXRlQ29udGV4dCxfIGFzIGNyZWF0ZUVsZW1lbnQsYiBhcyBjcmVhdGVSZWYsXyBhcyBoLEsgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxKIGFzIHJlbmRlcixMIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwKICAgICJpbXBvcnR7b3B0aW9ucyBhcyBufWZyb21cInByZWFjdFwiO3ZhciB0LHIsdSxpLG89MCxmPVtdLGM9bixlPWMuX19iLGE9Yy5fX3Isdj1jLmRpZmZlZCxsPWMuX19jLG09Yy51bm1vdW50LHM9Yy5fXztmdW5jdGlvbiBwKG4sdCl7Yy5fX2gmJmMuX19oKHIsbixvfHx0KSxvPTA7dmFyIHU9ci5fX0h8fChyLl9fSD17X186W10sX19oOltdfSk7cmV0dXJuIG4+PXUuX18ubGVuZ3RoJiZ1Ll9fLnB1c2goe30pLHUuX19bbl19ZnVuY3Rpb24gZChuKXtyZXR1cm4gbz0xLGgoRCxuKX1mdW5jdGlvbiBoKG4sdSxpKXt2YXIgbz1wKHQrKywyKTtpZihvLnQ9biwhby5fX2MmJihvLl9fPVtpP2kodSk6RCh2b2lkIDAsdSksZnVuY3Rpb24obil7dmFyIHQ9by5fX04/by5fX05bMF06by5fX1swXSxyPW8udCh0LG4pO3QhPT1yJiYoby5fX049W3Isby5fX1sxXV0sby5fX2Muc2V0U3RhdGUoe30pKX1dLG8uX19jPXIsIXIuX19mKSl7dmFyIGY9ZnVuY3Rpb24obix0LHIpe2lmKCFvLl9fYy5fX0gpcmV0dXJuITA7dmFyIHU9by5fX2MuX19ILl9fLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4gbi5fX2N9KTtpZih1LmV2ZXJ5KGZ1bmN0aW9uKG4pe3JldHVybiFuLl9fTn0pKXJldHVybiFjfHxjLmNhbGwodGhpcyxuLHQscik7dmFyIGk9by5fX2MucHJvcHMhPT1uO3JldHVybiB1LnNvbWUoZnVuY3Rpb24obil7aWYobi5fX04pe3ZhciB0PW4uX19bMF07bi5fXz1uLl9fTixuLl9fTj12b2lkIDAsdCE9PW4uX19bMF0mJihpPSEwKX19KSxjJiZjLmNhbGwodGhpcyxuLHQscil8fGl9O3IuX19mPSEwO3ZhciBjPXIuc2hvdWxkQ29tcG9uZW50VXBkYXRlLGU9ci5jb21wb25lbnRXaWxsVXBkYXRlO3IuY29tcG9uZW50V2lsbFVwZGF0ZT1mdW5jdGlvbihuLHQscil7aWYodGhpcy5fX2Upe3ZhciB1PWM7Yz12b2lkIDAsZihuLHQsciksYz11fWUmJmUuY2FsbCh0aGlzLG4sdCxyKX0sci5zaG91bGRDb21wb25lbnRVcGRhdGU9Zn1yZXR1cm4gby5fX058fG8uX199ZnVuY3Rpb24geShuLHUpe3ZhciBpPXAodCsrLDMpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9fSC5fX2gucHVzaChpKSl9ZnVuY3Rpb24gXyhuLHUpe3ZhciBpPXAodCsrLDQpOyFjLl9fcyYmQyhpLl9fSCx1KSYmKGkuX189bixpLnU9dSxyLl9faC5wdXNoKGkpKX1mdW5jdGlvbiBBKG4pe3JldHVybiBvPTUsVChmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gRihuLHQscil7bz02LF8oZnVuY3Rpb24oKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgcj1uKHQoKSk7cmV0dXJuIGZ1bmN0aW9uKCl7bihudWxsKSxyJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiZyKCl9fWlmKG4pcmV0dXJuIG4uY3VycmVudD10KCksZnVuY3Rpb24oKXtyZXR1cm4gbi5jdXJyZW50PW51bGx9fSxudWxsPT1yP3I6ci5jb25jYXQobikpfWZ1bmN0aW9uIFQobixyKXt2YXIgdT1wKHQrKyw3KTtyZXR1cm4gQyh1Ll9fSCxyKSYmKHUuX189bigpLHUuX19IPXIsdS5fX2g9biksdS5fX31mdW5jdGlvbiBxKG4sdCl7cmV0dXJuIG89OCxUKGZ1bmN0aW9uKCl7cmV0dXJuIG59LHQpfWZ1bmN0aW9uIHgobil7dmFyIHU9ci5jb250ZXh0W24uX19jXSxpPXAodCsrLDkpO3JldHVybiBpLmM9bix1PyhudWxsPT1pLl9fJiYoaS5fXz0hMCx1LnN1YihyKSksdS5wcm9wcy52YWx1ZSk6bi5fX31mdW5jdGlvbiBQKG4sdCl7Yy51c2VEZWJ1Z1ZhbHVlJiZjLnVzZURlYnVnVmFsdWUodD90KG4pOm4pfWZ1bmN0aW9uIGIobil7dmFyIHU9cCh0KyssMTApLGk9ZCgpO3JldHVybiB1Ll9fPW4sci5jb21wb25lbnREaWRDYXRjaHx8KHIuY29tcG9uZW50RGlkQ2F0Y2g9ZnVuY3Rpb24obix0KXt1Ll9fJiZ1Ll9fKG4sdCksaVsxXShuKX0pLFtpWzBdLGZ1bmN0aW9uKCl7aVsxXSh2b2lkIDApfV19ZnVuY3Rpb24gZygpe3ZhciBuPXAodCsrLDExKTtpZighbi5fXyl7Zm9yKHZhciB1PXIuX192O251bGwhPT11JiYhdS5fX20mJm51bGwhPT11Ll9fOyl1PXUuX187dmFyIGk9dS5fX218fCh1Ll9fbT1bMCwwXSk7bi5fXz1cIlBcIitpWzBdK1wiLVwiK2lbMV0rK31yZXR1cm4gbi5fX31mdW5jdGlvbiBqKCl7Zm9yKHZhciBuO249Zi5zaGlmdCgpOyl7dmFyIHQ9bi5fX0g7aWYobi5fX1AmJnQpdHJ5e3QuX19oLnNvbWUoeiksdC5fX2guc29tZShCKSx0Ll9faD1bXX1jYXRjaChyKXt0Ll9faD1bXSxjLl9fZShyLG4uX192KX19fWMuX19iPWZ1bmN0aW9uKG4pe3I9bnVsbCxlJiZlKG4pfSxjLl9fPWZ1bmN0aW9uKG4sdCl7biYmdC5fX2smJnQuX19rLl9fbSYmKG4uX19tPXQuX19rLl9fbSkscyYmcyhuLHQpfSxjLl9fcj1mdW5jdGlvbihuKXthJiZhKG4pLHQ9MDt2YXIgaT0ocj1uLl9fYykuX19IO2kmJih1PT09cj8oaS5fX2g9W10sci5fX2g9W10saS5fXy5zb21lKGZ1bmN0aW9uKG4pe24uX19OJiYobi5fXz1uLl9fTiksbi51PW4uX19OPXZvaWQgMH0pKTooaS5fX2guc29tZSh6KSxpLl9faC5zb21lKEIpLGkuX19oPVtdLHQ9MCkpLHU9cn0sYy5kaWZmZWQ9ZnVuY3Rpb24obil7diYmdihuKTt2YXIgdD1uLl9fYzt0JiZ0Ll9fSCYmKHQuX19ILl9faC5sZW5ndGgmJigxIT09Zi5wdXNoKHQpJiZpPT09Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCgoaT1jLnJlcXVlc3RBbmltYXRpb25GcmFtZSl8fHcpKGopKSx0Ll9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe24udSYmKG4uX19IPW4udSksbi51PXZvaWQgMH0pKSx1PXI9bnVsbH0sYy5fX2M9ZnVuY3Rpb24obix0KXt0LnNvbWUoZnVuY3Rpb24obil7dHJ5e24uX19oLnNvbWUoeiksbi5fX2g9bi5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHxCKG4pfSl9Y2F0Y2gocil7dC5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSksdD1bXSxjLl9fZShyLG4uX192KX19KSxsJiZsKG4sdCl9LGMudW5tb3VudD1mdW5jdGlvbihuKXttJiZtKG4pO3ZhciB0LHI9bi5fX2M7ciYmci5fX0gmJihyLl9fSC5fXy5zb21lKGZ1bmN0aW9uKG4pe3RyeXt6KG4pfWNhdGNoKG4pe3Q9bn19KSxyLl9fSD12b2lkIDAsdCYmYy5fX2UodCxyLl9fdikpfTt2YXIgaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ZnVuY3Rpb24gdyhuKXt2YXIgdCxyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHUpLGsmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHU9c2V0VGltZW91dChyLDM1KTtrJiYodD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocikpfWZ1bmN0aW9uIHoobil7dmFyIHQ9cix1PW4uX19jO1wiZnVuY3Rpb25cIj09dHlwZW9mIHUmJihuLl9fYz12b2lkIDAsdSgpKSxyPXR9ZnVuY3Rpb24gQihuKXt2YXIgdD1yO24uX19jPW4uX18oKSxyPXR9ZnVuY3Rpb24gQyhuLHQpe3JldHVybiFufHxuLmxlbmd0aCE9PXQubGVuZ3RofHx0LnNvbWUoZnVuY3Rpb24odCxyKXtyZXR1cm4gdCE9PW5bcl19KX1mdW5jdGlvbiBEKG4sdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdD90KG4pOnR9ZXhwb3J0e3EgYXMgdXNlQ2FsbGJhY2sseCBhcyB1c2VDb250ZXh0LFAgYXMgdXNlRGVidWdWYWx1ZSx5IGFzIHVzZUVmZmVjdCxiIGFzIHVzZUVycm9yQm91bmRhcnksZyBhcyB1c2VJZCxGIGFzIHVzZUltcGVyYXRpdmVIYW5kbGUsXyBhcyB1c2VMYXlvdXRFZmZlY3QsVCBhcyB1c2VNZW1vLGggYXMgdXNlUmVkdWNlcixBIGFzIHVzZVJlZixkIGFzIHVzZVN0YXRlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvb2tzLm1vZHVsZS5qcy5tYXBcbiIsCiAgICAidmFyIGk9U3ltYm9sLmZvcihcInByZWFjdC1zaWduYWxzXCIpO2Z1bmN0aW9uIHQoKXtpZighKHM+MSkpe3ZhciBpLHQ9ITE7d2hpbGUodm9pZCAwIT09aCl7dmFyIG49aDtoPXZvaWQgMDt2Kys7d2hpbGUodm9pZCAwIT09bil7dmFyIHI9bi5vO24ubz12b2lkIDA7bi5mJj0tMztpZighKDgmbi5mKSYmYShuKSl0cnl7bi5jKCl9Y2F0Y2gobil7aWYoIXQpe2k9bjt0PSEwfX1uPXJ9fXY9MDtzLS07aWYodCl0aHJvdyBpfWVsc2Ugcy0tfWZ1bmN0aW9uIG4oaSl7aWYocz4wKXJldHVybiBpKCk7cysrO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7dCgpfX12YXIgcj12b2lkIDA7ZnVuY3Rpb24gbyhpKXt2YXIgdD1yO3I9dm9pZCAwO3RyeXtyZXR1cm4gaSgpfWZpbmFsbHl7cj10fX12YXIgZixoPXZvaWQgMCxzPTAsdj0wLHU9MDtmdW5jdGlvbiBlKGkpe2lmKHZvaWQgMCE9PXIpe3ZhciB0PWkubjtpZih2b2lkIDA9PT10fHx0LnQhPT1yKXt0PXtpOjAsUzppLHA6ci5zLG46dm9pZCAwLHQ6cixlOnZvaWQgMCx4OnZvaWQgMCxyOnR9O2lmKHZvaWQgMCE9PXIucylyLnMubj10O3Iucz10O2kubj10O2lmKDMyJnIuZilpLlModCk7cmV0dXJuIHR9ZWxzZSBpZigtMT09PXQuaSl7dC5pPTA7aWYodm9pZCAwIT09dC5uKXt0Lm4ucD10LnA7aWYodm9pZCAwIT09dC5wKXQucC5uPXQubjt0LnA9ci5zO3Qubj12b2lkIDA7ci5zLm49dDtyLnM9dH1yZXR1cm4gdH19fWZ1bmN0aW9uIGQoaSx0KXt0aGlzLnY9aTt0aGlzLmk9MDt0aGlzLm49dm9pZCAwO3RoaXMudD12b2lkIDA7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX1kLnByb3RvdHlwZS5icmFuZD1pO2QucHJvdG90eXBlLmg9ZnVuY3Rpb24oKXtyZXR1cm4hMH07ZC5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXt2YXIgdD10aGlzLG49dGhpcy50O2lmKG4hPT1pJiZ2b2lkIDA9PT1pLmUpe2kueD1uO3RoaXMudD1pO2lmKHZvaWQgMCE9PW4pbi5lPWk7ZWxzZSBvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5XKXx8aS5jYWxsKHQpfSl9fTtkLnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7aWYodm9pZCAwIT09dGhpcy50KXt2YXIgbj1pLmUscj1pLng7aWYodm9pZCAwIT09bil7bi54PXI7aS5lPXZvaWQgMH1pZih2b2lkIDAhPT1yKXtyLmU9bjtpLng9dm9pZCAwfWlmKGk9PT10aGlzLnQpe3RoaXMudD1yO2lmKHZvaWQgMD09PXIpbyhmdW5jdGlvbigpe3ZhciBpO251bGw9PShpPXQuWil8fGkuY2FsbCh0KX0pfX19O2QucHJvdG90eXBlLnN1YnNjcmliZT1mdW5jdGlvbihpKXt2YXIgdD10aGlzO3JldHVybiBtKGZ1bmN0aW9uKCl7dmFyIG49dC52YWx1ZSxvPXI7cj12b2lkIDA7dHJ5e2kobil9ZmluYWxseXtyPW99fSx7bmFtZTpcInN1YlwifSl9O2QucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07ZC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZStcIlwifTtkLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX07ZC5wcm90b3R5cGUucGVlaz1mdW5jdGlvbigpe3ZhciBpPXI7cj12b2lkIDA7dHJ5e3JldHVybiB0aGlzLnZhbHVlfWZpbmFsbHl7cj1pfX07T2JqZWN0LmRlZmluZVByb3BlcnR5KGQucHJvdG90eXBlLFwidmFsdWVcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGk9ZSh0aGlzKTtpZih2b2lkIDAhPT1pKWkuaT10aGlzLmk7cmV0dXJuIHRoaXMudn0sc2V0OmZ1bmN0aW9uKGkpe2lmKGkhPT10aGlzLnYpe2lmKHY+MTAwKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3RoaXMudj1pO3RoaXMuaSsrO3UrKztzKys7dHJ5e2Zvcih2YXIgbj10aGlzLnQ7dm9pZCAwIT09bjtuPW4ueCluLnQuTigpfWZpbmFsbHl7dCgpfX19fSk7ZnVuY3Rpb24gYyhpLHQpe3JldHVybiBuZXcgZChpLHQpfWZ1bmN0aW9uIGEoaSl7Zm9yKHZhciB0PWkuczt2b2lkIDAhPT10O3Q9dC5uKWlmKHQuUy5pIT09dC5pfHwhdC5TLmgoKXx8dC5TLmkhPT10LmkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gbChpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pe3ZhciBuPXQuUy5uO2lmKHZvaWQgMCE9PW4pdC5yPW47dC5TLm49dDt0Lmk9LTE7aWYodm9pZCAwPT09dC5uKXtpLnM9dDticmVha319fWZ1bmN0aW9uIHkoaSl7dmFyIHQ9aS5zLG49dm9pZCAwO3doaWxlKHZvaWQgMCE9PXQpe3ZhciByPXQucDtpZigtMT09PXQuaSl7dC5TLlUodCk7aWYodm9pZCAwIT09cilyLm49dC5uO2lmKHZvaWQgMCE9PXQubil0Lm4ucD1yfWVsc2Ugbj10O3QuUy5uPXQucjtpZih2b2lkIDAhPT10LnIpdC5yPXZvaWQgMDt0PXJ9aS5zPW59ZnVuY3Rpb24gdyhpLHQpe2QuY2FsbCh0aGlzLHZvaWQgMCk7dGhpcy54PWk7dGhpcy5zPXZvaWQgMDt0aGlzLmc9dS0xO3RoaXMuZj00O3RoaXMuVz1udWxsPT10P3ZvaWQgMDp0LndhdGNoZWQ7dGhpcy5aPW51bGw9PXQ/dm9pZCAwOnQudW53YXRjaGVkO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWV9dy5wcm90b3R5cGU9bmV3IGQ7dy5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3RoaXMuZiY9LTM7aWYoMSZ0aGlzLmYpcmV0dXJuITE7aWYoMzI9PSgzNiZ0aGlzLmYpKXJldHVybiEwO3RoaXMuZiY9LTU7aWYodGhpcy5nPT09dSlyZXR1cm4hMDt0aGlzLmc9dTt0aGlzLmZ8PTE7aWYodGhpcy5pPjAmJiFhKHRoaXMpKXt0aGlzLmYmPS0yO3JldHVybiEwfXZhciBpPXI7dHJ5e2wodGhpcyk7cj10aGlzO3ZhciB0PXRoaXMueCgpO2lmKDE2JnRoaXMuZnx8dGhpcy52IT09dHx8MD09PXRoaXMuaSl7dGhpcy52PXQ7dGhpcy5mJj0tMTc7dGhpcy5pKyt9fWNhdGNoKGkpe3RoaXMudj1pO3RoaXMuZnw9MTY7dGhpcy5pKyt9cj1pO3kodGhpcyk7dGhpcy5mJj0tMjtyZXR1cm4hMH07dy5wcm90b3R5cGUuUz1mdW5jdGlvbihpKXtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZnw9MzY7Zm9yKHZhciB0PXRoaXMuczt2b2lkIDAhPT10O3Q9dC5uKXQuUy5TKHQpfWQucHJvdG90eXBlLlMuY2FsbCh0aGlzLGkpfTt3LnByb3RvdHlwZS5VPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMCE9PXRoaXMudCl7ZC5wcm90b3R5cGUuVS5jYWxsKHRoaXMsaSk7aWYodm9pZCAwPT09dGhpcy50KXt0aGlzLmYmPS0zMztmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCl9fX07dy5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTY7Zm9yKHZhciBpPXRoaXMudDt2b2lkIDAhPT1pO2k9aS54KWkudC5OKCl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkody5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt2YXIgaT1lKHRoaXMpO3RoaXMuaCgpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtpZigxNiZ0aGlzLmYpdGhyb3cgdGhpcy52O3JldHVybiB0aGlzLnZ9fSk7ZnVuY3Rpb24gYihpLHQpe3JldHVybiBuZXcgdyhpLHQpfWZ1bmN0aW9uIF8oaSl7dmFyIG49aS51O2kudT12b2lkIDA7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7cysrO3ZhciBvPXI7cj12b2lkIDA7dHJ5e24oKX1jYXRjaCh0KXtpLmYmPS0yO2kuZnw9ODtwKGkpO3Rocm93IHR9ZmluYWxseXtyPW87dCgpfX19ZnVuY3Rpb24gcChpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlUodCk7aS54PXZvaWQgMDtpLnM9dm9pZCAwO18oaSl9ZnVuY3Rpb24gZyhpKXtpZihyIT09dGhpcyl0aHJvdyBuZXcgRXJyb3IoXCJPdXQtb2Ytb3JkZXIgZWZmZWN0XCIpO3kodGhpcyk7cj1pO3RoaXMuZiY9LTI7aWYoOCZ0aGlzLmYpcCh0aGlzKTt0KCl9ZnVuY3Rpb24gUyhpLHQpe3RoaXMueD1pO3RoaXMudT12b2lkIDA7dGhpcy5zPXZvaWQgMDt0aGlzLm89dm9pZCAwO3RoaXMuZj0zMjt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lO2lmKGYpZi5wdXNoKHRoaXMpfVMucHJvdG90eXBlLmM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLlMoKTt0cnl7aWYoOCZ0aGlzLmYpcmV0dXJuO2lmKHZvaWQgMD09PXRoaXMueClyZXR1cm47dmFyIHQ9dGhpcy54KCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0aGlzLnU9dH1maW5hbGx5e2koKX19O1MucHJvdG90eXBlLlM9ZnVuY3Rpb24oKXtpZigxJnRoaXMuZil0aHJvdyBuZXcgRXJyb3IoXCJDeWNsZSBkZXRlY3RlZFwiKTt0aGlzLmZ8PTE7dGhpcy5mJj0tOTtfKHRoaXMpO2wodGhpcyk7cysrO3ZhciBpPXI7cj10aGlzO3JldHVybiBnLmJpbmQodGhpcyxpKX07Uy5wcm90b3R5cGUuTj1mdW5jdGlvbigpe2lmKCEoMiZ0aGlzLmYpKXt0aGlzLmZ8PTI7dGhpcy5vPWg7aD10aGlzfX07Uy5wcm90b3R5cGUuZD1mdW5jdGlvbigpe3RoaXMuZnw9ODtpZighKDEmdGhpcy5mKSlwKHRoaXMpfTtTLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy5kKCl9O2Z1bmN0aW9uIG0oaSx0KXt2YXIgbj1uZXcgUyhpLHQpO3RyeXtuLmMoKX1jYXRjaChpKXtuLmQoKTt0aHJvdyBpfXZhciByPW4uZC5iaW5kKG4pO3JbU3ltYm9sLmRpc3Bvc2VdPXI7cmV0dXJuIHJ9ZnVuY3Rpb24gRShpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMscj10aGlzO3JldHVybiBuKGZ1bmN0aW9uKCl7cmV0dXJuIG8oZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseShyLFtdLnNsaWNlLmNhbGwodCkpfSl9KX19ZnVuY3Rpb24geCgpe3ZhciBpPWY7Zj1bXTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1mO2lmKGYmJmkpaT1pLmNvbmNhdChmKTtmPWk7cmV0dXJuIHR9fWZ1bmN0aW9uIEMoaSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQsbixyPXgoKTt0cnl7bj1pLmFwcGx5KHZvaWQgMCxbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfWNhdGNoKGkpe2Y9dm9pZCAwO3Rocm93IGl9ZmluYWxseXt0PXIoKX1mb3IodmFyIG8gaW4gbilpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuW29dKW5bb109RShuW29dKTtuW1N5bWJvbC5kaXNwb3NlXT1FKGZ1bmN0aW9uKCl7aWYodClmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKyl0W2ldLmRpc3Bvc2UoKTt0PXZvaWQgMH0pO3JldHVybiBufX1leHBvcnR7dyBhcyBDb21wdXRlZCxTIGFzIEVmZmVjdCxkIGFzIFNpZ25hbCxFIGFzIGFjdGlvbixuIGFzIGJhdGNoLGIgYXMgY29tcHV0ZWQsQyBhcyBjcmVhdGVNb2RlbCxtIGFzIGVmZmVjdCxjIGFzIHNpZ25hbCxvIGFzIHVudHJhY2tlZH07Ly8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmFscy1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsCiAgICAiaW1wb3J0e0NvbXBvbmVudCBhcyBpLG9wdGlvbnMgYXMgcixpc1ZhbGlkRWxlbWVudCBhcyBufWZyb21cInByZWFjdFwiO2ltcG9ydHt1c2VNZW1vIGFzIHQsdXNlUmVmIGFzIGYsdXNlRWZmZWN0IGFzIG99ZnJvbVwicHJlYWN0L2hvb2tzXCI7aW1wb3J0e1NpZ25hbCBhcyBlLGNvbXB1dGVkIGFzIHUsc2lnbmFsIGFzIGEsZWZmZWN0IGFzIGN9ZnJvbVwiQHByZWFjdC9zaWduYWxzLWNvcmVcIjtleHBvcnR7U2lnbmFsLGJhdGNoLGNvbXB1dGVkLGVmZmVjdCxzaWduYWwsdW50cmFja2VkfWZyb21cIkBwcmVhY3Qvc2lnbmFscy1jb3JlXCI7dmFyIHYscztmdW5jdGlvbiBsKGksbil7cltpXT1uLmJpbmQobnVsbCxyW2ldfHxmdW5jdGlvbigpe30pfWZ1bmN0aW9uIGQoaSl7aWYocyl7dmFyIHI9cztzPXZvaWQgMDtyKCl9cz1pJiZpLlMoKX1mdW5jdGlvbiBoKGkpe3ZhciByPXRoaXMsZj1pLmRhdGEsbz11c2VTaWduYWwoZik7by52YWx1ZT1mO3ZhciBlPXQoZnVuY3Rpb24oKXt2YXIgaT1yLl9fdjt3aGlsZShpPWkuX18paWYoaS5fX2Mpe2kuX19jLl9fJGZ8PTQ7YnJlYWt9ci5fXyR1LmM9ZnVuY3Rpb24oKXt2YXIgaSx0PXIuX18kdS5TKCksZj1lLnZhbHVlO3QoKTtpZihuKGYpfHwzIT09KG51bGw9PShpPXIuYmFzZSk/dm9pZCAwOmkubm9kZVR5cGUpKXtyLl9fJGZ8PTE7ci5zZXRTdGF0ZSh7fSl9ZWxzZSByLmJhc2UuZGF0YT1mfTtyZXR1cm4gdShmdW5jdGlvbigpe3ZhciBpPW8udmFsdWUudmFsdWU7cmV0dXJuIDA9PT1pPzA6ITA9PT1pP1wiXCI6aXx8XCJcIn0pfSxbXSk7cmV0dXJuIGUudmFsdWV9aC5kaXNwbGF5TmFtZT1cIl9zdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnZvaWQgMH0sdHlwZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOmh9LHByb3BzOntjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJue2RhdGE6dGhpc319fSxfX2I6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZToxfX0pO2woXCJfX2JcIixmdW5jdGlvbihpLHIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiByLnR5cGUpe3ZhciBuLHQ9ci5wcm9wcztmb3IodmFyIGYgaW4gdClpZihcImNoaWxkcmVuXCIhPT1mKXt2YXIgbz10W2ZdO2lmKG8gaW5zdGFuY2VvZiBlKXtpZighbilyLl9fbnA9bj17fTtuW2ZdPW87dFtmXT1vLnBlZWsoKX19fWkocil9KTtsKFwiX19yXCIsZnVuY3Rpb24oaSxyKXtpKHIpO2QoKTt2YXIgbix0PXIuX19jO2lmKHQpe3QuX18kZiY9LTI7aWYodm9pZCAwPT09KG49dC5fXyR1KSl0Ll9fJHU9bj1mdW5jdGlvbihpKXt2YXIgcjtjKGZ1bmN0aW9uKCl7cj10aGlzfSk7ci5jPWZ1bmN0aW9uKCl7dC5fXyRmfD0xO3Quc2V0U3RhdGUoe30pfTtyZXR1cm4gcn0oKX12PXQ7ZChuKX0pO2woXCJfX2VcIixmdW5jdGlvbihpLHIsbix0KXtkKCk7dj12b2lkIDA7aShyLG4sdCl9KTtsKFwiZGlmZmVkXCIsZnVuY3Rpb24oaSxyKXtkKCk7dj12b2lkIDA7dmFyIG47aWYoXCJzdHJpbmdcIj09dHlwZW9mIHIudHlwZSYmKG49ci5fX2UpKXt2YXIgdD1yLl9fbnAsZj1yLnByb3BzO2lmKHQpe3ZhciBvPW4uVTtpZihvKWZvcih2YXIgZSBpbiBvKXt2YXIgdT1vW2VdO2lmKHZvaWQgMCE9PXUmJiEoZSBpbiB0KSl7dS5kKCk7b1tlXT12b2lkIDB9fWVsc2Ugbi5VPW89e307Zm9yKHZhciBhIGluIHQpe3ZhciBjPW9bYV0scz10W2FdO2lmKHZvaWQgMD09PWMpe2M9cChuLGEscyxmKTtvW2FdPWN9ZWxzZSBjLm8ocyxmKX19fWkocil9KTtmdW5jdGlvbiBwKGkscixuLHQpe3ZhciBmPXIgaW4gaSYmdm9pZCAwPT09aS5vd25lclNWR0VsZW1lbnQsbz1hKG4pO3JldHVybntvOmZ1bmN0aW9uKGkscil7by52YWx1ZT1pO3Q9cn0sZDpjKGZ1bmN0aW9uKCl7dmFyIG49by52YWx1ZS52YWx1ZTtpZih0W3JdIT09bil7dFtyXT1uO2lmKGYpaVtyXT1uO2Vsc2UgaWYobilpLnNldEF0dHJpYnV0ZShyLG4pO2Vsc2UgaS5yZW1vdmVBdHRyaWJ1dGUocil9fSl9fWwoXCJ1bm1vdW50XCIsZnVuY3Rpb24oaSxyKXtpZihcInN0cmluZ1wiPT10eXBlb2Ygci50eXBlKXt2YXIgbj1yLl9fZTtpZihuKXt2YXIgdD1uLlU7aWYodCl7bi5VPXZvaWQgMDtmb3IodmFyIGYgaW4gdCl7dmFyIG89dFtmXTtpZihvKW8uZCgpfX19fWVsc2V7dmFyIGU9ci5fX2M7aWYoZSl7dmFyIHU9ZS5fXyR1O2lmKHUpe2UuX18kdT12b2lkIDA7dS5kKCl9fX1pKHIpfSk7bChcIl9faFwiLGZ1bmN0aW9uKGkscixuLHQpe2lmKHQ8M3x8OT09PXQpci5fXyRmfD0yO2kocixuLHQpfSk7aS5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGkscil7aWYodGhpcy5fX1IpcmV0dXJuITA7dmFyIG49dGhpcy5fXyR1LHQ9biYmdm9pZCAwIT09bi5zO2Zvcih2YXIgZiBpbiByKXJldHVybiEwO2lmKHRoaXMuX19mfHxcImJvb2xlYW5cIj09dHlwZW9mIHRoaXMudSYmITA9PT10aGlzLnUpe2lmKCEodHx8MiZ0aGlzLl9fJGZ8fDQmdGhpcy5fXyRmKSlyZXR1cm4hMDtpZigxJnRoaXMuX18kZilyZXR1cm4hMH1lbHNle2lmKCEodHx8NCZ0aGlzLl9fJGYpKXJldHVybiEwO2lmKDMmdGhpcy5fXyRmKXJldHVybiEwfWZvcih2YXIgbyBpbiBpKWlmKFwiX19zb3VyY2VcIiE9PW8mJmlbb10hPT10aGlzLnByb3BzW29dKXJldHVybiEwO2Zvcih2YXIgZSBpbiB0aGlzLnByb3BzKWlmKCEoZSBpbiBpKSlyZXR1cm4hMDtyZXR1cm4hMX07ZnVuY3Rpb24gdXNlU2lnbmFsKGkpe3JldHVybiB0KGZ1bmN0aW9uKCl7cmV0dXJuIGEoaSl9LFtdKX1mdW5jdGlvbiB1c2VDb21wdXRlZChpKXt2YXIgcj1mKGkpO3IuY3VycmVudD1pO3YuX18kZnw9NDtyZXR1cm4gdChmdW5jdGlvbigpe3JldHVybiB1KGZ1bmN0aW9uKCl7cmV0dXJuIHIuY3VycmVudCgpfSl9LFtdKX1mdW5jdGlvbiB1c2VTaWduYWxFZmZlY3QoaSl7dmFyIHI9ZihpKTtyLmN1cnJlbnQ9aTtvKGZ1bmN0aW9uKCl7cmV0dXJuIGMoZnVuY3Rpb24oKXtyZXR1cm4gci5jdXJyZW50KCl9KX0sW10pfWV4cG9ydHt1c2VDb21wdXRlZCx1c2VTaWduYWwsdXNlU2lnbmFsRWZmZWN0fTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLm1vZHVsZS5qcy5tYXBcbiIsCiAgICAiaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSAnQHByZWFjdC9zaWduYWxzJztcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnb25lbm90ZV92NCc7XG5leHBvcnQgY29uc3QgdWlkID0gKCkgPT4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblxuLy8g4pSA4pSA4pSAIERlZmF1bHQgY29uc3RydWN0b3JzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBta0Jsb2NrKHggPSAwLCB5ID0gMCwgdyA9IDQ4MCkge1xuICByZXR1cm4geyBpZDogdWlkKCksIHgsIHksIHcsIGh0bWw6ICcnLCB0eXBlOiAndGV4dCcgfTtcbn1cblxuZnVuY3Rpb24gbWtQYWdlKHRpdGxlID0gJ1VudGl0bGVkIFBhZ2UnKSB7XG4gIGNvbnN0IGRiID0gbWtCbG9jaygwLCAwLCA0ODApO1xuICByZXR1cm4geyBpZDogdWlkKCksIHRpdGxlLCBjaGlsZHJlbjogW10sIGRlZmF1bHRCbG9ja0lkOiBkYi5pZCwgYmxvY2tzOiBbZGJdLCBwYW5YOiAwLCBwYW5ZOiAwLCB6b29tOiAxIH07XG59XG5cbmZ1bmN0aW9uIG1rU2VjdGlvbih0aXRsZSA9ICdOZXcgU2VjdGlvbicpIHtcbiAgcmV0dXJuIHsgaWQ6IHVpZCgpLCB0aXRsZSwgcGFnZXM6IFtta1BhZ2UoKV0gfTtcbn1cblxuZnVuY3Rpb24gbWtOb3RlYm9vayh0aXRsZSA9ICdNeSBOb3RlYm9vaycpIHtcbiAgY29uc3Qgc2VjID0gbWtTZWN0aW9uKCk7XG4gIHJldHVybiB7IGlkOiB1aWQoKSwgdGl0bGUsIHNlY3Rpb25zOiBbc2VjXSB9O1xufVxuXG4vLyDilIDilIDilIAgUGVyc2lzdGVuY2Ug4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHRyeSB7IGNvbnN0IHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7IHJldHVybiByID8gSlNPTi5wYXJzZShyKSA6IG51bGw7IH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5sZXQgX3NhdmVUaW1lciA9IG51bGw7XG5mdW5jdGlvbiBzY2hlZHVsZVNhdmUoKSB7XG4gIGNsZWFyVGltZW91dChfc2F2ZVRpbWVyKTtcbiAgX3NhdmVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShhcHBTdGF0ZS52YWx1ZSkpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUud2FybignU2F2ZSBmYWlsZWQnLCBlKTsgfVxuICB9LCAzMDApO1xufVxuXG4vLyDilIDilIDilIAgU3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZSgpIHtcbiAgY29uc3QgbmIgPSBta05vdGVib29rKCk7XG4gIHJldHVybiB7IG5vdGVib29rczogW25iXSwgdWk6IHsgbm90ZWJvb2tJZDogbmIuaWQsIHNlY3Rpb25JZDogbmIuc2VjdGlvbnNbMF0uaWQsIHBhZ2VJZDogbmIuc2VjdGlvbnNbMF0ucGFnZXNbMF0uaWQgfSB9O1xufVxuXG5leHBvcnQgY29uc3QgYXBwU3RhdGUgPSBzaWduYWwobG9hZCgpIHx8IGRlZmF1bHRTdGF0ZSgpKTtcblxuLy8gSW1tdXRhYmxlIHVwZGF0ZSDigJQgdHJpZ2dlcnMgUHJlYWN0IHJlLXJlbmRlclxuZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gIGNvbnN0IGRyYWZ0ID0gc3RydWN0dXJlZENsb25lKGFwcFN0YXRlLnZhbHVlKTtcbiAgZm4oZHJhZnQpO1xuICBhcHBTdGF0ZS52YWx1ZSA9IGRyYWZ0O1xuICBzY2hlZHVsZVNhdmUoKTtcbn1cblxuLy8gU2lsZW50IHVwZGF0ZSDigJQgbXV0YXRlIGluLXBsYWNlLCBqdXN0IHNhdmUgKG5vIHJlLXJlbmRlcilcbmZ1bmN0aW9uIHNpbGVudChmbikge1xuICBmbihhcHBTdGF0ZS52YWx1ZSk7XG4gIHNjaGVkdWxlU2F2ZSgpO1xufVxuXG4vLyDilIDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gZmluZEluVHJlZShwYWdlcywgaWQpIHtcbiAgZm9yIChjb25zdCBwIG9mIHBhZ2VzKSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSByZXR1cm4gcDtcbiAgICBpZiAocC5jaGlsZHJlbj8ubGVuZ3RoKSB7IGNvbnN0IGYgPSBmaW5kSW5UcmVlKHAuY2hpbGRyZW4sIGlkKTsgaWYgKGYpIHJldHVybiBmOyB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21UcmVlKHBhZ2VzLCBpZCkge1xuICByZXR1cm4gcGFnZXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gaWQpLm1hcChwID0+ICh7IC4uLnAsIGNoaWxkcmVuOiByZW1vdmVGcm9tVHJlZShwLmNoaWxkcmVuID8/IFtdLCBpZCkgfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlUGFnZShzID0gYXBwU3RhdGUudmFsdWUpIHtcbiAgY29uc3QgeyB1aSwgbm90ZWJvb2tzIH0gPSBzO1xuICBjb25zdCBuYiA9IG5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gdWkubm90ZWJvb2tJZCk7XG4gIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIHJldHVybiBzZWMgPyBmaW5kSW5UcmVlKHNlYy5wYWdlcywgdWkucGFnZUlkKSA6IG51bGw7XG59XG5cbmV4cG9ydCB7IGZpbmRJblRyZWUsIHJlbW92ZUZyb21UcmVlIH07XG5cbi8vIOKUgOKUgOKUgCBOYXZpZ2F0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlTm90ZWJvb2soaWQpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIHMudWkubm90ZWJvb2tJZCA9IGlkO1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IGlkKTtcbiAgICBzLnVpLnNlY3Rpb25JZCA9IG5iPy5zZWN0aW9uc1swXT8uaWQgPz8gbnVsbDtcbiAgICBzLnVpLnBhZ2VJZCA9IG5iPy5zZWN0aW9uc1swXT8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2VjdGlvbihpZCkge1xuICB1cGRhdGUocyA9PiB7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBpZDtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IGlkKTtcbiAgICBzLnVpLnBhZ2VJZCA9IHNlYz8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlUGFnZShpZCkge1xuICB1cGRhdGUocyA9PiB7IHMudWkucGFnZUlkID0gaWQ7IH0pO1xufVxuXG4vLyDilIDilIDilIAgTm90ZWJvb2sgQ1JVRCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vdGVib29rKCkge1xuICBjb25zdCBuYiA9IG1rTm90ZWJvb2soJ05ldyBOb3RlYm9vaycpO1xuICB1cGRhdGUocyA9PiB7XG4gICAgcy5ub3RlYm9va3MucHVzaChuYik7XG4gICAgcy51aS5ub3RlYm9va0lkID0gbmIuaWQ7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBuYi5zZWN0aW9uc1swXS5pZDtcbiAgICBzLnVpLnBhZ2VJZCA9IG5iLnNlY3Rpb25zWzBdLnBhZ2VzWzBdLmlkO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZU5vdGVib29rKGlkLCB0aXRsZSkge1xuICB1cGRhdGUocyA9PiB7IGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IGlkKTsgaWYgKG5iKSBuYi50aXRsZSA9IHRpdGxlOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZU5vdGVib29rKGlkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBzLm5vdGVib29rcyA9IHMubm90ZWJvb2tzLmZpbHRlcihuID0+IG4uaWQgIT09IGlkKTtcbiAgICBpZiAocy51aS5ub3RlYm9va0lkID09PSBpZCkge1xuICAgICAgY29uc3QgbmIgPSBzLm5vdGVib29rc1swXTtcbiAgICAgIHMudWkubm90ZWJvb2tJZCA9IG5iPy5pZCA/PyBudWxsO1xuICAgICAgcy51aS5zZWN0aW9uSWQgPSBuYj8uc2VjdGlvbnNbMF0/LmlkID8/IG51bGw7XG4gICAgICBzLnVpLnBhZ2VJZCA9IG5iPy5zZWN0aW9uc1swXT8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlb3JkZXJOb3RlYm9va3MoaWRzKSB7XG4gIHVwZGF0ZShzID0+IHsgcy5ub3RlYm9va3Muc29ydCgoYSwgYikgPT4gaWRzLmluZGV4T2YoYS5pZCkgLSBpZHMuaW5kZXhPZihiLmlkKSk7IH0pO1xufVxuXG4vLyDilIDilIDilIAgU2VjdGlvbiBDUlVEIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2VjdGlvbihuYklkKSB7XG4gIGNvbnN0IHNlYyA9IG1rU2VjdGlvbignTmV3IFNlY3Rpb24nKTtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IG5iSWQpO1xuICAgIGlmICghbmIpIHJldHVybjtcbiAgICBuYi5zZWN0aW9ucy5wdXNoKHNlYyk7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBzZWMuaWQ7XG4gICAgcy51aS5wYWdlSWQgPSBzZWMucGFnZXNbMF0uaWQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lU2VjdGlvbihuYklkLCBzZWNJZCwgdGl0bGUpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IHNlYyA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBuYklkKT8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHNlY0lkKTtcbiAgICBpZiAoc2VjKSBzZWMudGl0bGUgPSB0aXRsZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVTZWN0aW9uKG5iSWQsIHNlY0lkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBuYklkKTtcbiAgICBpZiAoIW5iKSByZXR1cm47XG4gICAgbmIuc2VjdGlvbnMgPSBuYi5zZWN0aW9ucy5maWx0ZXIoc2VjID0+IHNlYy5pZCAhPT0gc2VjSWQpO1xuICAgIGlmIChzLnVpLnNlY3Rpb25JZCA9PT0gc2VjSWQpIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gbmIuc2VjdGlvbnNbMF07XG4gICAgICBzLnVpLnNlY3Rpb25JZCA9IGZpcnN0Py5pZCA/PyBudWxsO1xuICAgICAgcy51aS5wYWdlSWQgPSBmaXJzdD8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlb3JkZXJTZWN0aW9ucyhuYklkLCBpZHMpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IG5iSWQpO1xuICAgIGlmIChuYikgbmIuc2VjdGlvbnMuc29ydCgoYSwgYikgPT4gaWRzLmluZGV4T2YoYS5pZCkgLSBpZHMuaW5kZXhPZihiLmlkKSk7XG4gIH0pO1xufVxuXG4vLyDilIDilIDilIAgUGFnZSBDUlVEIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUGFnZShwYXJlbnRQYWdlSWQgPSBudWxsKSB7XG4gIGNvbnN0IHBnID0gbWtQYWdlKCdVbnRpdGxlZCBQYWdlJyk7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIGlmIChwYXJlbnRQYWdlSWQpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGZpbmRJblRyZWUoc2VjLnBhZ2VzLCBwYXJlbnRQYWdlSWQpO1xuICAgICAgaWYgKHBhcmVudCkgeyBwYXJlbnQuY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4gPz8gW107IHBhcmVudC5jaGlsZHJlbi5wdXNoKHBnKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWMucGFnZXMucHVzaChwZyk7XG4gICAgfVxuICAgIHMudWkucGFnZUlkID0gcGcuaWQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lUGFnZShwYWdlSWQsIHRpdGxlKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIGNvbnN0IHBnID0gZmluZEluVHJlZShzZWMucGFnZXMsIHBhZ2VJZCk7XG4gICAgaWYgKHBnKSBwZy50aXRsZSA9IHRpdGxlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVBhZ2UocGFnZUlkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIHNlYy5wYWdlcyA9IHJlbW92ZUZyb21UcmVlKHNlYy5wYWdlcywgcGFnZUlkKTtcbiAgICBpZiAocy51aS5wYWdlSWQgPT09IHBhZ2VJZCkgcy51aS5wYWdlSWQgPSBzZWMucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBhZ2UocGFnZUlkLCB0YXJnZXRTZWNJZCkge1xuICB1cGRhdGUocyA9PiB7XG4gICAgY29uc3QgbmIgPSBzLm5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gcy51aS5ub3RlYm9va0lkKTtcbiAgICBpZiAoIW5iKSByZXR1cm47XG4gICAgbGV0IHBnID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlYyBvZiBuYi5zZWN0aW9ucykge1xuICAgICAgY29uc3QgZm91bmQgPSBmaW5kSW5UcmVlKHNlYy5wYWdlcywgcGFnZUlkKTtcbiAgICAgIGlmIChmb3VuZCkgeyBwZyA9IHN0cnVjdHVyZWRDbG9uZShmb3VuZCk7IHNlYy5wYWdlcyA9IHJlbW92ZUZyb21UcmVlKHNlYy5wYWdlcywgcGFnZUlkKTsgYnJlYWs7IH1cbiAgICB9XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldCA9IG5iLnNlY3Rpb25zLmZpbmQoc2VjID0+IHNlYy5pZCA9PT0gdGFyZ2V0U2VjSWQpO1xuICAgIGlmICh0YXJnZXQpIHRhcmdldC5wYWdlcy5wdXNoKHBnKTtcbiAgfSk7XG59XG5cbi8vIOKUgOKUgOKUgCBCbG9jayBDUlVEIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQmxvY2soeCwgeSwgdyA9IDQ4MCwgdHlwZSA9ICd0ZXh0Jykge1xuICBjb25zdCBibGsgPSB7IGlkOiB1aWQoKSwgeCwgeSwgdywgaHRtbDogJycsIHR5cGUgfTtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZShzKTtcbiAgICBpZiAocGcpIHBnLmJsb2Nrcy5wdXNoKGJsayk7XG4gIH0pO1xuICByZXR1cm4gYmxrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQmxvY2soYmxvY2tJZCkge1xuICB1cGRhdGUocyA9PiB7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKHMpO1xuICAgIGlmIChwZykgcGcuYmxvY2tzID0gcGcuYmxvY2tzLmZpbHRlcihiID0+IGIuaWQgIT09IGJsb2NrSWQpO1xuICB9KTtcbn1cblxuLy8gU2lsZW50IHVwZGF0ZXMg4oCUIGJsb2NrIGNvbnRlbnQvcG9zaXRpb24gY2hhbmdlcyBkb24ndCByZS1yZW5kZXIgdGhlIHNpZGViYXJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVCbG9ja0h0bWwoYmxvY2tJZCwgaHRtbCkge1xuICBzaWxlbnQocyA9PiB7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKHMpO1xuICAgIGNvbnN0IGJsayA9IHBnPy5ibG9ja3MuZmluZChiID0+IGIuaWQgPT09IGJsb2NrSWQpO1xuICAgIGlmIChibGspIGJsay5odG1sID0gaHRtbDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVCbG9ja1BvcyhibG9ja0lkLCB4LCB5KSB7XG4gIHNpbGVudChzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgY29uc3QgYmxrID0gcGc/LmJsb2Nrcy5maW5kKGIgPT4gYi5pZCA9PT0gYmxvY2tJZCk7XG4gICAgaWYgKGJsaykgeyBibGsueCA9IHg7IGJsay55ID0geTsgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJsb2NrVHlwZShibG9ja0lkLCB0eXBlKSB7XG4gIHNpbGVudChzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgY29uc3QgYmxrID0gcGc/LmJsb2Nrcy5maW5kKGIgPT4gYi5pZCA9PT0gYmxvY2tJZCk7XG4gICAgaWYgKGJsaykgYmxrLnR5cGUgPSB0eXBlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJsb2NrV2lkdGgoYmxvY2tJZCwgdykge1xuICBzaWxlbnQocyA9PiB7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKHMpO1xuICAgIGNvbnN0IGJsayA9IHBnPy5ibG9ja3MuZmluZChiID0+IGIuaWQgPT09IGJsb2NrSWQpO1xuICAgIGlmIChibGspIGJsay53ID0gdztcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQYWdlVmlldyhwYW5YLCBwYW5ZLCB6b29tKSB7XG4gIHNpbGVudChzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgaWYgKHBnKSB7IHBnLnBhblggPSBwYW5YOyBwZy5wYW5ZID0gcGFuWTsgcGcuem9vbSA9IHpvb207IH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQYWdlVGl0bGUocGFnZUlkLCB0aXRsZSkge1xuICAvLyBTaWxlbnQ6IHNpZGViYXIgdGl0bGUgdXBkYXRlcyBvbiBibHVyIG9ubHlcbiAgc2lsZW50KHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgY29uc3Qgc2VjID0gbmI/LnNlY3Rpb25zLmZpbmQoc2VjID0+IHNlYy5pZCA9PT0gcy51aS5zZWN0aW9uSWQpO1xuICAgIGNvbnN0IHBnID0gc2VjID8gZmluZEluVHJlZShzZWMucGFnZXMsIHBhZ2VJZCkgOiBudWxsO1xuICAgIGlmIChwZykgcGcudGl0bGUgPSB0aXRsZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQYWdlVGl0bGVBbmRSZWZyZXNoKHBhZ2VJZCwgdGl0bGUpIHtcbiAgLy8gQ2FsbGVkIG9uIGJsdXIg4oCUIHVwZGF0ZXMgdGl0bGUgQU5EIHRyaWdnZXJzIHNpZGViYXIgcmUtcmVuZGVyXG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBjb25zdCBwZyA9IHNlYyA/IGZpbmRJblRyZWUoc2VjLnBhZ2VzLCBwYWdlSWQpIDogbnVsbDtcbiAgICBpZiAocGcpIHBnLnRpdGxlID0gdGl0bGU7XG4gIH0pO1xufVxuIiwKICAgICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9BcHAuanN4JztcblxuLy8gU3VwcHJlc3MgZGVmYXVsdCBicm93c2VyIGNvbnRleHQgbWVudSBvbiB0aGUgZW50aXJlIGFwcFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiIsCiAgICAiaW1wb3J0IHsgYXBwU3RhdGUsIGdldEFjdGl2ZVBhZ2UsIGZpbmRJblRyZWUgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IE5vdGVib29rQmFyIH0gZnJvbSAnLi9Ob3RlYm9va0Jhci5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvblBhbmVsIH0gZnJvbSAnLi9TZWN0aW9uUGFuZWwuanN4JztcbmltcG9ydCB7IFBhZ2VzUGFuZWwgfSBmcm9tICcuL1BhZ2VzUGFuZWwuanN4JztcbmltcG9ydCB7IENhbnZhcywgRm9ybWF0VG9vbGJhciB9IGZyb20gJy4vQ2FudmFzLmpzeCc7XG5pbXBvcnQgeyBDb250ZXh0TWVudSB9IGZyb20gJy4vQ29udGV4dE1lbnUuanN4JztcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3Qgc3RhdGUgPSBhcHBTdGF0ZS52YWx1ZTtcbiAgY29uc3QgeyBub3RlYm9va3MsIHVpIH0gPSBzdGF0ZTtcbiAgY29uc3QgbmIgPSBub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHVpLm5vdGVib29rSWQpO1xuICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIGNvbnN0IHBhZ2UgPSBzZWMgPyBmaW5kSW5UcmVlKHNlYy5wYWdlcywgdWkucGFnZUlkKSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEZvcm1hdFRvb2xiYXIgLz5cbiAgICAgIDxTZWN0aW9uUGFuZWwgLz5cbiAgICAgIDxkaXYgaWQ9XCJib2R5LXJvd1wiPlxuICAgICAgICA8Tm90ZWJvb2tCYXIgLz5cbiAgICAgICAgPGRpdiBpZD1cIm1haW5cIj5cbiAgICAgICAgICA8ZGl2IGlkPVwiY2FudmFzLWFyZWFcIj5cbiAgICAgICAgICAgIDxDYW52YXMgcGFnZT17cGFnZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8UGFnZXNQYW5lbCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPENvbnRleHRNZW51IC8+XG4gICAgPC8+XG4gICk7XG59XG4iLAogICAgImltcG9ydCB7IHVzZVJlZiB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBhcHBTdGF0ZSwgc2V0QWN0aXZlTm90ZWJvb2ssIGFkZE5vdGVib29rLCByZW5hbWVOb3RlYm9vaywgZGVsZXRlTm90ZWJvb2ssIHJlb3JkZXJOb3RlYm9va3MgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IG9wZW5Db250ZXh0TWVudSwgb3BlblJlbmFtZU1lbnUgfSBmcm9tICcuL0NvbnRleHRNZW51LmpzeCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBOb3RlYm9va0JhcigpIHtcbiAgY29uc3QgeyBub3RlYm9va3MsIHVpIH0gPSBhcHBTdGF0ZS52YWx1ZTtcbiAgY29uc3QgZHJhZ0lkID0gdXNlUmVmKG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cIm5vdGVib29rLWJhclwiPlxuICAgICAge25vdGVib29rcy5tYXAobmIgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtuYi5pZH1cbiAgICAgICAgICBjbGFzcz17WyduYi10YWInLCBuYi5pZCA9PT0gdWkubm90ZWJvb2tJZCAmJiAnbmItdGFiLS1hY3RpdmUnXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU5vdGVib29rKG5iLmlkKX1cbiAgICAgICAgICBvbkRibENsaWNrPXtlID0+IHtcbiAgICAgICAgICAgIG9wZW5SZW5hbWVNZW51KGUuY2xpZW50WCwgZS5jbGllbnRZLCBuYi50aXRsZSwgdCA9PiByZW5hbWVOb3RlYm9vayhuYi5pZCwgdCkpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuQ29udGV4dE1lbnUoZS5jbGllbnRYLCBlLmNsaWVudFksIFtcbiAgICAgICAgICAgICAgeyBsYWJlbDogJ1JlbmFtZScsIGFjdGlvbjogKCkgPT4gb3BlblJlbmFtZU1lbnUoZS5jbGllbnRYLCBlLmNsaWVudFksIG5iLnRpdGxlLCB0ID0+IHJlbmFtZU5vdGVib29rKG5iLmlkLCB0KSkgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbmZpcm0nLCBsYWJlbDogJ0RlbGV0ZScsXG4gICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiBub3RlYm9va3MubGVuZ3RoIDw9IDEgPyAnQ2Fubm90IGRlbGV0ZSBsYXN0IG5vdGVib29rJyA6IGBEZWxldGUgXCIke25iLnRpdGxlfVwiP2AsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7IGlmIChub3RlYm9va3MubGVuZ3RoID4gMSkgZGVsZXRlTm90ZWJvb2sobmIuaWQpOyB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4geyBkcmFnSWQuY3VycmVudCA9IG5iLmlkOyB9fVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdJZC5jdXJyZW50IHx8IGRyYWdJZC5jdXJyZW50ID09PSBuYi5pZCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaWRzID0gbm90ZWJvb2tzLm1hcChuID0+IG4uaWQpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGlkcy5pbmRleE9mKGRyYWdJZC5jdXJyZW50KSwgdG8gPSBpZHMuaW5kZXhPZihuYi5pZCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gWy4uLmlkc107IG5leHQuc3BsaWNlKGZyb20sIDEpOyBuZXh0LnNwbGljZSh0bywgMCwgZHJhZ0lkLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmVvcmRlck5vdGVib29rcyhuZXh0KTtcbiAgICAgICAgICAgIGRyYWdJZC5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9fVxuICAgICAgICA+e25iLnRpdGxlfTwvZGl2PlxuICAgICAgKSl9XG4gICAgICA8YnV0dG9uIGNsYXNzPVwibmItYWRkXCIgb25DbGljaz17YWRkTm90ZWJvb2t9IHRpdGxlPVwiTmV3IG5vdGVib29rXCI+KzwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAgICJpbXBvcnQgeyBzaWduYWwgfSBmcm9tICdAcHJlYWN0L3NpZ25hbHMnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcblxuLy8g4pSA4pSAIEdsb2JhbCBjb250ZXh0IG1lbnUgc3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgY29uc3QgY29udGV4dE1lbnUgPSBzaWduYWwobnVsbCk7XG4vLyBTaGFwZTogeyB4LCB5LCBpdGVtczogW3sgbGFiZWwsIGFjdGlvbiwgdHlwZT8sIGNvbmZpcm1MYWJlbD8gfV0gfVxuLy8gdHlwZTogJ3NlcGFyYXRvcicgfCAncmVuYW1lJyB8ICdjb25maXJtJyB8ICdzdWJtZW51JyB8IHVuZGVmaW5lZCAobm9ybWFsKVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkNvbnRleHRNZW51KHgsIHksIGl0ZW1zKSB7XG4gIGNvbnRleHRNZW51LnZhbHVlID0geyB4LCB5LCBpdGVtcyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VDb250ZXh0TWVudSgpIHtcbiAgY29udGV4dE1lbnUudmFsdWUgPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblJlbmFtZU1lbnUoeCwgeSwgY3VycmVudE5hbWUsIG9uUmVuYW1lKSB7XG4gIGNvbnRleHRNZW51LnZhbHVlID0ge1xuICAgIHgsIHksXG4gICAgaXRlbXM6IFt7IHR5cGU6ICdyZW5hbWUnLCB2YWx1ZTogY3VycmVudE5hbWUsIGFjdGlvbjogb25SZW5hbWUgfV0sXG4gIH07XG59XG5cbi8vIOKUgOKUgCBDb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgZnVuY3Rpb24gQ29udGV4dE1lbnUoKSB7XG4gIGNvbnN0IG1lbnUgPSBjb250ZXh0TWVudS52YWx1ZTtcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbY29uZmlybUlkLCBzZXRDb25maXJtSWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZW5hbWVWYWwsIHNldFJlbmFtZVZhbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IHJlbmFtZVJlZiA9IHVzZVJlZihudWxsKTtcblxuICAvLyBSZXNldCBjb25maXJtIHN0YXRlIHdoZW4gbWVudSBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29uZmlybUlkKG51bGwpO1xuICAgIGlmIChtZW51KSB7XG4gICAgICBjb25zdCByZW5hbWVJdGVtID0gbWVudS5pdGVtcy5maW5kKGkgPT4gaS50eXBlID09PSAncmVuYW1lJyk7XG4gICAgICBpZiAocmVuYW1lSXRlbSkgc2V0UmVuYW1lVmFsKHJlbmFtZUl0ZW0udmFsdWUgfHwgJycpO1xuICAgIH1cbiAgfSwgW21lbnVdKTtcblxuICAvLyBGb2N1cyByZW5hbWUgaW5wdXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobWVudSAmJiByZW5hbWVSZWYuY3VycmVudCkge1xuICAgICAgcmVuYW1lUmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICAgIHJlbmFtZVJlZi5jdXJyZW50LnNlbGVjdCgpO1xuICAgIH1cbiAgfSwgW21lbnVdKTtcblxuICAvLyBDbG9zZSBvbiBvdXRzaWRlIGNsaWNrLCBlc2NhcGUsIHNjcm9sbFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudSkgcmV0dXJuO1xuICAgIGZ1bmN0aW9uIG9uRG93bihlKSB7XG4gICAgICBpZiAocmVmLmN1cnJlbnQgJiYgIXJlZi5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkgY2xvc2VDb250ZXh0TWVudSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbktleShlKSB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZUNvbnRleHRNZW51KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkgeyBjbG9zZUNvbnRleHRNZW51KCk7IH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbkRvd24sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Eb3duLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHRydWUpO1xuICAgIH07XG4gIH0sIFttZW51XSk7XG5cbiAgaWYgKCFtZW51KSByZXR1cm4gbnVsbDtcblxuICAvLyBDbGFtcCBwb3NpdGlvbiB0byB2aWV3cG9ydFxuICBjb25zdCBtZW51VyA9IDIwMCwgbWVudUggPSBtZW51Lml0ZW1zLmxlbmd0aCAqIDMyICsgODtcbiAgY29uc3QgeCA9IE1hdGgubWluKG1lbnUueCwgd2luZG93LmlubmVyV2lkdGggLSBtZW51VyAtIDQpO1xuICBjb25zdCB5ID0gTWF0aC5taW4obWVudS55LCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBtZW51SCAtIDQpO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZVJlbmFtZVN1Ym1pdChpdGVtKSB7XG4gICAgY29uc3QgdiA9IHJlbmFtZVZhbC50cmltKCk7XG4gICAgaWYgKHYgJiYgdiAhPT0gaXRlbS52YWx1ZSkgaXRlbS5hY3Rpb24odik7XG4gICAgY2xvc2VDb250ZXh0TWVudSgpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzPVwiY29udGV4dC1tZW51XCIgcmVmPXtyZWZ9IHN0eWxlPXt7IGxlZnQ6IHggKyAncHgnLCB0b3A6IHkgKyAncHgnIH19PlxuICAgICAge21lbnUuaXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdzZXBhcmF0b3InKSB7XG4gICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSBjbGFzcz1cImNvbnRleHQtbWVudS1zZXBhcmF0b3JcIiAvPjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdyZW5hbWUnKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzcz1cImNvbnRleHQtbWVudS1yZW5hbWVcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcmVmPXtyZW5hbWVSZWZ9XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjb250ZXh0LW1lbnUtaW5wdXRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtyZW5hbWVWYWx9XG4gICAgICAgICAgICAgICAgb25JbnB1dD17ZSA9PiBzZXRSZW5hbWVWYWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIGhhbmRsZVJlbmFtZVN1Ym1pdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQ29udGV4dE1lbnUoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29udGV4dC1tZW51LXJlbmFtZS1va1wiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbmFtZVN1Ym1pdChpdGVtKX0+4pyTPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICAgICAgY29uc3QgaXNDb25maXJtaW5nID0gY29uZmlybUlkID09PSBpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgY2xhc3M9e2Bjb250ZXh0LW1lbnUtaXRlbSAke2lzQ29uZmlybWluZyA/ICdjb250ZXh0LW1lbnUtaXRlbS0tZGFuZ2VyJyA6ICcnfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNDb25maXJtaW5nKSB7IGl0ZW0uYWN0aW9uKCk7IGNsb3NlQ29udGV4dE1lbnUoKTsgfVxuICAgICAgICAgICAgICAgIGVsc2Ugc2V0Q29uZmlybUlkKGkpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNDb25maXJtaW5nID8gKGl0ZW0uY29uZmlybUxhYmVsIHx8ICdDb25maXJtIGRlbGV0ZT8nKSA6IGl0ZW0ubGFiZWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ3N1Ym1lbnUnKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzcz1cImNvbnRleHQtbWVudS1pdGVtIGNvbnRleHQtbWVudS1zdWJtZW51XCI+XG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250ZXh0LW1lbnUtYXJyb3dcIj7ilrg8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZXh0LW1lbnUtc3ViXCI+XG4gICAgICAgICAgICAgICAge2l0ZW0uY2hpbGRyZW4ubWFwKChjaGlsZCwgaikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2p9IGNsYXNzPVwiY29udGV4dC1tZW51LWl0ZW1cIiBvbkNsaWNrPXsoKSA9PiB7IGNoaWxkLmFjdGlvbigpOyBjbG9zZUNvbnRleHRNZW51KCk7IH19PlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGQubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm9ybWFsIGl0ZW1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3M9XCJjb250ZXh0LW1lbnUtaXRlbVwiIG9uQ2xpY2s9eygpID0+IHsgaXRlbS5hY3Rpb24oKTsgY2xvc2VDb250ZXh0TWVudSgpOyB9fT5cbiAgICAgICAgICAgIHtpdGVtLmxhYmVsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLAogICAgImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLAogICAgImltcG9ydCB7IHVzZVJlZiB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBhcHBTdGF0ZSwgc2V0QWN0aXZlU2VjdGlvbiwgYWRkU2VjdGlvbiwgcmVuYW1lU2VjdGlvbiwgZGVsZXRlU2VjdGlvbiwgcmVvcmRlclNlY3Rpb25zIH0gZnJvbSAnLi9zdG9yZS5qcyc7XG5pbXBvcnQgeyBvcGVuQ29udGV4dE1lbnUsIG9wZW5SZW5hbWVNZW51IH0gZnJvbSAnLi9Db250ZXh0TWVudS5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gU2VjdGlvblBhbmVsKCkge1xuICBjb25zdCB7IG5vdGVib29rcywgdWkgfSA9IGFwcFN0YXRlLnZhbHVlO1xuICBjb25zdCBuYiA9IG5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gdWkubm90ZWJvb2tJZCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gbmI/LnNlY3Rpb25zID8/IFtdO1xuICBjb25zdCBkcmFnSWQgPSB1c2VSZWYobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwic2VjdGlvbi10YWJzXCI+XG4gICAgICB7c2VjdGlvbnMubWFwKHNlYyA9PiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e3NlYy5pZH1cbiAgICAgICAgICBjbGFzcz17WydzZWMtdGFiJywgc2VjLmlkID09PSB1aS5zZWN0aW9uSWQgJiYgJ3NlYy10YWItLWFjdGl2ZSddLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2VjdGlvbihzZWMuaWQpfVxuICAgICAgICAgIG9uRGJsQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgb3BlblJlbmFtZU1lbnUoZS5jbGllbnRYLCBlLmNsaWVudFksIHNlYy50aXRsZSwgdCA9PiByZW5hbWVTZWN0aW9uKG5iLmlkLCBzZWMuaWQsIHQpKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ29udGV4dE1lbnU9e2UgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb3BlbkNvbnRleHRNZW51KGUuY2xpZW50WCwgZS5jbGllbnRZLCBbXG4gICAgICAgICAgICAgIHsgbGFiZWw6ICdSZW5hbWUnLCBhY3Rpb246ICgpID0+IG9wZW5SZW5hbWVNZW51KGUuY2xpZW50WCwgZS5jbGllbnRZLCBzZWMudGl0bGUsIHQgPT4gcmVuYW1lU2VjdGlvbihuYi5pZCwgc2VjLmlkLCB0KSkgfSxcbiAgICAgICAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbmZpcm0nLCBsYWJlbDogJ0RlbGV0ZScsXG4gICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiBzZWN0aW9ucy5sZW5ndGggPD0gMSA/ICdDYW5ub3QgZGVsZXRlIGxhc3Qgc2VjdGlvbicgOiBgRGVsZXRlIFwiJHtzZWMudGl0bGV9XCI/YCxcbiAgICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IHsgaWYgKHNlY3Rpb25zLmxlbmd0aCA+IDEpIGRlbGV0ZVNlY3Rpb24obmIuaWQsIHNlYy5pZCk7IH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoKSA9PiB7IGRyYWdJZC5jdXJyZW50ID0gc2VjLmlkOyB9fVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdJZC5jdXJyZW50IHx8IGRyYWdJZC5jdXJyZW50ID09PSBzZWMuaWQpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IHNlY3Rpb25zLm1hcChzID0+IHMuaWQpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGlkcy5pbmRleE9mKGRyYWdJZC5jdXJyZW50KSwgdG8gPSBpZHMuaW5kZXhPZihzZWMuaWQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IFsuLi5pZHNdOyBuZXh0LnNwbGljZShmcm9tLCAxKTsgbmV4dC5zcGxpY2UodG8sIDAsIGRyYWdJZC5jdXJyZW50KTtcbiAgICAgICAgICAgIHJlb3JkZXJTZWN0aW9ucyhuYi5pZCwgbmV4dCk7XG4gICAgICAgICAgICBkcmFnSWQuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfX1cbiAgICAgICAgPntzZWMudGl0bGV9PC9kaXY+XG4gICAgICApKX1cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzZWMtYWRkXCIgb25DbGljaz17KCkgPT4gYWRkU2VjdGlvbihuYj8uaWQpfSB0aXRsZT1cIk5ldyBzZWN0aW9uXCI+KzwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAgICJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IGFwcFN0YXRlLCBzZXRBY3RpdmVQYWdlLCBhZGRQYWdlLCByZW5hbWVQYWdlLCBkZWxldGVQYWdlLCBtb3ZlUGFnZSwgZmluZEluVHJlZSB9IGZyb20gJy4vc3RvcmUuanMnO1xuaW1wb3J0IHsgb3BlbkNvbnRleHRNZW51LCBvcGVuUmVuYW1lTWVudSB9IGZyb20gJy4vQ29udGV4dE1lbnUuanN4JztcblxuLy8g4pSA4pSAIERyYWcgc3RhdGUgKG1vZHVsZS1sZXZlbCBzbyBzaWJsaW5ncyBjYW4gc2hhcmUpIOKUgOKUgOKUgOKUgOKUgOKUgFxuY29uc3QgZHJhZyA9IHsgcGFnZUlkOiBudWxsLCBvdmVyOiBudWxsLCBtb2RlOiBudWxsIH07IC8vIG1vZGU6ICdiZWZvcmUnIHwgJ2NoaWxkJ1xuXG5mdW5jdGlvbiBkZWxldGVQYWdlV2l0aENoaWxkcmVuKHBhZ2UpIHtcbiAgaWYgKCFwYWdlLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICBkZWxldGVQYWdlKHBhZ2UuaWQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBJZiBwYWdlIGhhcyBjaGlsZHJlbiwgcHJvbW90ZSB0aGVtIHRvIHNpYmxpbmdzIHRoZW4gZGVsZXRlIHBhcmVudFxuICBjb25zdCBzID0gYXBwU3RhdGUudmFsdWU7XG4gIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgaWYgKCFzZWMpIHJldHVybjtcbiAgZnVuY3Rpb24gcHJvbW90ZUNoaWxkcmVuKHBhZ2VzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBhZ2VzW2ldLmlkID09PSBwYWdlLmlkKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFnZXNbaV0uY2hpbGRyZW4gPz8gW107XG4gICAgICAgIHBhZ2VzLnNwbGljZShpLCAxLCAuLi5jaGlsZHJlbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHByb21vdGVDaGlsZHJlbihwYWdlc1tpXS5jaGlsZHJlbiA/PyBbXSkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHJvbW90ZUNoaWxkcmVuKHNlYy5wYWdlcyk7XG4gIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xufVxuXG5mdW5jdGlvbiBQYWdlSXRlbSh7IHBhZ2UsIGFjdGl2ZUlkLCBkZXB0aCA9IDAsIGRyYWdTdGF0ZSwgb25EcmFnQ2hhbmdlIH0pIHtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IGhhc0tpZHMgPSBwYWdlLmNoaWxkcmVuPy5sZW5ndGggPiAwO1xuICBjb25zdCBpc092ZXIgPSBkcmFnU3RhdGUub3ZlciA9PT0gcGFnZS5pZDtcbiAgY29uc3QgaXNPdmVyQXNDaGlsZCA9IGlzT3ZlciAmJiBkcmFnU3RhdGUubW9kZSA9PT0gJ2NoaWxkJztcblxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkcmFnLnBhZ2VJZCA9IHBhZ2UuaWQ7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChkcmFnLnBhZ2VJZCA9PT0gcGFnZS5pZCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlY3QgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcmVsID0gKGUuY2xpZW50WSAtIHJlY3QudG9wKSAvIHJlY3QuaGVpZ2h0O1xuICAgIGNvbnN0IG1vZGUgPSAocmVsID4gMC4zICYmIHJlbCA8IDAuNykgPyAnY2hpbGQnIDogJ2JlZm9yZSc7XG4gICAgaWYgKGRyYWdTdGF0ZS5vdmVyICE9PSBwYWdlLmlkIHx8IGRyYWdTdGF0ZS5tb2RlICE9PSBtb2RlKSB7XG4gICAgICBvbkRyYWdDaGFuZ2UocGFnZS5pZCwgbW9kZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25EcmFnTGVhdmUoZSkge1xuICAgIGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIG9uRHJhZ0NoYW5nZShudWxsLCBudWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgZnJvbUlkID0gZHJhZy5wYWdlSWQ7XG4gICAgZHJhZy5wYWdlSWQgPSBudWxsO1xuICAgIG9uRHJhZ0NoYW5nZShudWxsLCBudWxsKTtcbiAgICBpZiAoIWZyb21JZCB8fCBmcm9tSWQgPT09IHBhZ2UuaWQpIHJldHVybjtcblxuICAgIGlmIChkcmFnU3RhdGUubW9kZSA9PT0gJ2NoaWxkJykge1xuICAgICAgaW1wb3J0KCcuL3N0b3JlLmpzJykudGhlbihtID0+IHtcbiAgICAgICAgY29uc3QgcyA9IG0uYXBwU3RhdGUudmFsdWU7XG4gICAgICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICAgICAgaWYgKCFzZWMpIHJldHVybjtcbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG0uZmluZEluVHJlZShzZWMucGFnZXMsIHBhZ2UuaWQpO1xuICAgICAgICBpZiAodGFyZ2V0KSB7IHRhcmdldC5jaGlsZHJlbiA9IHRhcmdldC5jaGlsZHJlbiA/PyBbXTsgdGFyZ2V0LmNoaWxkcmVuLnB1c2goZXh0cmFjdGVkKTsgfVxuICAgICAgICBtLmFwcFN0YXRlLnZhbHVlID0geyAuLi5tLmFwcFN0YXRlLnZhbHVlIH07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1wb3J0KCcuL3N0b3JlLmpzJykudGhlbihtID0+IHtcbiAgICAgICAgY29uc3QgcyA9IG0uYXBwU3RhdGUudmFsdWU7XG4gICAgICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICAgICAgaWYgKCFzZWMpIHJldHVybjtcbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG4gICAgICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShwYWdlcykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYWdlc1tpXS5pZCA9PT0gcGFnZS5pZCkgeyBwYWdlcy5zcGxpY2UoaSwgMCwgZXh0cmFjdGVkKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChpbnNlcnRCZWZvcmUocGFnZXNbaV0uY2hpbGRyZW4gPz8gW10pKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGluc2VydEJlZm9yZShzZWMucGFnZXMpO1xuICAgICAgICBtLmFwcFN0YXRlLnZhbHVlID0geyAuLi5tLmFwcFN0YXRlLnZhbHVlIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUGFnZUNvbnRleHRNZW51KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbmIgPSBhcHBTdGF0ZS52YWx1ZS5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IGFwcFN0YXRlLnZhbHVlLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlY3Rpb25zID0gbmI/LnNlY3Rpb25zID8/IFtdO1xuXG4gICAgY29uc3QgbW92ZUNoaWxkcmVuID0gc2VjdGlvbnNcbiAgICAgIC5maWx0ZXIocyA9PiBzLmlkICE9PSBhcHBTdGF0ZS52YWx1ZS51aS5zZWN0aW9uSWQpXG4gICAgICAubWFwKHMgPT4gKHsgbGFiZWw6IHMudGl0bGUsIGFjdGlvbjogKCkgPT4gbW92ZVBhZ2UocGFnZS5pZCwgcy5pZCkgfSkpO1xuXG4gICAgY29uc3QgaXRlbXMgPSBbXG4gICAgICB7IGxhYmVsOiAnUmVuYW1lJywgYWN0aW9uOiAoKSA9PiBvcGVuUmVuYW1lTWVudShlLmNsaWVudFgsIGUuY2xpZW50WSwgcGFnZS50aXRsZSwgdCA9PiByZW5hbWVQYWdlKHBhZ2UuaWQsIHQpKSB9LFxuICAgICAgeyBsYWJlbDogJ0FkZCBTdWJwYWdlJywgYWN0aW9uOiAoKSA9PiBhZGRQYWdlKHBhZ2UuaWQpIH0sXG4gICAgXTtcblxuICAgIGlmIChtb3ZlQ2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgaXRlbXMucHVzaCh7IHR5cGU6ICdzdWJtZW51JywgbGFiZWw6ICdNb3ZlIHRvIFNlY3Rpb24nLCBjaGlsZHJlbjogbW92ZUNoaWxkcmVuIH0pO1xuICAgIH1cblxuICAgIGl0ZW1zLnB1c2goeyB0eXBlOiAnc2VwYXJhdG9yJyB9KTtcblxuICAgIGlmIChwYWdlLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29uZmlybScsIGxhYmVsOiAnRGVsZXRlIChwcm9tb3RlIHN1YnBhZ2VzKScsXG4gICAgICAgIGNvbmZpcm1MYWJlbDogYERlbGV0ZSBcIiR7cGFnZS50aXRsZX1cIj9gLFxuICAgICAgICBhY3Rpb246ICgpID0+IGRlbGV0ZVBhZ2VXaXRoQ2hpbGRyZW4ocGFnZSksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb25maXJtJywgbGFiZWw6ICdEZWxldGUnLFxuICAgICAgICBjb25maXJtTGFiZWw6IGBEZWxldGUgXCIke3BhZ2UudGl0bGV9XCI/YCxcbiAgICAgICAgYWN0aW9uOiAoKSA9PiBkZWxldGVQYWdlKHBhZ2UuaWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3BlbkNvbnRleHRNZW51KGUuY2xpZW50WCwgZS5jbGllbnRZLCBpdGVtcyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLWl0ZW0td3JhcFwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz17W1xuICAgICAgICAgICdwYW5lbC1pdGVtIHBhZ2UtaXRlbScsXG4gICAgICAgICAgcGFnZS5pZCA9PT0gYWN0aXZlSWQgJiYgJ3BhbmVsLWl0ZW0tLWFjdGl2ZScsXG4gICAgICAgICAgaXNPdmVyICYmICFpc092ZXJBc0NoaWxkICYmICdwYWdlLWl0ZW0tLWRyb3AtYmVmb3JlJyxcbiAgICAgICAgICBpc092ZXJBc0NoaWxkICYmICdwYWdlLWl0ZW0tLWRyb3AtY2hpbGQnLFxuICAgICAgICBdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICAgIHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiAoMTIgKyBkZXB0aCAqIDE2KSArICdweCcgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgIG9uRHJhZ1N0YXJ0PXtvbkRyYWdTdGFydH1cbiAgICAgICAgb25EcmFnT3Zlcj17b25EcmFnT3Zlcn1cbiAgICAgICAgb25EcmFnTGVhdmU9e29uRHJhZ0xlYXZlfVxuICAgICAgICBvbkRyb3A9e29uRHJvcH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlUGFnZShwYWdlLmlkKX1cbiAgICAgICAgb25EYmxDbGljaz17ZSA9PiB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBvcGVuUmVuYW1lTWVudShlLmNsaWVudFgsIGUuY2xpZW50WSwgcGFnZS50aXRsZSwgdCA9PiByZW5hbWVQYWdlKHBhZ2UuaWQsIHQpKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Db250ZXh0TWVudT17b3BlblBhZ2VDb250ZXh0TWVudX1cbiAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cInBhZ2UtZXhwYW5kXCJcbiAgICAgICAgICBzdHlsZT17eyB2aXNpYmlsaXR5OiBoYXNLaWRzID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfX1cbiAgICAgICAgICBvbkNsaWNrPXtlID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0T3BlbihvID0+ICFvKTsgfX1cbiAgICAgICAgPntvcGVuID8gJ+KWvicgOiAn4pa4J308L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGFnZS10aXRsZS10ZXh0XCI+e3BhZ2UudGl0bGV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7aGFzS2lkcyAmJiBvcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzcz1cInN1YnBhZ2VzXCI+XG4gICAgICAgICAge3BhZ2UuY2hpbGRyZW4ubWFwKGMgPT4gKFxuICAgICAgICAgICAgPFBhZ2VJdGVtIGtleT17Yy5pZH0gcGFnZT17Y30gYWN0aXZlSWQ9e2FjdGl2ZUlkfSBkZXB0aD17ZGVwdGggKyAxfSBkcmFnU3RhdGU9e2RyYWdTdGF0ZX0gb25EcmFnQ2hhbmdlPXtvbkRyYWdDaGFuZ2V9IC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBhZ2VzUGFuZWwoKSB7XG4gIGNvbnN0IHsgbm90ZWJvb2tzLCB1aSB9ID0gYXBwU3RhdGUudmFsdWU7XG4gIGNvbnN0IG5iICA9IG5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gdWkubm90ZWJvb2tJZCk7XG4gIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHMgPT4gcy5pZCA9PT0gdWkuc2VjdGlvbklkKTtcbiAgY29uc3QgcGFnZXMgPSBzZWM/LnBhZ2VzID8/IFtdO1xuXG4gIGNvbnN0IFtkcmFnT3Zlciwgc2V0RHJhZ092ZXJdID0gdXNlU3RhdGUoeyBpZDogbnVsbCwgbW9kZTogbnVsbCB9KTtcblxuICBmdW5jdGlvbiBvbkRyYWdDaGFuZ2UoaWQsIG1vZGUpIHsgc2V0RHJhZ092ZXIoeyBpZCwgbW9kZSB9KTsgfVxuXG4gIGNvbnN0IGRyYWdTdGF0ZSA9IHsgb3ZlcjogZHJhZ092ZXIuaWQsIG1vZGU6IGRyYWdPdmVyLm1vZGUgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJwYWdlcy1wYW5lbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRlclwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLWJ0blwiIG9uQ2xpY2s9eygpID0+IGFkZFBhZ2UoKX0+KyBOZXcgUGFnZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtbGlzdFwiPlxuICAgICAgICB7cGFnZXMubWFwKHBnID0+IChcbiAgICAgICAgICA8UGFnZUl0ZW0ga2V5PXtwZy5pZH0gcGFnZT17cGd9IGFjdGl2ZUlkPXt1aS5wYWdlSWR9IGRyYWdTdGF0ZT17ZHJhZ1N0YXRlfSBvbkRyYWdDaGFuZ2U9e29uRHJhZ0NoYW5nZX0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsCiAgICAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IEJsb2NrIH0gZnJvbSAnLi9CbG9jay5qc3gnO1xuaW1wb3J0IHsgYXBwU3RhdGUsIGFkZEJsb2NrLCBkZWxldGVCbG9jaywgdXBkYXRlQmxvY2tQb3MsIHVwZGF0ZUJsb2NrV2lkdGgsIHVwZGF0ZVBhZ2VWaWV3LCB1cGRhdGVQYWdlVGl0bGUsIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gsIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvLCBhcHBseVVuZG8sIGFwcGx5UmVkbyB9IGZyb20gJy4vdW5kby5qcyc7XG5pbXBvcnQgeyBleGVjRm10IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuXG5leHBvcnQgY29uc3QgQ2FudmFzQ3R4ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuLy8g4pSA4pSA4pSAIEZvcm1hdFRvb2xiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRUb29sYmFyKCkge1xuICBjb25zdCBidG5zID0gW1xuICAgIHsgY21kOiAnYm9sZCcsICAgICAgICAgIG5vZGU6IDxiPkI8L2I+LCAgIHRpdGxlOiAnQm9sZCcgfSxcbiAgICB7IGNtZDogJ2l0YWxpYycsICAgICAgICBub2RlOiA8aT5JPC9pPiwgICB0aXRsZTogJ0l0YWxpYycgfSxcbiAgICB7IGNtZDogJ3VuZGVybGluZScsICAgICBub2RlOiA8dT5VPC91PiwgICB0aXRsZTogJ1VuZGVybGluZScgfSxcbiAgICB7IGNtZDogJ3N0cmlrZXRocm91Z2gnLCBub2RlOiA8cz5TPC9zPiwgICB0aXRsZTogJ1N0cmlrZXRocm91Z2gnIH0sXG4gICAgbnVsbCxcbiAgICB7IGNtZDogJ2gxJywgbm9kZTogJ0gxJywgdGl0bGU6ICdIZWFkaW5nIDEnIH0sXG4gICAgeyBjbWQ6ICdoMicsIG5vZGU6ICdIMicsIHRpdGxlOiAnSGVhZGluZyAyJyB9LFxuICAgIHsgY21kOiAnaDMnLCBub2RlOiAnSDMnLCB0aXRsZTogJ0hlYWRpbmcgMycgfSxcbiAgICB7IGNtZDogJ2g0Jywgbm9kZTogJ0g0JywgdGl0bGU6ICdIZWFkaW5nIDQnIH0sXG4gICAgeyBjbWQ6ICdwJywgIG5vZGU6ICdQJywgIHRpdGxlOiAnUGFyYWdyYXBoJyB9LFxuICAgIG51bGwsXG4gICAgeyBjbWQ6ICd1bCcsIG5vZGU6ICfigKIgTGlzdCcsIHRpdGxlOiAnQnVsbGV0IGxpc3QnIH0sXG4gICAgeyBjbWQ6ICdvbCcsIG5vZGU6ICcxLiBMaXN0JywgdGl0bGU6ICdOdW1iZXJlZCBsaXN0JyB9LFxuICAgIHsgY21kOiAnbGluaycsIG5vZGU6ICfijJhLJywgdGl0bGU6ICdJbnNlcnQgbGluaycgfSxcbiAgXTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwiZm9ybWF0LXRvb2xiYXJcIj5cbiAgICAgIHtidG5zLm1hcCgoYiwgaSkgPT4gYiA9PT0gbnVsbFxuICAgICAgICA/IDxzcGFuIGtleT17aX0gY2xhc3M9XCJmbXQtc2VwXCIgLz5cbiAgICAgICAgOiA8YnV0dG9uIGtleT17Yi5jbWR9IGNsYXNzPVwiZm10LWJ0blwiIHRpdGxlPXtiLnRpdGxlfSBvbk1vdXNlRG93bj17ZSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZXhlY0ZtdChiLmNtZCk7IH19PntiLm5vZGV9PC9idXR0b24+XG4gICAgICApfVxuICAgICAgPHNwYW4gY2xhc3M9XCJjYW52YXMtaGludFwiPkNsaWNrIHRvIGFkZCBibG9jayDCtyBTcGFjZStkcmFnIHRvIHBhbiDCtyBDdHJsK3Njcm9sbCB6b29tPC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyDilIDilIDilIAgUGFnZVRpdGxlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBQYWdlVGl0bGUoeyBwYWdlLCBvbkVudGVyIH0pIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBlZGl0aW5nID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyZWYuY3VycmVudCAmJiAhZWRpdGluZy5jdXJyZW50KSByZWYuY3VycmVudC50ZXh0Q29udGVudCA9IHBhZ2U/LnRpdGxlID8/ICcnO1xuICB9LCBbcGFnZT8uaWRdKTtcblxuICBpZiAoIXBhZ2UpIHJldHVybiA8ZGl2IGlkPVwicGFnZS10aXRsZS1iYXJcIiAvPjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJwYWdlLXRpdGxlLWJhclwiIG9uQ2xpY2s9eygpID0+IHJlZi5jdXJyZW50Py5mb2N1cygpfT5cbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIGlkPVwicGFnZS10aXRsZVwiXG4gICAgICAgIGNvbnRlbnRFZGl0YWJsZVxuICAgICAgICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcbiAgICAgICAgb25Gb2N1cz17KCkgPT4geyBlZGl0aW5nLmN1cnJlbnQgPSB0cnVlOyB9fVxuICAgICAgICBvbkJsdXI9e2UgPT4ge1xuICAgICAgICAgIGVkaXRpbmcuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IHRpdGxlID0gZS50YXJnZXQudGV4dENvbnRlbnQudHJpbSgpIHx8ICdVbnRpdGxlZCBQYWdlJztcbiAgICAgICAgICB1cGRhdGVQYWdlVGl0bGVBbmRSZWZyZXNoKHBhZ2UuaWQsIHRpdGxlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25LZXlEb3duPXtlID0+IHsgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7IGUucHJldmVudERlZmF1bHQoKTsgb25FbnRlcj8uKCk7IH0gfX1cbiAgICAgICAgb25JbnB1dD17ZSA9PiB7IHVwZGF0ZVBhZ2VUaXRsZShwYWdlLmlkLCBlLnRhcmdldC50ZXh0Q29udGVudCk7IH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vLyDilIDilIDilIAgQ2FudmFzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gQ2FudmFzKHsgcGFnZSB9KSB7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgaW5uZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IG1hcnF1ZWVSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGhTY3JvbGxSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHZTY3JvbGxSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHNjcm9sbEhpZGVUaW1lciA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgdmlld1JlZiA9IHVzZVJlZih7IHBhblg6IDAsIHBhblk6IDAsIHpvb206IDEgfSk7XG4gIGNvbnN0IHNwYWNlSGVsZCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gU2VsZWN0ZWQgYmxvY2sgSURzIOKAlCBzdG9yZWQgaW4gc3RhdGUgc28gYmxvY2tzIHJlLXJlbmRlciB3aXRoIHNlbGVjdGlvbiBzdHlsZVxuICBjb25zdCBbc2VsZWN0ZWRJZHMsIHNldFNlbGVjdGVkSWRzXSA9IHVzZVN0YXRlKG5ldyBTZXQoKSk7XG4gIGNvbnN0IHNlbGVjdGVkUmVmID0gdXNlUmVmKHNlbGVjdGVkSWRzKTtcblxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZChpZHMpIHtcbiAgICBzZWxlY3RlZFJlZi5jdXJyZW50ID0gaWRzO1xuICAgIHNldFNlbGVjdGVkSWRzKG5ldyBTZXQoaWRzKSk7XG4gIH1cblxuICAvLyBTeW5jIHZpZXcgd2hlbiBwYWdlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICB2aWV3UmVmLmN1cnJlbnQgPSB7IHBhblg6IHBhZ2UucGFuWCA/PyAwLCBwYW5ZOiBwYWdlLnBhblkgPz8gMCwgem9vbTogcGFnZS56b29tID8/IDEgfTtcbiAgICBhcHBseVRyYW5zZm9ybSgpO1xuICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIGlmICghaW5uZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGlubmVyUmVmLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkey1wYW5YICogem9vbX1weCwgJHstcGFuWSAqIHpvb219cHgpIHNjYWxlKCR7em9vbX0pYDtcbiAgICB1cGRhdGVTY3JvbGxiYXJzKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxiYXJzKCkge1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3VyA9IHJlY3Qud2lkdGggLyB6b29tO1xuICAgIGNvbnN0IHZpZXdIID0gcmVjdC5oZWlnaHQgLyB6b29tO1xuXG4gICAgLy8gVG90YWwgd29ybGQgPSB1bmlvbiBvZiBjb250ZW50IGJvdW5kcyBhbmQgY3VycmVudCB2aWV3cG9ydFxuICAgIGxldCBtYXhYID0gMCwgbWF4WSA9IDA7XG4gICAgaWYgKHBhZ2U/LmJsb2Nrcz8ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IGIgb2YgcGFnZS5ibG9ja3MpIHtcbiAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIGIueCArIChiLncgfHwgNDgwKSk7XG4gICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBiLnkgKyAzMDApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0b3RhbFcgPSBNYXRoLm1heChtYXhYICsgMTAwLCBwYW5YICsgdmlld1cpO1xuICAgIGNvbnN0IHRvdGFsSCA9IE1hdGgubWF4KG1heFkgKyAxMDAsIHBhblkgKyB2aWV3SCk7XG5cbiAgICAvLyBPbmx5IHNob3cgaWYgcGFubmVkIGF3YXkgZnJvbSBvcmlnaW4gKHRoZXJlJ3Mgc29tZXRoaW5nIHRvIHNjcm9sbCBiYWNrIHRvKVxuICAgIGNvbnN0IHNob3dIID0gcGFuWCA+IDEgfHwgbWF4WCArIDEwMCA+IHZpZXdXO1xuICAgIGNvbnN0IHNob3dWID0gcGFuWSA+IDEgfHwgbWF4WSArIDEwMCA+IHZpZXdIO1xuXG4gICAgaWYgKHNob3dIIHx8IHNob3dWKSB7XG4gICAgICBjb250YWluZXJSZWYuY3VycmVudC5jbGFzc0xpc3QuYWRkKCdzY3JvbGxiYXItYWN0aXZlJyk7XG4gICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsSGlkZVRpbWVyLmN1cnJlbnQpO1xuICAgICAgc2Nyb2xsSGlkZVRpbWVyLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGJhci1hY3RpdmUnKTtcbiAgICAgIH0sIDEyMDApO1xuICAgIH1cblxuICAgIC8vIEhvcml6b250YWwgdGh1bWJcbiAgICBpZiAoaFNjcm9sbFJlZi5jdXJyZW50KSB7XG4gICAgICBpZiAoIXNob3dIKSB7XG4gICAgICAgIGhTY3JvbGxSZWYuY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaFNjcm9sbFJlZi5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgY29uc3QgdHJhY2tXID0gcmVjdC53aWR0aCAtIDE0O1xuICAgICAgICBjb25zdCByYXRpbyA9IHZpZXdXIC8gdG90YWxXO1xuICAgICAgICBjb25zdCB0aHVtYlcgPSBNYXRoLm1heCgzMCwgcmF0aW8gKiB0cmFja1cpO1xuICAgICAgICBjb25zdCB0aHVtYlggPSAocGFuWCAvIHRvdGFsVykgKiB0cmFja1c7XG4gICAgICAgIGhTY3JvbGxSZWYuY3VycmVudC5zdHlsZS53aWR0aCA9IHRodW1iVyArICdweCc7XG4gICAgICAgIGhTY3JvbGxSZWYuY3VycmVudC5zdHlsZS5sZWZ0ID0gTWF0aC5tYXgoNCwgdGh1bWJYICsgNCkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnRpY2FsIHRodW1iXG4gICAgaWYgKHZTY3JvbGxSZWYuY3VycmVudCkge1xuICAgICAgaWYgKCFzaG93Vikge1xuICAgICAgICB2U2Nyb2xsUmVmLmN1cnJlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZTY3JvbGxSZWYuY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGNvbnN0IHRyYWNrSCA9IHJlY3QuaGVpZ2h0IC0gMTQ7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdmlld0ggLyB0b3RhbEg7XG4gICAgICAgIGNvbnN0IHRodW1iSCA9IE1hdGgubWF4KDMwLCByYXRpbyAqIHRyYWNrSCk7XG4gICAgICAgIGNvbnN0IHRodW1iWSA9IChwYW5ZIC8gdG90YWxIKSAqIHRyYWNrSDtcbiAgICAgICAgdlNjcm9sbFJlZi5jdXJyZW50LnN0eWxlLmhlaWdodCA9IHRodW1iSCArICdweCc7XG4gICAgICAgIHZTY3JvbGxSZWYuY3VycmVudC5zdHlsZS50b3AgPSBNYXRoLm1heCg0LCB0aHVtYlkgKyA0KSArICdweCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9DYW52YXMoY2xpZW50WCwgY2xpZW50WSkge1xuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IHBhblgsIHBhblksIHpvb20gfSA9IHZpZXdSZWYuY3VycmVudDtcbiAgICByZXR1cm4geyB4OiAoY2xpZW50WCAtIHJlY3QubGVmdCkgLyB6b29tICsgcGFuWCwgeTogKGNsaWVudFkgLSByZWN0LnRvcCkgLyB6b29tICsgcGFuWSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TY3JlZW4oY2xpZW50WCwgY2xpZW50WSkge1xuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4geyB4OiBjbGllbnRYIC0gcmVjdC5sZWZ0LCB5OiBjbGllbnRZIC0gcmVjdC50b3AgfTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBCbG9jayBkcmFnIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uQmxvY2tEcmFnU3RhcnQgPSB1c2VDYWxsYmFjaygoZSwgYmxvY2tJZCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB9XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuXG4gICAgLy8gRGVmYXVsdCBibG9jayBjYW5ub3QgYmUgbW92ZWRcbiAgICBpZiAocGcuZGVmYXVsdEJsb2NrSWQgPT09IGJsb2NrSWQpIHJldHVybjtcblxuICAgIGlmICghc2VsZWN0ZWRSZWYuY3VycmVudC5oYXMoYmxvY2tJZCkpIHtcbiAgICAgIGlmICghZS5zaGlmdEtleSkgc2V0U2VsZWN0ZWQobmV3IFNldChbYmxvY2tJZF0pKTtcbiAgICAgIGVsc2Ugc2V0U2VsZWN0ZWQobmV3IFNldChbLi4uc2VsZWN0ZWRSZWYuY3VycmVudCwgYmxvY2tJZF0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZHMgPSBzZWxlY3RlZFJlZi5jdXJyZW50LmhhcyhibG9ja0lkKVxuICAgICAgPyBbLi4uc2VsZWN0ZWRSZWYuY3VycmVudF1cbiAgICAgIDogW2Jsb2NrSWRdO1xuXG4gICAgLy8gU25hcHNob3Qgb3JpZ2luYWwgcG9zaXRpb25zIGZyb20gRE9NXG4gICAgY29uc3Qgb3JpZ1BvcyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7aWR9XCJdYCk7XG4gICAgICBpZiAoZWwpIG9yaWdQb3Muc2V0KGlkLCB7IHg6IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCB5OiBwYXJzZUludChlbC5zdHlsZS50b3ApIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WCwgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHsgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBkeSA9IChlMi5jbGllbnRZIC0gc3RhcnRZKSAvIHpvb207XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgb3JpZ10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBvcmlnLnggKyBkeCkgKyAncHgnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBvcmlnLnkgKyBkeSkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICAvLyBTYXZlIG9sZCBwb3NpdGlvbnMgYXMgdW5kbyBkZWx0YSwgdGhlbiBjb21taXQgbmV3IHBvc2l0aW9uc1xuICAgICAgY29uc3QgbW92ZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgW2lkLCBvcmlnXSBvZiBvcmlnUG9zKSB7XG4gICAgICAgIG1vdmVzLnB1c2goeyBpZCwgeDogb3JpZy54LCB5OiBvcmlnLnkgfSk7XG4gICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2lkfVwiXWApO1xuICAgICAgICBpZiAoZWwpIHVwZGF0ZUJsb2NrUG9zKGlkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICB9XG4gICAgICBwdXNoVW5kbyhwZy5pZCwgeyB0eXBlOiAnbW92ZScsIG1vdmVzIH0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIEJsb2NrIHJlc2l6ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBvbkJsb2NrUmVzaXplU3RhcnQgPSB1c2VDYWxsYmFjaygoZSwgYmxvY2tJZCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtibG9ja0lkfVwiXWApO1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBjb25zdCBvcmlnVyA9IHBhcnNlSW50KGVsLnN0eWxlLndpZHRoKSB8fCA0ODA7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHZpZXdSZWYuY3VycmVudC56b29tO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBNYXRoLm1heCgxMjAsIG9yaWdXICsgZHgpICsgJ3B4JztcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcuaWQsIHsgdHlwZTogJ3Jlc2l6ZScsIGlkOiBibG9ja0lkLCB3OiBvcmlnVyB9KTtcbiAgICAgIHVwZGF0ZUJsb2NrV2lkdGgoYmxvY2tJZCwgcGFyc2VJbnQoZWwuc3R5bGUud2lkdGgpKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgSW1hZ2UgcmVzaXplIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uSW1nUmVzaXplU3RhcnQgPSB1c2VDYWxsYmFjaygoZSwgYmxvY2tJZCwgZGlyKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2Jsb2NrSWR9XCJdYCk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdXID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgb3JpZ1ggPSBwYXJzZUludChlbC5zdHlsZS5sZWZ0KTtcbiAgICBjb25zdCBvcmlnWSA9IHBhcnNlSW50KGVsLnN0eWxlLnRvcCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHZpZXdSZWYuY3VycmVudC56b29tO1xuICAgICAgY29uc3QgbmV3VyA9IE1hdGgubWF4KDQwLCBvcmlnVyArIChkaXIuaW5jbHVkZXMoJ2UnKSA/IGR4IDogLWR4KSk7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IG5ld1cgKyAncHgnO1xuICAgICAgaWYgKGRpci5pbmNsdWRlcygndycpKSBlbC5zdHlsZS5sZWZ0ID0gKG9yaWdYIC0gKG5ld1cgLSBvcmlnVykpICsgJ3B4JztcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcuaWQsIHsgdHlwZTogJ3Jlc2l6ZScsIGlkOiBibG9ja0lkLCB3OiBvcmlnVywgeDogb3JpZ1gsIHk6IG9yaWdZIH0pO1xuICAgICAgdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS53aWR0aCkpO1xuICAgICAgdXBkYXRlQmxvY2tQb3MoYmxvY2tJZCwgcGFyc2VJbnQoZWwuc3R5bGUubGVmdCksIHBhcnNlSW50KGVsLnN0eWxlLnRvcCkpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfSwgW10pO1xuXG4gIC8vIOKUgOKUgCBQYW4g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gc3RhcnRQYW4oc3RhcnRYLCBzdGFydFkpIHtcbiAgICBjb25zdCBvcmlnUGFuID0geyAuLi52aWV3UmVmLmN1cnJlbnQgfTtcbiAgICBmdW5jdGlvbiBvbk1vdmUoZSkge1xuICAgICAgY29uc3QgZHggPSAoZS5jbGllbnRYIC0gc3RhcnRYKSAvIHZpZXdSZWYuY3VycmVudC56b29tO1xuICAgICAgY29uc3QgZHkgPSAoZS5jbGllbnRZIC0gc3RhcnRZKSAvIHZpZXdSZWYuY3VycmVudC56b29tO1xuICAgICAgdmlld1JlZi5jdXJyZW50LnBhblggPSBNYXRoLm1heCgwLCBvcmlnUGFuLnBhblggLSBkeCk7XG4gICAgICB2aWV3UmVmLmN1cnJlbnQucGFuWSA9IE1hdGgubWF4KDAsIG9yaWdQYW4ucGFuWSAtIGR5KTtcbiAgICAgIGFwcGx5VHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH1cblxuICAvLyDilIDilIAgTWFycXVlZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzdGFydE1hcnF1ZWUoc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpIHtcbiAgICBjb25zdCBzdGFydFNjcmVlbiA9IHRvU2NyZWVuKHN0YXJ0Q2xpZW50WCwgc3RhcnRDbGllbnRZKTtcbiAgICBjb25zdCBzdGFydENhbnZhcyA9IHRvQ2FudmFzKHN0YXJ0Q2xpZW50WCwgc3RhcnRDbGllbnRZKTtcblxuICAgIGNvbnN0IG1xID0gbWFycXVlZVJlZi5jdXJyZW50O1xuICAgIGlmIChtcSkgeyBtcS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgbXEuc3R5bGUuY3NzVGV4dCArPSAnOyBsZWZ0OjA7dG9wOjA7d2lkdGg6MDtoZWlnaHQ6MCc7IH1cblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICBjb25zdCBjdXIgPSB0b1NjcmVlbihlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgICBjb25zdCB4ID0gTWF0aC5taW4oc3RhcnRTY3JlZW4ueCwgY3VyLngpO1xuICAgICAgY29uc3QgeSA9IE1hdGgubWluKHN0YXJ0U2NyZWVuLnksIGN1ci55KTtcbiAgICAgIGNvbnN0IHcgPSBNYXRoLmFicyhjdXIueCAtIHN0YXJ0U2NyZWVuLngpO1xuICAgICAgY29uc3QgaCA9IE1hdGguYWJzKGN1ci55IC0gc3RhcnRTY3JlZW4ueSk7XG4gICAgICBpZiAobXEpIHsgbXEuc3R5bGUubGVmdCA9IHgrJ3B4JzsgbXEuc3R5bGUudG9wID0geSsncHgnOyBtcS5zdHlsZS53aWR0aCA9IHcrJ3B4JzsgbXEuc3R5bGUuaGVpZ2h0ID0gaCsncHgnOyB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25VcChlKSB7XG4gICAgICBpZiAobXEpIG1xLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBjb25zdCBlbmRDYW52YXMgPSB0b0NhbnZhcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgICBjb25zdCByeCA9IE1hdGgubWluKHN0YXJ0Q2FudmFzLngsIGVuZENhbnZhcy54KTtcbiAgICAgIGNvbnN0IHJ5ID0gTWF0aC5taW4oc3RhcnRDYW52YXMueSwgZW5kQ2FudmFzLnkpO1xuICAgICAgY29uc3QgcncgPSBNYXRoLmFicyhlbmRDYW52YXMueCAtIHN0YXJ0Q2FudmFzLngpO1xuICAgICAgY29uc3QgcmggPSBNYXRoLmFicyhlbmRDYW52YXMueSAtIHN0YXJ0Q2FudmFzLnkpO1xuXG4gICAgICBpZiAocncgPiA0IHx8IHJoID4gNCkge1xuICAgICAgICBjb25zdCBoaXRzID0gbmV3IFNldCgpO1xuICAgICAgICBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBjb25zdCBieCA9IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCBieSA9IHBhcnNlSW50KGVsLnN0eWxlLnRvcCk7XG4gICAgICAgICAgY29uc3QgYncgPSBlbC5vZmZzZXRXaWR0aCwgYmggPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgaWYgKGJ4IDwgcngrcncgJiYgYngrYncgPiByeCAmJiBieSA8IHJ5K3JoICYmIGJ5K2JoID4gcnkpIGhpdHMuYWRkKGVsLmRhdGFzZXQuYmxvY2tJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTZWxlY3RlZChoaXRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBDYW52YXMgcG9pbnRlciBkb3duIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVBvaW50ZXJEb3duKGUpIHtcbiAgICAvLyBNaWRkbGUgYnV0dG9uIG9yIHNwYWNlIGhlbGQg4oaSIHBhblxuICAgIGlmIChlLmJ1dHRvbiA9PT0gMSB8fCAoZS5idXR0b24gPT09IDAgJiYgc3BhY2VIZWxkLmN1cnJlbnQpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzdGFydFBhbihlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuXG4gICAgLy8gQmx1ciBhbnkgZm9jdXNlZCBibG9jayBzbyBtYXJxdWVlIHNlbGVjdGlvbiArIERlbGV0ZSBrZXkgd29ya3NcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB9XG5cbiAgICAvLyBMZWZ0IGNsaWNrIG9uIGVtcHR5IGNhbnZhcyDigJQgbWlnaHQgYmUgbWFycXVlZSBvciBjcmVhdGUtYmxvY2tcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYLCBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG4gICAgbGV0IG1hcnF1ZWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSBlMi5jbGllbnRYIC0gc3RhcnRYLCBkeSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBpZiAoIW1vdmVkICYmIE1hdGguc3FydChkeCpkeCArIGR5KmR5KSA+IDQpIHtcbiAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICBtYXJxdWVlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRNYXJxdWVlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICAgIGlmICghbWFycXVlZUFjdGl2ZSkge1xuICAgICAgICAvLyBDbGVhbiBzaW5nbGUgY2xpY2sg4oaSIGNyZWF0ZSBibG9ja1xuICAgICAgICBzZXRTZWxlY3RlZChuZXcgU2V0KCkpO1xuICAgICAgICBjb25zdCBwb3MgPSB0b0NhbnZhcyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgIGFkZEJsb2NrKHBvcy54LCBwb3MueSk7XG4gICAgICAgIC8vIEZvY3VzIHRoZSBuZXcgYmxvY2sgYWZ0ZXIgUHJlYWN0IHJlbmRlcnMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gcGcuYmxvY2tzW3BnLmJsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoIWxhc3RCbG9jaykgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2xhc3RCbG9jay5pZH1cIl0gLmJsb2NrLWNvbnRlbnRgKTtcbiAgICAgICAgICBlbD8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFdoZWVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBteSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY3ggPSBteCAvIHpvb20gKyBwYW5YLCBjeSA9IG15IC8gem9vbSArIHBhblk7XG4gICAgICBjb25zdCBueiA9IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgem9vbSAqIGZhY3RvcikpO1xuICAgICAgdmlld1JlZi5jdXJyZW50ID0geyBwYW5YOiBNYXRoLm1heCgwLCBjeCAtIG14L256KSwgcGFuWTogTWF0aC5tYXgoMCwgY3kgLSBteS9ueiksIHpvb206IG56IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYuY3VycmVudCA9IHsgcGFuWDogTWF0aC5tYXgoMCwgcGFuWCArIGUuZGVsdGFYL3pvb20pLCBwYW5ZOiBNYXRoLm1heCgwLCBwYW5ZICsgZS5kZWx0YVkvem9vbSksIHpvb20gfTtcbiAgICB9XG4gICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTcGFjZSBrZXkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgICAgfVxuICAgICAgLy8gRGVsZXRlIHNlbGVjdGVkIGJsb2Nrc1xuICAgICAgaWYgKChlLmtleSA9PT0gJ0RlbGV0ZScgfHwgZS5rZXkgPT09ICdCYWNrc3BhY2UnKSAmJiBzZWxlY3RlZFJlZi5jdXJyZW50LnNpemUgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICAgIGlmICghcGcpIHJldHVybjtcbiAgICAgICAgY29uc3QgZGVmYXVsdElkID0gcGcuZGVmYXVsdEJsb2NrSWQ7XG4gICAgICAgIGNvbnN0IHRvRGVsZXRlID0gWy4uLnNlbGVjdGVkUmVmLmN1cnJlbnRdLmZpbHRlcihpZCA9PiBpZCAhPT0gZGVmYXVsdElkKTtcbiAgICAgICAgaWYgKCF0b0RlbGV0ZS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IHRvRGVsZXRlLm1hcChpZCA9PiBwZy5ibG9ja3MuZmluZChiID0+IGIuaWQgPT09IGlkKSkuZmlsdGVyKEJvb2xlYW4pLm1hcChiID0+ICh7IC4uLmIgfSkpO1xuICAgICAgICBwdXNoVW5kbyhwZy5pZCwgeyB0eXBlOiAnZGVsZXRlJywgYmxvY2tzOiBkZWxldGVkIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIHRvRGVsZXRlKSBkZWxldGVCbG9jayhpZCk7XG4gICAgICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gICAgICB9XG4gICAgICAvLyBVbmRvL3JlZG9cbiAgICAgIGNvbnN0IG1vZCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG4gICAgICBpZiAobW9kICYmIGUua2V5ID09PSAneicgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zaGlmdEtleSA/IGRvUmVkbygpIDogZG9VbmRvKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uS2V5VXAoZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGFpbmVyUmVmLmN1cnJlbnQpIGNvbnRhaW5lclJlZi5jdXJyZW50LnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuICAgIHJldHVybiAoKSA9PiB7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pOyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApOyB9O1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIFVuZG8vUmVkbyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBkb1VuZG8oKSB7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuICAgIGlmICghYXBwbHlVbmRvKHBnLmlkLCBwZykpIHJldHVybjtcbiAgICBhcHBTdGF0ZS52YWx1ZSA9IHsgLi4uYXBwU3RhdGUudmFsdWUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvUmVkbygpIHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgaWYgKCFhcHBseVJlZG8ocGcuaWQsIHBnKSkgcmV0dXJuO1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEltYWdlIGRyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVzID0gWy4uLmUuZGF0YVRyYW5zZmVyLmZpbGVzXS5maWx0ZXIoZiA9PiBmLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpO1xuICAgIGlmICghZmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gdG9DYW52YXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgaWYgKCFwZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBibGsgPSB7IGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB4OiBwb3MueCArIGkqMjAsIHk6IHBvcy55ICsgaSoyMCwgdzogMzAwLCBodG1sOiAnJywgdHlwZTogJ2ltYWdlJywgc3JjOiBldi50YXJnZXQucmVzdWx0IH07XG4gICAgICAgIHBnLmJsb2NrcyA9IFsuLi5wZy5ibG9ja3MsIGJsa107XG4gICAgICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgICB1cGRhdGVCbG9ja1BvcyhibGsuaWQsIGJsay54LCBibGsueSk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIAgQ29udGV4dCBmb3IgYmxvY2tzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGZvY3VzRGVmYXVsdEJsb2NrKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGc/LmRlZmF1bHRCbG9ja0lkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7cGcuZGVmYXVsdEJsb2NrSWR9XCJdIC5ibG9jay1jb250ZW50YCk7XG4gICAgZWw/LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdCBjdHggPSB7XG4gICAgc2VsZWN0ZWRJZHMsXG4gICAgb25CbG9ja0RyYWdTdGFydCxcbiAgICBvbkJsb2NrUmVzaXplU3RhcnQsXG4gICAgb25JbWdSZXNpemVTdGFydCxcbiAgICBvbkJsb2NrRm9jdXM6IChpZCkgPT4ge30sXG4gICAgb25CbG9ja0JsdXI6IChpZCkgPT4ge30sXG4gICAgdW5kbzogZG9VbmRvLFxuICAgIHJlZG86IGRvUmVkbyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8UGFnZVRpdGxlIHBhZ2U9e3BhZ2V9IG9uRW50ZXI9e2ZvY3VzRGVmYXVsdEJsb2NrfSAvPlxuICAgICAgPENhbnZhc0N0eC5Qcm92aWRlciB2YWx1ZT17Y3R4fT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgICAgIGlkPVwiY2FudmFzLWNvbnRhaW5lclwiXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17aGFuZGxlUG9pbnRlckRvd259XG4gICAgICAgICAgb25XaGVlbD17aGFuZGxlV2hlZWx9XG4gICAgICAgICAgb25EcmFnT3Zlcj17ZSA9PiB7IGlmIChlLmRhdGFUcmFuc2Zlci50eXBlcy5pbmNsdWRlcygnRmlsZXMnKSkgZS5wcmV2ZW50RGVmYXVsdCgpOyB9fVxuICAgICAgICAgIG9uRHJvcD17aGFuZGxlRHJvcH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgcmVmPXttYXJxdWVlUmVmfSBpZD1cIm1hcnF1ZWUtcmVjdFwiIC8+XG4gICAgICAgICAgPGRpdiByZWY9e2lubmVyUmVmfSBpZD1cImNhbnZhcy1pbm5lclwiIHN0eWxlPXt7IHRyYW5zZm9ybU9yaWdpbjogJzAgMCcgfX0+XG4gICAgICAgICAgICB7cGFnZT8uYmxvY2tzLm1hcChiID0+IDxCbG9jayBrZXk9e2IuaWR9IGJsb2NrPXtifSBwYWdlPXtwYWdlfSAvPil9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiByZWY9e2hTY3JvbGxSZWZ9IGNsYXNzPVwiY2FudmFzLXNjcm9sbC10aHVtYiBjYW52YXMtc2Nyb2xsLXRodW1iLWhcIiAvPlxuICAgICAgICAgIDxkaXYgcmVmPXt2U2Nyb2xsUmVmfSBjbGFzcz1cImNhbnZhcy1zY3JvbGwtdGh1bWIgY2FudmFzLXNjcm9sbC10aHVtYi12XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhbnZhc0N0eC5Qcm92aWRlcj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsCiAgICAiaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgQ2FudmFzQ3R4IH0gZnJvbSAnLi9DYW52YXMuanN4JztcbmltcG9ydCB7IHVwZGF0ZUJsb2NrSHRtbCwgdXBkYXRlQmxvY2tUeXBlLCBkZWxldGVCbG9jaywgZ2V0QWN0aXZlUGFnZSB9IGZyb20gJy4vc3RvcmUuanMnO1xuaW1wb3J0IHsgb25CbG9ja0tleURvd24sIGhhbmRsZU1hcmtkb3duSW5wdXQgfSBmcm9tICcuL2VkaXRvci5qcyc7XG5pbXBvcnQgeyBwdXNoVW5kbyB9IGZyb20gJy4vdW5kby5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBCbG9jayh7IGJsb2NrLCBwYWdlIH0pIHtcbiAgY29uc3QgY3R4ID0gdXNlQ29udGV4dChDYW52YXNDdHgpO1xuICBjb25zdCBjb250ZW50UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpc0RlZmF1bHQgPSBibG9jay5pZCA9PT0gcGFnZS5kZWZhdWx0QmxvY2tJZDtcbiAgY29uc3QgaXNJbWFnZSAgID0gYmxvY2sudHlwZSA9PT0gJ2ltYWdlJztcbiAgY29uc3QgaXNTZWxlY3RlZCA9IGN0eC5zZWxlY3RlZElkcy5oYXMoYmxvY2suaWQpO1xuXG4gIC8vIFN5bmMgY29udGVudCB3aGVuIGJsb2NrLmh0bWwgY2hhbmdlcyBleHRlcm5hbGx5ICh1bmRvL3BhZ2Utc3dpdGNoKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgIGlmIChlbCAmJiBlbC5pbm5lckhUTUwgIT09IGJsb2NrLmh0bWwpIGVsLmlubmVySFRNTCA9IGJsb2NrLmh0bWw7XG4gIH0sIFtibG9jay5odG1sXSk7XG5cbiAgLy8gVHJhY2sgSFRNTCBhdCBmb2N1cyB0aW1lIGZvciB1bmRvIGRlbHRhc1xuICBjb25zdCB1bmRvVGltZXIgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGh0bWxBdEZvY3VzID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcblxuICAgIC8vIFRyeSBtYXJrZG93biBzaG9ydGN1dHMg4oCUIHJldHVybnMgJ2NvZGUnIGlmIGJsb2NrIGNvbnZlcnRlZFxuICAgIGNvbnN0IHJlc3VsdCA9IGhhbmRsZU1hcmtkb3duSW5wdXQoZWwpO1xuICAgIGlmIChyZXN1bHQgPT09ICdjb2RlJykgdXBkYXRlQmxvY2tUeXBlKGJsb2NrLmlkLCAnY29kZScpO1xuXG4gICAgLy8gU2F2ZSBIVE1MIHRvIHN0b3JlIChzaWxlbnQpXG4gICAgdXBkYXRlQmxvY2tIdG1sKGJsb2NrLmlkLCBlbC5pbm5lckhUTUwpO1xuXG4gICAgLy8gRGVib3VuY2VkIHVuZG8gc25hcHNob3Qgd2hpbGUgdHlwaW5nIChldmVyeSB+MS41IHMgb2YgaW5hY3Rpdml0eSlcbiAgICBjbGVhclRpbWVvdXQodW5kb1RpbWVyLmN1cnJlbnQpO1xuICAgIHVuZG9UaW1lci5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoaHRtbEF0Rm9jdXMuY3VycmVudCAhPSBudWxsICYmIGh0bWxBdEZvY3VzLmN1cnJlbnQgIT09IGVsLmlubmVySFRNTCkge1xuICAgICAgICBwdXNoVW5kbyhwYWdlLmlkLCB7IHR5cGU6ICdodG1sJywgaWQ6IGJsb2NrLmlkLCBodG1sOiBodG1sQXRGb2N1cy5jdXJyZW50IH0pO1xuICAgICAgICBodG1sQXRGb2N1cy5jdXJyZW50ID0gZWwuaW5uZXJIVE1MO1xuICAgICAgfVxuICAgIH0sIDE1MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgIGNvbnN0IG1vZCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG5cbiAgICAvLyBVbmRvIC8gcmVkb1xuICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zaGlmdEtleSA/IGN0eC5yZWRvKCkgOiBjdHgudW5kbygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uQmxvY2tLZXlEb3duKGUsIGNvbnRlbnRSZWYuY3VycmVudCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRm9jdXMgPSAoKSA9PiB7XG4gICAgaHRtbEF0Rm9jdXMuY3VycmVudCA9IGJsb2NrLmh0bWw7XG4gICAgY3R4Lm9uQmxvY2tGb2N1cz8uKGJsb2NrLmlkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCbHVyID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh1bmRvVGltZXIuY3VycmVudCk7XG4gICAgY29uc3QgZWwgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaHRtbCA9IGVsLmlubmVySFRNTDtcbiAgICBjb25zdCBpc0VtcHR5ID0gIWh0bWwgfHwgaHRtbCA9PT0gJzxicj4nIHx8IGh0bWwudHJpbSgpID09PSAnJztcblxuICAgIC8vIFB1c2ggdW5kbyBkZWx0YSBpZiBjb250ZW50IGNoYW5nZWQgZHVyaW5nIHRoaXMgZWRpdCBzZXNzaW9uXG4gICAgaWYgKGh0bWxBdEZvY3VzLmN1cnJlbnQgIT0gbnVsbCAmJiBodG1sQXRGb2N1cy5jdXJyZW50ICE9PSBodG1sKSB7XG4gICAgICBwdXNoVW5kbyhwYWdlLmlkLCB7IHR5cGU6ICdodG1sJywgaWQ6IGJsb2NrLmlkLCBodG1sOiBodG1sQXRGb2N1cy5jdXJyZW50IH0pO1xuICAgIH1cbiAgICBodG1sQXRGb2N1cy5jdXJyZW50ID0gbnVsbDtcblxuICAgIGlmIChpc0VtcHR5ICYmICFpc0RlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZUJsb2NrKGJsb2NrLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQmxvY2tIdG1sKGJsb2NrLmlkLCBodG1sKTtcbiAgICB9XG4gICAgY3R4Lm9uQmxvY2tCbHVyPy4oYmxvY2suaWQpO1xuICB9O1xuXG4gIC8vIENsaWNraW5nIGFueXdoZXJlIG9uIHRoZSBibG9jayAob3V0c2lkZSBjb250ZW50KSBzdGFydHMgYSBkcmFnL3NlbGVjdFxuICAvLyBhbmQgY3J1Y2lhbGx5IFNUT1BTIHByb3BhZ2F0aW9uIHNvIGNhbnZhcyBkb2Vzbid0IGNyZWF0ZSBhIG5ldyBibG9ja1xuICBjb25zdCBoYW5kbGVCbG9ja1BvaW50ZXJEb3duID0gKGUpID0+IHtcbiAgICAvLyBBbHdheXMgc3RvcCBwcm9wYWdhdGlvbiDigJQgbm8gY2FudmFzIGFjdGlvbnMgc2hvdWxkIGZpcmUgZnJvbSBibG9jayBpbnRlcmFjdGlvbnNcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gSWYgY2xpY2sgbGFuZHMgb3V0c2lkZSBjb250ZW50L2hhbmRsZXMsIGluaXRpYXRlIGRyYWcrc2VsZWN0XG4gICAgY29uc3Qgb25Db250ZW50ID0gZS50YXJnZXQuY2xvc2VzdCgnLmJsb2NrLWNvbnRlbnQsIC5ibG9jay1oYW5kbGUsIC5ibG9jay1yZXNpemUsIC5pbWctcmVzaXplLCAuYmxvY2stZHJhZy1vdmVybGF5Jyk7XG4gICAgaWYgKCFvbkNvbnRlbnQpIHtcbiAgICAgIGN0eC5vbkJsb2NrRHJhZ1N0YXJ0KGUsIGJsb2NrLmlkKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzcz17WydibG9jaycsIGlzRGVmYXVsdCAmJiAnYmxvY2stLWRlZmF1bHQnLCBpc0ltYWdlICYmICdibG9jay0taW1hZ2UnLCBpc1NlbGVjdGVkICYmICdibG9jay0tc2VsZWN0ZWQnXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpfVxuICAgICAgZGF0YS1ibG9jay1pZD17YmxvY2suaWR9XG4gICAgICBzdHlsZT17eyBsZWZ0OiBibG9jay54ICsgJ3B4JywgdG9wOiBibG9jay55ICsgJ3B4Jywgd2lkdGg6IGJsb2NrLncgKyAncHgnIH19XG4gICAgICBvblBvaW50ZXJEb3duPXtoYW5kbGVCbG9ja1BvaW50ZXJEb3dufVxuICAgID5cbiAgICAgIHsvKiBEcmFnIGhhbmRsZSDigJQgaGlkZGVuIGZvciBkZWZhdWx0IGJsb2NrIGFuZCBpbWFnZSBibG9ja3MgKi99XG4gICAgICB7IWlzRGVmYXVsdCAmJiAhaXNJbWFnZSAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImJsb2NrLWhhbmRsZVwiXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uQmxvY2tEcmFnU3RhcnQoZSwgYmxvY2suaWQpOyB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIFJlc2l6ZSBoYW5kbGUg4oCUIHRvcC1yaWdodCwgd2lkdGggb25seSwgaGlkZGVuIGZvciBpbWFnZSBibG9ja3MgKi99XG4gICAgICB7IWlzSW1hZ2UgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJibG9jay1yZXNpemVcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkJsb2NrUmVzaXplU3RhcnQoZSwgYmxvY2suaWQpOyB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAge2lzSW1hZ2UgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGltZyBzcmM9e2Jsb2NrLnNyYyB8fCAnJ30gZHJhZ2dhYmxlPXtmYWxzZX0gc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgZGlzcGxheTogJ2Jsb2NrJyB9fSAvPlxuICAgICAgICAgIHtbJ253JywgJ25lJywgJ3N3JywgJ3NlJ10ubWFwKGRpciA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGtleT17ZGlyfVxuICAgICAgICAgICAgICBjbGFzcz17YGltZy1yZXNpemUgaW1nLXJlc2l6ZS0tJHtkaXJ9YH1cbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uSW1nUmVzaXplU3RhcnQoZSwgYmxvY2suaWQsIGRpcik7IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYmxvY2stZHJhZy1vdmVybGF5XCJcbiAgICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkJsb2NrRHJhZ1N0YXJ0KGUsIGJsb2NrLmlkKTsgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRlbnRSZWZ9XG4gICAgICAgICAgY2xhc3M9e1snYmxvY2stY29udGVudCcsIGJsb2NrLnR5cGUgPT09ICdjb2RlJyAmJiAnY29kZS1ibG9jayddLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICAgICAgY29udGVudEVkaXRhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgZGF0YS1wbGFjZWhvbGRlcj1cIlN0YXJ0IHR5cGluZ+KAplwiXG4gICAgICAgICAgZGF0YS1jb2RlPXtibG9jay50eXBlID09PSAnY29kZScgPyAnMScgOiB1bmRlZmluZWR9XG4gICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgIG9uSW5wdXQ9e2hhbmRsZUlucHV0fVxuICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17aGFuZGxlQmx1cn1cbiAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLAogICAgIi8vIOKUgOKUgCBIZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25JbmZvKCkge1xuICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIGlmICghc2VsPy5yYW5nZUNvdW50KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgY29uc3Qgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHJldHVybiBudWxsO1xuICByZXR1cm4geyBzZWwsIHJhbmdlLCBub2RlLCB0ZXh0OiBub2RlLnRleHRDb250ZW50LCBvZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0IH07XG59XG5cbi8vIFNlbGVjdCB0ZXh0IGZyb20gYHN0YXJ0YCB0byBgZW5kYCBpbiBhIHRleHQgbm9kZSwgdGhlbiBkZWxldGUgaXRcbmZ1bmN0aW9uIGVhdFRleHQoc2VsLCBub2RlLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICByLnNldFN0YXJ0KG5vZGUsIHN0YXJ0KTtcbiAgci5zZXRFbmQobm9kZSwgZW5kKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2Uocik7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWxldGUnKTtcbn1cblxuLy8gUmVwbGFjZSBhIHJlZ2V4IG1hdGNoIGluIGEgdGV4dCBub2RlIHdpdGggYSBmb3JtYXR0ZWQgZWxlbWVudFxuZnVuY3Rpb24gd3JhcE1hdGNoKHNlbCwgbm9kZSwgbWF0Y2gsIHRhZykge1xuICBjb25zdCBpZHggPSBtYXRjaC5pbmRleDtcbiAgY29uc3QgZnVsbCA9IG1hdGNoWzBdO1xuICBjb25zdCBpbm5lciA9IG1hdGNoWzFdO1xuXG4gIC8vIFNwbGl0IG5vZGU6IGJlZm9yZSB8IDx0YWc+aW5uZXI8L3RhZz4gfCBhZnRlclxuICBjb25zdCBiZWZvcmUgPSBub2RlLnRleHRDb250ZW50LnNsaWNlKDAsIGlkeCk7XG4gIGNvbnN0IGFmdGVyICA9IG5vZGUudGV4dENvbnRlbnQuc2xpY2UoaWR4ICsgZnVsbC5sZW5ndGgpO1xuXG4gIG5vZGUudGV4dENvbnRlbnQgPSBiZWZvcmU7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBlbC50ZXh0Q29udGVudCA9IGlubmVyO1xuICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBub2RlLm5leHRTaWJsaW5nKTtcbiAgY29uc3QgYWZ0ZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYWZ0ZXIpO1xuICBlbC5hZnRlcihhZnRlck5vZGUpO1xuXG4gIC8vIFBsYWNlIGN1cnNvciBhdCBzdGFydCBvZiBhZnRlciB0ZXh0XG4gIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICByLnNldFN0YXJ0KGFmdGVyTm9kZSwgMCk7XG4gIHIuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHIpO1xufVxuXG4vLyDilIDilIAgUmljaCB0ZXh0IGNvbW1hbmRzICh0b29sYmFyKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNGbXQoY21kKSB7XG4gIGNvbnN0IG1hcCA9IHtcbiAgICBib2xkOiAgICAgICAgICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnYm9sZCcpLFxuICAgIGl0YWxpYzogICAgICAgICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnKSxcbiAgICB1bmRlcmxpbmU6ICAgICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgndW5kZXJsaW5lJyksXG4gICAgc3RyaWtldGhyb3VnaDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3N0cmlrZVRocm91Z2gnKSxcbiAgICBoMTogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdIMScpLFxuICAgIGgyOiAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ0gyJyksXG4gICAgaDM6ICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAnSDMnKSxcbiAgICBoNDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdINCcpLFxuICAgIHA6ICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ1AnKSxcbiAgICB1bDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFVub3JkZXJlZExpc3QnKSxcbiAgICBvbDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydE9yZGVyZWRMaXN0JyksXG4gICAgbGluazogKCkgPT4geyBjb25zdCB1ID0gcHJvbXB0KCdVUkw6Jyk7IGlmICh1KSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCB1KTsgfSxcbiAgfTtcbiAgbWFwW2NtZF0/LigpO1xufVxuXG4vLyDilIDilIAgTWFya2Rvd24gc2hvcnRjdXRzIOKAlCBjYWxsZWQgb24gYGlucHV0YCBldmVudCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIFJldHVybnMgJ2NvZGUnIGlmIGJsb2NrIHdhcyBjb252ZXJ0ZWQgdG8gYSBjb2RlIGJsb2NrLCBudWxsIG90aGVyd2lzZS5cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1hcmtkb3duSW5wdXQoZWwpIHtcbiAgY29uc3QgaW5mbyA9IGdldFNlbGVjdGlvbkluZm8oKTtcbiAgaWYgKCFpbmZvKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgeyBzZWwsIHJhbmdlLCBub2RlLCB0ZXh0LCBvZmZzZXQgfSA9IGluZm87XG4gIGNvbnN0IGJlZm9yZSA9IHRleHQuc2xpY2UoMCwgb2Zmc2V0KTtcblxuICAvLyDilIDilIAgQmxvY2stbGV2ZWwgdHJpZ2dlcnMgKGF0IHN0YXJ0IG9mIGxpbmUpIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIC8vIEhlYWRpbmdzOiAjICMjICMjIyAjIyMjICsgc3BhY2VcbiAgY29uc3QgaE1hdGNoID0gYmVmb3JlLm1hdGNoKC9eKCN7MSw0fSkgJC8pO1xuICBpZiAoaE1hdGNoKSB7XG4gICAgZWF0VGV4dChzZWwsIG5vZGUsIDAsIG9mZnNldCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsIGBIJHtoTWF0Y2hbMV0ubGVuZ3RofWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gVW5vcmRlcmVkIGxpc3Q6IFwiLSBcIiBvciBcIiogXCJcbiAgaWYgKGJlZm9yZSA9PT0gJy0gJyB8fCBiZWZvcmUgPT09ICcqICcpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VW5vcmRlcmVkTGlzdCcpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gT3JkZXJlZCBsaXN0OiBcIjEuIFwiIGV0Yy5cbiAgaWYgKC9eXFxkK1xcLiAkLy50ZXN0KGJlZm9yZSkpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0T3JkZXJlZExpc3QnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEJsb2NrcXVvdGU6IFwiPiBcIlxuICBpZiAoYmVmb3JlID09PSAnPiAnKSB7XG4gICAgZWF0VGV4dChzZWwsIG5vZGUsIDAsIG9mZnNldCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdCTE9DS1FVT1RFJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDb2RlIGJsb2NrOiBcImBgYCBcIlxuICBpZiAoYmVmb3JlID09PSAnYGBgICcpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29kZScsICcxJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnY29kZS1ibG9jaycpO1xuICAgIHJldHVybiAnY29kZSc7IC8vIGNhbGxlciBzaG91bGQgcGVyc2lzdCBibG9jay50eXBlXG4gIH1cblxuICAvLyDilIDilIAgSW5saW5lIHRyaWdnZXJzIChwYXR0ZXJuIGNvbXBsZXRlZCB3aXRoIHNwYWNlKSDilIDilIDilIDilIBcblxuICAvLyAqKmJvbGQqKiBvciBfX2JvbGRfXyDigJQgZW5kZWQganVzdCBiZWZvcmUgY3Vyc29yXG4gIGNvbnN0IGJvbGRNID0gYmVmb3JlLm1hdGNoKC9cXCpcXCooLis/KVxcKlxcKiQvKSB8fCBiZWZvcmUubWF0Y2goL19fKC4rPylfXyQvKTtcbiAgaWYgKGJvbGRNKSB7XG4gICAgd3JhcE1hdGNoKHNlbCwgbm9kZSwgYm9sZE0sICdzdHJvbmcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vICppdGFsaWMqIG9yIF9pdGFsaWNfIChzaW5nbGUsIG5vdCBkb3VibGUpXG4gIGNvbnN0IGl0YWxpY00gPSBiZWZvcmUubWF0Y2goLyg/PCFcXCopXFwqKFteKlxcbl0rKVxcKiQvKSB8fCBiZWZvcmUubWF0Y2goLyg/PCFfKV8oW15fXFxuXSspXyQvKTtcbiAgaWYgKGl0YWxpY00pIHtcbiAgICB3cmFwTWF0Y2goc2VsLCBub2RlLCBpdGFsaWNNLCAnZW0nKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vLyDilIDilIAgSW5saW5lIGNvZGUg4oCUIGNhbGxlZCBhZnRlciBiYWNrdGljayBpbnB1dCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUlubGluZUNvZGUoZWwpIHtcbiAgY29uc3QgaW5mbyA9IGdldFNlbGVjdGlvbkluZm8oKTtcbiAgaWYgKCFpbmZvKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHsgc2VsLCByYW5nZSwgbm9kZSwgb2Zmc2V0IH0gPSBpbmZvO1xuICBjb25zdCBiZWZvcmUgPSBub2RlLnRleHRDb250ZW50LnNsaWNlKDAsIG9mZnNldCk7XG4gIC8vIERldGVjdCBgdGV4dGAgcGF0dGVybiBlbmRpbmcgYXQgY3Vyc29yXG4gIGNvbnN0IG0gPSBiZWZvcmUubWF0Y2goL2AoW15gXFxuXSspYCQvKTtcbiAgaWYgKCFtKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgaWR4ID0gbS5pbmRleDtcbiAgY29uc3QgaW5uZXIgPSBtWzFdO1xuICBjb25zdCBiZWZvcmUyID0gbm9kZS50ZXh0Q29udGVudC5zbGljZSgwLCBpZHgpO1xuICBjb25zdCBhZnRlciA9IG5vZGUudGV4dENvbnRlbnQuc2xpY2UoaWR4ICsgbVswXS5sZW5ndGgpO1xuXG4gIG5vZGUudGV4dENvbnRlbnQgPSBiZWZvcmUyO1xuICBjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuICBjb2RlLnRleHRDb250ZW50ID0gaW5uZXI7XG4gIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29kZSwgbm9kZS5uZXh0U2libGluZyk7XG4gIGNvbnN0IGFmdGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFmdGVyIHx8ICdcXHUyMDBCJyk7XG4gIGNvZGUuYWZ0ZXIoYWZ0ZXJOb2RlKTtcblxuICBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgci5zZXRTdGFydChhZnRlck5vZGUsIDApO1xuICByLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKUgOKUgCBMaXN0IGtleSBoYW5kbGluZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUxpc3RLZXkoZSkge1xuICBjb25zdCBsaSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8uZ2V0UmFuZ2VBdCgwKT8uc3RhcnRDb250YWluZXI/LnBhcmVudEVsZW1lbnQ/LmNsb3Nlc3QoJ2xpJyk7XG4gIGlmICghbGkpIHJldHVybiBmYWxzZTtcblxuICBpZiAoZS5rZXkgPT09ICdUYWInKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGUuc2hpZnRLZXkgPyAnb3V0ZGVudCcgOiAnaW5kZW50Jyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgbGkudGV4dENvbnRlbnQudHJpbSgpID09PSAnJykge1xuICAgIC8vIENoZWNrIGlmIHRydWx5IGF0IHRvcCBsZXZlbDogcGFyZW50IGlzIFVML09MIHdob3NlIHBhcmVudCBpcyBOT1QgYW4gTElcbiAgICBjb25zdCBsaXN0RWwgPSBsaS5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGlzVG9wTGV2ZWwgPSBsaXN0RWwgJiYgKGxpc3RFbC50YWdOYW1lID09PSAnVUwnIHx8IGxpc3RFbC50YWdOYW1lID09PSAnT0wnKVxuICAgICAgJiYgbGlzdEVsLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgIT09ICdMSSc7XG4gICAgaWYgKGlzVG9wTGV2ZWwpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ1AnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIWlzVG9wTGV2ZWwpIHtcbiAgICAgIC8vIE5lc3RlZCBlbXB0eSBpdGVtIOKAlCBqdXN0IGRlaW5kZW50XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGUua2V5ID09PSAnQmFja3NwYWNlJyAmJiBsaS50ZXh0Q29udGVudC50cmltKCkgPT09ICcnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIOKUgOKUgCBDb2RlIGJsb2NrIHRhYiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gaGFuZGxlQ29kZVRhYihlLCBlbCkge1xuICBpZiAoIWVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2RlJykpIHJldHVybiBmYWxzZTtcbiAgaWYgKGUua2V5ICE9PSAnVGFiJykgcmV0dXJuIGZhbHNlO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsICcgICcpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8g4pSA4pSAIE1haW4ga2V5ZG93biBkaXNwYXRjaGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gQ2FsbCBmcm9tIGJsb2NrJ3Mgb25LZXlEb3duLiBSZXR1cm5zIHRydWUgaWYgaGFuZGxlZC5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQmxvY2tLZXlEb3duKGUsIGVsKSB7XG4gIGNvbnN0IG1vZCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG5cbiAgLy8gRXhwbGljaXQgZm9ybWF0IHNob3J0Y3V0cyAoYmVsdC1hbmQtc3VzcGVuZGVycyBhbG9uZ3NpZGUgbmF0aXZlIGhhbmRsaW5nKVxuICBpZiAobW9kICYmICFlLnNoaWZ0S2V5ICYmICFlLmFsdEtleSkge1xuICAgIGlmIChlLmtleSA9PT0gJ2InKSB7IGUucHJldmVudERlZmF1bHQoKTsgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2JvbGQnKTsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoZS5rZXkgPT09ICdpJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnKTsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoZS5rZXkgPT09ICd1JykgeyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnKTsgcmV0dXJuIHRydWU7IH1cbiAgfVxuXG4gIGlmIChoYW5kbGVDb2RlVGFiKGUsIGVsKSkgcmV0dXJuIHRydWU7XG4gIGlmIChoYW5kbGVMaXN0S2V5KGUpKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBCYWNrdGljayDihpIgaW5saW5lIGNvZGUgKGNoZWNrIGFmdGVyIGNoYXIgaXMgaW5zZXJ0ZWQpXG4gIGlmIChlLmtleSA9PT0gJ2AnKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBoYW5kbGVJbmxpbmVDb2RlKGVsKSwgMCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLAogICAgIi8vIERlbHRhLWJhc2VkIHVuZG8vcmVkbyDigJQgc3RvcmVzIG9ubHkgd2hhdCBjaGFuZ2VkXG5jb25zdCBzdGFja3MgPSBuZXcgTWFwKCk7XG5cbmZ1bmN0aW9uIGdldChwYWdlSWQpIHtcbiAgaWYgKCFzdGFja3MuaGFzKHBhZ2VJZCkpIHN0YWNrcy5zZXQocGFnZUlkLCB7IHBhc3Q6IFtdLCBmdXR1cmU6IFtdIH0pO1xuICByZXR1cm4gc3RhY2tzLmdldChwYWdlSWQpO1xufVxuXG4vLyBQdXNoIGEgZGVsdGEgb250byB0aGUgdW5kbyBzdGFjay5cbi8vIERlbHRhczogeyB0eXBlOiAnbW92ZScsIG1vdmVzOiBbeyBpZCwgeCwgeSB9XSB9XG4vLyAgICAgICAgIHsgdHlwZTogJ3Jlc2l6ZScsIGlkLCB3LCAoeCwgeSk/IH1cbi8vICAgICAgICAgeyB0eXBlOiAnaHRtbCcsIGlkLCBodG1sIH1cbi8vICAgICAgICAgeyB0eXBlOiAnYWRkJywgYmxvY2sgfSAgICAgICAg4oCUIGEgYmxvY2sgd2FzIGFkZGVkICh1bmRvID0gcmVtb3ZlIGl0KVxuLy8gICAgICAgICB7IHR5cGU6ICdkZWxldGUnLCBibG9ja3MgfSAgICDigJQgYmxvY2tzIHdlcmUgZGVsZXRlZCAodW5kbyA9IHJlLWFkZCB0aGVtKVxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hVbmRvKHBhZ2VJZCwgZGVsdGEpIHtcbiAgY29uc3QgcyA9IGdldChwYWdlSWQpO1xuICBzLnBhc3QucHVzaChkZWx0YSk7XG4gIHMuZnV0dXJlID0gW107XG4gIGlmIChzLnBhc3QubGVuZ3RoID4gMjAwKSBzLnBhc3Quc2hpZnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VW5kbyhwYWdlSWQsIHBhZ2UpIHtcbiAgY29uc3QgcyA9IGdldChwYWdlSWQpO1xuICBpZiAoIXMucGFzdC5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZGVsdGEgPSBzLnBhc3QucG9wKCk7XG4gIGNvbnN0IHJldmVyc2UgPSBhcHBseShwYWdlLCBkZWx0YSk7XG4gIGlmIChyZXZlcnNlKSBzLmZ1dHVyZS5wdXNoKHJldmVyc2UpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UmVkbyhwYWdlSWQsIHBhZ2UpIHtcbiAgY29uc3QgcyA9IGdldChwYWdlSWQpO1xuICBpZiAoIXMuZnV0dXJlLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBkZWx0YSA9IHMuZnV0dXJlLnBvcCgpO1xuICBjb25zdCByZXZlcnNlID0gYXBwbHkocGFnZSwgZGVsdGEpO1xuICBpZiAocmV2ZXJzZSkgcy5wYXN0LnB1c2gocmV2ZXJzZSk7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBBcHBseSBhIGRlbHRhIHRvIHBhZ2UuYmxvY2tzLCByZXR1cm4gdGhlIHJldmVyc2UgZGVsdGFcbmZ1bmN0aW9uIGFwcGx5KHBhZ2UsIGRlbHRhKSB7XG4gIGNvbnN0IGJsb2NrcyA9IHBhZ2UuYmxvY2tzO1xuXG4gIGlmIChkZWx0YS50eXBlID09PSAnbW92ZScpIHtcbiAgICBjb25zdCByZXYgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG0gb2YgZGVsdGEubW92ZXMpIHtcbiAgICAgIGNvbnN0IGIgPSBibG9ja3MuZmluZChiID0+IGIuaWQgPT09IG0uaWQpO1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgcmV2LnB1c2goeyBpZDogYi5pZCwgeDogYi54LCB5OiBiLnkgfSk7XG4gICAgICAgIGIueCA9IG0ueDtcbiAgICAgICAgYi55ID0gbS55O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB0eXBlOiAnbW92ZScsIG1vdmVzOiByZXYgfTtcbiAgfVxuXG4gIGlmIChkZWx0YS50eXBlID09PSAncmVzaXplJykge1xuICAgIGNvbnN0IGIgPSBibG9ja3MuZmluZChiID0+IGIuaWQgPT09IGRlbHRhLmlkKTtcbiAgICBpZiAoIWIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJldiA9IHsgdHlwZTogJ3Jlc2l6ZScsIGlkOiBiLmlkLCB3OiBiLncgfTtcbiAgICBpZiAoZGVsdGEueCAhPSBudWxsKSB7IHJldi54ID0gYi54OyByZXYueSA9IGIueTsgYi54ID0gZGVsdGEueDsgYi55ID0gZGVsdGEueTsgfVxuICAgIGIudyA9IGRlbHRhLnc7XG4gICAgcmV0dXJuIHJldjtcbiAgfVxuXG4gIGlmIChkZWx0YS50eXBlID09PSAnaHRtbCcpIHtcbiAgICBjb25zdCBiID0gYmxvY2tzLmZpbmQoYiA9PiBiLmlkID09PSBkZWx0YS5pZCk7XG4gICAgaWYgKCFiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCByZXYgPSB7IHR5cGU6ICdodG1sJywgaWQ6IGIuaWQsIGh0bWw6IGIuaHRtbCB9O1xuICAgIGIuaHRtbCA9IGRlbHRhLmh0bWw7XG4gICAgcmV0dXJuIHJldjtcbiAgfVxuXG4gIGlmIChkZWx0YS50eXBlID09PSAnYWRkJykge1xuICAgIC8vIEEgYmxvY2sgd2FzIGFkZGVkIOKAlCB1bmRvIGJ5IHJlbW92aW5nIGl0XG4gICAgY29uc3QgcmV2ID0geyB0eXBlOiAnZGVsZXRlJywgYmxvY2tzOiBbYmxvY2tzLmZpbmQoYiA9PiBiLmlkID09PSBkZWx0YS5pZCldLmZpbHRlcihCb29sZWFuKSB9O1xuICAgIHBhZ2UuYmxvY2tzID0gYmxvY2tzLmZpbHRlcihiID0+IGIuaWQgIT09IGRlbHRhLmlkKTtcbiAgICByZXR1cm4gcmV2LmJsb2Nrcy5sZW5ndGggPyByZXYgOiBudWxsO1xuICB9XG5cbiAgaWYgKGRlbHRhLnR5cGUgPT09ICdkZWxldGUnKSB7XG4gICAgLy8gQmxvY2tzIHdlcmUgZGVsZXRlZCDigJQgdW5kbyBieSByZS1hZGRpbmcgdGhlbVxuICAgIGNvbnN0IGlkcyA9IGRlbHRhLmJsb2Nrcy5tYXAoYiA9PiBiLmlkKTtcbiAgICBwYWdlLmJsb2NrcyA9IFsuLi5ibG9ja3MsIC4uLmRlbHRhLmJsb2Nrc107XG4gICAgcmV0dXJuIHsgdHlwZTogJ2RlbGV0ZUZvcndhcmQnLCBpZHMgfTtcbiAgfVxuXG4gIGlmIChkZWx0YS50eXBlID09PSAnZGVsZXRlRm9yd2FyZCcpIHtcbiAgICAvLyBSZWRvIG9mIGRlbGV0ZVxuICAgIGNvbnN0IHJlbW92ZWQgPSBibG9ja3MuZmlsdGVyKGIgPT4gZGVsdGEuaWRzLmluY2x1ZGVzKGIuaWQpKTtcbiAgICBwYWdlLmJsb2NrcyA9IGJsb2Nrcy5maWx0ZXIoYiA9PiAhZGVsdGEuaWRzLmluY2x1ZGVzKGIuaWQpKTtcbiAgICByZXR1cm4geyB0eXBlOiAnZGVsZXRlJywgYmxvY2tzOiByZW1vdmVkIH07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIKICBdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7QUFBOEgsU0FBUyxDQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxTQUFRLE1BQUs7QUFBQSxJQUFFLEdBQUUsTUFBRyxHQUFFO0FBQUEsRUFBRyxPQUFPO0FBQUE7QUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxNQUFHLEdBQUUsY0FBWSxHQUFFLFdBQVcsWUFBWSxFQUFDO0FBQUE7QUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFBLEVBQUMsSUFBSSxJQUFFLElBQUUsSUFBRSxLQUFFLENBQUM7QUFBQSxFQUFFLEtBQUksTUFBSztBQUFBLElBQVMsTUFBUCxRQUFTLEtBQUUsR0FBRSxNQUFVLE1BQVAsUUFBUyxLQUFFLEdBQUUsTUFBRyxHQUFFLE1BQUcsR0FBRTtBQUFBLEVBQUcsSUFBRyxVQUFVLFNBQU8sTUFBSSxHQUFFLFdBQVMsVUFBVSxTQUFPLElBQUUsRUFBRSxLQUFLLFdBQVUsQ0FBQyxJQUFFLEtBQWUsT0FBTyxNQUFuQixjQUE0QixHQUFFLGdCQUFSO0FBQUEsSUFBcUIsS0FBSSxNQUFLLEdBQUU7QUFBQSxNQUFzQixHQUFFLFFBQU4sY0FBVyxHQUFFLE1BQUcsR0FBRSxhQUFhO0FBQUEsRUFBSSxPQUFPLEVBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFJO0FBQUE7QUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUU7QUFBQSxFQUFDLElBQUksS0FBRSxFQUFDLE1BQUssSUFBRSxPQUFNLElBQUUsS0FBSSxJQUFFLEtBQUksSUFBRSxLQUFJLE1BQUssSUFBRyxNQUFLLEtBQUksR0FBRSxLQUFJLE1BQUssS0FBSSxNQUFLLGFBQWlCLFdBQUUsS0FBVSxNQUFOLE9BQVEsRUFBRSxJQUFFLElBQUUsS0FBSSxJQUFHLEtBQUksRUFBQztBQUFBLEVBQUUsT0FBYSxNQUFOLFFBQWUsRUFBRSxTQUFSLFFBQWUsRUFBRSxNQUFNLEVBQUMsR0FBRTtBQUFBO0FBQW9DLFNBQVMsQ0FBQyxDQUFDLElBQUU7QUFBQSxFQUFDLE9BQU8sR0FBRTtBQUFBO0FBQVMsU0FBUyxDQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxLQUFLLFFBQU0sSUFBRSxLQUFLLFVBQVE7QUFBQTtBQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUUsSUFBRTtBQUFBLEVBQUMsSUFBUyxNQUFOO0FBQUEsSUFBUSxPQUFPLEdBQUUsS0FBRyxFQUFFLEdBQUUsSUFBRyxHQUFFLE1BQUksQ0FBQyxJQUFFO0FBQUEsRUFBSyxTQUFRLEdBQUUsS0FBRSxHQUFFLElBQUksUUFBTztBQUFBLElBQUksS0FBVSxLQUFFLEdBQUUsSUFBSSxRQUFmLFFBQTBCLEdBQUUsT0FBUjtBQUFBLE1BQVksT0FBTyxHQUFFO0FBQUEsRUFBSSxPQUFrQixPQUFPLEdBQUUsUUFBckIsYUFBMEIsRUFBRSxFQUFDLElBQUU7QUFBQTtBQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUU7QUFBQSxFQUFDLElBQUcsR0FBRSxPQUFLLEdBQUUsS0FBSTtBQUFBLElBQUMsSUFBSSxLQUFFLEdBQUUsS0FBSSxLQUFFLEdBQUUsS0FBSSxLQUFFLENBQUMsR0FBRSxLQUFFLENBQUMsR0FBRSxLQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUM7QUFBQSxJQUFFLEdBQUUsTUFBSSxHQUFFLE1BQUksR0FBRSxFQUFFLFNBQU8sRUFBRSxNQUFNLEVBQUMsR0FBRSxFQUFFLEdBQUUsS0FBSSxJQUFFLElBQUUsR0FBRSxLQUFJLEdBQUUsSUFBSSxjQUFhLEtBQUcsR0FBRSxNQUFJLENBQUMsRUFBQyxJQUFFLE1BQUssSUFBUSxNQUFOLE9BQVEsRUFBRSxFQUFDLElBQUUsSUFBRSxDQUFDLEVBQUUsS0FBRyxHQUFFLE1BQUssRUFBQyxHQUFFLEdBQUUsTUFBSSxHQUFFLEtBQUksR0FBRSxHQUFHLElBQUksR0FBRSxPQUFLLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBQyxHQUFFLEdBQUUsTUFBSSxHQUFFLEtBQUcsTUFBSyxHQUFFLE9BQUssTUFBRyxFQUFFLEVBQUM7QUFBQSxFQUFDO0FBQUE7QUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxLQUFVLEtBQUUsR0FBRSxPQUFYLFFBQXNCLEdBQUUsT0FBUjtBQUFBLElBQVksT0FBTyxHQUFFLE1BQUksR0FBRSxJQUFJLE9BQUssTUFBSyxHQUFFLElBQUksS0FBSyxRQUFRLENBQUMsSUFBRTtBQUFBLE1BQUMsSUFBUyxNQUFOLFFBQWUsR0FBRSxPQUFSO0FBQUEsUUFBWSxPQUFPLEdBQUUsTUFBSSxHQUFFLElBQUksT0FBSyxHQUFFO0FBQUEsS0FBSSxHQUFFLEVBQUUsRUFBQztBQUFBO0FBQUUsU0FBUyxDQUFDLENBQUMsSUFBRTtBQUFBLEdBQUUsQ0FBQyxHQUFFLFFBQU0sR0FBRSxNQUFJLFNBQUssRUFBRSxLQUFLLEVBQUMsS0FBRyxDQUFDLEVBQUUsU0FBTyxLQUFHLEVBQUUsd0JBQXNCLElBQUUsRUFBRSxzQkFBb0IsR0FBRyxDQUFDO0FBQUE7QUFBRSxTQUFTLENBQUMsR0FBRTtBQUFBLEVBQUMsU0FBUSxJQUFFLEtBQUUsRUFBRSxFQUFFO0FBQUEsSUFBUSxFQUFFLFNBQU8sTUFBRyxFQUFFLEtBQUssQ0FBQyxHQUFFLEtBQUUsRUFBRSxNQUFNLEdBQUUsS0FBRSxFQUFFLFFB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O0FBQUEsUUFBTSxPQUFNLElBQUU7QUFBQSxRQUFDLElBQUcsR0FBRSxNQUFJLE1BQUssTUFBUyxNQUFOO0FBQUEsVUFBUSxJQUFHLEdBQUUsTUFBSztBQUFBLFlBQUMsS0FBSSxHQUFFLE9BQUssS0FBRSxNQUFJLElBQUksTUFBTSxHQUFFLFlBQUwsS0FBZSxHQUFFO0FBQUEsY0FBYSxLQUFFLEdBQUU7QUFBQSxZQUFZLEdBQUUsR0FBRSxRQUFRLEVBQUMsS0FBRyxNQUFLLEdBQUUsTUFBSTtBQUFBLFVBQUMsRUFBSztBQUFBLFlBQUMsS0FBSSxJQUFFLEdBQUUsT0FBTztBQUFBLGNBQUssRUFBRSxHQUFFLEVBQUU7QUFBQSxZQUFFLEVBQUUsRUFBQztBQUFBO0FBQUEsUUFBTztBQUFBLGFBQUUsTUFBSSxHQUFFLEtBQUksR0FBRSxNQUFJLEdBQUUsS0FBSSxHQUFFLFFBQU0sRUFBRSxFQUFDO0FBQUEsUUFBRSxFQUFFLElBQUksSUFBRSxJQUFFLEVBQUM7QUFBQTtBQUFBLElBQU87QUFBQSxNQUFNLE1BQU4sUUFBUyxHQUFFLE9BQUssR0FBRSxPQUFLLEdBQUUsTUFBSSxHQUFFLEtBQUksR0FBRSxNQUFJLEdBQUUsT0FBSyxLQUFFLEdBQUUsTUFBSSxFQUFFLEdBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEVBQUM7QUFBQSxFQUFFLFFBQU8sS0FBRSxFQUFFLFdBQVMsR0FBRSxFQUFDLEdBQUUsTUFBSSxHQUFFLE1BQVMsWUFBRTtBQUFBO0FBQUUsU0FBUyxDQUFDLENBQUMsSUFBRTtBQUFBLEVBQUMsT0FBSSxHQUFFLFFBQU0sR0FBRSxJQUFJLE1BQUksT0FBSSxHQUFFLE9BQUssR0FBRSxJQUFJLEtBQUssQ0FBQztBQUFBO0FBQUcsU0FBUyxDQUFDLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBQSxFQUFDLFNBQVEsS0FBRSxFQUFFLEtBQUUsR0FBRSxRQUFPO0FBQUEsSUFBSSxFQUFFLEdBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsR0FBRTtBQUFB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R0FBRSxFQUFFLElBQUk7QUFBQSxLQUFJLEVBQUUsVUFBVSxjQUFZLFFBQVEsQ0FBQyxJQUFFO0FBQUEsSUFBQyxLQUFLLFFBQU0sS0FBSyxNQUFJLE1BQUcsTUFBRyxLQUFLLElBQUksS0FBSyxFQUFDLEdBQUUsRUFBRSxJQUFJO0FBQUEsS0FBSSxFQUFFLFVBQVUsU0FBTyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQWMsT0FBTyxXQUFuQixhQUEyQixRQUFRLFVBQVUsS0FBSyxLQUFLLFFBQVEsUUFBUSxDQUFDLElBQUUsWUFBVyxJQUFFLFFBQVEsQ0FBQyxJQUFFLElBQUU7QUFBQSxJQUFDLE9BQU8sR0FBRSxJQUFJLE1BQUksR0FBRSxJQUFJO0FBQUEsS0FBSyxFQUFFLE1BQUksR0FBRSxJQUFFLCtCQUE4QixJQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxHQUFFLElBQUU7QUFBQTs7O0FDQWgyVixTQUFTLEVBQUMsQ0FBQyxJQUFFLElBQUU7QUFBQSxFQUFDLEdBQUUsT0FBSyxHQUFFLElBQUksSUFBRSxJQUFFLE1BQUcsRUFBQyxHQUFFLEtBQUU7QUFBQSxFQUFFLElBQUksS0FBRSxHQUFFLFFBQU0sR0FBRSxNQUFJLEVBQUMsSUFBRyxDQUFDLEdBQUUsS0FBSSxDQUFDLEVBQUM7QUFBQSxFQUFHLE9BQU8sTUFBRyxHQUFFLEdBQUcsVUFBUSxHQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRSxHQUFFLEdBQUc7QUFBQTtBQUFHLFNBQVMsRUFBQyxDQUFDLElBQUU7QUFBQSxFQUFDLE9BQU8sS0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFDO0FBQUE7QUFBRSxTQUFTLEVBQUMsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFBLEVBQUMsSUFBSSxLQUFFLEdBQUUsTUFBSSxDQUFDO0FBQUEsRUFBRSxJQUFHLEdBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxRQUFNLEdBQUUsS0FBRyxDQUFDLEtBQUUsR0FBRSxFQUFDLElBQUUsR0FBTyxXQUFFLEVBQUMsR0FBRSxRQUFRLENBQUMsSUFBRTtBQUFBLElBQUMsSUFBSSxLQUFFLEdBQUUsTUFBSSxHQUFFLElBQUksS0FBRyxHQUFFLEdBQUcsSUFBRyxLQUFFLEdBQUUsRUFBRSxJQUFFLEVBQUM7QUFBQSxJQUFFLE9BQUksT0FBSSxHQUFFLE1BQUksQ0FBQyxJQUFFLEdBQUUsR0FBRyxFQUFFLEdBQUUsR0FBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDO0FBQUEsR0FBRyxHQUFFLEdBQUUsTUFBSSxJQUFFLENBQUMsR0FBRSxNQUFLO0FBQUEsSUFBQyxJQUFJLEtBQUUsUUFBUSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUEsTUFBQyxJQUFHLENBQUMsR0FBRSxJQUFJO0FBQUEsUUFBSSxPQUFNO0FBQUEsTUFBRyxJQUFJLEtBQUUsR0FBRSxJQUFJLElBQUksR0FBRyxPQUFPLFFBQVEsQ0FBQyxJQUFFO0FBQUEsUUFBQyxPQUFPLEdBQUU7QUFBQSxPQUFJO0FBQUEsTUFBRSxJQUFHLEdBQUUsTUFBTSxRQUFRLENBQUMsSUFBRTtBQUFBLFFBQUMsT0FBTSxDQUFDLEdBQUU7QUFBQSxPQUFJO0FBQUEsUUFBRSxPQUFNLENBQUMsTUFBRyxHQUFFLEtBQUssTUFBSyxJQUFFLElBQUUsRUFBQztBQUFBLE1BQUUsSUFBSSxLQUFFLEdBQUUsSUFBSSxVQUFRO0FBQUEsTUFBRSxPQUFPLEdBQUUsS0FBSyxRQUFRLENBQUMsSUFBRTtBQUFBLFFBQUMsSUFBRyxHQUFFLEtBQUk7QUFBQSxVQUFDLElBQUksS0FBRSxHQUFFLEdBQUc7QUFBQSxVQUFHLEdBQUUsS0FBRyxHQUFFLEtBQUksR0FBRSxNQUFTLFdBQUUsT0FBSSxHQUFFLEdBQUcsT0FBSyxLQUFFO0FBQUEsUUFBRztBQUFBLE9BQUUsR0FBRSxNQUFHLEdBQUUsS0FBSyxNQUFLLElBQUUsSUFBRSxFQUFDLEtBQUc7QUFBQTtBQUFBLElBQUcsR0FBRSxNQUFJO0FBQUEsSUFBRyxNQUFRLHVCQUFKLElBQThCLHFCQUFKLE9BQUU7QUFBQSxJQUFzQixHQUFFLHNCQUFvQixRQUFRLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBQSxNQUFDLElBQUcsS0FBSyxLQUFJO0FBQUEsUUFBQyxJQUFJLEtBQUU7QUFBQSxRQUFFLEtBQU8sV0FBRSxHQUFFLElBQUUsSUFBRSxFQUFDLEdBQUUsS0FBRTtBQUFBLE1BQUM7QUFBQSxNQUFDLE1BQUcsR0FBRSxLQUFLLE1BQUssSUFBRSxJQUFFLEVBQUM7QUFBQSxPQUFHLEdBQUUsd0JBQXNCO0FBQUEsRUFBQztBQUFBLEVBQUMsT0FBTyxHQUFFLE9BQUssR0FBRTtBQUFBO0FBQUcsU0FBUyxFQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxJQUFJLEtBQUUsR0FBRSxNQUFJLENBQUM7QUFBQSxFQUFFLENBQUMsR0FBRSxPQUFLLEdBQUUsR0FBRSxLQUFJLEVBQUMsTUFBSSxHQUFFLEtBQUcsSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLElBQUksSUFBSSxLQUFLLEVBQUM7QUFBQTtBQUFtRixTQUFTLEVBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxPQUFPLEtBQUUsR0FBRSxHQUFFLFFBQVEsR0FBRTtBQUFBLElBQUMsT0FBTSxFQUFDLFNBQVEsR0FBQztBQUFBLEtBQUcsQ0FBQyxDQUFDO0FBQUE7QUFBdU4sU0FBUyxFQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxJQUFJLEtBQUUsR0FBRSxNQUFJLENBQUM7QUFBQSxFQUFFLE9BQU8sR0FBRSxHQUFFLEtBQUksRUFBQyxNQUFJLEdBQUUsS0FBRyxHQUFFLEdBQUUsR0FBRSxNQUFJLElBQUUsR0FBRSxNQUFJLEtBQUcsR0FBRTtBQUFBO0FBQUcsU0FBUyxFQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxPQUFPLEtBQUUsR0FBRSxHQUFFLFFBQVEsR0FBRTtBQUFBLElBQUMsT0FBTztBQUFBLEtBQUcsRUFBQztBQUFBO0FBQUUsU0FBUyxFQUFDLENBQUMsSUFBRTtBQUFBLEVBQUMsSUFBSSxLQUFFLEdBQUUsUUFBUSxHQUFFLE1BQUssS0FBRSxHQUFFLE1BQUksQ0FBQztBQUFBLEVBQUUsT0FBTyxHQUFFLElB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Q0FBQyxHQUFFLEtBQUUsS0FBSSxLQUFFO0FBQUEsS0FBRyxHQUFFLFNBQU8sUUFBUSxDQUFDLElBQUU7QUFBQSxJQUFDLE1BQUcsR0FBRSxFQUFDO0FBQUEsSUFBRSxJQUFJLEtBQUUsR0FBRTtBQUFBLElBQUksTUFBRyxHQUFFLFFBQU0sR0FBRSxJQUFJLElBQUksV0FBYSxHQUFFLEtBQUssRUFBQyxNQUFaLEtBQWUsT0FBSSxHQUFFLDJCQUF5QixLQUFFLEdBQUUsMEJBQXdCLElBQUcsRUFBQyxJQUFHLEdBQUUsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLElBQUU7QUFBQSxNQUFDLEdBQUUsTUFBSSxHQUFFLE1BQUksR0FBRSxJQUFHLEdBQUUsSUFBTztBQUFBLEtBQUUsSUFBRyxLQUFFLEtBQUU7QUFBQSxLQUFNLEdBQUUsTUFBSSxRQUFRLENBQUMsSUFBRSxJQUFFO0FBQUEsSUFBQyxHQUFFLEtBQUssUUFBUSxDQUFDLElBQUU7QUFBQSxNQUFDLElBQUc7QUFBQSxRQUFDLEdBQUUsSUFBSSxLQUFLLEVBQUMsR0FBRSxHQUFFLE1BQUksR0FBRSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUU7QUFBQSxVQUFDLE9BQU0sQ0FBQyxHQUFFLE1BQUksR0FBRSxFQUFDO0FBQUEsU0FBRTtBQUFBLFFBQUUsT0FBTSxJQUFFO0FBQUEsUUFBQyxHQUFFLEtBQUssUUFBUSxDQUFDLElBQUU7QUFBQSxVQUFDLEdBQUUsUUFBTSxHQUFFLE1BQUksQ0FBQztBQUFBLFNBQUcsR0FBRSxLQUFFLENBQUMsR0FBRSxHQUFFLElBQUksSUFBRSxHQUFFLEdBQUc7QUFBQTtBQUFBLEtBQUcsR0FBRSxNQUFHLEdBQUUsSUFBRSxFQUFDO0FBQUEsS0FBRyxHQUFFLFVBQVEsUUFBUSxDQUFDLElBQUU7QUFBQSxJQUFDLE1BQUcsR0FBRSxFQUFDO0FBQUEsSUFBRSxJQUFJLElBQUUsS0FBRSxHQUFFO0FBQUEsSUFBSSxNQUFHLEdBQUUsUUFBTSxHQUFFLElBQUksR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFFO0FBQUEsTUFBQyxJ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QUFDO0FBQUE7QUFBRSxTQUFTLEVBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxTQUFRLEtBQUUsR0FBRSxFQUFXLE9BQUosV0FBTSxLQUFFLEdBQUU7QUFBQSxJQUFFLElBQUcsR0FBRSxFQUFFLE1BQUksR0FBRSxLQUFHLENBQUMsR0FBRSxFQUFFLEVBQUUsS0FBRyxHQUFFLEVBQUUsTUFBSSxHQUFFO0FBQUEsTUFBRSxPQUFNO0FBQUEsRUFBRyxPQUFNO0FBQUE7QUFBRyxTQUFTLEVBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxTQUFRLEtBQUUsR0FBRSxFQUFXLE9BQUosV0FBTSxLQUFFLEdBQUUsR0FBRTtBQUFBLElBQUMsSUFBSSxLQUFFLEdBQUUsRUFBRTtBQUFBLElBQUUsSUFBWSxPQUFKO0FBQUEsTUFBTSxHQUFFLElBQUU7QUFBQSxJQUFFLEdBQUUsRUFBRSxJQUFFO0FBQUEsSUFBRSxHQUFFLElBQUU7QUFBQSxJQUFHLElBQVksR0FBRSxNQUFOLFdBQVE7QUFBQSxNQUFDLEdBQUUsSUFBRTtBQUFBLE1BQUU7QUFBQSxJQUFLO0FBQUEsRUFBQztBQUFBO0FBQUUsU0FBUyxFQUFDLENBQUMsSUFBRTtBQUFBLEVBQUMsSUFBSSxLQUFFLEdBQUUsR0FBRSxLQUFPO0FBQUEsRUFBRSxPQUFlLE9BQUosV0FBTTtBQUFBLElBQUMsSUFBSSxLQUFFLEdBQUU7QUFBQSxJQUFFLElBQVEsR0FBRSxNQUFQLElBQVM7QUFBQSxNQUFDLEdBQUUsRUFBRSxFQUFFLEVBQUM7QUFBQSxNQUFFLElBQVksT0FBSjtBQUFBLFFBQU0sR0FBRSxJQUFFLEdBQUU7QUFBQSxNQUFFLElBQVksR0FBRSxNQUFOO0FBQUEsUUFBUSxHQUFFLEVBQUUsSUFBRTtBQUFBLElBQUMsRUFBTTtBQUFBLFdBQUU7QUFBQSxJQUFFLEdBQUUsRUFBRSxJQUFFLEdBQUU7QUFBQSxJQUFFLElBQVksR0FBRSxNQUFOO0FBQUEsTUFBUSxHQUFFLElBQU87QUFBQSxJQUFFLEtBQUU7QUFBQSxFQUFDO0FBQUEsRUFBQyxHQUFFLElBQUU7QUFBQTtBQUFFLFNBQVMsRUFBQyxDQUFDLElBQUUsSUFBRTtBQUFBLEVBQUMsR0FBRSxLQUFLLE1BQVUsU0FBQztBQUFBLEVBQUUsS0FBSyxJQUFFO0FBQUEsRUFBRSxLQUFLLElBQU87QUFBQSxFQUFFLEtBQUssSUFBRSxLQUFFO0FBQUEsRUFBRSxLQUFLLElBQUU7QUFBQSxFQUFFLEtBQUssSUFBUSxNQUFOLE9BQWEsWUFBRSxHQUFFO0FBQUEsRUFBUSxLQUFLLElBQVEsTUFBTixPQUFhLFlBQUUsR0FBRTtBQUFBLEVBQVUsS0FBSyxPQUFXLE1BQU4sT0FBYSxZQUFFLEdBQUU7QUFBQTtBQUEyN0IsU0FBUyxDQUFDLENBQUMsSUFBRSxJQUFFO0FBQUEsRUFBQyxPQUFPLElBQUksR0FBRSxJQUFFLEVBQUM7QUFBQTtBQUFFLFNBQVMsRUFBQyxDQUFDLElBQUU7QUFBQSxFQUFDLElBQUksS0FBRSxHQUFFO0FBQUEsRUFBRSxHQUFFLElBQU87QUFBQSxFQUFFLElBQWUsT0FBTyxNQUFuQixZQUFxQjtBQUFBLElBQUM7QUFBQSxJQUFJLElBQUksS0FBRTtBQUFBLElBQUUsS0FBTztBQUFBLElBQUUsSUFBRztBQUFBLE1BQUMsR0FBRTtBQUFBLE1BQUUsT0FBTSxJQUFFO0FBQUEsTUFBQyxHQUFFLEtBQUc7QUFBQSxNQUFHLEdBQUUsS0FBRztBQUFBLE1BQUUsR0FBRSxFQUFDO0FBQUEsTUFBRSxNQUFNO0FBQUEsY0FBRTtBQUFBLE1BQVEsS0FBRTtBQUFBLE1BQUUsR0FBRTtBQUFBO0FBQUEsRUFBRTtBQUFBO0FBQUUsU0FBUyxFQUFDLENBQUMsSUFBRTtBQUFBLEVBQUMsU0FBUSxLQUFFLEdBQUUsRUFBVyxPQUFKLFdBQU0sS0FBRSxHQUFFO0FBQUEsSUFBRSxHQUFFLEVBQUUsRUFBRSxFQUFDO0FBQUEsRUFBRSxHQUFFLElBQU87QUFBQSxFQUFFLEdBQUUsSUFBTztBQUFBLEVBQUUsR0FBRSxFQUFDO0FBQUE7QUFBRSxTQUFTLEVBQUMsQ0FBQyxJQUFFO0FBQUEsRUFBQyxJQUFHLE9BQUk7QUFBQSxJQUFLLE1BQU0sSUFBSSxNQUFNLHFCQUFxQjtBQUFBLEVBQUUsR0FBRSxJQUFJO0FBQUEsRUFBRSxLQUFFO0FBQUEsRUFBRSxLQUFLLEtBQUc7QUFBQSxFQUFHLElBQUcsSUFBRSxLQUFLO0FBQUEsSUFBRSxHQUFFLElBQUk7QUFBQSxFQUFFLEdBQUU7QUFBQTtBQUFFLFNBQVMsRUFBQyxDQUFDLElBQUUsSUFBRTtBQUFBLEVBQUMsS0FBSyxJQUFFO0FBQUEsRUFBRSxLQUFLLElBQU87QUFBQSxFQUFFLEtBQUssSUFBTztBQUFBLEVBQUUsS0FBSyxJQUFPO0FBQUEsRUFBRSxLQUFLLElBQUU7QUFBQSxFQUFHLEtBQUssT0FBVyxNQUFOLE9BQWEsWUFBRSxHQUFFO0FBQUEsRUFBSyxJQUFHO0FBQUEsSUFBRSxHQUFFLEtBQUssSUFBSTtBQUFBO0FBQXdkLFNBQVMsRUFBQyxDQUFDLElBQUUsSUFBRTtBQUFBLEVBQUMsSUFBSSxLQUFFLElBQUksR0FBRSxJQUFFLEVBQUM7QUFBQSxFQUFFLElBQUc7QUFBQSxJQUFDLEdBQUUsRUFBRTtBQUFBLElBQUUsT0FBTSxJQUFFO0FBQUEsSUFBQyxHQUFFLEVBQUU7QUFBQSxJQUFFLE1BQU07QUFBQTtBQUFBLEVBQUUsSUFBSSxLQUFFLEdBQUUsRUFBRSxLQUFLLEVBQUM7QUFBQSxFQUFFLEdBQUUsT0FBTyxXQUFTO0FBQUEsRUFBRSxPQUFPO0FBQUE7QUFBQSxJQUE3K0ksSUFBcVQsS0FBTyxXQUFpRSxJQUFFLEtBQU8sV0FBRSxLQUFFLEdBQUUsS0FBRSxHQUFFLEtBQUU7QUFBQTtBQUFBLEVBQWxaLEtBQUUsT0FBTyxJQUFJLGdCQUFnQjtBQUFBLEVBQWswQixHQUFFLFVBQVUsUUFBTTtBQUFBLEVBQUUsR0FBRSxVQUFVLElBQUUsUUFBUSxHQUFFO0FBQUEsSUFBQyxPQUFNO0FBQUE7QUFBQSxFQUFJLEdBQUUsVUFBVSxJQUFFLFFBQVEsQ0FBQyxJQUFFO0FBQUEsSUFBQyxJQUFJLEtBQUUsTUFBSyxLQUFFLEtBQUs7QUFBQSxJQUFFLElBQUcsT0FBSSxNQUFZLEdBQUUsTUFBTixXQUFRO0FBQUEsTUFBQyxHQUFFLElBQUU7QUFBQSxNQUFFLEtBQUssSUFBRTtBQUFBLE1BQUUsSUFBWSxPQUFKO0FBQUEsUUFBTSxHQUFFLElBQUU7QUFBQSxNQUFPO0FBQUEsV0FBRSxRQUFRLEdBQUU7QUFBQSxVQUFDLElBQUk7QUFBQSxXQUFTLEtBQUUsR0FBRSxNQUFYLFFBQWUsR0FBRSxLQUFLLEVBQUM7QUFBQSxTQUFFO0FBQUEsSUFBQztBQUFBO0FBQUEsRUFBRyxHQUFFLFVBQVUsSUFBRSxRQUFRLENBQUMsSUFBRTtBQUFBLElBQUMsSUFBSSxLQUFFO0FBQUEsSUFBSyxJQUFZLEtBQUssTUFBVCxXQUFXO0FBQUEsTUFBQyxNQUFRLEdBQUosSUFBVSxHQUFKLE9BQUU7QUFBQSxNQUFJLElBQVksT0FBSixXQUFNO0FBQUEsUUFBQyxHQUFFLElBQUU7QUFBQSxRQUFFLEdBQUUsSUFBTztBQUFBLE1BQUM7QUFBQSxNQUFDLElBQVksT0FBSixXQUFNO0FBQUEsUUFBQyxHQUFFLElBQUU7QUFBQSxRQUFFLEdBQUUsSUFBTztBQUFBLE1BQUM7QUFBQSxNQUFDLElBQUcsT0FBSSxLQUFLLEdBQUU7QUFBQSxRQUFDLEtBQUssSUFBRTtBQUFBLFFBQUUsSUFBWSxPQUFKO0FBQUEsVUFBTSxHQUFFLFFBQVEsR0FBRTtBQUFBLFlBQUMsSUFBSTtBQUFBLGFBQVMsS0FBRSxHQUFFLE1BQVgsUUFBZSxHQUFFLEtBQUssRUFBQztBQUFBLFdBQUU7QUFBQSxNQUFDO0FBQUEsSUFBQztBQUFBO0FBQUEsRUFBRyxHQUFFLFVBQVUsWUFBVSxRQUFRLENBQUMsSUFBRTtBQUFBLElBQUMsSUFBSSxLQUFFO0FBQUEsSUFBSyxPQUFPLEdBQUUsUUFBUSxHQUFFO0FBQUEsTUFBQyxJQUFJLEtBQUUsR0FBRSxPQUFNLEtBQUU7QUFBQSxNQUFFLEtBQU87QUFBQSxNQUFFLElBQUc7QUFBQSxRQUFDLEdBQUUsRUFBQztBQUFBLGdCQUFFO0FBQUEsUUFBUSxLQUFFO0FBQUE7QUFBQSxPQUFJLEVBQUMsTUFBSyxNQUFLLENBQUM7QUFBQTtBQUFBLEVBQUcsR0FBRSxVQUFVLFVBQVEsUUFBUSxHQUFFO0FBQUEsSUFBQyxPQUFPLEtBQUs7QUFBQTtBQUFBLEVBQU8sR0FBRSxVQUFVLFdBQVMsUUFBUSxHQUFFO0FBQUEsSUFBQyxPQUFPLEtBQUssUUFBTTtBQUFBO0FBQUEsRUFBSSxHQUFFLFVBQVUsU0FBTyxRQUFRLEdBQUU7QUFBQSxJQUFDLE9BQU8sS0FBSztBQUFBO0FBQUEsRUFBTyxHQUFFLFVBQVUsT0FBSyxRQUFRLEdBQUU7QUFBQSxJQUFDLElBQUksS0FBRTtBQUFBLElBQUUsS0FBTztBQUFBLElBQUUsSUFBRztBQUFBLE1BQUMsT0FBTyxLQUFLO0FBQUEsY0FBTTtBQUFBLE1BQVEsS0FBRTtBQUFBO0FBQUE7QUFBQSxFQUFJLE9BQU8sZUFBZSxHQUFFLFdBQVUsU0FBUSxFQUFDLEtBQUksUUFBUSxHQUFFO0FBQUEsSUFBQyxJQUFJLEtBQUUsR0FBRSxJQUFJO0FBQUEsSUFBRSxJQUFZLE9BQUo7QUFBQSxNQUFNLEdBQUUsSUFBRSxLQUFLO0FBQUEsSUFBRSxPQUFPLEtBQUs7QUFBQSxLQUFHLEtBQUksUUFBUSxDQUFDLElBQUU7QUFBQSxJQUFDLElBQUcsT0FBSSxLQUFLLEdBQUU7QUFBQSxNQUFDLElBQUcsS0FBRTtBQUFBLFFBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0FBQUEsTUFBRSxLQUFLLElBQUU7QUFBQSxNQUFFLEtBQUs7QUFBQSxNQUFJO0FBQUEsTUFBSTtBQUFBLE1BQUksSUFBRztBQUFBLFFBQUMsU0FBUSxLQUFFLEtBQUssRUFBVyxPQUFKLFdBQU0sS0FBRSxHQUFFO0FBQUEsVUFBRSxHQUFFLEVBQUUsRUFBRTtBQUFBLGdCQUFFO0FBQUEsUUFBUSxHQUFFO0FBQUE7QUFBQSxJQUFFO0FBQUEsSUFBRSxDQUFDO0FBQUEsRUFBK21CLEdBQUUsWUFBVSxJQUFJO0FBQUEsRUFBRSxHQUFFLFVBQVUsSUFBRSxRQUFRLEdBQUU7QUFBQSxJQUFDLEtBQUssS0FBRztBQUFBLElBQUcsSUFBRyxJQUFFLEtBQUs7QUFBQSxNQUFFLE9BQU07QUFBQSxJQUFHLEtBQVEsS0FBRyxLQUFLLE1BQWI7QUFBQSxNQUFnQixPQUFNO0FBQUEsSUFBRyxLQUFLLEtBQUc7QUFBQSxJQUFHLElBQUcsS0FBSyxNQUFJO0FBQUEsTUFBRSxPQUFNO0FBQUEsSUFBRyxLQUFLLElBQUU7QUFBQSxJQUFFLEtBQUssS0FBRztBQUFBLElBQUUsSUFBRyxLQUFLLElBQUUsS0FBRyxDQUFDLEdBQUUsSUFBSSxHQUFFO0FBQUEsTUFBQyxLQUFLLEtBQUc7QUFBQSxNQUFHLE9BQU07QUFBQSxJQUFFO0FBQUEsSUFBQyxJQUFJLEtBQUU7QUFBQSxJQUFFLElBQUc7QUFBQSxNQUFDLEdBQUUsSUFBSTtBQUFBLE1BQUUsS0FBRTtBQUFBLE1BQUssSUFBSSxLQUFFLEtBQUssRUFBRTtBQUFBLE1BQUUsSUFBRyxLQUFHLEtBQUssS0FBRyxLQUFLLE1BQUksTUFBTyxLQUFLLE1BQVQsR0FBVztBQUFBLFFBQUMsS0FBSyxJQUFFO0FBQUEsUUFBRSxLQUFLLEtBQUc7QUFBQSxRQUFJLEtBQUs7QUFBQSxNQUFHO0FBQUEsTUFBRSxPQUFNLElBQUU7QUFBQSxNQUFDLEtBQUssSUFBRTtBQUFBLE1BQUUsS0FBSyxLQUFHO0FBQUEsTUFBRyxLQUFLO0FBQUE7QUFBQSxJQUFJLEtBQUU7QUFBQSxJQUFFLEdBQUUsSUFBSTtBQUFBLElBQUUsS0FBSyxLQUFHO0FBQUEsSUFBRyxPQUFNO0FBQUE7QUFBQSxFQUFJLEdBQUUsVUFBVSxJQUFFLFFBQVEsQ0FBQyxJQUFFO0FBQUEsSUFBQyxJQUFZLEtBQUssTUFBVCxXQUFXO0FBQUEsTUFBQyxLQUFLLEtBQUc7QUFBQSxNQUFHLFNBQVEsS0FBRSxLQUFLLEVBQVcsT0FBSixXQUFNLEtBQUUsR0FBRTtBQUFBLFFBQUUsR0FBRSxFQUFFLEVBQUUsRUFBQztBQUFBLElBQUM7QUFBQSxJQUFDLEdBQUUsVUFBVSxFQUFFLEtBQUssTUFBSyxFQUFDO0FBQUE7QUFBQSxFQUFHLEdBQUUsVUFBVSxJQUFFLFFBQVEsQ0FBQyxJQUFFO0FBQUEsSUFBQyxJQUFZLEtBQUssTUFBVCxXQUFXO0FBQUEsTUFBQyxHQUFFLFVBQVUsRUFBRSxLQUFLLE1BQUssRUFBQztBQUFBLE1BQUUsSUFBWSxLQUFLLE1BQVQsV0FBVztBQUFBLFFBQUMsS0FBSyxLQUFHO0FBQUEsUUFBSSxTQUFRLEtBQUUsS0FBSyxFQUFXLE9BQUosV0FBTSxLQUFFLEdBQUU7QUFBQSxVQUFFLEdBQUUsRUFBRSxFQUFFLEVBQUM7QUFBQSxNQUFDO0FBQUEsSUFBQztBQUFBO0FBQUEsRUFBRyxHQUFFLFVBQVUsSUFBRSxRQUFRLEdBQUU7QUFBQSxJQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztBQUFBLE1BQUMsS0FBSyxLQUFHO0FBQUEsTUFBRSxTQUFRLEtBQUUsS0FBSyxFQUFXLE9BQUosV0FBTSxLQUFFLEdBQUU7QUFBQSxRQUFFLEdBQUUsRUFBRSxFQUFFO0FBQUEsSUFBQztBQUFBO0FBQUEsRUFBRyxPQUFPLGVBQWUsR0FBRSxXQUFVLFNBQVEsRUFBQyxLQUFJLFFBQVEsR0FBRTtBQUFBLElBQUMsSUFBRyxJQUFFLEtBQUs7QUFBQSxNQUFFLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtBQUFBLElBQUUsSUFBSSxLQUFFLEdBQUUsSUFBSTtBQUFBLElBQUUsS0FBSyxFQUFFO0FBQUEsSUFBRSxJQUFZLE9BQUo7QUFBQSxNQUFNLEdBQUUsSUFBRSxLQUFLO0FBQUEsSUFBRSxJQUFHLEtBQUcsS0FBSztBQUFBLE1BQUUsTUFBTSxLQUFLO0FBQUEsSUFBRSxPQUFPLEtBQUs7QUFBQSxJQUFFLENBQUM7QUFBQSxFQUFvZixHQUFFLFVBQVUsSUFBRSxRQUFRLEdBQUU7QUFBQSxJQUFDLElBQUksS0FBRSxLQUFLLEVBQUU7QUFBQSxJQUFFLElBQUc7QUFBQSxNQUFDLElBQUcsSUFBRSxLQUFLO0FBQUEsUUFBRTtBQUFBLE1BQU8sSUFBWSxLQUFLLE1BQVQ7QUFBQSxRQUFXO0FBQUEsTUFBTyxJQUFJLEtBQUUsS0FBSyxFQUFFO0FBQUEsTUFBRSxJQUFlLE9BQU8sTUFBbkI7QUFBQSxRQUFxQixLQUFLLElBQUU7QUFBQSxjQUFFO0FBQUEsTUFBUSxHQUFFO0FBQUE7QUFBQTtBQUFBLEVBQUksR0FBRSxVQUFVLElBQUUsUUFBUSxHQUFFO0FBQUEsSUFBQyxJQUFHLElBQUUsS0FBSztBQUFBLE1BQUUsTUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0FBQUEsSUFBRSxLQUFLLEtBQUc7QUFBQSxJQUFFLEtBQUssS0FBRztBQUFBLElBQUcsR0FBRSxJQUFJO0FBQUEsSUFBRSxHQUFFLElBQUk7QUFBQSxJQUFFO0FBQUEsSUFBSSxJQUFJLEtBQUU7QUFBQSxJQUFFLEtBQUU7QUFBQSxJQUFLLE9BQU8sR0FBRSxLQUFLLE1BQUssRUFBQztBQUFBO0FBQUEsRUFBRyxHQUFFLFVBQVUsSUFBRSxRQUFRLEdBQUU7QUFBQSxJQUFDLElBQUcsRUFBRSxJQUFFLEtBQUssSUFBRztBQUFBLE1BQUMsS0FBSyxLQUFHO0FBQUEsTUFBRSxLQUFLLElBQUU7QUFBQSxNQUFFLEtBQUU7QUFBQSxJQUFJO0FBQUE7QUFBQSxFQUFHLEdBQUUsVUFBVSxJQUFFLFFBQVEsR0FBRTtBQUFBLElBQUMsS0FBSyxLQUFHO0FBQUEsSUFBRSxJQUFHLEVBQUUsSUFBRSxLQUFLO0FBQUEsTUFBRyxHQUFFLElBQUk7QUFBQTtBQUFBLEVBQUcsR0FBRSxVQUFVLFVBQVEsUUFBUSxHQUFFO0FBQUEsSUFBQyxLQUFLLEVBQUU7QUFBQTtBQUFBOzs7QUNBN2tJLFNBQVMsRUFBQyxDQUFDLElBQUUsSUFBRTtBQUFBLEVBQUMsRUFBRSxNQUFHLEdBQUUsS0FBSyxNQUFLLEVBQUUsT0FBSSxRQUFRLEdBQUUsRUFBRTtBQUFBO0FBQUUsU0FBUyxFQUFDLENBQUMsSUFBRTtBQUFBLEVBQUMsSUFBRyxJQUFFO0FBQUEsSUFBQyxJQUFJLEtBQUU7QUFBQSxJQUFFLEtBQU87QUFBQSxJQUFFLEdBQUU7QUFBQSxFQUFDO0FBQUEsRUFBQyxLQUFFLE1BQUcsR0FBRSxFQUFFO0FBQUE7QUFBRSxTQUFTLEVBQUMsQ0FBQyxJQUFFO0FB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RSxHQUFFLE1BQUcsR0FBRSxLQUFLO0FBQUEsVUFBQztBQUFBLFFBQUM7QUFBQSxJQUFDO0FBQUEsSUFBQyxHQUFFLEVBQUM7QUFBQSxHQUFFO0FBQUEsRUFBRSxHQUFFLE9BQU0sUUFBUSxDQUFDLElBQUUsSUFBRTtBQUFBLElBQUMsR0FBRSxFQUFDO0FBQUEsSUFBRSxHQUFFO0FBQUEsSUFBRSxJQUFJLElBQUUsS0FBRSxHQUFFO0FBQUEsSUFBSSxJQUFHLElBQUU7QUFBQSxNQUFDLEdBQUUsUUFBTTtBQUFBLE1BQUcsS0FBYSxLQUFFLEdBQUUsVUFBVDtBQUFBLFFBQWUsR0FBRSxPQUFLLEtBQUUsUUFBUSxDQUFDLElBQUU7QUFBQSxVQUFDLElBQUk7QUFBQSxVQUFFLEdBQUUsUUFBUSxHQUFFO0FBQUEsWUFBQyxLQUFFO0FBQUEsV0FBSztBQUFBLFVBQUUsR0FBRSxJQUFFLFFBQVEsR0FBRTtBQUFBLFlBQUMsR0FBRSxRQUFNO0FBQUEsWUFBRSxHQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQUE7QUFBQSxVQUFHLE9BQU87QUFBQSxVQUFHO0FBQUEsSUFBQztBQUFBLElBQUMsS0FBRTtBQUFBLElBQUUsR0FBRSxFQUFDO0FBQUEsR0FBRTtBQUFBLEVBQUUsR0FBRSxPQUFNLFFBQVEsQ0FBQyxJQUFFLElBQUUsSUFBRSxJQUFFO0FBQUEsSUFBQyxHQUFFO0FBQUEsSUFBRSxLQUFPO0FBQUEsSUFBRSxHQUFFLElBQUUsSUFBRSxFQUFDO0FBQUEsR0FBRTtBQUFBLEVBQUUsR0FBRSxVQUFTLFFBQVEsQ0FBQyxJQUFFLElBQUU7QUFBQSxJQUFDLEdBQUU7QUFBQSxJQUFFLEtBQU87QUFBQSxJQUFFLElBQUk7QUFBQSxJQUFFLElBQWEsT0FBTyxHQUFFLFFBQW5CLGFBQTBCLEtBQUUsR0FBRSxNQUFLO0FBQUEsTUFBQyxNQUFRLE1BQUosSUFBYSxPQUFKLE9BQUU7QUFBQSxNQUFRLElBQUcsSUFBRTtBQUFBLFFBQUMsSUFBSSxLQUFFLEdBQUU7QUFBQSxRQUFFLElBQUc7QUFBQSxVQUFFLFNBQVEsTUFBSyxJ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TUFBTTtBQUFBLGNBQXRFLFVBQ0csTUFBTSxPQUFPLElBQUksd0JBQUssR0FBQyxPQUFEO0FBQUEsZ0JBQWtCLE9BQU87QUFBQSxnQkFBRztBQUFBLGlCQUFoQixHQUFFLElBQWQsc0JBQXdDLENBQUU7QUFBQSxlQURuRSxpQ0FFRTtBQUFBLDRCQUNGLEdBQUMsT0FBRDtBQUFBLGNBQUssS0FBSztBQUFBLGNBQVksT0FBTTtBQUFBLGVBQTVCLGlDQUF3RTtBQUFBLDRCQUN4RSxHQUFDLE9BQUQ7QUFBQSxjQUFLLEtBQUs7QUFBQSxjQUFZLE9BQU07QUFBQSxlQUE1QixpQ0FBd0U7QUFBQTtBQUFBLFdBYjFFLGdDQWNFO0FBQUEsU0FmSixpQ0FnQkU7QUFBQTtBQUFBLEtBbEJKLGdDQW1CRTtBQUFBOzs7QU45aEJDLFNBQVMsR0FBRyxHQUFHO0FBQUEsRUFDcEIsTUFBTSxRQUFRLFNBQVM7QUFBQSxFQUN2QixRQUFRLFdBQVcsT0FBTztBQUFBLEVBQzFCLE1BQU0sS0FBSyxVQUFVLEtBQUssUUFBSyxHQUFFLE9BQU8sR0FBRyxVQUFVO0FBQUEsRUFDckQsTUFBTSxNQUFNLElBQUksU0FBUyxLQUFLLFFBQUssR0FBRSxPQUFPLEdBQUcsU0FBUztBQUFBLEVBQ3hELE1BQU0sT0FBTyxNQUFNLFdBQVcsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJO0FBQUEsRUFFdEQsdUJBQ0U7QUFBQSxjQWFFO0FBQUEsc0JBWkEsR0FBQyxlQUFELHFDQUFlO0FBQUEsc0JBQ2YsR0FBQyxjQUFELHFDQUFjO0FBQUEsc0JBQ2QsR0FRRSxPQVJGO0FBQUEsUUFBSyxJQUFHO0FBQUEsUUFBUixVQVFFO0FBQUEsMEJBUEEsR0FBQyxhQUFELHFDQUFhO0FBQUEsMEJBQ2IsR0FLRSxPQUxGO0FBQUEsWUFBSyxJQUFHO0FBQUEsWUFBUixVQUtFO0FBQUEsOEJBSkEsR0FFRSxPQUZGO0FBQUEsZ0JBQUssSUFBRztBQUFBLGdCQUFSLDBCQUNFLEdBQUMsUUFBRDtBQUFBLGtCQUFRO0FBQUEsbUJBQVIsaUNBQW9CO0FBQUEsaUJBRHRCLGlDQUVFO0FBQUEsOEJBQ0YsR0FBQyxZQUFELHFDQUFZO0FBQUE7QUFBQSxhQUpkLGdDQUtFO0FBQUE7QUFBQSxTQVBKLGdDQVFFO0FBQUEsc0JBQ0YsR0FBQyxhQUFELHFDQUFhO0FBQUE7QUFBQSxLQVpmLGdDQWFFO0FBQUE7OztBRHhCTixTQUFTLGVBQWUsS0FBSyxFQUFFLGlCQUFpQixlQUFlLFFBQUs7QUFBQSxFQUNsRSxHQUFFLGVBQWU7QUFBQSxDQUNsQjtBQUVELGtCQUFPLEdBQUMsS0FBRCxxQ0FBSyxHQUFJLFNBQVMsZUFBZSxLQUFLLENBQUM7IiwKICAiZGVidWdJZCI6ICJGNTg4MUNCMzcwNzUxMDNFNjQ3NTZFMjE2NDc1NkUyMSIsCiAgIm5hbWVzIjogW10KfQ==
