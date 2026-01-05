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
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
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
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
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
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

    /**
     * Encrypt data using AES encryption with a specific key
     * @param {any} data - Data to encrypt
     * @param {string} key - Encryption key to use
     * @returns {string} - Encrypted string
     */
  }, {
    key: "encryptWithKey",
    value: function encryptWithKey(data, key) {
      try {
        var jsonString = JSON.stringify(data);
        var encrypted = CryptoJS.AES.encrypt(jsonString, key);
        return encrypted.toString();
      } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Failed to encrypt data');
      }
    }

    /**
     * Decrypt data using AES decryption with a specific key
     * @param {string} encryptedData - Encrypted string to decrypt
     * @param {string} key - Decryption key to use
     * @returns {any} - Decrypted data
     */
  }, {
    key: "decryptWithKey",
    value: function decryptWithKey(encryptedData, key) {
      try {
        var decrypted = CryptoJS.AES.decrypt(encryptedData, key);
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

/**
 * SyncStatusManager - Manages real-time synchronization status
 * Provides detailed feedback about sync progress and status
 */
var SyncStatusManager = /*#__PURE__*/function () {
  function SyncStatusManager() {
    _classCallCheck(this, SyncStatusManager);
    this.syncStatus = {
      isSyncing: false,
      lastSyncTime: null,
      syncProgress: 0,
      syncMessage: 'Ready',
      syncErrors: [],
      pendingOperations: 0,
      completedOperations: 0,
      totalOperations: 0
    };
    this.listeners = [];
    this.syncQueue = [];
  }

  /**
   * Update sync status with new information
   * @param {Object} statusUpdate - Update to sync status
   */
  return _createClass(SyncStatusManager, [{
    key: "updateStatus",
    value: function updateStatus(statusUpdate) {
      this.syncStatus = _objectSpread2(_objectSpread2({}, this.syncStatus), statusUpdate);
      this.notifyListeners();
    }

    /**
     * Start sync process
     */
  }, {
    key: "startSync",
    value: function startSync() {
      this.updateStatus({
        isSyncing: true,
        syncProgress: 0,
        syncMessage: 'Starting sync...',
        pendingOperations: 0,
        completedOperations: 0
      });
    }

    /**
     * Update sync progress
     * @param {number} progress - Progress percentage (0-100)
     * @param {string} message - Status message
     */
  }, {
    key: "updateProgress",
    value: function updateProgress(progress, message) {
      this.updateStatus({
        syncProgress: Math.min(100, Math.max(0, progress)),
        syncMessage: message
      });
    }

    /**
     * Add to sync queue
     * @param {Object} operation - Operation to sync
     */
  }, {
    key: "addToQueue",
    value: function addToQueue(operation) {
      this.syncQueue.push(operation);
      this.updateStatus({
        pendingOperations: this.syncQueue.length
      });
    }

    /**
     * Process queue item
     */
  }, {
    key: "processQueueItem",
    value: function processQueueItem() {
      if (this.syncQueue.length > 0) {
        var operation = this.syncQueue.shift();
        this.updateStatus({
          pendingOperations: this.syncQueue.length,
          completedOperations: this.syncStatus.completedOperations + 1
        });
        return operation;
      }
      return null;
    }

    /**
     * Complete sync process
     */
  }, {
    key: "completeSync",
    value: function completeSync() {
      this.updateStatus({
        isSyncing: false,
        lastSyncTime: new Date().toISOString(),
        syncProgress: 100,
        syncMessage: 'Sync completed successfully',
        pendingOperations: 0
      });
    }

    /**
     * Record sync error
     * @param {Error} error - Sync error
     */
  }, {
    key: "recordError",
    value: function recordError(error) {
      var errorObj = {
        timestamp: new Date().toISOString(),
        error: error.message || error,
        operation: error.operation || 'unknown'
      };
      this.updateStatus({
        syncErrors: [].concat(_toConsumableArray(this.syncStatus.syncErrors), [errorObj]),
        syncMessage: "Sync error: ".concat(error.message || error)
      });
    }

    /**
     * Add listener for sync status changes
     * @param {Function} callback - Callback function
     * @returns {Function} - Function to remove listener
     */
  }, {
    key: "addListener",
    value: function addListener(callback) {
      var _this = this;
      this.listeners.push(callback);

      // Return function to remove listener
      return function () {
        var index = _this.listeners.indexOf(callback);
        if (index > -1) {
          _this.listeners.splice(index, 1);
        }
      };
    }

    /**
     * Notify all listeners of status change
     */
  }, {
    key: "notifyListeners",
    value: function notifyListeners() {
      var _this2 = this;
      this.listeners.forEach(function (callback) {
        try {
          callback(_this2.getSyncStatus());
        } catch (error) {
          console.error('Error in sync status listener:', error);
        }
      });
    }

    /**
     * Get current sync status
     * @returns {Object} - Sync status object
     */
  }, {
    key: "getSyncStatus",
    value: function getSyncStatus() {
      return _objectSpread2({}, this.syncStatus);
    }

    /**
     * Reset sync status
     */
  }, {
    key: "reset",
    value: function reset() {
      this.syncStatus = {
        isSyncing: false,
        lastSyncTime: null,
        syncProgress: 0,
        syncMessage: 'Ready',
        syncErrors: [],
        pendingOperations: 0,
        completedOperations: 0,
        totalOperations: 0
      };
      this.syncQueue = [];
      this.notifyListeners();
    }
  }]);
}();

/**
 * ConflictResolver - Resolves conflicts between offline and online data
 * Implements various conflict resolution strategies
 */
var ConflictResolver = /*#__PURE__*/function () {
  function ConflictResolver() {
    _classCallCheck(this, ConflictResolver);
    this.strategies = {
      'last-write-wins': this.lastWriteWins.bind(this),
      'server-wins': this.serverWins.bind(this),
      'client-wins': this.clientWins.bind(this),
      'merge': this.merge.bind(this),
      'user-choice': this.userChoice.bind(this)
    };
  }

  /**
   * Resolve a conflict using the specified strategy
   * @param {Object} conflict - Conflict object with local and remote data
   * @param {string} strategy - Strategy to use ('last-write-wins', 'server-wins', etc.)
   * @param {Function} userChoiceCallback - Callback for user-choice strategy
   * @returns {Object} - Resolved data
   */
  return _createClass(ConflictResolver, [{
    key: "resolve",
    value: function resolve(conflict) {
      var strategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'last-write-wins';
      var userChoiceCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!this.strategies[strategy]) {
        throw new Error("Unknown conflict resolution strategy: ".concat(strategy));
      }
      return this.strategies[strategy](conflict, userChoiceCallback);
    }

    /**
     * Last write wins strategy
     * @param {Object} conflict - Conflict object
     * @returns {Object} - Resolved data
     */
  }, {
    key: "lastWriteWins",
    value: function lastWriteWins(conflict) {
      var localTime = new Date(conflict.local.timestamp || conflict.local.createdAt || Date.now()).getTime();
      var remoteTime = new Date(conflict.remote.timestamp || conflict.remote.createdAt || Date.now()).getTime();
      return localTime >= remoteTime ? conflict.local.data : conflict.remote.data;
    }

    /**
     * Server wins strategy
     * @param {Object} conflict - Conflict object
     * @returns {Object} - Resolved data
     */
  }, {
    key: "serverWins",
    value: function serverWins(conflict) {
      return conflict.remote.data;
    }

    /**
     * Client wins strategy
     * @param {Object} conflict - Conflict object
     * @returns {Object} - Resolved data
     */
  }, {
    key: "clientWins",
    value: function clientWins(conflict) {
      return conflict.local.data;
    }

    /**
     * Merge strategy - combines local and remote data
     * @param {Object} conflict - Conflict object
     * @returns {Object} - Merged data
     */
  }, {
    key: "merge",
    value: function merge(conflict) {
      // Deep merge of local and remote data
      return this.deepMerge(conflict.remote.data, conflict.local.data);
    }

    /**
     * User choice strategy - prompts user to choose
     * @param {Object} conflict - Conflict object
     * @param {Function} userChoiceCallback - Callback to get user choice
     * @returns {Object} - User-selected data
     */
  }, {
    key: "userChoice",
    value: function userChoice(conflict, userChoiceCallback) {
      if (!userChoiceCallback) {
        throw new Error('userChoice strategy requires a userChoiceCallback');
      }
      var choice = userChoiceCallback({
        local: conflict.local.data,
        remote: conflict.remote.data,
        localMetadata: conflict.local,
        remoteMetadata: conflict.remote
      });
      return choice === 'local' ? conflict.local.data : conflict.remote.data;
    }

    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object
     * @returns {Object} - Merged object
     */
  }, {
    key: "deepMerge",
    value: function deepMerge(target, source) {
      var _this = this;
      var output = _objectSpread2({}, target);
      if (this.isObject(target) && this.isObject(source)) {
        Object.keys(source).forEach(function (key) {
          if (_this.isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, _defineProperty({}, key, source[key]));
            } else {
              output[key] = _this.deepMerge(target[key], source[key]);
            }
          } else {
            Object.assign(output, _defineProperty({}, key, source[key]));
          }
        });
      }
      return output;
    }

    /**
     * Check if value is an object
     * @param {*} value - Value to check
     * @returns {boolean} - True if object
     */
  }, {
    key: "isObject",
    value: function isObject(value) {
      return value && _typeof(value) === 'object' && value.constructor === Object;
    }

    /**
     * Detect conflicts between local and remote data
     * @param {Object} localData - Local data
     * @param {Object} remoteData - Remote data
     * @param {Object} localMetadata - Local metadata
     * @param {Object} remoteMetadata - Remote metadata
     * @returns {boolean} - True if conflict detected
     */
  }, {
    key: "detectConflict",
    value: function detectConflict(localData, remoteData, localMetadata, remoteMetadata) {
      // Simple conflict detection based on timestamps
      var localTime = new Date(localMetadata.timestamp || localMetadata.updatedAt || Date.now()).getTime();
      var remoteTime = new Date(remoteMetadata.timestamp || remoteMetadata.updatedAt || Date.now()).getTime();

      // If both have been updated after initial sync, there's a conflict
      return localTime > remoteMetadata.lastSyncTime && remoteTime > localMetadata.lastSyncTime;
    }

    /**
     * Create a conflict object
     * @param {Object} local - Local data and metadata
     * @param {Object} remote - Remote data and metadata
     * @returns {Object} - Conflict object
     */
  }, {
    key: "createConflict",
    value: function createConflict(local, remote) {
      return {
        local: local,
        remote: remote,
        timestamp: new Date().toISOString(),
        type: 'data_conflict'
      };
    }

    /**
     * Auto-resolve conflicts using a default strategy
     * @param {Array} conflicts - Array of conflicts to resolve
     * @param {string} defaultStrategy - Default strategy to use
     * @returns {Array} - Resolved data
     */
  }, {
    key: "autoResolve",
    value: function autoResolve(conflicts) {
      var _this2 = this;
      var defaultStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'last-write-wins';
      return conflicts.map(function (conflict) {
        return {
          id: conflict.id,
          resolved: _this2.resolve(conflict, defaultStrategy)
        };
      });
    }
  }]);
}();

var KeyManager = /*#__PURE__*/function () {
  function KeyManager() {
    _classCallCheck(this, KeyManager);
    this.encryptionUtils = new EncryptionUtils();
    this.currentKey = null;
    this.keyHistory = [];
    this.userKeys = new Map(); // Map of user IDs to their keys
    this.keyRotationInterval = 24 * 60 * 60 * 1000; // 24 hours
    this.storageKey = 'tab_auth_keys';
  }

  /**
   * Initialize key manager with base key
   * @param {string} baseKey - Base encryption key
   */
  return _createClass(KeyManager, [{
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(baseKey) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.currentKey = baseKey;
              _context.n = 1;
              return this.loadKeys();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function initialize(_x) {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Generate a new encryption key
     * @returns {string} - New encryption key
     */
    )
  }, {
    key: "generateKey",
    value: function generateKey() {
      return this.encryptionUtils.generateRandomString(32);
    }

    /**
     * Get the current encryption key
     * @returns {string} - Current encryption key
     */
  }, {
    key: "getCurrentKey",
    value: function getCurrentKey() {
      return this.currentKey;
    }

    /**
     * Get user-specific encryption key
     * @param {string} userId - User ID
     * @returns {string} - User's encryption key
     */
  }, {
    key: "getUserKey",
    value: function getUserKey(userId) {
      if (this.userKeys.has(userId)) {
        return this.userKeys.get(userId);
      }

      // Generate new key for user if not exists
      var newKey = this.generateKey();
      this.userKeys.set(userId, newKey);
      this.saveKeys();
      return newKey;
    }

    /**
     * Set user-specific encryption key
     * @param {string} userId - User ID
     * @param {string} key - Encryption key
     */
  }, {
    key: "setUserKey",
    value: function setUserKey(userId, key) {
      this.userKeys.set(userId, key);
      this.saveKeys();
    }

    /**
     * Rotate the master encryption key
     * @param {string} newKey - New encryption key (optional)
     * @returns {string} - New encryption key
     */
  }, {
    key: "rotateKey",
    value: function rotateKey() {
      var newKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var oldKey = this.currentKey;
      this.currentKey = newKey || this.generateKey();

      // Store old key in history for decryption of old data
      this.keyHistory.push({
        key: oldKey,
        timestamp: new Date().toISOString(),
        rotationReason: 'scheduled'
      });

      // Keep only last 5 keys for security
      if (this.keyHistory.length > 5) {
        this.keyHistory = this.keyHistory.slice(-5);
      }
      this.saveKeys();
      return this.currentKey;
    }

    /**
     * Encrypt data using the appropriate key
     * @param {any} data - Data to encrypt
     * @param {string} userId - User ID (optional, for user-specific encryption)
     * @returns {string} - Encrypted data
     */
  }, {
    key: "encrypt",
    value: function encrypt(data) {
      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var keyToUse = userId ? this.getUserKey(userId) : this.currentKey;
      return this.encryptionUtils.encryptWithKey(data, keyToUse);
    }

    /**
     * Decrypt data trying all available keys
     * @param {string} encryptedData - Encrypted data
     * @param {string} userId - User ID (optional, for user-specific encryption)
     * @returns {any} - Decrypted data
     */
  }, {
    key: "decrypt",
    value: function decrypt(encryptedData) {
      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Try with user-specific key first if user ID provided
      if (userId) {
        var userKey = this.getUserKey(userId);
        try {
          return this.encryptionUtils.decryptWithKey(encryptedData, userKey);
        } catch (error) {
          // Continue to try other keys
        }
      }

      // Try with current key
      try {
        var keyToUse = userId ? this.getUserKey(userId) : this.currentKey;
        return this.encryptionUtils.decryptWithKey(encryptedData, keyToUse);
      } catch (error) {
        // Continue to try historical keys
      }

      // Try with historical keys
      var _iterator = _createForOfIteratorHelper(_toConsumableArray(this.keyHistory).reverse()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var historyItem = _step.value;
          try {
            return this.encryptionUtils.decryptWithKey(encryptedData, historyItem.key);
          } catch (error) {
            // Continue to next key
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      throw new Error('Failed to decrypt data with any available key');
    }

    /**
     * Save keys to storage
     */
  }, {
    key: "saveKeys",
    value: (function () {
      var _saveKeys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var keysData, encryptedKeys;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              try {
                keysData = {
                  currentKey: this.currentKey,
                  keyHistory: this.keyHistory,
                  userKeys: Array.from(this.userKeys.entries())
                }; // Encrypt the keys data before storing
                encryptedKeys = this.encryptionUtils.encrypt(keysData);
                localStorage.setItem(this.storageKey, encryptedKeys);
              } catch (error) {
                console.error('Error saving keys:', error);
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function saveKeys() {
        return _saveKeys.apply(this, arguments);
      }
      return saveKeys;
    }()
    /**
     * Load keys from storage
     */
    )
  }, {
    key: "loadKeys",
    value: (function () {
      var _loadKeys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var encryptedKeys, keysData;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              try {
                encryptedKeys = localStorage.getItem(this.storageKey);
                if (encryptedKeys) {
                  keysData = this.encryptionUtils.decrypt(encryptedKeys);
                  this.currentKey = keysData.currentKey;
                  this.keyHistory = keysData.keyHistory || [];
                  this.userKeys = new Map(keysData.userKeys || []);
                }
              } catch (error) {
                console.error('Error loading keys:', error);
                // Initialize with default values if loading fails
                this.keyHistory = [];
                this.userKeys = new Map();
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function loadKeys() {
        return _loadKeys.apply(this, arguments);
      }
      return loadKeys;
    }()
    /**
     * Clear all keys
     */
    )
  }, {
    key: "clear",
    value: function clear() {
      this.currentKey = null;
      this.keyHistory = [];
      this.userKeys.clear();
      localStorage.removeItem(this.storageKey);
    }

    /**
     * Check if key rotation is needed
     * @returns {boolean} - True if rotation is needed
     */
  }, {
    key: "needsRotation",
    value: function needsRotation() {
      if (!this.keyHistory.length) return false;
      var lastRotation = new Date(this.keyHistory[this.keyHistory.length - 1].timestamp);
      var timeSinceRotation = Date.now() - lastRotation.getTime();
      return timeSinceRotation > this.keyRotationInterval;
    }

    /**
     * Rotate key if needed
     * @returns {boolean} - True if rotation occurred
     */
  }, {
    key: "rotateIfNeeded",
    value: (function () {
      var _rotateIfNeeded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!this.needsRotation()) {
                _context4.n = 1;
                break;
              }
              this.rotateKey();
              return _context4.a(2, true);
            case 1:
              return _context4.a(2, false);
          }
        }, _callee4, this);
      }));
      function rotateIfNeeded() {
        return _rotateIfNeeded.apply(this, arguments);
      }
      return rotateIfNeeded;
    }()
    /**
     * Re-encrypt data with new key
     * @param {any} data - Data to re-encrypt
     * @param {string} userId - User ID (optional)
     * @returns {string} - Re-encrypted data
     */
    )
  }, {
    key: "reencryptData",
    value: function reencryptData(data) {
      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // First decrypt with old key, then encrypt with new key
      var decrypted = this.decrypt(this.encrypt(data, userId), userId);
      return this.encrypt(decrypted, userId);
    }
  }]);
}();

/**
 * MigrationManager - Handles migration of existing online accounts to offline capabilities
 * Provides a clear path for users to transition between online and offline modes
 */
var MigrationManager = /*#__PURE__*/function () {
  function MigrationManager(storageManager) {
    _classCallCheck(this, MigrationManager);
    this.storageManager = storageManager;
    this.migrationSteps = ['detect_existing_accounts', 'backup_online_data', 'create_offline_equivalent', 'verify_migration', 'finalize_migration'];
    this.currentMigrationStatus = {
      step: null,
      completed: false,
      progress: 0,
      errors: [],
      migratedAccounts: []
    };
  }

  /**
   * Start migration process for an online account
   * @param {Object} onlineAccount - Online account data
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Migration result
   */
  return _createClass(MigrationManager, [{
    key: "migrateAccount",
    value: (function () {
      var _migrateAccount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(onlineAccount, provider) {
        var offlineAccount, isVerified, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              this.updateStatus({
                step: 'detect_existing_accounts',
                progress: 0
              });

              // Step 1: Verify account exists and is valid
              if (!(!onlineAccount || !onlineAccount.id)) {
                _context.n = 1;
                break;
              }
              throw new Error('Invalid online account data');
            case 1:
              this.updateStatus({
                progress: 20
              });

              // Step 2: Backup online data
              this.updateStatus({
                step: 'backup_online_data',
                progress: 40
              });
              _context.n = 2;
              return this.backupOnlineData(onlineAccount, provider);
            case 2:
              // Step 3: Create offline equivalent
              this.updateStatus({
                step: 'create_offline_equivalent',
                progress: 60
              });
              _context.n = 3;
              return this.createOfflineAccount(onlineAccount, provider);
            case 3:
              offlineAccount = _context.v;
              // Step 4: Verify migration
              this.updateStatus({
                step: 'verify_migration',
                progress: 80
              });
              _context.n = 4;
              return this.verifyMigration(onlineAccount, offlineAccount);
            case 4:
              isVerified = _context.v;
              if (isVerified) {
                _context.n = 5;
                break;
              }
              throw new Error('Migration verification failed');
            case 5:
              // Step 5: Finalize migration
              this.updateStatus({
                step: 'finalize_migration',
                progress: 90
              });
              _context.n = 6;
              return this.finalizeMigration(onlineAccount, offlineAccount);
            case 6:
              this.updateStatus({
                progress: 100,
                completed: true,
                migratedAccounts: [].concat(_toConsumableArray(this.currentMigrationStatus.migratedAccounts), [offlineAccount.id])
              });
              return _context.a(2, {
                success: true,
                message: 'Account migrated successfully',
                offlineAccount: offlineAccount
              });
            case 7:
              _context.p = 7;
              _t = _context.v;
              this.recordError(_t);
              return _context.a(2, {
                success: false,
                error: _t.message
              });
          }
        }, _callee, this, [[0, 7]]);
      }));
      function migrateAccount(_x, _x2) {
        return _migrateAccount.apply(this, arguments);
      }
      return migrateAccount;
    }()
    /**
     * Backup online account data
     * @param {Object} account - Online account
     * @param {string} provider - Authentication provider
     */
    )
  }, {
    key: "backupOnlineData",
    value: (function () {
      var _backupOnlineData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(account, provider) {
        var backupData;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              backupData = {
                originalAccount: account,
                provider: provider,
                timestamp: new Date().toISOString(),
                backupId: this.generateBackupId()
              };
              _context2.n = 1;
              return this.storageManager.setItem("migration_backup_".concat(account.id), backupData);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function backupOnlineData(_x3, _x4) {
        return _backupOnlineData.apply(this, arguments);
      }
      return backupOnlineData;
    }()
    /**
     * Create offline equivalent of online account
     * @param {Object} onlineAccount - Online account
     * @param {string} provider - Authentication provider
     * @returns {Promise<Object>} - Offline account
     */
    )
  }, {
    key: "createOfflineAccount",
    value: (function () {
      var _createOfflineAccount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(onlineAccount, provider) {
        var offlineAccount;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              // Create offline user object
              offlineAccount = {
                id: onlineAccount.id,
                email: onlineAccount.email,
                profile: onlineAccount.user_metadata || onlineAccount.app_metadata || onlineAccount.profile || {},
                createdAt: onlineAccount.created_at || new Date().toISOString(),
                lastLoginAt: onlineAccount.last_login_at || new Date().toISOString(),
                provider: provider,
                offline: true,
                migratedFrom: {
                  provider: provider,
                  originalId: onlineAccount.id,
                  timestamp: new Date().toISOString()
                }
              }; // Store offline account
              _context3.n = 1;
              return this.storageManager.setItem("offline_user_".concat(onlineAccount.email), offlineAccount);
            case 1:
              return _context3.a(2, offlineAccount);
          }
        }, _callee3, this);
      }));
      function createOfflineAccount(_x5, _x6) {
        return _createOfflineAccount.apply(this, arguments);
      }
      return createOfflineAccount;
    }()
    /**
     * Verify that migration was successful
     * @param {Object} onlineAccount - Original online account
     * @param {Object} offlineAccount - Migrated offline account
     * @returns {Promise<boolean>} - True if verified
     */
    )
  }, {
    key: "verifyMigration",
    value: (function () {
      var _verifyMigration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(onlineAccount, offlineAccount) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2, onlineAccount.email === offlineAccount.email && onlineAccount.id === offlineAccount.id);
          }
        }, _callee4);
      }));
      function verifyMigration(_x7, _x8) {
        return _verifyMigration.apply(this, arguments);
      }
      return verifyMigration;
    }()
    /**
     * Finalize migration process
     * @param {Object} onlineAccount - Original online account
     * @param {Object} offlineAccount - Migrated offline account
     */
    )
  }, {
    key: "finalizeMigration",
    value: (function () {
      var _finalizeMigration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(onlineAccount, offlineAccount) {
        var migrationRecord;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              // Mark migration as complete
              migrationRecord = {
                onlineId: onlineAccount.id,
                offlineId: offlineAccount.id,
                provider: offlineAccount.migratedFrom.provider,
                timestamp: new Date().toISOString(),
                status: 'completed'
              };
              _context5.n = 1;
              return this.storageManager.setItem("migration_record_".concat(onlineAccount.id), migrationRecord);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function finalizeMigration(_x9, _x0) {
        return _finalizeMigration.apply(this, arguments);
      }
      return finalizeMigration;
    }()
    /**
     * Migrate multiple accounts at once
     * @param {Array} accounts - Array of online accounts
     * @param {string} provider - Authentication provider
     * @returns {Promise<Object>} - Migration results
     */
    )
  }, {
    key: "migrateMultipleAccounts",
    value: (function () {
      var _migrateMultipleAccounts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(accounts, provider) {
        var results, _iterator, _step, account, result, _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              results = {
                successful: [],
                failed: [],
                total: accounts.length
              };
              _iterator = _createForOfIteratorHelper(accounts);
              _context6.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context6.n = 5;
                break;
              }
              account = _step.value;
              _context6.n = 3;
              return this.migrateAccount(account, provider);
            case 3:
              result = _context6.v;
              if (result.success) {
                results.successful.push(result.offlineAccount);
              } else {
                results.failed.push({
                  account: account,
                  error: result.error
                });
              }
            case 4:
              _context6.n = 2;
              break;
            case 5:
              _context6.n = 7;
              break;
            case 6:
              _context6.p = 6;
              _t2 = _context6.v;
              _iterator.e(_t2);
            case 7:
              _context6.p = 7;
              _iterator.f();
              return _context6.f(7);
            case 8:
              return _context6.a(2, results);
          }
        }, _callee6, this, [[1, 6, 7, 8]]);
      }));
      function migrateMultipleAccounts(_x1, _x10) {
        return _migrateMultipleAccounts.apply(this, arguments);
      }
      return migrateMultipleAccounts;
    }()
    /**
     * Check if an account needs migration
     * @param {Object} account - Account to check
     * @returns {Promise<boolean>} - True if migration needed
     */
    )
  }, {
    key: "needsMigration",
    value: (function () {
      var _needsMigration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(account) {
        var offlineAccount, migrationRecord;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (account) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, false);
            case 1:
              _context7.n = 2;
              return this.storageManager.getItem("offline_user_".concat(account.email));
            case 2:
              offlineAccount = _context7.v;
              if (!offlineAccount) {
                _context7.n = 3;
                break;
              }
              return _context7.a(2, false);
            case 3:
              _context7.n = 4;
              return this.storageManager.getItem("migration_record_".concat(account.id));
            case 4:
              migrationRecord = _context7.v;
              return _context7.a(2, !migrationRecord);
          }
        }, _callee7, this);
      }));
      function needsMigration(_x11) {
        return _needsMigration.apply(this, arguments);
      }
      return needsMigration;
    }()
    /**
     * Get migration status for an account
     * @param {string} accountId - Account ID
     * @returns {Promise<Object>} - Migration status
     */
    )
  }, {
    key: "getMigrationStatus",
    value:
    /**
     * Get current migration status
     * @returns {Object} - Current migration status
     */
    function getMigrationStatus() {
      return _objectSpread2({}, this.currentMigrationStatus);
    }

    /**
     * Reset migration status
     */
  }, {
    key: "rollbackMigration",
    value: (
    /**
     * Rollback migration if needed
     * @param {string} accountId - Account ID to rollback
     * @returns {Promise<Object>} - Rollback result
     */
    function () {
      var _rollbackMigration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(accountId) {
        var backup, _t3;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.storageManager.removeItem("offline_user_".concat(accountId));
            case 1:
              _context8.n = 2;
              return this.storageManager.removeItem("migration_record_".concat(accountId));
            case 2:
              _context8.n = 3;
              return this.storageManager.getItem("migration_backup_".concat(accountId));
            case 3:
              backup = _context8.v;
              if (!backup) {
                _context8.n = 4;
                break;
              }
              _context8.n = 4;
              return this.storageManager.removeItem("migration_backup_".concat(accountId));
            case 4:
              return _context8.a(2, {
                success: true,
                message: 'Migration rolled back successfully'
              });
            case 5:
              _context8.p = 5;
              _t3 = _context8.v;
              return _context8.a(2, {
                success: false,
                error: _t3.message
              });
          }
        }, _callee8, this, [[0, 5]]);
      }));
      function rollbackMigration(_x12) {
        return _rollbackMigration.apply(this, arguments);
      }
      return rollbackMigration;
    }()
    /**
     * Update migration status
     * @param {Object} statusUpdate - Status update
     */
    )
  }, {
    key: "updateStatus",
    value: function updateStatus(statusUpdate) {
      this.currentMigrationStatus = _objectSpread2(_objectSpread2({}, this.currentMigrationStatus), statusUpdate);
    }

    /**
     * Record migration error
     * @param {Error} error - Error to record
     */
  }, {
    key: "recordError",
    value: function recordError(error) {
      this.currentMigrationStatus.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message,
        step: this.currentMigrationStatus.step
      });
    }

    /**
     * Generate backup ID
     * @returns {string} - Backup ID
     */
  }, {
    key: "generateBackupId",
    value: function generateBackupId() {
      return 'backup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  }, {
    key: "resetStatus",
    value: function resetStatus() {
      this.currentMigrationStatus = {
        step: null,
        completed: false,
        progress: 0,
        errors: [],
        migratedAccounts: []
      };
    }
  }]);
}();

/**
 * ResourceCache - Advanced resource caching with configurable policies
 * Supports cache-first, network-first, and stale-while-revalidate strategies
 */
var ResourceCache = /*#__PURE__*/function () {
  function ResourceCache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ResourceCache);
    this.cachePolicy = options.cachePolicy || 'cache-first'; // 'cache-first', 'network-first', 'stale-while-revalidate'
    this.maxCacheSize = options.maxCacheSize || 50 * 1024 * 1024; // 50MB default
    this.defaultTTL = options.defaultTTL || 5 * 60 * 1000; // 5 minutes default TTL
    this.cache = new Map();
    this.metadata = new Map();
    this.storageKey = 'tab_auth_resource_cache';
    this.size = 0;
    this.maxEntries = options.maxEntries || 1000;
  }

  /**
   * Get resource with specified caching policy
   * @param {string} resourceUrl - Resource URL
   * @param {Function} fetcher - Function to fetch resource when needed
   * @param {Object} options - Cache options
   * @returns {Promise<any>} - Resource data
   */
  return _createClass(ResourceCache, [{
    key: "get",
    value: (function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resourceUrl, fetcher) {
        var options,
          policy,
          ttl,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              policy = options.cachePolicy || this.cachePolicy;
              ttl = options.ttl || this.defaultTTL;
              _t = policy;
              _context.n = _t === 'cache-first' ? 1 : _t === 'network-first' ? 3 : _t === 'stale-while-revalidate' ? 5 : 7;
              break;
            case 1:
              _context.n = 2;
              return this.cacheFirst(resourceUrl, fetcher, ttl);
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.n = 4;
              return this.networkFirst(resourceUrl, fetcher, ttl);
            case 4:
              return _context.a(2, _context.v);
            case 5:
              _context.n = 6;
              return this.staleWhileRevalidate(resourceUrl, fetcher, ttl);
            case 6:
              return _context.a(2, _context.v);
            case 7:
              _context.n = 8;
              return this.cacheFirst(resourceUrl, fetcher, ttl);
            case 8:
              return _context.a(2, _context.v);
            case 9:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Cache-first strategy: return cached data if available, otherwise fetch and cache
     * @param {string} resourceUrl - Resource URL
     * @param {Function} fetcher - Function to fetch resource
     * @param {number} ttl - Time-to-live in milliseconds
     * @returns {Promise<any>} - Resource data
     */
    )
  }, {
    key: "cacheFirst",
    value: (function () {
      var _cacheFirst = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(resourceUrl, fetcher, ttl) {
        var cached, data;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.getFromCache(resourceUrl);
            case 1:
              cached = _context2.v;
              if (!(cached && this.isNotExpired(cached, ttl))) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, cached.data);
            case 2:
              _context2.n = 3;
              return fetcher();
            case 3:
              data = _context2.v;
              _context2.n = 4;
              return this.set(resourceUrl, data, ttl);
            case 4:
              return _context2.a(2, data);
          }
        }, _callee2, this);
      }));
      function cacheFirst(_x3, _x4, _x5) {
        return _cacheFirst.apply(this, arguments);
      }
      return cacheFirst;
    }()
    /**
     * Network-first strategy: try network first, fall back to cache if network fails
     * @param {string} resourceUrl - Resource URL
     * @param {Function} fetcher - Function to fetch resource
     * @param {number} ttl - Time-to-live in milliseconds
     * @returns {Promise<any>} - Resource data
     */
    )
  }, {
    key: "networkFirst",
    value: (function () {
      var _networkFirst = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(resourceUrl, fetcher, ttl) {
        var data, cached, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return fetcher();
            case 1:
              data = _context3.v;
              _context3.n = 2;
              return this.set(resourceUrl, data, ttl);
            case 2:
              return _context3.a(2, data);
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              _context3.n = 4;
              return this.getFromCache(resourceUrl);
            case 4:
              cached = _context3.v;
              if (!(cached && this.isNotExpired(cached, ttl))) {
                _context3.n = 5;
                break;
              }
              return _context3.a(2, cached.data);
            case 5:
              throw _t2;
            case 6:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 3]]);
      }));
      function networkFirst(_x6, _x7, _x8) {
        return _networkFirst.apply(this, arguments);
      }
      return networkFirst;
    }()
    /**
     * Stale-while-revalidate strategy: return stale cache while fetching fresh data
     * @param {string} resourceUrl - Resource URL
     * @param {Function} fetcher - Function to fetch resource
     * @param {number} ttl - Time-to-live in milliseconds
     * @returns {Promise<any>} - Resource data
     */
    )
  }, {
    key: "staleWhileRevalidate",
    value: (function () {
      var _staleWhileRevalidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resourceUrl, fetcher, ttl) {
        var _this = this;
        var cached, isStale, fetchPromise;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.getFromCache(resourceUrl);
            case 1:
              cached = _context5.v;
              isStale = cached && this.isExpired(cached, ttl);
              if (!(cached && !isStale)) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, cached.data);
            case 2:
              // Fetch fresh data in background
              fetchPromise = fetcher().then(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(data) {
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        _context4.n = 1;
                        return _this.set(resourceUrl, data, ttl);
                      case 1:
                        return _context4.a(2, data);
                    }
                  }, _callee4);
                }));
                return function (_x10) {
                  return _ref.apply(this, arguments);
                };
              }())["catch"](function (error) {
                console.error('Error revalidating cache:', error);
                // If revalidation fails, return stale data if available
                if (cached) {
                  return cached.data;
                }
                throw error;
              }); // Return stale data immediately, fresh data when available
              if (!cached) {
                _context5.n = 3;
                break;
              }
              return _context5.a(2, cached.data);
            case 3:
              return _context5.a(2, fetchPromise);
          }
        }, _callee5, this);
      }));
      function staleWhileRevalidate(_x9, _x0, _x1) {
        return _staleWhileRevalidate.apply(this, arguments);
      }
      return staleWhileRevalidate;
    }()
    /**
     * Set data in cache
     * @param {string} resourceUrl - Resource URL
     * @param {any} data - Data to cache
     * @param {number} ttl - Time-to-live in milliseconds
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "set",
    value: (function () {
      var _set = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resourceUrl, data) {
        var ttl,
          expirationTime,
          size,
          cacheEntry,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              ttl = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : this.defaultTTL;
              expirationTime = Date.now() + ttl;
              size = this.estimateSize(data); // Check if we need to evict items to stay within limits
            case 1:
              if (!((this.size + size > this.maxCacheSize || this.cache.size >= this.maxEntries) && this.cache.size > 0)) {
                _context6.n = 3;
                break;
              }
              _context6.n = 2;
              return this.evictOldest();
            case 2:
              _context6.n = 1;
              break;
            case 3:
              cacheEntry = {
                data: data,
                timestamp: Date.now(),
                expirationTime: expirationTime,
                size: size
              };
              this.cache.set(resourceUrl, cacheEntry);
              this.metadata.set(resourceUrl, {
                accessCount: 0,
                lastAccess: Date.now()
              });
              this.size += size;

              // Persist to storage
              _context6.n = 4;
              return this.saveToStorage();
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function set(_x11, _x12) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
    /**
     * Get data from cache
     * @param {string} resourceUrl - Resource URL
     * @returns {Promise<Object|null>} - Cache entry or null
     */
    )
  }, {
    key: "getFromCache",
    value: (function () {
      var _getFromCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resourceUrl) {
        var entry;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              // First try memory cache
              entry = this.cache.get(resourceUrl);
              if (!entry) {
                _context7.n = 1;
                break;
              }
              this.updateMetadata(resourceUrl);
              return _context7.a(2, entry);
            case 1:
              _context7.n = 2;
              return this.getFromStorage(resourceUrl);
            case 2:
              entry = _context7.v;
              if (!entry) {
                _context7.n = 3;
                break;
              }
              // Add to memory cache
              this.cache.set(resourceUrl, entry);
              this.size += entry.size;
              this.updateMetadata(resourceUrl);
              return _context7.a(2, entry);
            case 3:
              return _context7.a(2, null);
          }
        }, _callee7, this);
      }));
      function getFromCache(_x13) {
        return _getFromCache.apply(this, arguments);
      }
      return getFromCache;
    }()
    /**
     * Update metadata for resource access
     * @param {string} resourceUrl - Resource URL
     */
    )
  }, {
    key: "updateMetadata",
    value: function updateMetadata(resourceUrl) {
      var metadata = this.metadata.get(resourceUrl) || {
        accessCount: 0
      };
      metadata.accessCount += 1;
      metadata.lastAccess = Date.now();
      this.metadata.set(resourceUrl, metadata);
    }

    /**
     * Check if cache entry is expired
     * @param {Object} entry - Cache entry
     * @param {number} ttl - Time-to-live
     * @returns {boolean} - True if expired
     */
  }, {
    key: "isExpired",
    value: function isExpired(entry, ttl) {
      return Date.now() > entry.expirationTime;
    }

    /**
     * Check if cache entry is not expired
     * @param {Object} entry - Cache entry
     * @param {number} ttl - Time-to-live
     * @returns {boolean} - True if not expired
     */
  }, {
    key: "isNotExpired",
    value: function isNotExpired(entry, ttl) {
      return !this.isExpired(entry, ttl);
    }

    /**
     * Estimate size of data in bytes
     * @param {any} data - Data to estimate
     * @returns {number} - Estimated size in bytes
     */
  }, {
    key: "estimateSize",
    value: function estimateSize(data) {
      try {
        var str = JSON.stringify(data);
        return new Blob([str]).size;
      } catch (error) {
        console.error('Error estimating size:', error);
        return 1024; // Default to 1KB if estimation fails
      }
    }

    /**
     * Evict oldest cache entry
     * @returns {Promise<void>}
     */
  }, {
    key: "evictOldest",
    value: (function () {
      var _evictOldest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var oldestKey, oldestTime, _iterator, _step, _step$value, key, _entry, entry;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(this.cache.size === 0)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              oldestKey = null;
              oldestTime = Date.now();
              _iterator = _createForOfIteratorHelper(this.cache.entries());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], _entry = _step$value[1];
                  if (_entry.timestamp < oldestTime) {
                    oldestTime = _entry.timestamp;
                    oldestKey = key;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              if (oldestKey) {
                entry = this.cache.get(oldestKey);
                this.size -= entry.size;
                this.cache["delete"](oldestKey);
                this.metadata["delete"](oldestKey);
              }
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function evictOldest() {
        return _evictOldest.apply(this, arguments);
      }
      return evictOldest;
    }()
    /**
     * Clear expired entries
     * @returns {Promise<number>} - Number of entries cleared
     */
    )
  }, {
    key: "clearExpired",
    value: (function () {
      var _clearExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var clearedCount, now, _iterator2, _step2, _step2$value, key, entry;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              clearedCount = 0;
              now = Date.now();
              _iterator2 = _createForOfIteratorHelper(this.cache.entries());
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _step2$value = _slicedToArray(_step2.value, 2), key = _step2$value[0], entry = _step2$value[1];
                  if (now > entry.expirationTime) {
                    this.size -= entry.size;
                    this.cache["delete"](key);
                    this.metadata["delete"](key);
                    clearedCount++;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              _context9.n = 1;
              return this.saveToStorage();
            case 1:
              return _context9.a(2, clearedCount);
          }
        }, _callee9, this);
      }));
      function clearExpired() {
        return _clearExpired.apply(this, arguments);
      }
      return clearExpired;
    }()
    /**
     * Save cache to storage
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "saveToStorage",
    value: (function () {
      var _saveToStorage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var now, serializableCache, _iterator3, _step3, _step3$value, key, entry, cacheData;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              try {
                // Only save entries that are not expired
                now = Date.now();
                serializableCache = {};
                _iterator3 = _createForOfIteratorHelper(this.cache.entries());
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], entry = _step3$value[1];
                    if (now <= entry.expirationTime) {
                      serializableCache[key] = {
                        data: entry.data,
                        timestamp: entry.timestamp,
                        expirationTime: entry.expirationTime,
                        size: entry.size
                      };
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
                cacheData = JSON.stringify(serializableCache);
                localStorage.setItem(this.storageKey, cacheData);
              } catch (error) {
                console.error('Error saving cache to storage:', error);
              }
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function saveToStorage() {
        return _saveToStorage.apply(this, arguments);
      }
      return saveToStorage;
    }()
    /**
     * Load cache from storage
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "loadFromStorage",
    value: (function () {
      var _loadFromStorage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var cacheData, serializableCache, now, _i, _Object$entries, _Object$entries$_i, key, entry;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              try {
                cacheData = localStorage.getItem(this.storageKey);
                if (cacheData) {
                  serializableCache = JSON.parse(cacheData);
                  now = Date.now();
                  for (_i = 0, _Object$entries = Object.entries(serializableCache); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], entry = _Object$entries$_i[1];
                    // Only load if not expired
                    if (now <= entry.expirationTime) {
                      this.cache.set(key, entry);
                      this.size += entry.size;
                      this.metadata.set(key, {
                        accessCount: 0,
                        lastAccess: entry.timestamp
                      });
                    }
                  }
                }
              } catch (error) {
                console.error('Error loading cache from storage:', error);
              }
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function loadFromStorage() {
        return _loadFromStorage.apply(this, arguments);
      }
      return loadFromStorage;
    }()
    /**
     * Get cache entry from storage (for single entry)
     * @param {string} key - Cache key
     * @returns {Promise<Object|null>} - Cache entry or null
     */
    )
  }, {
    key: "getFromStorage",
    value: (function () {
      var _getFromStorage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(key) {
        var cacheData, serializableCache, entry, _t3;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              cacheData = localStorage.getItem(this.storageKey);
              if (!cacheData) {
                _context10.n = 1;
                break;
              }
              serializableCache = JSON.parse(cacheData);
              entry = serializableCache[key];
              if (!(entry && Date.now() <= entry.expirationTime)) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, entry);
            case 1:
              _context10.n = 3;
              break;
            case 2:
              _context10.p = 2;
              _t3 = _context10.v;
              console.error('Error getting cache entry from storage:', _t3);
            case 3:
              return _context10.a(2, null);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function getFromStorage(_x14) {
        return _getFromStorage.apply(this, arguments);
      }
      return getFromStorage;
    }()
    /**
     * Clear all cache
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "clear",
    value: (function () {
      var _clear = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this.cache.clear();
              this.metadata.clear();
              this.size = 0;
              localStorage.removeItem(this.storageKey);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function clear() {
        return _clear.apply(this, arguments);
      }
      return clear;
    }()
    /**
     * Get cache statistics
     * @returns {Object} - Cache statistics
     */
    )
  }, {
    key: "getStats",
    value: function getStats() {
      var now = Date.now();
      var expiredCount = 0;
      var _iterator4 = _createForOfIteratorHelper(this.cache.values()),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var entry = _step4.value;
          if (now > entry.expirationTime) {
            expiredCount++;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return {
        size: this.size,
        entries: this.cache.size,
        expired: expiredCount,
        maxSize: this.maxCacheSize,
        maxEntries: this.maxEntries
      };
    }

    /**
     * Set cache policy
     * @param {string} policy - Cache policy
     */
  }, {
    key: "setPolicy",
    value: function setPolicy(policy) {
      this.cachePolicy = policy;
    }

    /**
     * Set TTL for a specific resource
     * @param {string} resourceUrl - Resource URL
     * @param {number} ttl - Time-to-live in milliseconds
     * @returns {Promise<void>}
     */
  }, {
    key: "setTTL",
    value: (function () {
      var _setTTL = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(resourceUrl, ttl) {
        var entry;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              entry = this.cache.get(resourceUrl);
              if (!entry) {
                _context12.n = 1;
                break;
              }
              entry.expirationTime = Date.now() + ttl;
              _context12.n = 1;
              return this.saveToStorage();
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function setTTL(_x15, _x16) {
        return _setTTL.apply(this, arguments);
      }
      return setTTL;
    }())
  }]);
}();

/**
 * OfflineQueue - Queue for offline operations that require authentication
 * Queues operations when offline and replays them when connectivity is restored
 */
var OfflineQueue = /*#__PURE__*/function () {
  function OfflineQueue() {
    _classCallCheck(this, OfflineQueue);
    this.queue = [];
    this.isProcessing = false;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
    this.storageKey = 'tab_auth_offline_queue';
    this.onConnectivityRestored = null;
  }

  /**
   * Add an operation to the queue
   * @param {Object} operation - Operation to queue
   * @param {string} operation.type - Type of operation (login, logout, etc.)
   * @param {Object} operation.payload - Operation data
   * @param {Function} operation.executor - Function to execute the operation
   * @returns {Promise<string>} - Operation ID
   */
  return _createClass(OfflineQueue, [{
    key: "add",
    value: (function () {
      var _add = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(operation) {
        var operationId, queueItem;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              operationId = this.generateOperationId();
              queueItem = {
                id: operationId,
                type: operation.type,
                payload: operation.payload,
                executor: operation.executor,
                timestamp: Date.now(),
                retries: 0,
                status: 'pending'
              };
              this.queue.push(queueItem);
              _context.n = 1;
              return this.saveToStorage();
            case 1:
              return _context.a(2, operationId);
          }
        }, _callee, this);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
    /**
     * Process the queue when online
     * @param {Function} onlineAuthMethod - Method to execute operations when online
     * @returns {Promise<Object>} - Processing results
     */
    )
  }, {
    key: "process",
    value: (function () {
      var _process = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(onlineAuthMethod) {
        var processedCount, failedCount, i, item, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (!(this.isProcessing || this.queue.length === 0)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, {
                processed: 0,
                failed: 0,
                remaining: this.queue.length
              });
            case 1:
              this.isProcessing = true;
              processedCount = 0;
              failedCount = 0;
              _context2.p = 2;
              i = 0;
            case 3:
              if (!(i < this.queue.length)) {
                _context2.n = 10;
                break;
              }
              item = this.queue[i];
              if (!(item.status === 'completed')) {
                _context2.n = 4;
                break;
              }
              return _context2.a(3, 9);
            case 4:
              _context2.p = 4;
              _context2.n = 5;
              return item.executor(onlineAuthMethod);
            case 5:
              // Mark as completed
              item.status = 'completed';
              processedCount++;
              _context2.n = 9;
              break;
            case 6:
              _context2.p = 6;
              _t = _context2.v;
              // Handle failure
              item.retries += 1;
              item.status = 'failed';
              failedCount++;
              if (!(item.retries < this.maxRetries)) {
                _context2.n = 8;
                break;
              }
              // Reset status to pending for retry
              item.status = 'pending';
              // Add delay before next retry
              _context2.n = 7;
              return this.delay(this.retryDelay * item.retries);
            case 7:
              _context2.n = 9;
              break;
            case 8:
              console.error("Operation ".concat(item.id, " failed after ").concat(this.maxRetries, " retries:"), _t);
            case 9:
              i++;
              _context2.n = 3;
              break;
            case 10:
              // Remove completed operations
              this.queue = this.queue.filter(function (item) {
                return item.status !== 'completed';
              });
              _context2.n = 11;
              return this.saveToStorage();
            case 11:
              return _context2.a(2, {
                processed: processedCount,
                failed: failedCount,
                remaining: this.queue.length
              });
            case 12:
              _context2.p = 12;
              this.isProcessing = false;
              return _context2.f(12);
            case 13:
              return _context2.a(2);
          }
        }, _callee2, this, [[4, 6], [2,, 12, 13]]);
      }));
      function process(_x2) {
        return _process.apply(this, arguments);
      }
      return process;
    }()
    /**
     * Retry failed operations
     * @param {Function} onlineAuthMethod - Method to execute operations when online
     * @returns {Promise<Object>} - Retry results
     */
    )
  }, {
    key: "retryFailed",
    value: (function () {
      var _retryFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(onlineAuthMethod) {
        var _this = this;
        var failedItems, retriedCount, successCount, _iterator, _step, item, _t2, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              failedItems = this.queue.filter(function (item) {
                return item.status === 'failed' && item.retries < _this.maxRetries;
              });
              retriedCount = 0;
              successCount = 0;
              _iterator = _createForOfIteratorHelper(failedItems);
              _context3.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context3.n = 7;
                break;
              }
              item = _step.value;
              _context3.p = 3;
              _context3.n = 4;
              return item.executor(onlineAuthMethod);
            case 4:
              item.status = 'completed';
              successCount++;
              retriedCount++;
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t2 = _context3.v;
              item.retries += 1;
              if (item.retries >= this.maxRetries) {
                item.status = 'failed';
                console.error("Retry failed for operation ".concat(item.id, ":"), _t2);
              } else {
                // Reset to pending for another retry
                item.status = 'pending';
              }
            case 6:
              _context3.n = 2;
              break;
            case 7:
              _context3.n = 9;
              break;
            case 8:
              _context3.p = 8;
              _t3 = _context3.v;
              _iterator.e(_t3);
            case 9:
              _context3.p = 9;
              _iterator.f();
              return _context3.f(9);
            case 10:
              this.queue = this.queue.filter(function (item) {
                return item.status !== 'completed';
              });
              _context3.n = 11;
              return this.saveToStorage();
            case 11:
              return _context3.a(2, {
                retried: retriedCount,
                succeeded: successCount,
                remaining: this.queue.filter(function (item) {
                  return item.status === 'failed';
                }).length
              });
          }
        }, _callee3, this, [[3, 5], [1, 8, 9, 10]]);
      }));
      function retryFailed(_x3) {
        return _retryFailed.apply(this, arguments);
      }
      return retryFailed;
    }()
    /**
     * Get queue status
     * @returns {Object} - Queue status
     */
    )
  }, {
    key: "getStatus",
    value: function getStatus() {
      var pending = this.queue.filter(function (item) {
        return item.status === 'pending';
      }).length;
      var failed = this.queue.filter(function (item) {
        return item.status === 'failed';
      }).length;
      var completed = this.queue.filter(function (item) {
        return item.status === 'completed';
      }).length;
      return {
        total: this.queue.length,
        pending: pending,
        failed: failed,
        completed: completed,
        isProcessing: this.isProcessing
      };
    }

    /**
     * Clear the queue
     */
  }, {
    key: "clear",
    value: (function () {
      var _clear = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.queue = [];
              this.isProcessing = false;
              _context4.n = 1;
              return this.saveToStorage();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function clear() {
        return _clear.apply(this, arguments);
      }
      return clear;
    }()
    /**
     * Set connectivity restored callback
     * @param {Function} callback - Callback function
     */
    )
  }, {
    key: "setOnConnectivityRestored",
    value: function setOnConnectivityRestored(callback) {
      this.onConnectivityRestored = callback;
    }

    /**
     * Handle connectivity restoration
     * @param {Function} onlineAuthMethod - Method to execute operations when online
     */
  }, {
    key: "handleConnectivityRestored",
    value: (function () {
      var _handleConnectivityRestored = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(onlineAuthMethod) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!this.onConnectivityRestored) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this.onConnectivityRestored();
            case 1:
              if (!(this.queue.length > 0)) {
                _context5.n = 2;
                break;
              }
              _context5.n = 2;
              return this.process(onlineAuthMethod);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function handleConnectivityRestored(_x4) {
        return _handleConnectivityRestored.apply(this, arguments);
      }
      return handleConnectivityRestored;
    }()
    /**
     * Generate a unique operation ID
     * @returns {string} - Unique operation ID
     */
    )
  }, {
    key: "generateOperationId",
    value: function generateOperationId() {
      return 'op_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Delay execution
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
  }, {
    key: "delay",
    value: function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    /**
     * Save queue to storage
     */
  }, {
    key: "saveToStorage",
    value: (function () {
      var _saveToStorage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var serializableQueue;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              try {
                // Store only essential data, not the executor function
                serializableQueue = this.queue.map(function (item) {
                  return {
                    id: item.id,
                    type: item.type,
                    payload: item.payload,
                    timestamp: item.timestamp,
                    retries: item.retries,
                    status: item.status
                  };
                });
                localStorage.setItem(this.storageKey, JSON.stringify(serializableQueue));
              } catch (error) {
                console.error('Error saving queue to storage:', error);
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function saveToStorage() {
        return _saveToStorage.apply(this, arguments);
      }
      return saveToStorage;
    }()
    /**
     * Load queue from storage
     */
    )
  }, {
    key: "loadFromStorage",
    value: (function () {
      var _loadFromStorage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var queueData, serializableQueue;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              try {
                queueData = localStorage.getItem(this.storageKey);
                if (queueData) {
                  serializableQueue = JSON.parse(queueData); // We can't restore the executor functions, so we'll need to handle this appropriately
                  // For now, we'll load the queue metadata but operations will need to be reconstructed
                  this.queue = serializableQueue.map(function (item) {
                    return {
                      id: item.id,
                      type: item.type,
                      payload: item.payload,
                      executor: null,
                      // Will need to be set separately
                      timestamp: item.timestamp,
                      retries: item.retries,
                      status: item.status
                    };
                  });
                }
              } catch (error) {
                console.error('Error loading queue from storage:', error);
                this.queue = [];
              }
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function loadFromStorage() {
        return _loadFromStorage.apply(this, arguments);
      }
      return loadFromStorage;
    }()
    /**
     * Add authentication operations to queue
     * @param {string} operationType - Type of operation
     * @param {Object} credentials - Authentication credentials
     * @returns {Promise<string>} - Operation ID
     */
    )
  }, {
    key: "addAuthOperation",
    value: (function () {
      var _addAuthOperation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(operationType, credentials) {
        var operation;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              operation = {
                type: operationType,
                payload: credentials,
                executor: function () {
                  var _executor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(onlineAuthMethod) {
                    return _regenerator().w(function (_context8) {
                      while (1) switch (_context8.n) {
                        case 0:
                          if (!(operationType === 'login')) {
                            _context8.n = 2;
                            break;
                          }
                          _context8.n = 1;
                          return onlineAuthMethod.login(credentials);
                        case 1:
                          return _context8.a(2, _context8.v);
                        case 2:
                          if (!(operationType === 'signup')) {
                            _context8.n = 4;
                            break;
                          }
                          _context8.n = 3;
                          return onlineAuthMethod.signup(credentials);
                        case 3:
                          return _context8.a(2, _context8.v);
                        case 4:
                          if (!(operationType === 'logout')) {
                            _context8.n = 6;
                            break;
                          }
                          _context8.n = 5;
                          return onlineAuthMethod.logout();
                        case 5:
                          return _context8.a(2, _context8.v);
                        case 6:
                          throw new Error("Unknown operation type: ".concat(operationType));
                        case 7:
                          return _context8.a(2);
                      }
                    }, _callee8);
                  }));
                  function executor(_x7) {
                    return _executor.apply(this, arguments);
                  }
                  return executor;
                }()
              };
              _context9.n = 1;
              return this.add(operation);
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      function addAuthOperation(_x5, _x6) {
        return _addAuthOperation.apply(this, arguments);
      }
      return addAuthOperation;
    }()
    /**
     * Add resource access operation to queue
     * @param {string} resourceUrl - Resource URL to access
     * @param {Object} options - Request options
     * @returns {Promise<string>} - Operation ID
     */
    )
  }, {
    key: "addResourceOperation",
    value: (function () {
      var _addResourceOperation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(resourceUrl) {
        var options,
          operation,
          _args1 = arguments;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              operation = {
                type: 'resource_access',
                payload: {
                  resourceUrl: resourceUrl,
                  options: options
                },
                executor: function () {
                  var _executor2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(onlineAuthMethod) {
                    return _regenerator().w(function (_context0) {
                      while (1) switch (_context0.n) {
                        case 0:
                          _context0.n = 1;
                          return onlineAuthMethod.authenticateResource(resourceUrl, options);
                        case 1:
                          return _context0.a(2, _context0.v);
                      }
                    }, _callee0);
                  }));
                  function executor(_x9) {
                    return _executor2.apply(this, arguments);
                  }
                  return executor;
                }()
              };
              _context1.n = 1;
              return this.add(operation);
            case 1:
              return _context1.a(2, _context1.v);
          }
        }, _callee1, this);
      }));
      function addResourceOperation(_x8) {
        return _addResourceOperation.apply(this, arguments);
      }
      return addResourceOperation;
    }())
  }]);
}();

/**
 * AnalyticsManager - Performance monitoring and analytics
 * Tracks authentication performance, sync times, and offline usage patterns
 */
var AnalyticsManager = /*#__PURE__*/function () {
  function AnalyticsManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AnalyticsManager);
    this.enabled = options.enabled !== false; // Enabled by default
    this.apiEndpoint = options.apiEndpoint || null;
    this.userId = null;
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.metrics = {
      authPerformance: [],
      syncTimes: [],
      offlineUsage: [],
      errorRates: []
    };
    this.storageKey = 'tab_auth_analytics';
    this.maxEvents = options.maxEvents || 1000;
    this.flushInterval = options.flushInterval || 30000; // 30 seconds
    this.flushTimer = null;
  }

  /**
   * Initialize analytics with user ID
   * @param {string} userId - User ID
   */
  return _createClass(AnalyticsManager, [{
    key: "initialize",
    value: function initialize(userId) {
      this.userId = userId;
      this.loadFromStorage();
      this.startFlushTimer();
    }

    /**
     * Track an authentication event
     * @param {string} eventType - Type of event ('login', 'logout', 'signup', etc.)
     * @param {Object} data - Event data
     * @param {number} duration - Duration in milliseconds (optional)
     */
  }, {
    key: "trackAuthEvent",
    value: function trackAuthEvent(eventType) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!this.enabled) return;
      var event = {
        id: this.generateEventId(),
        type: eventType,
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        data: data,
        duration: duration,
        metadata: {
          userAgent: navigator.userAgent,
          online: navigator.onLine,
          url: window.location.href
        }
      };
      this.events.push(event);

      // Track performance metrics
      if (duration !== null) {
        this.metrics.authPerformance.push({
          type: eventType,
          duration: duration,
          timestamp: event.timestamp
        });
      }
      this.saveToStorage();
    }

    /**
     * Track synchronization event
     * @param {Object} syncData - Sync data
     * @param {number} duration - Sync duration in milliseconds
     */
  }, {
    key: "trackSyncEvent",
    value: function trackSyncEvent(syncData, duration) {
      if (!this.enabled) return;
      var event = {
        id: this.generateEventId(),
        type: 'sync',
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        data: syncData,
        duration: duration,
        metadata: {
          userAgent: navigator.userAgent,
          online: navigator.onLine
        }
      };
      this.events.push(event);

      // Track sync time metrics
      this.metrics.syncTimes.push({
        duration: duration,
        operations: syncData.operations || 0,
        success: syncData.success || false,
        timestamp: event.timestamp
      });
      this.saveToStorage();
    }

    /**
     * Track offline usage
     * @param {Object} usageData - Offline usage data
     */
  }, {
    key: "trackOfflineUsage",
    value: function trackOfflineUsage(usageData) {
      if (!this.enabled) return;
      var event = {
        id: this.generateEventId(),
        type: 'offline_usage',
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        data: usageData,
        metadata: {
          userAgent: navigator.userAgent,
          online: false
        }
      };
      this.events.push(event);

      // Track offline usage metrics
      this.metrics.offlineUsage.push({
        actions: usageData.actions || 0,
        duration: usageData.duration || 0,
        resourcesAccessed: usageData.resourcesAccessed || 0,
        timestamp: event.timestamp
      });
      this.saveToStorage();
    }

    /**
     * Track error
     * @param {string} errorType - Type of error
     * @param {string} message - Error message
     * @param {Object} context - Error context
     */
  }, {
    key: "trackError",
    value: function trackError(errorType, message) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.enabled) return;
      var event = {
        id: this.generateEventId(),
        type: 'error',
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        data: {
          errorType: errorType,
          message: message,
          context: context
        },
        metadata: {
          userAgent: navigator.userAgent,
          online: navigator.onLine
        }
      };
      this.events.push(event);

      // Track error rate metrics
      this.metrics.errorRates.push({
        type: errorType,
        message: message,
        timestamp: event.timestamp
      });
      this.saveToStorage();
    }

    /**
     * Get performance metrics
     * @returns {Object} - Performance metrics
     */
  }, {
    key: "getMetrics",
    value: function getMetrics() {
      return {
        authPerformance: this.calculatePerformanceMetrics(this.metrics.authPerformance),
        syncTimes: this.calculatePerformanceMetrics(this.metrics.syncTimes.map(function (s) {
          return {
            duration: s.duration
          };
        })),
        offlineUsage: this.metrics.offlineUsage,
        errorRates: this.calculateErrorMetrics(this.metrics.errorRates),
        totals: {
          totalEvents: this.events.length,
          totalErrors: this.metrics.errorRates.length,
          totalSyncs: this.metrics.syncTimes.length
        }
      };
    }

    /**
     * Calculate performance metrics
     * @param {Array} data - Performance data
     * @returns {Object} - Calculated metrics
     */
  }, {
    key: "calculatePerformanceMetrics",
    value: function calculatePerformanceMetrics(data) {
      if (data.length === 0) return {};
      var durations = data.map(function (item) {
        return item.duration;
      });
      var sum = durations.reduce(function (a, b) {
        return a + b;
      }, 0);
      var avg = sum / durations.length;
      var min = Math.min.apply(Math, _toConsumableArray(durations));
      var max = Math.max.apply(Math, _toConsumableArray(durations));

      // Calculate median
      var sorted = _toConsumableArray(durations).sort(function (a, b) {
        return a - b;
      });
      var median = sorted[Math.floor(sorted.length / 2)];
      return {
        average: avg,
        median: median,
        min: min,
        max: max,
        count: data.length,
        percentiles: {
          p50: median,
          p90: sorted[Math.floor(sorted.length * 0.9)] || 0,
          p95: sorted[Math.floor(sorted.length * 0.95)] || 0
        }
      };
    }

    /**
     * Calculate error metrics
     * @param {Array} errors - Error data
     * @returns {Object} - Error metrics
     */
  }, {
    key: "calculateErrorMetrics",
    value: function calculateErrorMetrics(errors) {
      if (errors.length === 0) return {
        count: 0,
        types: {}
      };
      var typeCounts = {};
      errors.forEach(function (error) {
        typeCounts[error.type] = (typeCounts[error.type] || 0) + 1;
      });
      return {
        count: errors.length,
        types: typeCounts,
        rate: errors.length / this.events.length
      };
    }

    /**
     * Flush events to server
     * @returns {Promise<void>}
     */
  }, {
    key: "flush",
    value: (function () {
      var _flush = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var eventsToSend, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(!this.enabled || !this.apiEndpoint || this.events.length === 0)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              eventsToSend = _toConsumableArray(this.events);
              _context.n = 2;
              return fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: this.userId,
                  sessionId: this.sessionId,
                  events: eventsToSend
                })
              });
            case 2:
              // Remove sent events
              this.events = [];
              this.saveToStorage();
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error('Error flushing analytics:', _t);
              // Keep events for next flush attempt
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function flush() {
        return _flush.apply(this, arguments);
      }
      return flush;
    }()
    /**
     * Start flush timer
     */
    )
  }, {
    key: "startFlushTimer",
    value: function startFlushTimer() {
      var _this = this;
      if (this.flushInterval && this.apiEndpoint) {
        this.flushTimer = setInterval(function () {
          _this.flush();
        }, this.flushInterval);
      }
    }

    /**
     * Stop flush timer
     */
  }, {
    key: "stopFlushTimer",
    value: function stopFlushTimer() {
      if (this.flushTimer) {
        clearInterval(this.flushTimer);
        this.flushTimer = null;
      }
    }

    /**
     * Generate event ID
     * @returns {string} - Unique event ID
     */
  }, {
    key: "generateEventId",
    value: function generateEventId() {
      return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Generate session ID
     * @returns {string} - Unique session ID
     */
  }, {
    key: "generateSessionId",
    value: function generateSessionId() {
      return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Save analytics to storage
     */
  }, {
    key: "saveToStorage",
    value: function saveToStorage() {
      try {
        // Limit the number of events stored
        if (this.events.length > this.maxEvents) {
          this.events = this.events.slice(-this.maxEvents);
        }
        var analyticsData = {
          events: this.events,
          metrics: this.metrics,
          userId: this.userId,
          sessionId: this.sessionId
        };
        localStorage.setItem(this.storageKey, JSON.stringify(analyticsData));
      } catch (error) {
        console.error('Error saving analytics to storage:', error);
      }
    }

    /**
     * Load analytics from storage
     */
  }, {
    key: "loadFromStorage",
    value: function loadFromStorage() {
      try {
        var analyticsData = localStorage.getItem(this.storageKey);
        if (analyticsData) {
          var parsed = JSON.parse(analyticsData);
          this.events = parsed.events || [];
          this.metrics = parsed.metrics || {
            authPerformance: [],
            syncTimes: [],
            offlineUsage: [],
            errorRates: []
          };
          this.userId = parsed.userId || this.userId;
          this.sessionId = parsed.sessionId || this.generateSessionId();
        }
      } catch (error) {
        console.error('Error loading analytics from storage:', error);
        this.events = [];
        this.metrics = {
          authPerformance: [],
          syncTimes: [],
          offlineUsage: [],
          errorRates: []
        };
      }
    }

    /**
     * Clear all analytics data
     */
  }, {
    key: "clear",
    value: function clear() {
      this.events = [];
      this.metrics = {
        authPerformance: [],
        syncTimes: [],
        offlineUsage: [],
        errorRates: []
      };
      localStorage.removeItem(this.storageKey);
    }

    /**
     * Set user ID
     * @param {string} userId - User ID
     */
  }, {
    key: "setUserId",
    value: function setUserId(userId) {
      this.userId = userId;
    }

    /**
     * Set API endpoint
     * @param {string} endpoint - API endpoint
     */
  }, {
    key: "setApiEndpoint",
    value: function setApiEndpoint(endpoint) {
      this.apiEndpoint = endpoint;
    }

    /**
     * Enable/disable analytics
     * @param {boolean} enabled - Whether to enable analytics
     */
  }, {
    key: "setEnabled",
    value: function setEnabled(enabled) {
      this.enabled = enabled;
    }

    /**
     * Get event counts by type
     * @returns {Object} - Event counts
     */
  }, {
    key: "getEventCounts",
    value: function getEventCounts() {
      var counts = {};
      this.events.forEach(function (event) {
        counts[event.type] = (counts[event.type] || 0) + 1;
      });
      return counts;
    }

    /**
     * Get events by type
     * @param {string} eventType - Event type
     * @returns {Array} - Events of specified type
     */
  }, {
    key: "getEventsByType",
    value: function getEventsByType(eventType) {
      return this.events.filter(function (event) {
        return event.type === eventType;
      });
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

    // Initialize enhanced modules
    this.syncStatusManager = new SyncStatusManager();
    this.conflictResolver = new ConflictResolver();
    this.keyManager = new KeyManager();
    this.migrationManager = new MigrationManager(this.storageManager);
    this.resourceCache = new ResourceCache(this.config.cacheOptions || {});
    this.offlineQueue = new OfflineQueue();
    this.analyticsManager = new AnalyticsManager(this.config.analytics || {});
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
              return this.keyManager.initialize(this.config.encryptionKey);
            case 1:
              _context.n = 2;
              return this.resourceCache.loadFromStorage();
            case 2:
              _context.n = 3;
              return this.offlineQueue.loadFromStorage();
            case 3:
              _context.n = 4;
              return this.networkManager.isOnline();
            case 4:
              this.isOnline = _context.v;
              _context.n = 5;
              return this.loadCurrentUser();
            case 5:
              // Initialize analytics if user is available
              if (this.currentUser) {
                this.analyticsManager.initialize(this.currentUser.id);
              }

              // Set up network status monitoring
              this.setupNetworkMonitoring();

              // Start sync process if online
              if (this.isOnline) {
                this.startSyncProcess();
              }
            case 6:
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
        var _this$currentUser, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              console.log('Network is online, attempting to sync authentication state');

              // Update sync status
              this.syncStatusManager.startSync();
              _context4.p = 1;
              if (!(this.currentUser && this.currentUser.offline)) {
                _context4.n = 2;
                break;
              }
              _context4.n = 2;
              return this.syncOfflineAuth();
            case 2:
              if (!(this.offlineQueue.getStatus().total > 0)) {
                _context4.n = 3;
                break;
              }
              _context4.n = 3;
              return this.offlineQueue.handleConnectivityRestored(this.onlineAuth);
            case 3:
              // Start sync process
              this.startSyncProcess();

              // Track in analytics
              this.analyticsManager.trackAuthEvent('online_status_restored', {
                previousStatus: 'offline',
                userId: (_this$currentUser = this.currentUser) === null || _this$currentUser === void 0 ? void 0 : _this$currentUser.id
              });
              this.syncStatusManager.completeSync();
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t = _context4.v;
              this.syncStatusManager.recordError(_t);
              this.analyticsManager.trackError('online_status_sync', _t.message);
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4]]);
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
        var offlineCredentials, result, _t2;
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
              _t2 = _context6.v;
              console.error('Error syncing offline authentication:', _t2);
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
        var offlineUserData, _t3;
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
              _t3 = _context7.v;
              console.error('Error switching to offline mode:', _t3);
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
        var verifiedUser, conflict, resolvedUser, _t4;
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
              // Check for conflicts between offline and online data
              if (this.currentUser.lastLoginAt && verifiedUser.lastLoginAt) {
                // Create conflict object
                conflict = this.conflictResolver.createConflict({
                  data: this.currentUser,
                  timestamp: this.currentUser.lastLoginAt
                }, {
                  data: verifiedUser,
                  timestamp: verifiedUser.lastLoginAt
                }); // Resolve conflict using default strategy
                resolvedUser = this.conflictResolver.resolve(conflict);
                this.currentUser = _objectSpread2(_objectSpread2({}, resolvedUser), {}, {
                  offline: false
                });
              } else {
                // No conflict, just update
                this.currentUser = _objectSpread2(_objectSpread2({}, verifiedUser), {}, {
                  offline: false
                });
              }
              _context9.n = 2;
              return this.saveCurrentUser();
            case 2:
              console.log('Successfully verified online status for user');

              // Track in analytics
              this.analyticsManager.trackAuthEvent('sync_success', {
                userId: this.currentUser.id,
                syncType: 'user_data'
              });
            case 3:
              _context9.n = 5;
              break;
            case 4:
              _context9.p = 4;
              _t4 = _context9.v;
              console.warn('Authentication sync failed:', _t4);
              this.analyticsManager.trackError('sync_failed', _t4.message);
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
        var user, _t5;
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
              _t5 = _context0.v;
              console.error('Error loading current user:', _t5);
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
        var _t6;
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
              _t6 = _context1.v;
              console.error('Error saving current user:', _t6);
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
        var _result$user2;
        var startTime, _result$user, _result, needsMigration, result, _t7;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              // Track in analytics
              startTime = Date.now();
              if (!this.isOnline) {
                _context10.n = 8;
                break;
              }
              _context10.p = 1;
              _context10.n = 2;
              return this.onlineAuth.login(credentials);
            case 2:
              _result = _context10.v;
              if (!_result.success) {
                _context10.n = 6;
                break;
              }
              _context10.n = 3;
              return this.migrationManager.needsMigration(_result.user);
            case 3:
              needsMigration = _context10.v;
              if (!needsMigration) {
                _context10.n = 4;
                break;
              }
              _context10.n = 4;
              return this.migrationManager.migrateAccount(_result.user, this.config.provider);
            case 4:
              this.currentUser = _result.user;
              _context10.n = 5;
              return this.saveCurrentUser();
            case 5:
              // Initialize analytics with new user
              this.analyticsManager.initialize(_result.user.id);
            case 6:
              // Track in analytics
              this.analyticsManager.trackAuthEvent('login', {
                success: _result.success,
                provider: this.config.provider,
                userId: (_result$user = _result.user) === null || _result$user === void 0 ? void 0 : _result$user.id
              }, Date.now() - startTime);
              return _context10.a(2, _result);
            case 7:
              _context10.p = 7;
              _t7 = _context10.v;
              console.warn('Online login failed, attempting offline login:', _t7);
              // Fall back to offline login

              // Track in analytics
              this.analyticsManager.trackError('login_failed', _t7.message, {
                provider: this.config.provider,
                userId: credentials.email
              });
            case 8:
              _context10.n = 9;
              return this.localAuth.login(credentials);
            case 9:
              result = _context10.v;
              if (result.success) {
                this.currentUser = result.user;

                // Initialize analytics with user
                if (result.user.id) {
                  this.analyticsManager.initialize(result.user.id);
                }
              }

              // Track in analytics
              this.analyticsManager.trackAuthEvent('login', {
                success: result.success,
                provider: 'offline',
                userId: (_result$user2 = result.user) === null || _result$user2 === void 0 ? void 0 : _result$user2.id
              }, Date.now() - startTime);
              return _context10.a(2, result);
          }
        }, _callee10, this, [[1, 7]]);
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
        var _result$user3;
        var startTime, _result2$user, _result2, needsMigration, result, _t8;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              // Track in analytics
              startTime = Date.now();
              if (!this.isOnline) {
                _context11.n = 8;
                break;
              }
              _context11.p = 1;
              _context11.n = 2;
              return this.onlineAuth.signup(credentials);
            case 2:
              _result2 = _context11.v;
              if (!_result2.success) {
                _context11.n = 6;
                break;
              }
              _context11.n = 3;
              return this.migrationManager.needsMigration(_result2.user);
            case 3:
              needsMigration = _context11.v;
              if (!needsMigration) {
                _context11.n = 4;
                break;
              }
              _context11.n = 4;
              return this.migrationManager.migrateAccount(_result2.user, this.config.provider);
            case 4:
              this.currentUser = _result2.user;
              _context11.n = 5;
              return this.saveCurrentUser();
            case 5:
              // Initialize analytics with new user
              this.analyticsManager.initialize(_result2.user.id);
            case 6:
              // Track in analytics
              this.analyticsManager.trackAuthEvent('signup', {
                success: _result2.success,
                provider: this.config.provider,
                userId: (_result2$user = _result2.user) === null || _result2$user === void 0 ? void 0 : _result2$user.id
              }, Date.now() - startTime);
              return _context11.a(2, _result2);
            case 7:
              _context11.p = 7;
              _t8 = _context11.v;
              console.warn('Online signup failed, attempting offline signup:', _t8);
              // Fall back to offline signup if allowed

              // Track in analytics
              this.analyticsManager.trackError('signup_failed', _t8.message, {
                provider: this.config.provider,
                userId: credentials.email
              });
            case 8:
              _context11.n = 9;
              return this.localAuth.signup(credentials);
            case 9:
              result = _context11.v;
              if (result.success) {
                this.currentUser = result.user;

                // Initialize analytics with user
                if (result.user.id) {
                  this.analyticsManager.initialize(result.user.id);
                }
              }

              // Track in analytics
              this.analyticsManager.trackAuthEvent('signup', {
                success: result.success,
                provider: 'offline',
                userId: (_result$user3 = result.user) === null || _result$user3 === void 0 ? void 0 : _result$user3.id
              }, Date.now() - startTime);
              return _context11.a(2, result);
          }
        }, _callee11, this, [[1, 7]]);
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
        var _this$currentUser2;
        var startTime;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              // Track in analytics
              startTime = Date.now(); // Clear current user
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
              // Track in analytics
              this.analyticsManager.trackAuthEvent('logout', {
                success: true,
                userId: (_this$currentUser2 = this.currentUser) === null || _this$currentUser2 === void 0 ? void 0 : _this$currentUser2.id
              }, Date.now() - startTime);
            case 5:
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
      var _authenticateResource = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(resourceUrl) {
        var _this3 = this;
        var options,
          cachedResult,
          result,
          _args14 = arguments;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              options = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
              if (this.currentUser) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2, {
                success: false,
                error: 'User not authenticated'
              });
            case 1:
              if (!(options.useCache !== false)) {
                _context14.n = 3;
                break;
              }
              _context14.n = 2;
              return this.resourceCache.get(resourceUrl, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
                return _regenerator().w(function (_context13) {
                  while (1) switch (_context13.n) {
                    case 0:
                      if (_this3.isOnline) {
                        _context13.n = 2;
                        break;
                      }
                      if (!_this3.isResourceAvailableOffline(resourceUrl)) {
                        _context13.n = 1;
                        break;
                      }
                      return _context13.a(2, {
                        success: true,
                        user: _this3.currentUser,
                        offline: true
                      });
                    case 1:
                      return _context13.a(2, {
                        success: false,
                        error: 'Resource requires online access',
                        offline: true,
                        user: _this3.currentUser
                      });
                    case 2:
                      _context13.n = 3;
                      return _this3.onlineAuth.authenticateResource(resourceUrl, _this3.currentUser);
                    case 3:
                      return _context13.a(2, _context13.v);
                  }
                }, _callee13);
              })), options);
            case 2:
              cachedResult = _context14.v;
              return _context14.a(2, cachedResult);
            case 3:
              if (this.isOnline) {
                _context14.n = 6;
                break;
              }
              if (!this.isResourceAvailableOffline(resourceUrl)) {
                _context14.n = 4;
                break;
              }
              // Track offline resource usage
              this.analyticsManager.trackOfflineUsage({
                resourceUrl: resourceUrl,
                userId: this.currentUser.id,
                timestamp: new Date().toISOString()
              });
              return _context14.a(2, {
                success: true,
                user: this.currentUser,
                offline: true
              });
            case 4:
              if (!options.queueIfOffline) {
                _context14.n = 5;
                break;
              }
              _context14.n = 5;
              return this.offlineQueue.addResourceOperation(resourceUrl, options);
            case 5:
              return _context14.a(2, {
                success: false,
                error: 'Resource requires online access',
                offline: true,
                user: this.currentUser
              });
            case 6:
              _context14.n = 7;
              return this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);
            case 7:
              result = _context14.v;
              // Track in analytics
              this.analyticsManager.trackAuthEvent('resource_access', {
                resourceUrl: resourceUrl,
                userId: this.currentUser.id,
                success: result.success
              });
              return _context14.a(2, result);
          }
        }, _callee14, this);
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
      // Stop sync process
      this.stopSyncProcess();

      // Clean up enhanced modules
      if (this.syncStatusManager) {
        this.syncStatusManager.reset();
      }
      if (this.offlineQueue) {
        this.offlineQueue.clear();
      }
      if (this.analyticsManager) {
        this.analyticsManager.stopFlushTimer();
      }

      // Save cache and queue to storage
      if (this.resourceCache) {
        this.resourceCache.saveToStorage();
      }
      if (this.offlineQueue) {
        this.offlineQueue.saveToStorage();
      }

      // Clear current user
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
