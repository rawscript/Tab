import React, { useReducer, useEffect, useContext, createContext } from 'react';
import CryptoJS from 'crypto-js';
import localforage from 'localforage';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var EncryptionUtils = /*#__PURE__*/function () {
  function EncryptionUtils(encryptionKey) {
    _classCallCheck(this, EncryptionUtils);
    this.encryptionKey = encryptionKey;
  }

  /**
   * Encrypt data using AES encryption
   * @param {any} data - Data to encrypt
   * @returns {string} - Encrypted string
   */
  return _createClass(EncryptionUtils, [{
    key: "encrypt",
    value: function encrypt(data) {
      try {
        var jsonString = JSON.stringify(data);
        var encrypted = CryptoJS.AES.encrypt(jsonString, this.encryptionKey);
        return encrypted.toString();
      } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Failed to encrypt data');
      }
    }

    /**
     * Decrypt data using AES decryption
     * @param {string} encryptedData - Encrypted string to decrypt
     * @returns {any} - Decrypted data
     */
  }, {
    key: "decrypt",
    value: function decrypt(encryptedData) {
      try {
        var decrypted = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
        var decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
          throw new Error('Decryption failed - invalid data');
        }
        return JSON.parse(decryptedString);
      } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Failed to decrypt data');
      }
    }

    /**
     * Hash data using SHA-256
     * @param {string} data - Data to hash
     * @returns {string} - Hashed string
     */
  }, {
    key: "hash",
    value: function hash(data) {
      try {
        return CryptoJS.SHA256(data).toString();
      } catch (error) {
        console.error('Hashing failed:', error);
        throw new Error('Failed to hash data');
      }
    }

    /**
     * Generate a secure random string
     * @param {number} length - Length of the random string
     * @returns {string} - Random string
     */
  }, {
    key: "generateRandomString",
    value: function generateRandomString() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    /**
     * Generate a secure salt for password hashing
     * @returns {string} - Random salt
     */
  }, {
    key: "generateSalt",
    value: function generateSalt() {
      return this.generateRandomString(16);
    }

    /**
     * Hash password with salt using PBKDF2
     * @param {string} password - Password to hash
     * @param {string} salt - Salt to use (optional, will generate if not provided)
     * @returns {Object} - Object containing hash and salt
     */
  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      try {
        var actualSalt = salt || this.generateSalt();
        var hash = CryptoJS.PBKDF2(password, actualSalt, {
          keySize: 256 / 32,
          iterations: 10000
        }).toString();
        return {
          hash: hash,
          salt: actualSalt
        };
      } catch (error) {
        console.error('Password hashing failed:', error);
        throw new Error('Failed to hash password');
      }
    }

    /**
     * Verify password against hash
     * @param {string} password - Password to verify
     * @param {string} hash - Stored hash
     * @param {string} salt - Stored salt
     * @returns {boolean} - True if password matches hash
     */
  }, {
    key: "verifyPassword",
    value: function verifyPassword(password, hash, salt) {
      try {
        var _this$hashPassword = this.hashPassword(password, salt),
          computedHash = _this$hashPassword.hash;
        return computedHash === hash;
      } catch (error) {
        console.error('Password verification failed:', error);
        return false;
      }
    }

    /**
     * Create a JWT-like token (for offline use)
     * @param {Object} payload - Token payload
     * @param {number} expiresIn - Expiration time in seconds
     * @returns {string} - Encoded token
     */
  }, {
    key: "createToken",
    value: function createToken(payload) {
      var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3600;
      // 1 hour default
      try {
        var header = {
          alg: 'HS256',
          typ: 'JWT'
        };
        var now = Math.floor(Date.now() / 1000);
        var tokenPayload = _objectSpread2(_objectSpread2({}, payload), {}, {
          iat: now,
          exp: now + expiresIn
        });
        var headerBase64 = this.base64Encode(JSON.stringify(header));
        var payloadBase64 = this.base64Encode(JSON.stringify(tokenPayload));
        var signature = this.hash("".concat(headerBase64, ".").concat(payloadBase64));
        return "".concat(headerBase64, ".").concat(payloadBase64, ".").concat(signature);
      } catch (error) {
        console.error('Token creation failed:', error);
        throw new Error('Failed to create token');
      }
    }

    /**
     * Verify JWT-like token
     * @param {string} token - Token to verify
     * @returns {Object|null} - Decoded payload if valid, null otherwise
     */
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      try {
        var parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }
        var _parts = _slicedToArray(parts, 3),
          headerBase64 = _parts[0],
          payloadBase64 = _parts[1],
          signature = _parts[2];
        var expectedSignature = this.hash("".concat(headerBase64, ".").concat(payloadBase64));
        if (signature !== expectedSignature) {
          throw new Error('Invalid token signature');
        }
        var payload = JSON.parse(this.base64Decode(payloadBase64));
        var now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          throw new Error('Token expired');
        }
        return payload;
      } catch (error) {
        console.error('Token verification failed:', error);
        return null;
      }
    }

    /**
     * Base64 encode string
     * @param {string} str - String to encode
     * @returns {string} - Base64 encoded string
     */
  }, {
    key: "base64Encode",
    value: function base64Encode(str) {
      return btoa(unescape(encodeURIComponent(str)));
    }

    /**
     * Base64 decode string
     * @param {string} str - String to decode
     * @returns {string} - Decoded string
     */
  }, {
    key: "base64Decode",
    value: function base64Decode(str) {
      return decodeURIComponent(escape(atob(str)));
    }
  }]);
}();

var StorageManager = /*#__PURE__*/function () {
  function StorageManager() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tab_auth_';
    _classCallCheck(this, StorageManager);
    this.prefix = prefix;
    this.encryptionUtils = null; // Will be set by AuthOrchestrator
    this.cache = new Map(); // In-memory cache for frequently accessed items
    this.cacheTimeout = 300000; // 5 minutes cache timeout

    // Initialize localforage with proper configuration
    this.store = localforage.createInstance({
      name: 'TabAuth',
      storeName: 'authentication'
    });
  }
  return _createClass(StorageManager, [{
    key: "setEncryptionUtils",
    value: function setEncryptionUtils(encryptionUtils) {
      this.encryptionUtils = encryptionUtils;
    }

    /**
     * Get an item from storage (with caching)
     * @param {string} key - Key to retrieve
     * @returns {Promise<any>} - Retrieved value or null
     */
  }, {
    key: "getItem",
    value: (function () {
      var _getItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(key) {
        var fullKey, cachedItem, value, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              fullKey = this.prefix + key; // Check in-memory cache first
              if (!this.cache.has(fullKey)) {
                _context.n = 2;
                break;
              }
              cachedItem = this.cache.get(fullKey);
              if (!(Date.now() - cachedItem.timestamp < this.cacheTimeout)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, cachedItem.value);
            case 1:
              // Cache expired, remove from cache
              this.cache["delete"](fullKey);
            case 2:
              _context.p = 2;
              _context.n = 3;
              return this.store.getItem(fullKey);
            case 3:
              value = _context.v;
              if (value !== null && this.encryptionUtils) {
                // Decrypt the value
                value = this.encryptionUtils.decrypt(value);
              }

              // Add to cache
              if (value !== null) {
                this.cache.set(fullKey, {
                  value: value,
                  timestamp: Date.now()
                });
              }
              return _context.a(2, value);
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error("Error getting item ".concat(fullKey, ":"), _t);
              return _context.a(2, null);
          }
        }, _callee, this, [[2, 4]]);
      }));
      function getItem(_x) {
        return _getItem.apply(this, arguments);
      }
      return getItem;
    }()
    /**
     * Set an item in storage (with caching)
     * @param {string} key - Key to store
     * @param {any} value - Value to store
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "setItem",
    value: (function () {
      var _setItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key, value) {
        var fullKey, storedValue, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              fullKey = this.prefix + key;
              _context2.p = 1;
              storedValue = value;
              if (this.encryptionUtils) {
                // Encrypt the value before storing
                storedValue = this.encryptionUtils.encrypt(value);
              }
              _context2.n = 2;
              return this.store.setItem(fullKey, storedValue);
            case 2:
              // Update cache
              this.cache.set(fullKey, {
                value: value,
                timestamp: Date.now()
              });
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error("Error setting item ".concat(fullKey, ":"), _t2);
              throw _t2;
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function setItem(_x2, _x3) {
        return _setItem.apply(this, arguments);
      }
      return setItem;
    }()
    /**
     * Remove an item from storage
     * @param {string} key - Key to remove
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "removeItem",
    value: (function () {
      var _removeItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key) {
        var fullKey, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              fullKey = this.prefix + key;
              _context3.p = 1;
              _context3.n = 2;
              return this.store.removeItem(fullKey);
            case 2:
              // Remove from cache
              this.cache["delete"](fullKey);
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              console.error("Error removing item ".concat(fullKey, ":"), _t3);
              throw _t3;
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function removeItem(_x4) {
        return _removeItem.apply(this, arguments);
      }
      return removeItem;
    }()
    /**
     * Clear all items from storage
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "clear",
    value: (function () {
      var _clear = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.store.clear();
            case 1:
              // Clear cache
              this.cache.clear();
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              console.error('Error clearing storage:', _t4);
              throw _t4;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function clear() {
        return _clear.apply(this, arguments);
      }
      return clear;
    }()
    /**
     * Get all keys from storage
     * @returns {Promise<Array<string>>} - Array of keys
     */
    )
  }, {
    key: "keys",
    value: (function () {
      var _keys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.store.keys();
            case 1:
              return _context5.a(2, _context5.v);
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              console.error('Error getting storage keys:', _t5);
              return _context5.a(2, []);
          }
        }, _callee5, this, [[0, 2]]);
      }));
      function keys() {
        return _keys.apply(this, arguments);
      }
      return keys;
    }()
    /**
     * Get storage size information
     * @returns {Promise<Object>} - Size information
     */
    )
  }, {
    key: "size",
    value: (function () {
      var _size = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var keys, totalSize, _iterator, _step, key, value, _size2, _t6, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.keys();
            case 1:
              keys = _context6.v;
              totalSize = 0;
              _iterator = _createForOfIteratorHelper(keys);
              _context6.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context6.n = 6;
                break;
              }
              key = _step.value;
              _context6.n = 4;
              return this.store.getItem(key);
            case 4:
              value = _context6.v;
              if (value) {
                _size2 = JSON.stringify(value).length;
                totalSize += _size2;
              }
            case 5:
              _context6.n = 3;
              break;
            case 6:
              _context6.n = 8;
              break;
            case 7:
              _context6.p = 7;
              _t6 = _context6.v;
              _iterator.e(_t6);
            case 8:
              _context6.p = 8;
              _iterator.f();
              return _context6.f(8);
            case 9:
              return _context6.a(2, {
                keys: keys.length,
                approximateSize: totalSize // in bytes
              });
            case 10:
              _context6.p = 10;
              _t7 = _context6.v;
              console.error('Error getting storage size:', _t7);
              return _context6.a(2, {
                keys: 0,
                approximateSize: 0
              });
          }
        }, _callee6, this, [[2, 7, 8, 9], [0, 10]]);
      }));
      function size() {
        return _size.apply(this, arguments);
      }
      return size;
    }()
    /**
     * Synchronize with online storage (when online)
     * @param {string} userId - User ID to sync for
     * @returns {Promise<boolean>} - True if sync successful
     */
    )
  }, {
    key: "syncWithOnline",
    value: (function () {
      var _syncWithOnline = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId) {
        var keys, localData, _iterator2, _step2, key, value, _t8, _t9;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              if (userId) {
                _context7.n = 1;
                break;
              }
              console.warn('Cannot sync without user ID');
              return _context7.a(2, false);
            case 1:
              _context7.p = 1;
              _context7.n = 2;
              return this.keys();
            case 2:
              keys = _context7.v;
              localData = {};
              _iterator2 = _createForOfIteratorHelper(keys);
              _context7.p = 3;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context7.n = 7;
                break;
              }
              key = _step2.value;
              if (!key.startsWith(this.prefix)) {
                _context7.n = 6;
                break;
              }
              _context7.n = 5;
              return this.getItem(key.replace(this.prefix, ''));
            case 5:
              value = _context7.v;
              localData[key] = value;
            case 6:
              _context7.n = 4;
              break;
            case 7:
              _context7.n = 9;
              break;
            case 8:
              _context7.p = 8;
              _t8 = _context7.v;
              _iterator2.e(_t8);
            case 9:
              _context7.p = 9;
              _iterator2.f();
              return _context7.f(9);
            case 10:
              // In a real implementation, you would send this to an online service
              // For now, we'll just return true to indicate sync capability
              console.log("Syncing ".concat(Object.keys(localData).length, " items for user ").concat(userId));
              return _context7.a(2, true);
            case 11:
              _context7.p = 11;
              _t9 = _context7.v;
              console.error('Error during sync:', _t9);
              return _context7.a(2, false);
          }
        }, _callee7, this, [[3, 8, 9, 10], [1, 11]]);
      }));
      function syncWithOnline(_x5) {
        return _syncWithOnline.apply(this, arguments);
      }
      return syncWithOnline;
    }()
    /**
     * Get cached value without checking storage
     * @param {string} key - Key to check in cache
     * @returns {any} - Cached value or undefined
     */
    )
  }, {
    key: "getCached",
    value: function getCached(key) {
      var fullKey = this.prefix + key;
      var cachedItem = this.cache.get(fullKey);
      if (cachedItem && Date.now() - cachedItem.timestamp < this.cacheTimeout) {
        return cachedItem.value;
      }
      return undefined;
    }

    /**
     * Preload multiple keys into cache
     * @param {Array<string>} keys - Keys to preload
     * @returns {Promise<void>}
     */
  }, {
    key: "preload",
    value: (function () {
      var _preload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(keys) {
        var _this = this;
        var promises;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              promises = keys.map(function (key) {
                return _this.getItem(key);
              });
              _context8.n = 1;
              return Promise.all(promises);
            case 1:
              return _context8.a(2);
          }
        }, _callee8);
      }));
      function preload(_x6) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
    /**
     * Remove expired cache entries
     */
    )
  }, {
    key: "cleanupCache",
    value: function cleanupCache() {
      var now = Date.now();
      var _iterator3 = _createForOfIteratorHelper(this.cache.entries()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            key = _step3$value[0],
            item = _step3$value[1];
          if (now - item.timestamp >= this.cacheTimeout) {
            this.cache["delete"](key);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    /**
     * Get cache statistics
     * @returns {Object} - Cache statistics
     */
  }, {
    key: "getCacheStats",
    value: function getCacheStats() {
      return {
        size: this.cache.size,
        timeout: this.cacheTimeout
      };
    }
  }]);
}();

var _excluded = ["email", "password"];
var LocalAuth = /*#__PURE__*/function () {
  function LocalAuth() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, LocalAuth);
    this.config = _objectSpread2({
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_',
      tokenExpiry: config.tokenExpiry || 3600
    }, config);
    this.encryptionUtils = new EncryptionUtils(this.config.encryptionKey);
    this.storageManager = new StorageManager(this.config.storagePrefix);
    this.storageManager.setEncryptionUtils(this.encryptionUtils);
    this.currentUser = null;
    this.currentToken = null;
  }

  /**
   * Create a new local account
   * @param {Object} credentials - User credentials {email, password, profile}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  return _createClass(LocalAuth, [{
    key: "signup",
    value: (function () {
      var _signup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(credentials) {
        var email, password, profile, existingUser, _this$encryptionUtils, hash, salt, user, users, loginResult, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              email = credentials.email, password = credentials.password, profile = _objectWithoutProperties(credentials, _excluded); // Validate inputs
              if (!(!email || !password)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, {
                success: false,
                error: 'Email and password are required'
              });
            case 1:
              _context.n = 2;
              return this.getUserByEmail(email);
            case 2:
              existingUser = _context.v;
              if (!existingUser) {
                _context.n = 3;
                break;
              }
              return _context.a(2, {
                success: false,
                error: 'User with this email already exists'
              });
            case 3:
              // Hash the password
              _this$encryptionUtils = this.encryptionUtils.hashPassword(password), hash = _this$encryptionUtils.hash, salt = _this$encryptionUtils.salt; // Create user object
              user = {
                id: this.generateUserId(),
                email: email.toLowerCase(),
                passwordHash: hash,
                passwordSalt: salt,
                profile: profile || {},
                createdAt: new Date().toISOString(),
                lastLoginAt: null,
                offline: true
              }; // Store user in local storage
              _context.n = 4;
              return this.getAllUsers();
            case 4:
              users = _context.v;
              users[user.email] = user;
              _context.n = 5;
              return this.storageManager.setItem('users', users);
            case 5:
              _context.n = 6;
              return this.login({
                email: email,
                password: password
              });
            case 6:
              loginResult = _context.v;
              return _context.a(2, {
                success: true,
                user: loginResult.user,
                message: 'Account created successfully'
              });
            case 7:
              _context.p = 7;
              _t = _context.v;
              console.error('Signup error:', _t);
              return _context.a(2, {
                success: false,
                error: 'Failed to create account: ' + _t.message
              });
          }
        }, _callee, this, [[0, 7]]);
      }));
      function signup(_x) {
        return _signup.apply(this, arguments);
      }
      return signup;
    }()
    /**
     * Login with local credentials
     * @param {Object} credentials - Login credentials {email, password}
     * @returns {Promise<Object>} - Result with success status and user data
     */
    )
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(credentials) {
        var email, password, user, isValid, tokenPayload, token, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              email = credentials.email, password = credentials.password;
              if (!(!email || !password)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, {
                success: false,
                error: 'Email and password are required'
              });
            case 1:
              _context2.n = 2;
              return this.getUserByEmail(email.toLowerCase());
            case 2:
              user = _context2.v;
              if (user) {
                _context2.n = 3;
                break;
              }
              return _context2.a(2, {
                success: false,
                error: 'Invalid email or password'
              });
            case 3:
              // Verify password
              isValid = this.encryptionUtils.verifyPassword(password, user.passwordHash, user.passwordSalt);
              if (isValid) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2, {
                success: false,
                error: 'Invalid email or password'
              });
            case 4:
              // Update last login time
              user.lastLoginAt = new Date().toISOString();
              _context2.n = 5;
              return this.updateUser(user);
            case 5:
              // Create token for the session
              tokenPayload = {
                userId: user.id,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + this.config.tokenExpiry
              };
              token = this.encryptionUtils.createToken(tokenPayload, this.config.tokenExpiry); // Set current user and token
              this.currentUser = user;
              this.currentToken = token;
              return _context2.a(2, {
                success: true,
                user: _objectSpread2({}, user),
                token: token,
                message: 'Login successful'
              });
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              console.error('Login error:', _t2);
              return _context2.a(2, {
                success: false,
                error: 'Failed to login: ' + _t2.message
              });
          }
        }, _callee2, this, [[0, 6]]);
      }));
      function login(_x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Logout from local authentication
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              this.currentUser = null;
              this.currentToken = null;
              return _context3.a(2, {
                success: true,
                message: 'Logged out successfully'
              });
            case 1:
              _context3.p = 1;
              _t3 = _context3.v;
              console.error('Logout error:', _t3);
              return _context3.a(2, {
                success: false,
                error: 'Failed to logout: ' + _t3.message
              });
          }
        }, _callee3, this, [[0, 1]]);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Get current authenticated user
     * @returns {Object|null} - Current user object or null
     */
    )
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return this.currentUser;
    }

    /**
     * Check if a user is authenticated
     * @returns {boolean} - True if authenticated
     */
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      if (!this.currentUser || !this.currentToken) {
        return false;
      }

      // Verify token is still valid
      var payload = this.encryptionUtils.verifyToken(this.currentToken);
      return !!payload;
    }

    /**
     * Verify the current session token
     * @returns {Promise<Object|null>} - User object if token is valid, null otherwise
     */
  }, {
    key: "verifySession",
    value: (function () {
      var _verifySession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var payload, user;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.currentToken) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, null);
            case 1:
              payload = this.encryptionUtils.verifyToken(this.currentToken);
              if (payload) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2, null);
            case 2:
              _context4.n = 3;
              return this.getUserById(payload.userId);
            case 3:
              user = _context4.v;
              if (user) {
                _context4.n = 4;
                break;
              }
              return _context4.a(2, null);
            case 4:
              // Update current user
              this.currentUser = user;
              return _context4.a(2, user);
          }
        }, _callee4, this);
      }));
      function verifySession() {
        return _verifySession.apply(this, arguments);
      }
      return verifySession;
    }()
    /**
     * Update user profile information
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "updateProfile",
    value: (function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(updates) {
        var _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (this.currentUser) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              _context5.p = 1;
              // Update user profile
              this.currentUser.profile = _objectSpread2(_objectSpread2({}, this.currentUser.profile), updates);

              // Update user in storage
              _context5.n = 2;
              return this.updateUser(this.currentUser);
            case 2:
              return _context5.a(2, {
                success: true,
                user: _objectSpread2({}, this.currentUser),
                message: 'Profile updated successfully'
              });
            case 3:
              _context5.p = 3;
              _t4 = _context5.v;
              console.error('Profile update error:', _t4);
              return _context5.a(2, {
                success: false,
                error: 'Failed to update profile: ' + _t4.message
              });
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function updateProfile(_x3) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
    /**
     * Change user password
     * @param {string} oldPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(oldPassword, newPassword) {
        var isValid, _this$encryptionUtils2, hash, salt, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (this.currentUser) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              _context6.p = 1;
              // Verify old password
              isValid = this.encryptionUtils.verifyPassword(oldPassword, this.currentUser.passwordHash, this.currentUser.passwordSalt);
              if (isValid) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2, {
                success: false,
                error: 'Current password is incorrect'
              });
            case 2:
              // Hash new password
              _this$encryptionUtils2 = this.encryptionUtils.hashPassword(newPassword), hash = _this$encryptionUtils2.hash, salt = _this$encryptionUtils2.salt; // Update password
              this.currentUser.passwordHash = hash;
              this.currentUser.passwordSalt = salt;

              // Update user in storage
              _context6.n = 3;
              return this.updateUser(this.currentUser);
            case 3:
              return _context6.a(2, {
                success: true,
                message: 'Password changed successfully'
              });
            case 4:
              _context6.p = 4;
              _t5 = _context6.v;
              console.error('Password change error:', _t5);
              return _context6.a(2, {
                success: false,
                error: 'Failed to change password: ' + _t5.message
              });
          }
        }, _callee6, this, [[1, 4]]);
      }));
      function changePassword(_x4, _x5) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Get all stored users
     * @private
     * @returns {Promise<Object>} - Object with email as keys and user objects as values
     */
    )
  }, {
    key: "getAllUsers",
    value: (function () {
      var _getAllUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var users, _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.storageManager.getItem('users');
            case 1:
              users = _context7.v;
              return _context7.a(2, users || {});
            case 2:
              _context7.p = 2;
              _t6 = _context7.v;
              console.error('Error getting all users:', _t6);
              return _context7.a(2, {});
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }
      return getAllUsers;
    }()
    /**
     * Get user by email
     * @private
     * @param {string} email - Email to search for
     * @returns {Promise<Object|null>} - User object or null
     */
    )
  }, {
    key: "getUserByEmail",
    value: (function () {
      var _getUserByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(email) {
        var users, _t7;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.getAllUsers();
            case 1:
              users = _context8.v;
              return _context8.a(2, users[email.toLowerCase()] || null);
            case 2:
              _context8.p = 2;
              _t7 = _context8.v;
              console.error('Error getting user by email:', _t7);
              return _context8.a(2, null);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function getUserByEmail(_x6) {
        return _getUserByEmail.apply(this, arguments);
      }
      return getUserByEmail;
    }()
    /**
     * Get user by ID
     * @private
     * @param {string} userId - User ID to search for
     * @returns {Promise<Object|null>} - User object or null
     */
    )
  }, {
    key: "getUserById",
    value: (function () {
      var _getUserById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(userId) {
        var users, _t8;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.getAllUsers();
            case 1:
              users = _context9.v;
              return _context9.a(2, Object.values(users).find(function (user) {
                return user.id === userId;
              }) || null);
            case 2:
              _context9.p = 2;
              _t8 = _context9.v;
              console.error('Error getting user by ID:', _t8);
              return _context9.a(2, null);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function getUserById(_x7) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
    /**
     * Update user in storage
     * @private
     * @param {Object} user - User object to update
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "updateUser",
    value: (function () {
      var _updateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(user) {
        var users, _t9;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.getAllUsers();
            case 1:
              users = _context0.v;
              users[user.email.toLowerCase()] = user;
              _context0.n = 2;
              return this.storageManager.setItem('users', users);
            case 2:
              _context0.n = 4;
              break;
            case 3:
              _context0.p = 3;
              _t9 = _context0.v;
              console.error('Error updating user:', _t9);
              throw _t9;
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 3]]);
      }));
      function updateUser(_x8) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
    /**
     * Generate a unique user ID
     * @private
     * @returns {string} - Generated user ID
     */
    )
  }, {
    key: "generateUserId",
    value: function generateUserId() {
      return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Delete current user account
     * @returns {Promise<Object>} - Result with success status
     */
  }, {
    key: "deleteAccount",
    value: (function () {
      var _deleteAccount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var users, _t0;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              if (this.currentUser) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              _context1.p = 1;
              _context1.n = 2;
              return this.getAllUsers();
            case 2:
              users = _context1.v;
              delete users[this.currentUser.email.toLowerCase()];
              _context1.n = 3;
              return this.storageManager.setItem('users', users);
            case 3:
              // Clear current user
              this.currentUser = null;
              this.currentToken = null;
              return _context1.a(2, {
                success: true,
                message: 'Account deleted successfully'
              });
            case 4:
              _context1.p = 4;
              _t0 = _context1.v;
              console.error('Account deletion error:', _t0);
              return _context1.a(2, {
                success: false,
                error: 'Failed to delete account: ' + _t0.message
              });
          }
        }, _callee1, this, [[1, 4]]);
      }));
      function deleteAccount() {
        return _deleteAccount.apply(this, arguments);
      }
      return deleteAccount;
    }())
  }]);
}();

/**
 * OnlineAuth - Online authentication system
 * Handles authentication with online services like Supabase
 */
var OnlineAuth = /*#__PURE__*/function () {
  function OnlineAuth() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, OnlineAuth);
    this.config = _objectSpread2({
      provider: config.provider || 'default',
      // 'supabase', 'firebase', etc.
      apiUrl: config.apiUrl,
      apiKey: config.apiKey,
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_'
    }, config);
    this.provider = this.initializeProvider();
    this.currentUser = null;
    this.currentToken = null;
  }

  /**
   * Initialize the authentication provider based on config
   * @private
   */
  return _createClass(OnlineAuth, [{
    key: "initializeProvider",
    value: function initializeProvider() {
      switch (this.config.provider.toLowerCase()) {
        case 'supabase':
          return new SupabaseAdapter(this.config);
        case 'firebase':
          return new FirebaseAuthAdapter(this.config);
        case 'auth0':
          return new Auth0Adapter(this.config);
        default:
          return new DefaultOnlineAdapter(this.config);
      }
    }

    /**
     * Login with online credentials
     * @param {Object} credentials - Login credentials {email, password}
     * @returns {Promise<Object>} - Result with success status and user data
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(credentials) {
        var result, _result$session, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.provider.login(credentials);
            case 1:
              result = _context.v;
              if (result.success) {
                this.currentUser = result.user;
                this.currentToken = result.token || ((_result$session = result.session) === null || _result$session === void 0 ? void 0 : _result$session.access_token);
              }
              return _context.a(2, result);
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Online login error:', _t);
              return _context.a(2, {
                success: false,
                error: 'Failed to login: ' + _t.message
              });
          }
        }, _callee, this, [[0, 2]]);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Signup with online service
     * @param {Object} credentials - User credentials {email, password, profile}
     * @returns {Promise<Object>} - Result with success status and user data
     */
    )
  }, {
    key: "signup",
    value: (function () {
      var _signup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(credentials) {
        var result, _result$session2, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.provider.signup(credentials);
            case 1:
              result = _context2.v;
              if (result.success) {
                this.currentUser = result.user;
                this.currentToken = result.token || ((_result$session2 = result.session) === null || _result$session2 === void 0 ? void 0 : _result$session2.access_token);
              }
              return _context2.a(2, result);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              console.error('Online signup error:', _t2);
              return _context2.a(2, {
                success: false,
                error: 'Failed to signup: ' + _t2.message
              });
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function signup(_x2) {
        return _signup.apply(this, arguments);
      }
      return signup;
    }()
    /**
     * Logout from online service
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var result, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.provider.logout();
            case 1:
              result = _context3.v;
              this.currentUser = null;
              this.currentToken = null;
              return _context3.a(2, result);
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              console.error('Online logout error:', _t3);
              return _context3.a(2, {
                success: false,
                error: 'Failed to logout: ' + _t3.message
              });
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Get current authenticated user
     * @returns {Object|null} - Current user object or null
     */
    )
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return this.currentUser;
    }

    /**
     * Check if a user is authenticated online
     * @returns {boolean} - True if authenticated
     */
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return !!this.currentUser && !!this.currentToken;
    }

    /**
     * Verify the current session with the online provider
     * @returns {Promise<Object|null>} - User object if session is valid, null otherwise
     */
  }, {
    key: "verifySession",
    value: (function () {
      var _verifySession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var result, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              if (this.currentToken) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, null);
            case 1:
              _context4.n = 2;
              return this.provider.verifySession(this.currentToken);
            case 2:
              result = _context4.v;
              if (!result.success) {
                _context4.n = 3;
                break;
              }
              this.currentUser = result.user;
              return _context4.a(2, result.user);
            case 3:
              return _context4.a(2, null);
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              console.error('Session verification error:', _t4);
              return _context4.a(2, null);
          }
        }, _callee4, this, [[0, 4]]);
      }));
      function verifySession() {
        return _verifySession.apply(this, arguments);
      }
      return verifySession;
    }()
    /**
     * Refresh the current session token
     * @returns {Promise<Object>} - Result with success status and new token
     */
    )
  }, {
    key: "refreshToken",
    value: (function () {
      var _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var result, _result$session3, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              if (this.currentToken) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, {
                success: false,
                error: 'No token to refresh'
              });
            case 1:
              _context5.n = 2;
              return this.provider.refreshToken(this.currentToken);
            case 2:
              result = _context5.v;
              if (result.success) {
                this.currentToken = result.token || ((_result$session3 = result.session) === null || _result$session3 === void 0 ? void 0 : _result$session3.access_token);
              }
              return _context5.a(2, result);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              console.error('Token refresh error:', _t5);
              return _context5.a(2, {
                success: false,
                error: 'Failed to refresh token: ' + _t5.message
              });
          }
        }, _callee5, this, [[0, 3]]);
      }));
      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
    /**
     * Request password reset
     * @param {string} email - Email to send reset link to
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "requestPasswordReset",
    value: (function () {
      var _requestPasswordReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(email) {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.provider.requestPasswordReset(email);
            case 1:
              return _context6.a(2, _context6.v);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              console.error('Password reset request error:', _t6);
              return _context6.a(2, {
                success: false,
                error: 'Failed to request password reset: ' + _t6.message
              });
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function requestPasswordReset(_x3) {
        return _requestPasswordReset.apply(this, arguments);
      }
      return requestPasswordReset;
    }()
    /**
     * Reset password with token
     * @param {string} token - Reset token
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "resetPassword",
    value: (function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(token, newPassword) {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.provider.resetPassword(token, newPassword);
            case 1:
              return _context7.a(2, _context7.v);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              console.error('Password reset error:', _t7);
              return _context7.a(2, {
                success: false,
                error: 'Failed to reset password: ' + _t7.message
              });
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function resetPassword(_x4, _x5) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
    /**
     * Update user profile information
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} - Result with success status
     */
    )
  }, {
    key: "updateProfile",
    value: (function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(updates) {
        var result, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              if (this.currentUser) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              _context8.n = 2;
              return this.provider.updateProfile(this.currentUser.id, updates);
            case 2:
              result = _context8.v;
              if (result.success) {
                this.currentUser = _objectSpread2(_objectSpread2({}, this.currentUser), updates);
              }
              return _context8.a(2, result);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              console.error('Profile update error:', _t8);
              return _context8.a(2, {
                success: false,
                error: 'Failed to update profile: ' + _t8.message
              });
          }
        }, _callee8, this, [[0, 3]]);
      }));
      function updateProfile(_x6) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
    /**
     * Authenticate access to a specific resource
     * @param {string} resourceUrl - URL of the resource to access
     * @param {Object} user - User object
     * @returns {Promise<Object>} - Result with access status
     */
    )
  }, {
    key: "authenticateResource",
    value: (function () {
      var _authenticateResource = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(resourceUrl, user) {
        var _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.provider.authenticateResource(resourceUrl, user);
            case 1:
              return _context9.a(2, _context9.v);
            case 2:
              _context9.p = 2;
              _t9 = _context9.v;
              console.error('Resource authentication error:', _t9);
              return _context9.a(2, {
                success: false,
                error: 'Failed to authenticate resource access: ' + _t9.message
              });
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function authenticateResource(_x7, _x8) {
        return _authenticateResource.apply(this, arguments);
      }
      return authenticateResource;
    }()
    /**
     * Get user's available permissions
     * @returns {Promise<Object>} - Permissions object
     */
    )
  }, {
    key: "getUserPermissions",
    value: (function () {
      var _getUserPermissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              if (this.currentUser) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              _context0.n = 2;
              return this.provider.getUserPermissions(this.currentUser.id);
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              console.error('Get user permissions error:', _t0);
              return _context0.a(2, {
                success: false,
                error: 'Failed to get user permissions: ' + _t0.message
              });
          }
        }, _callee0, this, [[0, 3]]);
      }));
      function getUserPermissions() {
        return _getUserPermissions.apply(this, arguments);
      }
      return getUserPermissions;
    }())
  }]);
}(); // Base adapter class
var BaseAdapter = /*#__PURE__*/function () {
  function BaseAdapter(config) {
    _classCallCheck(this, BaseAdapter);
    this.config = config;
  }
  return _createClass(BaseAdapter, [{
    key: "login",
    value: function () {
      var _login2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(credentials) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              throw new Error('Login method must be implemented by subclass');
            case 1:
              return _context1.a(2);
          }
        }, _callee1);
      }));
      function login(_x9) {
        return _login2.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(credentials) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              throw new Error('Signup method must be implemented by subclass');
            case 1:
              return _context10.a(2);
          }
        }, _callee10);
      }));
      function signup(_x0) {
        return _signup2.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              throw new Error('Logout method must be implemented by subclass');
            case 1:
              return _context11.a(2);
          }
        }, _callee11);
      }));
      function logout() {
        return _logout2.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "verifySession",
    value: function () {
      var _verifySession2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(token) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              throw new Error('VerifySession method must be implemented by subclass');
            case 1:
              return _context12.a(2);
          }
        }, _callee12);
      }));
      function verifySession(_x1) {
        return _verifySession2.apply(this, arguments);
      }
      return verifySession;
    }()
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(token) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              throw new Error('RefreshToken method must be implemented by subclass');
            case 1:
              return _context13.a(2);
          }
        }, _callee13);
      }));
      function refreshToken(_x10) {
        return _refreshToken2.apply(this, arguments);
      }
      return refreshToken;
    }()
  }, {
    key: "requestPasswordReset",
    value: function () {
      var _requestPasswordReset2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(email) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              throw new Error('RequestPasswordReset method must be implemented by subclass');
            case 1:
              return _context14.a(2);
          }
        }, _callee14);
      }));
      function requestPasswordReset(_x11) {
        return _requestPasswordReset2.apply(this, arguments);
      }
      return requestPasswordReset;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(token, newPassword) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              throw new Error('ResetPassword method must be implemented by subclass');
            case 1:
              return _context15.a(2);
          }
        }, _callee15);
      }));
      function resetPassword(_x12, _x13) {
        return _resetPassword2.apply(this, arguments);
      }
      return resetPassword;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(userId, updates) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              throw new Error('UpdateProfile method must be implemented by subclass');
            case 1:
              return _context16.a(2);
          }
        }, _callee16);
      }));
      function updateProfile(_x14, _x15) {
        return _updateProfile2.apply(this, arguments);
      }
      return updateProfile;
    }()
  }, {
    key: "authenticateResource",
    value: function () {
      var _authenticateResource2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(resourceUrl, user) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              throw new Error('AuthenticateResource method must be implemented by subclass');
            case 1:
              return _context17.a(2);
          }
        }, _callee17);
      }));
      function authenticateResource(_x16, _x17) {
        return _authenticateResource2.apply(this, arguments);
      }
      return authenticateResource;
    }()
  }, {
    key: "getUserPermissions",
    value: function () {
      var _getUserPermissions2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(userId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              throw new Error('GetUserPermissions method must be implemented by subclass');
            case 1:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      function getUserPermissions(_x18) {
        return _getUserPermissions2.apply(this, arguments);
      }
      return getUserPermissions;
    }()
  }]);
}(); // Supabase adapter
var SupabaseAdapter = /*#__PURE__*/function (_BaseAdapter) {
  function SupabaseAdapter(config) {
    var _this;
    _classCallCheck(this, SupabaseAdapter);
    _this = _callSuper(this, SupabaseAdapter, [config]);

    // Import Supabase client if available, otherwise use fetch
    _this.supabaseUrl = config.supabaseUrl;
    _this.supabaseKey = config.supabaseKey;
    _this.initialized = false;
    return _this;
  }
  _inherits(SupabaseAdapter, _BaseAdapter);
  return _createClass(SupabaseAdapter, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var _yield$import, createClient;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              if (!this.initialized) {
                _context19.n = 1;
                break;
              }
              return _context19.a(2);
            case 1:
              _context19.p = 1;
              _context19.n = 2;
              return import('@supabase/supabase-js');
            case 2:
              _yield$import = _context19.v;
              createClient = _yield$import.createClient;
              this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
              this.initialized = true;
              _context19.n = 4;
              break;
            case 3:
              _context19.p = 3;
              _context19.v;
              console.warn('Supabase client not available, using fetch API instead');
              // Fallback to fetch-based implementation
              this.initialized = true;
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "login",
    value: function () {
      var _login3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(credentials) {
        var _data$session, _yield$this$supabase$, data, error, response, result, _result$error, _t10;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.n = 1;
              return this.initialize();
            case 1:
              _context20.p = 1;
              if (!this.supabase) {
                _context20.n = 4;
                break;
              }
              _context20.n = 2;
              return this.supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
              });
            case 2:
              _yield$this$supabase$ = _context20.v;
              data = _yield$this$supabase$.data;
              error = _yield$this$supabase$.error;
              if (!error) {
                _context20.n = 3;
                break;
              }
              throw new Error(error.message);
            case 3:
              return _context20.a(2, {
                success: true,
                user: this.formatUser(data.user),
                token: (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token,
                session: data.session
              });
            case 4:
              _context20.n = 5;
              return fetch("".concat(this.supabaseUrl, "/auth/v1/token?grant_type=password"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': this.supabaseKey,
                  'Authorization': "Bearer ".concat(this.supabaseKey)
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password
                })
              });
            case 5:
              response = _context20.v;
              _context20.n = 6;
              return response.json();
            case 6:
              result = _context20.v;
              if (response.ok) {
                _context20.n = 7;
                break;
              }
              throw new Error(((_result$error = result.error) === null || _result$error === void 0 ? void 0 : _result$error.message) || 'Login failed');
            case 7:
              return _context20.a(2, {
                success: true,
                user: this.formatUser(result.user),
                token: result.access_token,
                session: result
              });
            case 8:
              _context20.n = 10;
              break;
            case 9:
              _context20.p = 9;
              _t10 = _context20.v;
              return _context20.a(2, {
                success: false,
                error: _t10.message
              });
            case 10:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 9]]);
      }));
      function login(_x19) {
        return _login3.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(credentials) {
        var _data$session2, _yield$this$supabase$2, data, error, response, result, _result$error2, _t11;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.n = 1;
              return this.initialize();
            case 1:
              _context21.p = 1;
              if (!this.supabase) {
                _context21.n = 4;
                break;
              }
              _context21.n = 2;
              return this.supabase.auth.signUp({
                email: credentials.email,
                password: credentials.password,
                options: {
                  data: credentials.profile || {}
                }
              });
            case 2:
              _yield$this$supabase$2 = _context21.v;
              data = _yield$this$supabase$2.data;
              error = _yield$this$supabase$2.error;
              if (!error) {
                _context21.n = 3;
                break;
              }
              throw new Error(error.message);
            case 3:
              return _context21.a(2, {
                success: true,
                user: this.formatUser(data.user),
                token: (_data$session2 = data.session) === null || _data$session2 === void 0 ? void 0 : _data$session2.access_token,
                session: data.session
              });
            case 4:
              _context21.n = 5;
              return fetch("".concat(this.supabaseUrl, "/auth/v1/signup"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': this.supabaseKey,
                  'Authorization': "Bearer ".concat(this.supabaseKey)
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                  data: credentials.profile || {}
                })
              });
            case 5:
              response = _context21.v;
              _context21.n = 6;
              return response.json();
            case 6:
              result = _context21.v;
              if (response.ok) {
                _context21.n = 7;
                break;
              }
              throw new Error(((_result$error2 = result.error) === null || _result$error2 === void 0 ? void 0 : _result$error2.message) || 'Signup failed');
            case 7:
              return _context21.a(2, {
                success: true,
                user: this.formatUser(result.user),
                token: result.access_token,
                session: result
              });
            case 8:
              _context21.n = 10;
              break;
            case 9:
              _context21.p = 9;
              _t11 = _context21.v;
              return _context21.a(2, {
                success: false,
                error: _t11.message
              });
            case 10:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 9]]);
      }));
      function signup(_x20) {
        return _signup3.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
        var _yield$this$supabase$3, error, _t12;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.n = 1;
              return this.initialize();
            case 1:
              _context22.p = 1;
              if (!this.supabase) {
                _context22.n = 4;
                break;
              }
              _context22.n = 2;
              return this.supabase.auth.signOut();
            case 2:
              _yield$this$supabase$3 = _context22.v;
              error = _yield$this$supabase$3.error;
              if (!error) {
                _context22.n = 3;
                break;
              }
              throw new Error(error.message);
            case 3:
              _context22.n = 5;
              break;
            case 4:
              // For fetch implementation, we clear the token locally
              // Actual server-side logout would require additional endpoint
              localStorage.removeItem('supabase_token');
            case 5:
              return _context22.a(2, {
                success: true,
                message: 'Logged out successfully'
              });
            case 6:
              _context22.p = 6;
              _t12 = _context22.v;
              return _context22.a(2, {
                success: false,
                error: _t12.message
              });
          }
        }, _callee22, this, [[1, 6]]);
      }));
      function logout() {
        return _logout3.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "verifySession",
    value: function () {
      var _verifySession3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(token) {
        var _yield$this$supabase$4, data, error, response, user, _user$error, _t13;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.n = 1;
              return this.initialize();
            case 1:
              _context23.p = 1;
              if (!this.supabase) {
                _context23.n = 4;
                break;
              }
              _context23.n = 2;
              return this.supabase.auth.getUser(token);
            case 2:
              _yield$this$supabase$4 = _context23.v;
              data = _yield$this$supabase$4.data;
              error = _yield$this$supabase$4.error;
              if (!error) {
                _context23.n = 3;
                break;
              }
              throw new Error(error.message);
            case 3:
              return _context23.a(2, {
                success: true,
                user: this.formatUser(data.user)
              });
            case 4:
              _context23.n = 5;
              return fetch("".concat(this.supabaseUrl, "/auth/v1/user"), {
                method: 'GET',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'apikey': this.supabaseKey
                }
              });
            case 5:
              response = _context23.v;
              _context23.n = 6;
              return response.json();
            case 6:
              user = _context23.v;
              if (response.ok) {
                _context23.n = 7;
                break;
              }
              throw new Error(((_user$error = user.error) === null || _user$error === void 0 ? void 0 : _user$error.message) || 'Session verification failed');
            case 7:
              return _context23.a(2, {
                success: true,
                user: this.formatUser(user)
              });
            case 8:
              _context23.n = 10;
              break;
            case 9:
              _context23.p = 9;
              _t13 = _context23.v;
              return _context23.a(2, {
                success: false,
                error: _t13.message
              });
            case 10:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 9]]);
      }));
      function verifySession(_x21) {
        return _verifySession3.apply(this, arguments);
      }
      return verifySession;
    }()
  }, {
    key: "formatUser",
    value: function formatUser(user) {
      return {
        id: user.id,
        email: user.email,
        aud: user.aud,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        profile: user.user_metadata || user.app_metadata || {},
        online: true
      };
    }
  }]);
}(BaseAdapter); // Firebase adapter (simplified)
var FirebaseAuthAdapter = /*#__PURE__*/function (_BaseAdapter2) {
  function FirebaseAuthAdapter(config) {
    var _this2;
    _classCallCheck(this, FirebaseAuthAdapter);
    _this2 = _callSuper(this, FirebaseAuthAdapter, [config]);
    _this2.apiKey = config.apiKey;
    _this2.authDomain = config.authDomain;
    return _this2;
  }
  _inherits(FirebaseAuthAdapter, _BaseAdapter2);
  return _createClass(FirebaseAuthAdapter, [{
    key: "login",
    value: function () {
      var _login4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(credentials) {
        var response, result, _result$error3, _t14;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=".concat(this.apiKey), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                  returnSecureToken: true
                })
              });
            case 1:
              response = _context24.v;
              _context24.n = 2;
              return response.json();
            case 2:
              result = _context24.v;
              if (response.ok) {
                _context24.n = 3;
                break;
              }
              throw new Error(((_result$error3 = result.error) === null || _result$error3 === void 0 ? void 0 : _result$error3.message) || 'Login failed');
            case 3:
              return _context24.a(2, {
                success: true,
                user: this.formatUser(result),
                token: result.idToken
              });
            case 4:
              _context24.p = 4;
              _t14 = _context24.v;
              return _context24.a(2, {
                success: false,
                error: _t14.message
              });
          }
        }, _callee24, this, [[0, 4]]);
      }));
      function login(_x22) {
        return _login4.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(credentials) {
        var response, result, _result$error4, _t15;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=".concat(this.apiKey), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                  returnSecureToken: true
                })
              });
            case 1:
              response = _context25.v;
              _context25.n = 2;
              return response.json();
            case 2:
              result = _context25.v;
              if (response.ok) {
                _context25.n = 3;
                break;
              }
              throw new Error(((_result$error4 = result.error) === null || _result$error4 === void 0 ? void 0 : _result$error4.message) || 'Signup failed');
            case 3:
              return _context25.a(2, {
                success: true,
                user: this.formatUser(result),
                token: result.idToken
              });
            case 4:
              _context25.p = 4;
              _t15 = _context25.v;
              return _context25.a(2, {
                success: false,
                error: _t15.message
              });
          }
        }, _callee25, this, [[0, 4]]);
      }));
      function signup(_x23) {
        return _signup4.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              return _context26.a(2, {
                success: true,
                message: 'Logged out successfully'
              });
          }
        }, _callee26);
      }));
      function logout() {
        return _logout4.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "verifySession",
    value: function () {
      var _verifySession4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(token) {
        var response, result, _t16;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              _context27.p = 0;
              _context27.n = 1;
              return fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=".concat(this.apiKey), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  idToken: token
                })
              });
            case 1:
              response = _context27.v;
              _context27.n = 2;
              return response.json();
            case 2:
              result = _context27.v;
              if (!(!response.ok || !result.users || result.users.length === 0)) {
                _context27.n = 3;
                break;
              }
              throw new Error('Invalid session');
            case 3:
              return _context27.a(2, {
                success: true,
                user: this.formatUser(result.users[0])
              });
            case 4:
              _context27.p = 4;
              _t16 = _context27.v;
              return _context27.a(2, {
                success: false,
                error: _t16.message
              });
          }
        }, _callee27, this, [[0, 4]]);
      }));
      function verifySession(_x24) {
        return _verifySession4.apply(this, arguments);
      }
      return verifySession;
    }()
  }, {
    key: "formatUser",
    value: function formatUser(userData) {
      return {
        id: userData.localId || userData.id,
        email: userData.email,
        emailVerified: userData.emailVerified || false,
        createdAt: userData.createdAt,
        lastLoginAt: userData.lastLoginAt,
        profile: userData,
        online: true
      };
    }
  }]);
}(BaseAdapter); // Auth0 adapter (simplified)
var Auth0Adapter = /*#__PURE__*/function (_BaseAdapter3) {
  function Auth0Adapter(config) {
    var _this3;
    _classCallCheck(this, Auth0Adapter);
    _this3 = _callSuper(this, Auth0Adapter, [config]);
    _this3.domain = config.domain;
    _this3.clientId = config.clientId;
    _this3.clientSecret = config.clientSecret;
    return _this3;
  }
  _inherits(Auth0Adapter, _BaseAdapter3);
  return _createClass(Auth0Adapter, [{
    key: "login",
    value: function () {
      var _login5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(credentials) {
        var response, result, _t17, _t18, _t19;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              _context28.n = 1;
              return fetch("https://".concat(this.domain, "/oauth/token"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  grant_type: 'password',
                  username: credentials.email,
                  password: credentials.password,
                  client_id: this.clientId,
                  client_secret: this.clientSecret,
                  audience: "https://".concat(this.domain, "/api/v2/"),
                  scope: 'openid profile email'
                })
              });
            case 1:
              response = _context28.v;
              _context28.n = 2;
              return response.json();
            case 2:
              result = _context28.v;
              if (response.ok) {
                _context28.n = 3;
                break;
              }
              throw new Error(result.error_description || 'Login failed');
            case 3:
              _context28.n = 4;
              return this.getUserInfo(result.access_token);
            case 4:
              _t17 = _context28.v;
              _t18 = result.access_token;
              return _context28.a(2, {
                success: true,
                user: _t17,
                token: _t18
              });
            case 5:
              _context28.p = 5;
              _t19 = _context28.v;
              return _context28.a(2, {
                success: false,
                error: _t19.message
              });
          }
        }, _callee28, this, [[0, 5]]);
      }));
      function login(_x25) {
        return _login5.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(credentials) {
        var response, result, _result$error5, _t20;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              _context29.p = 0;
              _context29.n = 1;
              return fetch("https://".concat(this.domain, "/dbconnections/signup"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  client_id: this.clientId,
                  email: credentials.email,
                  password: credentials.password,
                  connection: 'Username-Password-Authentication',
                  user_metadata: credentials.profile || {}
                })
              });
            case 1:
              response = _context29.v;
              _context29.n = 2;
              return response.json();
            case 2:
              result = _context29.v;
              if (response.ok) {
                _context29.n = 3;
                break;
              }
              throw new Error(((_result$error5 = result.error) === null || _result$error5 === void 0 ? void 0 : _result$error5.description) || 'Signup failed');
            case 3:
              _context29.n = 4;
              return this.login(credentials);
            case 4:
              return _context29.a(2, _context29.v);
            case 5:
              _context29.p = 5;
              _t20 = _context29.v;
              return _context29.a(2, {
                success: false,
                error: _t20.message
              });
          }
        }, _callee29, this, [[0, 5]]);
      }));
      function signup(_x26) {
        return _signup5.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(accessToken) {
        var response, userInfo, _t21;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              _context30.n = 1;
              return fetch("https://".concat(this.domain, "/userinfo"), {
                headers: {
                  'Authorization': "Bearer ".concat(accessToken)
                }
              });
            case 1:
              response = _context30.v;
              _context30.n = 2;
              return response.json();
            case 2:
              userInfo = _context30.v;
              return _context30.a(2, {
                id: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                nickname: userInfo.nickname,
                picture: userInfo.picture,
                profile: userInfo,
                online: true
              });
            case 3:
              _context30.p = 3;
              _t21 = _context30.v;
              throw new Error('Failed to get user info: ' + _t21.message);
            case 4:
              return _context30.a(2);
          }
        }, _callee30, this, [[0, 3]]);
      }));
      function getUserInfo(_x27) {
        return _getUserInfo.apply(this, arguments);
      }
      return getUserInfo;
    }()
  }, {
    key: "verifySession",
    value: function () {
      var _verifySession5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(token) {
        var user, _t22;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              _context31.p = 0;
              _context31.n = 1;
              return this.getUserInfo(token);
            case 1:
              user = _context31.v;
              return _context31.a(2, {
                success: true,
                user: user
              });
            case 2:
              _context31.p = 2;
              _t22 = _context31.v;
              return _context31.a(2, {
                success: false,
                error: _t22.message
              });
          }
        }, _callee31, this, [[0, 2]]);
      }));
      function verifySession(_x28) {
        return _verifySession5.apply(this, arguments);
      }
      return verifySession;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              return _context32.a(2, {
                success: true,
                message: 'Logged out successfully'
              });
          }
        }, _callee32);
      }));
      function logout() {
        return _logout5.apply(this, arguments);
      }
      return logout;
    }()
  }]);
}(BaseAdapter); // Default adapter for custom providers
var DefaultOnlineAdapter = /*#__PURE__*/function (_BaseAdapter4) {
  function DefaultOnlineAdapter(config) {
    var _this4;
    _classCallCheck(this, DefaultOnlineAdapter);
    _this4 = _callSuper(this, DefaultOnlineAdapter, [config]);
    _this4.apiUrl = config.apiUrl;
    _this4.apiKey = config.apiKey;
    return _this4;
  }
  _inherits(DefaultOnlineAdapter, _BaseAdapter4);
  return _createClass(DefaultOnlineAdapter, [{
    key: "login",
    value: function () {
      var _login6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(credentials) {
        var response, result, _t23;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              _context33.p = 0;
              _context33.n = 1;
              return fetch("".concat(this.apiUrl, "/login"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(this.apiKey)
                },
                body: JSON.stringify(credentials)
              });
            case 1:
              response = _context33.v;
              _context33.n = 2;
              return response.json();
            case 2:
              result = _context33.v;
              if (response.ok) {
                _context33.n = 3;
                break;
              }
              throw new Error(result.message || 'Login failed');
            case 3:
              return _context33.a(2, {
                success: true,
                user: result.user,
                token: result.token
              });
            case 4:
              _context33.p = 4;
              _t23 = _context33.v;
              return _context33.a(2, {
                success: false,
                error: _t23.message
              });
          }
        }, _callee33, this, [[0, 4]]);
      }));
      function login(_x29) {
        return _login6.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(credentials) {
        var response, result, _t24;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              _context34.p = 0;
              _context34.n = 1;
              return fetch("".concat(this.apiUrl, "/signup"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(this.apiKey)
                },
                body: JSON.stringify(credentials)
              });
            case 1:
              response = _context34.v;
              _context34.n = 2;
              return response.json();
            case 2:
              result = _context34.v;
              if (response.ok) {
                _context34.n = 3;
                break;
              }
              throw new Error(result.message || 'Signup failed');
            case 3:
              return _context34.a(2, {
                success: true,
                user: result.user,
                token: result.token
              });
            case 4:
              _context34.p = 4;
              _t24 = _context34.v;
              return _context34.a(2, {
                success: false,
                error: _t24.message
              });
          }
        }, _callee34, this, [[0, 4]]);
      }));
      function signup(_x30) {
        return _signup6.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35() {
        var _t25;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              _context35.p = 0;
              _context35.n = 1;
              return fetch("".concat(this.apiUrl, "/logout"), {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer ".concat(this.apiKey),
                  'Content-Type': 'application/json'
                }
              });
            case 1:
              return _context35.a(2, {
                success: true,
                message: 'Logged out successfully'
              });
            case 2:
              _context35.p = 2;
              _t25 = _context35.v;
              return _context35.a(2, {
                success: false,
                error: _t25.message
              });
          }
        }, _callee35, this, [[0, 2]]);
      }));
      function logout() {
        return _logout6.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "verifySession",
    value: function () {
      var _verifySession6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(token) {
        var response, result, _t26;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              _context36.p = 0;
              _context36.n = 1;
              return fetch("".concat(this.apiUrl, "/verify"), {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 1:
              response = _context36.v;
              _context36.n = 2;
              return response.json();
            case 2:
              result = _context36.v;
              if (response.ok) {
                _context36.n = 3;
                break;
              }
              throw new Error(result.message || 'Session verification failed');
            case 3:
              return _context36.a(2, {
                success: true,
                user: result.user
              });
            case 4:
              _context36.p = 4;
              _t26 = _context36.v;
              return _context36.a(2, {
                success: false,
                error: _t26.message
              });
          }
        }, _callee36, this, [[0, 4]]);
      }));
      function verifySession(_x31) {
        return _verifySession6.apply(this, arguments);
      }
      return verifySession;
    }()
  }]);
}(BaseAdapter);

/**
 * NetworkManager - Network status detection and management
 * Handles online/offline detection and network-related functionality
 */
var NetworkManager = /*#__PURE__*/function () {
  function NetworkManager() {
    _classCallCheck(this, NetworkManager);
    this.isOnlineStatus = navigator.onLine;
    this.listeners = [];
    this.checkInterval = null;
    this.checkUrl = 'https://httpbin.org/get'; // URL to check connectivity
    this.timeout = 5000; // 5 seconds timeout
  }

  /**
   * Check if the browser is currently online
   * @returns {Promise<boolean>} - True if online, false otherwise
   */
  return _createClass(NetworkManager, [{
    key: "isOnline",
    value: (function () {
      var _isOnline = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (navigator.onLine) {
                _context.n = 1;
                break;
              }
              this.isOnlineStatus = false;
              return _context.a(2, false);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return this.ping();
            case 2:
              this.isOnlineStatus = true;
              return _context.a(2, true);
            case 3:
              _context.p = 3;
              _context.v;
              this.isOnlineStatus = false;
              return _context.a(2, false);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function isOnline() {
        return _isOnline.apply(this, arguments);
      }
      return isOnline;
    }()
    /**
     * Ping a URL to check actual connectivity
     * @param {string} url - URL to ping (optional, defaults to checkUrl)
     * @returns {Promise<boolean>} - True if ping successful
     */
    )
  }, {
    key: "ping",
    value: (function () {
      var _ping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this = this;
        var url,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : this.checkUrl;
              return _context2.a(2, new Promise(function (resolve, reject) {
                var controller = new AbortController();
                var timeoutId = setTimeout(function () {
                  controller.abort();
                  reject(new Error('Network check timeout'));
                }, _this.timeout);
                fetch(url, {
                  method: 'GET',
                  mode: 'cors',
                  signal: controller.signal
                }).then(function (response) {
                  clearTimeout(timeoutId);
                  if (response.ok) {
                    resolve(true);
                  } else {
                    reject(new Error("Network check failed with status: ".concat(response.status)));
                  }
                })["catch"](function (error) {
                  clearTimeout(timeoutId);
                  reject(error);
                });
              }));
          }
        }, _callee2, this);
      }));
      function ping() {
        return _ping.apply(this, arguments);
      }
      return ping;
    }()
    /**
     * Start monitoring network status changes
     * @param {number} interval - Interval in milliseconds to check connectivity (optional)
     */
    )
  }, {
    key: "startMonitoring",
    value: function startMonitoring() {
      var _this2 = this;
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;
      // Set up browser online/offline event listeners
      window.addEventListener('online', this.handleOnline.bind(this));
      window.addEventListener('offline', this.handleOffline.bind(this));

      // Set up periodic connectivity checks
      if (interval > 0) {
        this.checkInterval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var currentStatus;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this2.isOnline();
              case 1:
                currentStatus = _context3.v;
                if (currentStatus !== _this2.isOnlineStatus) {
                  _this2.isOnlineStatus = currentStatus;
                  _this2.notifyListeners(currentStatus);
                }
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        })), interval);
      }
    }

    /**
     * Stop monitoring network status changes
     */
  }, {
    key: "stopMonitoring",
    value: function stopMonitoring() {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }
    }

    /**
     * Handle online event
     * @private
     */
  }, {
    key: "handleOnline",
    value: function handleOnline() {
      this.isOnlineStatus = true;
      this.notifyListeners(true);
    }

    /**
     * Handle offline event
     * @private
     */
  }, {
    key: "handleOffline",
    value: function handleOffline() {
      this.isOnlineStatus = false;
      this.notifyListeners(false);
    }

    /**
     * Add a listener for network status changes
     * @param {Function} callback - Callback function to call when status changes
     * @returns {Function} - Function to remove the listener
     */
  }, {
    key: "addStatusListener",
    value: function addStatusListener(callback) {
      var _this3 = this;
      this.listeners.push(callback);

      // Return a function to remove the listener
      return function () {
        var index = _this3.listeners.indexOf(callback);
        if (index > -1) {
          _this3.listeners.splice(index, 1);
        }
      };
    }

    /**
     * Notify all listeners of status change
     * @private
     * @param {boolean} isOnline - New online status
     */
  }, {
    key: "notifyListeners",
    value: function notifyListeners(isOnline) {
      this.listeners.forEach(function (callback) {
        try {
          callback(isOnline);
        } catch (error) {
          console.error('Error in network status listener:', error);
        }
      });
    }

    /**
     * Get current network status
     * @returns {boolean} - Current online status
     */
  }, {
    key: "getCurrentStatus",
    value: function getCurrentStatus() {
      return this.isOnlineStatus;
    }

    /**
     * Set the URL to use for connectivity checks
     * @param {string} url - URL to check
     */
  }, {
    key: "setCheckUrl",
    value: function setCheckUrl(url) {
      this.checkUrl = url;
    }

    /**
     * Set the timeout for connectivity checks
     * @param {number} timeout - Timeout in milliseconds
     */
  }, {
    key: "setTimeout",
    value: function setTimeout(timeout) {
      this.timeout = timeout;
    }
  }]);
}();

var AuthOrchestrator = /*#__PURE__*/function () {
  function AuthOrchestrator() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AuthOrchestrator);
    this.config = _objectSpread2({
      encryptionKey: config.encryptionKey || 'default-encryption-key',
      storagePrefix: config.storagePrefix || 'tab_auth_',
      syncInterval: config.syncInterval || 30000
    }, config);
    this.localAuth = new LocalAuth(this.config);
    this.onlineAuth = new OnlineAuth(this.config);
    this.networkManager = new NetworkManager();
    this.storageManager = new StorageManager(this.config.storagePrefix);
    this.encryptionUtils = new EncryptionUtils(this.config.encryptionKey);
    this.isOnline = true;
    this.currentUser = null;
    this.syncIntervalId = null;
    this.initialize();
  }
  return _createClass(AuthOrchestrator, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.networkManager.isOnline();
            case 1:
              this.isOnline = _context.v;
              _context.n = 2;
              return this.loadCurrentUser();
            case 2:
              // Set up network status monitoring
              this.setupNetworkMonitoring();

              // Start sync process if online
              if (this.isOnline) {
                this.startSyncProcess();
              }
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "setupNetworkMonitoring",
    value: function setupNetworkMonitoring() {
      var _this = this;
      // Monitor online/offline events
      window.addEventListener('online', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this.isOnline = true;
              _context2.n = 1;
              return _this.handleOnlineStatus();
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      })));
      window.addEventListener('offline', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _this.isOnline = false;
              _context3.n = 1;
              return _this.handleOfflineStatus();
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
      })));
    }
  }, {
    key: "handleOnlineStatus",
    value: function () {
      var _handleOnlineStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              console.log('Network is online, attempting to sync authentication state');

              // If user was authenticated offline, sync with online service
              if (!(this.currentUser && this.currentUser.offline)) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return this.syncOfflineAuth();
            case 1:
              // Start sync process
              this.startSyncProcess();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function handleOnlineStatus() {
        return _handleOnlineStatus.apply(this, arguments);
      }
      return handleOnlineStatus;
    }()
  }, {
    key: "handleOfflineStatus",
    value: function () {
      var _handleOfflineStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              console.log('Network is offline, switching to offline authentication');

              // Stop sync process
              this.stopSyncProcess();

              // If user was online, switch to offline mode
              if (!(this.currentUser && !this.currentUser.offline)) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this.switchToOfflineMode();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function handleOfflineStatus() {
        return _handleOfflineStatus.apply(this, arguments);
      }
      return handleOfflineStatus;
    }()
  }, {
    key: "syncOfflineAuth",
    value: function () {
      var _syncOfflineAuth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var offlineCredentials, result, _t;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.storageManager.getItem('offline_credentials');
            case 1:
              offlineCredentials = _context6.v;
              if (!offlineCredentials) {
                _context6.n = 5;
                break;
              }
              _context6.n = 2;
              return this.onlineAuth.createAccount(_objectSpread2({
                email: offlineCredentials.email,
                password: offlineCredentials.password
              }, offlineCredentials.profile));
            case 2:
              result = _context6.v;
              if (!result.success) {
                _context6.n = 5;
                break;
              }
              // Update user state to online
              this.currentUser = _objectSpread2(_objectSpread2({}, result.user), {}, {
                offline: false
              });

              // Clear offline credentials
              _context6.n = 3;
              return this.storageManager.removeItem('offline_credentials');
            case 3:
              _context6.n = 4;
              return this.saveCurrentUser();
            case 4:
              console.log('Successfully synced offline authentication with online service');
            case 5:
              _context6.n = 7;
              break;
            case 6:
              _context6.p = 6;
              _t = _context6.v;
              console.error('Error syncing offline authentication:', _t);
            case 7:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 6]]);
      }));
      function syncOfflineAuth() {
        return _syncOfflineAuth.apply(this, arguments);
      }
      return syncOfflineAuth;
    }()
  }, {
    key: "switchToOfflineMode",
    value: function () {
      var _switchToOfflineMode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var offlineUserData, _t2;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              if (!this.currentUser) {
                _context7.n = 2;
                break;
              }
              offlineUserData = _objectSpread2(_objectSpread2({}, this.currentUser), {}, {
                offline: true
              });
              _context7.n = 1;
              return this.storageManager.setItem('offline_user', offlineUserData);
            case 1:
              this.currentUser.offline = true;
              console.log('Switched to offline mode');
            case 2:
              _context7.n = 4;
              break;
            case 3:
              _context7.p = 3;
              _t2 = _context7.v;
              console.error('Error switching to offline mode:', _t2);
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 3]]);
      }));
      function switchToOfflineMode() {
        return _switchToOfflineMode.apply(this, arguments);
      }
      return switchToOfflineMode;
    }()
  }, {
    key: "startSyncProcess",
    value: function startSyncProcess() {
      var _this2 = this;
      if (this.syncIntervalId) {
        clearInterval(this.syncIntervalId);
      }
      this.syncIntervalId = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return _this2.syncAuthenticationState();
            case 1:
              return _context8.a(2);
          }
        }, _callee8);
      })), this.config.syncInterval);
    }
  }, {
    key: "stopSyncProcess",
    value: function stopSyncProcess() {
      if (this.syncIntervalId) {
        clearInterval(this.syncIntervalId);
        this.syncIntervalId = null;
      }
    }
  }, {
    key: "syncAuthenticationState",
    value: function () {
      var _syncAuthenticationState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var verifiedUser, _t3;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              if (!(this.isOnline && this.currentUser && this.currentUser.offline)) {
                _context9.n = 3;
                break;
              }
              _context9.n = 1;
              return this.onlineAuth.verifySession();
            case 1:
              verifiedUser = _context9.v;
              if (!verifiedUser) {
                _context9.n = 3;
                break;
              }
              this.currentUser = _objectSpread2(_objectSpread2({}, verifiedUser), {}, {
                offline: false
              });
              _context9.n = 2;
              return this.saveCurrentUser();
            case 2:
              console.log('Successfully verified online status for user');
            case 3:
              _context9.n = 5;
              break;
            case 4:
              _context9.p = 4;
              _t3 = _context9.v;
              console.warn('Authentication sync failed:', _t3);
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 4]]);
      }));
      function syncAuthenticationState() {
        return _syncAuthenticationState.apply(this, arguments);
      }
      return syncAuthenticationState;
    }()
  }, {
    key: "loadCurrentUser",
    value: function () {
      var _loadCurrentUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var user, _t4;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.storageManager.getItem('current_user');
            case 1:
              user = _context0.v;
              if (user) {
                _context0.n = 3;
                break;
              }
              _context0.n = 2;
              return this.storageManager.getItem('offline_user');
            case 2:
              user = _context0.v;
            case 3:
              if (user) {
                this.currentUser = user;
              }
              _context0.n = 5;
              break;
            case 4:
              _context0.p = 4;
              _t4 = _context0.v;
              console.error('Error loading current user:', _t4);
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 4]]);
      }));
      function loadCurrentUser() {
        return _loadCurrentUser.apply(this, arguments);
      }
      return loadCurrentUser;
    }()
  }, {
    key: "saveCurrentUser",
    value: function () {
      var _saveCurrentUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _t5;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              if (!this.currentUser) {
                _context1.n = 5;
                break;
              }
              if (!this.currentUser.offline) {
                _context1.n = 3;
                break;
              }
              _context1.n = 1;
              return this.storageManager.setItem('offline_user', this.currentUser);
            case 1:
              _context1.n = 2;
              return this.storageManager.removeItem('current_user');
            case 2:
              _context1.n = 5;
              break;
            case 3:
              _context1.n = 4;
              return this.storageManager.setItem('current_user', this.currentUser);
            case 4:
              _context1.n = 5;
              return this.storageManager.removeItem('offline_user');
            case 5:
              _context1.n = 7;
              break;
            case 6:
              _context1.p = 6;
              _t5 = _context1.v;
              console.error('Error saving current user:', _t5);
            case 7:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 6]]);
      }));
      function saveCurrentUser() {
        return _saveCurrentUser.apply(this, arguments);
      }
      return saveCurrentUser;
    }() // Public API methods
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(credentials) {
        var result, _t6;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              if (!this.isOnline) {
                _context10.n = 5;
                break;
              }
              _context10.p = 1;
              _context10.n = 2;
              return this.onlineAuth.login(credentials);
            case 2:
              result = _context10.v;
              if (!result.success) {
                _context10.n = 3;
                break;
              }
              this.currentUser = result.user;
              _context10.n = 3;
              return this.saveCurrentUser();
            case 3:
              return _context10.a(2, result);
            case 4:
              _context10.p = 4;
              _t6 = _context10.v;
              console.warn('Online login failed, attempting offline login:', _t6);
              // Fall back to offline login
            case 5:
              _context10.n = 6;
              return this.localAuth.login(credentials);
            case 6:
              return _context10.a(2, _context10.v);
          }
        }, _callee10, this, [[1, 4]]);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(credentials) {
        var result, _t7;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              if (!this.isOnline) {
                _context11.n = 5;
                break;
              }
              _context11.p = 1;
              _context11.n = 2;
              return this.onlineAuth.signup(credentials);
            case 2:
              result = _context11.v;
              if (!result.success) {
                _context11.n = 3;
                break;
              }
              this.currentUser = result.user;
              _context11.n = 3;
              return this.saveCurrentUser();
            case 3:
              return _context11.a(2, result);
            case 4:
              _context11.p = 4;
              _t7 = _context11.v;
              console.warn('Online signup failed, attempting offline signup:', _t7);
              // Fall back to offline signup if allowed
            case 5:
              _context11.n = 6;
              return this.localAuth.signup(credentials);
            case 6:
              return _context11.a(2, _context11.v);
          }
        }, _callee11, this, [[1, 4]]);
      }));
      function signup(_x2) {
        return _signup.apply(this, arguments);
      }
      return signup;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              // Clear current user
              this.currentUser = null;

              // Clear storage
              _context12.n = 1;
              return this.storageManager.removeItem('current_user');
            case 1:
              _context12.n = 2;
              return this.storageManager.removeItem('offline_user');
            case 2:
              if (!this.isOnline) {
                _context12.n = 3;
                break;
              }
              _context12.n = 3;
              return this.onlineAuth.logout();
            case 3:
              _context12.n = 4;
              return this.localAuth.logout();
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "authenticateResource",
    value: function () {
      var _authenticateResource = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(resourceUrl) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (this.currentUser) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              if (this.isOnline) {
                _context13.n = 3;
                break;
              }
              if (!this.isResourceAvailableOffline(resourceUrl)) {
                _context13.n = 2;
                break;
              }
              return _context13.a(2, {
                success: true,
                user: this.currentUser,
                offline: true
              });
            case 2:
              return _context13.a(2, {
                success: false,
                error: 'Resource requires online access',
                offline: true,
                user: this.currentUser
              });
            case 3:
              _context13.n = 4;
              return this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);
            case 4:
              return _context13.a(2, _context13.v);
          }
        }, _callee13, this);
      }));
      function authenticateResource(_x3) {
        return _authenticateResource.apply(this, arguments);
      }
      return authenticateResource;
    }()
  }, {
    key: "isResourceAvailableOffline",
    value: function isResourceAvailableOffline(resourceUrl) {
      // Check if resource is cached locally or is a local resource
      // This is a simplified implementation - in a real scenario, 
      // you'd have more sophisticated logic to determine offline availability
      var offlineResources = this.config.offlineResources || [];
      return offlineResources.some(function (pattern) {
        return resourceUrl.includes(pattern) || new RegExp(pattern).test(resourceUrl);
      });
    }
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return this.currentUser;
    }
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return !!this.currentUser;
    }
  }, {
    key: "isOffline",
    value: function isOffline() {
      return !this.isOnline;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopSyncProcess();
      this.currentUser = null;
    }
  }]);
}();

// Create context
var AuthContext = /*#__PURE__*/createContext();

// Auth reducer to manage state
var authReducer = function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: true,
        error: null
      });
    case 'LOGIN_SUCCESS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        offline: action.payload.offline || false
      });
    case 'LOGIN_FAILURE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: false,
        error: action.payload.error
      });
    case 'LOGOUT':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: false,
        isAuthenticated: false,
        user: null,
        offline: false
      });
    case 'SET_OFFLINE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        offline: true
      });
    case 'SET_ONLINE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        offline: false
      });
    case 'SET_ERROR':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        error: action.payload.error
      });
    case 'CLEAR_ERROR':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        error: null
      });
    default:
      return state;
  }
};

// Auth provider component
var AuthProvider = function AuthProvider(_ref) {
  var children = _ref.children,
    _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config;
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    authOrchestrator = _React$useState2[0],
    setAuthOrchestrator = _React$useState2[1];
  var _useReducer = useReducer(authReducer, {
      loading: true,
      isAuthenticated: false,
      user: null,
      offline: false,
      error: null
    }),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];

  // Initialize the auth orchestrator
  useEffect(function () {
    var initAuth = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var orchestrator, currentUser, removeListener, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              orchestrator = new AuthOrchestrator(config);
              _context.n = 1;
              return orchestrator.initialize();
            case 1:
              setAuthOrchestrator(orchestrator);

              // Set initial state based on current user
              currentUser = orchestrator.getCurrentUser();
              if (currentUser) {
                dispatch({
                  type: 'LOGIN_SUCCESS',
                  payload: {
                    user: currentUser,
                    offline: currentUser.offline || false
                  }
                });
              } else {
                dispatch({
                  type: 'LOGOUT'
                });
              }

              // Set network status
              if (orchestrator.isOffline()) {
                dispatch({
                  type: 'SET_OFFLINE'
                });
              } else {
                dispatch({
                  type: 'SET_ONLINE'
                });
              }

              // Add network status listener
              removeListener = orchestrator.networkManager.addStatusListener(function (isOnline) {
                if (isOnline) {
                  dispatch({
                    type: 'SET_ONLINE'
                  });
                } else {
                  dispatch({
                    type: 'SET_OFFLINE'
                  });
                }
              }); // Cleanup function
              return _context.a(2, function () {
                removeListener();
                if (orchestrator) {
                  orchestrator.destroy();
                }
              });
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Failed to initialize auth orchestrator:', _t);
              dispatch({
                type: 'SET_ERROR',
                payload: {
                  error: 'Failed to initialize authentication'
                }
              });
            case 3:
              _context.p = 3;
              dispatch({
                type: 'LOGIN_START'
              }); // This is just to set loading to false
              dispatch({
                type: state.isAuthenticated ? 'LOGIN_SUCCESS' : 'LOGOUT'
              });
              return _context.f(3);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2, 3, 4]]);
      }));
      return function initAuth() {
        return _ref2.apply(this, arguments);
      };
    }();
    initAuth();
  }, []);

  // Login function
  var login = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(credentials) {
      var result, _result$user, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (authOrchestrator) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, {
              success: false,
              error: 'Auth not initialized'
            });
          case 1:
            dispatch({
              type: 'LOGIN_START'
            });
            _context2.p = 2;
            _context2.n = 3;
            return authOrchestrator.login(credentials);
          case 3:
            result = _context2.v;
            if (result.success) {
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  user: result.user,
                  offline: ((_result$user = result.user) === null || _result$user === void 0 ? void 0 : _result$user.offline) || false
                }
              });
            } else {
              dispatch({
                type: 'LOGIN_FAILURE',
                payload: {
                  error: result.error
                }
              });
            }
            return _context2.a(2, result);
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: {
                error: _t2.message
              }
            });
            return _context2.a(2, {
              success: false,
              error: _t2.message
            });
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return function login(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Signup function
  var signup = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(credentials) {
      var result, _result$user2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (authOrchestrator) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, {
              success: false,
              error: 'Auth not initialized'
            });
          case 1:
            dispatch({
              type: 'LOGIN_START'
            });
            _context3.p = 2;
            _context3.n = 3;
            return authOrchestrator.signup(credentials);
          case 3:
            result = _context3.v;
            if (result.success) {
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  user: result.user,
                  offline: ((_result$user2 = result.user) === null || _result$user2 === void 0 ? void 0 : _result$user2.offline) || false
                }
              });
            } else {
              dispatch({
                type: 'LOGIN_FAILURE',
                payload: {
                  error: result.error
                }
              });
            }
            return _context3.a(2, result);
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: {
                error: _t3.message
              }
            });
            return _context3.a(2, {
              success: false,
              error: _t3.message
            });
        }
      }, _callee3, null, [[2, 4]]);
    }));
    return function signup(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Logout function
  var logout = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (authOrchestrator) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, {
              success: false,
              error: 'Auth not initialized'
            });
          case 1:
            _context4.p = 1;
            _context4.n = 2;
            return authOrchestrator.logout();
          case 2:
            dispatch({
              type: 'LOGOUT'
            });
            return _context4.a(2, {
              success: true
            });
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            dispatch({
              type: 'SET_ERROR',
              payload: {
                error: _t4.message
              }
            });
            return _context4.a(2, {
              success: false,
              error: _t4.message
            });
        }
      }, _callee4, null, [[1, 3]]);
    }));
    return function logout() {
      return _ref5.apply(this, arguments);
    };
  }();

  // Check if user is authenticated
  var isAuthenticated = function isAuthenticated() {
    return (authOrchestrator === null || authOrchestrator === void 0 ? void 0 : authOrchestrator.isAuthenticated()) || state.isAuthenticated;
  };

  // Get current user
  var getCurrentUser = function getCurrentUser() {
    return (authOrchestrator === null || authOrchestrator === void 0 ? void 0 : authOrchestrator.getCurrentUser()) || state.user;
  };

  // Check if offline
  var isOffline = function isOffline() {
    return (authOrchestrator === null || authOrchestrator === void 0 ? void 0 : authOrchestrator.isOffline()) || state.offline;
  };

  // Authenticate resource access
  var authenticateResource = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resourceUrl) {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (authOrchestrator) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, {
              success: false,
              error: 'Auth not initialized'
            });
          case 1:
            _context5.n = 2;
            return authOrchestrator.authenticateResource(resourceUrl);
          case 2:
            return _context5.a(2, _context5.v);
        }
      }, _callee5);
    }));
    return function authenticateResource(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  var value = _objectSpread2(_objectSpread2({}, state), {}, {
    login: login,
    signup: signup,
    logout: logout,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
    isOffline: isOffline,
    authenticateResource: authenticateResource,
    authOrchestrator: authOrchestrator // Provide access to the orchestrator instance if needed
  });
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: value
  }, children);
};

// Custom hook to use auth context
var useAuth = function useAuth() {
  var context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protecting routes
var withAuth = function withAuth(Component) {
  return function (props) {
    var _useAuth = useAuth(),
      isAuthenticated = _useAuth.isAuthenticated,
      loading = _useAuth.loading;
    if (loading) {
      return /*#__PURE__*/React.createElement("div", null, "Loading...");
    }
    if (!isAuthenticated()) {
      return /*#__PURE__*/React.createElement("div", null, "Please log in to access this content.");
    }
    return /*#__PURE__*/React.createElement(Component, props);
  };
};

// Protected route component
var ProtectedRoute = function ProtectedRoute(_ref7) {
  var children = _ref7.children,
    _ref7$fallback = _ref7.fallback,
    fallback = _ref7$fallback === void 0 ? /*#__PURE__*/React.createElement("div", null, "Access denied") : _ref7$fallback;
  var _useAuth2 = useAuth(),
    isAuthenticated = _useAuth2.isAuthenticated,
    loading = _useAuth2.loading;
  if (loading) {
    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }
  return isAuthenticated() ? children : fallback;
};

export { AuthProvider, ProtectedRoute, useAuth, withAuth };
