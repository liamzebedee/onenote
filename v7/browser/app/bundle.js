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

// ../core/node_modules/preact/dist/preact.module.js
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

// ../core/node_modules/preact/hooks/dist/hooks.module.js
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
function _2(n2, u3) {
  var i3 = p2(t2++, 4);
  !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__h.push(i3));
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

// ../core/node_modules/@preact/signals-core/dist/signals-core.module.js
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
function _3(i4) {
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
  _3(i4);
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
    _3(this);
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

// ../core/node_modules/@preact/signals/dist/signals.module.js
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

// ../core/src/store.js
var exports_store = {};
__export(exports_store, {
  updatePageView: () => updatePageView,
  updatePageTree: () => updatePageTree,
  updatePageTitleAndRefresh: () => updatePageTitleAndRefresh,
  updatePageTitle: () => updatePageTitle,
  updateDisplayPanelPosition: () => updateDisplayPanelPosition,
  updateClaudeChatPosition: () => updateClaudeChatPosition,
  updateChecklistItemsSilent: () => updateChecklistItemsSilent,
  updateChecklistItems: () => updateChecklistItems,
  updateBlockZ: () => updateBlockZ,
  updateBlockWidth: () => updateBlockWidth,
  updateBlockType: () => updateBlockType,
  updateBlockTextDiff: () => updateBlockTextDiff,
  updateBlockSrc: () => updateBlockSrc,
  updateBlockPos: () => updateBlockPos,
  updateBlockHtmlLocal: () => updateBlockHtmlLocal,
  updateBlockHtml: () => updateBlockHtml,
  updateBlockCrop: () => updateBlockCrop,
  updateBlockCaption: () => updateBlockCaption,
  updateBlockBorder: () => updateBlockBorder,
  uid: () => uid,
  toggleSwitcher: () => toggleSwitcher,
  togglePageVisibility: () => togglePageVisibility,
  startClaudeChat: () => startClaudeChat,
  showSwitcher: () => showSwitcher,
  setActiveSection: () => setActiveSection,
  setActivePage: () => setActivePage,
  setActiveNotebook: () => setActiveNotebook,
  sendClaudeMessage: () => sendClaudeMessage,
  savePageCaret: () => savePageCaret,
  reorderSections: () => reorderSections,
  reorderNotebooks: () => reorderNotebooks,
  renameSection: () => renameSection,
  renamePage: () => renamePage,
  renameNotebook: () => renameNotebook,
  removeFromTree: () => removeFromTree,
  recentNotebooks: () => recentNotebooks,
  preloadPages: () => preloadPages,
  preloadPage: () => preloadPage,
  preloadCache: () => preloadCache,
  pickAndOpenNotebook: () => pickAndOpenNotebook,
  openNotebook: () => openNotebook,
  movePage: () => movePage,
  lastCaretPerPage: () => lastCaretPerPage,
  jumpToPage: () => jumpToPage,
  interruptClaude: () => interruptClaude,
  initializing: () => initializing,
  getPreloadCandidates: () => getPreloadCandidates,
  getNotebookPath: () => getNotebookPath,
  getActivePage: () => getActivePage,
  findInTree: () => findInTree,
  editingEnabled: () => editingEnabled,
  displayPanel: () => displayPanel,
  deleteSection: () => deleteSection,
  deletePage: () => deletePage,
  deleteNotebook: () => deleteNotebook,
  deleteBlock: () => deleteBlock,
  createAndOpenNotebook: () => createAndOpenNotebook,
  connected: () => connected,
  closeSwitcher: () => closeSwitcher,
  closeDisplayPanel: () => closeDisplayPanel,
  closeClaudeChat: () => closeClaudeChat,
  claudeChat: () => claudeChat,
  appState: () => appState,
  addSection: () => addSection,
  addPage: () => addPage,
  addNotebook: () => addNotebook,
  addImageFromUrl: () => addImageFromUrl,
  addImageFromFile: () => addImageFromFile,
  addBlock: () => addBlock,
  DEFAULT_BLOCK_WIDTH: () => DEFAULT_BLOCK_WIDTH
});
function mkPage(title = "Untitled Page") {
  return { id: uid(), title, children: [], blocks: [], panX: 0, panY: 0, zoom: 1, createdAt: Date.now() };
}
function mkSection(title = "New Section") {
  return { id: uid(), title, pages: [mkPage()] };
}
function mkNotebook(title = "My Notebook") {
  const sec = mkSection();
  return { id: uid(), title, sections: [sec] };
}
function sendOp(op) {
  if (hasIPC)
    window.notebook.applyOp(op);
}
function sendOps(ops) {
  if (hasIPC && ops.length)
    window.notebook.applyOps(ops);
}
function defaultState() {
  const nb = mkNotebook();
  return { notebooks: [nb], ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id } };
}
function preloadPage(page) {
  if (!page || preloadCache.value.has(page.id))
    return;
  const m4 = new Map(preloadCache.value);
  m4.set(page.id, page);
  preloadCache.value = m4;
}
function preloadPages(pages) {
  const m4 = new Map(preloadCache.value);
  let changed = false;
  for (const page of pages) {
    if (page && !m4.has(page.id)) {
      m4.set(page.id, page);
      changed = true;
    }
  }
  if (changed)
    preloadCache.value = m4;
}
function getPreloadCandidates() {
  const { ui, notebooks } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  if (!nb)
    return [];
  const results = [];
  function addTree(pages) {
    for (const p5 of pages) {
      if (p5.id !== ui.pageId)
        results.push(p5);
      if (p5.children?.length)
        addTree(p5.children);
    }
  }
  for (const sec of nb.sections) {
    if (sec.id === ui.sectionId) {
      addTree(sec.pages);
    } else {
      const lastId = lastPagePerSection.get(sec.id);
      const pg = lastId ? findInTree(sec.pages, lastId) : sec.pages[0];
      if (pg)
        results.push(pg);
    }
  }
  return results;
}
function toggleSwitcher() {
  showSwitcher.value = !showSwitcher.value;
}
function closeSwitcher() {
  showSwitcher.value = false;
}
function update(fn) {
  const draft = { ...appState.value };
  fn(draft);
  appState.value = draft;
}
function silent(fn) {
  fn(appState.value);
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
function setNotebookPath(p5) {
  _notebookPath = p5;
  const name = p5 ? p5.replace(/\\/g, "/").split("/").pop() : null;
  document.title = name ? `Notebound - ${name}` : "Notebound";
}
function persistUiState() {
  if (!hasIPC || !_notebookPath)
    return;
  clearTimeout(_uiSaveTimer);
  _uiSaveTimer = setTimeout(() => {
    const { ui } = appState.value;
    window.notebook.saveUiState(_notebookPath, {
      sectionId: ui.sectionId,
      pageId: ui.pageId,
      lastPagePerSection: Object.fromEntries(lastPagePerSection)
    });
  }, 500);
}
function setActiveNotebook(id) {
  update((s5) => {
    s5.ui.notebookId = id;
    const nb = s5.notebooks.find((n3) => n3.id === id);
    s5.ui.sectionId = nb?.sections[0]?.id ?? null;
    s5.ui.pageId = nb?.sections[0]?.pages[0]?.id ?? null;
  });
  persistUiState();
}
function setActiveSection(id) {
  update((s5) => {
    s5.ui.sectionId = id;
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    const sec = nb?.sections.find((sec2) => sec2.id === id);
    const lastId = lastPagePerSection.get(id);
    const lastPage = lastId && sec ? findInTree(sec.pages, lastId) : null;
    s5.ui.pageId = lastPage?.id ?? sec?.pages[0]?.id ?? null;
  });
  persistUiState();
}
function setActivePage(id) {
  const { sectionId } = appState.value.ui;
  if (sectionId)
    lastPagePerSection.set(sectionId, id);
  update((s5) => {
    s5.ui.pageId = id;
  });
  persistUiState();
}
function addNotebook() {
  const nb = mkNotebook("New Notebook");
  update((s5) => {
    s5.notebooks.push(nb);
    s5.ui.notebookId = nb.id;
    s5.ui.sectionId = nb.sections[0].id;
    s5.ui.pageId = nb.sections[0].pages[0].id;
  });
  const sec = nb.sections[0];
  const page = sec.pages[0];
  sendOps([
    { type: "notebook-add", notebookId: nb.id, title: nb.title, sections: [] },
    { type: "section-add", notebookId: nb.id, sectionId: sec.id, title: sec.title, pages: [] },
    { type: "page-add", sectionId: sec.id, pageId: page.id, title: page.title, blocks: page.blocks }
  ]);
}
function renameNotebook(id, title) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === id);
    if (nb)
      nb.title = title;
  });
  sendOp({ type: "notebook-rename", notebookId: id, title });
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
  sendOp({ type: "notebook-delete", notebookId: id });
}
function reorderNotebooks(ids) {
  update((s5) => {
    s5.notebooks.sort((a4, b2) => ids.indexOf(a4.id) - ids.indexOf(b2.id));
  });
  sendOp({ type: "notebook-reorder", notebookIds: ids });
}
function addSection(nbId) {
  const sec = mkSection("New Section");
  const page = sec.pages[0];
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === nbId);
    if (!nb)
      return;
    nb.sections.push(sec);
    s5.ui.sectionId = sec.id;
    s5.ui.pageId = page.id;
  });
  sendOps([
    { type: "section-add", notebookId: nbId, sectionId: sec.id, title: sec.title, pages: [] },
    { type: "page-add", sectionId: sec.id, pageId: page.id, title: page.title, blocks: page.blocks }
  ]);
}
function renameSection(nbId, secId, title) {
  update((s5) => {
    const sec = s5.notebooks.find((n3) => n3.id === nbId)?.sections.find((s6) => s6.id === secId);
    if (sec)
      sec.title = title;
  });
  sendOp({ type: "section-rename", sectionId: secId, title });
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
  sendOp({ type: "section-delete", notebookId: nbId, sectionId: secId });
}
function reorderSections(nbId, ids) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === nbId);
    if (nb)
      nb.sections.sort((a4, b2) => ids.indexOf(a4.id) - ids.indexOf(b2.id));
  });
  sendOp({ type: "section-reorder", notebookId: nbId, sectionIds: ids });
}
function addPage(parentPageId = null) {
  const pg = mkPage("Untitled Page");
  const secId = appState.value.ui.sectionId;
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
  sendOp({ type: "page-add", sectionId: secId, pageId: pg.id, title: pg.title, parentPageId, blocks: pg.blocks });
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
  sendOp({ type: "page-rename", pageId, title });
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
  sendOp({ type: "page-delete", pageId });
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
  sendOp({ type: "page-move", pageId, targetSectionId: targetSecId });
}
function addBlock(x3, y4, w4 = DEFAULT_BLOCK_WIDTH, type = "text", extra = {}) {
  const blk = { id: uid(), x: x3, y: y4, w: w4, html: "", type, ...extra };
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    if (pg)
      pg.blocks.push(blk);
  });
  sendOp({ type: "block-add", pageId, block: blk });
  return blk;
}
function deleteBlock(blockId) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    if (pg)
      pg.blocks = pg.blocks.filter((b2) => b2.id !== blockId);
  });
  sendOp({ type: "block-delete", pageId, blockId });
}
function updateBlockHtmlLocal(blockId, html) {
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.html = html;
  });
}
function updateBlockTextDiff(blockId, diffs) {
  const pageId = appState.value.ui.pageId;
  if (hasIPC && diffs.length > 0) {
    window.notebook.applyOp({ type: "block-text-diff", pageId, blockId, diffs });
  }
}
function updateBlockHtml(blockId, html) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.html = html;
  });
  sendOp({ type: "block-update-html", pageId, blockId, html });
}
function updateBlockPos(blockId, x3, y4) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk) {
      blk.x = x3;
      blk.y = y4;
    }
  });
  sendOp({ type: "block-move", pageId, blockId, x: x3, y: y4 });
}
function updateBlockType(blockId, type) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.type = type;
  });
  sendOp({ type: "block-update-type", pageId, blockId, blockType: type });
}
function updateBlockWidth(blockId, w4) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.w = w4;
  });
  sendOp({ type: "block-resize", pageId, blockId, w: w4 });
}
function updateBlockSrc(blockId, src) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.src = src;
  });
  sendOp({ type: "block-update-src", pageId, blockId, src });
}
function updateBlockCrop(blockId, crop) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.crop = crop;
  });
  sendOp({ type: "block-update-crop", pageId, blockId, crop });
}
function updateBlockBorder(blockId, border) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.border = border || undefined;
  });
  sendOp({ type: "block-update-border", pageId, blockId, border });
}
function updateChecklistItems(blockId, items) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.items = items;
  });
  sendOp({ type: "block-checklist-update", pageId, blockId, items });
}
function updateChecklistItemsSilent(blockId, items) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.items = items;
  });
  sendOp({ type: "block-checklist-update", pageId, blockId, items });
}
function updateBlockCaption(blockId, caption) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.caption = caption ?? undefined;
  });
  sendOp({ type: "block-update-caption", pageId, blockId, caption });
}
function addImageFromFile(file, x3, y4) {
  const objectUrl = URL.createObjectURL(file);
  const blk = addBlock(x3, y4, 300, "image", { src: objectUrl });
  if (window.notebook) {
    file.arrayBuffer().then((buffer) => {
      const meta = {
        filename: file.name || null,
        mimeType: file.type || null,
        size: file.size || null,
        lastModified: file.lastModified || null
      };
      return window.notebook.saveBlob(buffer, meta);
    }).then((hash) => {
      if (hash)
        updateBlockSrc(blk.id, "blob:" + hash);
      URL.revokeObjectURL(objectUrl);
    });
  }
}
async function addImageFromUrl(url, x3, y4) {
  const placeholder = addBlock(x3, y4, 300, "loading");
  try {
    const { buffer, contentType, size } = await window.notebook.fetchImage(url);
    const filename = url.split("/").pop().split("?")[0];
    const meta = { filename, mimeType: contentType, size, lastModified: null };
    deleteBlock(placeholder.id);
    const hash = await window.notebook.saveBlob(buffer, meta);
    if (hash) {
      addBlock(x3, y4, 300, "image", { src: "blob:" + hash });
      return;
    }
  } catch (err) {
    deleteBlock(placeholder.id);
    (window.log || console.log)("[addImageFromUrl] error:", err.message);
  }
}
function updateBlockZ(blockId, z3) {
  const pageId = appState.value.ui.pageId;
  update((s5) => {
    const pg = getActivePage(s5);
    const blk = pg?.blocks.find((b2) => b2.id === blockId);
    if (blk)
      blk.z = z3;
  });
  sendOp({ type: "block-z", pageId, blockId, z: z3 });
}
function updatePageTree(sectionId, pages) {
  function toStructure(ps) {
    return ps.map((p5) => ({ id: p5.id, children: toStructure(p5.children ?? []) }));
  }
  sendOp({ type: "page-tree-update", sectionId, pages: toStructure(pages) });
}
function togglePageVisibility(pageId) {
  update((s5) => {
    const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
    if (!nb)
      return;
    for (const sec of nb.sections) {
      const pg = findInTree(sec.pages, pageId);
      if (pg) {
        pg.hidden = !pg.hidden;
        break;
      }
    }
  });
  sendOp({ type: "page-set-hidden", pageId, hidden: (() => {
    const nb = appState.value.notebooks.find((n3) => n3.id === appState.value.ui.notebookId);
    if (!nb)
      return false;
    for (const sec of nb.sections) {
      const pg = findInTree(sec.pages, pageId);
      if (pg)
        return !!pg.hidden;
    }
    return false;
  })() });
}
function jumpToPage(sectionId, pageId) {
  lastPagePerSection.set(sectionId, pageId);
  update((s5) => {
    s5.ui.sectionId = sectionId;
    s5.ui.pageId = pageId;
  });
  persistUiState();
}
function updatePageView(panX, panY, zoom) {
  const pageId = appState.value.ui.pageId;
  silent((s5) => {
    const pg = getActivePage(s5);
    if (pg) {
      pg.panX = panX;
      pg.panY = panY;
      pg.zoom = zoom;
    }
  });
  if (hasIPC && _notebookPath && pageId) {
    window.notebook.savePageView(_notebookPath, pageId, panX, panY, zoom);
  }
}
function savePageCaret(pageId, blockId, offset) {
  if (hasIPC && _notebookPath && pageId) {
    window.notebook.savePageCaret(_notebookPath, pageId, blockId, offset);
  }
}
function getNotebookPath() {
  return _notebookPath;
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
  sendOp({ type: "page-rename", pageId, title });
}
async function openNotebook(notebookPath) {
  if (!hasIPC)
    return;
  _log("openNotebook called, path:", notebookPath);
  const state = await window.notebook.open(notebookPath);
  _log("openNotebook IPC returned — notebooks:", state?.notebooks?.length, "sections:", state?.notebooks?.[0]?.sections?.length);
  if (state) {
    setNotebookPath(notebookPath);
    const cfg = await window.notebook.getConfig();
    const saved = cfg.uiPositions?.[notebookPath];
    const nb = state.notebooks[0];
    if (saved && nb) {
      const sec = nb.sections.find((s5) => s5.id === saved.sectionId);
      const page = sec ? findInTree(sec.pages, saved.pageId) : null;
      state.ui = {
        notebookId: nb.id,
        sectionId: sec?.id ?? nb.sections[0]?.id ?? null,
        pageId: page?.id ?? sec?.pages[0]?.id ?? null
      };
      if (saved.lastPagePerSection) {
        for (const [secId, pgId] of Object.entries(saved.lastPagePerSection)) {
          lastPagePerSection.set(secId, pgId);
        }
      }
    } else {
      state.ui = {
        notebookId: nb?.id ?? null,
        sectionId: nb?.sections[0]?.id ?? null,
        pageId: nb?.sections[0]?.pages[0]?.id ?? null
      };
    }
    _log("openNotebook setting appState — ui:", JSON.stringify(state.ui));
    appState.value = state;
    connected.value = true;
    closeSwitcher();
    const title = nb?.title || "Untitled";
    _log("openNotebook saving config — path:", notebookPath, "title:", title);
    window.notebook.saveConfig({ path: notebookPath, name: title });
    if (Array.isArray(cfg.recentNotebooks))
      recentNotebooks.value = cfg.recentNotebooks;
  }
}
async function pickAndOpenNotebook() {
  if (!hasIPC)
    return;
  const dir = await window.notebook.pickDirectory();
  if (dir)
    await openNotebook(dir);
}
async function createAndOpenNotebook() {
  if (!hasIPC)
    return;
  const dir = await window.notebook.pickSavePath();
  if (dir)
    await openNotebook(dir);
}
function updateChat(fn) {
  const draft = structuredClone(claudeChat.value);
  fn(draft);
  claudeChat.value = draft;
}
async function startClaudeChat(x3, y4) {
  if (!hasClaude)
    return;
  if (claudeChat.value.active) {
    try {
      await window.claude.stop();
    } catch {}
    window.claude.offStream();
  }
  try {
    const pageId = appState.value.ui?.pageId;
    await window.claude.start(pageId);
  } catch (err) {
    console.error("[claude] start failed:", err);
    return;
  }
  window.claude.onStream((data) => {
    if (data.type === "text") {
      updateChat((c4) => {
        const last = c4.messages[c4.messages.length - 1];
        if (last && last.role === "assistant") {
          last.content = data.content;
        }
      });
    } else if (data.type === "tool_use") {
      updateChat((c4) => {
        const last = c4.messages[c4.messages.length - 1];
        if (last && last.role === "assistant" && !last.content) {
          last.content = `*Using ${data.tool}...*`;
        }
      });
    } else if (data.type === "done") {
      updateChat((c4) => {
        c4.streaming = false;
        const last = c4.messages[c4.messages.length - 1];
        if (last && last.role === "assistant" && data.result) {
          last.content = data.result;
        }
      });
    } else if (data.type === "error") {
      updateChat((c4) => {
        c4.streaming = false;
        c4.error = data.message;
      });
    }
  });
  claudeChat.value = {
    active: true,
    messages: [],
    streaming: false,
    position: { x: x3 ?? 100, y: y4 ?? 100 },
    error: null
  };
}
function interruptClaude() {
  if (!hasClaude)
    return;
  window.claude.interrupt().catch(() => {});
  updateChat((c4) => {
    c4.streaming = false;
  });
}
function sendClaudeMessage(text) {
  if (!hasClaude || !claudeChat.value.active)
    return;
  if (claudeChat.value.streaming) {
    window.claude.interrupt().catch(() => {});
  }
  updateChat((c4) => {
    c4.messages.push({ role: "user", content: text });
    c4.messages.push({ role: "assistant", content: "" });
    c4.streaming = true;
    c4.error = null;
  });
  window.claude.message(text).catch((err) => {
    updateChat((c4) => {
      c4.streaming = false;
      c4.error = err.message;
    });
  });
}
function closeClaudeChat() {
  if (hasClaude) {
    window.claude.stop().catch(() => {});
    window.claude.offStream();
  }
  claudeChat.value = {
    active: false,
    messages: [],
    streaming: false,
    position: { x: 100, y: 100 },
    error: null
  };
}
function updateClaudeChatPosition(x3, y4) {
  const c4 = claudeChat.value;
  claudeChat.value = { ...c4, position: { x: x3, y: y4 } };
}
function updateDisplayPanelPosition(x3, y4) {
  const d5 = displayPanel.value;
  displayPanel.value = { ...d5, position: { x: x3, y: y4 } };
}
function closeDisplayPanel() {
  displayPanel.value = { ...displayPanel.value, active: false, uri: null };
}
var uid = () => crypto.randomUUID(), hasIPC, appState, connected, initializing, showSwitcher, recentNotebooks, editingEnabled, preloadCache, _log = (...args) => {
  console.log("[store]", ...args);
  if (window.log)
    window.log("[store]", ...args);
}, _notebookPath = null, _uiSaveTimer = null, lastPagePerSection, DEFAULT_WIDTH_REF = "Yes. The real leverage of a local-first, log-replicated object model is not technical elegance — it's power realignment.", _defaultBlockWidth = 580, DEFAULT_BLOCK_WIDTH, lastCaretPerPage, hasClaude, claudeChat, displayPanel;
var init_store = __esm(() => {
  init_signals_module();
  hasIPC = typeof window !== "undefined" && window.notebook;
  appState = c3(defaultState());
  connected = c3(false);
  initializing = c3(true);
  showSwitcher = c3(false);
  recentNotebooks = c3([]);
  editingEnabled = c3(hasIPC ? true : typeof window !== "undefined" && new URLSearchParams(window.location?.search).get("edit") === "on");
  preloadCache = c3(new Map);
  if (hasIPC) {
    window.notebook.getConfig().then((cfg) => {
      _log("init getConfig result — notebookPath:", cfg.notebookPath, "recents:", cfg.recentNotebooks?.length ?? 0);
      if (Array.isArray(cfg.recentNotebooks))
        recentNotebooks.value = cfg.recentNotebooks;
      if (!cfg.notebookPath) {
        _log("no notebookPath — setting initializing=false (welcome screen)");
        initializing.value = false;
      }
    });
    window.notebook.onOpenFailed(() => {
      _log("onOpenFailed fired — setting initializing=false");
      initializing.value = false;
    });
  } else {
    initializing.value = false;
  }
  lastPagePerSection = new Map;
  if (typeof document !== "undefined") {
    const _m = document.createElement("span");
    _m.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:14px "Helvetica Neue",Arial,-apple-system,sans-serif;padding:0 8px';
    _m.textContent = DEFAULT_WIDTH_REF;
    document.body.appendChild(_m);
    _defaultBlockWidth = Math.ceil(_m.offsetWidth + 16);
    document.body.removeChild(_m);
  }
  DEFAULT_BLOCK_WIDTH = _defaultBlockWidth;
  lastCaretPerPage = new Map;
  hasClaude = typeof window !== "undefined" && window.claude;
  claudeChat = c3({
    active: false,
    messages: [],
    streaming: false,
    position: { x: 100, y: 100 },
    error: null
  });
  displayPanel = c3({
    active: false,
    uri: null,
    position: { x: 480, y: 80 }
  });
  if (typeof window !== "undefined" && window.display) {
    window.display.onCommand((cmd) => {
      console.log("[display] command:", cmd);
      if (cmd.action === "open") {
        displayPanel.value = { ...displayPanel.value, active: true, uri: cmd.uri };
      } else if (cmd.action === "refresh") {
        const d5 = displayPanel.value;
        if (d5.active && d5.uri) {
          displayPanel.value = { ...d5, uri: d5.uri + (d5.uri.includes("?") ? "&" : "?") + "_r=" + Date.now() };
        }
      } else if (cmd.action === "close") {
        displayPanel.value = { ...displayPanel.value, active: false, uri: null };
      }
    });
  }
  if (hasIPC) {
    window.notebook.onStateChanged(async (state) => {
      _log("onStateChanged fired — notebooks:", state?.notebooks?.length, "sections:", state?.notebooks?.[0]?.sections?.length, "nb[0].title:", state?.notebooks?.[0]?.title);
      if (!state || !state.notebooks) {
        _log("onStateChanged: no state/notebooks, ignoring");
        return;
      }
      const ui = appState.value.ui;
      const nbExists = state.notebooks.find((n3) => n3.id === ui.notebookId);
      if (nbExists) {
        state.ui = ui;
      } else {
        const nb = state.notebooks[0];
        let restored = false;
        if (!_notebookPath) {
          try {
            const cfg = await window.notebook.getConfig();
            if (cfg.notebookPath) {
              setNotebookPath(cfg.notebookPath);
              const saved = cfg.uiPositions?.[cfg.notebookPath];
              if (saved && nb) {
                const sec = nb.sections.find((s5) => s5.id === saved.sectionId);
                const page = sec ? findInTree(sec.pages, saved.pageId) : null;
                state.ui = {
                  notebookId: nb.id,
                  sectionId: sec?.id ?? nb.sections[0]?.id ?? null,
                  pageId: page?.id ?? sec?.pages[0]?.id ?? null
                };
                if (saved.lastPagePerSection) {
                  for (const [secId, pgId] of Object.entries(saved.lastPagePerSection)) {
                    lastPagePerSection.set(secId, pgId);
                  }
                }
                restored = true;
              }
            }
          } catch {}
        }
        if (!restored) {
          state.ui = {
            notebookId: nb?.id ?? null,
            sectionId: nb?.sections[0]?.id ?? null,
            pageId: nb?.sections[0]?.pages[0]?.id ?? null
          };
        }
      }
      if (_notebookPath) {
        try {
          const cfg = await window.notebook.getConfig();
          const views = cfg.pageViews?.[_notebookPath];
          if (views) {
            let applyViews = function(pages) {
              for (const pg of pages) {
                if (views[pg.id]) {
                  const { panX, panY, zoom } = views[pg.id];
                  if (panX != null)
                    pg.panX = panX;
                  if (panY != null)
                    pg.panY = panY;
                  if (zoom != null)
                    pg.zoom = zoom;
                }
                if (pg.children?.length)
                  applyViews(pg.children);
              }
            };
            for (const nb of state.notebooks) {
              for (const sec of nb.sections)
                applyViews(sec.pages);
            }
            for (const [pageId, v5] of Object.entries(views)) {
              if (v5.caretBlockId) {
                lastCaretPerPage.set(pageId, { blockId: v5.caretBlockId, offset: v5.caretOffset ?? 0 });
              }
            }
          }
        } catch {}
      }
      _log("onStateChanged applied — ui:", JSON.stringify(state.ui), "_notebookPath:", _notebookPath);
      appState.value = { ...state };
      connected.value = true;
      initializing.value = false;
    });
  }
});

// ../core/src/main.jsx
init_preact_module();

// ../core/src/App.jsx
init_hooks_module();
init_store();

// ../core/src/NotebookBar.jsx
init_hooks_module();
init_store();

// ../core/src/ContextMenu.jsx
init_signals_module();
init_hooks_module();

// ../core/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
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

// ../core/src/ContextMenu.jsx
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
    onMouseDown: (e4) => e4.preventDefault(),
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
      if (item.disabled) {
        return /* @__PURE__ */ u4("div", {
          class: "context-menu-item context-menu-item--disabled",
          children: item.label
        }, i4, false, undefined, this);
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

// ../core/src/NotebookBar.jsx
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
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        style: "flex:1"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("button", {
        class: "nb-switch",
        onClick: toggleSwitcher,
        title: "Switch notebook file",
        children: /* @__PURE__ */ u4("svg", {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "currentColor",
          children: /* @__PURE__ */ u4("path", {
            d: "M1 3.5A1.5 1.5 0 0 1 2.5 2h3.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H13.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9z"
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/SectionPanel.jsx
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
      sections.map((sec, i4) => /* @__PURE__ */ u4("div", {
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
        children: [
          i4 > 0 && /* @__PURE__ */ u4("span", {
            class: "sec-tab-left-corner"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("div", {
            class: "sec-tab-body",
            children: sec.title
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("span", {
            class: "sec-tab-right-corner"
          }, undefined, false, undefined, this)
        ]
      }, sec.id, true, undefined, this)),
      /* @__PURE__ */ u4("button", {
        class: "sec-add",
        onClick: () => addSection(nb?.id),
        title: "New section",
        children: "+"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/PagesPanel.jsx
init_hooks_module();
init_store();
function flattenPageIds(pages) {
  const ids = [];
  for (const p5 of pages) {
    ids.push(p5.id);
    if (p5.children?.length)
      ids.push(...flattenPageIds(p5.children));
  }
  return ids;
}
function isDescendantOf(pages, ancestorId, targetId) {
  const ancestor = findInTree(pages, ancestorId);
  if (!ancestor || !ancestor.children?.length)
    return false;
  return !!findInTree(ancestor.children, targetId);
}
function getPageRange(pages, idA, idB) {
  const flat = flattenPageIds(pages);
  const a4 = flat.indexOf(idA), b2 = flat.indexOf(idB);
  if (a4 === -1 || b2 === -1)
    return [idB];
  const lo = Math.min(a4, b2), hi = Math.max(a4, b2);
  return flat.slice(lo, hi + 1);
}
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
  updatePageTree(sec.id, sec.pages);
}
function PageItem({ page, activeId, depth = 0, dragState, onDragChange, editingId, onStartEditing, selected, onSelect, onBulkDelete }) {
  const [open, setOpen] = d2(true);
  const hasKids = page.children?.length > 0;
  const isOver = dragState.over === page.id;
  const isOverAsChild = isOver && dragState.mode === "child";
  const isEditing = editingId === page.id;
  const editRef = A2(null);
  const [editVal, setEditVal] = d2(page.title);
  const isSelected = selected?.has(page.id);
  y2(() => {
    if (isEditing) {
      setEditVal(page.title);
      if (editRef.current) {
        editRef.current.focus();
        editRef.current.select();
      }
    }
  }, [isEditing]);
  function commitEdit() {
    const v5 = editVal.trim() || "Untitled Page";
    if (v5 !== page.title)
      renamePage(page.id, v5);
    onStartEditing(null);
  }
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
        if (isDescendantOf(sec.pages, fromId, page.id))
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
        m4.updatePageTree(sec.id, sec.pages);
      });
    } else {
      Promise.resolve().then(() => (init_store(), exports_store)).then((m4) => {
        const s5 = m4.appState.value;
        const nb = s5.notebooks.find((n3) => n3.id === s5.ui.notebookId);
        const sec = nb?.sections.find((sec2) => sec2.id === s5.ui.sectionId);
        if (!sec)
          return;
        if (isDescendantOf(sec.pages, fromId, page.id))
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
        m4.updatePageTree(sec.id, sec.pages);
      });
    }
  }
  function openPageContextMenu(e4) {
    e4.preventDefault();
    if (selected?.size > 1 && selected.has(page.id)) {
      openContextMenu(e4.clientX, e4.clientY, [
        {
          type: "confirm",
          label: `Delete ${selected.size} pages`,
          confirmLabel: `Delete ${selected.size} pages?`,
          action: onBulkDelete
        }
      ]);
      return;
    }
    const nb = appState.value.notebooks.find((n3) => n3.id === appState.value.ui.notebookId);
    const sections = nb?.sections ?? [];
    const moveChildren = sections.filter((s5) => s5.id !== appState.value.ui.sectionId).map((s5) => ({ label: s5.title, action: () => movePage(page.id, s5.id) }));
    const items = [
      { label: "Rename", action: () => onStartEditing(page.id) },
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
          page.id === activeId && !selected?.size && "panel-item--active",
          isSelected && "panel-item--selected",
          isOver && !isOverAsChild && "page-item--drop-before",
          isOverAsChild && "page-item--drop-child"
        ].filter(Boolean).join(" "),
        style: { paddingLeft: depth * 12 + "px" },
        draggable: true,
        onMouseEnter: () => preloadPage(page),
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onClick: (e4) => {
          if (e4.ctrlKey || e4.metaKey || e4.shiftKey) {
            e4.preventDefault();
            onSelect(page.id, e4);
          } else {
            if (selected?.size)
              onSelect(null);
            setActivePage(page.id);
          }
        },
        onDblClick: (e4) => {
          e4.stopPropagation();
          onStartEditing(page.id);
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
          isEditing ? /* @__PURE__ */ u4("input", {
            ref: editRef,
            class: "page-title-edit",
            value: editVal,
            onInput: (e4) => setEditVal(e4.target.value),
            onBlur: commitEdit,
            onKeyDown: (e4) => {
              if (e4.key === "Enter") {
                e4.preventDefault();
                commitEdit();
              }
              if (e4.key === "Escape") {
                e4.preventDefault();
                onStartEditing(null);
              }
            },
            onClick: (e4) => e4.stopPropagation()
          }, undefined, false, undefined, this) : /* @__PURE__ */ u4("span", {
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
          onDragChange,
          editingId,
          onStartEditing,
          selected,
          onSelect,
          onBulkDelete
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
  const [editingId, setEditingId] = d2(null);
  const [selected, setSelected] = d2(new Set);
  const [confirmDelete, setConfirmDelete] = d2(false);
  const lastSelectedRef = A2(null);
  y2(() => {
    setSelected(new Set);
    lastSelectedRef.current = null;
  }, [ui.sectionId]);
  function onDragChange(id, mode) {
    setDragOver({ id, mode });
  }
  const onSelect = q2((pageId, e4) => {
    if (pageId === null) {
      setSelected(new Set);
      lastSelectedRef.current = null;
      return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (e4?.shiftKey && lastSelectedRef.current) {
        const range = getPageRange(pages, lastSelectedRef.current, pageId);
        for (const id of range)
          next.add(id);
      } else if (e4?.ctrlKey || e4?.metaKey) {
        if (next.has(pageId))
          next.delete(pageId);
        else
          next.add(pageId);
      } else {
        next.clear();
        next.add(pageId);
      }
      lastSelectedRef.current = pageId;
      return next;
    });
  }, [pages]);
  function doBulkDelete() {
    for (const id of selected) {
      const pg = findInTree(pages, id);
      if (pg)
        deletePageWithChildren(pg);
      else
        deletePage(id);
    }
    setSelected(new Set);
    setConfirmDelete(false);
  }
  y2(() => {
    function onKey(e4) {
      if (selected.size && (e4.key === "Delete" || e4.key === "Backspace") && !editingId) {
        e4.preventDefault();
        setConfirmDelete(true);
      }
      if (e4.key === "Escape") {
        if (confirmDelete)
          setConfirmDelete(false);
        else if (selected.size)
          setSelected(new Set);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, editingId, confirmDelete]);
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
          onDragChange,
          editingId,
          onStartEditing: setEditingId,
          selected,
          onSelect,
          onBulkDelete: doBulkDelete
        }, pg.id, false, undefined, this))
      }, undefined, false, undefined, this),
      confirmDelete && /* @__PURE__ */ u4("div", {
        class: "confirm-overlay",
        onClick: () => setConfirmDelete(false),
        children: /* @__PURE__ */ u4("div", {
          class: "confirm-dialog",
          onClick: (e4) => e4.stopPropagation(),
          children: [
            /* @__PURE__ */ u4("p", {
              children: [
                "Delete ",
                selected.size,
                " page",
                selected.size > 1 ? "s" : "",
                "?"
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ u4("p", {
              class: "confirm-sub",
              children: "This cannot be undone. Subpages will be promoted."
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              class: "confirm-buttons",
              children: [
                /* @__PURE__ */ u4("button", {
                  class: "confirm-cancel",
                  onClick: () => setConfirmDelete(false),
                  children: "Cancel"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ u4("button", {
                  class: "confirm-delete",
                  onClick: doBulkDelete,
                  children: "Delete"
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/Canvas.jsx
init_preact_module();
init_hooks_module();

// ../core/src/Block.jsx
init_hooks_module();
init_signals_module();
init_store();

// ../core/src/editor.js
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
  const container = window.getSelection()?.getRangeAt(0)?.startContainer;
  const li = container && (container.nodeType === Node.ELEMENT_NODE ? container.closest("li") : container.parentElement?.closest("li"));
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
  if (e4.key === "Tab") {
    e4.preventDefault();
    return true;
  }
  if (e4.key === "`") {
    setTimeout(() => handleInlineCode(el), 0);
  }
  return false;
}

// ../core/src/undo.js
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
  if (delta.type === "checklist") {
    const b2 = blocks.find((b3) => b3.id === delta.id);
    if (!b2)
      return null;
    const rev = { type: "checklist", id: b2.id, items: (b2.items || []).map((i4) => ({ ...i4 })) };
    b2.items = delta.items;
    return rev;
  }
  if (delta.type === "crop") {
    const b2 = blocks.find((b3) => b3.id === delta.id);
    if (!b2)
      return null;
    const rev = { type: "crop", id: b2.id, crop: b2.crop ?? null };
    b2.crop = delta.crop;
    return rev;
  }
  return null;
}

// ../core/src/clipboard.js
init_store();
function canvasCenter(container, view) {
  const { zoom } = view;
  const rect = container?.getBoundingClientRect();
  return {
    x: rect ? (rect.width / 2 + container.scrollLeft) / zoom : 100,
    y: rect ? (rect.height / 2 + container.scrollTop) / zoom : 100
  };
}
function pasteInsertPoint(container, view) {
  const { zoom } = view;
  if (!container)
    return { x: 40, y: 40, w: 600 };
  const margin = 40;
  return {
    x: container.scrollLeft / zoom + margin,
    y: container.scrollTop / zoom + margin,
    w: Math.round(container.clientWidth * (2 / 3) / zoom)
  };
}
function toHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
}
function _liToMd(li, indent) {
  let text = "";
  let nested = "";
  for (const c4 of li.childNodes) {
    if (c4.nodeType === Node.ELEMENT_NODE && (c4.tagName === "UL" || c4.tagName === "OL"))
      nested += `
` + _nodeToMd(c4, indent + "    ");
    else
      text += _nodeToMd(c4, indent);
  }
  return text.trim() + nested.trimEnd();
}
function _nodeToMd(node, indent = "") {
  if (node.nodeType === Node.TEXT_NODE)
    return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE)
    return "";
  const tag = node.tagName.toLowerCase();
  const inner = () => [...node.childNodes].map((c4) => _nodeToMd(c4, indent)).join("");
  switch (tag) {
    case "strong":
    case "b":
      return `**${inner()}**`;
    case "em":
    case "i":
      return `*${inner()}*`;
    case "s":
    case "strike":
    case "del":
      return `~~${inner()}~~`;
    case "code":
      return `\`${inner()}\``;
    case "a": {
      const href = node.getAttribute("href") || "";
      const t4 = inner();
      return href ? `[${t4}](${href})` : t4;
    }
    case "br":
      return `
`;
    case "h1":
      return `# ${inner()}

`;
    case "h2":
      return `## ${inner()}

`;
    case "h3":
      return `### ${inner()}

`;
    case "h4":
      return `#### ${inner()}

`;
    case "h5":
      return `##### ${inner()}

`;
    case "h6":
      return `###### ${inner()}

`;
    case "ul": {
      let r4 = "";
      for (const c4 of node.childNodes) {
        if (c4.nodeType !== Node.ELEMENT_NODE)
          continue;
        if (c4.tagName === "LI")
          r4 += `${indent}- ${_liToMd(c4, indent)}
`;
        else if (c4.tagName === "UL" || c4.tagName === "OL")
          r4 += _nodeToMd(c4, indent + "    ");
      }
      return r4 + (indent ? "" : `
`);
    }
    case "ol": {
      let r4 = "";
      let i4 = 1;
      for (const c4 of node.childNodes) {
        if (c4.nodeType !== Node.ELEMENT_NODE)
          continue;
        if (c4.tagName === "LI")
          r4 += `${indent}${i4++}. ${_liToMd(c4, indent)}
`;
        else if (c4.tagName === "UL" || c4.tagName === "OL")
          r4 += _nodeToMd(c4, indent + "    ");
      }
      return r4 + (indent ? "" : `
`);
    }
    case "li":
      return `${indent}- ${_liToMd(node, indent)}
`;
    case "p":
      return `${inner()}

`;
    case "div": {
      if (node.childNodes.length === 1 && node.firstChild?.nodeName === "BR")
        return `
`;
      const c4 = inner();
      return c4 ? `${c4}
` : "";
    }
    default:
      return inner();
  }
}
function htmlToMarkdown(html) {
  const wrap = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html").body.firstChild;
  return _nodeToMd(wrap).replace(/\n{3,}/g, `

`).trim();
}
function initPasteHandler({ getContainer, getView }) {
  function onPaste(e4) {
    const items = [...e4.clipboardData?.items || []];
    const pastedFiles = [...e4.clipboardData?.files || []].filter((f5) => f5.type.startsWith("image/"));
    if (pastedFiles.length) {
      e4.preventDefault();
      const { x: x4, y: y5 } = canvasCenter(getContainer(), getView());
      pastedFiles.forEach((file, i4) => addImageFromFile(file, x4 + i4 * 20, y5 + i4 * 20));
      return;
    }
    const imageItem = items.find((i4) => i4.type.startsWith("image/"));
    if (imageItem) {
      e4.preventDefault();
      const file = imageItem.getAsFile();
      if (!file)
        return;
      const { x: x4, y: y5 } = canvasCenter(getContainer(), getView());
      addImageFromFile(file, x4, y5);
      return;
    }
    const html = e4.clipboardData?.getData("text/html") || "";
    if (html && addImageFromUrl) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const srcs = [...doc.querySelectorAll("img")].map((img) => img.src).filter((src) => src && !src.startsWith("data:"));
      if (srcs.length) {
        const { x: x4, y: y5 } = canvasCenter(getContainer(), getView());
        srcs.forEach((src, i4) => addImageFromUrl(src, x4 + i4 * 20, y5 + i4 * 20));
      }
    }
    if (document.activeElement?.closest("[contenteditable]"))
      return;
    const text = e4.clipboardData?.getData("text/plain") || "";
    if (!text.trim())
      return;
    e4.preventDefault();
    const { x: x3, y: y4, w: w4 } = pasteInsertPoint(getContainer(), getView());
    addBlock(x3, y4, w4, "text", { html: toHtml(text) });
  }
  document.addEventListener("paste", onPaste);
  return () => document.removeEventListener("paste", onPaste);
}

// ../core/src/Block.jsx
function computeTextDiff(oldText, newText) {
  let p5 = 0;
  const minLen = Math.min(oldText.length, newText.length);
  while (p5 < minLen && oldText[p5] === newText[p5])
    p5++;
  let oldEnd = oldText.length;
  let newEnd = newText.length;
  while (oldEnd > p5 && newEnd > p5 && oldText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }
  const diffs = [];
  if (oldEnd > p5)
    diffs.push({ type: "delete", pos: p5, count: oldEnd - p5 });
  const ins = newText.slice(p5, newEnd);
  if (ins)
    diffs.push({ type: "insert", pos: p5, text: ins });
  return diffs;
}
var linkMenu = c3(null);
function LinkContextMenu() {
  const m4 = linkMenu.value;
  if (!m4)
    return null;
  const close = () => {
    linkMenu.value = null;
  };
  const openLink = () => {
    if (window.notebook?.openExternal)
      window.notebook.openExternal(m4.href);
    close();
  };
  const editLink = () => {
    const url = prompt("Edit URL:", m4.href);
    if (url != null) {
      m4.anchorEl.href = url;
      const blockEl = m4.anchorEl.closest(".block-content");
      if (blockEl) {
        updateBlockHtml(m4.blockId, blockEl.innerHTML);
      }
    }
    close();
  };
  const removeLink = () => {
    const parent = m4.anchorEl.parentNode;
    while (m4.anchorEl.firstChild)
      parent.insertBefore(m4.anchorEl.firstChild, m4.anchorEl);
    parent.removeChild(m4.anchorEl);
    const blockEl = parent.closest(".block-content");
    if (blockEl) {
      updateBlockHtml(m4.blockId, blockEl.innerHTML);
    }
    close();
  };
  return /* @__PURE__ */ u4("div", {
    class: "link-menu",
    style: { left: m4.x + "px", top: m4.y + "px" },
    onMouseDown: (e4) => e4.stopPropagation(),
    children: [
      /* @__PURE__ */ u4("div", {
        class: "link-menu-url",
        title: m4.href,
        children: m4.href.length > 40 ? m4.href.slice(0, 37) + "..." : m4.href
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "link-menu-actions",
        children: [
          /* @__PURE__ */ u4("button", {
            class: "link-menu-btn",
            onClick: openLink,
            children: "Open"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "link-menu-btn",
            onClick: editLink,
            children: "Edit"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "link-menu-btn link-menu-btn--danger",
            onClick: removeLink,
            children: "Remove"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
if (typeof document !== "undefined") {
  document.addEventListener("mousedown", () => {
    linkMenu.value = null;
  });
}
var LINK_URL_RE = /https?:\/\/[^\s<>"{}|\\^`[\]]+(?<![.,;:!?])/g;
function linkifyText(text) {
  let hasUrl = false;
  const segments = [];
  let last = 0;
  LINK_URL_RE.lastIndex = 0;
  let m4;
  while ((m4 = LINK_URL_RE.exec(text)) !== null) {
    hasUrl = true;
    const before = text.slice(last, m4.index).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
    segments.push(before);
    const url = m4[0];
    const esc = url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    segments.push(`<a href="${esc}">${esc}</a>`);
    last = m4.index + url.length;
  }
  if (!hasUrl)
    return null;
  const trailing = text.slice(last).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
  segments.push(trailing);
  return segments.join("");
}
var PASTE_ALLOWED = new Set([
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "s",
  "del",
  "strike",
  "code",
  "pre",
  "blockquote",
  "a"
]);
function sanitizePastedHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE)
      return document.createTextNode(node.textContent);
    if (node.nodeType !== Node.ELEMENT_NODE)
      return null;
    const tag = node.tagName.toLowerCase();
    const children = document.createDocumentFragment();
    for (const child of [...node.childNodes]) {
      const r4 = walk(child);
      if (r4)
        children.appendChild(r4);
    }
    if (!PASTE_ALLOWED.has(tag))
      return children;
    const out = document.createElement(tag === "strong" ? "b" : tag === "em" ? "i" : tag === "strike" ? "s" : tag);
    if (tag === "a") {
      const href = node.getAttribute("href");
      if (href)
        out.setAttribute("href", href);
    }
    out.appendChild(children);
    return out;
  }
  const frag = document.createDocumentFragment();
  for (const child of [...doc.body.childNodes]) {
    const r4 = walk(child);
    if (r4)
      frag.appendChild(r4);
  }
  const div = document.createElement("div");
  div.appendChild(frag);
  return div.innerHTML;
}
function Block({ block, page }) {
  const ctx = x2(CanvasCtx);
  const contentRef = A2(null);
  const isImage = block.type === "image";
  const isLoading = block.type === "loading";
  const isChecklist = block.type === "checklist";
  const isSelected = ctx.selectedIds.has(block.id);
  const isNotebookBlob = (s5) => s5.startsWith("blob:") && !s5.includes("/");
  const rawSrc = block.src || "";
  const [resolvedSrc, setResolvedSrc] = d2(isNotebookBlob(rawSrc) ? null : rawSrc);
  const [naturalSize, setNaturalSize] = d2(null);
  const [cropping, setCropping] = d2(false);
  const [pendingCrop, setPendingCrop] = d2(null);
  const pendingCropRef = A2(null);
  const [borderOn, setBorderOn] = d2(!!block.border);
  y2(() => {
    setBorderOn(!!block.border);
  }, [block.border]);
  const itemRefs = A2({});
  const toggleBorder = () => {
    const next = !borderOn;
    setBorderOn(next);
    updateBlockBorder(block.id, next);
  };
  const getItemsWithDOMText = () => (block.items || []).map((i4) => ({ ...i4, text: itemRefs.current[i4.id]?.textContent ?? i4.text }));
  const toggleCheckItem = (itemId) => {
    const items = getItemsWithDOMText().map((i4) => i4.id === itemId ? { ...i4, checked: !i4.checked } : i4);
    updateChecklistItems(block.id, items);
  };
  const handleItemKeyDown = (e4, itemId) => {
    const mod = e4.ctrlKey || e4.metaKey;
    if (mod && e4.key === "z") {
      e4.preventDefault();
      e4.shiftKey ? ctx.redo() : ctx.undo();
      return;
    }
    const items = block.items || [];
    const idx = items.findIndex((i4) => i4.id === itemId);
    if (e4.key === "Enter") {
      e4.preventDefault();
      const newItem = { id: uid(), text: "", checked: false };
      const current = getItemsWithDOMText();
      const newItems = [...current.slice(0, idx + 1), newItem, ...current.slice(idx + 1)];
      updateChecklistItems(block.id, newItems);
      requestAnimationFrame(() => itemRefs.current[newItem.id]?.focus());
      return;
    }
    if (e4.key === "Backspace" && e4.target.textContent === "") {
      e4.preventDefault();
      if (items.length <= 1) {
        deleteBlock(block.id);
        return;
      }
      const prevItem = items[Math.max(0, idx - 1)];
      const newItems = getItemsWithDOMText().filter((i4) => i4.id !== itemId);
      updateChecklistItems(block.id, newItems);
      requestAnimationFrame(() => {
        const el = itemRefs.current[prevItem.id];
        if (el) {
          el.focus();
          const r4 = document.createRange();
          r4.selectNodeContents(el);
          r4.collapse(false);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(r4);
        }
      });
      return;
    }
  };
  const handleItemBlur = () => {
    updateChecklistItemsSilent(block.id, getItemsWithDOMText());
  };
  const captionRef = A2(null);
  const [captionEditing, setLegendEditing] = d2(false);
  const nw = naturalSize?.w ?? block.crop?.nw ?? null;
  const nh = naturalSize?.h ?? block.crop?.nh ?? null;
  y2(() => {
    if (!isImage)
      return;
    if (isNotebookBlob(rawSrc)) {
      const hash = rawSrc.slice(5);
      window.notebook.getBlob(hash).then((dataUrl) => {
        if (dataUrl)
          setResolvedSrc(dataUrl);
      });
    } else {
      setResolvedSrc(rawSrc);
    }
  }, [rawSrc, isImage]);
  _2(() => {
    const el = contentRef.current;
    if (el && el.innerHTML !== block.html) {
      el.innerHTML = block.html;
      prevTextRef.current = el.innerText || "";
    }
  }, [block.html]);
  const undoTimer = A2(null);
  const htmlAtFocus = A2(null);
  const prevTextRef = A2(null);
  const handleInput = () => {
    const el = contentRef.current;
    if (!el)
      return;
    const result = handleMarkdownInput(el);
    if (result === "code")
      updateBlockType(block.id, "code");
    const newText = el.innerText || "";
    const oldText = prevTextRef.current ?? "";
    const diffs = computeTextDiff(oldText, newText);
    prevTextRef.current = newText;
    updateBlockHtmlLocal(block.id, el.innerHTML);
    updateBlockTextDiff(block.id, diffs);
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
    prevTextRef.current = contentRef.current?.innerText || "";
    ctx.onBlockFocus?.(block.id);
  };
  const handleContentClick = (e4) => {
    const anchor = e4.target.closest("a[href]");
    if (!anchor)
      return;
    e4.preventDefault();
    if (window.notebook?.openExternal)
      window.notebook.openExternal(anchor.href);
  };
  const handleContentContextMenu = (e4) => {
    const anchor = e4.target.closest("a[href]");
    if (anchor) {
      e4.preventDefault();
      e4.stopPropagation();
      linkMenu.value = { x: e4.clientX, y: e4.clientY, href: anchor.href, anchorEl: anchor, blockId: block.id };
      return;
    }
    e4.preventDefault();
    e4.stopPropagation();
    const selText = window.getSelection().toString();
    const items = [];
    if (selText) {
      items.push({ label: "Copy", action: () => document.execCommand("copy") });
      const sel = window.getSelection();
      const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
      const div = document.createElement("div");
      if (range)
        div.appendChild(range.cloneContents());
      const md = htmlToMarkdown(div.innerHTML);
      items.push({ label: "Copy as Markdown", action: () => navigator.clipboard.writeText(md) });
    } else {
      items.push({ label: "Copy", disabled: true });
      items.push({ label: "Copy as Markdown", disabled: true });
    }
    items.push({ label: "Paste", action: () => {
      navigator.clipboard.readText().then((text) => {
        if (text)
          document.execCommand("insertText", false, text);
      });
    } });
    if (selText) {
      items.push({ type: "separator" });
      const q3 = encodeURIComponent(selText);
      items.push({ label: "Search with Google", action: () => {
        window.notebook?.openExternal("https://www.google.com/search?q=" + q3);
      } });
      items.push({ label: "Ask ChatGPT", action: () => {
        window.notebook?.openExternal("https://chatgpt.com/?q=" + q3);
      } });
    }
    openContextMenu(e4.clientX, e4.clientY, items);
  };
  const handleImageContextMenu = (e4) => {
    e4.preventDefault();
    e4.stopPropagation();
    const items = [
      { label: "Copy", action: () => {
        const img = e4.target.closest(".img-frame")?.querySelector("img");
        if (!img)
          return;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d").drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob)
            navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        });
      } },
      { label: "Paste", action: () => {
        navigator.clipboard.readText().then((text) => {
          if (text)
            document.execCommand("insertText", false, text);
        });
      } }
    ];
    openContextMenu(e4.clientX, e4.clientY, items);
  };
  const handleCopy = (e4) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed)
      return;
    const range = sel.getRangeAt(0);
    const div = document.createElement("div");
    div.appendChild(range.cloneContents());
    const selectedHtml = div.innerHTML;
    const markdown = htmlToMarkdown(selectedHtml);
    if (!markdown)
      return;
    e4.preventDefault();
    e4.clipboardData.setData("text/plain", sel.toString());
    e4.clipboardData.setData("text/html", selectedHtml);
    e4.clipboardData.setData("text/markdown", markdown);
  };
  const handlePaste = (e4) => {
    if ([...e4.clipboardData?.items || []].some((i4) => i4.type.startsWith("image/")))
      return;
    e4.preventDefault();
    const text = e4.clipboardData?.getData("text/plain") || "";
    const trimmed = text.trim();
    const isPureUrl = /^https?:\/\/\S+$/.test(trimmed);
    if (isPureUrl) {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) {
        document.execCommand("createLink", false, trimmed);
      } else {
        const esc = trimmed.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        document.execCommand("insertHTML", false, `<a href="${esc}">${esc}</a>`);
      }
      return;
    }
    const html = e4.clipboardData?.getData("text/html");
    if (html) {
      document.execCommand("insertHTML", false, sanitizePastedHtml(html));
      return;
    }
    if (!text)
      return;
    const linked = linkifyText(text);
    if (linked) {
      document.execCommand("insertHTML", false, linked);
    } else {
      document.execCommand("insertText", false, text);
    }
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
    if (isEmpty) {
      deleteBlock(block.id);
    } else {
      updateBlockHtml(block.id, html);
    }
    ctx.onBlockBlur?.(block.id);
  };
  const handleImgLoad = (e4) => {
    setNaturalSize({ w: e4.target.naturalWidth, h: e4.target.naturalHeight });
  };
  const handleImgDoubleClick = (e4) => {
    if (!nw || !nh)
      return;
    e4.stopPropagation();
    const initCrop = block.crop ? { x: block.crop.x, y: block.crop.y, w: block.crop.w, h: block.crop.h } : { x: 0, y: 0, w: nw, h: nh };
    pendingCropRef.current = initCrop;
    setPendingCrop(initCrop);
    setCropping(true);
  };
  y2(() => {
    if (!cropping)
      return;
    const onKey = (e4) => {
      if (e4.key === "Escape") {
        setCropping(false);
        setPendingCrop(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cropping]);
  _2(() => {
    const el = captionRef.current;
    if (el && el.innerText !== (block.caption || "")) {
      el.innerText = block.caption || "";
    }
  }, [block.caption]);
  y2(() => {
    if (!captionEditing || !captionRef.current)
      return;
    const el = captionRef.current;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }, [captionEditing]);
  y2(() => {
    if (!isSelected)
      setLegendEditing(false);
  }, [isSelected]);
  y2(() => {
    if (!isSelected || !isImage)
      return;
    const onKey = (e4) => {
      if (e4.key === "Enter" && !captionEditing && !cropping && !document.activeElement?.isContentEditable) {
        e4.preventDefault();
        setLegendEditing(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSelected, isImage, captionEditing, cropping]);
  const handleLegendKeyDown = (e4) => {
    if (e4.key === "Enter") {
      e4.preventDefault();
      captionRef.current?.blur();
    }
    if (e4.key === "Escape") {
      if (captionRef.current)
        captionRef.current.innerText = block.caption || "";
      captionRef.current?.blur();
    }
  };
  const handleLegendBlur = () => {
    const text = captionRef.current?.innerText?.trim() || "";
    setLegendEditing(false);
    updateBlockCaption(block.id, text || null);
  };
  _2(() => {
    if (!isChecklist)
      return;
    for (const item of block.items || []) {
      const el = itemRefs.current[item.id];
      if (el && el.textContent !== item.text)
        el.textContent = item.text;
    }
  }, [block.items]);
  const startCropDrag = (e4, dir) => {
    e4.preventDefault();
    e4.stopPropagation();
    const zoom = ctx.getZoom();
    const imgScale = block.w / nw;
    const { clientX: startX, clientY: startY } = e4;
    const origCrop = { ...pendingCropRef.current };
    function onMove(e22) {
      const dx = (e22.clientX - startX) / zoom / imgScale;
      const dy = (e22.clientY - startY) / zoom / imgScale;
      let { x: x3, y: y4, w: w4, h: h5 } = origCrop;
      if (dir.includes("e"))
        w4 = Math.max(20, Math.min(nw - x3, w4 + dx));
      if (dir.includes("w")) {
        const d5 = Math.max(-x3, Math.min(w4 - 20, dx));
        x3 += d5;
        w4 -= d5;
      }
      if (dir.includes("s"))
        h5 = Math.max(20, Math.min(nh - y4, h5 + dy));
      if (dir.includes("n")) {
        const d5 = Math.max(-y4, Math.min(h5 - 20, dy));
        y4 += d5;
        h5 -= d5;
      }
      const nc = { x: x3, y: y4, w: w4, h: h5 };
      pendingCropRef.current = nc;
      setPendingCrop(nc);
    }
    function onUp() {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      const fc = pendingCropRef.current;
      const isFullImage = fc.x <= 2 && fc.y <= 2 && fc.w >= nw - 2 && fc.h >= nh - 2;
      const cropToSave = isFullImage ? null : { ...fc, nw, nh };
      const pg = getActivePage();
      if (pg)
        pushUndo(pg.id, { type: "crop", id: block.id, crop: block.crop ?? null });
      updateBlockCrop(block.id, cropToSave);
      setCropping(false);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };
  const handleBlockPointerDown = (e4) => {
    e4.stopPropagation();
    if (cropping)
      return;
    const onContent = e4.target.closest(".block-content, .block-handle, .block-resize, .img-resize, .block-drag-overlay, .img-border-btn, .block-checklist");
    if (!onContent) {
      ctx.onBlockDragStart(e4, block.id);
    }
  };
  return /* @__PURE__ */ u4("div", {
    class: ["block", isImage && "block--image", isLoading && "block--loading", isSelected && "block--selected"].filter(Boolean).join(" "),
    "data-block-id": block.id,
    style: { left: block.x + "px", top: block.y + "px", width: block.w + "px", zIndex: block.z ?? 0 },
    onPointerDown: handleBlockPointerDown,
    children: [
      !isImage && /* @__PURE__ */ u4("div", {
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
      isLoading ? /* @__PURE__ */ u4("div", {
        class: "block-loading",
        children: /* @__PURE__ */ u4("div", {
          class: "block-loading-spinner"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this) : isImage ? /* @__PURE__ */ u4(k, {
        children: [
          /* @__PURE__ */ u4("div", {
            class: "img-media-area",
            children: [
              isSelected && !cropping && /* @__PURE__ */ u4("button", {
                class: `img-border-btn${borderOn ? " img-border-btn--active" : ""}`,
                title: "Toggle border",
                onPointerDown: (e4) => e4.stopPropagation(),
                onClick: (e4) => {
                  e4.stopPropagation();
                  toggleBorder();
                },
                children: /* @__PURE__ */ u4("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  children: /* @__PURE__ */ u4("rect", {
                    x: "1.5",
                    y: "1.5",
                    width: "13",
                    height: "13",
                    rx: "1",
                    stroke: borderOn ? "#8a4f00" : "#888",
                    "stroke-width": block.border ? "2" : "1.5",
                    fill: "none"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("div", {
                class: "img-frame",
                style: !cropping && block.crop && nw ? {
                  position: "relative",
                  overflow: "hidden",
                  height: `${block.crop.h * block.w / block.crop.w}px`,
                  outline: borderOn ? "1px solid #000" : undefined
                } : { position: "relative", overflow: cropping ? "hidden" : undefined, outline: borderOn ? "1px solid #000" : undefined },
                children: [
                  /* @__PURE__ */ u4("img", {
                    src: resolvedSrc || "",
                    draggable: false,
                    onLoad: handleImgLoad,
                    style: !cropping && block.crop && nw ? {
                      position: "absolute",
                      width: `${nw * block.w / block.crop.w}px`,
                      maxWidth: "none",
                      left: `${-block.crop.x * block.w / block.crop.w}px`,
                      top: `${-block.crop.y * block.w / block.crop.w}px`
                    } : { width: "100%", display: "block" }
                  }, undefined, false, undefined, this),
                  cropping && pendingCrop && nw && nh && /* @__PURE__ */ u4("div", {
                    class: "crop-overlay",
                    children: /* @__PURE__ */ u4("div", {
                      class: "crop-box",
                      style: {
                        left: `${pendingCrop.x * (block.w / nw)}px`,
                        top: `${pendingCrop.y * (block.w / nw)}px`,
                        width: `${pendingCrop.w * (block.w / nw)}px`,
                        height: `${pendingCrop.h * (block.w / nw)}px`
                      },
                      children: ["n", "s", "e", "w", "ne", "nw", "se", "sw"].map((dir) => /* @__PURE__ */ u4("div", {
                        class: `crop-handle crop-handle--${dir}`,
                        onPointerDown: (e4) => startCropDrag(e4, dir)
                      }, dir, false, undefined, this))
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              !cropping && ["nw", "ne", "sw", "se"].map((dir) => /* @__PURE__ */ u4("div", {
                class: `img-resize img-resize--${dir}`,
                onPointerDown: (e4) => {
                  e4.stopPropagation();
                  ctx.onImgResizeStart(e4, block.id, dir);
                }
              }, dir, false, undefined, this)),
              !cropping && /* @__PURE__ */ u4("div", {
                class: "block-drag-overlay",
                onPointerDown: (e4) => {
                  e4.stopPropagation();
                  ctx.onBlockDragStart(e4, block.id);
                },
                onDblClick: handleImgDoubleClick,
                onContextMenu: handleImageContextMenu
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          block.caption || captionEditing ? /* @__PURE__ */ u4("div", {
            ref: captionRef,
            class: "img-caption",
            contentEditable: "true",
            "data-placeholder": "Add a caption…",
            onKeyDown: handleLegendKeyDown,
            onBlur: handleLegendBlur,
            onPointerDown: (e4) => e4.stopPropagation(),
            suppressContentEditableWarning: true
          }, undefined, false, undefined, this) : isSelected && !cropping && /* @__PURE__ */ u4("div", {
            class: "img-caption-hint",
            children: "Press [Enter] to add caption"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this) : isChecklist ? /* @__PURE__ */ u4("div", {
        class: "block-checklist",
        children: (block.items || []).map((item) => /* @__PURE__ */ u4("div", {
          class: `cb-row${item.checked ? " cb-row--checked" : ""}`,
          children: [
            /* @__PURE__ */ u4("button", {
              class: `cb-check${item.checked ? " cb-check--checked" : ""}`,
              onPointerDown: (e4) => e4.stopPropagation(),
              onClick: (e4) => {
                e4.stopPropagation();
                toggleCheckItem(item.id);
              }
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("span", {
              ref: (el) => {
                if (el)
                  itemRefs.current[item.id] = el;
                else
                  delete itemRefs.current[item.id];
              },
              class: "cb-text",
              contentEditable: "true",
              "data-placeholder": "List item",
              "data-item-id": item.id,
              onKeyDown: (e4) => handleItemKeyDown(e4, item.id),
              onBlur: handleItemBlur,
              onPointerDown: (e4) => e4.stopPropagation(),
              suppressContentEditableWarning: true
            }, undefined, false, undefined, this)
          ]
        }, item.id, true, undefined, this))
      }, undefined, false, undefined, this) : /* @__PURE__ */ u4("div", {
        ref: contentRef,
        class: ["block-content", block.type === "code" && "code-block"].filter(Boolean).join(" "),
        contentEditable: "true",
        "data-placeholder": "Start typing…",
        "data-code": block.type === "code" ? "1" : undefined,
        onKeyDown: handleKeyDown,
        onInput: handleInput,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClick: handleContentClick,
        onCopy: handleCopy,
        onPaste: handlePaste,
        onContextMenu: handleContentContextMenu,
        onPointerDown: (e4) => e4.stopPropagation(),
        suppressContentEditableWarning: true
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/Canvas.jsx
init_store();
var CanvasCtx = R(null);
async function buildShareUrl() {
  const { ui, notebooks } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((s5) => s5.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  if (!sec || !page)
    return null;
  const hash = `#!/${encodeURIComponent(sec.title)}/${encodeURIComponent(page.title)}/`;
  const pg = getActivePage();
  const params = [`p=${page.id.slice(0, 6)}`];
  if (pg?.panX)
    params.push(`x=${Math.round(pg.panX)}`);
  if (pg?.panY)
    params.push(`y=${Math.round(pg.panY)}`);
  const qs = "?" + params.join("&");
  const base = window.__ghPagesUrl || (window.notebook?.getPublishUrl ? await window.notebook.getPublishUrl() : null) || (window.location ? window.location.origin + window.location.pathname : "");
  return base + hash + qs;
}
function ShareButton() {
  const handleShare = async (e4) => {
    e4.preventDefault();
    const url = await buildShareUrl();
    if (!url)
      return;
    navigator.clipboard.writeText(url).then(() => {
      const btn = e4.currentTarget;
      const orig = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = orig;
      }, 1500);
    });
  };
  return /* @__PURE__ */ u4("button", {
    class: "fmt-btn",
    title: "Copy link to this page",
    onMouseDown: handleShare,
    children: "\uD83D\uDD17 Share"
  }, undefined, false, undefined, this);
}
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
  return /* @__PURE__ */ u4(k, {
    children: [
      /* @__PURE__ */ u4("div", {
        id: "titlebar",
        children: [
          /* @__PURE__ */ u4("span", {
            class: "toolbar-title",
            children: "Notebound"
          }, undefined, false, undefined, this),
          !/Mac/.test(navigator.platform) && /* @__PURE__ */ u4("div", {
            class: "window-controls",
            children: [
              /* @__PURE__ */ u4("button", {
                class: "wc-btn wc-minimize",
                onClick: () => window.windowControls.minimize(),
                title: "Minimize",
                children: /* @__PURE__ */ u4("svg", {
                  width: "10",
                  height: "1",
                  viewBox: "0 0 10 1",
                  children: /* @__PURE__ */ u4("rect", {
                    width: "10",
                    height: "1",
                    fill: "currentColor"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "wc-btn wc-maximize",
                onClick: () => window.windowControls.maximize(),
                title: "Maximize",
                children: /* @__PURE__ */ u4("svg", {
                  width: "10",
                  height: "10",
                  viewBox: "0 0 10 10",
                  children: /* @__PURE__ */ u4("rect", {
                    x: "0.5",
                    y: "0.5",
                    width: "9",
                    height: "9",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "wc-btn wc-close",
                onClick: () => window.windowControls.close(),
                title: "Close",
                children: /* @__PURE__ */ u4("svg", {
                  width: "10",
                  height: "10",
                  viewBox: "0 0 10 10",
                  children: [
                    /* @__PURE__ */ u4("line", {
                      x1: "0",
                      y1: "0",
                      x2: "10",
                      y2: "10",
                      stroke: "currentColor",
                      "stroke-width": "1.2"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ u4("line", {
                      x1: "10",
                      y1: "0",
                      x2: "0",
                      y2: "10",
                      stroke: "currentColor",
                      "stroke-width": "1.2"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4("div", {
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
            class: "fmt-sep"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "fmt-btn",
            title: "Add checklist",
            onMouseDown: (e4) => {
              e4.preventDefault();
              const pg = getActivePage();
              let y4 = 60;
              if (pg?.blocks?.length) {
                y4 = Math.max(...pg.blocks.map((b2) => b2.y + 100)) + 40;
              }
              const itemId = uid();
              addBlock(0, y4, DEFAULT_BLOCK_WIDTH, "checklist", { items: [{ id: itemId, text: "", checked: false }] });
              requestAnimationFrame(() => {
                const el = document.querySelector(`[data-item-id="${itemId}"]`);
                el?.focus();
              });
            },
            children: "☑ List"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("span", {
            class: "fmt-sep"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "fmt-btn fmt-btn--wand",
            title: "Drag onto canvas to chat with Claude",
            draggable: true,
            onDragStart: (e4) => {
              e4.dataTransfer.setData("application/x-notebound-claude", "1");
            },
            children: "✨"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("span", {
            class: "canvas-hint",
            children: "Click to add block · Space+drag to pan · Ctrl+scroll zoom"
          }, undefined, false, undefined, this),
          window.notebook?.webPublish && /* @__PURE__ */ u4(k, {
            children: [
              /* @__PURE__ */ u4("span", {
                class: "fmt-sep"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "fmt-btn fmt-btn--publish",
                title: "Publish to web",
                onMouseDown: async (e4) => {
                  e4.preventDefault();
                  const btn = e4.currentTarget;
                  btn.classList.add("publishing");
                  try {
                    await window.notebook.webPublish();
                  } catch (err) {
                    console.error("Publish failed:", err);
                  }
                  btn.classList.remove("publishing");
                },
                children: "\uD83C\uDF10 Publish"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "fmt-btn",
                title: "Open published site",
                onMouseDown: async (e4) => {
                  e4.preventDefault();
                  const url = await buildShareUrl();
                  if (url)
                    window.notebook.openExternal(url);
                },
                children: "↗ Open"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "fmt-btn",
                title: "Open export folder on disk",
                onMouseDown: (e4) => {
                  e4.preventDefault();
                  window.notebook.webOpenDir();
                },
                children: "\uD83D\uDCC2 Folder"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4(ShareButton, {}, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function getCaretOffset(el) {
  const sel = window.getSelection();
  if (!sel.rangeCount || !el.contains(sel.anchorNode))
    return 0;
  const range = document.createRange();
  range.selectNodeContents(el);
  range.setEnd(sel.anchorNode, sel.anchorOffset);
  return range.toString().length;
}
function setCaretOffset(el, offset) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let pos = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const len = node.textContent.length;
    if (pos + len >= offset) {
      const sel = window.getSelection();
      const range = document.createRange();
      range.setStart(node, Math.min(offset - pos, len));
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      return;
    }
    pos += len;
  }
}
function hasNonEmptyBlocks(page) {
  return page.blocks.some((b2) => b2.type === "image" || b2.html && b2.html !== "<br>" && b2.html.trim() !== "");
}
function PageTitle({ page, onEnter }) {
  const ref = A2(null);
  const titleEditing = A2(false);
  _2(() => {
    if (ref.current && !titleEditing.current)
      ref.current.textContent = page?.title ?? "";
  }, [page?.id, page?.title]);
  y2(() => {
    if (!page)
      return;
    if (hasNonEmptyBlocks(page)) {
      const saved = lastCaretPerPage.get(page.id);
      if (saved) {
        requestAnimationFrame(() => {
          const el2 = document.querySelector(`[data-block-id="${saved.blockId}"] .block-content`);
          if (el2) {
            el2.focus();
            setCaretOffset(el2, saved.offset);
          }
        });
        return;
      }
    }
    const el = ref.current;
    if (el) {
      el.focus();
      const sel = window.getSelection();
      sel.selectAllChildren(el);
      sel.collapseToEnd();
    }
  }, [page?.id]);
  if (!page)
    return /* @__PURE__ */ u4("div", {
      id: "page-title-bar"
    }, undefined, false, undefined, this);
  const editing = editingEnabled.value;
  const dateStr = page.createdAt ? new Date(page.createdAt).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : null;
  return /* @__PURE__ */ u4("div", {
    id: "page-title-bar",
    onClick: () => editing && ref.current?.focus(),
    children: [
      /* @__PURE__ */ u4("div", {
        ref,
        id: "page-title",
        contentEditable: true,
        suppressContentEditableWarning: true,
        onFocus: () => {
          titleEditing.current = true;
        },
        onBlur: (e4) => {
          titleEditing.current = false;
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
        },
        onContextMenu: (e4) => {
          e4.preventDefault();
          e4.stopPropagation();
          const selText = window.getSelection().toString();
          const items = [];
          if (selText) {
            items.push({ label: "Copy", action: () => document.execCommand("copy") });
          } else {
            items.push({ label: "Copy", disabled: true });
          }
          items.push({ label: "Paste", action: () => {
            navigator.clipboard.readText().then((text) => {
              if (text)
                document.execCommand("insertText", false, text);
            });
          } });
          if (selText) {
            items.push({ type: "separator" });
            const q3 = encodeURIComponent(selText);
            items.push({ label: "Search with Google", action: () => {
              window.notebook?.openExternal("https://www.google.com/search?q=" + q3);
            } });
            items.push({ label: "Ask ChatGPT", action: () => {
              window.notebook?.openExternal("https://chatgpt.com/?q=" + q3);
            } });
          }
          openContextMenu(e4.clientX, e4.clientY, items);
        }
      }, undefined, false, undefined, this),
      dateStr && /* @__PURE__ */ u4("div", {
        class: "page-date",
        children: dateStr
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function Canvas({ page }) {
  const containerRef = A2(null);
  const sizerRef = A2(null);
  const innerRef = A2(null);
  const marqueeRef = A2(null);
  const viewRef = A2({ zoom: 1 });
  const pageRef = A2(page);
  const spaceHeld = A2(false);
  const scrollSaveTimer = A2(null);
  const [transition, setTransition] = d2(null);
  const prevPageIdRef = A2(page?.id);
  const transitionTimers = A2({});
  y2(() => {
    const newId = page?.id;
    const oldId = prevPageIdRef.current;
    if (!newId || !oldId || newId === oldId) {
      prevPageIdRef.current = newId;
      return;
    }
    prevPageIdRef.current = newId;
    clearTimeout(transitionTimers.current.t1);
    clearTimeout(transitionTimers.current.t2);
    setTransition({ outId: oldId, inId: newId, phase: "out" });
    transitionTimers.current.t1 = setTimeout(() => {
      setTransition({ outId: oldId, inId: newId, phase: "in" });
      transitionTimers.current.t2 = setTimeout(() => setTransition(null), 125);
    }, 125);
  }, [page?.id]);
  const pageCacheRef = A2(new Map);
  if (page)
    pageCacheRef.current.set(page.id, page);
  const cachedPages = [...new Map([...preloadCache.value, ...pageCacheRef.current]).values()];
  const [selectedIds, setSelectedIds] = d2(new Set);
  const selectedRef = A2(selectedIds);
  y2(() => {
    pageRef.current = page;
  });
  function setSelected(ids) {
    selectedRef.current = ids;
    setSelectedIds(new Set(ids));
  }
  function updateSizer(targetScrollLeft, targetScrollTop) {
    if (!sizerRef.current || !containerRef.current)
      return;
    const pg = pageRef.current;
    const { zoom } = viewRef.current;
    let maxX = 0, maxY = 0;
    if (pg?.blocks?.length) {
      for (const b2 of pg.blocks) {
        maxX = Math.max(maxX, b2.x + (b2.w || DEFAULT_BLOCK_WIDTH));
        maxY = Math.max(maxY, b2.y + 300);
      }
    }
    const rect = containerRef.current.getBoundingClientRect();
    const sl = targetScrollLeft ?? containerRef.current.scrollLeft;
    const st = targetScrollTop ?? containerRef.current.scrollTop;
    const totalW = Math.max(maxX + 200, (sl + rect.width) / zoom + 200);
    const totalH = Math.max(maxY + 200, (st + rect.height) / zoom + 200);
    sizerRef.current.style.width = totalW * zoom + "px";
    sizerRef.current.style.height = totalH * zoom + "px";
  }
  const ZOOM_LEVELS = [0.5, 0.6, 0.75, 0.8, 1, 1.25, 1.5, 2];
  function applyZoom(nz) {
    const el = containerRef.current;
    if (!el || !innerRef.current)
      return;
    const { zoom } = viewRef.current;
    const mx = el.clientWidth / 2;
    const my = el.clientHeight / 2;
    const cx = (mx + el.scrollLeft) / zoom;
    const cy = (my + el.scrollTop) / zoom;
    const newScrollLeft = Math.max(0, cx * nz - mx);
    const newScrollTop = Math.max(0, cy * nz - my);
    viewRef.current = { zoom: nz };
    innerRef.current.style.transform = `scale(${nz})`;
    updateSizer(newScrollLeft, newScrollTop);
    el.scrollLeft = newScrollLeft;
    el.scrollTop = newScrollTop;
    updatePageView(newScrollLeft / nz, newScrollTop / nz, nz);
  }
  y2(() => {
    function onZoom(dir) {
      const cur = viewRef.current.zoom;
      let nz;
      if (dir === "reset") {
        nz = 1;
      } else if (dir === "in") {
        nz = ZOOM_LEVELS.find((l5) => l5 > cur + 0.01) ?? ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
      } else {
        nz = [...ZOOM_LEVELS].reverse().find((l5) => l5 < cur - 0.01) ?? ZOOM_LEVELS[0];
      }
      applyZoom(nz);
    }
    window.notebook?.onCanvasZoom(onZoom);
    return () => window.notebook?.offCanvasZoom();
  }, []);
  _2(() => {
    if (!page || !containerRef.current || !innerRef.current)
      return;
    const zoom = page.zoom ?? 1;
    viewRef.current = { zoom };
    innerRef.current.style.transform = `scale(${zoom})`;
    const targetLeft = (page.panX ?? 0) * zoom;
    const targetTop = (page.panY ?? 0) * zoom;
    updateSizer(targetLeft, targetTop);
    containerRef.current.scrollLeft = targetLeft;
    containerRef.current.scrollTop = targetTop;
    setSelected(new Set);
  }, [page?.id]);
  y2(() => {
    updateSizer();
  }, [page?.blocks]);
  function toCanvas(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    const { zoom } = viewRef.current;
    return {
      x: (clientX - rect.left + containerRef.current.scrollLeft) / zoom,
      y: (clientY - rect.top + containerRef.current.scrollTop) / zoom
    };
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
    const origW = parseInt(el.style.width) || DEFAULT_BLOCK_WIDTH;
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
  function startPan(startClientX, startClientY) {
    const origLeft = containerRef.current.scrollLeft;
    const origTop = containerRef.current.scrollTop;
    function onMove(e4) {
      const dx = e4.clientX - startClientX;
      const dy = e4.clientY - startClientY;
      containerRef.current.scrollLeft = Math.max(0, origLeft - dx);
      containerRef.current.scrollTop = Math.max(0, origTop - dy);
    }
    function onUp() {
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
      mq.style.left = "0";
      mq.style.top = "0";
      mq.style.width = "0";
      mq.style.height = "0";
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
        if (editingEnabled.value) {
          marqueeActive = true;
          startMarquee(startX, startY);
        } else {
          startPan(startX, startY);
        }
      }
    }
    function onUp(e22) {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      if (!marqueeActive && editingEnabled.value) {
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
  function handleScroll() {
    updateSizer();
    const { zoom } = viewRef.current;
    const panX = containerRef.current.scrollLeft / zoom;
    const panY = containerRef.current.scrollTop / zoom;
    clearTimeout(scrollSaveTimer.current);
    scrollSaveTimer.current = setTimeout(() => {
      updatePageView(panX, panY, zoom);
    }, 150);
  }
  y2(() => {
    const el = containerRef.current;
    if (!el)
      return;
    function onWheel(e4) {
      if (!e4.ctrlKey && !e4.metaKey)
        return;
      e4.preventDefault();
      const { zoom } = viewRef.current;
      const rect = el.getBoundingClientRect();
      const mx = e4.clientX - rect.left;
      const my = e4.clientY - rect.top;
      const factor = e4.deltaY < 0 ? 1.1 : 0.9;
      const nz = Math.max(0.2, Math.min(4, zoom * factor));
      const cx = (mx + el.scrollLeft) / zoom;
      const cy = (my + el.scrollTop) / zoom;
      const newScrollLeft = Math.max(0, cx * nz - mx);
      const newScrollTop = Math.max(0, cy * nz - my);
      viewRef.current = { zoom: nz };
      innerRef.current.style.transform = `scale(${nz})`;
      updateSizer(newScrollLeft, newScrollTop);
      el.scrollLeft = newScrollLeft;
      el.scrollTop = newScrollTop;
      updatePageView(newScrollLeft / nz, newScrollTop / nz, nz);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
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
        const toDelete = [...selectedRef.current];
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
      if ((e4.key === "[" || e4.key === "]") && selectedRef.current.size && !e4.target.isContentEditable) {
        e4.preventDefault();
        const pg = getActivePage();
        if (!pg)
          return;
        for (const id of selectedRef.current) {
          const blk = pg.blocks.find((b2) => b2.id === id);
          if (!blk)
            continue;
          updateBlockZ(id, (blk.z ?? 0) + (e4.key === "]" ? 1 : -1));
        }
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
    const cleanupPaste = initPasteHandler({
      getContainer: () => containerRef.current,
      getView: () => viewRef.current
    });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      cleanupPaste();
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
  const IMAGE_URL_RE = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(\?|$)/i;
  function handleDrop(e4) {
    e4.preventDefault();
    if (e4.dataTransfer.types.includes("application/x-notebound-claude")) {
      startClaudeChat(e4.clientX - 180, e4.clientY - 20);
      return;
    }
    const pos = toCanvas(e4.clientX, e4.clientY);
    const uri = (e4.dataTransfer.getData("text/uri-list") || "").trim();
    if (uri && !uri.startsWith("#") && IMAGE_URL_RE.test(uri)) {
      addImageFromUrl(uri, pos.x, pos.y);
      return;
    }
    const files = [...e4.dataTransfer.files].filter((f5) => f5.type.startsWith("image/"));
    if (!files.length)
      return;
    files.forEach((file, i4) => {
      addImageFromFile(file, pos.x + i4 * 20, pos.y + i4 * 20);
    });
  }
  function focusFirstBlock() {
    const pg = getActivePage();
    if (!pg)
      return;
    let blk = pg.blocks.find((b2) => b2.type === "text" && b2.x === 0 && b2.y === 0);
    if (!blk) {
      blk = addBlock(0, 0);
    }
    const id = blk.id;
    setSelected(new Set);
    requestAnimationFrame(() => {
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"] .block-content`);
      if (el)
        el.focus();
    });
  }
  const ctx = {
    selectedIds,
    onBlockDragStart,
    onBlockResizeStart,
    onImgResizeStart,
    onBlockFocus: (id) => {},
    onBlockBlur: (id) => {
      if (!page)
        return;
      const el = innerRef.current?.querySelector(`[data-block-id="${id}"] .block-content`);
      const offset = el ? getCaretOffset(el) : 0;
      lastCaretPerPage.set(page.id, { blockId: id, offset });
      savePageCaret(page.id, id, offset);
    },
    undo: doUndo,
    redo: doRedo,
    getZoom: () => viewRef.current.zoom
  };
  return /* @__PURE__ */ u4(k, {
    children: [
      /* @__PURE__ */ u4(PageTitle, {
        page,
        onEnter: focusFirstBlock
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4(CanvasCtx.Provider, {
        value: ctx,
        children: /* @__PURE__ */ u4("div", {
          id: "canvas-wrapper",
          children: [
            /* @__PURE__ */ u4("div", {
              ref: containerRef,
              id: "canvas-container",
              onPointerDown: handlePointerDown,
              onScroll: handleScroll,
              onDragOver: (e4) => {
                if (e4.dataTransfer.types.includes("Files") || e4.dataTransfer.types.includes("application/x-notebound-claude"))
                  e4.preventDefault();
              },
              onDrop: handleDrop,
              children: /* @__PURE__ */ u4("div", {
                ref: sizerRef,
                id: "canvas-sizer",
                children: /* @__PURE__ */ u4("div", {
                  ref: innerRef,
                  id: "canvas-inner",
                  style: { transformOrigin: "0 0" },
                  children: cachedPages.map((p5) => {
                    let style;
                    if (transition) {
                      const showing = p5.id === transition.inId && transition.phase === "in";
                      style = showing ? undefined : { opacity: 0, pointerEvents: "none" };
                    } else {
                      style = p5.id !== page?.id ? { opacity: 0, pointerEvents: "none" } : undefined;
                    }
                    return /* @__PURE__ */ u4("div", {
                      class: "page-layer",
                      style,
                      children: p5.blocks.map((b2) => /* @__PURE__ */ u4(Block, {
                        block: b2,
                        page: p5
                      }, b2.id, false, undefined, this))
                    }, p5.id, false, undefined, this);
                  })
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              ref: marqueeRef,
              id: "marquee-rect"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/WelcomeScreen.jsx
init_store();
var truncPath = (p5) => {
  const home = p5.replace(/^\/Users\/[^/]+/, "~").replace(/^\/home\/[^/]+/, "~");
  return home.length > 48 ? "..." + home.slice(-45) : home;
};
function WelcomeScreen() {
  const recents = recentNotebooks.value;
  return /* @__PURE__ */ u4("div", {
    class: "welcome-overlay",
    children: /* @__PURE__ */ u4("div", {
      class: "welcome-card",
      children: [
        /* @__PURE__ */ u4("h1", {
          class: "welcome-title",
          children: "Notebound"
        }, undefined, false, undefined, this),
        /* @__PURE__ */ u4("p", {
          class: "welcome-subtitle",
          children: recents.length > 0 ? "Open a notebook to get started" : "Choose how to get started"
        }, undefined, false, undefined, this),
        /* @__PURE__ */ u4("div", {
          class: "welcome-list",
          children: [
            recents.map((r4) => /* @__PURE__ */ u4("div", {
              class: "welcome-list-item welcome-list-item--notebook",
              onClick: () => openNotebook(r4.path),
              children: [
                /* @__PURE__ */ u4("div", {
                  class: "welcome-list-item-icon",
                  children: /* @__PURE__ */ u4("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    children: [
                      /* @__PURE__ */ u4("rect", {
                        x: "2",
                        y: "2",
                        width: "12",
                        height: "12",
                        rx: "2",
                        fill: "var(--active-color)",
                        opacity: "0.15"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ u4("rect", {
                        x: "2",
                        y: "2",
                        width: "12",
                        height: "12",
                        rx: "2",
                        stroke: "var(--active-color)",
                        "stroke-width": "1.2"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ u4("line", {
                        x1: "5",
                        y1: "5.5",
                        x2: "11",
                        y2: "5.5",
                        stroke: "var(--active-color)",
                        "stroke-width": "1",
                        "stroke-linecap": "round"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ u4("line", {
                        x1: "5",
                        y1: "8",
                        x2: "11",
                        y2: "8",
                        stroke: "var(--active-color)",
                        "stroke-width": "1",
                        "stroke-linecap": "round"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ u4("line", {
                        x1: "5",
                        y1: "10.5",
                        x2: "9",
                        y2: "10.5",
                        stroke: "var(--active-color)",
                        "stroke-width": "1",
                        "stroke-linecap": "round"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                }, undefined, false, undefined, this),
                /* @__PURE__ */ u4("div", {
                  class: "welcome-list-item-text",
                  children: [
                    /* @__PURE__ */ u4("div", {
                      class: "welcome-list-item-name",
                      children: r4.name
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ u4("div", {
                      class: "welcome-list-item-path",
                      children: truncPath(r4.path)
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, r4.path, true, undefined, this)),
            recents.length > 0 && /* @__PURE__ */ u4("div", {
              class: "welcome-list-sep"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              class: "welcome-list-item welcome-list-item--action",
              onClick: pickAndOpenNotebook,
              children: "Open Existing Notebook..."
            }, undefined, false, undefined, this),
            /* @__PURE__ */ u4("div", {
              class: "welcome-list-item welcome-list-item--action",
              onClick: createAndOpenNotebook,
              children: "Create New Notebook..."
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}

// ../core/src/NotebookSwitcher.jsx
init_hooks_module();
init_store();
function NotebookSwitcher() {
  if (!showSwitcher.value)
    return null;
  const ref = A2(null);
  y2(() => {
    const onClick = (e4) => {
      if (ref.current && !ref.current.contains(e4.target))
        closeSwitcher();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const recents = recentNotebooks.value;
  const truncPath2 = (p5) => {
    const home = p5.replace(/^\/home\/[^/]+/, "~");
    return home.length > 50 ? "..." + home.slice(-47) : home;
  };
  return /* @__PURE__ */ u4("div", {
    class: "notebook-switcher",
    ref,
    children: [
      recents.length > 0 && /* @__PURE__ */ u4(k, {
        children: [
          /* @__PURE__ */ u4("div", {
            class: "notebook-switcher-header",
            children: "Recent Notebooks"
          }, undefined, false, undefined, this),
          recents.map((r4) => /* @__PURE__ */ u4("div", {
            class: "notebook-switcher-item",
            onClick: () => openNotebook(r4.path),
            children: [
              /* @__PURE__ */ u4("div", {
                class: "notebook-switcher-item-name",
                children: r4.name
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("div", {
                class: "notebook-switcher-item-path",
                children: truncPath2(r4.path)
              }, undefined, false, undefined, this)
            ]
          }, r4.path, true, undefined, this)),
          /* @__PURE__ */ u4("div", {
            class: "notebook-switcher-sep"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "notebook-switcher-item",
        onClick: () => {
          closeSwitcher();
          pickAndOpenNotebook();
        },
        children: "Open Existing Notebook..."
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "notebook-switcher-item",
        onClick: () => {
          closeSwitcher();
          createAndOpenNotebook();
        },
        children: "Create New Notebook..."
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/ClaudeChat.jsx
init_hooks_module();
init_store();
function renderMarkdown(text) {
  let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_4, lang, code) => {
    return `<pre class="cc-code-block"><code>${escHtml(code.trimEnd())}</code></pre>`;
  });
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/^[•\-\*] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m4) => `<ul>${m4}</ul>`);
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
  html = html.replace(/\n/g, "<br/>");
  return html;
}
function escHtml(s5) {
  return s5.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ClaudeChat() {
  const chat = claudeChat.value;
  if (!chat.active)
    return null;
  const inputRef = A2(null);
  const messagesRef = A2(null);
  const dragRef = A2(null);
  _2(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat.messages.length, chat.messages[chat.messages.length - 1]?.content]);
  const onDragStart = q2((e4) => {
    e4.preventDefault();
    const { clientX: startX, clientY: startY } = e4;
    const origX = chat.position.x, origY = chat.position.y;
    function onMove(e22) {
      updateClaudeChatPosition(origX + (e22.clientX - startX), origY + (e22.clientY - startY));
    }
    function onUp() {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, [chat.position.x, chat.position.y]);
  function handleSend() {
    const text = inputRef.current?.value?.trim();
    if (!text)
      return;
    inputRef.current.value = "";
    sendClaudeMessage(text);
  }
  function handleKeyDown(e4) {
    if (e4.key === "Enter" && !e4.shiftKey) {
      e4.preventDefault();
      handleSend();
    }
  }
  return /* @__PURE__ */ u4("div", {
    class: "claude-chat",
    style: { left: chat.position.x + "px", top: chat.position.y + "px" },
    children: [
      /* @__PURE__ */ u4("div", {
        class: "cc-titlebar",
        onPointerDown: onDragStart,
        ref: dragRef,
        children: [
          /* @__PURE__ */ u4("span", {
            class: "cc-title",
            children: "Claude"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("div", {
            style: { display: "flex", gap: "4px", alignItems: "center" },
            children: [
              /* @__PURE__ */ u4("button", {
                class: "cc-test",
                onClick: () => {
                  if (!chat.streaming)
                    sendClaudeMessage("Write a tiny, self-contained HTML page (with inline CSS, make it look nice) and display it using the display_webpage tool. Keep it under 2 seconds.");
                },
                disabled: chat.streaming,
                title: "Test display panel",
                children: "test"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "cc-test",
                onClick: () => {
                  displayPanel.value = { ...displayPanel.value, active: true, uri: "file:///tmp/notebound-img-test.html" };
                },
                title: "Test iframe with local file + images",
                children: "iframe"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("button", {
                class: "cc-close",
                onClick: closeClaudeChat,
                children: "x"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "cc-messages",
        ref: messagesRef,
        children: [
          chat.messages.map((msg, i4) => /* @__PURE__ */ u4("div", {
            class: `cc-msg cc-msg--${msg.role}`,
            children: msg.role === "assistant" ? /* @__PURE__ */ u4("div", {
              class: "cc-bubble cc-bubble--assistant",
              dangerouslySetInnerHTML: { __html: renderMarkdown(msg.content || "") }
            }, undefined, false, undefined, this) : /* @__PURE__ */ u4("div", {
              class: "cc-bubble cc-bubble--user",
              children: msg.content
            }, undefined, false, undefined, this)
          }, i4, false, undefined, this)),
          chat.streaming && /* @__PURE__ */ u4("div", {
            class: "cc-typing",
            children: [
              /* @__PURE__ */ u4("span", {
                class: "cc-typing-dot"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("span", {
                class: "cc-typing-dot"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ u4("span", {
                class: "cc-typing-dot"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          chat.error && /* @__PURE__ */ u4("div", {
            class: "cc-error",
            children: chat.error
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4("div", {
        class: "cc-input-bar",
        children: [
          /* @__PURE__ */ u4("textarea", {
            ref: inputRef,
            class: "cc-input",
            placeholder: "Ask about your notebook...",
            onKeyDown: handleKeyDown,
            rows: 1,
            onInput: (e4) => {
              e4.target.style.height = "auto";
              e4.target.style.height = Math.min(e4.target.scrollHeight, 80) + "px";
            }
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "cc-send",
            onClick: handleSend,
            children: "Send"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/DisplayPanel.jsx
init_hooks_module();
init_store();
function DisplayPanel() {
  const panel = displayPanel.value;
  if (!panel.active || !panel.uri)
    return null;
  const onDragStart = q2((e4) => {
    e4.preventDefault();
    const { clientX: startX, clientY: startY } = e4;
    const origX = panel.position.x, origY = panel.position.y;
    function onMove(e22) {
      updateDisplayPanelPosition(origX + (e22.clientX - startX), origY + (e22.clientY - startY));
    }
    function onUp() {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, [panel.position.x, panel.position.y]);
  return /* @__PURE__ */ u4("div", {
    class: "display-panel",
    style: { left: panel.position.x + "px", top: panel.position.y + "px" },
    children: [
      /* @__PURE__ */ u4("div", {
        class: "dp-titlebar",
        onPointerDown: onDragStart,
        children: [
          /* @__PURE__ */ u4("span", {
            class: "dp-title",
            children: "Display"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ u4("button", {
            class: "dp-close",
            onClick: closeDisplayPanel,
            children: "x"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4("iframe", {
        class: "dp-iframe",
        src: panel.uri
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/QuickJump.jsx
init_hooks_module();
init_store();
function flattenPages(pages, sectionId, sectionTitle) {
  const out = [];
  for (const p5 of pages) {
    out.push({ pageId: p5.id, pageTitle: p5.title, sectionId, sectionTitle });
    if (p5.children?.length)
      out.push(...flattenPages(p5.children, sectionId, sectionTitle));
  }
  return out;
}
function QuickJump({ onClose }) {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const allPages = [];
  if (nb) {
    for (const sec of nb.sections) {
      allPages.push(...flattenPages(sec.pages, sec.id, sec.title));
    }
  }
  const [query, setQuery] = d2("");
  const inputRef = A2(null);
  const listRef = A2(null);
  const q3 = query.trim().toLowerCase();
  const results = q3 ? allPages.filter((r4) => r4.pageTitle.toLowerCase().includes(q3) || r4.sectionTitle.toLowerCase().includes(q3)) : allPages;
  const initIdx = allPages.findIndex((r4) => r4.pageId === ui.pageId);
  const [activeIdx, setActiveIdx] = d2(Math.max(0, initIdx));
  const clampedIdx = Math.min(activeIdx, results.length - 1);
  y2(() => {
    inputRef.current?.focus();
  }, []);
  y2(() => {
    setActiveIdx(0);
  }, [query]);
  _2(() => {
    listRef.current?.children[clampedIdx]?.scrollIntoView({ block: "nearest" });
  }, [clampedIdx]);
  _2(() => {
    if (!q3)
      listRef.current?.children[clampedIdx]?.scrollIntoView({ block: "center" });
  }, []);
  function select(result) {
    jumpToPage(result.sectionId, result.pageId);
    onClose();
  }
  function handleKeyDown(e4) {
    if (e4.key === "Escape") {
      e4.preventDefault();
      onClose();
      return;
    }
    if (e4.key === "ArrowDown") {
      e4.preventDefault();
      setActiveIdx((i4) => Math.min(i4 + 1, results.length - 1));
      return;
    }
    if (e4.key === "ArrowUp") {
      e4.preventDefault();
      setActiveIdx((i4) => Math.max(i4 - 1, 0));
      return;
    }
    if (e4.key === "Enter" && results[clampedIdx]) {
      e4.preventDefault();
      select(results[clampedIdx]);
      return;
    }
  }
  return /* @__PURE__ */ u4("div", {
    class: "qj-overlay",
    onMouseDown: (e4) => {
      if (e4.target === e4.currentTarget)
        onClose();
    },
    children: /* @__PURE__ */ u4("div", {
      class: "qj-modal",
      children: [
        /* @__PURE__ */ u4("input", {
          ref: inputRef,
          class: "qj-input",
          placeholder: "Jump to page…",
          value: query,
          onInput: (e4) => setQuery(e4.target.value),
          onKeyDown: handleKeyDown
        }, undefined, false, undefined, this),
        /* @__PURE__ */ u4("div", {
          ref: listRef,
          class: "qj-list",
          children: [
            results.map((r4, i4) => /* @__PURE__ */ u4("div", {
              class: ["qj-item", i4 === clampedIdx && "qj-item--active"].filter(Boolean).join(" "),
              onMouseDown: () => select(r4),
              onMouseEnter: () => setActiveIdx(i4),
              children: [
                /* @__PURE__ */ u4("span", {
                  class: "qj-section",
                  children: r4.sectionTitle
                }, undefined, false, undefined, this),
                /* @__PURE__ */ u4("span", {
                  class: "qj-sep",
                  children: "›"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ u4("span", {
                  class: "qj-title",
                  children: r4.pageTitle
                }, undefined, false, undefined, this)
              ]
            }, r4.pageId, true, undefined, this)),
            results.length === 0 && /* @__PURE__ */ u4("div", {
              class: "qj-empty",
              children: "No pages found"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}

// ../core/src/App.jsx
var isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
function isNavMod(e4) {
  if (isMac)
    return e4.metaKey && !e4.ctrlKey && !e4.altKey && !e4.shiftKey;
  return e4.ctrlKey && e4.shiftKey && !e4.metaKey && !e4.altKey;
}
function flatPages(pages) {
  const out = [];
  for (const p5 of pages) {
    out.push(p5);
    if (p5.children?.length)
      out.push(...flatPages(p5.children));
  }
  return out;
}
function BrandHeader() {
  return /* @__PURE__ */ u4("div", {
    id: "brand-header",
    children: [
      /* @__PURE__ */ u4("span", {
        class: "brand-name",
        children: "Notebound"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ u4("span", {
        class: "brand-tagline",
        children: "bring colour to notebooks"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function App() {
  const [showJump, setShowJump] = d2(false);
  y2(() => {
    const id = requestIdleCallback(() => preloadPages(getPreloadCandidates()), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, [connected.value]);
  y2(() => {
    function onKey(e4) {
      const editing2 = e4.target.isContentEditable || e4.target.tagName === "INPUT" || e4.target.tagName === "TEXTAREA";
      if (!editing2 && isNavMod(e4) && (e4.key === "k" || e4.key === "K")) {
        e4.preventDefault();
        setShowJump((v5) => !v5);
        return;
      }
      if (editing2)
        return;
      if (!isNavMod(e4))
        return;
      const { ui: ui2, notebooks: notebooks2 } = appState.value;
      const nb2 = notebooks2.find((n3) => n3.id === ui2.notebookId);
      if (!nb2)
        return;
      if (e4.key === "ArrowLeft" || e4.key === "ArrowRight") {
        e4.preventDefault();
        const dir = e4.key === "ArrowLeft" ? -1 : 1;
        const idx = nb2.sections.findIndex((s5) => s5.id === ui2.sectionId);
        const next = nb2.sections[idx + dir];
        if (next)
          setActiveSection(next.id);
        return;
      }
      if (e4.key === "ArrowUp" || e4.key === "ArrowDown") {
        e4.preventDefault();
        const sec2 = nb2.sections.find((s5) => s5.id === ui2.sectionId);
        if (!sec2)
          return;
        const flat = flatPages(sec2.pages);
        const idx = flat.findIndex((p5) => p5.id === ui2.pageId);
        const dir = e4.key === "ArrowUp" ? -1 : 1;
        const next = flat[idx + dir];
        if (next)
          setActivePage(next.id);
        return;
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  if (initializing.value)
    return null;
  if (!connected.value)
    return /* @__PURE__ */ u4(WelcomeScreen, {}, undefined, false, undefined, this);
  const state = appState.value;
  const { notebooks, ui } = state;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((s5) => s5.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  const SECTION_COLORS = [
    "#fce4b8",
    "#b8d4f0",
    "#c8e6c0",
    "#f0c0c0",
    "#d8c8f0",
    "#f0d8b0",
    "#b8e0e0",
    "#f0c8e0"
  ];
  const secIdx = nb?.sections.findIndex((s5) => s5.id === ui.sectionId) ?? 0;
  const sectionColor = nb ? SECTION_COLORS[secIdx % SECTION_COLORS.length] : "#e8e8e8";
  const editing = editingEnabled.value;
  return /* @__PURE__ */ u4(k, {
    children: [
      editing ? /* @__PURE__ */ u4(FormatToolbar, {}, undefined, false, undefined, this) : /* @__PURE__ */ u4(BrandHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ u4(SectionPanel, {}, undefined, false, undefined, this),
      /* @__PURE__ */ u4("div", {
        id: "body-row",
        children: [
          editing && /* @__PURE__ */ u4(NotebookBar, {}, undefined, false, undefined, this),
          /* @__PURE__ */ u4("div", {
            id: "section-desk",
            style: { background: sectionColor },
            children: [
              /* @__PURE__ */ u4("div", {
                id: "canvas-area",
                children: /* @__PURE__ */ u4(Canvas, {
                  page
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              editing && /* @__PURE__ */ u4(PagesPanel, {}, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ u4(ContextMenu, {}, undefined, false, undefined, this),
      editing && /* @__PURE__ */ u4(NotebookSwitcher, {}, undefined, false, undefined, this),
      /* @__PURE__ */ u4(LinkContextMenu, {}, undefined, false, undefined, this),
      editing && /* @__PURE__ */ u4(ClaudeChat, {}, undefined, false, undefined, this),
      editing && /* @__PURE__ */ u4(DisplayPanel, {}, undefined, false, undefined, this),
      showJump && /* @__PURE__ */ u4(QuickJump, {
        onClose: () => setShowJump(false)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// ../core/src/main.jsx
document.getElementById("app").addEventListener("contextmenu", (e4) => {
  e4.preventDefault();
});
document.addEventListener("mousedown", (e4) => {
  if (e4.button === 1)
    e4.preventDefault();
});
J(/* @__PURE__ */ u4(App, {}, undefined, false, undefined, this), document.getElementById("app"));
