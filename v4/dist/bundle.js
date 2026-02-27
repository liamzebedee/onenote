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
        pg = JSON.parse(JSON.stringify(found));
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
    const draft = JSON.parse(JSON.stringify(appState.value));
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
function NotebookBar() {
  const { notebooks, ui } = appState.value;
  const dragId = A2(null);
  return u4("div", {
    id: "notebook-bar",
    children: [
      notebooks.map((nb) => u4("div", {
        class: ["nb-tab", nb.id === ui.notebookId && "nb-tab--active"].filter(Boolean).join(" "),
        onClick: () => setActiveNotebook(nb.id),
        onDblClick: () => {
          const t4 = prompt("Notebook name:", nb.title);
          if (t4?.trim())
            renameNotebook(nb.id, t4.trim());
        },
        onContextMenu: (e4) => {
          e4.preventDefault();
          if (notebooks.length <= 1)
            return alert("Cannot delete the last notebook.");
          if (confirm(`Delete "${nb.title}" and all contents?`))
            deleteNotebook(nb.id);
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

// src/SectionPanel.jsx
init_hooks_module();
init_store();
function SectionPanel() {
  const { notebooks, ui } = appState.value;
  const nb = notebooks.find((n3) => n3.id === ui.notebookId);
  const sections = nb?.sections ?? [];
  const dragId = A2(null);
  return u4("div", {
    id: "sections-panel",
    class: "panel",
    children: [
      u4("div", {
        class: "panel-label",
        children: "Sections"
      }, undefined, false, undefined, this),
      u4("div", {
        class: "panel-list",
        children: sections.map((sec) => u4("div", {
          class: ["panel-item", sec.id === ui.sectionId && "panel-item--active"].filter(Boolean).join(" "),
          onClick: () => setActiveSection(sec.id),
          onDblClick: () => {
            const t4 = prompt("Section name:", sec.title);
            if (t4?.trim())
              renameSection(nb.id, sec.id, t4.trim());
          },
          onContextMenu: (e4) => {
            e4.preventDefault();
            if (sections.length <= 1)
              return alert("Cannot delete the last section.");
            if (confirm(`Delete "${sec.title}"?`))
              deleteSection(nb.id, sec.id);
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
        }, sec.id, false, undefined, this))
      }, undefined, false, undefined, this),
      u4("div", {
        class: "panel-footer",
        children: u4("button", {
          class: "add-btn",
          onClick: () => addSection(nb?.id),
          children: "+ Section"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/PagesPanel.jsx
init_hooks_module();
init_store();
var deletePageWithChildren = function(page) {
  if (!page.children?.length) {
    if (confirm(`Delete "${page.title}"?`))
      deletePage(page.id);
    return;
  }
  const choice = confirm(`"${page.title}" has ${page.children.length} subpage(s).\n\nOK = delete all subpages\nCancel = promote subpages to siblings`);
  if (choice) {
    deletePage(page.id);
  } else {
    Promise.resolve().then(() => (init_store(), exports_store)).then((m4) => {
      const { appState: st } = m4;
      const s5 = st.value;
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
      st.value = { ...st.value };
      Promise.resolve().then(() => (init_store(), exports_store)).then((m22) => m22.updatePageView(0, 0, 1));
    });
  }
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
          const t4 = prompt("Page name:", page.title);
          if (t4?.trim())
            renamePage(page.id, t4.trim());
        },
        onContextMenu: (e4) => {
          e4.preventDefault();
          const action = prompt("rename / delete / subpage / move", "rename");
          if (!action)
            return;
          if (action === "rename") {
            const t4 = prompt("Name:", page.title);
            if (t4?.trim())
              renamePage(page.id, t4.trim());
          } else if (action === "delete")
            deletePageWithChildren(page);
          else if (action === "subpage")
            addPage(page.id);
          else if (action === "move") {
            const nb = appState.value.notebooks.find((n3) => n3.id === appState.value.ui.notebookId);
            const opts = nb?.sections.map((s5) => `${s5.id}: ${s5.title}`).join("\n") ?? "";
            const input = prompt("Target section ID:\n" + opts);
            if (input)
              movePage(page.id, input.split(":")[0].trim());
          }
        },
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
    class: "panel",
    children: [
      u4("div", {
        class: "panel-label",
        children: "Pages"
      }, undefined, false, undefined, this),
      u4("div", {
        class: "panel-list",
        children: pages.map((pg) => u4(PageItem, {
          page: pg,
          activeId: ui.pageId,
          dragState,
          onDragChange
        }, pg.id, false, undefined, this))
      }, undefined, false, undefined, this),
      u4("div", {
        class: "panel-footer",
        children: u4("button", {
          class: "add-btn",
          onClick: () => addPage(),
          children: "+ Page"
        }, undefined, false, undefined, this)
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
function pushUndo(page) {
  const s5 = get(page.id);
  s5.past.push(JSON.stringify(page.blocks));
  s5.future = [];
  if (s5.past.length > 100)
    s5.past.shift();
}
function applyUndo(page) {
  const s5 = get(page.id);
  if (!s5.past.length)
    return null;
  s5.future.push(JSON.stringify(page.blocks));
  return JSON.parse(s5.past.pop());
}
function applyRedo(page) {
  const s5 = get(page.id);
  if (!s5.future.length)
    return null;
  s5.past.push(JSON.stringify(page.blocks));
  return JSON.parse(s5.future.pop());
}
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
      const pg = getActivePage();
      if (pg)
        pushUndo(pg);
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
    const pg = getActivePage();
    if (pg)
      pushUndo(pg);
    ctx.onBlockFocus?.(block.id);
  };
  const handleBlur = () => {
    clearTimeout(undoTimer.current);
    const el = contentRef.current;
    if (!el)
      return;
    const html = el.innerHTML;
    const isEmpty = !html || html === "<br>" || html.trim() === "";
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
var FormatToolbar = function() {
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
};
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
    pushUndo(pg);
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
      for (const [id, _3] of origPos) {
        const el = innerRef.current?.querySelector(`[data-block-id="${id}"]`);
        if (!el)
          continue;
        updateBlockPos(id, parseInt(el.style.left), parseInt(el.style.top));
      }
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
    if (pg)
      pushUndo(pg);
    function onMove(e22) {
      const dx = (e22.clientX - startX) / viewRef.current.zoom;
      el.style.width = Math.max(120, origW + dx) + "px";
    }
    function onUp() {
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
    const startX = e4.clientX;
    const pg = getActivePage();
    if (pg)
      pushUndo(pg);
    function onMove(e22) {
      const dx = (e22.clientX - startX) / viewRef.current.zoom;
      const newW = Math.max(40, origW + (dir.includes("e") ? dx : -dx));
      el.style.width = newW + "px";
      if (dir.includes("w"))
        el.style.left = origX - (newW - origW) + "px";
    }
    function onUp() {
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
        if (pg)
          pushUndo(pg);
        const defaultId = pg?.defaultBlockId;
        for (const id of selectedRef.current) {
          if (id !== defaultId)
            deleteBlock(id);
        }
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
    const blocks = applyUndo(pg);
    if (!blocks)
      return;
    pg.blocks = blocks;
    appState.value = { ...appState.value };
  }
  function doRedo() {
    const pg = getActivePage();
    if (!pg)
      return;
    const blocks = applyRedo(pg);
    if (!blocks)
      return;
    pg.blocks = blocks;
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
      u4(FormatToolbar, {}, undefined, false, undefined, this),
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
      u4(NotebookBar, {}, undefined, false, undefined, this),
      u4("div", {
        id: "main",
        children: [
          u4(SectionPanel, {}, undefined, false, undefined, this),
          u4(PagesPanel, {}, undefined, false, undefined, this),
          u4("div", {
            id: "canvas-area",
            children: u4(Canvas2, {
              page
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/main.jsx
J(u4(App, {}, undefined, false, undefined, this), document.getElementById("app"));

//# debugId=895F3472B7F442F664756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCAibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9kaXN0L2hvb2tzLm1vZHVsZS5qcyIsICJub2RlX21vZHVsZXMvQHByZWFjdC9zaWduYWxzLWNvcmUvZGlzdC9zaWduYWxzLWNvcmUubW9kdWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9AcHJlYWN0L3NpZ25hbHMvZGlzdC9zaWduYWxzLm1vZHVsZS5qcyIsICJzcmMvc3RvcmUuanMiLCAic3JjL21haW4uanN4IiwgInNyYy9BcHAuanN4IiwgInNyYy9Ob3RlYm9va0Jhci5qc3giLCAibm9kZV9tb2R1bGVzL3ByZWFjdC9qc3gtcnVudGltZS9kaXN0L2pzeFJ1bnRpbWUubW9kdWxlLmpzIiwgIm5vZGVfbW9kdWxlcy9wcmVhY3QvanN4LXJ1bnRpbWUvZGlzdC9qc3hSdW50aW1lLm1vZHVsZS5qcyIsICJub2RlX21vZHVsZXMvcHJlYWN0L2pzeC1ydW50aW1lL2Rpc3QvanN4UnVudGltZS5tb2R1bGUuanMiLCAic3JjL1NlY3Rpb25QYW5lbC5qc3giLCAic3JjL1BhZ2VzUGFuZWwuanN4IiwgInNyYy9QYWdlc1BhbmVsLmpzeCIsICJzcmMvQ2FudmFzLmpzeCIsICJzcmMvQmxvY2suanN4IiwgInNyYy9CbG9jay5qc3giLCAic3JjL2VkaXRvci5qcyIsICJzcmMvdW5kby5qcyIsICJzcmMvQmxvY2suanN4IiwgInNyYy9DYW52YXMuanN4IiwgInNyYy9DYW52YXMuanN4IiwgInNyYy9DYW52YXMuanN4IiwgInNyYy9BcHAuanN4IiwgInNyYy9tYWluLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJ2YXIgbixsLHUsdCxpLHIsbyxlLGYsYyxzLGEsaCxwPXt9LHY9W10seT0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGQ9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiB3KG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGcobil7biYmbi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gXyhsLHUsdCl7dmFyIGkscixvLGU9e307Zm9yKG8gaW4gdSlcImtleVwiPT1vP2k9dVtvXTpcInJlZlwiPT1vP3I9dVtvXTplW29dPXVbb107aWYoYXJndW1lbnRzLmxlbmd0aD4yJiYoZS5jaGlsZHJlbj1hcmd1bWVudHMubGVuZ3RoPjM/bi5jYWxsKGFyZ3VtZW50cywyKTp0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiZudWxsIT1sLmRlZmF1bHRQcm9wcylmb3IobyBpbiBsLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1lW29dJiYoZVtvXT1sLmRlZmF1bHRQcm9wc1tvXSk7cmV0dXJuIG0obCxlLGkscixudWxsKX1mdW5jdGlvbiBtKG4sdCxpLHIsbyl7dmFyIGU9e3R5cGU6bixwcm9wczp0LGtleTppLHJlZjpyLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpudWxsPT1vPysrdTpvLF9faTotMSxfX3U6MH07cmV0dXJuIG51bGw9PW8mJm51bGwhPWwudm5vZGUmJmwudm5vZGUoZSksZX1mdW5jdGlvbiBiKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gayhuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiB4KG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIFMobixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP1Mobi5fXyxuLl9faSsxKTpudWxsO2Zvcih2YXIgdTtsPG4uX19rLmxlbmd0aDtsKyspaWYobnVsbCE9KHU9bi5fX2tbbF0pJiZudWxsIT11Ll9fZSlyZXR1cm4gdS5fX2U7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlP1Mobik6bnVsbH1mdW5jdGlvbiBDKG4pe2lmKG4uX19QJiZuLl9fZCl7dmFyIHU9bi5fX3YsdD11Ll9fZSxpPVtdLHI9W10sbz13KHt9LHUpO28uX192PXUuX192KzEsbC52bm9kZSYmbC52bm9kZShvKSx6KG4uX19QLG8sdSxuLl9fbixuLl9fUC5uYW1lc3BhY2VVUkksMzImdS5fX3U/W3RdOm51bGwsaSxudWxsPT10P1ModSk6dCwhISgzMiZ1Ll9fdSksciksby5fX3Y9dS5fX3Ysby5fXy5fX2tbby5fX2ldPW8sVihpLG8sciksdS5fX2U9dS5fXz1udWxsLG8uX19lIT10JiZNKG8pfX1mdW5jdGlvbiBNKG4pe2lmKG51bGwhPShuPW4uX18pJiZudWxsIT1uLl9fYylyZXR1cm4gbi5fX2U9bi5fX2MuYmFzZT1udWxsLG4uX19rLnNvbWUoZnVuY3Rpb24obCl7aWYobnVsbCE9bCYmbnVsbCE9bC5fX2UpcmV0dXJuIG4uX19lPW4uX19jLmJhc2U9bC5fX2V9KSxNKG4pfWZ1bmN0aW9uICQobil7KCFuLl9fZCYmKG4uX19kPSEwKSYmaS5wdXNoKG4pJiYhSS5fX3IrK3x8ciE9bC5kZWJvdW5jZVJlbmRlcmluZykmJigocj1sLmRlYm91bmNlUmVuZGVyaW5nKXx8bykoSSl9ZnVuY3Rpb24gSSgpe2Zvcih2YXIgbixsPTE7aS5sZW5ndGg7KWkubGVuZ3RoPmwmJmkuc29ydChlKSxuPWkuc2hpZnQoKSxsPWkubGVuZ3RoLEMobik7SS5fX3I9MH1mdW5jdGlvbiBQKG4sbCx1LHQsaSxyLG8sZSxmLGMscyl7dmFyIGEsaCx5LGQsdyxnLF8sbT10JiZ0Ll9fa3x8dixiPWwubGVuZ3RoO2ZvcihmPUEodSxsLG0sZixiKSxhPTA7YTxiO2ErKyludWxsIT0oeT11Ll9fa1thXSkmJihoPS0xIT15Ll9faSYmbVt5Ll9faV18fHAseS5fX2k9YSxnPXoobix5LGgsaSxyLG8sZSxmLGMscyksZD15Ll9fZSx5LnJlZiYmaC5yZWYhPXkucmVmJiYoaC5yZWYmJkQoaC5yZWYsbnVsbCx5KSxzLnB1c2goeS5yZWYseS5fX2N8fGQseSkpLG51bGw9PXcmJm51bGwhPWQmJih3PWQpLChfPSEhKDQmeS5fX3UpKXx8aC5fX2s9PT15Ll9faz9mPUgoeSxmLG4sXyk6XCJmdW5jdGlvblwiPT10eXBlb2YgeS50eXBlJiZ2b2lkIDAhPT1nP2Y9ZzpkJiYoZj1kLm5leHRTaWJsaW5nKSx5Ll9fdSY9LTcpO3JldHVybiB1Ll9fZT13LGZ9ZnVuY3Rpb24gQShuLGwsdSx0LGkpe3ZhciByLG8sZSxmLGMscz11Lmxlbmd0aCxhPXMsaD0wO2ZvcihuLl9faz1uZXcgQXJyYXkoaSkscj0wO3I8aTtyKyspbnVsbCE9KG89bFtyXSkmJlwiYm9vbGVhblwiIT10eXBlb2YgbyYmXCJmdW5jdGlvblwiIT10eXBlb2Ygbz8oXCJzdHJpbmdcIj09dHlwZW9mIG98fFwibnVtYmVyXCI9PXR5cGVvZiBvfHxcImJpZ2ludFwiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09U3RyaW5nP289bi5fX2tbcl09bShudWxsLG8sbnVsbCxudWxsLG51bGwpOmQobyk/bz1uLl9fa1tyXT1tKGsse2NoaWxkcmVuOm99LG51bGwsbnVsbCxudWxsKTp2b2lkIDA9PT1vLmNvbnN0cnVjdG9yJiZvLl9fYj4wP289bi5fX2tbcl09bShvLnR5cGUsby5wcm9wcyxvLmtleSxvLnJlZj9vLnJlZjpudWxsLG8uX192KTpuLl9fa1tyXT1vLGY9citoLG8uX189bixvLl9fYj1uLl9fYisxLGU9bnVsbCwtMSE9KGM9by5fX2k9VChvLHUsZixhKSkmJihhLS0sKGU9dVtjXSkmJihlLl9fdXw9MikpLG51bGw9PWV8fG51bGw9PWUuX192PygtMT09YyYmKGk+cz9oLS06aTxzJiZoKyspLFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8udHlwZSYmKG8uX191fD00KSk6YyE9ZiYmKGM9PWYtMT9oLS06Yz09ZisxP2grKzooYz5mP2gtLTpoKyssby5fX3V8PTQpKSk6bi5fX2tbcl09bnVsbDtpZihhKWZvcihyPTA7cjxzO3IrKyludWxsIT0oZT11W3JdKSYmMD09KDImZS5fX3UpJiYoZS5fX2U9PXQmJih0PVMoZSkpLEUoZSxlKSk7cmV0dXJuIHR9ZnVuY3Rpb24gSChuLGwsdSx0KXt2YXIgaSxyO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4udHlwZSl7Zm9yKGk9bi5fX2sscj0wO2kmJnI8aS5sZW5ndGg7cisrKWlbcl0mJihpW3JdLl9fPW4sbD1IKGlbcl0sbCx1LHQpKTtyZXR1cm4gbH1uLl9fZSE9bCYmKHQmJihsJiZuLnR5cGUmJiFsLnBhcmVudE5vZGUmJihsPVMobikpLHUuaW5zZXJ0QmVmb3JlKG4uX19lLGx8fG51bGwpKSxsPW4uX19lKTtkb3tsPWwmJmwubmV4dFNpYmxpbmd9d2hpbGUobnVsbCE9bCYmOD09bC5ub2RlVHlwZSk7cmV0dXJuIGx9ZnVuY3Rpb24gTChuLGwpe3JldHVybiBsPWx8fFtdLG51bGw9PW58fFwiYm9vbGVhblwiPT10eXBlb2Ygbnx8KGQobik/bi5zb21lKGZ1bmN0aW9uKG4pe0wobixsKX0pOmwucHVzaChuKSksbH1mdW5jdGlvbiBUKG4sbCx1LHQpe3ZhciBpLHIsbyxlPW4ua2V5LGY9bi50eXBlLGM9bFt1XSxzPW51bGwhPWMmJjA9PSgyJmMuX191KTtpZihudWxsPT09YyYmbnVsbD09ZXx8cyYmZT09Yy5rZXkmJmY9PWMudHlwZSlyZXR1cm4gdTtpZih0PihzPzE6MCkpZm9yKGk9dS0xLHI9dSsxO2k+PTB8fHI8bC5sZW5ndGg7KWlmKG51bGwhPShjPWxbbz1pPj0wP2ktLTpyKytdKSYmMD09KDImYy5fX3UpJiZlPT1jLmtleSYmZj09Yy50eXBlKXJldHVybiBvO3JldHVybi0xfWZ1bmN0aW9uIGoobixsLHUpe1wiLVwiPT1sWzBdP24uc2V0UHJvcGVydHkobCxudWxsPT11P1wiXCI6dSk6bltsXT1udWxsPT11P1wiXCI6XCJudW1iZXJcIiE9dHlwZW9mIHV8fHkudGVzdChsKT91OnUrXCJweFwifWZ1bmN0aW9uIEYobixsLHUsdCxpKXt2YXIgcixvO246aWYoXCJzdHlsZVwiPT1sKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB1KW4uc3R5bGUuY3NzVGV4dD11O2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJihuLnN0eWxlLmNzc1RleHQ9dD1cIlwiKSx0KWZvcihsIGluIHQpdSYmbCBpbiB1fHxqKG4uc3R5bGUsbCxcIlwiKTtpZih1KWZvcihsIGluIHUpdCYmdVtsXT09dFtsXXx8aihuLnN0eWxlLGwsdVtsXSl9ZWxzZSBpZihcIm9cIj09bFswXSYmXCJuXCI9PWxbMV0pcj1sIT0obD1sLnJlcGxhY2UoZixcIiQxXCIpKSxvPWwudG9Mb3dlckNhc2UoKSxsPW8gaW4gbnx8XCJvbkZvY3VzT3V0XCI9PWx8fFwib25Gb2N1c0luXCI9PWw/by5zbGljZSgyKTpsLnNsaWNlKDIpLG4ubHx8KG4ubD17fSksbi5sW2wrcl09dSx1P3Q/dS51PXQudToodS51PWMsbi5hZGRFdmVudExpc3RlbmVyKGwscj9hOnMscikpOm4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLHI/YTpzLHIpO2Vsc2V7aWYoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT1pKWw9bC5yZXBsYWNlKC94bGluayhIfDpoKS8sXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sXCJzXCIpO2Vsc2UgaWYoXCJ3aWR0aFwiIT1sJiZcImhlaWdodFwiIT1sJiZcImhyZWZcIiE9bCYmXCJsaXN0XCIhPWwmJlwiZm9ybVwiIT1sJiZcInRhYkluZGV4XCIhPWwmJlwiZG93bmxvYWRcIiE9bCYmXCJyb3dTcGFuXCIhPWwmJlwiY29sU3BhblwiIT1sJiZcInJvbGVcIiE9bCYmXCJwb3BvdmVyXCIhPWwmJmwgaW4gbil0cnl7bltsXT1udWxsPT11P1wiXCI6dTticmVhayBufWNhdGNoKG4pe31cImZ1bmN0aW9uXCI9PXR5cGVvZiB1fHwobnVsbD09dXx8ITE9PT11JiZcIi1cIiE9bFs0XT9uLnJlbW92ZUF0dHJpYnV0ZShsKTpuLnNldEF0dHJpYnV0ZShsLFwicG9wb3ZlclwiPT1sJiYxPT11P1wiXCI6dSkpfX1mdW5jdGlvbiBPKG4pe3JldHVybiBmdW5jdGlvbih1KXtpZih0aGlzLmwpe3ZhciB0PXRoaXMubFt1LnR5cGUrbl07aWYobnVsbD09dS50KXUudD1jKys7ZWxzZSBpZih1LnQ8dC51KXJldHVybjtyZXR1cm4gdChsLmV2ZW50P2wuZXZlbnQodSk6dSl9fX1mdW5jdGlvbiB6KG4sdSx0LGkscixvLGUsZixjLHMpe3ZhciBhLGgscCx5LF8sbSxiLFMsQyxNLCQsSSxBLEgsTCxUPXUudHlwZTtpZih2b2lkIDAhPT11LmNvbnN0cnVjdG9yKXJldHVybiBudWxsOzEyOCZ0Ll9fdSYmKGM9ISEoMzImdC5fX3UpLG89W2Y9dS5fX2U9dC5fX2VdKSwoYT1sLl9fYikmJmEodSk7bjppZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBUKXRyeXtpZihTPXUucHJvcHMsQz1cInByb3RvdHlwZVwiaW4gVCYmVC5wcm90b3R5cGUucmVuZGVyLE09KGE9VC5jb250ZXh0VHlwZSkmJmlbYS5fX2NdLCQ9YT9NP00ucHJvcHMudmFsdWU6YS5fXzppLHQuX19jP2I9KGg9dS5fX2M9dC5fX2MpLl9fPWguX19FOihDP3UuX19jPWg9bmV3IFQoUywkKToodS5fX2M9aD1uZXcgeChTLCQpLGguY29uc3RydWN0b3I9VCxoLnJlbmRlcj1HKSxNJiZNLnN1YihoKSxoLnN0YXRlfHwoaC5zdGF0ZT17fSksaC5fX249aSxwPWguX19kPSEwLGguX19oPVtdLGguX3NiPVtdKSxDJiZudWxsPT1oLl9fcyYmKGguX19zPWguc3RhdGUpLEMmJm51bGwhPVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiYoaC5fX3M9PWguc3RhdGUmJihoLl9fcz13KHt9LGguX19zKSksdyhoLl9fcyxULmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhTLGguX19zKSkpLHk9aC5wcm9wcyxfPWguc3RhdGUsaC5fX3Y9dSxwKUMmJm51bGw9PVQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSxDJiZudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYoQyYmbnVsbD09VC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJlMhPT15JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhTLCQpLHUuX192PT10Ll9fdnx8IWguX19lJiZudWxsIT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZSYmITE9PT1oLnNob3VsZENvbXBvbmVudFVwZGF0ZShTLGguX19zLCQpKXt1Ll9fdiE9dC5fX3YmJihoLnByb3BzPVMsaC5zdGF0ZT1oLl9fcyxoLl9fZD0hMSksdS5fX2U9dC5fX2UsdS5fX2s9dC5fX2ssdS5fX2suc29tZShmdW5jdGlvbihuKXtuJiYobi5fXz11KX0pLHYucHVzaC5hcHBseShoLl9faCxoLl9zYiksaC5fc2I9W10saC5fX2gubGVuZ3RoJiZlLnB1c2goaCk7YnJlYWsgbn1udWxsIT1oLmNvbXBvbmVudFdpbGxVcGRhdGUmJmguY29tcG9uZW50V2lsbFVwZGF0ZShTLGguX19zLCQpLEMmJm51bGwhPWguY29tcG9uZW50RGlkVXBkYXRlJiZoLl9faC5wdXNoKGZ1bmN0aW9uKCl7aC5jb21wb25lbnREaWRVcGRhdGUoeSxfLG0pfSl9aWYoaC5jb250ZXh0PSQsaC5wcm9wcz1TLGguX19QPW4saC5fX2U9ITEsST1sLl9fcixBPTAsQyloLnN0YXRlPWguX19zLGguX19kPSExLEkmJkkodSksYT1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSx2LnB1c2guYXBwbHkoaC5fX2gsaC5fc2IpLGguX3NiPVtdO2Vsc2UgZG97aC5fX2Q9ITEsSSYmSSh1KSxhPWgucmVuZGVyKGgucHJvcHMsaC5zdGF0ZSxoLmNvbnRleHQpLGguc3RhdGU9aC5fX3N9d2hpbGUoaC5fX2QmJisrQTwyNSk7aC5zdGF0ZT1oLl9fcyxudWxsIT1oLmdldENoaWxkQ29udGV4dCYmKGk9dyh3KHt9LGkpLGguZ2V0Q2hpbGRDb250ZXh0KCkpKSxDJiYhcCYmbnVsbCE9aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSYmKG09aC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh5LF8pKSxIPW51bGwhPWEmJmEudHlwZT09PWsmJm51bGw9PWEua2V5P3EoYS5wcm9wcy5jaGlsZHJlbik6YSxmPVAobixkKEgpP0g6W0hdLHUsdCxpLHIsbyxlLGYsYyxzKSxoLmJhc2U9dS5fX2UsdS5fX3UmPS0xNjEsaC5fX2gubGVuZ3RoJiZlLnB1c2goaCksYiYmKGguX19FPWguX189bnVsbCl9Y2F0Y2gobil7aWYodS5fX3Y9bnVsbCxjfHxudWxsIT1vKWlmKG4udGhlbil7Zm9yKHUuX191fD1jPzE2MDoxMjg7ZiYmOD09Zi5ub2RlVHlwZSYmZi5uZXh0U2libGluZzspZj1mLm5leHRTaWJsaW5nO29bby5pbmRleE9mKGYpXT1udWxsLHUuX19lPWZ9ZWxzZXtmb3IoTD1vLmxlbmd0aDtMLS07KWcob1tMXSk7Tih1KX1lbHNlIHUuX19lPXQuX19lLHUuX19rPXQuX19rLG4udGhlbnx8Tih1KTtsLl9fZShuLHUsdCl9ZWxzZSBudWxsPT1vJiZ1Ll9fdj09dC5fX3Y/KHUuX19rPXQuX19rLHUuX19lPXQuX19lKTpmPXUuX19lPUIodC5fX2UsdSx0LGkscixvLGUsYyxzKTtyZXR1cm4oYT1sLmRpZmZlZCkmJmEodSksMTI4JnUuX191P3ZvaWQgMDpmfWZ1bmN0aW9uIE4obil7biYmKG4uX19jJiYobi5fX2MuX19lPSEwKSxuLl9fayYmbi5fX2suc29tZShOKSl9ZnVuY3Rpb24gVihuLHUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspRCh0W2ldLHRbKytpXSx0WysraV0pO2wuX19jJiZsLl9fYyh1LG4pLG4uc29tZShmdW5jdGlvbih1KXt0cnl7bj11Ll9faCx1Ll9faD1bXSxuLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobil7bC5fX2Uobix1Ll9fdil9fSl9ZnVuY3Rpb24gcShuKXtyZXR1cm5cIm9iamVjdFwiIT10eXBlb2Ygbnx8bnVsbD09bnx8bi5fX2I+MD9uOmQobik/bi5tYXAocSk6dyh7fSxuKX1mdW5jdGlvbiBCKHUsdCxpLHIsbyxlLGYsYyxzKXt2YXIgYSxoLHYseSx3LF8sbSxiPWkucHJvcHN8fHAsaz10LnByb3BzLHg9dC50eXBlO2lmKFwic3ZnXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI6XCJtYXRoXCI9PXg/bz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjpvfHwobz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiksbnVsbCE9ZSlmb3IoYT0wO2E8ZS5sZW5ndGg7YSsrKWlmKCh3PWVbYV0pJiZcInNldEF0dHJpYnV0ZVwiaW4gdz09ISF4JiYoeD93LmxvY2FsTmFtZT09eDozPT13Lm5vZGVUeXBlKSl7dT13LGVbYV09bnVsbDticmVha31pZihudWxsPT11KXtpZihudWxsPT14KXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShrKTt1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhvLHgsay5pcyYmayksYyYmKGwuX19tJiZsLl9fbSh0LGUpLGM9ITEpLGU9bnVsbH1pZihudWxsPT14KWI9PT1rfHxjJiZ1LmRhdGE9PWt8fCh1LmRhdGE9ayk7ZWxzZXtpZihlPWUmJm4uY2FsbCh1LmNoaWxkTm9kZXMpLCFjJiZudWxsIT1lKWZvcihiPXt9LGE9MDthPHUuYXR0cmlidXRlcy5sZW5ndGg7YSsrKWJbKHc9dS5hdHRyaWJ1dGVzW2FdKS5uYW1lXT13LnZhbHVlO2ZvcihhIGluIGIpdz1iW2FdLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIj09YT92PXc6XCJjaGlsZHJlblwiPT1hfHxhIGluIGt8fFwidmFsdWVcIj09YSYmXCJkZWZhdWx0VmFsdWVcImluIGt8fFwiY2hlY2tlZFwiPT1hJiZcImRlZmF1bHRDaGVja2VkXCJpbiBrfHxGKHUsYSxudWxsLHcsbyk7Zm9yKGEgaW4gayl3PWtbYV0sXCJjaGlsZHJlblwiPT1hP3k9dzpcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCI9PWE/aD13OlwidmFsdWVcIj09YT9fPXc6XCJjaGVja2VkXCI9PWE/bT13OmMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHd8fGJbYV09PT13fHxGKHUsYSx3LGJbYV0sbyk7aWYoaCljfHx2JiYoaC5fX2h0bWw9PXYuX19odG1sfHxoLl9faHRtbD09dS5pbm5lckhUTUwpfHwodS5pbm5lckhUTUw9aC5fX2h0bWwpLHQuX19rPVtdO2Vsc2UgaWYodiYmKHUuaW5uZXJIVE1MPVwiXCIpLFAoXCJ0ZW1wbGF0ZVwiPT10LnR5cGU/dS5jb250ZW50OnUsZCh5KT95Olt5XSx0LGkscixcImZvcmVpZ25PYmplY3RcIj09eD9cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjpvLGUsZixlP2VbMF06aS5fX2smJlMoaSwwKSxjLHMpLG51bGwhPWUpZm9yKGE9ZS5sZW5ndGg7YS0tOylnKGVbYV0pO2N8fChhPVwidmFsdWVcIixcInByb2dyZXNzXCI9PXgmJm51bGw9PV8/dS5yZW1vdmVBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTpudWxsIT1fJiYoXyE9PXVbYV18fFwicHJvZ3Jlc3NcIj09eCYmIV98fFwib3B0aW9uXCI9PXgmJl8hPWJbYV0pJiZGKHUsYSxfLGJbYV0sbyksYT1cImNoZWNrZWRcIixudWxsIT1tJiZtIT11W2FdJiZGKHUsYSxtLGJbYV0sbykpfXJldHVybiB1fWZ1bmN0aW9uIEQobix1LHQpe3RyeXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXt2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLl9fdTtpJiZuLl9fdSgpLGkmJm51bGw9PXV8fChuLl9fdT1uKHUpKX1lbHNlIG4uY3VycmVudD11fWNhdGNoKG4pe2wuX19lKG4sdCl9fWZ1bmN0aW9uIEUobix1LHQpe3ZhciBpLHI7aWYobC51bm1vdW50JiZsLnVubW91bnQobiksKGk9bi5yZWYpJiYoaS5jdXJyZW50JiZpLmN1cnJlbnQhPW4uX19lfHxEKGksbnVsbCx1KSksbnVsbCE9KGk9bi5fX2MpKXtpZihpLmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXtpLmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobil7bC5fX2Uobix1KX1pLmJhc2U9aS5fX1A9bnVsbH1pZihpPW4uX19rKWZvcihyPTA7cjxpLmxlbmd0aDtyKyspaVtyXSYmRShpW3JdLHUsdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbi50eXBlKTt0fHxnKG4uX19lKSxuLl9fYz1uLl9fPW4uX19lPXZvaWQgMH1mdW5jdGlvbiBHKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIEoodSx0LGkpe3ZhciByLG8sZSxmO3Q9PWRvY3VtZW50JiYodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLGwuX18mJmwuX18odSx0KSxvPShyPVwiZnVuY3Rpb25cIj09dHlwZW9mIGkpP251bGw6aSYmaS5fX2t8fHQuX19rLGU9W10sZj1bXSx6KHQsdT0oIXImJml8fHQpLl9faz1fKGssbnVsbCxbdV0pLG98fHAscCx0Lm5hbWVzcGFjZVVSSSwhciYmaT9baV06bz9udWxsOnQuZmlyc3RDaGlsZD9uLmNhbGwodC5jaGlsZE5vZGVzKTpudWxsLGUsIXImJmk/aTpvP28uX19lOnQuZmlyc3RDaGlsZCxyLGYpLFYoZSx1LGYpfWZ1bmN0aW9uIEsobixsKXtKKG4sbCxLKX1mdW5jdGlvbiBRKGwsdSx0KXt2YXIgaSxyLG8sZSxmPXcoe30sbC5wcm9wcyk7Zm9yKG8gaW4gbC50eXBlJiZsLnR5cGUuZGVmYXVsdFByb3BzJiYoZT1sLnR5cGUuZGVmYXVsdFByb3BzKSx1KVwia2V5XCI9PW8/aT11W29dOlwicmVmXCI9PW8/cj11W29dOmZbb109dm9pZCAwPT09dVtvXSYmbnVsbCE9ZT9lW29dOnVbb107cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MiYmKGYuY2hpbGRyZW49YXJndW1lbnRzLmxlbmd0aD4zP24uY2FsbChhcmd1bWVudHMsMik6dCksbShsLnR5cGUsZixpfHxsLmtleSxyfHxsLnJlZixudWxsKX1mdW5jdGlvbiBSKG4pe2Z1bmN0aW9uIGwobil7dmFyIHUsdDtyZXR1cm4gdGhpcy5nZXRDaGlsZENvbnRleHR8fCh1PW5ldyBTZXQsKHQ9e30pW2wuX19jXT10aGlzLHRoaXMuZ2V0Q2hpbGRDb250ZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt1PW51bGx9LHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMucHJvcHMudmFsdWUhPW4udmFsdWUmJnUuZm9yRWFjaChmdW5jdGlvbihuKXtuLl9fZT0hMCwkKG4pfSl9LHRoaXMuc3ViPWZ1bmN0aW9uKG4pe3UuYWRkKG4pO3ZhciBsPW4uY29tcG9uZW50V2lsbFVubW91bnQ7bi5jb21wb25lbnRXaWxsVW5tb3VudD1mdW5jdGlvbigpe3UmJnUuZGVsZXRlKG4pLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufXJldHVybiBsLl9fYz1cIl9fY0NcIitoKyssbC5fXz1uLGwuUHJvdmlkZXI9bC5fX2w9KGwuQ29uc3VtZXI9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5jaGlsZHJlbihsKX0pLmNvbnRleHRUeXBlPWwsbH1uPXYuc2xpY2UsbD17X19lOmZ1bmN0aW9uKG4sbCx1LHQpe2Zvcih2YXIgaSxyLG87bD1sLl9fOylpZigoaT1sLl9fYykmJiFpLl9fKXRyeXtpZigocj1pLmNvbnN0cnVjdG9yKSYmbnVsbCE9ci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3ImJihpLnNldFN0YXRlKHIuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKG4pKSxvPWkuX19kKSxudWxsIT1pLmNvbXBvbmVudERpZENhdGNoJiYoaS5jb21wb25lbnREaWRDYXRjaChuLHR8fHt9KSxvPWkuX19kKSxvKXJldHVybiBpLl9fRT1pfWNhdGNoKGwpe249bH10aHJvdyBufX0sdT0wLHQ9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LHgucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT1udWxsIT10aGlzLl9fcyYmdGhpcy5fX3MhPXRoaXMuc3RhdGU/dGhpcy5fX3M6dGhpcy5fX3M9dyh7fSx0aGlzLnN0YXRlKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj1uKHcoe30sdSksdGhpcy5wcm9wcykpLG4mJncodSxuKSxudWxsIT1uJiZ0aGlzLl9fdiYmKGwmJnRoaXMuX3NiLnB1c2gobCksJCh0aGlzKSl9LHgucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKG4pe3RoaXMuX192JiYodGhpcy5fX2U9ITAsbiYmdGhpcy5fX2gucHVzaChuKSwkKHRoaXMpKX0seC5wcm90b3R5cGUucmVuZGVyPWssaT1bXSxvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2U/UHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTpzZXRUaW1lb3V0LGU9ZnVuY3Rpb24obixsKXtyZXR1cm4gbi5fX3YuX19iLWwuX192Ll9fYn0sSS5fX3I9MCxmPS8oUG9pbnRlckNhcHR1cmUpJHxDYXB0dXJlJC9pLGM9MCxzPU8oITEpLGE9TyghMCksaD0wO2V4cG9ydHt4IGFzIENvbXBvbmVudCxrIGFzIEZyYWdtZW50LFEgYXMgY2xvbmVFbGVtZW50LFIgYXMgY3JlYXRlQ29udGV4dCxfIGFzIGNyZWF0ZUVsZW1lbnQsYiBhcyBjcmVhdGVSZWYsXyBhcyBoLEsgYXMgaHlkcmF0ZSx0IGFzIGlzVmFsaWRFbGVtZW50LGwgYXMgb3B0aW9ucyxKIGFzIHJlbmRlcixMIGFzIHRvQ2hpbGRBcnJheX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwKICAiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCxyLHUsaSxvPTAsZj1bXSxjPW4sZT1jLl9fYixhPWMuX19yLHY9Yy5kaWZmZWQsbD1jLl9fYyxtPWMudW5tb3VudCxzPWMuX187ZnVuY3Rpb24gcChuLHQpe2MuX19oJiZjLl9faChyLG4sb3x8dCksbz0wO3ZhciB1PXIuX19IfHwoci5fX0g9e19fOltdLF9faDpbXX0pO3JldHVybiBuPj11Ll9fLmxlbmd0aCYmdS5fXy5wdXNoKHt9KSx1Ll9fW25dfWZ1bmN0aW9uIGQobil7cmV0dXJuIG89MSxoKEQsbil9ZnVuY3Rpb24gaChuLHUsaSl7dmFyIG89cCh0KyssMik7aWYoby50PW4sIW8uX19jJiYoby5fXz1baT9pKHUpOkQodm9pZCAwLHUpLGZ1bmN0aW9uKG4pe3ZhciB0PW8uX19OP28uX19OWzBdOm8uX19bMF0scj1vLnQodCxuKTt0IT09ciYmKG8uX19OPVtyLG8uX19bMV1dLG8uX19jLnNldFN0YXRlKHt9KSl9XSxvLl9fYz1yLCFyLl9fZikpe3ZhciBmPWZ1bmN0aW9uKG4sdCxyKXtpZighby5fX2MuX19IKXJldHVybiEwO3ZhciB1PW8uX19jLl9fSC5fXy5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIG4uX19jfSk7aWYodS5ldmVyeShmdW5jdGlvbihuKXtyZXR1cm4hbi5fX059KSlyZXR1cm4hY3x8Yy5jYWxsKHRoaXMsbix0LHIpO3ZhciBpPW8uX19jLnByb3BzIT09bjtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKG4pe2lmKG4uX19OKXt2YXIgdD1uLl9fWzBdO24uX189bi5fX04sbi5fX049dm9pZCAwLHQhPT1uLl9fWzBdJiYoaT0hMCl9fSksYyYmYy5jYWxsKHRoaXMsbix0LHIpfHxpfTtyLl9fZj0hMDt2YXIgYz1yLnNob3VsZENvbXBvbmVudFVwZGF0ZSxlPXIuY29tcG9uZW50V2lsbFVwZGF0ZTtyLmNvbXBvbmVudFdpbGxVcGRhdGU9ZnVuY3Rpb24obix0LHIpe2lmKHRoaXMuX19lKXt2YXIgdT1jO2M9dm9pZCAwLGYobix0LHIpLGM9dX1lJiZlLmNhbGwodGhpcyxuLHQscil9LHIuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ9cmV0dXJuIG8uX19OfHxvLl9ffWZ1bmN0aW9uIHkobix1KXt2YXIgaT1wKHQrKywzKTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX0guX19oLnB1c2goaSkpfWZ1bmN0aW9uIF8obix1KXt2YXIgaT1wKHQrKyw0KTshYy5fX3MmJkMoaS5fX0gsdSkmJihpLl9fPW4saS51PXUsci5fX2gucHVzaChpKSl9ZnVuY3Rpb24gQShuKXtyZXR1cm4gbz01LFQoZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpufX0sW10pfWZ1bmN0aW9uIEYobix0LHIpe289NixfKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbil7dmFyIHI9bih0KCkpO3JldHVybiBmdW5jdGlvbigpe24obnVsbCksciYmXCJmdW5jdGlvblwiPT10eXBlb2YgciYmcigpfX1pZihuKXJldHVybiBuLmN1cnJlbnQ9dCgpLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY3VycmVudD1udWxsfX0sbnVsbD09cj9yOnIuY29uY2F0KG4pKX1mdW5jdGlvbiBUKG4scil7dmFyIHU9cCh0KyssNyk7cmV0dXJuIEModS5fX0gscikmJih1Ll9fPW4oKSx1Ll9fSD1yLHUuX19oPW4pLHUuX199ZnVuY3Rpb24gcShuLHQpe3JldHVybiBvPTgsVChmdW5jdGlvbigpe3JldHVybiBufSx0KX1mdW5jdGlvbiB4KG4pe3ZhciB1PXIuY29udGV4dFtuLl9fY10saT1wKHQrKyw5KTtyZXR1cm4gaS5jPW4sdT8obnVsbD09aS5fXyYmKGkuX189ITAsdS5zdWIocikpLHUucHJvcHMudmFsdWUpOm4uX199ZnVuY3Rpb24gUChuLHQpe2MudXNlRGVidWdWYWx1ZSYmYy51c2VEZWJ1Z1ZhbHVlKHQ/dChuKTpuKX1mdW5jdGlvbiBiKG4pe3ZhciB1PXAodCsrLDEwKSxpPWQoKTtyZXR1cm4gdS5fXz1uLHIuY29tcG9uZW50RGlkQ2F0Y2h8fChyLmNvbXBvbmVudERpZENhdGNoPWZ1bmN0aW9uKG4sdCl7dS5fXyYmdS5fXyhuLHQpLGlbMV0obil9KSxbaVswXSxmdW5jdGlvbigpe2lbMV0odm9pZCAwKX1dfWZ1bmN0aW9uIGcoKXt2YXIgbj1wKHQrKywxMSk7aWYoIW4uX18pe2Zvcih2YXIgdT1yLl9fdjtudWxsIT09dSYmIXUuX19tJiZudWxsIT09dS5fXzspdT11Ll9fO3ZhciBpPXUuX19tfHwodS5fX209WzAsMF0pO24uX189XCJQXCIraVswXStcIi1cIitpWzFdKyt9cmV0dXJuIG4uX199ZnVuY3Rpb24gaigpe2Zvcih2YXIgbjtuPWYuc2hpZnQoKTspe3ZhciB0PW4uX19IO2lmKG4uX19QJiZ0KXRyeXt0Ll9faC5zb21lKHopLHQuX19oLnNvbWUoQiksdC5fX2g9W119Y2F0Y2gocil7dC5fX2g9W10sYy5fX2UocixuLl9fdil9fX1jLl9fYj1mdW5jdGlvbihuKXtyPW51bGwsZSYmZShuKX0sYy5fXz1mdW5jdGlvbihuLHQpe24mJnQuX19rJiZ0Ll9fay5fX20mJihuLl9fbT10Ll9fay5fX20pLHMmJnMobix0KX0sYy5fX3I9ZnVuY3Rpb24obil7YSYmYShuKSx0PTA7dmFyIGk9KHI9bi5fX2MpLl9fSDtpJiYodT09PXI/KGkuX19oPVtdLHIuX19oPVtdLGkuX18uc29tZShmdW5jdGlvbihuKXtuLl9fTiYmKG4uX189bi5fX04pLG4udT1uLl9fTj12b2lkIDB9KSk6KGkuX19oLnNvbWUoeiksaS5fX2guc29tZShCKSxpLl9faD1bXSx0PTApKSx1PXJ9LGMuZGlmZmVkPWZ1bmN0aW9uKG4pe3YmJnYobik7dmFyIHQ9bi5fX2M7dCYmdC5fX0gmJih0Ll9fSC5fX2gubGVuZ3RoJiYoMSE9PWYucHVzaCh0KSYmaT09PWMucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKGk9Yy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHx3KShqKSksdC5fX0guX18uc29tZShmdW5jdGlvbihuKXtuLnUmJihuLl9fSD1uLnUpLG4udT12b2lkIDB9KSksdT1yPW51bGx9LGMuX19jPWZ1bmN0aW9uKG4sdCl7dC5zb21lKGZ1bmN0aW9uKG4pe3RyeXtuLl9faC5zb21lKHopLG4uX19oPW4uX19oLmZpbHRlcihmdW5jdGlvbihuKXtyZXR1cm4hbi5fX3x8QihuKX0pfWNhdGNoKHIpe3Quc29tZShmdW5jdGlvbihuKXtuLl9faCYmKG4uX19oPVtdKX0pLHQ9W10sYy5fX2UocixuLl9fdil9fSksbCYmbChuLHQpfSxjLnVubW91bnQ9ZnVuY3Rpb24obil7bSYmbShuKTt2YXIgdCxyPW4uX19jO3ImJnIuX19IJiYoci5fX0guX18uc29tZShmdW5jdGlvbihuKXt0cnl7eihuKX1jYXRjaChuKXt0PW59fSksci5fX0g9dm9pZCAwLHQmJmMuX19lKHQsci5fX3YpKX07dmFyIGs9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO2Z1bmN0aW9uIHcobil7dmFyIHQscj1mdW5jdGlvbigpe2NsZWFyVGltZW91dCh1KSxrJiZjYW5jZWxBbmltYXRpb25GcmFtZSh0KSxzZXRUaW1lb3V0KG4pfSx1PXNldFRpbWVvdXQociwzNSk7ayYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHIpKX1mdW5jdGlvbiB6KG4pe3ZhciB0PXIsdT1uLl9fYztcImZ1bmN0aW9uXCI9PXR5cGVvZiB1JiYobi5fX2M9dm9pZCAwLHUoKSkscj10fWZ1bmN0aW9uIEIobil7dmFyIHQ9cjtuLl9fYz1uLl9fKCkscj10fWZ1bmN0aW9uIEMobix0KXtyZXR1cm4hbnx8bi5sZW5ndGghPT10Lmxlbmd0aHx8dC5zb21lKGZ1bmN0aW9uKHQscil7cmV0dXJuIHQhPT1uW3JdfSl9ZnVuY3Rpb24gRChuLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dChuKTp0fWV4cG9ydHtxIGFzIHVzZUNhbGxiYWNrLHggYXMgdXNlQ29udGV4dCxQIGFzIHVzZURlYnVnVmFsdWUseSBhcyB1c2VFZmZlY3QsYiBhcyB1c2VFcnJvckJvdW5kYXJ5LGcgYXMgdXNlSWQsRiBhcyB1c2VJbXBlcmF0aXZlSGFuZGxlLF8gYXMgdXNlTGF5b3V0RWZmZWN0LFQgYXMgdXNlTWVtbyxoIGFzIHVzZVJlZHVjZXIsQSBhcyB1c2VSZWYsZCBhcyB1c2VTdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLAogICJ2YXIgaT1TeW1ib2wuZm9yKFwicHJlYWN0LXNpZ25hbHNcIik7ZnVuY3Rpb24gdCgpe2lmKCEocz4xKSl7dmFyIGksdD0hMTt3aGlsZSh2b2lkIDAhPT1oKXt2YXIgbj1oO2g9dm9pZCAwO3YrKzt3aGlsZSh2b2lkIDAhPT1uKXt2YXIgcj1uLm87bi5vPXZvaWQgMDtuLmYmPS0zO2lmKCEoOCZuLmYpJiZhKG4pKXRyeXtuLmMoKX1jYXRjaChuKXtpZighdCl7aT1uO3Q9ITB9fW49cn19dj0wO3MtLTtpZih0KXRocm93IGl9ZWxzZSBzLS19ZnVuY3Rpb24gbihpKXtpZihzPjApcmV0dXJuIGkoKTtzKys7dHJ5e3JldHVybiBpKCl9ZmluYWxseXt0KCl9fXZhciByPXZvaWQgMDtmdW5jdGlvbiBvKGkpe3ZhciB0PXI7cj12b2lkIDA7dHJ5e3JldHVybiBpKCl9ZmluYWxseXtyPXR9fXZhciBmLGg9dm9pZCAwLHM9MCx2PTAsdT0wO2Z1bmN0aW9uIGUoaSl7aWYodm9pZCAwIT09cil7dmFyIHQ9aS5uO2lmKHZvaWQgMD09PXR8fHQudCE9PXIpe3Q9e2k6MCxTOmkscDpyLnMsbjp2b2lkIDAsdDpyLGU6dm9pZCAwLHg6dm9pZCAwLHI6dH07aWYodm9pZCAwIT09ci5zKXIucy5uPXQ7ci5zPXQ7aS5uPXQ7aWYoMzImci5mKWkuUyh0KTtyZXR1cm4gdH1lbHNlIGlmKC0xPT09dC5pKXt0Lmk9MDtpZih2b2lkIDAhPT10Lm4pe3Qubi5wPXQucDtpZih2b2lkIDAhPT10LnApdC5wLm49dC5uO3QucD1yLnM7dC5uPXZvaWQgMDtyLnMubj10O3Iucz10fXJldHVybiB0fX19ZnVuY3Rpb24gZChpLHQpe3RoaXMudj1pO3RoaXMuaT0wO3RoaXMubj12b2lkIDA7dGhpcy50PXZvaWQgMDt0aGlzLlc9bnVsbD09dD92b2lkIDA6dC53YXRjaGVkO3RoaXMuWj1udWxsPT10P3ZvaWQgMDp0LnVud2F0Y2hlZDt0aGlzLm5hbWU9bnVsbD09dD92b2lkIDA6dC5uYW1lfWQucHJvdG90eXBlLmJyYW5kPWk7ZC5wcm90b3R5cGUuaD1mdW5jdGlvbigpe3JldHVybiEwfTtkLnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXMsbj10aGlzLnQ7aWYobiE9PWkmJnZvaWQgMD09PWkuZSl7aS54PW47dGhpcy50PWk7aWYodm9pZCAwIT09biluLmU9aTtlbHNlIG8oZnVuY3Rpb24oKXt2YXIgaTtudWxsPT0oaT10LlcpfHxpLmNhbGwodCl9KX19O2QucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7dmFyIHQ9dGhpcztpZih2b2lkIDAhPT10aGlzLnQpe3ZhciBuPWkuZSxyPWkueDtpZih2b2lkIDAhPT1uKXtuLng9cjtpLmU9dm9pZCAwfWlmKHZvaWQgMCE9PXIpe3IuZT1uO2kueD12b2lkIDB9aWYoaT09PXRoaXMudCl7dGhpcy50PXI7aWYodm9pZCAwPT09cilvKGZ1bmN0aW9uKCl7dmFyIGk7bnVsbD09KGk9dC5aKXx8aS5jYWxsKHQpfSl9fX07ZC5wcm90b3R5cGUuc3Vic2NyaWJlPWZ1bmN0aW9uKGkpe3ZhciB0PXRoaXM7cmV0dXJuIG0oZnVuY3Rpb24oKXt2YXIgbj10LnZhbHVlLG89cjtyPXZvaWQgMDt0cnl7aShuKX1maW5hbGx5e3I9b319LHtuYW1lOlwic3ViXCJ9KX07ZC5wcm90b3R5cGUudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtkLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlK1wiXCJ9O2QucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtkLnByb3RvdHlwZS5wZWVrPWZ1bmN0aW9uKCl7dmFyIGk9cjtyPXZvaWQgMDt0cnl7cmV0dXJuIHRoaXMudmFsdWV9ZmluYWxseXtyPWl9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZC5wcm90b3R5cGUsXCJ2YWx1ZVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgaT1lKHRoaXMpO2lmKHZvaWQgMCE9PWkpaS5pPXRoaXMuaTtyZXR1cm4gdGhpcy52fSxzZXQ6ZnVuY3Rpb24oaSl7aWYoaSE9PXRoaXMudil7aWYodj4xMDApdGhyb3cgbmV3IEVycm9yKFwiQ3ljbGUgZGV0ZWN0ZWRcIik7dGhpcy52PWk7dGhpcy5pKys7dSsrO3MrKzt0cnl7Zm9yKHZhciBuPXRoaXMudDt2b2lkIDAhPT1uO249bi54KW4udC5OKCl9ZmluYWxseXt0KCl9fX19KTtmdW5jdGlvbiBjKGksdCl7cmV0dXJuIG5ldyBkKGksdCl9ZnVuY3Rpb24gYShpKXtmb3IodmFyIHQ9aS5zO3ZvaWQgMCE9PXQ7dD10Lm4paWYodC5TLmkhPT10Lml8fCF0LlMuaCgpfHx0LlMuaSE9PXQuaSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBsKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil7dmFyIG49dC5TLm47aWYodm9pZCAwIT09bil0LnI9bjt0LlMubj10O3QuaT0tMTtpZih2b2lkIDA9PT10Lm4pe2kucz10O2JyZWFrfX19ZnVuY3Rpb24geShpKXt2YXIgdD1pLnMsbj12b2lkIDA7d2hpbGUodm9pZCAwIT09dCl7dmFyIHI9dC5wO2lmKC0xPT09dC5pKXt0LlMuVSh0KTtpZih2b2lkIDAhPT1yKXIubj10Lm47aWYodm9pZCAwIT09dC5uKXQubi5wPXJ9ZWxzZSBuPXQ7dC5TLm49dC5yO2lmKHZvaWQgMCE9PXQucil0LnI9dm9pZCAwO3Q9cn1pLnM9bn1mdW5jdGlvbiB3KGksdCl7ZC5jYWxsKHRoaXMsdm9pZCAwKTt0aGlzLng9aTt0aGlzLnM9dm9pZCAwO3RoaXMuZz11LTE7dGhpcy5mPTQ7dGhpcy5XPW51bGw9PXQ/dm9pZCAwOnQud2F0Y2hlZDt0aGlzLlo9bnVsbD09dD92b2lkIDA6dC51bndhdGNoZWQ7dGhpcy5uYW1lPW51bGw9PXQ/dm9pZCAwOnQubmFtZX13LnByb3RvdHlwZT1uZXcgZDt3LnByb3RvdHlwZS5oPWZ1bmN0aW9uKCl7dGhpcy5mJj0tMztpZigxJnRoaXMuZilyZXR1cm4hMTtpZigzMj09KDM2JnRoaXMuZikpcmV0dXJuITA7dGhpcy5mJj0tNTtpZih0aGlzLmc9PT11KXJldHVybiEwO3RoaXMuZz11O3RoaXMuZnw9MTtpZih0aGlzLmk+MCYmIWEodGhpcykpe3RoaXMuZiY9LTI7cmV0dXJuITB9dmFyIGk9cjt0cnl7bCh0aGlzKTtyPXRoaXM7dmFyIHQ9dGhpcy54KCk7aWYoMTYmdGhpcy5mfHx0aGlzLnYhPT10fHwwPT09dGhpcy5pKXt0aGlzLnY9dDt0aGlzLmYmPS0xNzt0aGlzLmkrK319Y2F0Y2goaSl7dGhpcy52PWk7dGhpcy5mfD0xNjt0aGlzLmkrK31yPWk7eSh0aGlzKTt0aGlzLmYmPS0yO3JldHVybiEwfTt3LnByb3RvdHlwZS5TPWZ1bmN0aW9uKGkpe2lmKHZvaWQgMD09PXRoaXMudCl7dGhpcy5mfD0zNjtmb3IodmFyIHQ9dGhpcy5zO3ZvaWQgMCE9PXQ7dD10Lm4pdC5TLlModCl9ZC5wcm90b3R5cGUuUy5jYWxsKHRoaXMsaSl9O3cucHJvdG90eXBlLlU9ZnVuY3Rpb24oaSl7aWYodm9pZCAwIT09dGhpcy50KXtkLnByb3RvdHlwZS5VLmNhbGwodGhpcyxpKTtpZih2b2lkIDA9PT10aGlzLnQpe3RoaXMuZiY9LTMzO2Zvcih2YXIgdD10aGlzLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KX19fTt3LnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Njtmb3IodmFyIGk9dGhpcy50O3ZvaWQgMCE9PWk7aT1pLngpaS50Lk4oKX19O09iamVjdC5kZWZpbmVQcm9wZXJ0eSh3LnByb3RvdHlwZSxcInZhbHVlXCIse2dldDpmdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3ZhciBpPWUodGhpcyk7dGhpcy5oKCk7aWYodm9pZCAwIT09aSlpLmk9dGhpcy5pO2lmKDE2JnRoaXMuZil0aHJvdyB0aGlzLnY7cmV0dXJuIHRoaXMudn19KTtmdW5jdGlvbiBiKGksdCl7cmV0dXJuIG5ldyB3KGksdCl9ZnVuY3Rpb24gXyhpKXt2YXIgbj1pLnU7aS51PXZvaWQgMDtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXtzKys7dmFyIG89cjtyPXZvaWQgMDt0cnl7bigpfWNhdGNoKHQpe2kuZiY9LTI7aS5mfD04O3AoaSk7dGhyb3cgdH1maW5hbGx5e3I9bzt0KCl9fX1mdW5jdGlvbiBwKGkpe2Zvcih2YXIgdD1pLnM7dm9pZCAwIT09dDt0PXQubil0LlMuVSh0KTtpLng9dm9pZCAwO2kucz12b2lkIDA7XyhpKX1mdW5jdGlvbiBnKGkpe2lmKHIhPT10aGlzKXRocm93IG5ldyBFcnJvcihcIk91dC1vZi1vcmRlciBlZmZlY3RcIik7eSh0aGlzKTtyPWk7dGhpcy5mJj0tMjtpZig4JnRoaXMuZilwKHRoaXMpO3QoKX1mdW5jdGlvbiBTKGksdCl7dGhpcy54PWk7dGhpcy51PXZvaWQgMDt0aGlzLnM9dm9pZCAwO3RoaXMubz12b2lkIDA7dGhpcy5mPTMyO3RoaXMubmFtZT1udWxsPT10P3ZvaWQgMDp0Lm5hbWU7aWYoZilmLnB1c2godGhpcyl9Uy5wcm90b3R5cGUuYz1mdW5jdGlvbigpe3ZhciBpPXRoaXMuUygpO3RyeXtpZig4JnRoaXMuZilyZXR1cm47aWYodm9pZCAwPT09dGhpcy54KXJldHVybjt2YXIgdD10aGlzLngoKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXRoaXMudT10fWZpbmFsbHl7aSgpfX07Uy5wcm90b3R5cGUuUz1mdW5jdGlvbigpe2lmKDEmdGhpcy5mKXRocm93IG5ldyBFcnJvcihcIkN5Y2xlIGRldGVjdGVkXCIpO3RoaXMuZnw9MTt0aGlzLmYmPS05O18odGhpcyk7bCh0aGlzKTtzKys7dmFyIGk9cjtyPXRoaXM7cmV0dXJuIGcuYmluZCh0aGlzLGkpfTtTLnByb3RvdHlwZS5OPWZ1bmN0aW9uKCl7aWYoISgyJnRoaXMuZikpe3RoaXMuZnw9Mjt0aGlzLm89aDtoPXRoaXN9fTtTLnByb3RvdHlwZS5kPWZ1bmN0aW9uKCl7dGhpcy5mfD04O2lmKCEoMSZ0aGlzLmYpKXAodGhpcyl9O1MucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLmQoKX07ZnVuY3Rpb24gbShpLHQpe3ZhciBuPW5ldyBTKGksdCk7dHJ5e24uYygpfWNhdGNoKGkpe24uZCgpO3Rocm93IGl9dmFyIHI9bi5kLmJpbmQobik7cltTeW1ib2wuZGlzcG9zZV09cjtyZXR1cm4gcn1mdW5jdGlvbiBFKGkpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxyPXRoaXM7cmV0dXJuIG4oZnVuY3Rpb24oKXtyZXR1cm4gbyhmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5KHIsW10uc2xpY2UuY2FsbCh0KSl9KX0pfX1mdW5jdGlvbiB4KCl7dmFyIGk9ZjtmPVtdO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWY7aWYoZiYmaSlpPWkuY29uY2F0KGYpO2Y9aTtyZXR1cm4gdH19ZnVuY3Rpb24gQyhpKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdCxuLHI9eCgpO3RyeXtuPWkuYXBwbHkodm9pZCAwLFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9Y2F0Y2goaSl7Zj12b2lkIDA7dGhyb3cgaX1maW5hbGx5e3Q9cigpfWZvcih2YXIgbyBpbiBuKWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG5bb10pbltvXT1FKG5bb10pO25bU3ltYm9sLmRpc3Bvc2VdPUUoZnVuY3Rpb24oKXtpZih0KWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXRbaV0uZGlzcG9zZSgpO3Q9dm9pZCAwfSk7cmV0dXJuIG59fWV4cG9ydHt3IGFzIENvbXB1dGVkLFMgYXMgRWZmZWN0LGQgYXMgU2lnbmFsLEUgYXMgYWN0aW9uLG4gYXMgYmF0Y2gsYiBhcyBjb21wdXRlZCxDIGFzIGNyZWF0ZU1vZGVsLG0gYXMgZWZmZWN0LGMgYXMgc2lnbmFsLG8gYXMgdW50cmFja2VkfTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLWNvcmUubW9kdWxlLmpzLm1hcFxuIiwKICAiaW1wb3J0e0NvbXBvbmVudCBhcyBpLG9wdGlvbnMgYXMgcixpc1ZhbGlkRWxlbWVudCBhcyBufWZyb21cInByZWFjdFwiO2ltcG9ydHt1c2VNZW1vIGFzIHQsdXNlUmVmIGFzIGYsdXNlRWZmZWN0IGFzIG99ZnJvbVwicHJlYWN0L2hvb2tzXCI7aW1wb3J0e1NpZ25hbCBhcyBlLGNvbXB1dGVkIGFzIHUsc2lnbmFsIGFzIGEsZWZmZWN0IGFzIGN9ZnJvbVwiQHByZWFjdC9zaWduYWxzLWNvcmVcIjtleHBvcnR7U2lnbmFsLGJhdGNoLGNvbXB1dGVkLGVmZmVjdCxzaWduYWwsdW50cmFja2VkfWZyb21cIkBwcmVhY3Qvc2lnbmFscy1jb3JlXCI7dmFyIHYscztmdW5jdGlvbiBsKGksbil7cltpXT1uLmJpbmQobnVsbCxyW2ldfHxmdW5jdGlvbigpe30pfWZ1bmN0aW9uIGQoaSl7aWYocyl7dmFyIHI9cztzPXZvaWQgMDtyKCl9cz1pJiZpLlMoKX1mdW5jdGlvbiBoKGkpe3ZhciByPXRoaXMsZj1pLmRhdGEsbz11c2VTaWduYWwoZik7by52YWx1ZT1mO3ZhciBlPXQoZnVuY3Rpb24oKXt2YXIgaT1yLl9fdjt3aGlsZShpPWkuX18paWYoaS5fX2Mpe2kuX19jLl9fJGZ8PTQ7YnJlYWt9ci5fXyR1LmM9ZnVuY3Rpb24oKXt2YXIgaSx0PXIuX18kdS5TKCksZj1lLnZhbHVlO3QoKTtpZihuKGYpfHwzIT09KG51bGw9PShpPXIuYmFzZSk/dm9pZCAwOmkubm9kZVR5cGUpKXtyLl9fJGZ8PTE7ci5zZXRTdGF0ZSh7fSl9ZWxzZSByLmJhc2UuZGF0YT1mfTtyZXR1cm4gdShmdW5jdGlvbigpe3ZhciBpPW8udmFsdWUudmFsdWU7cmV0dXJuIDA9PT1pPzA6ITA9PT1pP1wiXCI6aXx8XCJcIn0pfSxbXSk7cmV0dXJuIGUudmFsdWV9aC5kaXNwbGF5TmFtZT1cIl9zdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnZvaWQgMH0sdHlwZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOmh9LHByb3BzOntjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJue2RhdGE6dGhpc319fSxfX2I6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZToxfX0pO2woXCJfX2JcIixmdW5jdGlvbihpLHIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiByLnR5cGUpe3ZhciBuLHQ9ci5wcm9wcztmb3IodmFyIGYgaW4gdClpZihcImNoaWxkcmVuXCIhPT1mKXt2YXIgbz10W2ZdO2lmKG8gaW5zdGFuY2VvZiBlKXtpZighbilyLl9fbnA9bj17fTtuW2ZdPW87dFtmXT1vLnBlZWsoKX19fWkocil9KTtsKFwiX19yXCIsZnVuY3Rpb24oaSxyKXtpKHIpO2QoKTt2YXIgbix0PXIuX19jO2lmKHQpe3QuX18kZiY9LTI7aWYodm9pZCAwPT09KG49dC5fXyR1KSl0Ll9fJHU9bj1mdW5jdGlvbihpKXt2YXIgcjtjKGZ1bmN0aW9uKCl7cj10aGlzfSk7ci5jPWZ1bmN0aW9uKCl7dC5fXyRmfD0xO3Quc2V0U3RhdGUoe30pfTtyZXR1cm4gcn0oKX12PXQ7ZChuKX0pO2woXCJfX2VcIixmdW5jdGlvbihpLHIsbix0KXtkKCk7dj12b2lkIDA7aShyLG4sdCl9KTtsKFwiZGlmZmVkXCIsZnVuY3Rpb24oaSxyKXtkKCk7dj12b2lkIDA7dmFyIG47aWYoXCJzdHJpbmdcIj09dHlwZW9mIHIudHlwZSYmKG49ci5fX2UpKXt2YXIgdD1yLl9fbnAsZj1yLnByb3BzO2lmKHQpe3ZhciBvPW4uVTtpZihvKWZvcih2YXIgZSBpbiBvKXt2YXIgdT1vW2VdO2lmKHZvaWQgMCE9PXUmJiEoZSBpbiB0KSl7dS5kKCk7b1tlXT12b2lkIDB9fWVsc2Ugbi5VPW89e307Zm9yKHZhciBhIGluIHQpe3ZhciBjPW9bYV0scz10W2FdO2lmKHZvaWQgMD09PWMpe2M9cChuLGEscyxmKTtvW2FdPWN9ZWxzZSBjLm8ocyxmKX19fWkocil9KTtmdW5jdGlvbiBwKGkscixuLHQpe3ZhciBmPXIgaW4gaSYmdm9pZCAwPT09aS5vd25lclNWR0VsZW1lbnQsbz1hKG4pO3JldHVybntvOmZ1bmN0aW9uKGkscil7by52YWx1ZT1pO3Q9cn0sZDpjKGZ1bmN0aW9uKCl7dmFyIG49by52YWx1ZS52YWx1ZTtpZih0W3JdIT09bil7dFtyXT1uO2lmKGYpaVtyXT1uO2Vsc2UgaWYobilpLnNldEF0dHJpYnV0ZShyLG4pO2Vsc2UgaS5yZW1vdmVBdHRyaWJ1dGUocil9fSl9fWwoXCJ1bm1vdW50XCIsZnVuY3Rpb24oaSxyKXtpZihcInN0cmluZ1wiPT10eXBlb2Ygci50eXBlKXt2YXIgbj1yLl9fZTtpZihuKXt2YXIgdD1uLlU7aWYodCl7bi5VPXZvaWQgMDtmb3IodmFyIGYgaW4gdCl7dmFyIG89dFtmXTtpZihvKW8uZCgpfX19fWVsc2V7dmFyIGU9ci5fX2M7aWYoZSl7dmFyIHU9ZS5fXyR1O2lmKHUpe2UuX18kdT12b2lkIDA7dS5kKCl9fX1pKHIpfSk7bChcIl9faFwiLGZ1bmN0aW9uKGkscixuLHQpe2lmKHQ8M3x8OT09PXQpci5fXyRmfD0yO2kocixuLHQpfSk7aS5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWZ1bmN0aW9uKGkscil7aWYodGhpcy5fX1IpcmV0dXJuITA7dmFyIG49dGhpcy5fXyR1LHQ9biYmdm9pZCAwIT09bi5zO2Zvcih2YXIgZiBpbiByKXJldHVybiEwO2lmKHRoaXMuX19mfHxcImJvb2xlYW5cIj09dHlwZW9mIHRoaXMudSYmITA9PT10aGlzLnUpe2lmKCEodHx8MiZ0aGlzLl9fJGZ8fDQmdGhpcy5fXyRmKSlyZXR1cm4hMDtpZigxJnRoaXMuX18kZilyZXR1cm4hMH1lbHNle2lmKCEodHx8NCZ0aGlzLl9fJGYpKXJldHVybiEwO2lmKDMmdGhpcy5fXyRmKXJldHVybiEwfWZvcih2YXIgbyBpbiBpKWlmKFwiX19zb3VyY2VcIiE9PW8mJmlbb10hPT10aGlzLnByb3BzW29dKXJldHVybiEwO2Zvcih2YXIgZSBpbiB0aGlzLnByb3BzKWlmKCEoZSBpbiBpKSlyZXR1cm4hMDtyZXR1cm4hMX07ZnVuY3Rpb24gdXNlU2lnbmFsKGkpe3JldHVybiB0KGZ1bmN0aW9uKCl7cmV0dXJuIGEoaSl9LFtdKX1mdW5jdGlvbiB1c2VDb21wdXRlZChpKXt2YXIgcj1mKGkpO3IuY3VycmVudD1pO3YuX18kZnw9NDtyZXR1cm4gdChmdW5jdGlvbigpe3JldHVybiB1KGZ1bmN0aW9uKCl7cmV0dXJuIHIuY3VycmVudCgpfSl9LFtdKX1mdW5jdGlvbiB1c2VTaWduYWxFZmZlY3QoaSl7dmFyIHI9ZihpKTtyLmN1cnJlbnQ9aTtvKGZ1bmN0aW9uKCl7cmV0dXJuIGMoZnVuY3Rpb24oKXtyZXR1cm4gci5jdXJyZW50KCl9KX0sW10pfWV4cG9ydHt1c2VDb21wdXRlZCx1c2VTaWduYWwsdXNlU2lnbmFsRWZmZWN0fTsvLyMgc291cmNlTWFwcGluZ1VSTD1zaWduYWxzLm1vZHVsZS5qcy5tYXBcbiIsCiAgImltcG9ydCB7IHNpZ25hbCB9IGZyb20gJ0BwcmVhY3Qvc2lnbmFscyc7XG5cbmNvbnN0IFNUT1JBR0VfS0VZID0gJ29uZW5vdGVfdjQnO1xuZXhwb3J0IGNvbnN0IHVpZCA9ICgpID0+IGNyeXB0by5yYW5kb21VVUlEKCk7XG5cbi8vIOKUgOKUgOKUgCBEZWZhdWx0IGNvbnN0cnVjdG9ycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gbWtCbG9jayh4ID0gMCwgeSA9IDAsIHcgPSA0ODApIHtcbiAgcmV0dXJuIHsgaWQ6IHVpZCgpLCB4LCB5LCB3LCBodG1sOiAnJywgdHlwZTogJ3RleHQnIH07XG59XG5cbmZ1bmN0aW9uIG1rUGFnZSh0aXRsZSA9ICdVbnRpdGxlZCBQYWdlJykge1xuICBjb25zdCBkYiA9IG1rQmxvY2soMCwgMCwgNDgwKTtcbiAgcmV0dXJuIHsgaWQ6IHVpZCgpLCB0aXRsZSwgY2hpbGRyZW46IFtdLCBkZWZhdWx0QmxvY2tJZDogZGIuaWQsIGJsb2NrczogW2RiXSwgcGFuWDogMCwgcGFuWTogMCwgem9vbTogMSB9O1xufVxuXG5mdW5jdGlvbiBta1NlY3Rpb24odGl0bGUgPSAnTmV3IFNlY3Rpb24nKSB7XG4gIHJldHVybiB7IGlkOiB1aWQoKSwgdGl0bGUsIHBhZ2VzOiBbbWtQYWdlKCldIH07XG59XG5cbmZ1bmN0aW9uIG1rTm90ZWJvb2sodGl0bGUgPSAnTXkgTm90ZWJvb2snKSB7XG4gIGNvbnN0IHNlYyA9IG1rU2VjdGlvbigpO1xuICByZXR1cm4geyBpZDogdWlkKCksIHRpdGxlLCBzZWN0aW9uczogW3NlY10gfTtcbn1cblxuLy8g4pSA4pSA4pSAIFBlcnNpc3RlbmNlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB0cnkgeyBjb25zdCByID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpOyByZXR1cm4gciA/IEpTT04ucGFyc2UocikgOiBudWxsOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxubGV0IF9zYXZlVGltZXIgPSBudWxsO1xuZnVuY3Rpb24gc2NoZWR1bGVTYXZlKCkge1xuICBjbGVhclRpbWVvdXQoX3NhdmVUaW1lcik7XG4gIF9zYXZlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoYXBwU3RhdGUudmFsdWUpKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLndhcm4oJ1NhdmUgZmFpbGVkJywgZSk7IH1cbiAgfSwgMzAwKTtcbn1cblxuLy8g4pSA4pSA4pSAIFN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGUoKSB7XG4gIGNvbnN0IG5iID0gbWtOb3RlYm9vaygpO1xuICByZXR1cm4geyBub3RlYm9va3M6IFtuYl0sIHVpOiB7IG5vdGVib29rSWQ6IG5iLmlkLCBzZWN0aW9uSWQ6IG5iLnNlY3Rpb25zWzBdLmlkLCBwYWdlSWQ6IG5iLnNlY3Rpb25zWzBdLnBhZ2VzWzBdLmlkIH0gfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFwcFN0YXRlID0gc2lnbmFsKGxvYWQoKSB8fCBkZWZhdWx0U3RhdGUoKSk7XG5cbi8vIEltbXV0YWJsZSB1cGRhdGUg4oCUIHRyaWdnZXJzIFByZWFjdCByZS1yZW5kZXJcbmZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICBjb25zdCBkcmFmdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXBwU3RhdGUudmFsdWUpKTtcbiAgZm4oZHJhZnQpO1xuICBhcHBTdGF0ZS52YWx1ZSA9IGRyYWZ0O1xuICBzY2hlZHVsZVNhdmUoKTtcbn1cblxuLy8gU2lsZW50IHVwZGF0ZSDigJQgbXV0YXRlIGluLXBsYWNlLCBqdXN0IHNhdmUgKG5vIHJlLXJlbmRlcilcbmZ1bmN0aW9uIHNpbGVudChmbikge1xuICBmbihhcHBTdGF0ZS52YWx1ZSk7XG4gIHNjaGVkdWxlU2F2ZSgpO1xufVxuXG4vLyDilIDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gZmluZEluVHJlZShwYWdlcywgaWQpIHtcbiAgZm9yIChjb25zdCBwIG9mIHBhZ2VzKSB7XG4gICAgaWYgKHAuaWQgPT09IGlkKSByZXR1cm4gcDtcbiAgICBpZiAocC5jaGlsZHJlbj8ubGVuZ3RoKSB7IGNvbnN0IGYgPSBmaW5kSW5UcmVlKHAuY2hpbGRyZW4sIGlkKTsgaWYgKGYpIHJldHVybiBmOyB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21UcmVlKHBhZ2VzLCBpZCkge1xuICByZXR1cm4gcGFnZXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gaWQpLm1hcChwID0+ICh7IC4uLnAsIGNoaWxkcmVuOiByZW1vdmVGcm9tVHJlZShwLmNoaWxkcmVuID8/IFtdLCBpZCkgfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlUGFnZShzID0gYXBwU3RhdGUudmFsdWUpIHtcbiAgY29uc3QgeyB1aSwgbm90ZWJvb2tzIH0gPSBzO1xuICBjb25zdCBuYiA9IG5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gdWkubm90ZWJvb2tJZCk7XG4gIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIHJldHVybiBzZWMgPyBmaW5kSW5UcmVlKHNlYy5wYWdlcywgdWkucGFnZUlkKSA6IG51bGw7XG59XG5cbmV4cG9ydCB7IGZpbmRJblRyZWUsIHJlbW92ZUZyb21UcmVlIH07XG5cbi8vIOKUgOKUgOKUgCBOYXZpZ2F0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlTm90ZWJvb2soaWQpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIHMudWkubm90ZWJvb2tJZCA9IGlkO1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IGlkKTtcbiAgICBzLnVpLnNlY3Rpb25JZCA9IG5iPy5zZWN0aW9uc1swXT8uaWQgPz8gbnVsbDtcbiAgICBzLnVpLnBhZ2VJZCA9IG5iPy5zZWN0aW9uc1swXT8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlU2VjdGlvbihpZCkge1xuICB1cGRhdGUocyA9PiB7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBpZDtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IGlkKTtcbiAgICBzLnVpLnBhZ2VJZCA9IHNlYz8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlUGFnZShpZCkge1xuICB1cGRhdGUocyA9PiB7IHMudWkucGFnZUlkID0gaWQ7IH0pO1xufVxuXG4vLyDilIDilIDilIAgTm90ZWJvb2sgQ1JVRCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vdGVib29rKCkge1xuICBjb25zdCBuYiA9IG1rTm90ZWJvb2soJ05ldyBOb3RlYm9vaycpO1xuICB1cGRhdGUocyA9PiB7XG4gICAgcy5ub3RlYm9va3MucHVzaChuYik7XG4gICAgcy51aS5ub3RlYm9va0lkID0gbmIuaWQ7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBuYi5zZWN0aW9uc1swXS5pZDtcbiAgICBzLnVpLnBhZ2VJZCA9IG5iLnNlY3Rpb25zWzBdLnBhZ2VzWzBdLmlkO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZU5vdGVib29rKGlkLCB0aXRsZSkge1xuICB1cGRhdGUocyA9PiB7IGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IGlkKTsgaWYgKG5iKSBuYi50aXRsZSA9IHRpdGxlOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZU5vdGVib29rKGlkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBzLm5vdGVib29rcyA9IHMubm90ZWJvb2tzLmZpbHRlcihuID0+IG4uaWQgIT09IGlkKTtcbiAgICBpZiAocy51aS5ub3RlYm9va0lkID09PSBpZCkge1xuICAgICAgY29uc3QgbmIgPSBzLm5vdGVib29rc1swXTtcbiAgICAgIHMudWkubm90ZWJvb2tJZCA9IG5iPy5pZCA/PyBudWxsO1xuICAgICAgcy51aS5zZWN0aW9uSWQgPSBuYj8uc2VjdGlvbnNbMF0/LmlkID8/IG51bGw7XG4gICAgICBzLnVpLnBhZ2VJZCA9IG5iPy5zZWN0aW9uc1swXT8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlb3JkZXJOb3RlYm9va3MoaWRzKSB7XG4gIHVwZGF0ZShzID0+IHsgcy5ub3RlYm9va3Muc29ydCgoYSwgYikgPT4gaWRzLmluZGV4T2YoYS5pZCkgLSBpZHMuaW5kZXhPZihiLmlkKSk7IH0pO1xufVxuXG4vLyDilIDilIDilIAgU2VjdGlvbiBDUlVEIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2VjdGlvbihuYklkKSB7XG4gIGNvbnN0IHNlYyA9IG1rU2VjdGlvbignTmV3IFNlY3Rpb24nKTtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IG5iSWQpO1xuICAgIGlmICghbmIpIHJldHVybjtcbiAgICBuYi5zZWN0aW9ucy5wdXNoKHNlYyk7XG4gICAgcy51aS5zZWN0aW9uSWQgPSBzZWMuaWQ7XG4gICAgcy51aS5wYWdlSWQgPSBzZWMucGFnZXNbMF0uaWQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lU2VjdGlvbihuYklkLCBzZWNJZCwgdGl0bGUpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IHNlYyA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBuYklkKT8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHNlY0lkKTtcbiAgICBpZiAoc2VjKSBzZWMudGl0bGUgPSB0aXRsZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVTZWN0aW9uKG5iSWQsIHNlY0lkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBuYklkKTtcbiAgICBpZiAoIW5iKSByZXR1cm47XG4gICAgbmIuc2VjdGlvbnMgPSBuYi5zZWN0aW9ucy5maWx0ZXIoc2VjID0+IHNlYy5pZCAhPT0gc2VjSWQpO1xuICAgIGlmIChzLnVpLnNlY3Rpb25JZCA9PT0gc2VjSWQpIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gbmIuc2VjdGlvbnNbMF07XG4gICAgICBzLnVpLnNlY3Rpb25JZCA9IGZpcnN0Py5pZCA/PyBudWxsO1xuICAgICAgcy51aS5wYWdlSWQgPSBmaXJzdD8ucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlb3JkZXJTZWN0aW9ucyhuYklkLCBpZHMpIHtcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IG5iSWQpO1xuICAgIGlmIChuYikgbmIuc2VjdGlvbnMuc29ydCgoYSwgYikgPT4gaWRzLmluZGV4T2YoYS5pZCkgLSBpZHMuaW5kZXhPZihiLmlkKSk7XG4gIH0pO1xufVxuXG4vLyDilIDilIDilIAgUGFnZSBDUlVEIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUGFnZShwYXJlbnRQYWdlSWQgPSBudWxsKSB7XG4gIGNvbnN0IHBnID0gbWtQYWdlKCdVbnRpdGxlZCBQYWdlJyk7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIGlmIChwYXJlbnRQYWdlSWQpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGZpbmRJblRyZWUoc2VjLnBhZ2VzLCBwYXJlbnRQYWdlSWQpO1xuICAgICAgaWYgKHBhcmVudCkgeyBwYXJlbnQuY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4gPz8gW107IHBhcmVudC5jaGlsZHJlbi5wdXNoKHBnKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWMucGFnZXMucHVzaChwZyk7XG4gICAgfVxuICAgIHMudWkucGFnZUlkID0gcGcuaWQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lUGFnZShwYWdlSWQsIHRpdGxlKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIGNvbnN0IHBnID0gZmluZEluVHJlZShzZWMucGFnZXMsIHBhZ2VJZCk7XG4gICAgaWYgKHBnKSBwZy50aXRsZSA9IHRpdGxlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVBhZ2UocGFnZUlkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgIGNvbnN0IHNlYyA9IG5iPy5zZWN0aW9ucy5maW5kKHNlYyA9PiBzZWMuaWQgPT09IHMudWkuc2VjdGlvbklkKTtcbiAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgIHNlYy5wYWdlcyA9IHJlbW92ZUZyb21UcmVlKHNlYy5wYWdlcywgcGFnZUlkKTtcbiAgICBpZiAocy51aS5wYWdlSWQgPT09IHBhZ2VJZCkgcy51aS5wYWdlSWQgPSBzZWMucGFnZXNbMF0/LmlkID8/IG51bGw7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBhZ2UocGFnZUlkLCB0YXJnZXRTZWNJZCkge1xuICB1cGRhdGUocyA9PiB7XG4gICAgY29uc3QgbmIgPSBzLm5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gcy51aS5ub3RlYm9va0lkKTtcbiAgICBpZiAoIW5iKSByZXR1cm47XG4gICAgbGV0IHBnID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IHNlYyBvZiBuYi5zZWN0aW9ucykge1xuICAgICAgY29uc3QgZm91bmQgPSBmaW5kSW5UcmVlKHNlYy5wYWdlcywgcGFnZUlkKTtcbiAgICAgIGlmIChmb3VuZCkgeyBwZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZm91bmQpKTsgc2VjLnBhZ2VzID0gcmVtb3ZlRnJvbVRyZWUoc2VjLnBhZ2VzLCBwYWdlSWQpOyBicmVhazsgfVxuICAgIH1cbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0ID0gbmIuc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSB0YXJnZXRTZWNJZCk7XG4gICAgaWYgKHRhcmdldCkgdGFyZ2V0LnBhZ2VzLnB1c2gocGcpO1xuICB9KTtcbn1cblxuLy8g4pSA4pSA4pSAIEJsb2NrIENSVUQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRCbG9jayh4LCB5LCB3ID0gNDgwLCB0eXBlID0gJ3RleHQnKSB7XG4gIGNvbnN0IGJsayA9IHsgaWQ6IHVpZCgpLCB4LCB5LCB3LCBodG1sOiAnJywgdHlwZSB9O1xuICB1cGRhdGUocyA9PiB7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKHMpO1xuICAgIGlmIChwZykgcGcuYmxvY2tzLnB1c2goYmxrKTtcbiAgfSk7XG4gIHJldHVybiBibGs7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVCbG9jayhibG9ja0lkKSB7XG4gIHVwZGF0ZShzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgaWYgKHBnKSBwZy5ibG9ja3MgPSBwZy5ibG9ja3MuZmlsdGVyKGIgPT4gYi5pZCAhPT0gYmxvY2tJZCk7XG4gIH0pO1xufVxuXG4vLyBTaWxlbnQgdXBkYXRlcyDigJQgYmxvY2sgY29udGVudC9wb3NpdGlvbiBjaGFuZ2VzIGRvbid0IHJlLXJlbmRlciB0aGUgc2lkZWJhclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJsb2NrSHRtbChibG9ja0lkLCBodG1sKSB7XG4gIHNpbGVudChzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgY29uc3QgYmxrID0gcGc/LmJsb2Nrcy5maW5kKGIgPT4gYi5pZCA9PT0gYmxvY2tJZCk7XG4gICAgaWYgKGJsaykgYmxrLmh0bWwgPSBodG1sO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJsb2NrUG9zKGJsb2NrSWQsIHgsIHkpIHtcbiAgc2lsZW50KHMgPT4ge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZShzKTtcbiAgICBjb25zdCBibGsgPSBwZz8uYmxvY2tzLmZpbmQoYiA9PiBiLmlkID09PSBibG9ja0lkKTtcbiAgICBpZiAoYmxrKSB7IGJsay54ID0geDsgYmxrLnkgPSB5OyB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQmxvY2tUeXBlKGJsb2NrSWQsIHR5cGUpIHtcbiAgc2lsZW50KHMgPT4ge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZShzKTtcbiAgICBjb25zdCBibGsgPSBwZz8uYmxvY2tzLmZpbmQoYiA9PiBiLmlkID09PSBibG9ja0lkKTtcbiAgICBpZiAoYmxrKSBibGsudHlwZSA9IHR5cGU7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCB3KSB7XG4gIHNpbGVudChzID0+IHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2Uocyk7XG4gICAgY29uc3QgYmxrID0gcGc/LmJsb2Nrcy5maW5kKGIgPT4gYi5pZCA9PT0gYmxvY2tJZCk7XG4gICAgaWYgKGJsaykgYmxrLncgPSB3O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBhZ2VWaWV3KHBhblgsIHBhblksIHpvb20pIHtcbiAgc2lsZW50KHMgPT4ge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZShzKTtcbiAgICBpZiAocGcpIHsgcGcucGFuWCA9IHBhblg7IHBnLnBhblkgPSBwYW5ZOyBwZy56b29tID0gem9vbTsgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBhZ2VUaXRsZShwYWdlSWQsIHRpdGxlKSB7XG4gIC8vIFNpbGVudDogc2lkZWJhciB0aXRsZSB1cGRhdGVzIG9uIGJsdXIgb25seVxuICBzaWxlbnQocyA9PiB7XG4gICAgY29uc3QgbmIgPSBzLm5vdGVib29rcy5maW5kKG4gPT4gbi5pZCA9PT0gcy51aS5ub3RlYm9va0lkKTtcbiAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgY29uc3QgcGcgPSBzZWMgPyBmaW5kSW5UcmVlKHNlYy5wYWdlcywgcGFnZUlkKSA6IG51bGw7XG4gICAgaWYgKHBnKSBwZy50aXRsZSA9IHRpdGxlO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gocGFnZUlkLCB0aXRsZSkge1xuICAvLyBDYWxsZWQgb24gYmx1ciDigJQgdXBkYXRlcyB0aXRsZSBBTkQgdHJpZ2dlcnMgc2lkZWJhciByZS1yZW5kZXJcbiAgdXBkYXRlKHMgPT4ge1xuICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgY29uc3Qgc2VjID0gbmI/LnNlY3Rpb25zLmZpbmQoc2VjID0+IHNlYy5pZCA9PT0gcy51aS5zZWN0aW9uSWQpO1xuICAgIGNvbnN0IHBnID0gc2VjID8gZmluZEluVHJlZShzZWMucGFnZXMsIHBhZ2VJZCkgOiBudWxsO1xuICAgIGlmIChwZykgcGcudGl0bGUgPSB0aXRsZTtcbiAgfSk7XG59XG4iLAogICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9BcHAuanN4JztcblxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iLAogICJpbXBvcnQgeyBhcHBTdGF0ZSwgZ2V0QWN0aXZlUGFnZSwgZmluZEluVHJlZSB9IGZyb20gJy4vc3RvcmUuanMnO1xuaW1wb3J0IHsgTm90ZWJvb2tCYXIgfSBmcm9tICcuL05vdGVib29rQmFyLmpzeCc7XG5pbXBvcnQgeyBTZWN0aW9uUGFuZWwgfSBmcm9tICcuL1NlY3Rpb25QYW5lbC5qc3gnO1xuaW1wb3J0IHsgUGFnZXNQYW5lbCB9IGZyb20gJy4vUGFnZXNQYW5lbC5qc3gnO1xuaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSAnLi9DYW52YXMuanN4JztcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3Qgc3RhdGUgPSBhcHBTdGF0ZS52YWx1ZTtcbiAgY29uc3QgeyBub3RlYm9va3MsIHVpIH0gPSBzdGF0ZTtcbiAgY29uc3QgbmIgPSBub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHVpLm5vdGVib29rSWQpO1xuICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIGNvbnN0IHBhZ2UgPSBzZWMgPyBmaW5kSW5UcmVlKHNlYy5wYWdlcywgdWkucGFnZUlkKSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPE5vdGVib29rQmFyIC8+XG4gICAgICA8ZGl2IGlkPVwibWFpblwiPlxuICAgICAgICA8U2VjdGlvblBhbmVsIC8+XG4gICAgICAgIDxQYWdlc1BhbmVsIC8+XG4gICAgICAgIDxkaXYgaWQ9XCJjYW52YXMtYXJlYVwiPlxuICAgICAgICAgIDxDYW52YXMgcGFnZT17cGFnZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsCiAgImltcG9ydCB7IHVzZVJlZiB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBhcHBTdGF0ZSwgc2V0QWN0aXZlTm90ZWJvb2ssIGFkZE5vdGVib29rLCByZW5hbWVOb3RlYm9vaywgZGVsZXRlTm90ZWJvb2ssIHJlb3JkZXJOb3RlYm9va3MgfSBmcm9tICcuL3N0b3JlLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5vdGVib29rQmFyKCkge1xuICBjb25zdCB7IG5vdGVib29rcywgdWkgfSA9IGFwcFN0YXRlLnZhbHVlO1xuICBjb25zdCBkcmFnSWQgPSB1c2VSZWYobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwibm90ZWJvb2stYmFyXCI+XG4gICAgICB7bm90ZWJvb2tzLm1hcChuYiA9PiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e25iLmlkfVxuICAgICAgICAgIGNsYXNzPXtbJ25iLXRhYicsIG5iLmlkID09PSB1aS5ub3RlYm9va0lkICYmICduYi10YWItLWFjdGl2ZSddLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlTm90ZWJvb2sobmIuaWQpfVxuICAgICAgICAgIG9uRGJsQ2xpY2s9eygpID0+IHsgY29uc3QgdCA9IHByb21wdCgnTm90ZWJvb2sgbmFtZTonLCBuYi50aXRsZSk7IGlmICh0Py50cmltKCkpIHJlbmFtZU5vdGVib29rKG5iLmlkLCB0LnRyaW0oKSk7IH19XG4gICAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tzLmxlbmd0aCA8PSAxKSByZXR1cm4gYWxlcnQoJ0Nhbm5vdCBkZWxldGUgdGhlIGxhc3Qgbm90ZWJvb2suJyk7XG4gICAgICAgICAgICBpZiAoY29uZmlybShgRGVsZXRlIFwiJHtuYi50aXRsZX1cIiBhbmQgYWxsIGNvbnRlbnRzP2ApKSBkZWxldGVOb3RlYm9vayhuYi5pZCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4geyBkcmFnSWQuY3VycmVudCA9IG5iLmlkOyB9fVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdJZC5jdXJyZW50IHx8IGRyYWdJZC5jdXJyZW50ID09PSBuYi5pZCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaWRzID0gbm90ZWJvb2tzLm1hcChuID0+IG4uaWQpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGlkcy5pbmRleE9mKGRyYWdJZC5jdXJyZW50KSwgdG8gPSBpZHMuaW5kZXhPZihuYi5pZCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gWy4uLmlkc107IG5leHQuc3BsaWNlKGZyb20sIDEpOyBuZXh0LnNwbGljZSh0bywgMCwgZHJhZ0lkLmN1cnJlbnQpO1xuICAgICAgICAgICAgcmVvcmRlck5vdGVib29rcyhuZXh0KTtcbiAgICAgICAgICAgIGRyYWdJZC5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9fVxuICAgICAgICA+e25iLnRpdGxlfTwvZGl2PlxuICAgICAgKSl9XG4gICAgICA8YnV0dG9uIGNsYXNzPVwibmItYWRkXCIgb25DbGljaz17YWRkTm90ZWJvb2t9IHRpdGxlPVwiTmV3IG5vdGVib29rXCI+KzwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAiaW1wb3J0e29wdGlvbnMgYXMgcixGcmFnbWVudCBhcyBlfWZyb21cInByZWFjdFwiO2V4cG9ydHtGcmFnbWVudH1mcm9tXCJwcmVhY3RcIjt2YXIgdD0vW1wiJjxdLztmdW5jdGlvbiBuKHIpe2lmKDA9PT1yLmxlbmd0aHx8ITE9PT10LnRlc3QocikpcmV0dXJuIHI7Zm9yKHZhciBlPTAsbj0wLG89XCJcIixmPVwiXCI7bjxyLmxlbmd0aDtuKyspe3N3aXRjaChyLmNoYXJDb2RlQXQobikpe2Nhc2UgMzQ6Zj1cIiZxdW90O1wiO2JyZWFrO2Nhc2UgMzg6Zj1cIiZhbXA7XCI7YnJlYWs7Y2FzZSA2MDpmPVwiJmx0O1wiO2JyZWFrO2RlZmF1bHQ6Y29udGludWV9biE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG8rPWYsZT1uKzF9cmV0dXJuIG4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvfXZhciBvPS9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2ksZj0wLGk9QXJyYXkuaXNBcnJheTtmdW5jdGlvbiB1KGUsdCxuLG8saSx1KXt0fHwodD17fSk7dmFyIGEsYyxwPXQ7aWYoXCJyZWZcImluIHApZm9yKGMgaW4gcD17fSx0KVwicmVmXCI9PWM/YT10W2NdOnBbY109dFtjXTt2YXIgbD17dHlwZTplLHByb3BzOnAsa2V5Om4scmVmOmEsX19rOm51bGwsX186bnVsbCxfX2I6MCxfX2U6bnVsbCxfX2M6bnVsbCxjb25zdHJ1Y3Rvcjp2b2lkIDAsX192Oi0tZixfX2k6LTEsX191OjAsX19zb3VyY2U6aSxfX3NlbGY6dX07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGE9ZS5kZWZhdWx0UHJvcHMpKWZvcihjIGluIGEpdm9pZCAwPT09cFtjXSYmKHBbY109YVtjXSk7cmV0dXJuIHIudm5vZGUmJnIudm5vZGUobCksbH1mdW5jdGlvbiBhKHIpe3ZhciB0PXUoZSx7dHBsOnIsZXhwcnM6W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSl9KTtyZXR1cm4gdC5rZXk9dC5fX3YsdH12YXIgYz17fSxwPS9bQS1aXS9nO2Z1bmN0aW9uIGwoZSx0KXtpZihyLmF0dHIpe3ZhciBmPXIuYXR0cihlLHQpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBmKXJldHVybiBmfWlmKHQ9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGwhPT1yJiZcIm9iamVjdFwiPT10eXBlb2YgciYmXCJmdW5jdGlvblwiPT10eXBlb2Ygci52YWx1ZU9mP3IudmFsdWVPZigpOnJ9KHQpLFwicmVmXCI9PT1lfHxcImtleVwiPT09ZSlyZXR1cm5cIlwiO2lmKFwic3R5bGVcIj09PWUmJlwib2JqZWN0XCI9PXR5cGVvZiB0KXt2YXIgaT1cIlwiO2Zvcih2YXIgdSBpbiB0KXt2YXIgYT10W3VdO2lmKG51bGwhPWEmJlwiXCIhPT1hKXt2YXIgbD1cIi1cIj09dVswXT91OmNbdV18fChjW3VdPXUucmVwbGFjZShwLFwiLSQmXCIpLnRvTG93ZXJDYXNlKCkpLHM9XCI7XCI7XCJudW1iZXJcIiE9dHlwZW9mIGF8fGwuc3RhcnRzV2l0aChcIi0tXCIpfHxvLnRlc3QobCl8fChzPVwicHg7XCIpLGk9aStsK1wiOlwiK2Erc319cmV0dXJuIGUrJz1cIicrbihpKSsnXCInfXJldHVybiBudWxsPT10fHwhMT09PXR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHR8fFwib2JqZWN0XCI9PXR5cGVvZiB0P1wiXCI6ITA9PT10P2U6ZSsnPVwiJytuKFwiXCIrdCkrJ1wiJ31mdW5jdGlvbiBzKHIpe2lmKG51bGw9PXJ8fFwiYm9vbGVhblwiPT10eXBlb2Ygcnx8XCJmdW5jdGlvblwiPT10eXBlb2YgcilyZXR1cm4gbnVsbDtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYodm9pZCAwPT09ci5jb25zdHJ1Y3RvcilyZXR1cm4gcjtpZihpKHIpKXtmb3IodmFyIGU9MDtlPHIubGVuZ3RoO2UrKylyW2VdPXMocltlXSk7cmV0dXJuIHJ9fXJldHVybiBuKFwiXCIrcil9ZXhwb3J0e3UgYXMganN4LGwgYXMganN4QXR0cix1IGFzIGpzeERFVixzIGFzIGpzeEVzY2FwZSxhIGFzIGpzeFRlbXBsYXRlLHUgYXMganN4c307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc3hSdW50aW1lLm1vZHVsZS5qcy5tYXBcbiIsCiAgImltcG9ydHtvcHRpb25zIGFzIHIsRnJhZ21lbnQgYXMgZX1mcm9tXCJwcmVhY3RcIjtleHBvcnR7RnJhZ21lbnR9ZnJvbVwicHJlYWN0XCI7dmFyIHQ9L1tcIiY8XS87ZnVuY3Rpb24gbihyKXtpZigwPT09ci5sZW5ndGh8fCExPT09dC50ZXN0KHIpKXJldHVybiByO2Zvcih2YXIgZT0wLG49MCxvPVwiXCIsZj1cIlwiO248ci5sZW5ndGg7bisrKXtzd2l0Y2goci5jaGFyQ29kZUF0KG4pKXtjYXNlIDM0OmY9XCImcXVvdDtcIjticmVhaztjYXNlIDM4OmY9XCImYW1wO1wiO2JyZWFrO2Nhc2UgNjA6Zj1cIiZsdDtcIjticmVhaztkZWZhdWx0OmNvbnRpbnVlfW4hPT1lJiYobys9ci5zbGljZShlLG4pKSxvKz1mLGU9bisxfXJldHVybiBuIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksb312YXIgbz0vYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pLGY9MCxpPUFycmF5LmlzQXJyYXk7ZnVuY3Rpb24gdShlLHQsbixvLGksdSl7dHx8KHQ9e30pO3ZhciBhLGMscD10O2lmKFwicmVmXCJpbiBwKWZvcihjIGluIHA9e30sdClcInJlZlwiPT1jP2E9dFtjXTpwW2NdPXRbY107dmFyIGw9e3R5cGU6ZSxwcm9wczpwLGtleTpuLHJlZjphLF9fazpudWxsLF9fOm51bGwsX19iOjAsX19lOm51bGwsX19jOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjotLWYsX19pOi0xLF9fdTowLF9fc291cmNlOmksX19zZWxmOnV9O2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuZGVmYXVsdFByb3BzKSlmb3IoYyBpbiBhKXZvaWQgMD09PXBbY10mJihwW2NdPWFbY10pO3JldHVybiByLnZub2RlJiZyLnZub2RlKGwpLGx9ZnVuY3Rpb24gYShyKXt2YXIgdD11KGUse3RwbDpyLGV4cHJzOltdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpfSk7cmV0dXJuIHQua2V5PXQuX192LHR9dmFyIGM9e30scD0vW0EtWl0vZztmdW5jdGlvbiBsKGUsdCl7aWYoci5hdHRyKXt2YXIgZj1yLmF0dHIoZSx0KTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilyZXR1cm4gZn1pZih0PWZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT09ciYmXCJvYmplY3RcIj09dHlwZW9mIHImJlwiZnVuY3Rpb25cIj09dHlwZW9mIHIudmFsdWVPZj9yLnZhbHVlT2YoKTpyfSh0KSxcInJlZlwiPT09ZXx8XCJrZXlcIj09PWUpcmV0dXJuXCJcIjtpZihcInN0eWxlXCI9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIGk9XCJcIjtmb3IodmFyIHUgaW4gdCl7dmFyIGE9dFt1XTtpZihudWxsIT1hJiZcIlwiIT09YSl7dmFyIGw9XCItXCI9PXVbMF0/dTpjW3VdfHwoY1t1XT11LnJlcGxhY2UocCxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpKSxzPVwiO1wiO1wibnVtYmVyXCIhPXR5cGVvZiBhfHxsLnN0YXJ0c1dpdGgoXCItLVwiKXx8by50ZXN0KGwpfHwocz1cInB4O1wiKSxpPWkrbCtcIjpcIithK3N9fXJldHVybiBlKyc9XCInK24oaSkrJ1wiJ31yZXR1cm4gbnVsbD09dHx8ITE9PT10fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcIm9iamVjdFwiPT10eXBlb2YgdD9cIlwiOiEwPT09dD9lOmUrJz1cIicrbihcIlwiK3QpKydcIid9ZnVuY3Rpb24gcyhyKXtpZihudWxsPT1yfHxcImJvb2xlYW5cIj09dHlwZW9mIHJ8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIG51bGw7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHZvaWQgMD09PXIuY29uc3RydWN0b3IpcmV0dXJuIHI7aWYoaShyKSl7Zm9yKHZhciBlPTA7ZTxyLmxlbmd0aDtlKyspcltlXT1zKHJbZV0pO3JldHVybiByfX1yZXR1cm4gbihcIlwiK3IpfWV4cG9ydHt1IGFzIGpzeCxsIGFzIGpzeEF0dHIsdSBhcyBqc3hERVYscyBhcyBqc3hFc2NhcGUsYSBhcyBqc3hUZW1wbGF0ZSx1IGFzIGpzeHN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anN4UnVudGltZS5tb2R1bGUuanMubWFwXG4iLAogICJpbXBvcnR7b3B0aW9ucyBhcyByLEZyYWdtZW50IGFzIGV9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e0ZyYWdtZW50fWZyb21cInByZWFjdFwiO3ZhciB0PS9bXCImPF0vO2Z1bmN0aW9uIG4ocil7aWYoMD09PXIubGVuZ3RofHwhMT09PXQudGVzdChyKSlyZXR1cm4gcjtmb3IodmFyIGU9MCxuPTAsbz1cIlwiLGY9XCJcIjtuPHIubGVuZ3RoO24rKyl7c3dpdGNoKHIuY2hhckNvZGVBdChuKSl7Y2FzZSAzNDpmPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpmPVwiJmFtcDtcIjticmVhaztjYXNlIDYwOmY9XCImbHQ7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1uIT09ZSYmKG8rPXIuc2xpY2UoZSxuKSksbys9ZixlPW4rMX1yZXR1cm4gbiE9PWUmJihvKz1yLnNsaWNlKGUsbikpLG99dmFyIG89L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaSxmPTAsaT1BcnJheS5pc0FycmF5O2Z1bmN0aW9uIHUoZSx0LG4sbyxpLHUpe3R8fCh0PXt9KTt2YXIgYSxjLHA9dDtpZihcInJlZlwiaW4gcClmb3IoYyBpbiBwPXt9LHQpXCJyZWZcIj09Yz9hPXRbY106cFtjXT10W2NdO3ZhciBsPXt0eXBlOmUscHJvcHM6cCxrZXk6bixyZWY6YSxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fYzpudWxsLGNvbnN0cnVjdG9yOnZvaWQgMCxfX3Y6LS1mLF9faTotMSxfX3U6MCxfX3NvdXJjZTppLF9fc2VsZjp1fTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYoYT1lLmRlZmF1bHRQcm9wcykpZm9yKGMgaW4gYSl2b2lkIDA9PT1wW2NdJiYocFtjXT1hW2NdKTtyZXR1cm4gci52bm9kZSYmci52bm9kZShsKSxsfWZ1bmN0aW9uIGEocil7dmFyIHQ9dShlLHt0cGw6cixleHByczpbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKX0pO3JldHVybiB0LmtleT10Ll9fdix0fXZhciBjPXt9LHA9L1tBLVpdL2c7ZnVuY3Rpb24gbChlLHQpe2lmKHIuYXR0cil7dmFyIGY9ci5hdHRyKGUsdCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpcmV0dXJuIGZ9aWYodD1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbCE9PXImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiByLnZhbHVlT2Y/ci52YWx1ZU9mKCk6cn0odCksXCJyZWZcIj09PWV8fFwia2V5XCI9PT1lKXJldHVyblwiXCI7aWYoXCJzdHlsZVwiPT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBpPVwiXCI7Zm9yKHZhciB1IGluIHQpe3ZhciBhPXRbdV07aWYobnVsbCE9YSYmXCJcIiE9PWEpe3ZhciBsPVwiLVwiPT11WzBdP3U6Y1t1XXx8KGNbdV09dS5yZXBsYWNlKHAsXCItJCZcIikudG9Mb3dlckNhc2UoKSkscz1cIjtcIjtcIm51bWJlclwiIT10eXBlb2YgYXx8bC5zdGFydHNXaXRoKFwiLS1cIil8fG8udGVzdChsKXx8KHM9XCJweDtcIiksaT1pK2wrXCI6XCIrYStzfX1yZXR1cm4gZSsnPVwiJytuKGkpKydcIid9cmV0dXJuIG51bGw9PXR8fCExPT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJvYmplY3RcIj09dHlwZW9mIHQ/XCJcIjohMD09PXQ/ZTplKyc9XCInK24oXCJcIit0KSsnXCInfWZ1bmN0aW9uIHMocil7aWYobnVsbD09cnx8XCJib29sZWFuXCI9PXR5cGVvZiByfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByKXJldHVybiBudWxsO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZih2b2lkIDA9PT1yLmNvbnN0cnVjdG9yKXJldHVybiByO2lmKGkocikpe2Zvcih2YXIgZT0wO2U8ci5sZW5ndGg7ZSsrKXJbZV09cyhyW2VdKTtyZXR1cm4gcn19cmV0dXJuIG4oXCJcIityKX1leHBvcnR7dSBhcyBqc3gsbCBhcyBqc3hBdHRyLHUgYXMganN4REVWLHMgYXMganN4RXNjYXBlLGEgYXMganN4VGVtcGxhdGUsdSBhcyBqc3hzfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeFJ1bnRpbWUubW9kdWxlLmpzLm1hcFxuIiwKICAiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IGFwcFN0YXRlLCBzZXRBY3RpdmVTZWN0aW9uLCBhZGRTZWN0aW9uLCByZW5hbWVTZWN0aW9uLCBkZWxldGVTZWN0aW9uLCByZW9yZGVyU2VjdGlvbnMgfSBmcm9tICcuL3N0b3JlLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIFNlY3Rpb25QYW5lbCgpIHtcbiAgY29uc3QgeyBub3RlYm9va3MsIHVpIH0gPSBhcHBTdGF0ZS52YWx1ZTtcbiAgY29uc3QgbmIgPSBub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHVpLm5vdGVib29rSWQpO1xuICBjb25zdCBzZWN0aW9ucyA9IG5iPy5zZWN0aW9ucyA/PyBbXTtcbiAgY29uc3QgZHJhZ0lkID0gdXNlUmVmKG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInNlY3Rpb25zLXBhbmVsXCIgY2xhc3M9XCJwYW5lbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxhYmVsXCI+U2VjdGlvbnM8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1saXN0XCI+XG4gICAgICAgIHtzZWN0aW9ucy5tYXAoc2VjID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e3NlYy5pZH1cbiAgICAgICAgICAgIGNsYXNzPXtbJ3BhbmVsLWl0ZW0nLCBzZWMuaWQgPT09IHVpLnNlY3Rpb25JZCAmJiAncGFuZWwtaXRlbS0tYWN0aXZlJ10uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNlY3Rpb24oc2VjLmlkKX1cbiAgICAgICAgICAgIG9uRGJsQ2xpY2s9eygpID0+IHsgY29uc3QgdCA9IHByb21wdCgnU2VjdGlvbiBuYW1lOicsIHNlYy50aXRsZSk7IGlmICh0Py50cmltKCkpIHJlbmFtZVNlY3Rpb24obmIuaWQsIHNlYy5pZCwgdC50cmltKCkpOyB9fVxuICAgICAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKHNlY3Rpb25zLmxlbmd0aCA8PSAxKSByZXR1cm4gYWxlcnQoJ0Nhbm5vdCBkZWxldGUgdGhlIGxhc3Qgc2VjdGlvbi4nKTtcbiAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oYERlbGV0ZSBcIiR7c2VjLnRpdGxlfVwiP2ApKSBkZWxldGVTZWN0aW9uKG5iLmlkLCBzZWMuaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgICAgb25EcmFnU3RhcnQ9eygpID0+IHsgZHJhZ0lkLmN1cnJlbnQgPSBzZWMuaWQ7IH19XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXtlID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICAgIG9uRHJvcD17ZSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKCFkcmFnSWQuY3VycmVudCB8fCBkcmFnSWQuY3VycmVudCA9PT0gc2VjLmlkKSByZXR1cm47XG4gICAgICAgICAgICAgIGNvbnN0IGlkcyA9IHNlY3Rpb25zLm1hcChzID0+IHMuaWQpO1xuICAgICAgICAgICAgICBjb25zdCBmcm9tID0gaWRzLmluZGV4T2YoZHJhZ0lkLmN1cnJlbnQpLCB0byA9IGlkcy5pbmRleE9mKHNlYy5pZCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBbLi4uaWRzXTsgbmV4dC5zcGxpY2UoZnJvbSwgMSk7IG5leHQuc3BsaWNlKHRvLCAwLCBkcmFnSWQuY3VycmVudCk7XG4gICAgICAgICAgICAgIHJlb3JkZXJTZWN0aW9ucyhuYi5pZCwgbmV4dCk7XG4gICAgICAgICAgICAgIGRyYWdJZC5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPntzZWMudGl0bGV9PC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtYnRuXCIgb25DbGljaz17KCkgPT4gYWRkU2VjdGlvbihuYj8uaWQpfT4rIFNlY3Rpb248L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBhcHBTdGF0ZSwgc2V0QWN0aXZlUGFnZSwgYWRkUGFnZSwgcmVuYW1lUGFnZSwgZGVsZXRlUGFnZSwgbW92ZVBhZ2UsIGZpbmRJblRyZWUgfSBmcm9tICcuL3N0b3JlLmpzJztcblxuLy8g4pSA4pSAIERyYWcgc3RhdGUgKG1vZHVsZS1sZXZlbCBzbyBzaWJsaW5ncyBjYW4gc2hhcmUpIOKUgOKUgOKUgOKUgOKUgOKUgFxuY29uc3QgZHJhZyA9IHsgcGFnZUlkOiBudWxsLCBvdmVyOiBudWxsLCBtb2RlOiBudWxsIH07IC8vIG1vZGU6ICdiZWZvcmUnIHwgJ2NoaWxkJ1xuXG5mdW5jdGlvbiBkZWxldGVQYWdlV2l0aENoaWxkcmVuKHBhZ2UpIHtcbiAgaWYgKCFwYWdlLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICBpZiAoY29uZmlybShgRGVsZXRlIFwiJHtwYWdlLnRpdGxlfVwiP2ApKSBkZWxldGVQYWdlKHBhZ2UuaWQpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBjaG9pY2UgPSBjb25maXJtKFxuICAgIGBcIiR7cGFnZS50aXRsZX1cIiBoYXMgJHtwYWdlLmNoaWxkcmVuLmxlbmd0aH0gc3VicGFnZShzKS5cXG5cXG5PSyA9IGRlbGV0ZSBhbGwgc3VicGFnZXNcXG5DYW5jZWwgPSBwcm9tb3RlIHN1YnBhZ2VzIHRvIHNpYmxpbmdzYFxuICApO1xuICBpZiAoY2hvaWNlKSB7XG4gICAgLy8gRGVsZXRlIGVudGlyZSBzdWJ0cmVlXG4gICAgZGVsZXRlUGFnZShwYWdlLmlkKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBQcm9tb3RlIGNoaWxkcmVuLCB0aGVuIGRlbGV0ZSBwYXJlbnRcbiAgICAvLyBXZSBkbyB0aGlzIGJ5IG1vdmluZyBlYWNoIGNoaWxkIHVwIGluIHRoZSB0cmVlIGJlZm9yZSBkZWxldGluZyBwYXJlbnRcbiAgICBpbXBvcnQoJy4vc3RvcmUuanMnKS50aGVuKG0gPT4ge1xuICAgICAgLy8gUHJvbW90ZSBlYWNoIGNoaWxkIHRvIGJlIGEgc2libGluZyBvZiB0aGUgcGFyZW50XG4gICAgICBjb25zdCB7IGFwcFN0YXRlOiBzdCB9ID0gbTtcbiAgICAgIGNvbnN0IHMgPSBzdC52YWx1ZTtcbiAgICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgICAgLy8gRmluZCBwYXJlbnQgaW4gcGFnZXMgdHJlZSBhbmQgc3BsaWNlIGNoaWxkcmVuIG91dFxuICAgICAgZnVuY3Rpb24gcHJvbW90ZUNoaWxkcmVuKHBhZ2VzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IHBhZ2UuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFnZXNbaV0uY2hpbGRyZW4gPz8gW107XG4gICAgICAgICAgICBwYWdlcy5zcGxpY2UoaSwgMSwgLi4uY2hpbGRyZW4pOyAvLyByZXBsYWNlIHBhcmVudCB3aXRoIGl0cyBjaGlsZHJlblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9tb3RlQ2hpbGRyZW4ocGFnZXNbaV0uY2hpbGRyZW4gPz8gW10pKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBwcm9tb3RlQ2hpbGRyZW4oc2VjLnBhZ2VzKTtcbiAgICAgIHN0LnZhbHVlID0geyAuLi5zdC52YWx1ZSB9O1xuICAgICAgLy8gVHJpZ2dlciBzYXZlXG4gICAgICBpbXBvcnQoJy4vc3RvcmUuanMnKS50aGVuKG0yID0+IG0yLnVwZGF0ZVBhZ2VWaWV3KDAsIDAsIDEpKTsgLy8gdGlueSBzYXZlIHRyaWdnZXJcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBQYWdlSXRlbSh7IHBhZ2UsIGFjdGl2ZUlkLCBkZXB0aCA9IDAsIGRyYWdTdGF0ZSwgb25EcmFnQ2hhbmdlIH0pIHtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IGhhc0tpZHMgPSBwYWdlLmNoaWxkcmVuPy5sZW5ndGggPiAwO1xuICBjb25zdCBpc092ZXIgPSBkcmFnU3RhdGUub3ZlciA9PT0gcGFnZS5pZDtcbiAgY29uc3QgaXNPdmVyQXNDaGlsZCA9IGlzT3ZlciAmJiBkcmFnU3RhdGUubW9kZSA9PT0gJ2NoaWxkJztcblxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkcmFnLnBhZ2VJZCA9IHBhZ2UuaWQ7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChkcmFnLnBhZ2VJZCA9PT0gcGFnZS5pZCkgcmV0dXJuO1xuICAgIC8vIFRvcCAzMCUgb3IgYm90dG9tIDMwJSA9IHJlb3JkZXI7IG1pZGRsZSA0MCUgPSBuZXN0IGFzIGNoaWxkXG4gICAgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCByZWwgPSAoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gcmVjdC5oZWlnaHQ7XG4gICAgY29uc3QgbW9kZSA9IChyZWwgPiAwLjMgJiYgcmVsIDwgMC43KSA/ICdjaGlsZCcgOiAnYmVmb3JlJztcbiAgICBpZiAoZHJhZ1N0YXRlLm92ZXIgIT09IHBhZ2UuaWQgfHwgZHJhZ1N0YXRlLm1vZGUgIT09IG1vZGUpIHtcbiAgICAgIG9uRHJhZ0NoYW5nZShwYWdlLmlkLCBtb2RlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdMZWF2ZShlKSB7XG4gICAgaWYgKCFlLmN1cnJlbnRUYXJnZXQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgb25EcmFnQ2hhbmdlKG51bGwsIG51bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBmcm9tSWQgPSBkcmFnLnBhZ2VJZDtcbiAgICBkcmFnLnBhZ2VJZCA9IG51bGw7XG4gICAgb25EcmFnQ2hhbmdlKG51bGwsIG51bGwpO1xuICAgIGlmICghZnJvbUlkIHx8IGZyb21JZCA9PT0gcGFnZS5pZCkgcmV0dXJuO1xuXG4gICAgaWYgKGRyYWdTdGF0ZS5tb2RlID09PSAnY2hpbGQnKSB7XG4gICAgICAvLyBNb3ZlIGZyb21JZCBhcyBzdWJwYWdlIG9mIHBhZ2UuaWRcbiAgICAgIGltcG9ydCgnLi9zdG9yZS5qcycpLnRoZW4obSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBtLmFwcFN0YXRlLnZhbHVlO1xuICAgICAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICAgIGlmICghc2VjKSByZXR1cm47XG5cbiAgICAgICAgLy8gRXh0cmFjdCB0aGUgcGFnZSBmcm9tIHRyZWVcbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG5cbiAgICAgICAgLy8gRmluZCB0YXJnZXQgYW5kIGFwcGVuZCBjaGlsZFxuICAgICAgICBjb25zdCB0YXJnZXQgPSBtLmZpbmRJblRyZWUoc2VjLnBhZ2VzLCBwYWdlLmlkKTtcbiAgICAgICAgaWYgKHRhcmdldCkgeyB0YXJnZXQuY2hpbGRyZW4gPSB0YXJnZXQuY2hpbGRyZW4gPz8gW107IHRhcmdldC5jaGlsZHJlbi5wdXNoKGV4dHJhY3RlZCk7IH1cbiAgICAgICAgbS5hcHBTdGF0ZS52YWx1ZSA9IHsgLi4ubS5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlb3JkZXI6IG1vdmUgZnJvbUlkIHRvIGFwcGVhciBiZWZvcmUgcGFnZS5pZCBpbiBmbGF0IGxpc3RcbiAgICAgIGltcG9ydCgnLi9zdG9yZS5qcycpLnRoZW4obSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBtLmFwcFN0YXRlLnZhbHVlO1xuICAgICAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICAgIGlmICghc2VjKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG5cbiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhZ2VzKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBhZ2VzW2ldLmlkID09PSBwYWdlLmlkKSB7IHBhZ2VzLnNwbGljZShpLCAwLCBleHRyYWN0ZWQpOyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYgKGluc2VydEJlZm9yZShwYWdlc1tpXS5jaGlsZHJlbiA/PyBbXSkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0QmVmb3JlKHNlYy5wYWdlcyk7XG4gICAgICAgIG0uYXBwU3RhdGUudmFsdWUgPSB7IC4uLm0uYXBwU3RhdGUudmFsdWUgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaXRlbS13cmFwXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPXtbXG4gICAgICAgICAgJ3BhbmVsLWl0ZW0gcGFnZS1pdGVtJyxcbiAgICAgICAgICBwYWdlLmlkID09PSBhY3RpdmVJZCAmJiAncGFuZWwtaXRlbS0tYWN0aXZlJyxcbiAgICAgICAgICBpc092ZXIgJiYgIWlzT3ZlckFzQ2hpbGQgJiYgJ3BhZ2UtaXRlbS0tZHJvcC1iZWZvcmUnLFxuICAgICAgICAgIGlzT3ZlckFzQ2hpbGQgJiYgJ3BhZ2UtaXRlbS0tZHJvcC1jaGlsZCcsXG4gICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKX1cbiAgICAgICAgc3R5bGU9e3sgcGFkZGluZ0xlZnQ6ICgxMiArIGRlcHRoICogMTYpICsgJ3B4JyB9fVxuICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgb25EcmFnU3RhcnQ9e29uRHJhZ1N0YXJ0fVxuICAgICAgICBvbkRyYWdPdmVyPXtvbkRyYWdPdmVyfVxuICAgICAgICBvbkRyYWdMZWF2ZT17b25EcmFnTGVhdmV9XG4gICAgICAgIG9uRHJvcD17b25Ecm9wfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVQYWdlKHBhZ2UuaWQpfVxuICAgICAgICBvbkRibENsaWNrPXtlID0+IHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGNvbnN0IHQgPSBwcm9tcHQoJ1BhZ2UgbmFtZTonLCBwYWdlLnRpdGxlKTtcbiAgICAgICAgICBpZiAodD8udHJpbSgpKSByZW5hbWVQYWdlKHBhZ2UuaWQsIHQudHJpbSgpKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHByb21wdCgncmVuYW1lIC8gZGVsZXRlIC8gc3VicGFnZSAvIG1vdmUnLCAncmVuYW1lJyk7XG4gICAgICAgICAgaWYgKCFhY3Rpb24pIHJldHVybjtcbiAgICAgICAgICBpZiAoYWN0aW9uID09PSAncmVuYW1lJykgeyBjb25zdCB0ID0gcHJvbXB0KCdOYW1lOicsIHBhZ2UudGl0bGUpOyBpZiAodD8udHJpbSgpKSByZW5hbWVQYWdlKHBhZ2UuaWQsIHQudHJpbSgpKTsgfVxuICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2RlbGV0ZScpIGRlbGV0ZVBhZ2VXaXRoQ2hpbGRyZW4ocGFnZSk7XG4gICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc3VicGFnZScpIGFkZFBhZ2UocGFnZS5pZCk7XG4gICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSAnbW92ZScpIHtcbiAgICAgICAgICAgIGNvbnN0IG5iID0gYXBwU3RhdGUudmFsdWUubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBhcHBTdGF0ZS52YWx1ZS51aS5ub3RlYm9va0lkKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSBuYj8uc2VjdGlvbnMubWFwKHMgPT4gYCR7cy5pZH06ICR7cy50aXRsZX1gKS5qb2luKCdcXG4nKSA/PyAnJztcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gcHJvbXB0KCdUYXJnZXQgc2VjdGlvbiBJRDpcXG4nICsgb3B0cyk7XG4gICAgICAgICAgICBpZiAoaW5wdXQpIG1vdmVQYWdlKHBhZ2UuaWQsIGlucHV0LnNwbGl0KCc6JylbMF0udHJpbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJwYWdlLWV4cGFuZFwiXG4gICAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogaGFzS2lkcyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH19XG4gICAgICAgICAgb25DbGljaz17ZSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldE9wZW4obyA9PiAhbyk7IH19XG4gICAgICAgID57b3BlbiA/ICfilr4nIDogJ+KWuCd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhZ2UtdGl0bGUtdGV4dFwiPntwYWdlLnRpdGxlfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAge2hhc0tpZHMgJiYgb3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdWJwYWdlc1wiPlxuICAgICAgICAgIHtwYWdlLmNoaWxkcmVuLm1hcChjID0+IChcbiAgICAgICAgICAgIDxQYWdlSXRlbSBrZXk9e2MuaWR9IHBhZ2U9e2N9IGFjdGl2ZUlkPXthY3RpdmVJZH0gZGVwdGg9e2RlcHRoICsgMX0gZHJhZ1N0YXRlPXtkcmFnU3RhdGV9IG9uRHJhZ0NoYW5nZT17b25EcmFnQ2hhbmdlfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQYWdlc1BhbmVsKCkge1xuICBjb25zdCB7IG5vdGVib29rcywgdWkgfSA9IGFwcFN0YXRlLnZhbHVlO1xuICBjb25zdCBuYiAgPSBub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHVpLm5vdGVib29rSWQpO1xuICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIGNvbnN0IHBhZ2VzID0gc2VjPy5wYWdlcyA/PyBbXTtcblxuICBjb25zdCBbZHJhZ092ZXIsIHNldERyYWdPdmVyXSA9IHVzZVN0YXRlKHsgaWQ6IG51bGwsIG1vZGU6IG51bGwgfSk7XG5cbiAgZnVuY3Rpb24gb25EcmFnQ2hhbmdlKGlkLCBtb2RlKSB7IHNldERyYWdPdmVyKHsgaWQsIG1vZGUgfSk7IH1cblxuICBjb25zdCBkcmFnU3RhdGUgPSB7IG92ZXI6IGRyYWdPdmVyLmlkLCBtb2RlOiBkcmFnT3Zlci5tb2RlIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwicGFnZXMtcGFuZWxcIiBjbGFzcz1cInBhbmVsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtbGFiZWxcIj5QYWdlczwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxpc3RcIj5cbiAgICAgICAge3BhZ2VzLm1hcChwZyA9PiAoXG4gICAgICAgICAgPFBhZ2VJdGVtIGtleT17cGcuaWR9IHBhZ2U9e3BnfSBhY3RpdmVJZD17dWkucGFnZUlkfSBkcmFnU3RhdGU9e2RyYWdTdGF0ZX0gb25EcmFnQ2hhbmdlPXtvbkRyYWdDaGFuZ2V9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtYnRuXCIgb25DbGljaz17KCkgPT4gYWRkUGFnZSgpfT4rIFBhZ2U8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBhcHBTdGF0ZSwgc2V0QWN0aXZlUGFnZSwgYWRkUGFnZSwgcmVuYW1lUGFnZSwgZGVsZXRlUGFnZSwgbW92ZVBhZ2UsIGZpbmRJblRyZWUgfSBmcm9tICcuL3N0b3JlLmpzJztcblxuLy8g4pSA4pSAIERyYWcgc3RhdGUgKG1vZHVsZS1sZXZlbCBzbyBzaWJsaW5ncyBjYW4gc2hhcmUpIOKUgOKUgOKUgOKUgOKUgOKUgFxuY29uc3QgZHJhZyA9IHsgcGFnZUlkOiBudWxsLCBvdmVyOiBudWxsLCBtb2RlOiBudWxsIH07IC8vIG1vZGU6ICdiZWZvcmUnIHwgJ2NoaWxkJ1xuXG5mdW5jdGlvbiBkZWxldGVQYWdlV2l0aENoaWxkcmVuKHBhZ2UpIHtcbiAgaWYgKCFwYWdlLmNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICBpZiAoY29uZmlybShgRGVsZXRlIFwiJHtwYWdlLnRpdGxlfVwiP2ApKSBkZWxldGVQYWdlKHBhZ2UuaWQpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBjaG9pY2UgPSBjb25maXJtKFxuICAgIGBcIiR7cGFnZS50aXRsZX1cIiBoYXMgJHtwYWdlLmNoaWxkcmVuLmxlbmd0aH0gc3VicGFnZShzKS5cXG5cXG5PSyA9IGRlbGV0ZSBhbGwgc3VicGFnZXNcXG5DYW5jZWwgPSBwcm9tb3RlIHN1YnBhZ2VzIHRvIHNpYmxpbmdzYFxuICApO1xuICBpZiAoY2hvaWNlKSB7XG4gICAgLy8gRGVsZXRlIGVudGlyZSBzdWJ0cmVlXG4gICAgZGVsZXRlUGFnZShwYWdlLmlkKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBQcm9tb3RlIGNoaWxkcmVuLCB0aGVuIGRlbGV0ZSBwYXJlbnRcbiAgICAvLyBXZSBkbyB0aGlzIGJ5IG1vdmluZyBlYWNoIGNoaWxkIHVwIGluIHRoZSB0cmVlIGJlZm9yZSBkZWxldGluZyBwYXJlbnRcbiAgICBpbXBvcnQoJy4vc3RvcmUuanMnKS50aGVuKG0gPT4ge1xuICAgICAgLy8gUHJvbW90ZSBlYWNoIGNoaWxkIHRvIGJlIGEgc2libGluZyBvZiB0aGUgcGFyZW50XG4gICAgICBjb25zdCB7IGFwcFN0YXRlOiBzdCB9ID0gbTtcbiAgICAgIGNvbnN0IHMgPSBzdC52YWx1ZTtcbiAgICAgIGNvbnN0IG5iID0gcy5ub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHMudWkubm90ZWJvb2tJZCk7XG4gICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICBpZiAoIXNlYykgcmV0dXJuO1xuICAgICAgLy8gRmluZCBwYXJlbnQgaW4gcGFnZXMgdHJlZSBhbmQgc3BsaWNlIGNoaWxkcmVuIG91dFxuICAgICAgZnVuY3Rpb24gcHJvbW90ZUNoaWxkcmVuKHBhZ2VzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IHBhZ2UuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcGFnZXNbaV0uY2hpbGRyZW4gPz8gW107XG4gICAgICAgICAgICBwYWdlcy5zcGxpY2UoaSwgMSwgLi4uY2hpbGRyZW4pOyAvLyByZXBsYWNlIHBhcmVudCB3aXRoIGl0cyBjaGlsZHJlblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9tb3RlQ2hpbGRyZW4ocGFnZXNbaV0uY2hpbGRyZW4gPz8gW10pKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBwcm9tb3RlQ2hpbGRyZW4oc2VjLnBhZ2VzKTtcbiAgICAgIHN0LnZhbHVlID0geyAuLi5zdC52YWx1ZSB9O1xuICAgICAgLy8gVHJpZ2dlciBzYXZlXG4gICAgICBpbXBvcnQoJy4vc3RvcmUuanMnKS50aGVuKG0yID0+IG0yLnVwZGF0ZVBhZ2VWaWV3KDAsIDAsIDEpKTsgLy8gdGlueSBzYXZlIHRyaWdnZXJcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBQYWdlSXRlbSh7IHBhZ2UsIGFjdGl2ZUlkLCBkZXB0aCA9IDAsIGRyYWdTdGF0ZSwgb25EcmFnQ2hhbmdlIH0pIHtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IGhhc0tpZHMgPSBwYWdlLmNoaWxkcmVuPy5sZW5ndGggPiAwO1xuICBjb25zdCBpc092ZXIgPSBkcmFnU3RhdGUub3ZlciA9PT0gcGFnZS5pZDtcbiAgY29uc3QgaXNPdmVyQXNDaGlsZCA9IGlzT3ZlciAmJiBkcmFnU3RhdGUubW9kZSA9PT0gJ2NoaWxkJztcblxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkcmFnLnBhZ2VJZCA9IHBhZ2UuaWQ7XG4gICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChkcmFnLnBhZ2VJZCA9PT0gcGFnZS5pZCkgcmV0dXJuO1xuICAgIC8vIFRvcCAzMCUgb3IgYm90dG9tIDMwJSA9IHJlb3JkZXI7IG1pZGRsZSA0MCUgPSBuZXN0IGFzIGNoaWxkXG4gICAgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCByZWwgPSAoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gcmVjdC5oZWlnaHQ7XG4gICAgY29uc3QgbW9kZSA9IChyZWwgPiAwLjMgJiYgcmVsIDwgMC43KSA/ICdjaGlsZCcgOiAnYmVmb3JlJztcbiAgICBpZiAoZHJhZ1N0YXRlLm92ZXIgIT09IHBhZ2UuaWQgfHwgZHJhZ1N0YXRlLm1vZGUgIT09IG1vZGUpIHtcbiAgICAgIG9uRHJhZ0NoYW5nZShwYWdlLmlkLCBtb2RlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdMZWF2ZShlKSB7XG4gICAgaWYgKCFlLmN1cnJlbnRUYXJnZXQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgb25EcmFnQ2hhbmdlKG51bGwsIG51bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Ecm9wKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBmcm9tSWQgPSBkcmFnLnBhZ2VJZDtcbiAgICBkcmFnLnBhZ2VJZCA9IG51bGw7XG4gICAgb25EcmFnQ2hhbmdlKG51bGwsIG51bGwpO1xuICAgIGlmICghZnJvbUlkIHx8IGZyb21JZCA9PT0gcGFnZS5pZCkgcmV0dXJuO1xuXG4gICAgaWYgKGRyYWdTdGF0ZS5tb2RlID09PSAnY2hpbGQnKSB7XG4gICAgICAvLyBNb3ZlIGZyb21JZCBhcyBzdWJwYWdlIG9mIHBhZ2UuaWRcbiAgICAgIGltcG9ydCgnLi9zdG9yZS5qcycpLnRoZW4obSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBtLmFwcFN0YXRlLnZhbHVlO1xuICAgICAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICAgIGlmICghc2VjKSByZXR1cm47XG5cbiAgICAgICAgLy8gRXh0cmFjdCB0aGUgcGFnZSBmcm9tIHRyZWVcbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG5cbiAgICAgICAgLy8gRmluZCB0YXJnZXQgYW5kIGFwcGVuZCBjaGlsZFxuICAgICAgICBjb25zdCB0YXJnZXQgPSBtLmZpbmRJblRyZWUoc2VjLnBhZ2VzLCBwYWdlLmlkKTtcbiAgICAgICAgaWYgKHRhcmdldCkgeyB0YXJnZXQuY2hpbGRyZW4gPSB0YXJnZXQuY2hpbGRyZW4gPz8gW107IHRhcmdldC5jaGlsZHJlbi5wdXNoKGV4dHJhY3RlZCk7IH1cbiAgICAgICAgbS5hcHBTdGF0ZS52YWx1ZSA9IHsgLi4ubS5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlb3JkZXI6IG1vdmUgZnJvbUlkIHRvIGFwcGVhciBiZWZvcmUgcGFnZS5pZCBpbiBmbGF0IGxpc3RcbiAgICAgIGltcG9ydCgnLi9zdG9yZS5qcycpLnRoZW4obSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBtLmFwcFN0YXRlLnZhbHVlO1xuICAgICAgICBjb25zdCBuYiA9IHMubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBzLnVpLm5vdGVib29rSWQpO1xuICAgICAgICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzZWMgPT4gc2VjLmlkID09PSBzLnVpLnNlY3Rpb25JZCk7XG4gICAgICAgIGlmICghc2VjKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3QocGFnZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFnZXNbaV0uaWQgPT09IGZyb21JZCkgeyBbZXh0cmFjdGVkXSA9IHBhZ2VzLnNwbGljZShpLCAxKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGlmIChleHRyYWN0KHBhZ2VzW2ldLmNoaWxkcmVuID8/IFtdKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0KHNlYy5wYWdlcyk7XG4gICAgICAgIGlmICghZXh0cmFjdGVkKSByZXR1cm47XG5cbiAgICAgICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhZ2VzKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBhZ2VzW2ldLmlkID09PSBwYWdlLmlkKSB7IHBhZ2VzLnNwbGljZShpLCAwLCBleHRyYWN0ZWQpOyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYgKGluc2VydEJlZm9yZShwYWdlc1tpXS5jaGlsZHJlbiA/PyBbXSkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0QmVmb3JlKHNlYy5wYWdlcyk7XG4gICAgICAgIG0uYXBwU3RhdGUudmFsdWUgPSB7IC4uLm0uYXBwU3RhdGUudmFsdWUgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaXRlbS13cmFwXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPXtbXG4gICAgICAgICAgJ3BhbmVsLWl0ZW0gcGFnZS1pdGVtJyxcbiAgICAgICAgICBwYWdlLmlkID09PSBhY3RpdmVJZCAmJiAncGFuZWwtaXRlbS0tYWN0aXZlJyxcbiAgICAgICAgICBpc092ZXIgJiYgIWlzT3ZlckFzQ2hpbGQgJiYgJ3BhZ2UtaXRlbS0tZHJvcC1iZWZvcmUnLFxuICAgICAgICAgIGlzT3ZlckFzQ2hpbGQgJiYgJ3BhZ2UtaXRlbS0tZHJvcC1jaGlsZCcsXG4gICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKX1cbiAgICAgICAgc3R5bGU9e3sgcGFkZGluZ0xlZnQ6ICgxMiArIGRlcHRoICogMTYpICsgJ3B4JyB9fVxuICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgb25EcmFnU3RhcnQ9e29uRHJhZ1N0YXJ0fVxuICAgICAgICBvbkRyYWdPdmVyPXtvbkRyYWdPdmVyfVxuICAgICAgICBvbkRyYWdMZWF2ZT17b25EcmFnTGVhdmV9XG4gICAgICAgIG9uRHJvcD17b25Ecm9wfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVQYWdlKHBhZ2UuaWQpfVxuICAgICAgICBvbkRibENsaWNrPXtlID0+IHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGNvbnN0IHQgPSBwcm9tcHQoJ1BhZ2UgbmFtZTonLCBwYWdlLnRpdGxlKTtcbiAgICAgICAgICBpZiAodD8udHJpbSgpKSByZW5hbWVQYWdlKHBhZ2UuaWQsIHQudHJpbSgpKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Db250ZXh0TWVudT17ZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHByb21wdCgncmVuYW1lIC8gZGVsZXRlIC8gc3VicGFnZSAvIG1vdmUnLCAncmVuYW1lJyk7XG4gICAgICAgICAgaWYgKCFhY3Rpb24pIHJldHVybjtcbiAgICAgICAgICBpZiAoYWN0aW9uID09PSAncmVuYW1lJykgeyBjb25zdCB0ID0gcHJvbXB0KCdOYW1lOicsIHBhZ2UudGl0bGUpOyBpZiAodD8udHJpbSgpKSByZW5hbWVQYWdlKHBhZ2UuaWQsIHQudHJpbSgpKTsgfVxuICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2RlbGV0ZScpIGRlbGV0ZVBhZ2VXaXRoQ2hpbGRyZW4ocGFnZSk7XG4gICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc3VicGFnZScpIGFkZFBhZ2UocGFnZS5pZCk7XG4gICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSAnbW92ZScpIHtcbiAgICAgICAgICAgIGNvbnN0IG5iID0gYXBwU3RhdGUudmFsdWUubm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSBhcHBTdGF0ZS52YWx1ZS51aS5ub3RlYm9va0lkKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSBuYj8uc2VjdGlvbnMubWFwKHMgPT4gYCR7cy5pZH06ICR7cy50aXRsZX1gKS5qb2luKCdcXG4nKSA/PyAnJztcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gcHJvbXB0KCdUYXJnZXQgc2VjdGlvbiBJRDpcXG4nICsgb3B0cyk7XG4gICAgICAgICAgICBpZiAoaW5wdXQpIG1vdmVQYWdlKHBhZ2UuaWQsIGlucHV0LnNwbGl0KCc6JylbMF0udHJpbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCJwYWdlLWV4cGFuZFwiXG4gICAgICAgICAgc3R5bGU9e3sgdmlzaWJpbGl0eTogaGFzS2lkcyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH19XG4gICAgICAgICAgb25DbGljaz17ZSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldE9wZW4obyA9PiAhbyk7IH19XG4gICAgICAgID57b3BlbiA/ICfilr4nIDogJ+KWuCd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBhZ2UtdGl0bGUtdGV4dFwiPntwYWdlLnRpdGxlfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAge2hhc0tpZHMgJiYgb3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdWJwYWdlc1wiPlxuICAgICAgICAgIHtwYWdlLmNoaWxkcmVuLm1hcChjID0+IChcbiAgICAgICAgICAgIDxQYWdlSXRlbSBrZXk9e2MuaWR9IHBhZ2U9e2N9IGFjdGl2ZUlkPXthY3RpdmVJZH0gZGVwdGg9e2RlcHRoICsgMX0gZHJhZ1N0YXRlPXtkcmFnU3RhdGV9IG9uRHJhZ0NoYW5nZT17b25EcmFnQ2hhbmdlfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQYWdlc1BhbmVsKCkge1xuICBjb25zdCB7IG5vdGVib29rcywgdWkgfSA9IGFwcFN0YXRlLnZhbHVlO1xuICBjb25zdCBuYiAgPSBub3RlYm9va3MuZmluZChuID0+IG4uaWQgPT09IHVpLm5vdGVib29rSWQpO1xuICBjb25zdCBzZWMgPSBuYj8uc2VjdGlvbnMuZmluZChzID0+IHMuaWQgPT09IHVpLnNlY3Rpb25JZCk7XG4gIGNvbnN0IHBhZ2VzID0gc2VjPy5wYWdlcyA/PyBbXTtcblxuICBjb25zdCBbZHJhZ092ZXIsIHNldERyYWdPdmVyXSA9IHVzZVN0YXRlKHsgaWQ6IG51bGwsIG1vZGU6IG51bGwgfSk7XG5cbiAgZnVuY3Rpb24gb25EcmFnQ2hhbmdlKGlkLCBtb2RlKSB7IHNldERyYWdPdmVyKHsgaWQsIG1vZGUgfSk7IH1cblxuICBjb25zdCBkcmFnU3RhdGUgPSB7IG92ZXI6IGRyYWdPdmVyLmlkLCBtb2RlOiBkcmFnT3Zlci5tb2RlIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkPVwicGFnZXMtcGFuZWxcIiBjbGFzcz1cInBhbmVsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtbGFiZWxcIj5QYWdlczwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxpc3RcIj5cbiAgICAgICAge3BhZ2VzLm1hcChwZyA9PiAoXG4gICAgICAgICAgPFBhZ2VJdGVtIGtleT17cGcuaWR9IHBhZ2U9e3BnfSBhY3RpdmVJZD17dWkucGFnZUlkfSBkcmFnU3RhdGU9e2RyYWdTdGF0ZX0gb25EcmFnQ2hhbmdlPXtvbkRyYWdDaGFuZ2V9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtYnRuXCIgb25DbGljaz17KCkgPT4gYWRkUGFnZSgpfT4rIFBhZ2U8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IEJsb2NrIH0gZnJvbSAnLi9CbG9jay5qc3gnO1xuaW1wb3J0IHsgYXBwU3RhdGUsIGFkZEJsb2NrLCBkZWxldGVCbG9jaywgdXBkYXRlQmxvY2tQb3MsIHVwZGF0ZUJsb2NrV2lkdGgsIHVwZGF0ZVBhZ2VWaWV3LCB1cGRhdGVQYWdlVGl0bGUsIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gsIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvLCBhcHBseVVuZG8sIGFwcGx5UmVkbyB9IGZyb20gJy4vdW5kby5qcyc7XG5pbXBvcnQgeyBleGVjRm10IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuXG5leHBvcnQgY29uc3QgQ2FudmFzQ3R4ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuLy8g4pSA4pSA4pSAIEZvcm1hdFRvb2xiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIEZvcm1hdFRvb2xiYXIoKSB7XG4gIGNvbnN0IGJ0bnMgPSBbXG4gICAgeyBjbWQ6ICdib2xkJywgICAgICAgICAgbm9kZTogPGI+QjwvYj4sICAgdGl0bGU6ICdCb2xkJyB9LFxuICAgIHsgY21kOiAnaXRhbGljJywgICAgICAgIG5vZGU6IDxpPkk8L2k+LCAgIHRpdGxlOiAnSXRhbGljJyB9LFxuICAgIHsgY21kOiAndW5kZXJsaW5lJywgICAgIG5vZGU6IDx1PlU8L3U+LCAgIHRpdGxlOiAnVW5kZXJsaW5lJyB9LFxuICAgIHsgY21kOiAnc3RyaWtldGhyb3VnaCcsIG5vZGU6IDxzPlM8L3M+LCAgIHRpdGxlOiAnU3RyaWtldGhyb3VnaCcgfSxcbiAgICBudWxsLFxuICAgIHsgY21kOiAnaDEnLCBub2RlOiAnSDEnLCB0aXRsZTogJ0hlYWRpbmcgMScgfSxcbiAgICB7IGNtZDogJ2gyJywgbm9kZTogJ0gyJywgdGl0bGU6ICdIZWFkaW5nIDInIH0sXG4gICAgeyBjbWQ6ICdoMycsIG5vZGU6ICdIMycsIHRpdGxlOiAnSGVhZGluZyAzJyB9LFxuICAgIHsgY21kOiAnaDQnLCBub2RlOiAnSDQnLCB0aXRsZTogJ0hlYWRpbmcgNCcgfSxcbiAgICB7IGNtZDogJ3AnLCAgbm9kZTogJ1AnLCAgdGl0bGU6ICdQYXJhZ3JhcGgnIH0sXG4gICAgbnVsbCxcbiAgICB7IGNtZDogJ3VsJywgbm9kZTogJ+KAoiBMaXN0JywgdGl0bGU6ICdCdWxsZXQgbGlzdCcgfSxcbiAgICB7IGNtZDogJ29sJywgbm9kZTogJzEuIExpc3QnLCB0aXRsZTogJ051bWJlcmVkIGxpc3QnIH0sXG4gICAgeyBjbWQ6ICdsaW5rJywgbm9kZTogJ+KMmEsnLCB0aXRsZTogJ0luc2VydCBsaW5rJyB9LFxuICBdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJmb3JtYXQtdG9vbGJhclwiPlxuICAgICAge2J0bnMubWFwKChiLCBpKSA9PiBiID09PSBudWxsXG4gICAgICAgID8gPHNwYW4ga2V5PXtpfSBjbGFzcz1cImZtdC1zZXBcIiAvPlxuICAgICAgICA6IDxidXR0b24ga2V5PXtiLmNtZH0gY2xhc3M9XCJmbXQtYnRuXCIgdGl0bGU9e2IudGl0bGV9IG9uTW91c2VEb3duPXtlID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBleGVjRm10KGIuY21kKTsgfX0+e2Iubm9kZX08L2J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8c3BhbiBjbGFzcz1cImNhbnZhcy1oaW50XCI+Q2xpY2sgdG8gYWRkIGJsb2NrIMK3IFNwYWNlK2RyYWcgdG8gcGFuIMK3IEN0cmwrc2Nyb2xsIHpvb208L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBQYWdlVGl0bGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFBhZ2VUaXRsZSh7IHBhZ2UsIG9uRW50ZXIgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlZi5jdXJyZW50ICYmICFlZGl0aW5nLmN1cnJlbnQpIHJlZi5jdXJyZW50LnRleHRDb250ZW50ID0gcGFnZT8udGl0bGUgPz8gJyc7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGlmICghcGFnZSkgcmV0dXJuIDxkaXYgaWQ9XCJwYWdlLXRpdGxlLWJhclwiIC8+O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInBhZ2UtdGl0bGUtYmFyXCIgb25DbGljaz17KCkgPT4gcmVmLmN1cnJlbnQ/LmZvY3VzKCl9PlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgaWQ9XCJwYWdlLXRpdGxlXCJcbiAgICAgICAgY29udGVudEVkaXRhYmxlXG4gICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICBvbkZvY3VzPXsoKSA9PiB7IGVkaXRpbmcuY3VycmVudCA9IHRydWU7IH19XG4gICAgICAgIG9uQmx1cj17ZSA9PiB7XG4gICAgICAgICAgZWRpdGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC50ZXh0Q29udGVudC50cmltKCkgfHwgJ1VudGl0bGVkIFBhZ2UnO1xuICAgICAgICAgIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gocGFnZS5pZCwgdGl0bGUpO1xuICAgICAgICB9fVxuICAgICAgICBvbktleURvd249e2UgPT4geyBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBvbkVudGVyPy4oKTsgfSB9fVxuICAgICAgICBvbklucHV0PXtlID0+IHsgdXBkYXRlUGFnZVRpdGxlKHBhZ2UuaWQsIGUudGFyZ2V0LnRleHRDb250ZW50KTsgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBDYW52YXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBDYW52YXMoeyBwYWdlIH0pIHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpbm5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgbWFycXVlZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgdmlld1JlZiA9IHVzZVJlZih7IHBhblg6IDAsIHBhblk6IDAsIHpvb206IDEgfSk7XG4gIGNvbnN0IHNwYWNlSGVsZCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gU2VsZWN0ZWQgYmxvY2sgSURzIOKAlCBzdG9yZWQgaW4gc3RhdGUgc28gYmxvY2tzIHJlLXJlbmRlciB3aXRoIHNlbGVjdGlvbiBzdHlsZVxuICBjb25zdCBbc2VsZWN0ZWRJZHMsIHNldFNlbGVjdGVkSWRzXSA9IHVzZVN0YXRlKG5ldyBTZXQoKSk7XG4gIGNvbnN0IHNlbGVjdGVkUmVmID0gdXNlUmVmKHNlbGVjdGVkSWRzKTtcblxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZChpZHMpIHtcbiAgICBzZWxlY3RlZFJlZi5jdXJyZW50ID0gaWRzO1xuICAgIHNldFNlbGVjdGVkSWRzKG5ldyBTZXQoaWRzKSk7XG4gIH1cblxuICAvLyBTeW5jIHZpZXcgd2hlbiBwYWdlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICB2aWV3UmVmLmN1cnJlbnQgPSB7IHBhblg6IHBhZ2UucGFuWCA/PyAwLCBwYW5ZOiBwYWdlLnBhblkgPz8gMCwgem9vbTogcGFnZS56b29tID8/IDEgfTtcbiAgICBhcHBseVRyYW5zZm9ybSgpO1xuICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIGlmICghaW5uZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGlubmVyUmVmLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkey1wYW5YICogem9vbX1weCwgJHstcGFuWSAqIHpvb219cHgpIHNjYWxlKCR7em9vbX0pYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ2FudmFzKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgeDogKGNsaWVudFggLSByZWN0LmxlZnQpIC8gem9vbSArIHBhblgsIHk6IChjbGllbnRZIC0gcmVjdC50b3ApIC8gem9vbSArIHBhblkgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU2NyZWVuKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHsgeDogY2xpZW50WCAtIHJlY3QubGVmdCwgeTogY2xpZW50WSAtIHJlY3QudG9wIH07XG4gIH1cblxuICAvLyDilIDilIAgQmxvY2sgZHJhZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBvbkJsb2NrRHJhZ1N0YXJ0ID0gdXNlQ2FsbGJhY2soKGUsIGJsb2NrSWQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuXG4gICAgLy8gRGVmYXVsdCBibG9jayBjYW5ub3QgYmUgbW92ZWRcbiAgICBpZiAocGcuZGVmYXVsdEJsb2NrSWQgPT09IGJsb2NrSWQpIHJldHVybjtcblxuICAgIGlmICghc2VsZWN0ZWRSZWYuY3VycmVudC5oYXMoYmxvY2tJZCkpIHtcbiAgICAgIGlmICghZS5zaGlmdEtleSkgc2V0U2VsZWN0ZWQobmV3IFNldChbYmxvY2tJZF0pKTtcbiAgICAgIGVsc2Ugc2V0U2VsZWN0ZWQobmV3IFNldChbLi4uc2VsZWN0ZWRSZWYuY3VycmVudCwgYmxvY2tJZF0pKTtcbiAgICB9XG5cbiAgICBwdXNoVW5kbyhwZyk7XG5cbiAgICBjb25zdCBpZHMgPSBzZWxlY3RlZFJlZi5jdXJyZW50LmhhcyhibG9ja0lkKVxuICAgICAgPyBbLi4uc2VsZWN0ZWRSZWYuY3VycmVudF1cbiAgICAgIDogW2Jsb2NrSWRdO1xuXG4gICAgLy8gU25hcHNob3Qgb3JpZ2luYWwgcG9zaXRpb25zIGZyb20gRE9NXG4gICAgY29uc3Qgb3JpZ1BvcyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7aWR9XCJdYCk7XG4gICAgICBpZiAoZWwpIG9yaWdQb3Muc2V0KGlkLCB7IHg6IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCB5OiBwYXJzZUludChlbC5zdHlsZS50b3ApIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WCwgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHsgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBkeSA9IChlMi5jbGllbnRZIC0gc3RhcnRZKSAvIHpvb207XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgb3JpZ10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBvcmlnLnggKyBkeCkgKyAncHgnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBvcmlnLnkgKyBkeSkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgX10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIHVwZGF0ZUJsb2NrUG9zKGlkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgQmxvY2sgcmVzaXplIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uQmxvY2tSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2Jsb2NrSWR9XCJdYCk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdXID0gcGFyc2VJbnQoZWwuc3R5bGUud2lkdGgpIHx8IDQ4MDtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdmUoZTIpIHtcbiAgICAgIGNvbnN0IGR4ID0gKGUyLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IE1hdGgubWF4KDEyMCwgb3JpZ1cgKyBkeCkgKyAncHgnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblVwKCkge1xuICAgICAgdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS53aWR0aCkpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfSwgW10pO1xuXG4gIC8vIOKUgOKUgCBJbWFnZSByZXNpemUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3Qgb25JbWdSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkLCBkaXIpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7YmxvY2tJZH1cIl1gKTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgY29uc3Qgb3JpZ1cgPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBvcmlnWCA9IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpO1xuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSAoZTIuY2xpZW50WCAtIHN0YXJ0WCkgLyB2aWV3UmVmLmN1cnJlbnQuem9vbTtcbiAgICAgIGNvbnN0IG5ld1cgPSBNYXRoLm1heCg0MCwgb3JpZ1cgKyAoZGlyLmluY2x1ZGVzKCdlJykgPyBkeCA6IC1keCkpO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBuZXdXICsgJ3B4JztcbiAgICAgIGlmIChkaXIuaW5jbHVkZXMoJ3cnKSkgZWwuc3R5bGUubGVmdCA9IChvcmlnWCAtIChuZXdXIC0gb3JpZ1cpKSArICdweCc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICB1cGRhdGVCbG9ja1dpZHRoKGJsb2NrSWQsIHBhcnNlSW50KGVsLnN0eWxlLndpZHRoKSk7XG4gICAgICB1cGRhdGVCbG9ja1BvcyhibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIFBhbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzdGFydFBhbihzdGFydFgsIHN0YXJ0WSkge1xuICAgIGNvbnN0IG9yaWdQYW4gPSB7IC4uLnZpZXdSZWYuY3VycmVudCB9O1xuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICBjb25zdCBkeCA9IChlLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBjb25zdCBkeSA9IChlLmNsaWVudFkgLSBzdGFydFkpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICB2aWV3UmVmLmN1cnJlbnQucGFuWCA9IE1hdGgubWF4KDAsIG9yaWdQYW4ucGFuWCAtIGR4KTtcbiAgICAgIHZpZXdSZWYuY3VycmVudC5wYW5ZID0gTWF0aC5tYXgoMCwgb3JpZ1Bhbi5wYW5ZIC0gZHkpO1xuICAgICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIHVwZGF0ZVBhZ2VWaWV3KHZpZXdSZWYuY3VycmVudC5wYW5YLCB2aWV3UmVmLmN1cnJlbnQucGFuWSwgdmlld1JlZi5jdXJyZW50Lnpvb20pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBNYXJxdWVlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHN0YXJ0TWFycXVlZShzdGFydENsaWVudFgsIHN0YXJ0Q2xpZW50WSkge1xuICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gdG9TY3JlZW4oc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuICAgIGNvbnN0IHN0YXJ0Q2FudmFzID0gdG9DYW52YXMoc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuXG4gICAgY29uc3QgbXEgPSBtYXJxdWVlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1xKSB7IG1xLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBtcS5zdHlsZS5jc3NUZXh0ICs9ICc7IGxlZnQ6MDt0b3A6MDt3aWR0aDowO2hlaWdodDowJzsgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUpIHtcbiAgICAgIGNvbnN0IGN1ciA9IHRvU2NyZWVuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihzdGFydFNjcmVlbi54LCBjdXIueCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5taW4oc3RhcnRTY3JlZW4ueSwgY3VyLnkpO1xuICAgICAgY29uc3QgdyA9IE1hdGguYWJzKGN1ci54IC0gc3RhcnRTY3JlZW4ueCk7XG4gICAgICBjb25zdCBoID0gTWF0aC5hYnMoY3VyLnkgLSBzdGFydFNjcmVlbi55KTtcbiAgICAgIGlmIChtcSkgeyBtcS5zdHlsZS5sZWZ0ID0geCsncHgnOyBtcS5zdHlsZS50b3AgPSB5KydweCc7IG1xLnN0eWxlLndpZHRoID0gdysncHgnOyBtcS5zdHlsZS5oZWlnaHQgPSBoKydweCc7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUpIHtcbiAgICAgIGlmIChtcSkgbXEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnN0IGVuZENhbnZhcyA9IHRvQ2FudmFzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oc3RhcnRDYW52YXMueCwgZW5kQ2FudmFzLngpO1xuICAgICAgY29uc3QgcnkgPSBNYXRoLm1pbihzdGFydENhbnZhcy55LCBlbmRDYW52YXMueSk7XG4gICAgICBjb25zdCBydyA9IE1hdGguYWJzKGVuZENhbnZhcy54IC0gc3RhcnRDYW52YXMueCk7XG4gICAgICBjb25zdCByaCA9IE1hdGguYWJzKGVuZENhbnZhcy55IC0gc3RhcnRDYW52YXMueSk7XG5cbiAgICAgIGlmIChydyA+IDQgfHwgcmggPiA0KSB7XG4gICAgICAgIGNvbnN0IGhpdHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ4ID0gcGFyc2VJbnQoZWwuc3R5bGUubGVmdCksIGJ5ID0gcGFyc2VJbnQoZWwuc3R5bGUudG9wKTtcbiAgICAgICAgICBjb25zdCBidyA9IGVsLm9mZnNldFdpZHRoLCBiaCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBpZiAoYnggPCByeCtydyAmJiBieCtidyA+IHJ4ICYmIGJ5IDwgcnkrcmggJiYgYnkrYmggPiByeSkgaGl0cy5hZGQoZWwuZGF0YXNldC5ibG9ja0lkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFNlbGVjdGVkKGhpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIENhbnZhcyBwb2ludGVyIGRvd24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9pbnRlckRvd24oZSkge1xuICAgIC8vIE1pZGRsZSBidXR0b24gb3Igc3BhY2UgaGVsZCDihpIgcGFuXG4gICAgaWYgKGUuYnV0dG9uID09PSAxIHx8IChlLmJ1dHRvbiA9PT0gMCAmJiBzcGFjZUhlbGQuY3VycmVudCkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN0YXJ0UGFuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG5cbiAgICAvLyBMZWZ0IGNsaWNrIG9uIGVtcHR5IGNhbnZhcyDigJQgbWlnaHQgYmUgbWFycXVlZSBvciBjcmVhdGUtYmxvY2tcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYLCBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG4gICAgbGV0IG1hcnF1ZWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSBlMi5jbGllbnRYIC0gc3RhcnRYLCBkeSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBpZiAoIW1vdmVkICYmIE1hdGguc3FydChkeCpkeCArIGR5KmR5KSA+IDQpIHtcbiAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICBtYXJxdWVlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRNYXJxdWVlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICAgIGlmICghbWFycXVlZUFjdGl2ZSkge1xuICAgICAgICAvLyBDbGVhbiBzaW5nbGUgY2xpY2sg4oaSIGNyZWF0ZSBibG9ja1xuICAgICAgICBzZXRTZWxlY3RlZChuZXcgU2V0KCkpO1xuICAgICAgICBjb25zdCBwb3MgPSB0b0NhbnZhcyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgIGFkZEJsb2NrKHBvcy54LCBwb3MueSk7XG4gICAgICAgIC8vIEZvY3VzIHRoZSBuZXcgYmxvY2sgYWZ0ZXIgUHJlYWN0IHJlbmRlcnMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gcGcuYmxvY2tzW3BnLmJsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoIWxhc3RCbG9jaykgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2xhc3RCbG9jay5pZH1cIl0gLmJsb2NrLWNvbnRlbnRgKTtcbiAgICAgICAgICBlbD8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFdoZWVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBteSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY3ggPSBteCAvIHpvb20gKyBwYW5YLCBjeSA9IG15IC8gem9vbSArIHBhblk7XG4gICAgICBjb25zdCBueiA9IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgem9vbSAqIGZhY3RvcikpO1xuICAgICAgdmlld1JlZi5jdXJyZW50ID0geyBwYW5YOiBNYXRoLm1heCgwLCBjeCAtIG14L256KSwgcGFuWTogTWF0aC5tYXgoMCwgY3kgLSBteS9ueiksIHpvb206IG56IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYuY3VycmVudCA9IHsgcGFuWDogTWF0aC5tYXgoMCwgcGFuWCArIGUuZGVsdGFYL3pvb20pLCBwYW5ZOiBNYXRoLm1heCgwLCBwYW5ZICsgZS5kZWx0YVkvem9vbSksIHpvb20gfTtcbiAgICB9XG4gICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTcGFjZSBrZXkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgICAgfVxuICAgICAgLy8gRGVsZXRlIHNlbGVjdGVkIGJsb2Nrc1xuICAgICAgaWYgKChlLmtleSA9PT0gJ0RlbGV0ZScgfHwgZS5rZXkgPT09ICdCYWNrc3BhY2UnKSAmJiBzZWxlY3RlZFJlZi5jdXJyZW50LnNpemUgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgICAgICBjb25zdCBkZWZhdWx0SWQgPSBwZz8uZGVmYXVsdEJsb2NrSWQ7XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGlmIChpZCAhPT0gZGVmYXVsdElkKSBkZWxldGVCbG9jayhpZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cbiAgICAgIC8vIFVuZG8vcmVkb1xuICAgICAgY29uc3QgbW9kID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6JyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnNoaWZ0S2V5ID8gZG9SZWRvKCkgOiBkb1VuZG8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlVcChlKSB7XG4gICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgIHNwYWNlSGVsZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgcmV0dXJuICgpID0+IHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7IH07XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgVW5kby9SZWRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRvVW5kbygpIHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgY29uc3QgYmxvY2tzID0gYXBwbHlVbmRvKHBnKTtcbiAgICBpZiAoIWJsb2NrcykgcmV0dXJuO1xuICAgIHBnLmJsb2NrcyA9IGJsb2NrcztcbiAgICAvLyBGb3JjZSBQcmVhY3QgcmUtcmVuZGVyIG9mIGJsb2Nrc1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9SZWRvKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGcpIHJldHVybjtcbiAgICBjb25zdCBibG9ja3MgPSBhcHBseVJlZG8ocGcpO1xuICAgIGlmICghYmxvY2tzKSByZXR1cm47XG4gICAgcGcuYmxvY2tzID0gYmxvY2tzO1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEltYWdlIGRyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVzID0gWy4uLmUuZGF0YVRyYW5zZmVyLmZpbGVzXS5maWx0ZXIoZiA9PiBmLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpO1xuICAgIGlmICghZmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gdG9DYW52YXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgaWYgKCFwZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBibGsgPSB7IGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB4OiBwb3MueCArIGkqMjAsIHk6IHBvcy55ICsgaSoyMCwgdzogMzAwLCBodG1sOiAnJywgdHlwZTogJ2ltYWdlJywgc3JjOiBldi50YXJnZXQucmVzdWx0IH07XG4gICAgICAgIHBnLmJsb2NrcyA9IFsuLi5wZy5ibG9ja3MsIGJsa107XG4gICAgICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgICB1cGRhdGVCbG9ja1BvcyhibGsuaWQsIGJsay54LCBibGsueSk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIAgQ29udGV4dCBmb3IgYmxvY2tzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGZvY3VzRGVmYXVsdEJsb2NrKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGc/LmRlZmF1bHRCbG9ja0lkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7cGcuZGVmYXVsdEJsb2NrSWR9XCJdIC5ibG9jay1jb250ZW50YCk7XG4gICAgZWw/LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdCBjdHggPSB7XG4gICAgc2VsZWN0ZWRJZHMsXG4gICAgb25CbG9ja0RyYWdTdGFydCxcbiAgICBvbkJsb2NrUmVzaXplU3RhcnQsXG4gICAgb25JbWdSZXNpemVTdGFydCxcbiAgICBvbkJsb2NrRm9jdXM6IChpZCkgPT4ge30sXG4gICAgb25CbG9ja0JsdXI6IChpZCkgPT4ge30sXG4gICAgdW5kbzogZG9VbmRvLFxuICAgIHJlZG86IGRvUmVkbyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Rm9ybWF0VG9vbGJhciAvPlxuICAgICAgPFBhZ2VUaXRsZSBwYWdlPXtwYWdlfSBvbkVudGVyPXtmb2N1c0RlZmF1bHRCbG9ja30gLz5cbiAgICAgIDxDYW52YXNDdHguUHJvdmlkZXIgdmFsdWU9e2N0eH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgICAgICBpZD1cImNhbnZhcy1jb250YWluZXJcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgICAgIG9uV2hlZWw9e2hhbmRsZVdoZWVsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4geyBpZiAoZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoJ0ZpbGVzJykpIGUucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bWFycXVlZVJlZn0gaWQ9XCJtYXJxdWVlLXJlY3RcIiAvPlxuICAgICAgICAgIDxkaXYgcmVmPXtpbm5lclJlZn0gaWQ9XCJjYW52YXMtaW5uZXJcIiBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnIH19PlxuICAgICAgICAgICAge3BhZ2U/LmJsb2Nrcy5tYXAoYiA9PiA8QmxvY2sga2V5PXtiLmlkfSBibG9jaz17Yn0gcGFnZT17cGFnZX0gLz4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FudmFzQ3R4LlByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgQ2FudmFzQ3R4IH0gZnJvbSAnLi9DYW52YXMuanN4JztcbmltcG9ydCB7IHVwZGF0ZUJsb2NrSHRtbCwgdXBkYXRlQmxvY2tUeXBlLCBkZWxldGVCbG9jaywgZ2V0QWN0aXZlUGFnZSB9IGZyb20gJy4vc3RvcmUuanMnO1xuaW1wb3J0IHsgb25CbG9ja0tleURvd24sIGhhbmRsZU1hcmtkb3duSW5wdXQgfSBmcm9tICcuL2VkaXRvci5qcyc7XG5pbXBvcnQgeyBwdXNoVW5kbyB9IGZyb20gJy4vdW5kby5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBCbG9jayh7IGJsb2NrLCBwYWdlIH0pIHtcbiAgY29uc3QgY3R4ID0gdXNlQ29udGV4dChDYW52YXNDdHgpO1xuICBjb25zdCBjb250ZW50UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpc0RlZmF1bHQgPSBibG9jay5pZCA9PT0gcGFnZS5kZWZhdWx0QmxvY2tJZDtcbiAgY29uc3QgaXNJbWFnZSAgID0gYmxvY2sudHlwZSA9PT0gJ2ltYWdlJztcbiAgY29uc3QgaXNTZWxlY3RlZCA9IGN0eC5zZWxlY3RlZElkcy5oYXMoYmxvY2suaWQpO1xuXG4gIC8vIFN5bmMgY29udGVudCB3aGVuIGJsb2NrLmh0bWwgY2hhbmdlcyBleHRlcm5hbGx5ICh1bmRvL3BhZ2Utc3dpdGNoKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgIGlmIChlbCAmJiBlbC5pbm5lckhUTUwgIT09IGJsb2NrLmh0bWwpIGVsLmlubmVySFRNTCA9IGJsb2NrLmh0bWw7XG4gIH0sIFtibG9jay5odG1sXSk7XG5cbiAgLy8gRGVib3VuY2VkIHVuZG8gcHVzaCB3aGlsZSB0eXBpbmdcbiAgY29uc3QgdW5kb1RpbWVyID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcblxuICAgIC8vIFRyeSBtYXJrZG93biBzaG9ydGN1dHMg4oCUIHJldHVybnMgJ2NvZGUnIGlmIGJsb2NrIGNvbnZlcnRlZFxuICAgIGNvbnN0IHJlc3VsdCA9IGhhbmRsZU1hcmtkb3duSW5wdXQoZWwpO1xuICAgIGlmIChyZXN1bHQgPT09ICdjb2RlJykgdXBkYXRlQmxvY2tUeXBlKGJsb2NrLmlkLCAnY29kZScpO1xuXG4gICAgLy8gU2F2ZSBIVE1MIHRvIHN0b3JlIChzaWxlbnQpXG4gICAgdXBkYXRlQmxvY2tIdG1sKGJsb2NrLmlkLCBlbC5pbm5lckhUTUwpO1xuXG4gICAgLy8gRGVib3VuY2VkIHVuZG8gc25hcHNob3Qgd2hpbGUgdHlwaW5nIChldmVyeSB+MS41IHMgb2YgaW5hY3Rpdml0eSlcbiAgICBjbGVhclRpbWVvdXQodW5kb1RpbWVyLmN1cnJlbnQpO1xuICAgIHVuZG9UaW1lci5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgIH0sIDE1MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgIGNvbnN0IG1vZCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG5cbiAgICAvLyBVbmRvIC8gcmVkb1xuICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zaGlmdEtleSA/IGN0eC5yZWRvKCkgOiBjdHgudW5kbygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uQmxvY2tLZXlEb3duKGUsIGNvbnRlbnRSZWYuY3VycmVudCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRm9jdXMgPSAoKSA9PiB7XG4gICAgLy8gU25hcHNob3QgdW5kbyBzdGF0ZSB3aGVuIHVzZXIgZW50ZXJzIHRoZSBibG9ja1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgIGN0eC5vbkJsb2NrRm9jdXM/LihibG9jay5pZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQmx1ciA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodW5kb1RpbWVyLmN1cnJlbnQpO1xuICAgIGNvbnN0IGVsID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcblxuICAgIGNvbnN0IGh0bWwgPSBlbC5pbm5lckhUTUw7XG4gICAgY29uc3QgaXNFbXB0eSA9ICFodG1sIHx8IGh0bWwgPT09ICc8YnI+JyB8fCBodG1sLnRyaW0oKSA9PT0gJyc7XG5cbiAgICBpZiAoaXNFbXB0eSAmJiAhaXNEZWZhdWx0KSB7XG4gICAgICAvLyBBdXRvLWRlbGV0ZSBlbXB0eSBub24tZGVmYXVsdCBibG9ja3NcbiAgICAgIGRlbGV0ZUJsb2NrKGJsb2NrLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQmxvY2tIdG1sKGJsb2NrLmlkLCBodG1sKTtcbiAgICB9XG4gICAgY3R4Lm9uQmxvY2tCbHVyPy4oYmxvY2suaWQpO1xuICB9O1xuXG4gIC8vIENsaWNraW5nIGFueXdoZXJlIG9uIHRoZSBibG9jayAob3V0c2lkZSBjb250ZW50KSBzdGFydHMgYSBkcmFnL3NlbGVjdFxuICAvLyBhbmQgY3J1Y2lhbGx5IFNUT1BTIHByb3BhZ2F0aW9uIHNvIGNhbnZhcyBkb2Vzbid0IGNyZWF0ZSBhIG5ldyBibG9ja1xuICBjb25zdCBoYW5kbGVCbG9ja1BvaW50ZXJEb3duID0gKGUpID0+IHtcbiAgICAvLyBBbHdheXMgc3RvcCBwcm9wYWdhdGlvbiDigJQgbm8gY2FudmFzIGFjdGlvbnMgc2hvdWxkIGZpcmUgZnJvbSBibG9jayBpbnRlcmFjdGlvbnNcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gSWYgY2xpY2sgbGFuZHMgb3V0c2lkZSBjb250ZW50L2hhbmRsZXMsIGluaXRpYXRlIGRyYWcrc2VsZWN0XG4gICAgY29uc3Qgb25Db250ZW50ID0gZS50YXJnZXQuY2xvc2VzdCgnLmJsb2NrLWNvbnRlbnQsIC5ibG9jay1oYW5kbGUsIC5ibG9jay1yZXNpemUsIC5pbWctcmVzaXplLCAuYmxvY2stZHJhZy1vdmVybGF5Jyk7XG4gICAgaWYgKCFvbkNvbnRlbnQpIHtcbiAgICAgIGN0eC5vbkJsb2NrRHJhZ1N0YXJ0KGUsIGJsb2NrLmlkKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzcz17WydibG9jaycsIGlzRGVmYXVsdCAmJiAnYmxvY2stLWRlZmF1bHQnLCBpc0ltYWdlICYmICdibG9jay0taW1hZ2UnLCBpc1NlbGVjdGVkICYmICdibG9jay0tc2VsZWN0ZWQnXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpfVxuICAgICAgZGF0YS1ibG9jay1pZD17YmxvY2suaWR9XG4gICAgICBzdHlsZT17eyBsZWZ0OiBibG9jay54ICsgJ3B4JywgdG9wOiBibG9jay55ICsgJ3B4Jywgd2lkdGg6IGJsb2NrLncgKyAncHgnIH19XG4gICAgICBvblBvaW50ZXJEb3duPXtoYW5kbGVCbG9ja1BvaW50ZXJEb3dufVxuICAgID5cbiAgICAgIHsvKiBEcmFnIGhhbmRsZSDigJQgaGlkZGVuIGZvciBkZWZhdWx0IGJsb2NrIGFuZCBpbWFnZSBibG9ja3MgKi99XG4gICAgICB7IWlzRGVmYXVsdCAmJiAhaXNJbWFnZSAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImJsb2NrLWhhbmRsZVwiXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uQmxvY2tEcmFnU3RhcnQoZSwgYmxvY2suaWQpOyB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIFJlc2l6ZSBoYW5kbGUg4oCUIHRvcC1yaWdodCwgd2lkdGggb25seSwgaGlkZGVuIGZvciBpbWFnZSBibG9ja3MgKi99XG4gICAgICB7IWlzSW1hZ2UgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJibG9jay1yZXNpemVcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkJsb2NrUmVzaXplU3RhcnQoZSwgYmxvY2suaWQpOyB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAge2lzSW1hZ2UgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGltZyBzcmM9e2Jsb2NrLnNyYyB8fCAnJ30gZHJhZ2dhYmxlPXtmYWxzZX0gc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgZGlzcGxheTogJ2Jsb2NrJyB9fSAvPlxuICAgICAgICAgIHtbJ253JywgJ25lJywgJ3N3JywgJ3NlJ10ubWFwKGRpciA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGtleT17ZGlyfVxuICAgICAgICAgICAgICBjbGFzcz17YGltZy1yZXNpemUgaW1nLXJlc2l6ZS0tJHtkaXJ9YH1cbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uSW1nUmVzaXplU3RhcnQoZSwgYmxvY2suaWQsIGRpcik7IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYmxvY2stZHJhZy1vdmVybGF5XCJcbiAgICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkJsb2NrRHJhZ1N0YXJ0KGUsIGJsb2NrLmlkKTsgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRlbnRSZWZ9XG4gICAgICAgICAgY2xhc3M9e1snYmxvY2stY29udGVudCcsIGJsb2NrLnR5cGUgPT09ICdjb2RlJyAmJiAnY29kZS1ibG9jayddLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICAgICAgY29udGVudEVkaXRhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgZGF0YS1wbGFjZWhvbGRlcj1cIlN0YXJ0IHR5cGluZ+KAplwiXG4gICAgICAgICAgZGF0YS1jb2RlPXtibG9jay50eXBlID09PSAnY29kZScgPyAnMScgOiB1bmRlZmluZWR9XG4gICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgIG9uSW5wdXQ9e2hhbmRsZUlucHV0fVxuICAgICAgICAgIG9uRm9jdXM9e2hhbmRsZUZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17aGFuZGxlQmx1cn1cbiAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmdcbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLAogICJpbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5pbXBvcnQgeyBDYW52YXNDdHggfSBmcm9tICcuL0NhbnZhcy5qc3gnO1xuaW1wb3J0IHsgdXBkYXRlQmxvY2tIdG1sLCB1cGRhdGVCbG9ja1R5cGUsIGRlbGV0ZUJsb2NrLCBnZXRBY3RpdmVQYWdlIH0gZnJvbSAnLi9zdG9yZS5qcyc7XG5pbXBvcnQgeyBvbkJsb2NrS2V5RG93biwgaGFuZGxlTWFya2Rvd25JbnB1dCB9IGZyb20gJy4vZWRpdG9yLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvIH0gZnJvbSAnLi91bmRvLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJsb2NrKHsgYmxvY2ssIHBhZ2UgfSkge1xuICBjb25zdCBjdHggPSB1c2VDb250ZXh0KENhbnZhc0N0eCk7XG4gIGNvbnN0IGNvbnRlbnRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGlzRGVmYXVsdCA9IGJsb2NrLmlkID09PSBwYWdlLmRlZmF1bHRCbG9ja0lkO1xuICBjb25zdCBpc0ltYWdlICAgPSBibG9jay50eXBlID09PSAnaW1hZ2UnO1xuICBjb25zdCBpc1NlbGVjdGVkID0gY3R4LnNlbGVjdGVkSWRzLmhhcyhibG9jay5pZCk7XG5cbiAgLy8gU3luYyBjb250ZW50IHdoZW4gYmxvY2suaHRtbCBjaGFuZ2VzIGV4dGVybmFsbHkgKHVuZG8vcGFnZS1zd2l0Y2gpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGVsICYmIGVsLmlubmVySFRNTCAhPT0gYmxvY2suaHRtbCkgZWwuaW5uZXJIVE1MID0gYmxvY2suaHRtbDtcbiAgfSwgW2Jsb2NrLmh0bWxdKTtcblxuICAvLyBEZWJvdW5jZWQgdW5kbyBwdXNoIHdoaWxlIHR5cGluZ1xuICBjb25zdCB1bmRvVGltZXIgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gICAgLy8gVHJ5IG1hcmtkb3duIHNob3J0Y3V0cyDigJQgcmV0dXJucyAnY29kZScgaWYgYmxvY2sgY29udmVydGVkXG4gICAgY29uc3QgcmVzdWx0ID0gaGFuZGxlTWFya2Rvd25JbnB1dChlbCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gJ2NvZGUnKSB1cGRhdGVCbG9ja1R5cGUoYmxvY2suaWQsICdjb2RlJyk7XG5cbiAgICAvLyBTYXZlIEhUTUwgdG8gc3RvcmUgKHNpbGVudClcbiAgICB1cGRhdGVCbG9ja0h0bWwoYmxvY2suaWQsIGVsLmlubmVySFRNTCk7XG5cbiAgICAvLyBEZWJvdW5jZWQgdW5kbyBzbmFwc2hvdCB3aGlsZSB0eXBpbmcgKGV2ZXJ5IH4xLjUgcyBvZiBpbmFjdGl2aXR5KVxuICAgIGNsZWFyVGltZW91dCh1bmRvVGltZXIuY3VycmVudCk7XG4gICAgdW5kb1RpbWVyLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG4gICAgfSwgMTUwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChlKSA9PiB7XG4gICAgY29uc3QgbW9kID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcblxuICAgIC8vIFVuZG8gLyByZWRvXG4gICAgaWYgKG1vZCAmJiBlLmtleSA9PT0gJ3onKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnNoaWZ0S2V5ID8gY3R4LnJlZG8oKSA6IGN0eC51bmRvKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb25CbG9ja0tleURvd24oZSwgY29udGVudFJlZi5jdXJyZW50KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICAvLyBTbmFwc2hvdCB1bmRvIHN0YXRlIHdoZW4gdXNlciBlbnRlcnMgdGhlIGJsb2NrXG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG4gICAgY3R4Lm9uQmxvY2tGb2N1cz8uKGJsb2NrLmlkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCbHVyID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh1bmRvVGltZXIuY3VycmVudCk7XG4gICAgY29uc3QgZWwgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaHRtbCA9IGVsLmlubmVySFRNTDtcbiAgICBjb25zdCBpc0VtcHR5ID0gIWh0bWwgfHwgaHRtbCA9PT0gJzxicj4nIHx8IGh0bWwudHJpbSgpID09PSAnJztcblxuICAgIGlmIChpc0VtcHR5ICYmICFpc0RlZmF1bHQpIHtcbiAgICAgIC8vIEF1dG8tZGVsZXRlIGVtcHR5IG5vbi1kZWZhdWx0IGJsb2Nrc1xuICAgICAgZGVsZXRlQmxvY2soYmxvY2suaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVCbG9ja0h0bWwoYmxvY2suaWQsIGh0bWwpO1xuICAgIH1cbiAgICBjdHgub25CbG9ja0JsdXI/LihibG9jay5pZCk7XG4gIH07XG5cbiAgLy8gQ2xpY2tpbmcgYW55d2hlcmUgb24gdGhlIGJsb2NrIChvdXRzaWRlIGNvbnRlbnQpIHN0YXJ0cyBhIGRyYWcvc2VsZWN0XG4gIC8vIGFuZCBjcnVjaWFsbHkgU1RPUFMgcHJvcGFnYXRpb24gc28gY2FudmFzIGRvZXNuJ3QgY3JlYXRlIGEgbmV3IGJsb2NrXG4gIGNvbnN0IGhhbmRsZUJsb2NrUG9pbnRlckRvd24gPSAoZSkgPT4ge1xuICAgIC8vIEFsd2F5cyBzdG9wIHByb3BhZ2F0aW9uIOKAlCBubyBjYW52YXMgYWN0aW9ucyBzaG91bGQgZmlyZSBmcm9tIGJsb2NrIGludGVyYWN0aW9uc1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyBJZiBjbGljayBsYW5kcyBvdXRzaWRlIGNvbnRlbnQvaGFuZGxlcywgaW5pdGlhdGUgZHJhZytzZWxlY3RcbiAgICBjb25zdCBvbkNvbnRlbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuYmxvY2stY29udGVudCwgLmJsb2NrLWhhbmRsZSwgLmJsb2NrLXJlc2l6ZSwgLmltZy1yZXNpemUsIC5ibG9jay1kcmFnLW92ZXJsYXknKTtcbiAgICBpZiAoIW9uQ29udGVudCkge1xuICAgICAgY3R4Lm9uQmxvY2tEcmFnU3RhcnQoZSwgYmxvY2suaWQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPXtbJ2Jsb2NrJywgaXNEZWZhdWx0ICYmICdibG9jay0tZGVmYXVsdCcsIGlzSW1hZ2UgJiYgJ2Jsb2NrLS1pbWFnZScsIGlzU2VsZWN0ZWQgJiYgJ2Jsb2NrLS1zZWxlY3RlZCddLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyl9XG4gICAgICBkYXRhLWJsb2NrLWlkPXtibG9jay5pZH1cbiAgICAgIHN0eWxlPXt7IGxlZnQ6IGJsb2NrLnggKyAncHgnLCB0b3A6IGJsb2NrLnkgKyAncHgnLCB3aWR0aDogYmxvY2sudyArICdweCcgfX1cbiAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZUJsb2NrUG9pbnRlckRvd259XG4gICAgPlxuICAgICAgey8qIERyYWcgaGFuZGxlIOKAlCBoaWRkZW4gZm9yIGRlZmF1bHQgYmxvY2sgYW5kIGltYWdlIGJsb2NrcyAqL31cbiAgICAgIHshaXNEZWZhdWx0ICYmICFpc0ltYWdlICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiYmxvY2staGFuZGxlXCJcbiAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBjdHgub25CbG9ja0RyYWdTdGFydChlLCBibG9jay5pZCk7IH19XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogUmVzaXplIGhhbmRsZSDigJQgdG9wLXJpZ2h0LCB3aWR0aCBvbmx5LCBoaWRkZW4gZm9yIGltYWdlIGJsb2NrcyAqL31cbiAgICAgIHshaXNJbWFnZSAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImJsb2NrLXJlc2l6ZVwiXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uQmxvY2tSZXNpemVTdGFydChlLCBibG9jay5pZCk7IH19XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7aXNJbWFnZSA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8aW1nIHNyYz17YmxvY2suc3JjIHx8ICcnfSBkcmFnZ2FibGU9e2ZhbHNlfSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBkaXNwbGF5OiAnYmxvY2snIH19IC8+XG4gICAgICAgICAge1snbncnLCAnbmUnLCAnc3cnLCAnc2UnXS5tYXAoZGlyID0+IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtkaXJ9XG4gICAgICAgICAgICAgIGNsYXNzPXtgaW1nLXJlc2l6ZSBpbWctcmVzaXplLS0ke2Rpcn1gfVxuICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBjdHgub25JbWdSZXNpemVTdGFydChlLCBibG9jay5pZCwgZGlyKTsgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJibG9jay1kcmFnLW92ZXJsYXlcIlxuICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY3R4Lm9uQmxvY2tEcmFnU3RhcnQoZSwgYmxvY2suaWQpOyB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Y29udGVudFJlZn1cbiAgICAgICAgICBjbGFzcz17WydibG9jay1jb250ZW50JywgYmxvY2sudHlwZSA9PT0gJ2NvZGUnICYmICdjb2RlLWJsb2NrJ10uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKX1cbiAgICAgICAgICBjb250ZW50RWRpdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICBkYXRhLXBsYWNlaG9sZGVyPVwiU3RhcnQgdHlwaW5n4oCmXCJcbiAgICAgICAgICBkYXRhLWNvZGU9e2Jsb2NrLnR5cGUgPT09ICdjb2RlJyA/ICcxJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgICAgb25JbnB1dD17aGFuZGxlSW5wdXR9XG4gICAgICAgICAgb25Gb2N1cz17aGFuZGxlRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtoYW5kbGVCbHVyfVxuICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsCiAgIi8vIOKUgOKUgCBIZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25JbmZvKCkge1xuICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIGlmICghc2VsPy5yYW5nZUNvdW50KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgY29uc3Qgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHJldHVybiBudWxsO1xuICByZXR1cm4geyBzZWwsIHJhbmdlLCBub2RlLCB0ZXh0OiBub2RlLnRleHRDb250ZW50LCBvZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0IH07XG59XG5cbi8vIFNlbGVjdCB0ZXh0IGZyb20gYHN0YXJ0YCB0byBgZW5kYCBpbiBhIHRleHQgbm9kZSwgdGhlbiBkZWxldGUgaXRcbmZ1bmN0aW9uIGVhdFRleHQoc2VsLCBub2RlLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICByLnNldFN0YXJ0KG5vZGUsIHN0YXJ0KTtcbiAgci5zZXRFbmQobm9kZSwgZW5kKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2Uocik7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWxldGUnKTtcbn1cblxuLy8gUmVwbGFjZSBhIHJlZ2V4IG1hdGNoIGluIGEgdGV4dCBub2RlIHdpdGggYSBmb3JtYXR0ZWQgZWxlbWVudFxuZnVuY3Rpb24gd3JhcE1hdGNoKHNlbCwgbm9kZSwgbWF0Y2gsIHRhZykge1xuICBjb25zdCBpZHggPSBtYXRjaC5pbmRleDtcbiAgY29uc3QgZnVsbCA9IG1hdGNoWzBdO1xuICBjb25zdCBpbm5lciA9IG1hdGNoWzFdO1xuXG4gIC8vIFNwbGl0IG5vZGU6IGJlZm9yZSB8IDx0YWc+aW5uZXI8L3RhZz4gfCBhZnRlclxuICBjb25zdCBiZWZvcmUgPSBub2RlLnRleHRDb250ZW50LnNsaWNlKDAsIGlkeCk7XG4gIGNvbnN0IGFmdGVyICA9IG5vZGUudGV4dENvbnRlbnQuc2xpY2UoaWR4ICsgZnVsbC5sZW5ndGgpO1xuXG4gIG5vZGUudGV4dENvbnRlbnQgPSBiZWZvcmU7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBlbC50ZXh0Q29udGVudCA9IGlubmVyO1xuICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBub2RlLm5leHRTaWJsaW5nKTtcbiAgY29uc3QgYWZ0ZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYWZ0ZXIpO1xuICBlbC5hZnRlcihhZnRlck5vZGUpO1xuXG4gIC8vIFBsYWNlIGN1cnNvciBhdCBzdGFydCBvZiBhZnRlciB0ZXh0XG4gIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICByLnNldFN0YXJ0KGFmdGVyTm9kZSwgMCk7XG4gIHIuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHIpO1xufVxuXG4vLyDilIDilIAgUmljaCB0ZXh0IGNvbW1hbmRzICh0b29sYmFyKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNGbXQoY21kKSB7XG4gIGNvbnN0IG1hcCA9IHtcbiAgICBib2xkOiAgICAgICAgICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnYm9sZCcpLFxuICAgIGl0YWxpYzogICAgICAgICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnKSxcbiAgICB1bmRlcmxpbmU6ICAgICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgndW5kZXJsaW5lJyksXG4gICAgc3RyaWtldGhyb3VnaDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3N0cmlrZVRocm91Z2gnKSxcbiAgICBoMTogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdIMScpLFxuICAgIGgyOiAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ0gyJyksXG4gICAgaDM6ICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAnSDMnKSxcbiAgICBoNDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdINCcpLFxuICAgIHA6ICAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ1AnKSxcbiAgICB1bDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFVub3JkZXJlZExpc3QnKSxcbiAgICBvbDogKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydE9yZGVyZWRMaXN0JyksXG4gICAgbGluazogKCkgPT4geyBjb25zdCB1ID0gcHJvbXB0KCdVUkw6Jyk7IGlmICh1KSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY3JlYXRlTGluaycsIGZhbHNlLCB1KTsgfSxcbiAgfTtcbiAgbWFwW2NtZF0/LigpO1xufVxuXG4vLyDilIDilIAgTWFya2Rvd24gc2hvcnRjdXRzIOKAlCBjYWxsZWQgb24gYGlucHV0YCBldmVudCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIFJldHVybnMgJ2NvZGUnIGlmIGJsb2NrIHdhcyBjb252ZXJ0ZWQgdG8gYSBjb2RlIGJsb2NrLCBudWxsIG90aGVyd2lzZS5cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1hcmtkb3duSW5wdXQoZWwpIHtcbiAgY29uc3QgaW5mbyA9IGdldFNlbGVjdGlvbkluZm8oKTtcbiAgaWYgKCFpbmZvKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgeyBzZWwsIHJhbmdlLCBub2RlLCB0ZXh0LCBvZmZzZXQgfSA9IGluZm87XG4gIGNvbnN0IGJlZm9yZSA9IHRleHQuc2xpY2UoMCwgb2Zmc2V0KTtcblxuICAvLyDilIDilIAgQmxvY2stbGV2ZWwgdHJpZ2dlcnMgKGF0IHN0YXJ0IG9mIGxpbmUpIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIC8vIEhlYWRpbmdzOiAjICMjICMjIyAjIyMjICsgc3BhY2VcbiAgY29uc3QgaE1hdGNoID0gYmVmb3JlLm1hdGNoKC9eKCN7MSw0fSkgJC8pO1xuICBpZiAoaE1hdGNoKSB7XG4gICAgZWF0VGV4dChzZWwsIG5vZGUsIDAsIG9mZnNldCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsIGBIJHtoTWF0Y2hbMV0ubGVuZ3RofWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gVW5vcmRlcmVkIGxpc3Q6IFwiLSBcIiBvciBcIiogXCJcbiAgaWYgKGJlZm9yZSA9PT0gJy0gJyB8fCBiZWZvcmUgPT09ICcqICcpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0VW5vcmRlcmVkTGlzdCcpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gT3JkZXJlZCBsaXN0OiBcIjEuIFwiIGV0Yy5cbiAgaWYgKC9eXFxkK1xcLiAkLy50ZXN0KGJlZm9yZSkpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0T3JkZXJlZExpc3QnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEJsb2NrcXVvdGU6IFwiPiBcIlxuICBpZiAoYmVmb3JlID09PSAnPiAnKSB7XG4gICAgZWF0VGV4dChzZWwsIG5vZGUsIDAsIG9mZnNldCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdCTE9DS1FVT1RFJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDb2RlIGJsb2NrOiBcImBgYCBcIlxuICBpZiAoYmVmb3JlID09PSAnYGBgICcpIHtcbiAgICBlYXRUZXh0KHNlbCwgbm9kZSwgMCwgb2Zmc2V0KTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29kZScsICcxJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnY29kZS1ibG9jaycpO1xuICAgIHJldHVybiAnY29kZSc7IC8vIGNhbGxlciBzaG91bGQgcGVyc2lzdCBibG9jay50eXBlXG4gIH1cblxuICAvLyDilIDilIAgSW5saW5lIHRyaWdnZXJzIChwYXR0ZXJuIGNvbXBsZXRlZCB3aXRoIHNwYWNlKSDilIDilIDilIDilIBcblxuICAvLyAqKmJvbGQqKiBvciBfX2JvbGRfXyDigJQgZW5kZWQganVzdCBiZWZvcmUgY3Vyc29yXG4gIGNvbnN0IGJvbGRNID0gYmVmb3JlLm1hdGNoKC9cXCpcXCooLis/KVxcKlxcKiQvKSB8fCBiZWZvcmUubWF0Y2goL19fKC4rPylfXyQvKTtcbiAgaWYgKGJvbGRNKSB7XG4gICAgd3JhcE1hdGNoKHNlbCwgbm9kZSwgYm9sZE0sICdzdHJvbmcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vICppdGFsaWMqIG9yIF9pdGFsaWNfIChzaW5nbGUsIG5vdCBkb3VibGUpXG4gIGNvbnN0IGl0YWxpY00gPSBiZWZvcmUubWF0Y2goLyg/PCFcXCopXFwqKFteKlxcbl0rKVxcKiQvKSB8fCBiZWZvcmUubWF0Y2goLyg/PCFfKV8oW15fXFxuXSspXyQvKTtcbiAgaWYgKGl0YWxpY00pIHtcbiAgICB3cmFwTWF0Y2goc2VsLCBub2RlLCBpdGFsaWNNLCAnZW0nKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vLyDilIDilIAgSW5saW5lIGNvZGUg4oCUIGNhbGxlZCBhZnRlciBiYWNrdGljayBpbnB1dCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUlubGluZUNvZGUoZWwpIHtcbiAgY29uc3QgaW5mbyA9IGdldFNlbGVjdGlvbkluZm8oKTtcbiAgaWYgKCFpbmZvKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHsgc2VsLCByYW5nZSwgbm9kZSwgb2Zmc2V0IH0gPSBpbmZvO1xuICBjb25zdCBiZWZvcmUgPSBub2RlLnRleHRDb250ZW50LnNsaWNlKDAsIG9mZnNldCk7XG4gIC8vIERldGVjdCBgdGV4dGAgcGF0dGVybiBlbmRpbmcgYXQgY3Vyc29yXG4gIGNvbnN0IG0gPSBiZWZvcmUubWF0Y2goL2AoW15gXFxuXSspYCQvKTtcbiAgaWYgKCFtKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgaWR4ID0gbS5pbmRleDtcbiAgY29uc3QgaW5uZXIgPSBtWzFdO1xuICBjb25zdCBiZWZvcmUyID0gbm9kZS50ZXh0Q29udGVudC5zbGljZSgwLCBpZHgpO1xuICBjb25zdCBhZnRlciA9IG5vZGUudGV4dENvbnRlbnQuc2xpY2UoaWR4ICsgbVswXS5sZW5ndGgpO1xuXG4gIG5vZGUudGV4dENvbnRlbnQgPSBiZWZvcmUyO1xuICBjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuICBjb2RlLnRleHRDb250ZW50ID0gaW5uZXI7XG4gIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29kZSwgbm9kZS5uZXh0U2libGluZyk7XG4gIGNvbnN0IGFmdGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFmdGVyIHx8ICdcXHUyMDBCJyk7XG4gIGNvZGUuYWZ0ZXIoYWZ0ZXJOb2RlKTtcblxuICBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgci5zZXRTdGFydChhZnRlck5vZGUsIDApO1xuICByLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKUgOKUgCBMaXN0IGtleSBoYW5kbGluZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUxpc3RLZXkoZSkge1xuICBjb25zdCBsaSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8uZ2V0UmFuZ2VBdCgwKT8uc3RhcnRDb250YWluZXI/LnBhcmVudEVsZW1lbnQ/LmNsb3Nlc3QoJ2xpJyk7XG4gIGlmICghbGkpIHJldHVybiBmYWxzZTtcblxuICBpZiAoZS5rZXkgPT09ICdUYWInKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGUuc2hpZnRLZXkgPyAnb3V0ZGVudCcgOiAnaW5kZW50Jyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgbGkudGV4dENvbnRlbnQudHJpbSgpID09PSAnJykge1xuICAgIC8vIENoZWNrIGlmIHRydWx5IGF0IHRvcCBsZXZlbDogcGFyZW50IGlzIFVML09MIHdob3NlIHBhcmVudCBpcyBOT1QgYW4gTElcbiAgICBjb25zdCBsaXN0RWwgPSBsaS5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGlzVG9wTGV2ZWwgPSBsaXN0RWwgJiYgKGxpc3RFbC50YWdOYW1lID09PSAnVUwnIHx8IGxpc3RFbC50YWdOYW1lID09PSAnT0wnKVxuICAgICAgJiYgbGlzdEVsLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgIT09ICdMSSc7XG4gICAgaWYgKGlzVG9wTGV2ZWwpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ1AnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIWlzVG9wTGV2ZWwpIHtcbiAgICAgIC8vIE5lc3RlZCBlbXB0eSBpdGVtIOKAlCBqdXN0IGRlaW5kZW50XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGUua2V5ID09PSAnQmFja3NwYWNlJyAmJiBsaS50ZXh0Q29udGVudC50cmltKCkgPT09ICcnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIOKUgOKUgCBDb2RlIGJsb2NrIHRhYiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gaGFuZGxlQ29kZVRhYihlLCBlbCkge1xuICBpZiAoIWVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2RlJykpIHJldHVybiBmYWxzZTtcbiAgaWYgKGUua2V5ICE9PSAnVGFiJykgcmV0dXJuIGZhbHNlO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsICcgICcpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8g4pSA4pSAIE1haW4ga2V5ZG93biBkaXNwYXRjaGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gQ2FsbCBmcm9tIGJsb2NrJ3Mgb25LZXlEb3duLiBSZXR1cm5zIHRydWUgaWYgaGFuZGxlZC5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQmxvY2tLZXlEb3duKGUsIGVsKSB7XG4gIGNvbnN0IG1vZCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG5cbiAgLy8gRXhwbGljaXQgZm9ybWF0IHNob3J0Y3V0cyAoYmVsdC1hbmQtc3VzcGVuZGVycyBhbG9uZ3NpZGUgbmF0aXZlIGhhbmRsaW5nKVxuICBpZiAobW9kICYmICFlLnNoaWZ0S2V5ICYmICFlLmFsdEtleSkge1xuICAgIGlmIChlLmtleSA9PT0gJ2InKSB7IGUucHJldmVudERlZmF1bHQoKTsgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2JvbGQnKTsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoZS5rZXkgPT09ICdpJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnKTsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoZS5rZXkgPT09ICd1JykgeyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmRlcmxpbmUnKTsgcmV0dXJuIHRydWU7IH1cbiAgfVxuXG4gIGlmIChoYW5kbGVDb2RlVGFiKGUsIGVsKSkgcmV0dXJuIHRydWU7XG4gIGlmIChoYW5kbGVMaXN0S2V5KGUpKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBCYWNrdGljayDihpIgaW5saW5lIGNvZGUgKGNoZWNrIGFmdGVyIGNoYXIgaXMgaW5zZXJ0ZWQpXG4gIGlmIChlLmtleSA9PT0gJ2AnKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBoYW5kbGVJbmxpbmVDb2RlKGVsKSwgMCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLAogICIvLyBQZXItcGFnZSB1bmRvL3JlZG8gc3RhY2tzIChpbi1tZW1vcnkpXG5jb25zdCBzdGFja3MgPSBuZXcgTWFwKCk7XG5cbmZ1bmN0aW9uIGdldChwYWdlSWQpIHtcbiAgaWYgKCFzdGFja3MuaGFzKHBhZ2VJZCkpIHN0YWNrcy5zZXQocGFnZUlkLCB7IHBhc3Q6IFtdLCBmdXR1cmU6IFtdIH0pO1xuICByZXR1cm4gc3RhY2tzLmdldChwYWdlSWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFVuZG8ocGFnZSkge1xuICBjb25zdCBzID0gZ2V0KHBhZ2UuaWQpO1xuICBzLnBhc3QucHVzaChKU09OLnN0cmluZ2lmeShwYWdlLmJsb2NrcykpO1xuICBzLmZ1dHVyZSA9IFtdO1xuICBpZiAocy5wYXN0Lmxlbmd0aCA+IDEwMCkgcy5wYXN0LnNoaWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVVuZG8ocGFnZSkge1xuICBjb25zdCBzID0gZ2V0KHBhZ2UuaWQpO1xuICBpZiAoIXMucGFzdC5sZW5ndGgpIHJldHVybiBudWxsO1xuICBzLmZ1dHVyZS5wdXNoKEpTT04uc3RyaW5naWZ5KHBhZ2UuYmxvY2tzKSk7XG4gIHJldHVybiBKU09OLnBhcnNlKHMucGFzdC5wb3AoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJlZG8ocGFnZSkge1xuICBjb25zdCBzID0gZ2V0KHBhZ2UuaWQpO1xuICBpZiAoIXMuZnV0dXJlLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gIHMucGFzdC5wdXNoKEpTT04uc3RyaW5naWZ5KHBhZ2UuYmxvY2tzKSk7XG4gIHJldHVybiBKU09OLnBhcnNlKHMuZnV0dXJlLnBvcCgpKTtcbn1cbiIsCiAgImltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0LCB1c2VDb250ZXh0IH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IENhbnZhc0N0eCB9IGZyb20gJy4vQ2FudmFzLmpzeCc7XG5pbXBvcnQgeyB1cGRhdGVCbG9ja0h0bWwsIHVwZGF0ZUJsb2NrVHlwZSwgZGVsZXRlQmxvY2ssIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IG9uQmxvY2tLZXlEb3duLCBoYW5kbGVNYXJrZG93bklucHV0IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuaW1wb3J0IHsgcHVzaFVuZG8gfSBmcm9tICcuL3VuZG8uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gQmxvY2soeyBibG9jaywgcGFnZSB9KSB7XG4gIGNvbnN0IGN0eCA9IHVzZUNvbnRleHQoQ2FudmFzQ3R4KTtcbiAgY29uc3QgY29udGVudFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgaXNEZWZhdWx0ID0gYmxvY2suaWQgPT09IHBhZ2UuZGVmYXVsdEJsb2NrSWQ7XG4gIGNvbnN0IGlzSW1hZ2UgICA9IGJsb2NrLnR5cGUgPT09ICdpbWFnZSc7XG4gIGNvbnN0IGlzU2VsZWN0ZWQgPSBjdHguc2VsZWN0ZWRJZHMuaGFzKGJsb2NrLmlkKTtcblxuICAvLyBTeW5jIGNvbnRlbnQgd2hlbiBibG9jay5odG1sIGNoYW5nZXMgZXh0ZXJuYWxseSAodW5kby9wYWdlLXN3aXRjaClcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoZWwgJiYgZWwuaW5uZXJIVE1MICE9PSBibG9jay5odG1sKSBlbC5pbm5lckhUTUwgPSBibG9jay5odG1sO1xuICB9LCBbYmxvY2suaHRtbF0pO1xuXG4gIC8vIERlYm91bmNlZCB1bmRvIHB1c2ggd2hpbGUgdHlwaW5nXG4gIGNvbnN0IHVuZG9UaW1lciA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBoYW5kbGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBlbCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG5cbiAgICAvLyBUcnkgbWFya2Rvd24gc2hvcnRjdXRzIOKAlCByZXR1cm5zICdjb2RlJyBpZiBibG9jayBjb252ZXJ0ZWRcbiAgICBjb25zdCByZXN1bHQgPSBoYW5kbGVNYXJrZG93bklucHV0KGVsKTtcbiAgICBpZiAocmVzdWx0ID09PSAnY29kZScpIHVwZGF0ZUJsb2NrVHlwZShibG9jay5pZCwgJ2NvZGUnKTtcblxuICAgIC8vIFNhdmUgSFRNTCB0byBzdG9yZSAoc2lsZW50KVxuICAgIHVwZGF0ZUJsb2NrSHRtbChibG9jay5pZCwgZWwuaW5uZXJIVE1MKTtcblxuICAgIC8vIERlYm91bmNlZCB1bmRvIHNuYXBzaG90IHdoaWxlIHR5cGluZyAoZXZlcnkgfjEuNSBzIG9mIGluYWN0aXZpdHkpXG4gICAgY2xlYXJUaW1lb3V0KHVuZG9UaW1lci5jdXJyZW50KTtcbiAgICB1bmRvVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcbiAgICB9LCAxNTAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGUpID0+IHtcbiAgICBjb25zdCBtb2QgPSBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5O1xuXG4gICAgLy8gVW5kbyAvIHJlZG9cbiAgICBpZiAobW9kICYmIGUua2V5ID09PSAneicpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc2hpZnRLZXkgPyBjdHgucmVkbygpIDogY3R4LnVuZG8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvbkJsb2NrS2V5RG93bihlLCBjb250ZW50UmVmLmN1cnJlbnQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvY3VzID0gKCkgPT4ge1xuICAgIC8vIFNuYXBzaG90IHVuZG8gc3RhdGUgd2hlbiB1c2VyIGVudGVycyB0aGUgYmxvY2tcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcbiAgICBjdHgub25CbG9ja0ZvY3VzPy4oYmxvY2suaWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJsdXIgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHVuZG9UaW1lci5jdXJyZW50KTtcbiAgICBjb25zdCBlbCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG5cbiAgICBjb25zdCBodG1sID0gZWwuaW5uZXJIVE1MO1xuICAgIGNvbnN0IGlzRW1wdHkgPSAhaHRtbCB8fCBodG1sID09PSAnPGJyPicgfHwgaHRtbC50cmltKCkgPT09ICcnO1xuXG4gICAgaWYgKGlzRW1wdHkgJiYgIWlzRGVmYXVsdCkge1xuICAgICAgLy8gQXV0by1kZWxldGUgZW1wdHkgbm9uLWRlZmF1bHQgYmxvY2tzXG4gICAgICBkZWxldGVCbG9jayhibG9jay5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUJsb2NrSHRtbChibG9jay5pZCwgaHRtbCk7XG4gICAgfVxuICAgIGN0eC5vbkJsb2NrQmx1cj8uKGJsb2NrLmlkKTtcbiAgfTtcblxuICAvLyBDbGlja2luZyBhbnl3aGVyZSBvbiB0aGUgYmxvY2sgKG91dHNpZGUgY29udGVudCkgc3RhcnRzIGEgZHJhZy9zZWxlY3RcbiAgLy8gYW5kIGNydWNpYWxseSBTVE9QUyBwcm9wYWdhdGlvbiBzbyBjYW52YXMgZG9lc24ndCBjcmVhdGUgYSBuZXcgYmxvY2tcbiAgY29uc3QgaGFuZGxlQmxvY2tQb2ludGVyRG93biA9IChlKSA9PiB7XG4gICAgLy8gQWx3YXlzIHN0b3AgcHJvcGFnYXRpb24g4oCUIG5vIGNhbnZhcyBhY3Rpb25zIHNob3VsZCBmaXJlIGZyb20gYmxvY2sgaW50ZXJhY3Rpb25zXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIElmIGNsaWNrIGxhbmRzIG91dHNpZGUgY29udGVudC9oYW5kbGVzLCBpbml0aWF0ZSBkcmFnK3NlbGVjdFxuICAgIGNvbnN0IG9uQ29udGVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5ibG9jay1jb250ZW50LCAuYmxvY2staGFuZGxlLCAuYmxvY2stcmVzaXplLCAuaW1nLXJlc2l6ZSwgLmJsb2NrLWRyYWctb3ZlcmxheScpO1xuICAgIGlmICghb25Db250ZW50KSB7XG4gICAgICBjdHgub25CbG9ja0RyYWdTdGFydChlLCBibG9jay5pZCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3M9e1snYmxvY2snLCBpc0RlZmF1bHQgJiYgJ2Jsb2NrLS1kZWZhdWx0JywgaXNJbWFnZSAmJiAnYmxvY2stLWltYWdlJywgaXNTZWxlY3RlZCAmJiAnYmxvY2stLXNlbGVjdGVkJ10uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKX1cbiAgICAgIGRhdGEtYmxvY2staWQ9e2Jsb2NrLmlkfVxuICAgICAgc3R5bGU9e3sgbGVmdDogYmxvY2sueCArICdweCcsIHRvcDogYmxvY2sueSArICdweCcsIHdpZHRoOiBibG9jay53ICsgJ3B4JyB9fVxuICAgICAgb25Qb2ludGVyRG93bj17aGFuZGxlQmxvY2tQb2ludGVyRG93bn1cbiAgICA+XG4gICAgICB7LyogRHJhZyBoYW5kbGUg4oCUIGhpZGRlbiBmb3IgZGVmYXVsdCBibG9jayBhbmQgaW1hZ2UgYmxvY2tzICovfVxuICAgICAgeyFpc0RlZmF1bHQgJiYgIWlzSW1hZ2UgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJibG9jay1oYW5kbGVcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkJsb2NrRHJhZ1N0YXJ0KGUsIGJsb2NrLmlkKTsgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBSZXNpemUgaGFuZGxlIOKAlCB0b3AtcmlnaHQsIHdpZHRoIG9ubHksIGhpZGRlbiBmb3IgaW1hZ2UgYmxvY2tzICovfVxuICAgICAgeyFpc0ltYWdlICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiYmxvY2stcmVzaXplXCJcbiAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBjdHgub25CbG9ja1Jlc2l6ZVN0YXJ0KGUsIGJsb2NrLmlkKTsgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHtpc0ltYWdlID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxpbWcgc3JjPXtibG9jay5zcmMgfHwgJyd9IGRyYWdnYWJsZT17ZmFsc2V9IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGRpc3BsYXk6ICdibG9jaycgfX0gLz5cbiAgICAgICAgICB7WydudycsICduZScsICdzdycsICdzZSddLm1hcChkaXIgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2Rpcn1cbiAgICAgICAgICAgICAgY2xhc3M9e2BpbWctcmVzaXplIGltZy1yZXNpemUtLSR7ZGlyfWB9XG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGN0eC5vbkltZ1Jlc2l6ZVN0YXJ0KGUsIGJsb2NrLmlkLCBkaXIpOyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImJsb2NrLWRyYWctb3ZlcmxheVwiXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBjdHgub25CbG9ja0RyYWdTdGFydChlLCBibG9jay5pZCk7IH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtjb250ZW50UmVmfVxuICAgICAgICAgIGNsYXNzPXtbJ2Jsb2NrLWNvbnRlbnQnLCBibG9jay50eXBlID09PSAnY29kZScgJiYgJ2NvZGUtYmxvY2snXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpfVxuICAgICAgICAgIGNvbnRlbnRFZGl0YWJsZT1cInRydWVcIlxuICAgICAgICAgIGRhdGEtcGxhY2Vob2xkZXI9XCJTdGFydCB0eXBpbmfigKZcIlxuICAgICAgICAgIGRhdGEtY29kZT17YmxvY2sudHlwZSA9PT0gJ2NvZGUnID8gJzEnIDogdW5kZWZpbmVkfVxuICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICBvbklucHV0PXtoYW5kbGVJbnB1dH1cbiAgICAgICAgICBvbkZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICBvbkJsdXI9e2hhbmRsZUJsdXJ9XG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nXG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IEJsb2NrIH0gZnJvbSAnLi9CbG9jay5qc3gnO1xuaW1wb3J0IHsgYXBwU3RhdGUsIGFkZEJsb2NrLCBkZWxldGVCbG9jaywgdXBkYXRlQmxvY2tQb3MsIHVwZGF0ZUJsb2NrV2lkdGgsIHVwZGF0ZVBhZ2VWaWV3LCB1cGRhdGVQYWdlVGl0bGUsIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gsIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvLCBhcHBseVVuZG8sIGFwcGx5UmVkbyB9IGZyb20gJy4vdW5kby5qcyc7XG5pbXBvcnQgeyBleGVjRm10IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuXG5leHBvcnQgY29uc3QgQ2FudmFzQ3R4ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuLy8g4pSA4pSA4pSAIEZvcm1hdFRvb2xiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIEZvcm1hdFRvb2xiYXIoKSB7XG4gIGNvbnN0IGJ0bnMgPSBbXG4gICAgeyBjbWQ6ICdib2xkJywgICAgICAgICAgbm9kZTogPGI+QjwvYj4sICAgdGl0bGU6ICdCb2xkJyB9LFxuICAgIHsgY21kOiAnaXRhbGljJywgICAgICAgIG5vZGU6IDxpPkk8L2k+LCAgIHRpdGxlOiAnSXRhbGljJyB9LFxuICAgIHsgY21kOiAndW5kZXJsaW5lJywgICAgIG5vZGU6IDx1PlU8L3U+LCAgIHRpdGxlOiAnVW5kZXJsaW5lJyB9LFxuICAgIHsgY21kOiAnc3RyaWtldGhyb3VnaCcsIG5vZGU6IDxzPlM8L3M+LCAgIHRpdGxlOiAnU3RyaWtldGhyb3VnaCcgfSxcbiAgICBudWxsLFxuICAgIHsgY21kOiAnaDEnLCBub2RlOiAnSDEnLCB0aXRsZTogJ0hlYWRpbmcgMScgfSxcbiAgICB7IGNtZDogJ2gyJywgbm9kZTogJ0gyJywgdGl0bGU6ICdIZWFkaW5nIDInIH0sXG4gICAgeyBjbWQ6ICdoMycsIG5vZGU6ICdIMycsIHRpdGxlOiAnSGVhZGluZyAzJyB9LFxuICAgIHsgY21kOiAnaDQnLCBub2RlOiAnSDQnLCB0aXRsZTogJ0hlYWRpbmcgNCcgfSxcbiAgICB7IGNtZDogJ3AnLCAgbm9kZTogJ1AnLCAgdGl0bGU6ICdQYXJhZ3JhcGgnIH0sXG4gICAgbnVsbCxcbiAgICB7IGNtZDogJ3VsJywgbm9kZTogJ+KAoiBMaXN0JywgdGl0bGU6ICdCdWxsZXQgbGlzdCcgfSxcbiAgICB7IGNtZDogJ29sJywgbm9kZTogJzEuIExpc3QnLCB0aXRsZTogJ051bWJlcmVkIGxpc3QnIH0sXG4gICAgeyBjbWQ6ICdsaW5rJywgbm9kZTogJ+KMmEsnLCB0aXRsZTogJ0luc2VydCBsaW5rJyB9LFxuICBdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJmb3JtYXQtdG9vbGJhclwiPlxuICAgICAge2J0bnMubWFwKChiLCBpKSA9PiBiID09PSBudWxsXG4gICAgICAgID8gPHNwYW4ga2V5PXtpfSBjbGFzcz1cImZtdC1zZXBcIiAvPlxuICAgICAgICA6IDxidXR0b24ga2V5PXtiLmNtZH0gY2xhc3M9XCJmbXQtYnRuXCIgdGl0bGU9e2IudGl0bGV9IG9uTW91c2VEb3duPXtlID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBleGVjRm10KGIuY21kKTsgfX0+e2Iubm9kZX08L2J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8c3BhbiBjbGFzcz1cImNhbnZhcy1oaW50XCI+Q2xpY2sgdG8gYWRkIGJsb2NrIMK3IFNwYWNlK2RyYWcgdG8gcGFuIMK3IEN0cmwrc2Nyb2xsIHpvb208L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBQYWdlVGl0bGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFBhZ2VUaXRsZSh7IHBhZ2UsIG9uRW50ZXIgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlZi5jdXJyZW50ICYmICFlZGl0aW5nLmN1cnJlbnQpIHJlZi5jdXJyZW50LnRleHRDb250ZW50ID0gcGFnZT8udGl0bGUgPz8gJyc7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGlmICghcGFnZSkgcmV0dXJuIDxkaXYgaWQ9XCJwYWdlLXRpdGxlLWJhclwiIC8+O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInBhZ2UtdGl0bGUtYmFyXCIgb25DbGljaz17KCkgPT4gcmVmLmN1cnJlbnQ/LmZvY3VzKCl9PlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgaWQ9XCJwYWdlLXRpdGxlXCJcbiAgICAgICAgY29udGVudEVkaXRhYmxlXG4gICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICBvbkZvY3VzPXsoKSA9PiB7IGVkaXRpbmcuY3VycmVudCA9IHRydWU7IH19XG4gICAgICAgIG9uQmx1cj17ZSA9PiB7XG4gICAgICAgICAgZWRpdGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC50ZXh0Q29udGVudC50cmltKCkgfHwgJ1VudGl0bGVkIFBhZ2UnO1xuICAgICAgICAgIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gocGFnZS5pZCwgdGl0bGUpO1xuICAgICAgICB9fVxuICAgICAgICBvbktleURvd249e2UgPT4geyBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBvbkVudGVyPy4oKTsgfSB9fVxuICAgICAgICBvbklucHV0PXtlID0+IHsgdXBkYXRlUGFnZVRpdGxlKHBhZ2UuaWQsIGUudGFyZ2V0LnRleHRDb250ZW50KTsgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBDYW52YXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBDYW52YXMoeyBwYWdlIH0pIHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpbm5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgbWFycXVlZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgdmlld1JlZiA9IHVzZVJlZih7IHBhblg6IDAsIHBhblk6IDAsIHpvb206IDEgfSk7XG4gIGNvbnN0IHNwYWNlSGVsZCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gU2VsZWN0ZWQgYmxvY2sgSURzIOKAlCBzdG9yZWQgaW4gc3RhdGUgc28gYmxvY2tzIHJlLXJlbmRlciB3aXRoIHNlbGVjdGlvbiBzdHlsZVxuICBjb25zdCBbc2VsZWN0ZWRJZHMsIHNldFNlbGVjdGVkSWRzXSA9IHVzZVN0YXRlKG5ldyBTZXQoKSk7XG4gIGNvbnN0IHNlbGVjdGVkUmVmID0gdXNlUmVmKHNlbGVjdGVkSWRzKTtcblxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZChpZHMpIHtcbiAgICBzZWxlY3RlZFJlZi5jdXJyZW50ID0gaWRzO1xuICAgIHNldFNlbGVjdGVkSWRzKG5ldyBTZXQoaWRzKSk7XG4gIH1cblxuICAvLyBTeW5jIHZpZXcgd2hlbiBwYWdlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICB2aWV3UmVmLmN1cnJlbnQgPSB7IHBhblg6IHBhZ2UucGFuWCA/PyAwLCBwYW5ZOiBwYWdlLnBhblkgPz8gMCwgem9vbTogcGFnZS56b29tID8/IDEgfTtcbiAgICBhcHBseVRyYW5zZm9ybSgpO1xuICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIGlmICghaW5uZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGlubmVyUmVmLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkey1wYW5YICogem9vbX1weCwgJHstcGFuWSAqIHpvb219cHgpIHNjYWxlKCR7em9vbX0pYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ2FudmFzKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgeDogKGNsaWVudFggLSByZWN0LmxlZnQpIC8gem9vbSArIHBhblgsIHk6IChjbGllbnRZIC0gcmVjdC50b3ApIC8gem9vbSArIHBhblkgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU2NyZWVuKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHsgeDogY2xpZW50WCAtIHJlY3QubGVmdCwgeTogY2xpZW50WSAtIHJlY3QudG9wIH07XG4gIH1cblxuICAvLyDilIDilIAgQmxvY2sgZHJhZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBvbkJsb2NrRHJhZ1N0YXJ0ID0gdXNlQ2FsbGJhY2soKGUsIGJsb2NrSWQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuXG4gICAgLy8gRGVmYXVsdCBibG9jayBjYW5ub3QgYmUgbW92ZWRcbiAgICBpZiAocGcuZGVmYXVsdEJsb2NrSWQgPT09IGJsb2NrSWQpIHJldHVybjtcblxuICAgIGlmICghc2VsZWN0ZWRSZWYuY3VycmVudC5oYXMoYmxvY2tJZCkpIHtcbiAgICAgIGlmICghZS5zaGlmdEtleSkgc2V0U2VsZWN0ZWQobmV3IFNldChbYmxvY2tJZF0pKTtcbiAgICAgIGVsc2Ugc2V0U2VsZWN0ZWQobmV3IFNldChbLi4uc2VsZWN0ZWRSZWYuY3VycmVudCwgYmxvY2tJZF0pKTtcbiAgICB9XG5cbiAgICBwdXNoVW5kbyhwZyk7XG5cbiAgICBjb25zdCBpZHMgPSBzZWxlY3RlZFJlZi5jdXJyZW50LmhhcyhibG9ja0lkKVxuICAgICAgPyBbLi4uc2VsZWN0ZWRSZWYuY3VycmVudF1cbiAgICAgIDogW2Jsb2NrSWRdO1xuXG4gICAgLy8gU25hcHNob3Qgb3JpZ2luYWwgcG9zaXRpb25zIGZyb20gRE9NXG4gICAgY29uc3Qgb3JpZ1BvcyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7aWR9XCJdYCk7XG4gICAgICBpZiAoZWwpIG9yaWdQb3Muc2V0KGlkLCB7IHg6IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCB5OiBwYXJzZUludChlbC5zdHlsZS50b3ApIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WCwgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHsgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBkeSA9IChlMi5jbGllbnRZIC0gc3RhcnRZKSAvIHpvb207XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgb3JpZ10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBvcmlnLnggKyBkeCkgKyAncHgnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBvcmlnLnkgKyBkeSkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgX10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIHVwZGF0ZUJsb2NrUG9zKGlkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgQmxvY2sgcmVzaXplIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uQmxvY2tSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2Jsb2NrSWR9XCJdYCk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdXID0gcGFyc2VJbnQoZWwuc3R5bGUud2lkdGgpIHx8IDQ4MDtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdmUoZTIpIHtcbiAgICAgIGNvbnN0IGR4ID0gKGUyLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IE1hdGgubWF4KDEyMCwgb3JpZ1cgKyBkeCkgKyAncHgnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblVwKCkge1xuICAgICAgdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS53aWR0aCkpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfSwgW10pO1xuXG4gIC8vIOKUgOKUgCBJbWFnZSByZXNpemUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3Qgb25JbWdSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkLCBkaXIpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7YmxvY2tJZH1cIl1gKTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgY29uc3Qgb3JpZ1cgPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBvcmlnWCA9IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpO1xuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSAoZTIuY2xpZW50WCAtIHN0YXJ0WCkgLyB2aWV3UmVmLmN1cnJlbnQuem9vbTtcbiAgICAgIGNvbnN0IG5ld1cgPSBNYXRoLm1heCg0MCwgb3JpZ1cgKyAoZGlyLmluY2x1ZGVzKCdlJykgPyBkeCA6IC1keCkpO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBuZXdXICsgJ3B4JztcbiAgICAgIGlmIChkaXIuaW5jbHVkZXMoJ3cnKSkgZWwuc3R5bGUubGVmdCA9IChvcmlnWCAtIChuZXdXIC0gb3JpZ1cpKSArICdweCc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICB1cGRhdGVCbG9ja1dpZHRoKGJsb2NrSWQsIHBhcnNlSW50KGVsLnN0eWxlLndpZHRoKSk7XG4gICAgICB1cGRhdGVCbG9ja1BvcyhibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIFBhbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzdGFydFBhbihzdGFydFgsIHN0YXJ0WSkge1xuICAgIGNvbnN0IG9yaWdQYW4gPSB7IC4uLnZpZXdSZWYuY3VycmVudCB9O1xuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICBjb25zdCBkeCA9IChlLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBjb25zdCBkeSA9IChlLmNsaWVudFkgLSBzdGFydFkpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICB2aWV3UmVmLmN1cnJlbnQucGFuWCA9IE1hdGgubWF4KDAsIG9yaWdQYW4ucGFuWCAtIGR4KTtcbiAgICAgIHZpZXdSZWYuY3VycmVudC5wYW5ZID0gTWF0aC5tYXgoMCwgb3JpZ1Bhbi5wYW5ZIC0gZHkpO1xuICAgICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIHVwZGF0ZVBhZ2VWaWV3KHZpZXdSZWYuY3VycmVudC5wYW5YLCB2aWV3UmVmLmN1cnJlbnQucGFuWSwgdmlld1JlZi5jdXJyZW50Lnpvb20pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBNYXJxdWVlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHN0YXJ0TWFycXVlZShzdGFydENsaWVudFgsIHN0YXJ0Q2xpZW50WSkge1xuICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gdG9TY3JlZW4oc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuICAgIGNvbnN0IHN0YXJ0Q2FudmFzID0gdG9DYW52YXMoc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuXG4gICAgY29uc3QgbXEgPSBtYXJxdWVlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1xKSB7IG1xLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBtcS5zdHlsZS5jc3NUZXh0ICs9ICc7IGxlZnQ6MDt0b3A6MDt3aWR0aDowO2hlaWdodDowJzsgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUpIHtcbiAgICAgIGNvbnN0IGN1ciA9IHRvU2NyZWVuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihzdGFydFNjcmVlbi54LCBjdXIueCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5taW4oc3RhcnRTY3JlZW4ueSwgY3VyLnkpO1xuICAgICAgY29uc3QgdyA9IE1hdGguYWJzKGN1ci54IC0gc3RhcnRTY3JlZW4ueCk7XG4gICAgICBjb25zdCBoID0gTWF0aC5hYnMoY3VyLnkgLSBzdGFydFNjcmVlbi55KTtcbiAgICAgIGlmIChtcSkgeyBtcS5zdHlsZS5sZWZ0ID0geCsncHgnOyBtcS5zdHlsZS50b3AgPSB5KydweCc7IG1xLnN0eWxlLndpZHRoID0gdysncHgnOyBtcS5zdHlsZS5oZWlnaHQgPSBoKydweCc7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUpIHtcbiAgICAgIGlmIChtcSkgbXEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnN0IGVuZENhbnZhcyA9IHRvQ2FudmFzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oc3RhcnRDYW52YXMueCwgZW5kQ2FudmFzLngpO1xuICAgICAgY29uc3QgcnkgPSBNYXRoLm1pbihzdGFydENhbnZhcy55LCBlbmRDYW52YXMueSk7XG4gICAgICBjb25zdCBydyA9IE1hdGguYWJzKGVuZENhbnZhcy54IC0gc3RhcnRDYW52YXMueCk7XG4gICAgICBjb25zdCByaCA9IE1hdGguYWJzKGVuZENhbnZhcy55IC0gc3RhcnRDYW52YXMueSk7XG5cbiAgICAgIGlmIChydyA+IDQgfHwgcmggPiA0KSB7XG4gICAgICAgIGNvbnN0IGhpdHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ4ID0gcGFyc2VJbnQoZWwuc3R5bGUubGVmdCksIGJ5ID0gcGFyc2VJbnQoZWwuc3R5bGUudG9wKTtcbiAgICAgICAgICBjb25zdCBidyA9IGVsLm9mZnNldFdpZHRoLCBiaCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBpZiAoYnggPCByeCtydyAmJiBieCtidyA+IHJ4ICYmIGJ5IDwgcnkrcmggJiYgYnkrYmggPiByeSkgaGl0cy5hZGQoZWwuZGF0YXNldC5ibG9ja0lkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFNlbGVjdGVkKGhpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIENhbnZhcyBwb2ludGVyIGRvd24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9pbnRlckRvd24oZSkge1xuICAgIC8vIE1pZGRsZSBidXR0b24gb3Igc3BhY2UgaGVsZCDihpIgcGFuXG4gICAgaWYgKGUuYnV0dG9uID09PSAxIHx8IChlLmJ1dHRvbiA9PT0gMCAmJiBzcGFjZUhlbGQuY3VycmVudCkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN0YXJ0UGFuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG5cbiAgICAvLyBMZWZ0IGNsaWNrIG9uIGVtcHR5IGNhbnZhcyDigJQgbWlnaHQgYmUgbWFycXVlZSBvciBjcmVhdGUtYmxvY2tcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYLCBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG4gICAgbGV0IG1hcnF1ZWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSBlMi5jbGllbnRYIC0gc3RhcnRYLCBkeSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBpZiAoIW1vdmVkICYmIE1hdGguc3FydChkeCpkeCArIGR5KmR5KSA+IDQpIHtcbiAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICBtYXJxdWVlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRNYXJxdWVlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICAgIGlmICghbWFycXVlZUFjdGl2ZSkge1xuICAgICAgICAvLyBDbGVhbiBzaW5nbGUgY2xpY2sg4oaSIGNyZWF0ZSBibG9ja1xuICAgICAgICBzZXRTZWxlY3RlZChuZXcgU2V0KCkpO1xuICAgICAgICBjb25zdCBwb3MgPSB0b0NhbnZhcyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgIGFkZEJsb2NrKHBvcy54LCBwb3MueSk7XG4gICAgICAgIC8vIEZvY3VzIHRoZSBuZXcgYmxvY2sgYWZ0ZXIgUHJlYWN0IHJlbmRlcnMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gcGcuYmxvY2tzW3BnLmJsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoIWxhc3RCbG9jaykgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2xhc3RCbG9jay5pZH1cIl0gLmJsb2NrLWNvbnRlbnRgKTtcbiAgICAgICAgICBlbD8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFdoZWVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBteSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY3ggPSBteCAvIHpvb20gKyBwYW5YLCBjeSA9IG15IC8gem9vbSArIHBhblk7XG4gICAgICBjb25zdCBueiA9IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgem9vbSAqIGZhY3RvcikpO1xuICAgICAgdmlld1JlZi5jdXJyZW50ID0geyBwYW5YOiBNYXRoLm1heCgwLCBjeCAtIG14L256KSwgcGFuWTogTWF0aC5tYXgoMCwgY3kgLSBteS9ueiksIHpvb206IG56IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYuY3VycmVudCA9IHsgcGFuWDogTWF0aC5tYXgoMCwgcGFuWCArIGUuZGVsdGFYL3pvb20pLCBwYW5ZOiBNYXRoLm1heCgwLCBwYW5ZICsgZS5kZWx0YVkvem9vbSksIHpvb20gfTtcbiAgICB9XG4gICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTcGFjZSBrZXkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgICAgfVxuICAgICAgLy8gRGVsZXRlIHNlbGVjdGVkIGJsb2Nrc1xuICAgICAgaWYgKChlLmtleSA9PT0gJ0RlbGV0ZScgfHwgZS5rZXkgPT09ICdCYWNrc3BhY2UnKSAmJiBzZWxlY3RlZFJlZi5jdXJyZW50LnNpemUgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgICAgICBjb25zdCBkZWZhdWx0SWQgPSBwZz8uZGVmYXVsdEJsb2NrSWQ7XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGlmIChpZCAhPT0gZGVmYXVsdElkKSBkZWxldGVCbG9jayhpZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cbiAgICAgIC8vIFVuZG8vcmVkb1xuICAgICAgY29uc3QgbW9kID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6JyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnNoaWZ0S2V5ID8gZG9SZWRvKCkgOiBkb1VuZG8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlVcChlKSB7XG4gICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgIHNwYWNlSGVsZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgcmV0dXJuICgpID0+IHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7IH07XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgVW5kby9SZWRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRvVW5kbygpIHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgY29uc3QgYmxvY2tzID0gYXBwbHlVbmRvKHBnKTtcbiAgICBpZiAoIWJsb2NrcykgcmV0dXJuO1xuICAgIHBnLmJsb2NrcyA9IGJsb2NrcztcbiAgICAvLyBGb3JjZSBQcmVhY3QgcmUtcmVuZGVyIG9mIGJsb2Nrc1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9SZWRvKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGcpIHJldHVybjtcbiAgICBjb25zdCBibG9ja3MgPSBhcHBseVJlZG8ocGcpO1xuICAgIGlmICghYmxvY2tzKSByZXR1cm47XG4gICAgcGcuYmxvY2tzID0gYmxvY2tzO1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEltYWdlIGRyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVzID0gWy4uLmUuZGF0YVRyYW5zZmVyLmZpbGVzXS5maWx0ZXIoZiA9PiBmLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpO1xuICAgIGlmICghZmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gdG9DYW52YXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgaWYgKCFwZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBibGsgPSB7IGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB4OiBwb3MueCArIGkqMjAsIHk6IHBvcy55ICsgaSoyMCwgdzogMzAwLCBodG1sOiAnJywgdHlwZTogJ2ltYWdlJywgc3JjOiBldi50YXJnZXQucmVzdWx0IH07XG4gICAgICAgIHBnLmJsb2NrcyA9IFsuLi5wZy5ibG9ja3MsIGJsa107XG4gICAgICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgICB1cGRhdGVCbG9ja1BvcyhibGsuaWQsIGJsay54LCBibGsueSk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIAgQ29udGV4dCBmb3IgYmxvY2tzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGZvY3VzRGVmYXVsdEJsb2NrKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGc/LmRlZmF1bHRCbG9ja0lkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7cGcuZGVmYXVsdEJsb2NrSWR9XCJdIC5ibG9jay1jb250ZW50YCk7XG4gICAgZWw/LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdCBjdHggPSB7XG4gICAgc2VsZWN0ZWRJZHMsXG4gICAgb25CbG9ja0RyYWdTdGFydCxcbiAgICBvbkJsb2NrUmVzaXplU3RhcnQsXG4gICAgb25JbWdSZXNpemVTdGFydCxcbiAgICBvbkJsb2NrRm9jdXM6IChpZCkgPT4ge30sXG4gICAgb25CbG9ja0JsdXI6IChpZCkgPT4ge30sXG4gICAgdW5kbzogZG9VbmRvLFxuICAgIHJlZG86IGRvUmVkbyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Rm9ybWF0VG9vbGJhciAvPlxuICAgICAgPFBhZ2VUaXRsZSBwYWdlPXtwYWdlfSBvbkVudGVyPXtmb2N1c0RlZmF1bHRCbG9ja30gLz5cbiAgICAgIDxDYW52YXNDdHguUHJvdmlkZXIgdmFsdWU9e2N0eH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgICAgICBpZD1cImNhbnZhcy1jb250YWluZXJcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgICAgIG9uV2hlZWw9e2hhbmRsZVdoZWVsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4geyBpZiAoZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoJ0ZpbGVzJykpIGUucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bWFycXVlZVJlZn0gaWQ9XCJtYXJxdWVlLXJlY3RcIiAvPlxuICAgICAgICAgIDxkaXYgcmVmPXtpbm5lclJlZn0gaWQ9XCJjYW52YXMtaW5uZXJcIiBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnIH19PlxuICAgICAgICAgICAge3BhZ2U/LmJsb2Nrcy5tYXAoYiA9PiA8QmxvY2sga2V5PXtiLmlkfSBibG9jaz17Yn0gcGFnZT17cGFnZX0gLz4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FudmFzQ3R4LlByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IEJsb2NrIH0gZnJvbSAnLi9CbG9jay5qc3gnO1xuaW1wb3J0IHsgYXBwU3RhdGUsIGFkZEJsb2NrLCBkZWxldGVCbG9jaywgdXBkYXRlQmxvY2tQb3MsIHVwZGF0ZUJsb2NrV2lkdGgsIHVwZGF0ZVBhZ2VWaWV3LCB1cGRhdGVQYWdlVGl0bGUsIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gsIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvLCBhcHBseVVuZG8sIGFwcGx5UmVkbyB9IGZyb20gJy4vdW5kby5qcyc7XG5pbXBvcnQgeyBleGVjRm10IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuXG5leHBvcnQgY29uc3QgQ2FudmFzQ3R4ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuLy8g4pSA4pSA4pSAIEZvcm1hdFRvb2xiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIEZvcm1hdFRvb2xiYXIoKSB7XG4gIGNvbnN0IGJ0bnMgPSBbXG4gICAgeyBjbWQ6ICdib2xkJywgICAgICAgICAgbm9kZTogPGI+QjwvYj4sICAgdGl0bGU6ICdCb2xkJyB9LFxuICAgIHsgY21kOiAnaXRhbGljJywgICAgICAgIG5vZGU6IDxpPkk8L2k+LCAgIHRpdGxlOiAnSXRhbGljJyB9LFxuICAgIHsgY21kOiAndW5kZXJsaW5lJywgICAgIG5vZGU6IDx1PlU8L3U+LCAgIHRpdGxlOiAnVW5kZXJsaW5lJyB9LFxuICAgIHsgY21kOiAnc3RyaWtldGhyb3VnaCcsIG5vZGU6IDxzPlM8L3M+LCAgIHRpdGxlOiAnU3RyaWtldGhyb3VnaCcgfSxcbiAgICBudWxsLFxuICAgIHsgY21kOiAnaDEnLCBub2RlOiAnSDEnLCB0aXRsZTogJ0hlYWRpbmcgMScgfSxcbiAgICB7IGNtZDogJ2gyJywgbm9kZTogJ0gyJywgdGl0bGU6ICdIZWFkaW5nIDInIH0sXG4gICAgeyBjbWQ6ICdoMycsIG5vZGU6ICdIMycsIHRpdGxlOiAnSGVhZGluZyAzJyB9LFxuICAgIHsgY21kOiAnaDQnLCBub2RlOiAnSDQnLCB0aXRsZTogJ0hlYWRpbmcgNCcgfSxcbiAgICB7IGNtZDogJ3AnLCAgbm9kZTogJ1AnLCAgdGl0bGU6ICdQYXJhZ3JhcGgnIH0sXG4gICAgbnVsbCxcbiAgICB7IGNtZDogJ3VsJywgbm9kZTogJ+KAoiBMaXN0JywgdGl0bGU6ICdCdWxsZXQgbGlzdCcgfSxcbiAgICB7IGNtZDogJ29sJywgbm9kZTogJzEuIExpc3QnLCB0aXRsZTogJ051bWJlcmVkIGxpc3QnIH0sXG4gICAgeyBjbWQ6ICdsaW5rJywgbm9kZTogJ+KMmEsnLCB0aXRsZTogJ0luc2VydCBsaW5rJyB9LFxuICBdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJmb3JtYXQtdG9vbGJhclwiPlxuICAgICAge2J0bnMubWFwKChiLCBpKSA9PiBiID09PSBudWxsXG4gICAgICAgID8gPHNwYW4ga2V5PXtpfSBjbGFzcz1cImZtdC1zZXBcIiAvPlxuICAgICAgICA6IDxidXR0b24ga2V5PXtiLmNtZH0gY2xhc3M9XCJmbXQtYnRuXCIgdGl0bGU9e2IudGl0bGV9IG9uTW91c2VEb3duPXtlID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBleGVjRm10KGIuY21kKTsgfX0+e2Iubm9kZX08L2J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8c3BhbiBjbGFzcz1cImNhbnZhcy1oaW50XCI+Q2xpY2sgdG8gYWRkIGJsb2NrIMK3IFNwYWNlK2RyYWcgdG8gcGFuIMK3IEN0cmwrc2Nyb2xsIHpvb208L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBQYWdlVGl0bGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFBhZ2VUaXRsZSh7IHBhZ2UsIG9uRW50ZXIgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlZi5jdXJyZW50ICYmICFlZGl0aW5nLmN1cnJlbnQpIHJlZi5jdXJyZW50LnRleHRDb250ZW50ID0gcGFnZT8udGl0bGUgPz8gJyc7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGlmICghcGFnZSkgcmV0dXJuIDxkaXYgaWQ9XCJwYWdlLXRpdGxlLWJhclwiIC8+O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInBhZ2UtdGl0bGUtYmFyXCIgb25DbGljaz17KCkgPT4gcmVmLmN1cnJlbnQ/LmZvY3VzKCl9PlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgaWQ9XCJwYWdlLXRpdGxlXCJcbiAgICAgICAgY29udGVudEVkaXRhYmxlXG4gICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICBvbkZvY3VzPXsoKSA9PiB7IGVkaXRpbmcuY3VycmVudCA9IHRydWU7IH19XG4gICAgICAgIG9uQmx1cj17ZSA9PiB7XG4gICAgICAgICAgZWRpdGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC50ZXh0Q29udGVudC50cmltKCkgfHwgJ1VudGl0bGVkIFBhZ2UnO1xuICAgICAgICAgIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gocGFnZS5pZCwgdGl0bGUpO1xuICAgICAgICB9fVxuICAgICAgICBvbktleURvd249e2UgPT4geyBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBvbkVudGVyPy4oKTsgfSB9fVxuICAgICAgICBvbklucHV0PXtlID0+IHsgdXBkYXRlUGFnZVRpdGxlKHBhZ2UuaWQsIGUudGFyZ2V0LnRleHRDb250ZW50KTsgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBDYW52YXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBDYW52YXMoeyBwYWdlIH0pIHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpbm5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgbWFycXVlZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgdmlld1JlZiA9IHVzZVJlZih7IHBhblg6IDAsIHBhblk6IDAsIHpvb206IDEgfSk7XG4gIGNvbnN0IHNwYWNlSGVsZCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gU2VsZWN0ZWQgYmxvY2sgSURzIOKAlCBzdG9yZWQgaW4gc3RhdGUgc28gYmxvY2tzIHJlLXJlbmRlciB3aXRoIHNlbGVjdGlvbiBzdHlsZVxuICBjb25zdCBbc2VsZWN0ZWRJZHMsIHNldFNlbGVjdGVkSWRzXSA9IHVzZVN0YXRlKG5ldyBTZXQoKSk7XG4gIGNvbnN0IHNlbGVjdGVkUmVmID0gdXNlUmVmKHNlbGVjdGVkSWRzKTtcblxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZChpZHMpIHtcbiAgICBzZWxlY3RlZFJlZi5jdXJyZW50ID0gaWRzO1xuICAgIHNldFNlbGVjdGVkSWRzKG5ldyBTZXQoaWRzKSk7XG4gIH1cblxuICAvLyBTeW5jIHZpZXcgd2hlbiBwYWdlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICB2aWV3UmVmLmN1cnJlbnQgPSB7IHBhblg6IHBhZ2UucGFuWCA/PyAwLCBwYW5ZOiBwYWdlLnBhblkgPz8gMCwgem9vbTogcGFnZS56b29tID8/IDEgfTtcbiAgICBhcHBseVRyYW5zZm9ybSgpO1xuICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIGlmICghaW5uZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGlubmVyUmVmLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkey1wYW5YICogem9vbX1weCwgJHstcGFuWSAqIHpvb219cHgpIHNjYWxlKCR7em9vbX0pYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ2FudmFzKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgeDogKGNsaWVudFggLSByZWN0LmxlZnQpIC8gem9vbSArIHBhblgsIHk6IChjbGllbnRZIC0gcmVjdC50b3ApIC8gem9vbSArIHBhblkgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU2NyZWVuKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHsgeDogY2xpZW50WCAtIHJlY3QubGVmdCwgeTogY2xpZW50WSAtIHJlY3QudG9wIH07XG4gIH1cblxuICAvLyDilIDilIAgQmxvY2sgZHJhZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBvbkJsb2NrRHJhZ1N0YXJ0ID0gdXNlQ2FsbGJhY2soKGUsIGJsb2NrSWQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuXG4gICAgLy8gRGVmYXVsdCBibG9jayBjYW5ub3QgYmUgbW92ZWRcbiAgICBpZiAocGcuZGVmYXVsdEJsb2NrSWQgPT09IGJsb2NrSWQpIHJldHVybjtcblxuICAgIGlmICghc2VsZWN0ZWRSZWYuY3VycmVudC5oYXMoYmxvY2tJZCkpIHtcbiAgICAgIGlmICghZS5zaGlmdEtleSkgc2V0U2VsZWN0ZWQobmV3IFNldChbYmxvY2tJZF0pKTtcbiAgICAgIGVsc2Ugc2V0U2VsZWN0ZWQobmV3IFNldChbLi4uc2VsZWN0ZWRSZWYuY3VycmVudCwgYmxvY2tJZF0pKTtcbiAgICB9XG5cbiAgICBwdXNoVW5kbyhwZyk7XG5cbiAgICBjb25zdCBpZHMgPSBzZWxlY3RlZFJlZi5jdXJyZW50LmhhcyhibG9ja0lkKVxuICAgICAgPyBbLi4uc2VsZWN0ZWRSZWYuY3VycmVudF1cbiAgICAgIDogW2Jsb2NrSWRdO1xuXG4gICAgLy8gU25hcHNob3Qgb3JpZ2luYWwgcG9zaXRpb25zIGZyb20gRE9NXG4gICAgY29uc3Qgb3JpZ1BvcyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7aWR9XCJdYCk7XG4gICAgICBpZiAoZWwpIG9yaWdQb3Muc2V0KGlkLCB7IHg6IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCB5OiBwYXJzZUludChlbC5zdHlsZS50b3ApIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WCwgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHsgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBkeSA9IChlMi5jbGllbnRZIC0gc3RhcnRZKSAvIHpvb207XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgb3JpZ10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBvcmlnLnggKyBkeCkgKyAncHgnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBvcmlnLnkgKyBkeSkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgX10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIHVwZGF0ZUJsb2NrUG9zKGlkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgQmxvY2sgcmVzaXplIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uQmxvY2tSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2Jsb2NrSWR9XCJdYCk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdXID0gcGFyc2VJbnQoZWwuc3R5bGUud2lkdGgpIHx8IDQ4MDtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdmUoZTIpIHtcbiAgICAgIGNvbnN0IGR4ID0gKGUyLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IE1hdGgubWF4KDEyMCwgb3JpZ1cgKyBkeCkgKyAncHgnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblVwKCkge1xuICAgICAgdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS53aWR0aCkpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfSwgW10pO1xuXG4gIC8vIOKUgOKUgCBJbWFnZSByZXNpemUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3Qgb25JbWdSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkLCBkaXIpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7YmxvY2tJZH1cIl1gKTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgY29uc3Qgb3JpZ1cgPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBvcmlnWCA9IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpO1xuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSAoZTIuY2xpZW50WCAtIHN0YXJ0WCkgLyB2aWV3UmVmLmN1cnJlbnQuem9vbTtcbiAgICAgIGNvbnN0IG5ld1cgPSBNYXRoLm1heCg0MCwgb3JpZ1cgKyAoZGlyLmluY2x1ZGVzKCdlJykgPyBkeCA6IC1keCkpO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBuZXdXICsgJ3B4JztcbiAgICAgIGlmIChkaXIuaW5jbHVkZXMoJ3cnKSkgZWwuc3R5bGUubGVmdCA9IChvcmlnWCAtIChuZXdXIC0gb3JpZ1cpKSArICdweCc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICB1cGRhdGVCbG9ja1dpZHRoKGJsb2NrSWQsIHBhcnNlSW50KGVsLnN0eWxlLndpZHRoKSk7XG4gICAgICB1cGRhdGVCbG9ja1BvcyhibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIFBhbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzdGFydFBhbihzdGFydFgsIHN0YXJ0WSkge1xuICAgIGNvbnN0IG9yaWdQYW4gPSB7IC4uLnZpZXdSZWYuY3VycmVudCB9O1xuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICBjb25zdCBkeCA9IChlLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBjb25zdCBkeSA9IChlLmNsaWVudFkgLSBzdGFydFkpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICB2aWV3UmVmLmN1cnJlbnQucGFuWCA9IE1hdGgubWF4KDAsIG9yaWdQYW4ucGFuWCAtIGR4KTtcbiAgICAgIHZpZXdSZWYuY3VycmVudC5wYW5ZID0gTWF0aC5tYXgoMCwgb3JpZ1Bhbi5wYW5ZIC0gZHkpO1xuICAgICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIHVwZGF0ZVBhZ2VWaWV3KHZpZXdSZWYuY3VycmVudC5wYW5YLCB2aWV3UmVmLmN1cnJlbnQucGFuWSwgdmlld1JlZi5jdXJyZW50Lnpvb20pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBNYXJxdWVlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHN0YXJ0TWFycXVlZShzdGFydENsaWVudFgsIHN0YXJ0Q2xpZW50WSkge1xuICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gdG9TY3JlZW4oc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuICAgIGNvbnN0IHN0YXJ0Q2FudmFzID0gdG9DYW52YXMoc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuXG4gICAgY29uc3QgbXEgPSBtYXJxdWVlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1xKSB7IG1xLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBtcS5zdHlsZS5jc3NUZXh0ICs9ICc7IGxlZnQ6MDt0b3A6MDt3aWR0aDowO2hlaWdodDowJzsgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUpIHtcbiAgICAgIGNvbnN0IGN1ciA9IHRvU2NyZWVuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihzdGFydFNjcmVlbi54LCBjdXIueCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5taW4oc3RhcnRTY3JlZW4ueSwgY3VyLnkpO1xuICAgICAgY29uc3QgdyA9IE1hdGguYWJzKGN1ci54IC0gc3RhcnRTY3JlZW4ueCk7XG4gICAgICBjb25zdCBoID0gTWF0aC5hYnMoY3VyLnkgLSBzdGFydFNjcmVlbi55KTtcbiAgICAgIGlmIChtcSkgeyBtcS5zdHlsZS5sZWZ0ID0geCsncHgnOyBtcS5zdHlsZS50b3AgPSB5KydweCc7IG1xLnN0eWxlLndpZHRoID0gdysncHgnOyBtcS5zdHlsZS5oZWlnaHQgPSBoKydweCc7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUpIHtcbiAgICAgIGlmIChtcSkgbXEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnN0IGVuZENhbnZhcyA9IHRvQ2FudmFzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oc3RhcnRDYW52YXMueCwgZW5kQ2FudmFzLngpO1xuICAgICAgY29uc3QgcnkgPSBNYXRoLm1pbihzdGFydENhbnZhcy55LCBlbmRDYW52YXMueSk7XG4gICAgICBjb25zdCBydyA9IE1hdGguYWJzKGVuZENhbnZhcy54IC0gc3RhcnRDYW52YXMueCk7XG4gICAgICBjb25zdCByaCA9IE1hdGguYWJzKGVuZENhbnZhcy55IC0gc3RhcnRDYW52YXMueSk7XG5cbiAgICAgIGlmIChydyA+IDQgfHwgcmggPiA0KSB7XG4gICAgICAgIGNvbnN0IGhpdHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ4ID0gcGFyc2VJbnQoZWwuc3R5bGUubGVmdCksIGJ5ID0gcGFyc2VJbnQoZWwuc3R5bGUudG9wKTtcbiAgICAgICAgICBjb25zdCBidyA9IGVsLm9mZnNldFdpZHRoLCBiaCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBpZiAoYnggPCByeCtydyAmJiBieCtidyA+IHJ4ICYmIGJ5IDwgcnkrcmggJiYgYnkrYmggPiByeSkgaGl0cy5hZGQoZWwuZGF0YXNldC5ibG9ja0lkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFNlbGVjdGVkKGhpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIENhbnZhcyBwb2ludGVyIGRvd24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9pbnRlckRvd24oZSkge1xuICAgIC8vIE1pZGRsZSBidXR0b24gb3Igc3BhY2UgaGVsZCDihpIgcGFuXG4gICAgaWYgKGUuYnV0dG9uID09PSAxIHx8IChlLmJ1dHRvbiA9PT0gMCAmJiBzcGFjZUhlbGQuY3VycmVudCkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN0YXJ0UGFuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG5cbiAgICAvLyBMZWZ0IGNsaWNrIG9uIGVtcHR5IGNhbnZhcyDigJQgbWlnaHQgYmUgbWFycXVlZSBvciBjcmVhdGUtYmxvY2tcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYLCBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG4gICAgbGV0IG1hcnF1ZWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSBlMi5jbGllbnRYIC0gc3RhcnRYLCBkeSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBpZiAoIW1vdmVkICYmIE1hdGguc3FydChkeCpkeCArIGR5KmR5KSA+IDQpIHtcbiAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICBtYXJxdWVlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRNYXJxdWVlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICAgIGlmICghbWFycXVlZUFjdGl2ZSkge1xuICAgICAgICAvLyBDbGVhbiBzaW5nbGUgY2xpY2sg4oaSIGNyZWF0ZSBibG9ja1xuICAgICAgICBzZXRTZWxlY3RlZChuZXcgU2V0KCkpO1xuICAgICAgICBjb25zdCBwb3MgPSB0b0NhbnZhcyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgIGFkZEJsb2NrKHBvcy54LCBwb3MueSk7XG4gICAgICAgIC8vIEZvY3VzIHRoZSBuZXcgYmxvY2sgYWZ0ZXIgUHJlYWN0IHJlbmRlcnMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gcGcuYmxvY2tzW3BnLmJsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoIWxhc3RCbG9jaykgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2xhc3RCbG9jay5pZH1cIl0gLmJsb2NrLWNvbnRlbnRgKTtcbiAgICAgICAgICBlbD8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFdoZWVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBteSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY3ggPSBteCAvIHpvb20gKyBwYW5YLCBjeSA9IG15IC8gem9vbSArIHBhblk7XG4gICAgICBjb25zdCBueiA9IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgem9vbSAqIGZhY3RvcikpO1xuICAgICAgdmlld1JlZi5jdXJyZW50ID0geyBwYW5YOiBNYXRoLm1heCgwLCBjeCAtIG14L256KSwgcGFuWTogTWF0aC5tYXgoMCwgY3kgLSBteS9ueiksIHpvb206IG56IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYuY3VycmVudCA9IHsgcGFuWDogTWF0aC5tYXgoMCwgcGFuWCArIGUuZGVsdGFYL3pvb20pLCBwYW5ZOiBNYXRoLm1heCgwLCBwYW5ZICsgZS5kZWx0YVkvem9vbSksIHpvb20gfTtcbiAgICB9XG4gICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTcGFjZSBrZXkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgICAgfVxuICAgICAgLy8gRGVsZXRlIHNlbGVjdGVkIGJsb2Nrc1xuICAgICAgaWYgKChlLmtleSA9PT0gJ0RlbGV0ZScgfHwgZS5rZXkgPT09ICdCYWNrc3BhY2UnKSAmJiBzZWxlY3RlZFJlZi5jdXJyZW50LnNpemUgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgICAgICBjb25zdCBkZWZhdWx0SWQgPSBwZz8uZGVmYXVsdEJsb2NrSWQ7XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGlmIChpZCAhPT0gZGVmYXVsdElkKSBkZWxldGVCbG9jayhpZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cbiAgICAgIC8vIFVuZG8vcmVkb1xuICAgICAgY29uc3QgbW9kID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6JyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnNoaWZ0S2V5ID8gZG9SZWRvKCkgOiBkb1VuZG8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlVcChlKSB7XG4gICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgIHNwYWNlSGVsZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgcmV0dXJuICgpID0+IHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7IH07XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgVW5kby9SZWRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRvVW5kbygpIHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgY29uc3QgYmxvY2tzID0gYXBwbHlVbmRvKHBnKTtcbiAgICBpZiAoIWJsb2NrcykgcmV0dXJuO1xuICAgIHBnLmJsb2NrcyA9IGJsb2NrcztcbiAgICAvLyBGb3JjZSBQcmVhY3QgcmUtcmVuZGVyIG9mIGJsb2Nrc1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9SZWRvKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGcpIHJldHVybjtcbiAgICBjb25zdCBibG9ja3MgPSBhcHBseVJlZG8ocGcpO1xuICAgIGlmICghYmxvY2tzKSByZXR1cm47XG4gICAgcGcuYmxvY2tzID0gYmxvY2tzO1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEltYWdlIGRyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVzID0gWy4uLmUuZGF0YVRyYW5zZmVyLmZpbGVzXS5maWx0ZXIoZiA9PiBmLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpO1xuICAgIGlmICghZmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gdG9DYW52YXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgaWYgKCFwZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBibGsgPSB7IGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB4OiBwb3MueCArIGkqMjAsIHk6IHBvcy55ICsgaSoyMCwgdzogMzAwLCBodG1sOiAnJywgdHlwZTogJ2ltYWdlJywgc3JjOiBldi50YXJnZXQucmVzdWx0IH07XG4gICAgICAgIHBnLmJsb2NrcyA9IFsuLi5wZy5ibG9ja3MsIGJsa107XG4gICAgICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgICB1cGRhdGVCbG9ja1BvcyhibGsuaWQsIGJsay54LCBibGsueSk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIAgQ29udGV4dCBmb3IgYmxvY2tzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGZvY3VzRGVmYXVsdEJsb2NrKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGc/LmRlZmF1bHRCbG9ja0lkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7cGcuZGVmYXVsdEJsb2NrSWR9XCJdIC5ibG9jay1jb250ZW50YCk7XG4gICAgZWw/LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdCBjdHggPSB7XG4gICAgc2VsZWN0ZWRJZHMsXG4gICAgb25CbG9ja0RyYWdTdGFydCxcbiAgICBvbkJsb2NrUmVzaXplU3RhcnQsXG4gICAgb25JbWdSZXNpemVTdGFydCxcbiAgICBvbkJsb2NrRm9jdXM6IChpZCkgPT4ge30sXG4gICAgb25CbG9ja0JsdXI6IChpZCkgPT4ge30sXG4gICAgdW5kbzogZG9VbmRvLFxuICAgIHJlZG86IGRvUmVkbyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Rm9ybWF0VG9vbGJhciAvPlxuICAgICAgPFBhZ2VUaXRsZSBwYWdlPXtwYWdlfSBvbkVudGVyPXtmb2N1c0RlZmF1bHRCbG9ja30gLz5cbiAgICAgIDxDYW52YXNDdHguUHJvdmlkZXIgdmFsdWU9e2N0eH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgICAgICBpZD1cImNhbnZhcy1jb250YWluZXJcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgICAgIG9uV2hlZWw9e2hhbmRsZVdoZWVsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4geyBpZiAoZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoJ0ZpbGVzJykpIGUucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bWFycXVlZVJlZn0gaWQ9XCJtYXJxdWVlLXJlY3RcIiAvPlxuICAgICAgICAgIDxkaXYgcmVmPXtpbm5lclJlZn0gaWQ9XCJjYW52YXMtaW5uZXJcIiBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnIH19PlxuICAgICAgICAgICAge3BhZ2U/LmJsb2Nrcy5tYXAoYiA9PiA8QmxvY2sga2V5PXtiLmlkfSBibG9jaz17Yn0gcGFnZT17cGFnZX0gLz4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FudmFzQ3R4LlByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbmltcG9ydCB7IEJsb2NrIH0gZnJvbSAnLi9CbG9jay5qc3gnO1xuaW1wb3J0IHsgYXBwU3RhdGUsIGFkZEJsb2NrLCBkZWxldGVCbG9jaywgdXBkYXRlQmxvY2tQb3MsIHVwZGF0ZUJsb2NrV2lkdGgsIHVwZGF0ZVBhZ2VWaWV3LCB1cGRhdGVQYWdlVGl0bGUsIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gsIGdldEFjdGl2ZVBhZ2UgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IHB1c2hVbmRvLCBhcHBseVVuZG8sIGFwcGx5UmVkbyB9IGZyb20gJy4vdW5kby5qcyc7XG5pbXBvcnQgeyBleGVjRm10IH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuXG5leHBvcnQgY29uc3QgQ2FudmFzQ3R4ID0gY3JlYXRlQ29udGV4dChudWxsKTtcblxuLy8g4pSA4pSA4pSAIEZvcm1hdFRvb2xiYXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIEZvcm1hdFRvb2xiYXIoKSB7XG4gIGNvbnN0IGJ0bnMgPSBbXG4gICAgeyBjbWQ6ICdib2xkJywgICAgICAgICAgbm9kZTogPGI+QjwvYj4sICAgdGl0bGU6ICdCb2xkJyB9LFxuICAgIHsgY21kOiAnaXRhbGljJywgICAgICAgIG5vZGU6IDxpPkk8L2k+LCAgIHRpdGxlOiAnSXRhbGljJyB9LFxuICAgIHsgY21kOiAndW5kZXJsaW5lJywgICAgIG5vZGU6IDx1PlU8L3U+LCAgIHRpdGxlOiAnVW5kZXJsaW5lJyB9LFxuICAgIHsgY21kOiAnc3RyaWtldGhyb3VnaCcsIG5vZGU6IDxzPlM8L3M+LCAgIHRpdGxlOiAnU3RyaWtldGhyb3VnaCcgfSxcbiAgICBudWxsLFxuICAgIHsgY21kOiAnaDEnLCBub2RlOiAnSDEnLCB0aXRsZTogJ0hlYWRpbmcgMScgfSxcbiAgICB7IGNtZDogJ2gyJywgbm9kZTogJ0gyJywgdGl0bGU6ICdIZWFkaW5nIDInIH0sXG4gICAgeyBjbWQ6ICdoMycsIG5vZGU6ICdIMycsIHRpdGxlOiAnSGVhZGluZyAzJyB9LFxuICAgIHsgY21kOiAnaDQnLCBub2RlOiAnSDQnLCB0aXRsZTogJ0hlYWRpbmcgNCcgfSxcbiAgICB7IGNtZDogJ3AnLCAgbm9kZTogJ1AnLCAgdGl0bGU6ICdQYXJhZ3JhcGgnIH0sXG4gICAgbnVsbCxcbiAgICB7IGNtZDogJ3VsJywgbm9kZTogJ+KAoiBMaXN0JywgdGl0bGU6ICdCdWxsZXQgbGlzdCcgfSxcbiAgICB7IGNtZDogJ29sJywgbm9kZTogJzEuIExpc3QnLCB0aXRsZTogJ051bWJlcmVkIGxpc3QnIH0sXG4gICAgeyBjbWQ6ICdsaW5rJywgbm9kZTogJ+KMmEsnLCB0aXRsZTogJ0luc2VydCBsaW5rJyB9LFxuICBdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJmb3JtYXQtdG9vbGJhclwiPlxuICAgICAge2J0bnMubWFwKChiLCBpKSA9PiBiID09PSBudWxsXG4gICAgICAgID8gPHNwYW4ga2V5PXtpfSBjbGFzcz1cImZtdC1zZXBcIiAvPlxuICAgICAgICA6IDxidXR0b24ga2V5PXtiLmNtZH0gY2xhc3M9XCJmbXQtYnRuXCIgdGl0bGU9e2IudGl0bGV9IG9uTW91c2VEb3duPXtlID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBleGVjRm10KGIuY21kKTsgfX0+e2Iubm9kZX08L2J1dHRvbj5cbiAgICAgICl9XG4gICAgICA8c3BhbiBjbGFzcz1cImNhbnZhcy1oaW50XCI+Q2xpY2sgdG8gYWRkIGJsb2NrIMK3IFNwYWNlK2RyYWcgdG8gcGFuIMK3IEN0cmwrc2Nyb2xsIHpvb208L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBQYWdlVGl0bGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFBhZ2VUaXRsZSh7IHBhZ2UsIG9uRW50ZXIgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGVkaXRpbmcgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlZi5jdXJyZW50ICYmICFlZGl0aW5nLmN1cnJlbnQpIHJlZi5jdXJyZW50LnRleHRDb250ZW50ID0gcGFnZT8udGl0bGUgPz8gJyc7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGlmICghcGFnZSkgcmV0dXJuIDxkaXYgaWQ9XCJwYWdlLXRpdGxlLWJhclwiIC8+O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cInBhZ2UtdGl0bGUtYmFyXCIgb25DbGljaz17KCkgPT4gcmVmLmN1cnJlbnQ/LmZvY3VzKCl9PlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgaWQ9XCJwYWdlLXRpdGxlXCJcbiAgICAgICAgY29udGVudEVkaXRhYmxlXG4gICAgICAgIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ1xuICAgICAgICBvbkZvY3VzPXsoKSA9PiB7IGVkaXRpbmcuY3VycmVudCA9IHRydWU7IH19XG4gICAgICAgIG9uQmx1cj17ZSA9PiB7XG4gICAgICAgICAgZWRpdGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC50ZXh0Q29udGVudC50cmltKCkgfHwgJ1VudGl0bGVkIFBhZ2UnO1xuICAgICAgICAgIHVwZGF0ZVBhZ2VUaXRsZUFuZFJlZnJlc2gocGFnZS5pZCwgdGl0bGUpO1xuICAgICAgICB9fVxuICAgICAgICBvbktleURvd249e2UgPT4geyBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBvbkVudGVyPy4oKTsgfSB9fVxuICAgICAgICBvbklucHV0PXtlID0+IHsgdXBkYXRlUGFnZVRpdGxlKHBhZ2UuaWQsIGUudGFyZ2V0LnRleHRDb250ZW50KTsgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBDYW52YXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmV4cG9ydCBmdW5jdGlvbiBDYW52YXMoeyBwYWdlIH0pIHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBpbm5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgbWFycXVlZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgdmlld1JlZiA9IHVzZVJlZih7IHBhblg6IDAsIHBhblk6IDAsIHpvb206IDEgfSk7XG4gIGNvbnN0IHNwYWNlSGVsZCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gU2VsZWN0ZWQgYmxvY2sgSURzIOKAlCBzdG9yZWQgaW4gc3RhdGUgc28gYmxvY2tzIHJlLXJlbmRlciB3aXRoIHNlbGVjdGlvbiBzdHlsZVxuICBjb25zdCBbc2VsZWN0ZWRJZHMsIHNldFNlbGVjdGVkSWRzXSA9IHVzZVN0YXRlKG5ldyBTZXQoKSk7XG4gIGNvbnN0IHNlbGVjdGVkUmVmID0gdXNlUmVmKHNlbGVjdGVkSWRzKTtcblxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZChpZHMpIHtcbiAgICBzZWxlY3RlZFJlZi5jdXJyZW50ID0gaWRzO1xuICAgIHNldFNlbGVjdGVkSWRzKG5ldyBTZXQoaWRzKSk7XG4gIH1cblxuICAvLyBTeW5jIHZpZXcgd2hlbiBwYWdlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICB2aWV3UmVmLmN1cnJlbnQgPSB7IHBhblg6IHBhZ2UucGFuWCA/PyAwLCBwYW5ZOiBwYWdlLnBhblkgPz8gMCwgem9vbTogcGFnZS56b29tID8/IDEgfTtcbiAgICBhcHBseVRyYW5zZm9ybSgpO1xuICAgIHNldFNlbGVjdGVkKG5ldyBTZXQoKSk7XG4gIH0sIFtwYWdlPy5pZF0pO1xuXG4gIGZ1bmN0aW9uIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIGlmICghaW5uZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgcGFuWCwgcGFuWSwgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuICAgIGlubmVyUmVmLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkey1wYW5YICogem9vbX1weCwgJHstcGFuWSAqIHpvb219cHgpIHNjYWxlKCR7em9vbX0pYDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ2FudmFzKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgcmV0dXJuIHsgeDogKGNsaWVudFggLSByZWN0LmxlZnQpIC8gem9vbSArIHBhblgsIHk6IChjbGllbnRZIC0gcmVjdC50b3ApIC8gem9vbSArIHBhblkgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU2NyZWVuKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHsgeDogY2xpZW50WCAtIHJlY3QubGVmdCwgeTogY2xpZW50WSAtIHJlY3QudG9wIH07XG4gIH1cblxuICAvLyDilIDilIAgQmxvY2sgZHJhZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBvbkJsb2NrRHJhZ1N0YXJ0ID0gdXNlQ2FsbGJhY2soKGUsIGJsb2NrSWQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKCFwZykgcmV0dXJuO1xuXG4gICAgLy8gRGVmYXVsdCBibG9jayBjYW5ub3QgYmUgbW92ZWRcbiAgICBpZiAocGcuZGVmYXVsdEJsb2NrSWQgPT09IGJsb2NrSWQpIHJldHVybjtcblxuICAgIGlmICghc2VsZWN0ZWRSZWYuY3VycmVudC5oYXMoYmxvY2tJZCkpIHtcbiAgICAgIGlmICghZS5zaGlmdEtleSkgc2V0U2VsZWN0ZWQobmV3IFNldChbYmxvY2tJZF0pKTtcbiAgICAgIGVsc2Ugc2V0U2VsZWN0ZWQobmV3IFNldChbLi4uc2VsZWN0ZWRSZWYuY3VycmVudCwgYmxvY2tJZF0pKTtcbiAgICB9XG5cbiAgICBwdXNoVW5kbyhwZyk7XG5cbiAgICBjb25zdCBpZHMgPSBzZWxlY3RlZFJlZi5jdXJyZW50LmhhcyhibG9ja0lkKVxuICAgICAgPyBbLi4uc2VsZWN0ZWRSZWYuY3VycmVudF1cbiAgICAgIDogW2Jsb2NrSWRdO1xuXG4gICAgLy8gU25hcHNob3Qgb3JpZ2luYWwgcG9zaXRpb25zIGZyb20gRE9NXG4gICAgY29uc3Qgb3JpZ1BvcyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7aWR9XCJdYCk7XG4gICAgICBpZiAoZWwpIG9yaWdQb3Muc2V0KGlkLCB7IHg6IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpLCB5OiBwYXJzZUludChlbC5zdHlsZS50b3ApIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WCwgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgIGNvbnN0IHsgem9vbSB9ID0gdmlld1JlZi5jdXJyZW50O1xuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUyKSB7XG4gICAgICBjb25zdCBkeCA9IChlMi5jbGllbnRYIC0gc3RhcnRYKSAvIHpvb207XG4gICAgICBjb25zdCBkeSA9IChlMi5jbGllbnRZIC0gc3RhcnRZKSAvIHpvb207XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgb3JpZ10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSBNYXRoLm1heCgwLCBvcmlnLnggKyBkeCkgKyAncHgnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSBNYXRoLm1heCgwLCBvcmlnLnkgKyBkeSkgKyAncHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgX10gb2Ygb3JpZ1Bvcykge1xuICAgICAgICBjb25zdCBlbCA9IGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWJsb2NrLWlkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgaWYgKCFlbCkgY29udGludWU7XG4gICAgICAgIHVwZGF0ZUJsb2NrUG9zKGlkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgQmxvY2sgcmVzaXplIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IG9uQmxvY2tSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2Jsb2NrSWR9XCJdYCk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdXID0gcGFyc2VJbnQoZWwuc3R5bGUud2lkdGgpIHx8IDQ4MDtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgaWYgKHBnKSBwdXNoVW5kbyhwZyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdmUoZTIpIHtcbiAgICAgIGNvbnN0IGR4ID0gKGUyLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IE1hdGgubWF4KDEyMCwgb3JpZ1cgKyBkeCkgKyAncHgnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblVwKCkge1xuICAgICAgdXBkYXRlQmxvY2tXaWR0aChibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS53aWR0aCkpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfSwgW10pO1xuXG4gIC8vIOKUgOKUgCBJbWFnZSByZXNpemUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgY29uc3Qgb25JbWdSZXNpemVTdGFydCA9IHVzZUNhbGxiYWNrKChlLCBibG9ja0lkLCBkaXIpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7YmxvY2tJZH1cIl1gKTtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgY29uc3Qgb3JpZ1cgPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBvcmlnWCA9IHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpO1xuICAgIGNvbnN0IHN0YXJ0WCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAocGcpIHB1c2hVbmRvKHBnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSAoZTIuY2xpZW50WCAtIHN0YXJ0WCkgLyB2aWV3UmVmLmN1cnJlbnQuem9vbTtcbiAgICAgIGNvbnN0IG5ld1cgPSBNYXRoLm1heCg0MCwgb3JpZ1cgKyAoZGlyLmluY2x1ZGVzKCdlJykgPyBkeCA6IC1keCkpO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBuZXdXICsgJ3B4JztcbiAgICAgIGlmIChkaXIuaW5jbHVkZXMoJ3cnKSkgZWwuc3R5bGUubGVmdCA9IChvcmlnWCAtIChuZXdXIC0gb3JpZ1cpKSArICdweCc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVXAoKSB7XG4gICAgICB1cGRhdGVCbG9ja1dpZHRoKGJsb2NrSWQsIHBhcnNlSW50KGVsLnN0eWxlLndpZHRoKSk7XG4gICAgICB1cGRhdGVCbG9ja1BvcyhibG9ja0lkLCBwYXJzZUludChlbC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9LCBbXSk7XG5cbiAgLy8g4pSA4pSAIFBhbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBzdGFydFBhbihzdGFydFgsIHN0YXJ0WSkge1xuICAgIGNvbnN0IG9yaWdQYW4gPSB7IC4uLnZpZXdSZWYuY3VycmVudCB9O1xuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICBjb25zdCBkeCA9IChlLmNsaWVudFggLSBzdGFydFgpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICBjb25zdCBkeSA9IChlLmNsaWVudFkgLSBzdGFydFkpIC8gdmlld1JlZi5jdXJyZW50Lnpvb207XG4gICAgICB2aWV3UmVmLmN1cnJlbnQucGFuWCA9IE1hdGgubWF4KDAsIG9yaWdQYW4ucGFuWCAtIGR4KTtcbiAgICAgIHZpZXdSZWYuY3VycmVudC5wYW5ZID0gTWF0aC5tYXgoMCwgb3JpZ1Bhbi5wYW5ZIC0gZHkpO1xuICAgICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25VcCgpIHtcbiAgICAgIHVwZGF0ZVBhZ2VWaWV3KHZpZXdSZWYuY3VycmVudC5wYW5YLCB2aWV3UmVmLmN1cnJlbnQucGFuWSwgdmlld1JlZi5jdXJyZW50Lnpvb20pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBNYXJxdWVlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIHN0YXJ0TWFycXVlZShzdGFydENsaWVudFgsIHN0YXJ0Q2xpZW50WSkge1xuICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gdG9TY3JlZW4oc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuICAgIGNvbnN0IHN0YXJ0Q2FudmFzID0gdG9DYW52YXMoc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkpO1xuXG4gICAgY29uc3QgbXEgPSBtYXJxdWVlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1xKSB7IG1xLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyBtcS5zdHlsZS5jc3NUZXh0ICs9ICc7IGxlZnQ6MDt0b3A6MDt3aWR0aDowO2hlaWdodDowJzsgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3ZlKGUpIHtcbiAgICAgIGNvbnN0IGN1ciA9IHRvU2NyZWVuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihzdGFydFNjcmVlbi54LCBjdXIueCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5taW4oc3RhcnRTY3JlZW4ueSwgY3VyLnkpO1xuICAgICAgY29uc3QgdyA9IE1hdGguYWJzKGN1ci54IC0gc3RhcnRTY3JlZW4ueCk7XG4gICAgICBjb25zdCBoID0gTWF0aC5hYnMoY3VyLnkgLSBzdGFydFNjcmVlbi55KTtcbiAgICAgIGlmIChtcSkgeyBtcS5zdHlsZS5sZWZ0ID0geCsncHgnOyBtcS5zdHlsZS50b3AgPSB5KydweCc7IG1xLnN0eWxlLndpZHRoID0gdysncHgnOyBtcS5zdHlsZS5oZWlnaHQgPSBoKydweCc7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUpIHtcbiAgICAgIGlmIChtcSkgbXEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnN0IGVuZENhbnZhcyA9IHRvQ2FudmFzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oc3RhcnRDYW52YXMueCwgZW5kQ2FudmFzLngpO1xuICAgICAgY29uc3QgcnkgPSBNYXRoLm1pbihzdGFydENhbnZhcy55LCBlbmRDYW52YXMueSk7XG4gICAgICBjb25zdCBydyA9IE1hdGguYWJzKGVuZENhbnZhcy54IC0gc3RhcnRDYW52YXMueCk7XG4gICAgICBjb25zdCByaCA9IE1hdGguYWJzKGVuZENhbnZhcy55IC0gc3RhcnRDYW52YXMueSk7XG5cbiAgICAgIGlmIChydyA+IDQgfHwgcmggPiA0KSB7XG4gICAgICAgIGNvbnN0IGhpdHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlubmVyUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ4ID0gcGFyc2VJbnQoZWwuc3R5bGUubGVmdCksIGJ5ID0gcGFyc2VJbnQoZWwuc3R5bGUudG9wKTtcbiAgICAgICAgICBjb25zdCBidyA9IGVsLm9mZnNldFdpZHRoLCBiaCA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBpZiAoYnggPCByeCtydyAmJiBieCtidyA+IHJ4ICYmIGJ5IDwgcnkrcmggJiYgYnkrYmggPiByeSkgaGl0cy5hZGQoZWwuZGF0YXNldC5ibG9ja0lkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFNlbGVjdGVkKGhpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIENhbnZhcyBwb2ludGVyIGRvd24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9pbnRlckRvd24oZSkge1xuICAgIC8vIE1pZGRsZSBidXR0b24gb3Igc3BhY2UgaGVsZCDihpIgcGFuXG4gICAgaWYgKGUuYnV0dG9uID09PSAxIHx8IChlLmJ1dHRvbiA9PT0gMCAmJiBzcGFjZUhlbGQuY3VycmVudCkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN0YXJ0UGFuKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG5cbiAgICAvLyBMZWZ0IGNsaWNrIG9uIGVtcHR5IGNhbnZhcyDigJQgbWlnaHQgYmUgbWFycXVlZSBvciBjcmVhdGUtYmxvY2tcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc3RhcnRYID0gZS5jbGllbnRYLCBzdGFydFkgPSBlLmNsaWVudFk7XG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XG4gICAgbGV0IG1hcnF1ZWVBY3RpdmUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uTW92ZShlMikge1xuICAgICAgY29uc3QgZHggPSBlMi5jbGllbnRYIC0gc3RhcnRYLCBkeSA9IGUyLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICBpZiAoIW1vdmVkICYmIE1hdGguc3FydChkeCpkeCArIGR5KmR5KSA+IDQpIHtcbiAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICBtYXJxdWVlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRNYXJxdWVlKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblVwKGUyKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcbiAgICAgIGlmICghbWFycXVlZUFjdGl2ZSkge1xuICAgICAgICAvLyBDbGVhbiBzaW5nbGUgY2xpY2sg4oaSIGNyZWF0ZSBibG9ja1xuICAgICAgICBzZXRTZWxlY3RlZChuZXcgU2V0KCkpO1xuICAgICAgICBjb25zdCBwb3MgPSB0b0NhbnZhcyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICAgIGFkZEJsb2NrKHBvcy54LCBwb3MueSk7XG4gICAgICAgIC8vIEZvY3VzIHRoZSBuZXcgYmxvY2sgYWZ0ZXIgUHJlYWN0IHJlbmRlcnMgaXRcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgbGFzdEJsb2NrID0gcGcuYmxvY2tzW3BnLmJsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoIWxhc3RCbG9jaykgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihgW2RhdGEtYmxvY2staWQ9XCIke2xhc3RCbG9jay5pZH1cIl0gLmJsb2NrLWNvbnRlbnRgKTtcbiAgICAgICAgICBlbD8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApO1xuICB9XG5cbiAgLy8g4pSA4pSAIFdoZWVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBwYW5YLCBwYW5ZLCB6b29tIH0gPSB2aWV3UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBteSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY3ggPSBteCAvIHpvb20gKyBwYW5YLCBjeSA9IG15IC8gem9vbSArIHBhblk7XG4gICAgICBjb25zdCBueiA9IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgem9vbSAqIGZhY3RvcikpO1xuICAgICAgdmlld1JlZi5jdXJyZW50ID0geyBwYW5YOiBNYXRoLm1heCgwLCBjeCAtIG14L256KSwgcGFuWTogTWF0aC5tYXgoMCwgY3kgLSBteS9ueiksIHpvb206IG56IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYuY3VycmVudCA9IHsgcGFuWDogTWF0aC5tYXgoMCwgcGFuWCArIGUuZGVsdGFYL3pvb20pLCBwYW5ZOiBNYXRoLm1heCgwLCBwYW5ZICsgZS5kZWx0YVkvem9vbSksIHpvb20gfTtcbiAgICB9XG4gICAgYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB1cGRhdGVQYWdlVmlldyh2aWV3UmVmLmN1cnJlbnQucGFuWCwgdmlld1JlZi5jdXJyZW50LnBhblksIHZpZXdSZWYuY3VycmVudC56b29tKTtcbiAgfVxuXG4gIC8vIOKUgOKUgCBTcGFjZSBrZXkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZS50YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICBzcGFjZUhlbGQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWInO1xuICAgICAgfVxuICAgICAgLy8gRGVsZXRlIHNlbGVjdGVkIGJsb2Nrc1xuICAgICAgaWYgKChlLmtleSA9PT0gJ0RlbGV0ZScgfHwgZS5rZXkgPT09ICdCYWNrc3BhY2UnKSAmJiBzZWxlY3RlZFJlZi5jdXJyZW50LnNpemUgJiYgIWUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGcgPSBnZXRBY3RpdmVQYWdlKCk7XG4gICAgICAgIGlmIChwZykgcHVzaFVuZG8ocGcpO1xuICAgICAgICBjb25zdCBkZWZhdWx0SWQgPSBwZz8uZGVmYXVsdEJsb2NrSWQ7XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGlmIChpZCAhPT0gZGVmYXVsdElkKSBkZWxldGVCbG9jayhpZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0ZWQobmV3IFNldCgpKTtcbiAgICAgIH1cbiAgICAgIC8vIFVuZG8vcmVkb1xuICAgICAgY29uc3QgbW9kID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgICAgIGlmIChtb2QgJiYgZS5rZXkgPT09ICd6JyAmJiAhZS50YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnNoaWZ0S2V5ID8gZG9SZWRvKCkgOiBkb1VuZG8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlVcChlKSB7XG4gICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgIHNwYWNlSGVsZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkgY29udGFpbmVyUmVmLmN1cnJlbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgcmV0dXJuICgpID0+IHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7IH07XG4gIH0sIFtdKTtcblxuICAvLyDilIDilIAgVW5kby9SZWRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGRvVW5kbygpIHtcbiAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICBpZiAoIXBnKSByZXR1cm47XG4gICAgY29uc3QgYmxvY2tzID0gYXBwbHlVbmRvKHBnKTtcbiAgICBpZiAoIWJsb2NrcykgcmV0dXJuO1xuICAgIHBnLmJsb2NrcyA9IGJsb2NrcztcbiAgICAvLyBGb3JjZSBQcmVhY3QgcmUtcmVuZGVyIG9mIGJsb2Nrc1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9SZWRvKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGcpIHJldHVybjtcbiAgICBjb25zdCBibG9ja3MgPSBhcHBseVJlZG8ocGcpO1xuICAgIGlmICghYmxvY2tzKSByZXR1cm47XG4gICAgcGcuYmxvY2tzID0gYmxvY2tzO1xuICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICB9XG5cbiAgLy8g4pSA4pSAIEltYWdlIGRyb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJvcChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVzID0gWy4uLmUuZGF0YVRyYW5zZmVyLmZpbGVzXS5maWx0ZXIoZiA9PiBmLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpO1xuICAgIGlmICghZmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gdG9DYW52YXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZXYgPT4ge1xuICAgICAgICBjb25zdCBwZyA9IGdldEFjdGl2ZVBhZ2UoKTtcbiAgICAgICAgaWYgKCFwZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBibGsgPSB7IGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB4OiBwb3MueCArIGkqMjAsIHk6IHBvcy55ICsgaSoyMCwgdzogMzAwLCBodG1sOiAnJywgdHlwZTogJ2ltYWdlJywgc3JjOiBldi50YXJnZXQucmVzdWx0IH07XG4gICAgICAgIHBnLmJsb2NrcyA9IFsuLi5wZy5ibG9ja3MsIGJsa107XG4gICAgICAgIGFwcFN0YXRlLnZhbHVlID0geyAuLi5hcHBTdGF0ZS52YWx1ZSB9O1xuICAgICAgICB1cGRhdGVCbG9ja1BvcyhibGsuaWQsIGJsay54LCBibGsueSk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyDilIDilIAgQ29udGV4dCBmb3IgYmxvY2tzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGZ1bmN0aW9uIGZvY3VzRGVmYXVsdEJsb2NrKCkge1xuICAgIGNvbnN0IHBnID0gZ2V0QWN0aXZlUGFnZSgpO1xuICAgIGlmICghcGc/LmRlZmF1bHRCbG9ja0lkKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBpbm5lclJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKGBbZGF0YS1ibG9jay1pZD1cIiR7cGcuZGVmYXVsdEJsb2NrSWR9XCJdIC5ibG9jay1jb250ZW50YCk7XG4gICAgZWw/LmZvY3VzKCk7XG4gIH1cblxuICBjb25zdCBjdHggPSB7XG4gICAgc2VsZWN0ZWRJZHMsXG4gICAgb25CbG9ja0RyYWdTdGFydCxcbiAgICBvbkJsb2NrUmVzaXplU3RhcnQsXG4gICAgb25JbWdSZXNpemVTdGFydCxcbiAgICBvbkJsb2NrRm9jdXM6IChpZCkgPT4ge30sXG4gICAgb25CbG9ja0JsdXI6IChpZCkgPT4ge30sXG4gICAgdW5kbzogZG9VbmRvLFxuICAgIHJlZG86IGRvUmVkbyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Rm9ybWF0VG9vbGJhciAvPlxuICAgICAgPFBhZ2VUaXRsZSBwYWdlPXtwYWdlfSBvbkVudGVyPXtmb2N1c0RlZmF1bHRCbG9ja30gLz5cbiAgICAgIDxDYW52YXNDdHguUHJvdmlkZXIgdmFsdWU9e2N0eH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgICAgICBpZD1cImNhbnZhcy1jb250YWluZXJcIlxuICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgICAgIG9uV2hlZWw9e2hhbmRsZVdoZWVsfVxuICAgICAgICAgIG9uRHJhZ092ZXI9e2UgPT4geyBpZiAoZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoJ0ZpbGVzJykpIGUucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IHJlZj17bWFycXVlZVJlZn0gaWQ9XCJtYXJxdWVlLXJlY3RcIiAvPlxuICAgICAgICAgIDxkaXYgcmVmPXtpbm5lclJlZn0gaWQ9XCJjYW52YXMtaW5uZXJcIiBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcwIDAnIH19PlxuICAgICAgICAgICAge3BhZ2U/LmJsb2Nrcy5tYXAoYiA9PiA8QmxvY2sga2V5PXtiLmlkfSBibG9jaz17Yn0gcGFnZT17cGFnZX0gLz4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FudmFzQ3R4LlByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIiwKICAiaW1wb3J0IHsgYXBwU3RhdGUsIGdldEFjdGl2ZVBhZ2UsIGZpbmRJblRyZWUgfSBmcm9tICcuL3N0b3JlLmpzJztcbmltcG9ydCB7IE5vdGVib29rQmFyIH0gZnJvbSAnLi9Ob3RlYm9va0Jhci5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvblBhbmVsIH0gZnJvbSAnLi9TZWN0aW9uUGFuZWwuanN4JztcbmltcG9ydCB7IFBhZ2VzUGFuZWwgfSBmcm9tICcuL1BhZ2VzUGFuZWwuanN4JztcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gJy4vQ2FudmFzLmpzeCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IHN0YXRlID0gYXBwU3RhdGUudmFsdWU7XG4gIGNvbnN0IHsgbm90ZWJvb2tzLCB1aSB9ID0gc3RhdGU7XG4gIGNvbnN0IG5iID0gbm90ZWJvb2tzLmZpbmQobiA9PiBuLmlkID09PSB1aS5ub3RlYm9va0lkKTtcbiAgY29uc3Qgc2VjID0gbmI/LnNlY3Rpb25zLmZpbmQocyA9PiBzLmlkID09PSB1aS5zZWN0aW9uSWQpO1xuICBjb25zdCBwYWdlID0gc2VjID8gZmluZEluVHJlZShzZWMucGFnZXMsIHVpLnBhZ2VJZCkgOiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOb3RlYm9va0JhciAvPlxuICAgICAgPGRpdiBpZD1cIm1haW5cIj5cbiAgICAgICAgPFNlY3Rpb25QYW5lbCAvPlxuICAgICAgICA8UGFnZXNQYW5lbCAvPlxuICAgICAgICA8ZGl2IGlkPVwiY2FudmFzLWFyZWFcIj5cbiAgICAgICAgICA8Q2FudmFzIHBhZ2U9e3BhZ2V9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLAogICJpbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9BcHAuanN4JztcblxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iCiAgXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O0lBQXVJLEdBQWtELEdB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QUFTLFlBQVksY0FBYyxPQUFPLElBQUk7QUFDOUMsU0FBTztBQUFBO0FBTUYsU0FBUyxjQUFjLENBQUMsSUFBRyxJQUFJO0FBQ3BDLFFBQU0sTUFBTSxHQUFFLFdBQVcsR0FBRTtBQUczQixNQUFJLFFBQVEsR0FBRSxhQUFhLEdBQUUsUUFBUTtBQUNuQyxRQUFJLEdBQUUsUUFBUSxLQUFLO0FBQUUsU0FBRSxlQUFlO0FBQUcsZUFBUyxZQUFZLE1BQU07QUFBRyxhQUFPO0FBQUEsSUFBTTtBQUNwRixRQUFJLEdBQUUsUUFBUSxLQUFLO0FBQUUsU0FBRSxlQUFlO0FBQUcsZUFBUyxZQUFZLFFBQVE7QUFBRyxhQUFPO0FBQUEsSUFBTTtBQUN0RixRQUFJLEdBQUUsUUFBUSxLQUFLO0FBQUUsU0FBRSxlQUFlO0FBQUcsZUFBUyxZQUFZLFdBQVc7QUFBRyxhQUFPO0FBQUEsSUFBTTtBQUFBLEVBQzNGO0FBRUEsTUFBSSxjQUFjLElBQUcsRUFBRTtBQUFHLFdBQU87QUFDakMsTUFBSSxjQUFjLEVBQUM7QUFBRyxXQUFPO0FBRzdCLE1BQUksR0FBRSxRQUFRLEtBQUs7QUFDakIsZUFBVyxNQUFNLGlCQUFpQixFQUFFLEdBQUcsQ0FBQztBQUFBLEVBQzFDO0FBRUEsU0FBTztBQUFBOzs7QUN4T1QsSUFBUyxjQUFHLENBQUMsUUFBUTtBQUNuQixPQUFLLE9BQU8sSUFBSSxNQUFNO0FBQUcsV0FBTyxJQUFJLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ3BFLFNBQU8sT0FBTyxJQUFJLE1BQU07QUFBQTtBQUduQixTQUFTLFFBQVEsQ0FBQyxNQUFNO0FBQzdCLFFBQU0sS0FBSSxJQUFJLEtBQUssRUFBRTtBQUNyQixLQUFFLEtBQUssS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLENBQUM7QUFDdkMsS0FBRSxTQUFTLENBQUM7QUFDWixNQUFJLEdBQUUsS0FBSyxTQUFTO0FBQUssT0FBRSxLQUFLLE1BQU07QUFBQTtBQUdqQyxTQUFTLFNBQVMsQ0FBQyxNQUFNO0FBQzlCLFFBQU0sS0FBSSxJQUFJLEtBQUssRUFBRTtBQUNyQixPQUFLLEdBQUUsS0FBSztBQUFRLFdBQU87QUFDM0IsS0FBRSxPQUFPLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxDQUFDO0FBQ3pDLFNBQU8sS0FBSyxNQUFNLEdBQUUsS0FBSyxJQUFJLENBQUM7QUFBQTtBQUd6QixTQUFTLFNBQVMsQ0FBQyxNQUFNO0FBQzlCLFFBQU0sS0FBSSxJQUFJLEtBQUssRUFBRTtBQUNyQixPQUFLLEdBQUUsT0FBTztBQUFRLFdBQU87QUFDN0IsS0FBRSxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxDQUFDO0FBQ3ZDLFNBQU8sS0FBSyxNQUFNLEdBQUUsT0FBTyxJQUFJLENBQUM7QUFBQTtBQXpCbEMsSUFBTSxTQUFTLElBQUk7IiwKICAiZGVidWdJZCI6ICI4OTVGMzQ3MkI3RjQ0MkY2NjQ3NTZlMjE2NDc1NmUyMSIsCiAgIm5hbWVzIjogW10KfQ==
