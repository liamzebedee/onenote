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
var w, g, _, m, k, x, S, C, M, $, I, P, A, H, T, j, F, O, z, N, V, q, B, D, E, G, J, R, n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, d;
var init_preact_module = __esm(() => {
  w = function(n, l) {
    for (var u in l)
      n[u] = l[u];
    return n;
  };
  g = function(n) {
    n && n.parentNode && n.parentNode.removeChild(n);
  };
  _ = function(l, u, t) {
    var i, r, o, e = {};
    for (o in u)
      o == "key" ? i = u[o] : o == "ref" ? r = u[o] : e[o] = u[o];
    if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), typeof l == "function" && l.defaultProps != null)
      for (o in l.defaultProps)
        e[o] === undefined && (e[o] = l.defaultProps[o]);
    return m(l, e, i, r, null);
  };
  m = function(n, t, i, r, o) {
    var e = { type: n, props: t, key: i, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: undefined, __v: o == null ? ++u : o, __i: -1, __u: 0 };
    return o == null && l.vnode != null && l.vnode(e), e;
  };
  k = function(n) {
    return n.children;
  };
  x = function(n, l) {
    this.props = n, this.context = l;
  };
  S = function(n, l) {
    if (l == null)
      return n.__ ? S(n.__, n.__i + 1) : null;
    for (var u;l < n.__k.length; l++)
      if ((u = n.__k[l]) != null && u.__e != null)
        return u.__e;
    return typeof n.type == "function" ? S(n) : null;
  };
  C = function(n) {
    if (n.__P && n.__d) {
      var u = n.__v, t = u.__e, i = [], r = [], o = w({}, u);
      o.__v = u.__v + 1, l.vnode && l.vnode(o), z(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, t == null ? S(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, V(i, o, r), u.__e = u.__ = null, o.__e != t && M(o);
    }
  };
  M = function(n) {
    if ((n = n.__) != null && n.__c != null)
      return n.__e = n.__c.base = null, n.__k.some(function(l) {
        if (l != null && l.__e != null)
          return n.__e = n.__c.base = l.__e;
      }), M(n);
  };
  $ = function(n) {
    (!n.__d && (n.__d = true) && i.push(n) && !I.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(I);
  };
  I = function() {
    for (var n, l = 1;i.length; )
      i.length > l && i.sort(e), n = i.shift(), l = i.length, C(n);
    I.__r = 0;
  };
  P = function(n, l, u, t, i, r, o, e, f, c, s) {
    var a, h, y, d, w2, g2, _2, m2 = t && t.__k || v, b = l.length;
    for (f = A(u, l, m2, f, b), a = 0;a < b; a++)
      (y = u.__k[a]) != null && (h = y.__i != -1 && m2[y.__i] || p, y.__i = a, g2 = z(n, y, h, i, r, o, e, f, c, s), d = y.__e, y.ref && h.ref != y.ref && (h.ref && D(h.ref, null, y), s.push(y.ref, y.__c || d, y)), w2 == null && d != null && (w2 = d), (_2 = !!(4 & y.__u)) || h.__k === y.__k ? f = H(y, f, n, _2) : typeof y.type == "function" && g2 !== undefined ? f = g2 : d && (f = d.nextSibling), y.__u &= -7);
    return u.__e = w2, f;
  };
  A = function(n, l, u, t, i) {
    var r, o, e, f, c, s = u.length, a = s, h = 0;
    for (n.__k = new Array(i), r = 0;r < i; r++)
      (o = l[r]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = n.__k[r] = m(null, o, null, null, null) : d(o) ? o = n.__k[r] = m(k, { children: o }, null, null, null) : o.constructor === undefined && o.__b > 0 ? o = n.__k[r] = m(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, (c = o.__i = T(o, u, f, a)) != -1 && (a--, (e = u[c]) && (e.__u |= 2)), e == null || e.__v == null ? (c == -1 && (i > s ? h-- : i < s && h++), typeof o.type != "function" && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
    if (a)
      for (r = 0;r < s; r++)
        (e = u[r]) != null && (2 & e.__u) == 0 && (e.__e == t && (t = S(e)), E(e, e));
    return t;
  };
  H = function(n, l, u, t) {
    var i, r;
    if (typeof n.type == "function") {
      for (i = n.__k, r = 0;i && r < i.length; r++)
        i[r] && (i[r].__ = n, l = H(i[r], l, u, t));
      return l;
    }
    n.__e != l && (t && (l && n.type && !l.parentNode && (l = S(n)), u.insertBefore(n.__e, l || null)), l = n.__e);
    do {
      l = l && l.nextSibling;
    } while (l != null && l.nodeType == 8);
    return l;
  };
  T = function(n, l, u, t) {
    var i, r, o, e = n.key, f = n.type, c = l[u], s = c != null && (2 & c.__u) == 0;
    if (c === null && e == null || s && e == c.key && f == c.type)
      return u;
    if (t > (s ? 1 : 0)) {
      for (i = u - 1, r = u + 1;i >= 0 || r < l.length; )
        if ((c = l[o = i >= 0 ? i-- : r++]) != null && (2 & c.__u) == 0 && e == c.key && f == c.type)
          return o;
    }
    return -1;
  };
  j = function(n, l, u) {
    l[0] == "-" ? n.setProperty(l, u == null ? "" : u) : n[l] = u == null ? "" : typeof u != "number" || y.test(l) ? u : u + "px";
  };
  F = function(n, l, u, t, i) {
    var r, o;
    n:
      if (l == "style")
        if (typeof u == "string")
          n.style.cssText = u;
        else {
          if (typeof t == "string" && (n.style.cssText = t = ""), t)
            for (l in t)
              u && l in u || j(n.style, l, "");
          if (u)
            for (l in u)
              t && u[l] == t[l] || j(n.style, l, u[l]);
        }
      else if (l[0] == "o" && l[1] == "n")
        r = l != (l = l.replace(f, "$1")), o = l.toLowerCase(), l = o in n || l == "onFocusOut" || l == "onFocusIn" ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u.u = t.u : (u.u = c, n.addEventListener(l, r ? a : s, r)) : n.removeEventListener(l, r ? a : s, r);
      else {
        if (i == "http://www.w3.org/2000/svg")
          l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (l != "width" && l != "height" && l != "href" && l != "list" && l != "form" && l != "tabIndex" && l != "download" && l != "rowSpan" && l != "colSpan" && l != "role" && l != "popover" && l in n)
          try {
            n[l] = u == null ? "" : u;
            break n;
          } catch (n2) {
          }
        typeof u == "function" || (u == null || u === false && l[4] != "-" ? n.removeAttribute(l) : n.setAttribute(l, l == "popover" && u == 1 ? "" : u));
      }
  };
  O = function(n) {
    return function(u) {
      if (this.l) {
        var t = this.l[u.type + n];
        if (u.t == null)
          u.t = c++;
        else if (u.t < t.u)
          return;
        return t(l.event ? l.event(u) : u);
      }
    };
  };
  z = function(n, u, t, i, r, o, e, f, c, s) {
    var a, h, p, y, _2, m2, b, S2, C2, M2, $2, I2, A2, H2, L, T2 = u.type;
    if (u.constructor !== undefined)
      return null;
    128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (a = l.__b) && a(u);
    n:
      if (typeof T2 == "function")
        try {
          if (S2 = u.props, C2 = "prototype" in T2 && T2.prototype.render, M2 = (a = T2.contextType) && i[a.__c], $2 = a ? M2 ? M2.props.value : a.__ : i, t.__c ? b = (h = u.__c = t.__c).__ = h.__E : (C2 ? u.__c = h = new T2(S2, $2) : (u.__c = h = new x(S2, $2), h.constructor = T2, h.render = G), M2 && M2.sub(h), h.state || (h.state = {}), h.__n = i, p = h.__d = true, h.__h = [], h._sb = []), C2 && h.__s == null && (h.__s = h.state), C2 && T2.getDerivedStateFromProps != null && (h.__s == h.state && (h.__s = w({}, h.__s)), w(h.__s, T2.getDerivedStateFromProps(S2, h.__s))), y = h.props, _2 = h.state, h.__v = u, p)
            C2 && T2.getDerivedStateFromProps == null && h.componentWillMount != null && h.componentWillMount(), C2 && h.componentDidMount != null && h.__h.push(h.componentDidMount);
          else {
            if (C2 && T2.getDerivedStateFromProps == null && S2 !== y && h.componentWillReceiveProps != null && h.componentWillReceiveProps(S2, $2), u.__v == t.__v || !h.__e && h.shouldComponentUpdate != null && h.shouldComponentUpdate(S2, h.__s, $2) === false) {
              u.__v != t.__v && (h.props = S2, h.state = h.__s, h.__d = false), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n2) {
                n2 && (n2.__ = u);
              }), v.push.apply(h.__h, h._sb), h._sb = [], h.__h.length && e.push(h);
              break n;
            }
            h.componentWillUpdate != null && h.componentWillUpdate(S2, h.__s, $2), C2 && h.componentDidUpdate != null && h.__h.push(function() {
              h.componentDidUpdate(y, _2, m2);
            });
          }
          if (h.context = $2, h.props = S2, h.__P = n, h.__e = false, I2 = l.__r, A2 = 0, C2)
            h.state = h.__s, h.__d = false, I2 && I2(u), a = h.render(h.props, h.state, h.context), v.push.apply(h.__h, h._sb), h._sb = [];
          else
            do {
              h.__d = false, I2 && I2(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
            } while (h.__d && ++A2 < 25);
          h.state = h.__s, h.getChildContext != null && (i = w(w({}, i), h.getChildContext())), C2 && !p && h.getSnapshotBeforeUpdate != null && (m2 = h.getSnapshotBeforeUpdate(y, _2)), H2 = a != null && a.type === k && a.key == null ? q(a.props.children) : a, f = P(n, d(H2) ? H2 : [H2], u, t, i, r, o, e, f, c, s), h.base = u.__e, u.__u &= -161, h.__h.length && e.push(h), b && (h.__E = h.__ = null);
        } catch (n2) {
          if (u.__v = null, c || o != null)
            if (n2.then) {
              for (u.__u |= c ? 160 : 128;f && f.nodeType == 8 && f.nextSibling; )
                f = f.nextSibling;
              o[o.indexOf(f)] = null, u.__e = f;
            } else {
              for (L = o.length;L--; )
                g(o[L]);
              N(u);
            }
          else
            u.__e = t.__e, u.__k = t.__k, n2.then || N(u);
          l.__e(n2, u, t);
        }
      else
        o == null && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = B(t.__e, u, t, i, r, o, e, c, s);
    return (a = l.diffed) && a(u), 128 & u.__u ? undefined : f;
  };
  N = function(n) {
    n && (n.__c && (n.__c.__e = true), n.__k && n.__k.some(N));
  };
  V = function(n, u, t) {
    for (var i = 0;i < t.length; i++)
      D(t[i], t[++i], t[++i]);
    l.__c && l.__c(u, n), n.some(function(u2) {
      try {
        n = u2.__h, u2.__h = [], n.some(function(n2) {
          n2.call(u2);
        });
      } catch (n2) {
        l.__e(n2, u2.__v);
      }
    });
  };
  q = function(n) {
    return typeof n != "object" || n == null || n.__b > 0 ? n : d(n) ? n.map(q) : w({}, n);
  };
  B = function(u, t, i, r, o, e, f, c, s) {
    var a, h, v, y, w2, _2, m2, b = i.props || p, k2 = t.props, x2 = t.type;
    if (x2 == "svg" ? o = "http://www.w3.org/2000/svg" : x2 == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), e != null) {
      for (a = 0;a < e.length; a++)
        if ((w2 = e[a]) && "setAttribute" in w2 == !!x2 && (x2 ? w2.localName == x2 : w2.nodeType == 3)) {
          u = w2, e[a] = null;
          break;
        }
    }
    if (u == null) {
      if (x2 == null)
        return document.createTextNode(k2);
      u = document.createElementNS(o, x2, k2.is && k2), c && (l.__m && l.__m(t, e), c = false), e = null;
    }
    if (x2 == null)
      b === k2 || c && u.data == k2 || (u.data = k2);
    else {
      if (e = e && n.call(u.childNodes), !c && e != null)
        for (b = {}, a = 0;a < u.attributes.length; a++)
          b[(w2 = u.attributes[a]).name] = w2.value;
      for (a in b)
        w2 = b[a], a == "dangerouslySetInnerHTML" ? v = w2 : a == "children" || (a in k2) || a == "value" && ("defaultValue" in k2) || a == "checked" && ("defaultChecked" in k2) || F(u, a, null, w2, o);
      for (a in k2)
        w2 = k2[a], a == "children" ? y = w2 : a == "dangerouslySetInnerHTML" ? h = w2 : a == "value" ? _2 = w2 : a == "checked" ? m2 = w2 : c && typeof w2 != "function" || b[a] === w2 || F(u, a, w2, b[a], o);
      if (h)
        c || v && (h.__html == v.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
      else if (v && (u.innerHTML = ""), P(t.type == "template" ? u.content : u, d(y) ? y : [y], t, i, r, x2 == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && S(i, 0), c, s), e != null)
        for (a = e.length;a--; )
          g(e[a]);
      c || (a = "value", x2 == "progress" && _2 == null ? u.removeAttribute("value") : _2 != null && (_2 !== u[a] || x2 == "progress" && !_2 || x2 == "option" && _2 != b[a]) && F(u, a, _2, b[a], o), a = "checked", m2 != null && m2 != u[a] && F(u, a, m2, b[a], o));
    }
    return u;
  };
  D = function(n, u, t) {
    try {
      if (typeof n == "function") {
        var i = typeof n.__u == "function";
        i && n.__u(), i && u == null || (n.__u = n(u));
      } else
        n.current = u;
    } catch (n2) {
      l.__e(n2, t);
    }
  };
  E = function(n, u, t) {
    var i, r;
    if (l.unmount && l.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || D(i, null, u)), (i = n.__c) != null) {
      if (i.componentWillUnmount)
        try {
          i.componentWillUnmount();
        } catch (n2) {
          l.__e(n2, u);
        }
      i.base = i.__P = null;
    }
    if (i = n.__k)
      for (r = 0;r < i.length; r++)
        i[r] && E(i[r], u, t || typeof n.type != "function");
    t || g(n.__e), n.__c = n.__ = n.__e = undefined;
  };
  G = function(n, l, u) {
    return this.constructor(n, u);
  };
  J = function(u, t, i) {
    var r, o, e, f;
    t == document && (t = document.documentElement), l.__ && l.__(u, t), o = (r = typeof i == "function") ? null : i && i.__k || t.__k, e = [], f = [], z(t, u = (!r && i || t).__k = _(k, null, [u]), o || p, p, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), V(e, u, f);
  };
  R = function(n) {
    function l(n2) {
      var u, t;
      return this.getChildContext || (u = new Set, (t = {})[l.__c] = this, this.getChildContext = function() {
        return t;
      }, this.componentWillUnmount = function() {
        u = null;
      }, this.shouldComponentUpdate = function(n3) {
        this.props.value != n3.value && u.forEach(function(n4) {
          n4.__e = true, $(n4);
        });
      }, this.sub = function(n3) {
        u.add(n3);
        var l2 = n3.componentWillUnmount;
        n3.componentWillUnmount = function() {
          u && u.delete(n3), l2 && l2.call(n3);
        };
      }), n2.children;
    }
    return l.__c = "__cC" + h++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n2, l2) {
      return n2.children(l2);
    }).contextType = l, l;
  };
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
var p2, d2, h2, y2, A2, T2, q2, x2, j2, w2, z2, B2, C2, D2, t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, s2, k2;
var init_hooks_module = __esm(() => {
  init_preact_module();
  p2 = function(n2, t2) {
    c2.__h && c2.__h(r2, n2, o2 || t2), o2 = 0;
    var u2 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  };
  d2 = function(n2) {
    return o2 = 1, h2(D2, n2);
  };
  h2 = function(n2, u2, i2) {
    var o2 = p2(t2++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D2(undefined, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r2, !r2.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        }))
          return !c2 || c2.call(this, n3, t2, r2);
        var i3 = o2.__c.props !== n3;
        return u3.some(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = undefined, t3 !== n4.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n3, t2, r2) || i3;
      };
      r2.__f = true;
      var { shouldComponentUpdate: c2, componentWillUpdate: e2 } = r2;
      r2.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = undefined, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r2.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  };
  y2 = function(n2, u2) {
    var i2 = p2(t2++, 3);
    !c2.__s && C2(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r2.__H.__h.push(i2));
  };
  A2 = function(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  };
  T2 = function(n2, r2) {
    var u2 = p2(t2++, 7);
    return C2(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  };
  q2 = function(n2, t2) {
    return o2 = 8, T2(function() {
      return n2;
    }, t2);
  };
  x2 = function(n2) {
    var u2 = r2.context[n2.__c], i2 = p2(t2++, 9);
    return i2.c = n2, u2 ? (i2.__ == null && (i2.__ = true, u2.sub(r2)), u2.props.value) : n2.__;
  };
  j2 = function() {
    for (var n2;n2 = f2.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2)
        try {
          t2.__h.some(z2), t2.__h.some(B2), t2.__h = [];
        } catch (r2) {
          t2.__h = [], c2.__e(r2, n2.__v);
        }
    }
  };
  w2 = function(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k2 && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k2 && (t2 = requestAnimationFrame(r2));
  };
  z2 = function(n2) {
    var t2 = r2, u2 = n2.__c;
    typeof u2 == "function" && (n2.__c = undefined, u2()), r2 = t2;
  };
  B2 = function(n2) {
    var t2 = r2;
    n2.__c = n2.__(), r2 = t2;
  };
  C2 = function(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  };
  D2 = function(n2, t2) {
    return typeof t2 == "function" ? t2(n2) : t2;
  };
  o2 = 0;
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
var t3, o3, e3, d3, c3, a3, l3, y3, w3, b, _2, p3, g2, S2, m3, i3, r3, f3, h3, s3, v3, u3;
var init_signals_core_module = __esm(() => {
  t3 = function() {
    if (!(s3 > 1)) {
      var i3, t4 = false;
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
                i3 = n3;
                t4 = true;
              }
            }
          n2 = r3;
        }
      }
      v3 = 0;
      s3--;
      if (t4)
        throw i3;
    } else
      s3--;
  };
  o3 = function(i3) {
    var t4 = r3;
    r3 = undefined;
    try {
      return i3();
    } finally {
      r3 = t4;
    }
  };
  e3 = function(i3) {
    if (r3 !== undefined) {
      var t4 = i3.n;
      if (t4 === undefined || t4.t !== r3) {
        t4 = { i: 0, S: i3, p: r3.s, n: undefined, t: r3, e: undefined, x: undefined, r: t4 };
        if (r3.s !== undefined)
          r3.s.n = t4;
        r3.s = t4;
        i3.n = t4;
        if (32 & r3.f)
          i3.S(t4);
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
  };
  d3 = function(i3, t4) {
    this.v = i3;
    this.i = 0;
    this.n = undefined;
    this.t = undefined;
    this.W = t4 == null ? undefined : t4.watched;
    this.Z = t4 == null ? undefined : t4.unwatched;
    this.name = t4 == null ? undefined : t4.name;
  };
  c3 = function(i3, t4) {
    return new d3(i3, t4);
  };
  a3 = function(i3) {
    for (var t4 = i3.s;t4 !== undefined; t4 = t4.n)
      if (t4.S.i !== t4.i || !t4.S.h() || t4.S.i !== t4.i)
        return true;
    return false;
  };
  l3 = function(i3) {
    for (var t4 = i3.s;t4 !== undefined; t4 = t4.n) {
      var n2 = t4.S.n;
      if (n2 !== undefined)
        t4.r = n2;
      t4.S.n = t4;
      t4.i = -1;
      if (t4.n === undefined) {
        i3.s = t4;
        break;
      }
    }
  };
  y3 = function(i3) {
    var t4 = i3.s, n2 = undefined;
    while (t4 !== undefined) {
      var r3 = t4.p;
      if (t4.i === -1) {
        t4.S.U(t4);
        if (r3 !== undefined)
          r3.n = t4.n;
        if (t4.n !== undefined)
          t4.n.p = r3;
      } else
        n2 = t4;
      t4.S.n = t4.r;
      if (t4.r !== undefined)
        t4.r = undefined;
      t4 = r3;
    }
    i3.s = n2;
  };
  w3 = function(i3, t4) {
    d3.call(this, undefined);
    this.x = i3;
    this.s = undefined;
    this.g = u3 - 1;
    this.f = 4;
    this.W = t4 == null ? undefined : t4.watched;
    this.Z = t4 == null ? undefined : t4.unwatched;
    this.name = t4 == null ? undefined : t4.name;
  };
  b = function(i3, t4) {
    return new w3(i3, t4);
  };
  _2 = function(i3) {
    var n2 = i3.u;
    i3.u = undefined;
    if (typeof n2 == "function") {
      s3++;
      var o4 = r3;
      r3 = undefined;
      try {
        n2();
      } catch (t4) {
        i3.f &= -2;
        i3.f |= 8;
        p3(i3);
        throw t4;
      } finally {
        r3 = o4;
        t3();
      }
    }
  };
  p3 = function(i3) {
    for (var t4 = i3.s;t4 !== undefined; t4 = t4.n)
      t4.S.U(t4);
    i3.x = undefined;
    i3.s = undefined;
    _2(i3);
  };
  g2 = function(i3) {
    if (r3 !== this)
      throw new Error("Out-of-order effect");
    y3(this);
    r3 = i3;
    this.f &= -2;
    if (8 & this.f)
      p3(this);
    t3();
  };
  S2 = function(i3, t4) {
    this.x = i3;
    this.u = undefined;
    this.s = undefined;
    this.o = undefined;
    this.f = 32;
    this.name = t4 == null ? undefined : t4.name;
    if (f3)
      f3.push(this);
  };
  m3 = function(i3, t4) {
    var n2 = new S2(i3, t4);
    try {
      n2.c();
    } catch (i4) {
      n2.d();
      throw i4;
    }
    var r3 = n2.d.bind(n2);
    r3[Symbol.dispose] = r3;
    return r3;
  };
  i3 = Symbol.for("preact-signals");
  r3 = undefined;
  h3 = undefined;
  s3 = 0;
  v3 = 0;
  u3 = 0;
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
var l4, d4, h4, p4, useSignal, v4, s4;
var init_signals_module = __esm(() => {
  init_preact_module();
  init_hooks_module();
  init_signals_core_module();
  init_signals_core_module();
  l4 = function(i4, n3) {
    l[i4] = n3.bind(null, l[i4] || function() {
    });
  };
  d4 = function(i4) {
    if (s4) {
      var r4 = s4;
      s4 = undefined;
      r4();
    }
    s4 = i4 && i4.S();
  };
  h4 = function(i4) {
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
  };
  p4 = function(i4, r4, n3, t4) {
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
  };
  useSignal = function(i4) {
    return T2(function() {
      return c3(i4);
    }, []);
  };
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
  updatePageView: () => {
    {
      return updatePageView;
    }
  },
  updatePageTitleAndRefresh: () => {
    {
      return updatePageTitleAndRefresh;
    }
  },
  updatePageTitle: () => {
    {
      return updatePageTitle;
    }
  },
  updateBlockWidth: () => {
    {
      return updateBlockWidth;
    }
  },
  updateBlockType: () => {
    {
      return updateBlockType;
    }
  },
  updateBlockPos: () => {
    {
      return updateBlockPos;
    }
  },
  updateBlockHtml: () => {
    {
      return updateBlockHtml;
    }
  },
  uid: () => {
    {
      return uid;
    }
  },
  setActiveSection: () => {
    {
      return setActiveSection;
    }
  },
  setActivePage: () => {
    {
      return setActivePage;
    }
  },
  setActiveNotebook: () => {
    {
      return setActiveNotebook;
    }
  },
  reorderSections: () => {
    {
      return reorderSections;
    }
  },
  reorderNotebooks: () => {
    {
      return reorderNotebooks;
    }
  },
  renameSection: () => {
    {
      return renameSection;
    }
  },
  renamePage: () => {
    {
      return renamePage;
    }
  },
  renameNotebook: () => {
    {
      return renameNotebook;
    }
  },
  removeFromTree: () => {
    {
      return removeFromTree;
    }
  },
  movePage: () => {
    {
      return movePage;
    }
  },
  getActivePage: () => {
    {
      return getActivePage;
    }
  },
  findInTree: () => {
    {
      return findInTree;
    }
  },
  deleteSection: () => {
    {
      return deleteSection;
    }
  },
  deletePage: () => {
    {
      return deletePage;
    }
  },
  deleteNotebook: () => {
    {
      return deleteNotebook;
    }
  },
  deleteBlock: () => {
    {
      return deleteBlock;
    }
  },
  appState: () => {
    {
      return appState;
    }
  },
  addSection: () => {
    {
      return addSection;
    }
  },
  addPage: () => {
    {
      return addPage;
    }
  },
  addNotebook: () => {
    {
      return addNotebook;
    }
  },
  addBlock: () => {
    {
      return addBlock;
    }
  }
});
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
var mkBlock, mkPage, mkSection, mkNotebook, load, scheduleSave, defaultState, update, silent, findInTree, removeFromTree, STORAGE_KEY, uid, _saveTimer, appState;
var init_store = __esm(() => {
  init_signals_module();
  mkBlock = function(x3 = 0, y4 = 0, w4 = 480) {
    return { id: uid(), x: x3, y: y4, w: w4, html: "", type: "text" };
  };
  mkPage = function(title = "Untitled Page") {
    const db = mkBlock(0, 0, 480);
    return { id: uid(), title, children: [], defaultBlockId: db.id, blocks: [db], panX: 0, panY: 0, zoom: 1 };
  };
  mkSection = function(title = "New Section") {
    return { id: uid(), title, pages: [mkPage()] };
  };
  mkNotebook = function(title = "My Notebook") {
    const sec = mkSection();
    return { id: uid(), title, sections: [sec] };
  };
  load = function() {
    try {
      const r4 = localStorage.getItem(STORAGE_KEY);
      return r4 ? JSON.parse(r4) : null;
    } catch {
      return null;
    }
  };
  scheduleSave = function() {
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.value));
      } catch (e4) {
        console.warn("Save failed", e4);
      }
    }, 300);
  };
  defaultState = function() {
    const nb = mkNotebook();
    return { notebooks: [nb], ui: { notebookId: nb.id, sectionId: nb.sections[0].id, pageId: nb.sections[0].pages[0].id } };
  };
  update = function(fn) {
    const draft = structuredClone(appState.value);
    fn(draft);
    appState.value = draft;
    scheduleSave();
  };
  silent = function(fn) {
    fn(appState.value);
    scheduleSave();
  };
  findInTree = function(pages, id) {
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
  };
  removeFromTree = function(pages, id) {
    return pages.filter((p5) => p5.id !== id).map((p5) => ({ ...p5, children: removeFromTree(p5.children ?? [], id) }));
  };
  STORAGE_KEY = "onenote_v4";
  uid = () => crypto.randomUUID();
  _saveTimer = null;
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
      const renameItem = menu.items.find((i5) => i5.type === "rename");
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
  return u4("div", {
    class: "context-menu",
    ref,
    style: { left: x3 + "px", top: y4 + "px" },
    children: menu.items.map((item, i5) => {
      if (item.type === "separator") {
        return u4("div", {
          class: "context-menu-separator"
        }, i5, false, undefined, this);
      }
      if (item.type === "rename") {
        return u4("div", {
          class: "context-menu-rename",
          children: [
            u4("input", {
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
            u4("button", {
              class: "context-menu-rename-ok",
              onClick: () => handleRenameSubmit(item),
              children: "\u2713"
            }, undefined, false, undefined, this)
          ]
        }, i5, true, undefined, this);
      }
      if (item.type === "confirm") {
        const isConfirming = confirmId === i5;
        return u4("div", {
          class: `context-menu-item ${isConfirming ? "context-menu-item--danger" : ""}`,
          onClick: () => {
            if (isConfirming) {
              item.action();
              closeContextMenu();
            } else
              setConfirmId(i5);
          },
          children: isConfirming ? item.confirmLabel || "Confirm delete?" : item.label
        }, i5, false, undefined, this);
      }
      if (item.type === "submenu") {
        return u4("div", {
          class: "context-menu-item context-menu-submenu",
          children: [
            u4("span", {
              children: item.label
            }, undefined, false, undefined, this),
            u4("span", {
              class: "context-menu-arrow",
              children: "\u25B8"
            }, undefined, false, undefined, this),
            u4("div", {
              class: "context-menu-sub",
              children: item.children.map((child, j3) => u4("div", {
                class: "context-menu-item",
                onClick: () => {
                  child.action();
                  closeContextMenu();
                },
                children: child.label
              }, j3, false, undefined, this))
            }, undefined, false, undefined, this)
          ]
        }, i5, true, undefined, this);
      }
      return u4("div", {
        class: "context-menu-item",
        onClick: () => {
          item.action();
          closeContextMenu();
        },
        children: item.label
      }, i5, false, undefined, this);
    })
  }, undefined, false, undefined, this);
}

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
init_preact_module();
init_preact_module();
var u4 = function(e4, t4, n3, o4, i4, u5) {
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
};
var f4 = 0;
var i4 = Array.isArray;

// src/ContextMenu.jsx
var contextMenu = c3(null);

// src/NotebookBar.jsx
function NotebookBar() {
  const { notebooks, ui } = appState.value;
  const dragId = A2(null);
  return u4("div", {
    id: "notebook-bar",
    children: [
      notebooks.map((nb) => u4("div", {
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
      u4("button", {
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
  return u4("div", {
    id: "section-tabs",
    children: [
      sections.map((sec) => u4("div", {
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
      u4("button", {
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
var deletePageWithChildren = function(page) {
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
    for (let i5 = 0;i5 < pages.length; i5++) {
      if (pages[i5].id === page.id) {
        const children = pages[i5].children ?? [];
        pages.splice(i5, 1, ...children);
        return true;
      }
      if (promoteChildren(pages[i5].children ?? []))
        return true;
    }
    return false;
  }
  promoteChildren(sec.pages);
  appState.value = { ...appState.value };
};
var PageItem = function({ page, activeId, depth = 0, dragState, onDragChange }) {
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
          for (let i5 = 0;i5 < pages.length; i5++) {
            if (pages[i5].id === fromId) {
              [extracted] = pages.splice(i5, 1);
              return true;
            }
            if (extract(pages[i5].children ?? []))
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
          for (let i5 = 0;i5 < pages.length; i5++) {
            if (pages[i5].id === fromId) {
              [extracted] = pages.splice(i5, 1);
              return true;
            }
            if (extract(pages[i5].children ?? []))
              return true;
          }
          return false;
        }
        extract(sec.pages);
        if (!extracted)
          return;
        function insertBefore(pages) {
          for (let i5 = 0;i5 < pages.length; i5++) {
            if (pages[i5].id === page.id) {
              pages.splice(i5, 0, extracted);
              return true;
            }
            if (insertBefore(pages[i5].children ?? []))
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
  return u4("div", {
    class: "page-item-wrap",
    children: [
      u4("div", {
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
          u4("span", {
            class: "page-expand",
            style: { visibility: hasKids ? "visible" : "hidden" },
            onClick: (e4) => {
              e4.stopPropagation();
              setOpen((o4) => !o4);
            },
            children: open ? "\u25BE" : "\u25B8"
          }, undefined, false, undefined, this),
          u4("span", {
            class: "page-title-text",
            children: page.title
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      hasKids && open && u4("div", {
        class: "subpages",
        children: page.children.map((c4) => u4(PageItem, {
          page: c4,
          activeId,
          depth: depth + 1,
          dragState,
          onDragChange
        }, c4.id, false, undefined, this))
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
};
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
  return u4("div", {
    id: "pages-panel",
    children: [
      u4("div", {
        class: "panel-header",
        children: u4("button", {
          class: "add-btn",
          onClick: () => addPage(),
          children: "+ New Page"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      u4("div", {
        class: "panel-list",
        children: pages.map((pg) => u4(PageItem, {
          page: pg,
          activeId: ui.pageId,
          dragState,
          onDragChange
        }, pg.id, false, undefined, this))
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
var drag = { pageId: null, over: null, mode: null };

// src/Canvas.jsx
init_preact_module();
init_hooks_module();

// src/Block.jsx
init_hooks_module();
init_store();

// src/editor.js
var getSelectionInfo = function() {
  const sel = window.getSelection();
  if (!sel?.rangeCount)
    return null;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE)
    return null;
  return { sel, range, node, text: node.textContent, offset: range.startOffset };
};
var eatText = function(sel, node, start, end) {
  const r4 = document.createRange();
  r4.setStart(node, start);
  r4.setEnd(node, end);
  sel.removeAllRanges();
  sel.addRange(r4);
  document.execCommand("delete");
};
var wrapMatch = function(sel, node, match, tag) {
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
};
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
  const afterNode = document.createTextNode(after || "\u200B");
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
var handleCodeTab = function(e4, el) {
  if (!el.getAttribute("data-code"))
    return false;
  if (e4.key !== "Tab")
    return false;
  e4.preventDefault();
  document.execCommand("insertText", false, "  ");
  return true;
};
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
var get = function(pageId) {
  if (!stacks.has(pageId))
    stacks.set(pageId, { past: [], future: [] });
  return stacks.get(pageId);
};
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
var apply = function(page, delta) {
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
};
var stacks = new Map;

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
  return u4("div", {
    class: ["block", isDefault && "block--default", isImage && "block--image", isSelected && "block--selected"].filter(Boolean).join(" "),
    "data-block-id": block.id,
    style: { left: block.x + "px", top: block.y + "px", width: block.w + "px" },
    onPointerDown: handleBlockPointerDown,
    children: [
      !isDefault && !isImage && u4("div", {
        class: "block-handle",
        onPointerDown: (e4) => {
          e4.stopPropagation();
          ctx.onBlockDragStart(e4, block.id);
        }
      }, undefined, false, undefined, this),
      !isImage && u4("div", {
        class: "block-resize",
        onPointerDown: (e4) => {
          e4.stopPropagation();
          ctx.onBlockResizeStart(e4, block.id);
        }
      }, undefined, false, undefined, this),
      isImage ? u4(k, {
        children: [
          u4("img", {
            src: block.src || "",
            draggable: false,
            style: { width: "100%", display: "block" }
          }, undefined, false, undefined, this),
          ["nw", "ne", "sw", "se"].map((dir) => u4("div", {
            class: `img-resize img-resize--${dir}`,
            onPointerDown: (e4) => {
              e4.stopPropagation();
              ctx.onImgResizeStart(e4, block.id, dir);
            }
          }, dir, false, undefined, this)),
          u4("div", {
            class: "block-drag-overlay",
            onPointerDown: (e4) => {
              e4.stopPropagation();
              ctx.onBlockDragStart(e4, block.id);
            }
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this) : u4("div", {
        ref: contentRef,
        class: ["block-content", block.type === "code" && "code-block"].filter(Boolean).join(" "),
        contentEditable: "true",
        "data-placeholder": "Start typing\u2026",
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
function FormatToolbar() {
  const btns = [
    { cmd: "bold", node: u4("b", {
      children: "B"
    }, undefined, false, undefined, this), title: "Bold" },
    { cmd: "italic", node: u4("i", {
      children: "I"
    }, undefined, false, undefined, this), title: "Italic" },
    { cmd: "underline", node: u4("u", {
      children: "U"
    }, undefined, false, undefined, this), title: "Underline" },
    { cmd: "strikethrough", node: u4("s", {
      children: "S"
    }, undefined, false, undefined, this), title: "Strikethrough" },
    null,
    { cmd: "h1", node: "H1", title: "Heading 1" },
    { cmd: "h2", node: "H2", title: "Heading 2" },
    { cmd: "h3", node: "H3", title: "Heading 3" },
    { cmd: "h4", node: "H4", title: "Heading 4" },
    { cmd: "p", node: "P", title: "Paragraph" },
    null,
    { cmd: "ul", node: "\u2022 List", title: "Bullet list" },
    { cmd: "ol", node: "1. List", title: "Numbered list" },
    { cmd: "link", node: "\u2318K", title: "Insert link" }
  ];
  return u4("div", {
    id: "format-toolbar",
    children: [
      btns.map((b2, i5) => b2 === null ? u4("span", {
        class: "fmt-sep"
      }, i5, false, undefined, this) : u4("button", {
        class: "fmt-btn",
        title: b2.title,
        onMouseDown: (e4) => {
          e4.preventDefault();
          execFmt(b2.cmd);
        },
        children: b2.node
      }, b2.cmd, false, undefined, this)),
      u4("span", {
        class: "canvas-hint",
        children: "Click to add block \xB7 Space+drag to pan \xB7 Ctrl+scroll zoom"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
var PageTitle = function({ page, onEnter }) {
  const ref = A2(null);
  const editing = A2(false);
  y2(() => {
    if (ref.current && !editing.current)
      ref.current.textContent = page?.title ?? "";
  }, [page?.id]);
  if (!page)
    return u4("div", {
      id: "page-title-bar"
    }, undefined, false, undefined, this);
  return u4("div", {
    id: "page-title-bar",
    onClick: () => ref.current?.focus(),
    children: u4("div", {
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
};
function Canvas2({ page }) {
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
    files.forEach((file, i5) => {
      const reader = new FileReader;
      reader.onload = (ev) => {
        const pg = getActivePage();
        if (!pg)
          return;
        const blk = { id: crypto.randomUUID(), x: pos.x + i5 * 20, y: pos.y + i5 * 20, w: 300, html: "", type: "image", src: ev.target.result };
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
    onBlockFocus: (id) => {
    },
    onBlockBlur: (id) => {
    },
    undo: doUndo,
    redo: doRedo
  };
  return u4(k, {
    children: [
      u4(PageTitle, {
        page,
        onEnter: focusDefaultBlock
      }, undefined, false, undefined, this),
      u4(CanvasCtx.Provider, {
        value: ctx,
        children: u4("div", {
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
            u4("div", {
              ref: marqueeRef,
              id: "marquee-rect"
            }, undefined, false, undefined, this),
            u4("div", {
              ref: innerRef,
              id: "canvas-inner",
              style: { transformOrigin: "0 0" },
              children: page?.blocks.map((b2) => u4(Block, {
                block: b2,
                page
              }, b2.id, false, undefined, this))
            }, undefined, false, undefined, this),
            u4("div", {
              ref: hScrollRef,
              class: "canvas-scroll-thumb canvas-scroll-thumb-h"
            }, undefined, false, undefined, this),
            u4("div", {
              ref: vScrollRef,
              class: "canvas-scroll-thumb canvas-scroll-thumb-v"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
var CanvasCtx = R(null);

// src/App.jsx
function App() {
  const state = appState.value;
  const { notebooks, ui } = state;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sec = nb?.sections.find((s5) => s5.id === ui.sectionId);
  const page = sec ? findInTree(sec.pages, ui.pageId) : null;
  return u4(k, {
    children: [
      u4(FormatToolbar, {}, undefined, false, undefined, this),
      u4(SectionPanel, {}, undefined, false, undefined, this),
      u4("div", {
        id: "body-row",
        children: [
          u4(NotebookBar, {}, undefined, false, undefined, this),
          u4("div", {
            id: "main",
            children: [
              u4("div", {
                id: "canvas-area",
                children: u4(Canvas2, {
                  page
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              u4(PagesPanel, {}, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      u4(ContextMenu, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/main.jsx
document.getElementById("app").addEventListener("contextmenu", (e4) => {
  e4.preventDefault();
});
J(u4(App, {}, undefined, false, undefined, this), document.getElementById("app"));
