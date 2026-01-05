'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CryptoJS = require('crypto-js');
var localforage = require('localforage');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);
var localforage__default = /*#__PURE__*/_interopDefaultLegacy(localforage);

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
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

class EncryptionUtils {
  constructor(encryptionKey) {
    this.encryptionKey = encryptionKey;
  }

  /**
   * Encrypt data using AES encryption
   * @param {any} data - Data to encrypt
   * @returns {string} - Encrypted string
   */
  encrypt(data) {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS__default["default"].AES.encrypt(jsonString, this.encryptionKey);
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
  decrypt(encryptedData) {
    try {
      const decrypted = CryptoJS__default["default"].AES.decrypt(encryptedData, this.encryptionKey);
      const decryptedString = decrypted.toString(CryptoJS__default["default"].enc.Utf8);
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
  hash(data) {
    try {
      return CryptoJS__default["default"].SHA256(data).toString();
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
  generateRandomString(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a secure salt for password hashing
   * @returns {string} - Random salt
   */
  generateSalt() {
    return this.generateRandomString(16);
  }

  /**
   * Hash password with salt using PBKDF2
   * @param {string} password - Password to hash
   * @param {string} salt - Salt to use (optional, will generate if not provided)
   * @returns {Object} - Object containing hash and salt
   */
  hashPassword(password, salt = null) {
    try {
      const actualSalt = salt || this.generateSalt();
      const hash = CryptoJS__default["default"].PBKDF2(password, actualSalt, {
        keySize: 256 / 32,
        iterations: 10000
      }).toString();
      return {
        hash,
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
  verifyPassword(password, hash, salt) {
    try {
      const {
        hash: computedHash
      } = this.hashPassword(password, salt);
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
  createToken(payload, expiresIn = 3600) {
    // 1 hour default
    try {
      const header = {
        alg: 'HS256',
        typ: 'JWT'
      };
      const now = Math.floor(Date.now() / 1000);
      const tokenPayload = _objectSpread2(_objectSpread2({}, payload), {}, {
        iat: now,
        exp: now + expiresIn
      });
      const headerBase64 = this.base64Encode(JSON.stringify(header));
      const payloadBase64 = this.base64Encode(JSON.stringify(tokenPayload));
      const signature = this.hash(`${headerBase64}.${payloadBase64}`);
      return `${headerBase64}.${payloadBase64}.${signature}`;
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
  verifyToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      const [headerBase64, payloadBase64, signature] = parts;
      const expectedSignature = this.hash(`${headerBase64}.${payloadBase64}`);
      if (signature !== expectedSignature) {
        throw new Error('Invalid token signature');
      }
      const payload = JSON.parse(this.base64Decode(payloadBase64));
      const now = Math.floor(Date.now() / 1000);
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
  base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  /**
   * Base64 decode string
   * @param {string} str - String to decode
   * @returns {string} - Decoded string
   */
  base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
  }

  /**
   * Encrypt data using AES encryption with a specific key
   * @param {any} data - Data to encrypt
   * @param {string} key - Encryption key to use
   * @returns {string} - Encrypted string
   */
  encryptWithKey(data, key) {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS__default["default"].AES.encrypt(jsonString, key);
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
  decryptWithKey(encryptedData, key) {
    try {
      const decrypted = CryptoJS__default["default"].AES.decrypt(encryptedData, key);
      const decryptedString = decrypted.toString(CryptoJS__default["default"].enc.Utf8);
      if (!decryptedString) {
        throw new Error('Decryption failed - invalid data');
      }
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }
}

/**
 * StorageManager - Local storage caching and synchronization
 * Handles encrypted storage of authentication data
 */
class StorageManager {
  constructor(prefix = 'tab_auth_') {
    this.prefix = prefix;
    this.encryptionUtils = null; // Will be set by AuthOrchestrator
    this.cache = new Map(); // In-memory cache for frequently accessed items
    this.cacheTimeout = 300000; // 5 minutes cache timeout

    // Initialize localforage with proper configuration
    this.store = localforage__default["default"].createInstance({
      name: 'TabAuth',
      storeName: 'authentication'
    });
  }
  setEncryptionUtils(encryptionUtils) {
    this.encryptionUtils = encryptionUtils;
  }

  /**
   * Get an item from storage (with caching)
   * @param {string} key - Key to retrieve
   * @returns {Promise<any>} - Retrieved value or null
   */
  async getItem(key) {
    const fullKey = this.prefix + key;

    // Check in-memory cache first
    if (this.cache.has(fullKey)) {
      const cachedItem = this.cache.get(fullKey);
      if (Date.now() - cachedItem.timestamp < this.cacheTimeout) {
        return cachedItem.value;
      } else {
        // Cache expired, remove from cache
        this.cache.delete(fullKey);
      }
    }
    try {
      let value = await this.store.getItem(fullKey);
      if (value !== null && this.encryptionUtils) {
        // Decrypt the value
        value = this.encryptionUtils.decrypt(value);
      }

      // Add to cache
      if (value !== null) {
        this.cache.set(fullKey, {
          value,
          timestamp: Date.now()
        });
      }
      return value;
    } catch (error) {
      console.error(`Error getting item ${fullKey}:`, error);
      return null;
    }
  }

  /**
   * Set an item in storage (with caching)
   * @param {string} key - Key to store
   * @param {any} value - Value to store
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    const fullKey = this.prefix + key;
    try {
      let storedValue = value;
      if (this.encryptionUtils) {
        // Encrypt the value before storing
        storedValue = this.encryptionUtils.encrypt(value);
      }
      await this.store.setItem(fullKey, storedValue);

      // Update cache
      this.cache.set(fullKey, {
        value,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error(`Error setting item ${fullKey}:`, error);
      throw error;
    }
  }

  /**
   * Remove an item from storage
   * @param {string} key - Key to remove
   * @returns {Promise<void>}
   */
  async removeItem(key) {
    const fullKey = this.prefix + key;
    try {
      await this.store.removeItem(fullKey);

      // Remove from cache
      this.cache.delete(fullKey);
    } catch (error) {
      console.error(`Error removing item ${fullKey}:`, error);
      throw error;
    }
  }

  /**
   * Clear all items from storage
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      await this.store.clear();

      // Clear cache
      this.cache.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys from storage
   * @returns {Promise<Array<string>>} - Array of keys
   */
  async keys() {
    try {
      return await this.store.keys();
    } catch (error) {
      console.error('Error getting storage keys:', error);
      return [];
    }
  }

  /**
   * Get storage size information
   * @returns {Promise<Object>} - Size information
   */
  async size() {
    try {
      const keys = await this.keys();
      let totalSize = 0;
      for (const key of keys) {
        const value = await this.store.getItem(key);
        if (value) {
          const size = JSON.stringify(value).length;
          totalSize += size;
        }
      }
      return {
        keys: keys.length,
        approximateSize: totalSize // in bytes
      };
    } catch (error) {
      console.error('Error getting storage size:', error);
      return {
        keys: 0,
        approximateSize: 0
      };
    }
  }

  /**
   * Synchronize with online storage (when online)
   * @param {string} userId - User ID to sync for
   * @returns {Promise<boolean>} - True if sync successful
   */
  async syncWithOnline(userId) {
    if (!userId) {
      console.warn('Cannot sync without user ID');
      return false;
    }
    try {
      // Get all local items for this user
      const keys = await this.keys();
      const localData = {};
      for (const key of keys) {
        if (key.startsWith(this.prefix)) {
          const value = await this.getItem(key.replace(this.prefix, ''));
          localData[key] = value;
        }
      }

      // In a real implementation, you would send this to an online service
      // For now, we'll just return true to indicate sync capability
      console.log(`Syncing ${Object.keys(localData).length} items for user ${userId}`);
      return true;
    } catch (error) {
      console.error('Error during sync:', error);
      return false;
    }
  }

  /**
   * Get cached value without checking storage
   * @param {string} key - Key to check in cache
   * @returns {any} - Cached value or undefined
   */
  getCached(key) {
    const fullKey = this.prefix + key;
    const cachedItem = this.cache.get(fullKey);
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
  async preload(keys) {
    const promises = keys.map(key => this.getItem(key));
    await Promise.all(promises);
  }

  /**
   * Remove expired cache entries
   */
  cleanupCache() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp >= this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      timeout: this.cacheTimeout
    };
  }
}

const _excluded = ["email", "password"];
class LocalAuth {
  constructor(config = {}) {
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
  async signup(credentials) {
    try {
      const {
          email,
          password
        } = credentials,
        profile = _objectWithoutProperties(credentials, _excluded);

      // Validate inputs
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }

      // Check if user already exists
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        };
      }

      // Hash the password
      const {
        hash,
        salt
      } = this.encryptionUtils.hashPassword(password);

      // Create user object
      const user = {
        id: this.generateUserId(),
        email: email.toLowerCase(),
        passwordHash: hash,
        passwordSalt: salt,
        profile: profile || {},
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
        offline: true
      };

      // Store user in local storage
      const users = await this.getAllUsers();
      users[user.email] = user;
      await this.storageManager.setItem('users', users);

      // Login the user after successful signup
      const loginResult = await this.login({
        email,
        password
      });
      return {
        success: true,
        user: loginResult.user,
        message: 'Account created successfully'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Failed to create account: ' + error.message
      };
    }
  }

  /**
   * Login with local credentials
   * @param {Object} credentials - Login credentials {email, password}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async login(credentials) {
    try {
      const {
        email,
        password
      } = credentials;
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }

      // Get user by email
      const user = await this.getUserByEmail(email.toLowerCase());
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Verify password
      const isValid = this.encryptionUtils.verifyPassword(password, user.passwordHash, user.passwordSalt);
      if (!isValid) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Update last login time
      user.lastLoginAt = new Date().toISOString();
      await this.updateUser(user);

      // Create token for the session
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + this.config.tokenExpiry
      };
      const token = this.encryptionUtils.createToken(tokenPayload, this.config.tokenExpiry);

      // Set current user and token
      this.currentUser = user;
      this.currentToken = token;
      return {
        success: true,
        user: _objectSpread2({}, user),
        token: token,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Failed to login: ' + error.message
      };
    }
  }

  /**
   * Logout from local authentication
   * @returns {Promise<Object>} - Result with success status
   */
  async logout() {
    try {
      this.currentUser = null;
      this.currentToken = null;
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: 'Failed to logout: ' + error.message
      };
    }
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} - Current user object or null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if a user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    if (!this.currentUser || !this.currentToken) {
      return false;
    }

    // Verify token is still valid
    const payload = this.encryptionUtils.verifyToken(this.currentToken);
    return !!payload;
  }

  /**
   * Verify the current session token
   * @returns {Promise<Object|null>} - User object if token is valid, null otherwise
   */
  async verifySession() {
    if (!this.currentToken) {
      return null;
    }
    const payload = this.encryptionUtils.verifyToken(this.currentToken);
    if (!payload) {
      return null;
    }

    // Get user by ID from payload
    const user = await this.getUserById(payload.userId);
    if (!user) {
      return null;
    }

    // Update current user
    this.currentUser = user;
    return user;
  }

  /**
   * Update user profile information
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Result with success status
   */
  async updateProfile(updates) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }
    try {
      // Update user profile
      this.currentUser.profile = _objectSpread2(_objectSpread2({}, this.currentUser.profile), updates);

      // Update user in storage
      await this.updateUser(this.currentUser);
      return {
        success: true,
        user: _objectSpread2({}, this.currentUser),
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: 'Failed to update profile: ' + error.message
      };
    }
  }

  /**
   * Change user password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Result with success status
   */
  async changePassword(oldPassword, newPassword) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }
    try {
      // Verify old password
      const isValid = this.encryptionUtils.verifyPassword(oldPassword, this.currentUser.passwordHash, this.currentUser.passwordSalt);
      if (!isValid) {
        return {
          success: false,
          error: 'Current password is incorrect'
        };
      }

      // Hash new password
      const {
        hash,
        salt
      } = this.encryptionUtils.hashPassword(newPassword);

      // Update password
      this.currentUser.passwordHash = hash;
      this.currentUser.passwordSalt = salt;

      // Update user in storage
      await this.updateUser(this.currentUser);
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: 'Failed to change password: ' + error.message
      };
    }
  }

  /**
   * Get all stored users
   * @private
   * @returns {Promise<Object>} - Object with email as keys and user objects as values
   */
  async getAllUsers() {
    try {
      const users = await this.storageManager.getItem('users');
      return users || {};
    } catch (error) {
      console.error('Error getting all users:', error);
      return {};
    }
  }

  /**
   * Get user by email
   * @private
   * @param {string} email - Email to search for
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserByEmail(email) {
    try {
      const users = await this.getAllUsers();
      return users[email.toLowerCase()] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  /**
   * Get user by ID
   * @private
   * @param {string} userId - User ID to search for
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserById(userId) {
    try {
      const users = await this.getAllUsers();
      return Object.values(users).find(user => user.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  /**
   * Update user in storage
   * @private
   * @param {Object} user - User object to update
   * @returns {Promise<void>}
   */
  async updateUser(user) {
    try {
      const users = await this.getAllUsers();
      users[user.email.toLowerCase()] = user;
      await this.storageManager.setItem('users', users);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Generate a unique user ID
   * @private
   * @returns {string} - Generated user ID
   */
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Delete current user account
   * @returns {Promise<Object>} - Result with success status
   */
  async deleteAccount() {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }
    try {
      // Remove user from storage
      const users = await this.getAllUsers();
      delete users[this.currentUser.email.toLowerCase()];
      await this.storageManager.setItem('users', users);

      // Clear current user
      this.currentUser = null;
      this.currentToken = null;
      return {
        success: true,
        message: 'Account deleted successfully'
      };
    } catch (error) {
      console.error('Account deletion error:', error);
      return {
        success: false,
        error: 'Failed to delete account: ' + error.message
      };
    }
  }
}

/**
 * OnlineAuth - Online authentication system
 * Handles authentication with online services like Supabase
 */

class OnlineAuth {
  constructor(config = {}) {
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
  initializeProvider() {
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
  async login(credentials) {
    try {
      const result = await this.provider.login(credentials);
      if (result.success) {
        this.currentUser = result.user;
        this.currentToken = result.token || result.session?.access_token;
      }
      return result;
    } catch (error) {
      console.error('Online login error:', error);
      return {
        success: false,
        error: 'Failed to login: ' + error.message
      };
    }
  }

  /**
   * Signup with online service
   * @param {Object} credentials - User credentials {email, password, profile}
   * @returns {Promise<Object>} - Result with success status and user data
   */
  async signup(credentials) {
    try {
      const result = await this.provider.signup(credentials);
      if (result.success) {
        this.currentUser = result.user;
        this.currentToken = result.token || result.session?.access_token;
      }
      return result;
    } catch (error) {
      console.error('Online signup error:', error);
      return {
        success: false,
        error: 'Failed to signup: ' + error.message
      };
    }
  }

  /**
   * Logout from online service
   * @returns {Promise<Object>} - Result with success status
   */
  async logout() {
    try {
      const result = await this.provider.logout();
      this.currentUser = null;
      this.currentToken = null;
      return result;
    } catch (error) {
      console.error('Online logout error:', error);
      return {
        success: false,
        error: 'Failed to logout: ' + error.message
      };
    }
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} - Current user object or null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if a user is authenticated online
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    return !!this.currentUser && !!this.currentToken;
  }

  /**
   * Verify the current session with the online provider
   * @returns {Promise<Object|null>} - User object if session is valid, null otherwise
   */
  async verifySession() {
    try {
      if (!this.currentToken) {
        return null;
      }
      const result = await this.provider.verifySession(this.currentToken);
      if (result.success) {
        this.currentUser = result.user;
        return result.user;
      }
      return null;
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  }

  /**
   * Refresh the current session token
   * @returns {Promise<Object>} - Result with success status and new token
   */
  async refreshToken() {
    try {
      if (!this.currentToken) {
        return {
          success: false,
          error: 'No token to refresh'
        };
      }
      const result = await this.provider.refreshToken(this.currentToken);
      if (result.success) {
        this.currentToken = result.token || result.session?.access_token;
      }
      return result;
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        error: 'Failed to refresh token: ' + error.message
      };
    }
  }

  /**
   * Request password reset
   * @param {string} email - Email to send reset link to
   * @returns {Promise<Object>} - Result with success status
   */
  async requestPasswordReset(email) {
    try {
      return await this.provider.requestPasswordReset(email);
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: 'Failed to request password reset: ' + error.message
      };
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Result with success status
   */
  async resetPassword(token, newPassword) {
    try {
      return await this.provider.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Failed to reset password: ' + error.message
      };
    }
  }

  /**
   * Update user profile information
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Result with success status
   */
  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
      const result = await this.provider.updateProfile(this.currentUser.id, updates);
      if (result.success) {
        this.currentUser = _objectSpread2(_objectSpread2({}, this.currentUser), updates);
      }
      return result;
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: 'Failed to update profile: ' + error.message
      };
    }
  }

  /**
   * Authenticate access to a specific resource
   * @param {string} resourceUrl - URL of the resource to access
   * @param {Object} user - User object
   * @returns {Promise<Object>} - Result with access status
   */
  async authenticateResource(resourceUrl, user) {
    try {
      return await this.provider.authenticateResource(resourceUrl, user);
    } catch (error) {
      console.error('Resource authentication error:', error);
      return {
        success: false,
        error: 'Failed to authenticate resource access: ' + error.message
      };
    }
  }

  /**
   * Get user's available permissions
   * @returns {Promise<Object>} - Permissions object
   */
  async getUserPermissions() {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
      return await this.provider.getUserPermissions(this.currentUser.id);
    } catch (error) {
      console.error('Get user permissions error:', error);
      return {
        success: false,
        error: 'Failed to get user permissions: ' + error.message
      };
    }
  }
}

// Base adapter class
class BaseAdapter {
  constructor(config) {
    this.config = config;
  }
  async login(credentials) {
    throw new Error('Login method must be implemented by subclass');
  }
  async signup(credentials) {
    throw new Error('Signup method must be implemented by subclass');
  }
  async logout() {
    throw new Error('Logout method must be implemented by subclass');
  }
  async verifySession(token) {
    throw new Error('VerifySession method must be implemented by subclass');
  }
  async refreshToken(token) {
    throw new Error('RefreshToken method must be implemented by subclass');
  }
  async requestPasswordReset(email) {
    throw new Error('RequestPasswordReset method must be implemented by subclass');
  }
  async resetPassword(token, newPassword) {
    throw new Error('ResetPassword method must be implemented by subclass');
  }
  async updateProfile(userId, updates) {
    throw new Error('UpdateProfile method must be implemented by subclass');
  }
  async authenticateResource(resourceUrl, user) {
    throw new Error('AuthenticateResource method must be implemented by subclass');
  }
  async getUserPermissions(userId) {
    throw new Error('GetUserPermissions method must be implemented by subclass');
  }
}

// Supabase adapter
class SupabaseAdapter extends BaseAdapter {
  constructor(config) {
    super(config);

    // Import Supabase client if available, otherwise use fetch
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseKey = config.supabaseKey;
    this.initialized = false;
  }
  async initialize() {
    if (this.initialized) return;
    try {
      // Try to import Supabase client
      const {
        createClient
      } = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@supabase/supabase-js')); });
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
      this.initialized = true;
    } catch (error) {
      console.warn('Supabase client not available, using fetch API instead');
      // Fallback to fetch-based implementation
      this.initialized = true;
    }
  }
  async login(credentials) {
    await this.initialize();
    try {
      if (this.supabase) {
        // Use Supabase client
        const {
          data,
          error
        } = await this.supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error) {
          throw new Error(error.message);
        }
        return {
          success: true,
          user: this.formatUser(data.user),
          token: data.session?.access_token,
          session: data.session
        };
      } else {
        // Fallback to fetch
        const response = await fetch(`${this.supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error?.message || 'Login failed');
        }
        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.access_token,
          session: result
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    await this.initialize();
    try {
      if (this.supabase) {
        // Use Supabase client
        const {
          data,
          error
        } = await this.supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            data: credentials.profile || {}
          }
        });
        if (error) {
          throw new Error(error.message);
        }
        return {
          success: true,
          user: this.formatUser(data.user),
          token: data.session?.access_token,
          session: data.session
        };
      } else {
        // Fallback to fetch
        const response = await fetch(`${this.supabaseUrl}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            data: credentials.profile || {}
          })
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error?.message || 'Signup failed');
        }
        return {
          success: true,
          user: this.formatUser(result.user),
          token: result.access_token,
          session: result
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    await this.initialize();
    try {
      if (this.supabase) {
        const {
          error
        } = await this.supabase.auth.signOut();
        if (error) {
          throw new Error(error.message);
        }
      } else {
        // For fetch implementation, we clear the token locally
        // Actual server-side logout would require additional endpoint
        localStorage.removeItem('supabase_token');
      }
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async verifySession(token) {
    await this.initialize();
    try {
      if (this.supabase) {
        // Use Supabase client with token
        const {
          data,
          error
        } = await this.supabase.auth.getUser(token);
        if (error) {
          throw new Error(error.message);
        }
        return {
          success: true,
          user: this.formatUser(data.user)
        };
      } else {
        // Fallback to fetch with token
        const response = await fetch(`${this.supabaseUrl}/auth/v1/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'apikey': this.supabaseKey
          }
        });
        const user = await response.json();
        if (!response.ok) {
          throw new Error(user.error?.message || 'Session verification failed');
        }
        return {
          success: true,
          user: this.formatUser(user)
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  formatUser(user) {
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
}

// Firebase adapter (simplified)
class FirebaseAuthAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiKey = config.apiKey;
    this.authDomain = config.authDomain;
  }
  async login(credentials) {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
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
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Login failed');
      }
      return {
        success: true,
        user: this.formatUser(result),
        token: result.idToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
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
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Signup failed');
      }
      return {
        success: true,
        user: this.formatUser(result),
        token: result.idToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    // Firebase tokens are typically just cleared locally
    // Actual server-side revocation would require additional calls
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
  async verifySession(token) {
    try {
      const response = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken: token
        })
      });
      const result = await response.json();
      if (!response.ok || !result.users || result.users.length === 0) {
        throw new Error('Invalid session');
      }
      return {
        success: true,
        user: this.formatUser(result.users[0])
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  formatUser(userData) {
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
}

// Auth0 adapter (simplified)
class Auth0Adapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.domain = config.domain;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }
  async login(credentials) {
    try {
      const response = await fetch(`https://${this.domain}/oauth/token`, {
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
          audience: `https://${this.domain}/api/v2/`,
          scope: 'openid profile email'
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error_description || 'Login failed');
      }
      return {
        success: true,
        user: await this.getUserInfo(result.access_token),
        token: result.access_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    try {
      const response = await fetch(`https://${this.domain}/dbconnections/signup`, {
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
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.description || 'Signup failed');
      }

      // After signup, need to login to get token
      return await this.login(credentials);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async getUserInfo(accessToken) {
    try {
      const response = await fetch(`https://${this.domain}/userinfo`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userInfo = await response.json();
      return {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        nickname: userInfo.nickname,
        picture: userInfo.picture,
        profile: userInfo,
        online: true
      };
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }
  async verifySession(token) {
    try {
      const user = await this.getUserInfo(token);
      return {
        success: true,
        user: user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    // Auth0 logout typically involves clearing tokens locally
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
}

// Default adapter for custom providers
class DefaultOnlineAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }
  async login(credentials) {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      return {
        success: true,
        user: result.user,
        token: result.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    try {
      const response = await fetch(`${this.apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      return {
        success: true,
        user: result.user,
        token: result.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    try {
      await fetch(`${this.apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async verifySession(token) {
    try {
      const response = await fetch(`${this.apiUrl}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Session verification failed');
      }
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

/**
 * NetworkManager - Network status detection and management
 * Handles online/offline detection and network-related functionality
 */

class NetworkManager {
  constructor() {
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
  async isOnline() {
    // First check browser's online status
    if (!navigator.onLine) {
      this.isOnlineStatus = false;
      return false;
    }

    // If browser says we're online, double-check with a real request
    try {
      await this.ping();
      this.isOnlineStatus = true;
      return true;
    } catch (error) {
      this.isOnlineStatus = false;
      return false;
    }
  }

  /**
   * Ping a URL to check actual connectivity
   * @param {string} url - URL to ping (optional, defaults to checkUrl)
   * @returns {Promise<boolean>} - True if ping successful
   */
  async ping(url = this.checkUrl) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Network check timeout'));
      }, this.timeout);
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        signal: controller.signal
      }).then(response => {
        clearTimeout(timeoutId);
        if (response.ok) {
          resolve(true);
        } else {
          reject(new Error(`Network check failed with status: ${response.status}`));
        }
      }).catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
    });
  }

  /**
   * Start monitoring network status changes
   * @param {number} interval - Interval in milliseconds to check connectivity (optional)
   */
  startMonitoring(interval = 5000) {
    // Set up browser online/offline event listeners
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));

    // Set up periodic connectivity checks
    if (interval > 0) {
      this.checkInterval = setInterval(async () => {
        const currentStatus = await this.isOnline();
        if (currentStatus !== this.isOnlineStatus) {
          this.isOnlineStatus = currentStatus;
          this.notifyListeners(currentStatus);
        }
      }, interval);
    }
  }

  /**
   * Stop monitoring network status changes
   */
  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Handle online event
   * @private
   */
  handleOnline() {
    this.isOnlineStatus = true;
    this.notifyListeners(true);
  }

  /**
   * Handle offline event
   * @private
   */
  handleOffline() {
    this.isOnlineStatus = false;
    this.notifyListeners(false);
  }

  /**
   * Add a listener for network status changes
   * @param {Function} callback - Callback function to call when status changes
   * @returns {Function} - Function to remove the listener
   */
  addStatusListener(callback) {
    this.listeners.push(callback);

    // Return a function to remove the listener
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of status change
   * @private
   * @param {boolean} isOnline - New online status
   */
  notifyListeners(isOnline) {
    this.listeners.forEach(callback => {
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
  getCurrentStatus() {
    return this.isOnlineStatus;
  }

  /**
   * Set the URL to use for connectivity checks
   * @param {string} url - URL to check
   */
  setCheckUrl(url) {
    this.checkUrl = url;
  }

  /**
   * Set the timeout for connectivity checks
   * @param {number} timeout - Timeout in milliseconds
   */
  setTimeout(timeout) {
    this.timeout = timeout;
  }
}

/**
 * SyncStatusManager - Manages real-time synchronization status
 * Provides detailed feedback about sync progress and status
 */

class SyncStatusManager {
  constructor() {
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
  updateStatus(statusUpdate) {
    this.syncStatus = _objectSpread2(_objectSpread2({}, this.syncStatus), statusUpdate);
    this.notifyListeners();
  }

  /**
   * Start sync process
   */
  startSync() {
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
  updateProgress(progress, message) {
    this.updateStatus({
      syncProgress: Math.min(100, Math.max(0, progress)),
      syncMessage: message
    });
  }

  /**
   * Add to sync queue
   * @param {Object} operation - Operation to sync
   */
  addToQueue(operation) {
    this.syncQueue.push(operation);
    this.updateStatus({
      pendingOperations: this.syncQueue.length
    });
  }

  /**
   * Process queue item
   */
  processQueueItem() {
    if (this.syncQueue.length > 0) {
      const operation = this.syncQueue.shift();
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
  completeSync() {
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
  recordError(error) {
    const errorObj = {
      timestamp: new Date().toISOString(),
      error: error.message || error,
      operation: error.operation || 'unknown'
    };
    this.updateStatus({
      syncErrors: [...this.syncStatus.syncErrors, errorObj],
      syncMessage: `Sync error: ${error.message || error}`
    });
  }

  /**
   * Add listener for sync status changes
   * @param {Function} callback - Callback function
   * @returns {Function} - Function to remove listener
   */
  addListener(callback) {
    this.listeners.push(callback);

    // Return function to remove listener
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of status change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.getSyncStatus());
      } catch (error) {
        console.error('Error in sync status listener:', error);
      }
    });
  }

  /**
   * Get current sync status
   * @returns {Object} - Sync status object
   */
  getSyncStatus() {
    return _objectSpread2({}, this.syncStatus);
  }

  /**
   * Reset sync status
   */
  reset() {
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
}

/**
 * ConflictResolver - Resolves conflicts between offline and online data
 * Implements various conflict resolution strategies
 */

class ConflictResolver {
  constructor() {
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
  resolve(conflict, strategy = 'last-write-wins', userChoiceCallback = null) {
    if (!this.strategies[strategy]) {
      throw new Error(`Unknown conflict resolution strategy: ${strategy}`);
    }
    return this.strategies[strategy](conflict, userChoiceCallback);
  }

  /**
   * Last write wins strategy
   * @param {Object} conflict - Conflict object
   * @returns {Object} - Resolved data
   */
  lastWriteWins(conflict) {
    const localTime = new Date(conflict.local.timestamp || conflict.local.createdAt || Date.now()).getTime();
    const remoteTime = new Date(conflict.remote.timestamp || conflict.remote.createdAt || Date.now()).getTime();
    return localTime >= remoteTime ? conflict.local.data : conflict.remote.data;
  }

  /**
   * Server wins strategy
   * @param {Object} conflict - Conflict object
   * @returns {Object} - Resolved data
   */
  serverWins(conflict) {
    return conflict.remote.data;
  }

  /**
   * Client wins strategy
   * @param {Object} conflict - Conflict object
   * @returns {Object} - Resolved data
   */
  clientWins(conflict) {
    return conflict.local.data;
  }

  /**
   * Merge strategy - combines local and remote data
   * @param {Object} conflict - Conflict object
   * @returns {Object} - Merged data
   */
  merge(conflict) {
    // Deep merge of local and remote data
    return this.deepMerge(conflict.remote.data, conflict.local.data);
  }

  /**
   * User choice strategy - prompts user to choose
   * @param {Object} conflict - Conflict object
   * @param {Function} userChoiceCallback - Callback to get user choice
   * @returns {Object} - User-selected data
   */
  userChoice(conflict, userChoiceCallback) {
    if (!userChoiceCallback) {
      throw new Error('userChoice strategy requires a userChoiceCallback');
    }
    const choice = userChoiceCallback({
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
  deepMerge(target, source) {
    const output = _objectSpread2({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, {
              [key]: source[key]
            });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, {
            [key]: source[key]
          });
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
  isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  /**
   * Detect conflicts between local and remote data
   * @param {Object} localData - Local data
   * @param {Object} remoteData - Remote data
   * @param {Object} localMetadata - Local metadata
   * @param {Object} remoteMetadata - Remote metadata
   * @returns {boolean} - True if conflict detected
   */
  detectConflict(localData, remoteData, localMetadata, remoteMetadata) {
    // Simple conflict detection based on timestamps
    const localTime = new Date(localMetadata.timestamp || localMetadata.updatedAt || Date.now()).getTime();
    const remoteTime = new Date(remoteMetadata.timestamp || remoteMetadata.updatedAt || Date.now()).getTime();

    // If both have been updated after initial sync, there's a conflict
    return localTime > remoteMetadata.lastSyncTime && remoteTime > localMetadata.lastSyncTime;
  }

  /**
   * Create a conflict object
   * @param {Object} local - Local data and metadata
   * @param {Object} remote - Remote data and metadata
   * @returns {Object} - Conflict object
   */
  createConflict(local, remote) {
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
  autoResolve(conflicts, defaultStrategy = 'last-write-wins') {
    return conflicts.map(conflict => ({
      id: conflict.id,
      resolved: this.resolve(conflict, defaultStrategy)
    }));
  }
}

/**
 * KeyManager - Enhanced encryption key management
 * Manages encryption keys for different users and handles key rotation
 */
class KeyManager {
  constructor() {
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
  async initialize(baseKey) {
    this.currentKey = baseKey;
    await this.loadKeys();
  }

  /**
   * Generate a new encryption key
   * @returns {string} - New encryption key
   */
  generateKey() {
    return this.encryptionUtils.generateRandomString(32);
  }

  /**
   * Get the current encryption key
   * @returns {string} - Current encryption key
   */
  getCurrentKey() {
    return this.currentKey;
  }

  /**
   * Get user-specific encryption key
   * @param {string} userId - User ID
   * @returns {string} - User's encryption key
   */
  getUserKey(userId) {
    if (this.userKeys.has(userId)) {
      return this.userKeys.get(userId);
    }

    // Generate new key for user if not exists
    const newKey = this.generateKey();
    this.userKeys.set(userId, newKey);
    this.saveKeys();
    return newKey;
  }

  /**
   * Set user-specific encryption key
   * @param {string} userId - User ID
   * @param {string} key - Encryption key
   */
  setUserKey(userId, key) {
    this.userKeys.set(userId, key);
    this.saveKeys();
  }

  /**
   * Rotate the master encryption key
   * @param {string} newKey - New encryption key (optional)
   * @returns {string} - New encryption key
   */
  rotateKey(newKey = null) {
    const oldKey = this.currentKey;
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
  encrypt(data, userId = null) {
    const keyToUse = userId ? this.getUserKey(userId) : this.currentKey;
    return this.encryptionUtils.encryptWithKey(data, keyToUse);
  }

  /**
   * Decrypt data trying all available keys
   * @param {string} encryptedData - Encrypted data
   * @param {string} userId - User ID (optional, for user-specific encryption)
   * @returns {any} - Decrypted data
   */
  decrypt(encryptedData, userId = null) {
    // Try with user-specific key first if user ID provided
    if (userId) {
      const userKey = this.getUserKey(userId);
      try {
        return this.encryptionUtils.decryptWithKey(encryptedData, userKey);
      } catch (error) {
        // Continue to try other keys
      }
    }

    // Try with current key
    try {
      const keyToUse = userId ? this.getUserKey(userId) : this.currentKey;
      return this.encryptionUtils.decryptWithKey(encryptedData, keyToUse);
    } catch (error) {
      // Continue to try historical keys
    }

    // Try with historical keys
    for (const historyItem of [...this.keyHistory].reverse()) {
      try {
        return this.encryptionUtils.decryptWithKey(encryptedData, historyItem.key);
      } catch (error) {
        // Continue to next key
      }
    }
    throw new Error('Failed to decrypt data with any available key');
  }

  /**
   * Save keys to storage
   */
  async saveKeys() {
    try {
      const keysData = {
        currentKey: this.currentKey,
        keyHistory: this.keyHistory,
        userKeys: Array.from(this.userKeys.entries())
      };

      // Encrypt the keys data before storing
      const encryptedKeys = this.encryptionUtils.encrypt(keysData);
      localStorage.setItem(this.storageKey, encryptedKeys);
    } catch (error) {
      console.error('Error saving keys:', error);
    }
  }

  /**
   * Load keys from storage
   */
  async loadKeys() {
    try {
      const encryptedKeys = localStorage.getItem(this.storageKey);
      if (encryptedKeys) {
        const keysData = this.encryptionUtils.decrypt(encryptedKeys);
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
  }

  /**
   * Clear all keys
   */
  clear() {
    this.currentKey = null;
    this.keyHistory = [];
    this.userKeys.clear();
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Check if key rotation is needed
   * @returns {boolean} - True if rotation is needed
   */
  needsRotation() {
    if (!this.keyHistory.length) return false;
    const lastRotation = new Date(this.keyHistory[this.keyHistory.length - 1].timestamp);
    const timeSinceRotation = Date.now() - lastRotation.getTime();
    return timeSinceRotation > this.keyRotationInterval;
  }

  /**
   * Rotate key if needed
   * @returns {boolean} - True if rotation occurred
   */
  async rotateIfNeeded() {
    if (this.needsRotation()) {
      this.rotateKey();
      return true;
    }
    return false;
  }

  /**
   * Re-encrypt data with new key
   * @param {any} data - Data to re-encrypt
   * @param {string} userId - User ID (optional)
   * @returns {string} - Re-encrypted data
   */
  reencryptData(data, userId = null) {
    // First decrypt with old key, then encrypt with new key
    const decrypted = this.decrypt(this.encrypt(data, userId), userId);
    return this.encrypt(decrypted, userId);
  }
}

/**
 * MigrationManager - Handles migration of existing online accounts to offline capabilities
 * Provides a clear path for users to transition between online and offline modes
 */

class MigrationManager {
  constructor(storageManager) {
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
  async migrateAccount(onlineAccount, provider) {
    try {
      this.updateStatus({
        step: 'detect_existing_accounts',
        progress: 0
      });

      // Step 1: Verify account exists and is valid
      if (!onlineAccount || !onlineAccount.id) {
        throw new Error('Invalid online account data');
      }
      this.updateStatus({
        progress: 20
      });

      // Step 2: Backup online data
      this.updateStatus({
        step: 'backup_online_data',
        progress: 40
      });
      await this.backupOnlineData(onlineAccount, provider);

      // Step 3: Create offline equivalent
      this.updateStatus({
        step: 'create_offline_equivalent',
        progress: 60
      });
      const offlineAccount = await this.createOfflineAccount(onlineAccount, provider);

      // Step 4: Verify migration
      this.updateStatus({
        step: 'verify_migration',
        progress: 80
      });
      const isVerified = await this.verifyMigration(onlineAccount, offlineAccount);
      if (!isVerified) {
        throw new Error('Migration verification failed');
      }

      // Step 5: Finalize migration
      this.updateStatus({
        step: 'finalize_migration',
        progress: 90
      });
      await this.finalizeMigration(onlineAccount, offlineAccount);
      this.updateStatus({
        progress: 100,
        completed: true,
        migratedAccounts: [...this.currentMigrationStatus.migratedAccounts, offlineAccount.id]
      });
      return {
        success: true,
        message: 'Account migrated successfully',
        offlineAccount
      };
    } catch (error) {
      this.recordError(error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Backup online account data
   * @param {Object} account - Online account
   * @param {string} provider - Authentication provider
   */
  async backupOnlineData(account, provider) {
    const backupData = {
      originalAccount: account,
      provider: provider,
      timestamp: new Date().toISOString(),
      backupId: this.generateBackupId()
    };
    await this.storageManager.setItem(`migration_backup_${account.id}`, backupData);
  }

  /**
   * Create offline equivalent of online account
   * @param {Object} onlineAccount - Online account
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Offline account
   */
  async createOfflineAccount(onlineAccount, provider) {
    // Create offline user object
    const offlineAccount = {
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
    };

    // Store offline account
    await this.storageManager.setItem(`offline_user_${onlineAccount.email}`, offlineAccount);
    return offlineAccount;
  }

  /**
   * Verify that migration was successful
   * @param {Object} onlineAccount - Original online account
   * @param {Object} offlineAccount - Migrated offline account
   * @returns {Promise<boolean>} - True if verified
   */
  async verifyMigration(onlineAccount, offlineAccount) {
    // Verify essential data matches
    return onlineAccount.email === offlineAccount.email && onlineAccount.id === offlineAccount.id;
  }

  /**
   * Finalize migration process
   * @param {Object} onlineAccount - Original online account
   * @param {Object} offlineAccount - Migrated offline account
   */
  async finalizeMigration(onlineAccount, offlineAccount) {
    // Mark migration as complete
    const migrationRecord = {
      onlineId: onlineAccount.id,
      offlineId: offlineAccount.id,
      provider: offlineAccount.migratedFrom.provider,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    await this.storageManager.setItem(`migration_record_${onlineAccount.id}`, migrationRecord);
  }

  /**
   * Migrate multiple accounts at once
   * @param {Array} accounts - Array of online accounts
   * @param {string} provider - Authentication provider
   * @returns {Promise<Object>} - Migration results
   */
  async migrateMultipleAccounts(accounts, provider) {
    const results = {
      successful: [],
      failed: [],
      total: accounts.length
    };
    for (const account of accounts) {
      const result = await this.migrateAccount(account, provider);
      if (result.success) {
        results.successful.push(result.offlineAccount);
      } else {
        results.failed.push({
          account: account,
          error: result.error
        });
      }
    }
    return results;
  }

  /**
   * Check if an account needs migration
   * @param {Object} account - Account to check
   * @returns {Promise<boolean>} - True if migration needed
   */
  async needsMigration(account) {
    if (!account) return false;

    // Check if we already have an offline version
    const offlineAccount = await this.storageManager.getItem(`offline_user_${account.email}`);
    if (offlineAccount) return false; // Already migrated

    // Check if it's a new account that doesn't need migration
    const migrationRecord = await this.storageManager.getItem(`migration_record_${account.id}`);
    return !migrationRecord; // Needs migration if no record exists
  }

  /**
   * Get migration status for an account
   * @param {string} accountId - Account ID
   * @returns {Promise<Object>} - Migration status
   */
  async getMigrationStatus(accountId) {
    const record = await this.storageManager.getItem(`migration_record_${accountId}`);
    if (record) {
      return {
        needsMigration: false,
        status: record.status,
        timestamp: record.timestamp
      };
    }
    return {
      needsMigration: true,
      status: 'pending',
      timestamp: null
    };
  }

  /**
   * Rollback migration if needed
   * @param {string} accountId - Account ID to rollback
   * @returns {Promise<Object>} - Rollback result
   */
  async rollbackMigration(accountId) {
    try {
      // Remove offline account
      await this.storageManager.removeItem(`offline_user_${accountId}`);

      // Remove migration record
      await this.storageManager.removeItem(`migration_record_${accountId}`);

      // Restore from backup if available
      const backup = await this.storageManager.getItem(`migration_backup_${accountId}`);
      if (backup) {
        // Restore backup data
        await this.storageManager.removeItem(`migration_backup_${accountId}`);
      }
      return {
        success: true,
        message: 'Migration rolled back successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update migration status
   * @param {Object} statusUpdate - Status update
   */
  updateStatus(statusUpdate) {
    this.currentMigrationStatus = _objectSpread2(_objectSpread2({}, this.currentMigrationStatus), statusUpdate);
  }

  /**
   * Record migration error
   * @param {Error} error - Error to record
   */
  recordError(error) {
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
  generateBackupId() {
    return 'backup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get current migration status
   * @returns {Object} - Current migration status
   */
  getMigrationStatus() {
    return _objectSpread2({}, this.currentMigrationStatus);
  }

  /**
   * Reset migration status
   */
  resetStatus() {
    this.currentMigrationStatus = {
      step: null,
      completed: false,
      progress: 0,
      errors: [],
      migratedAccounts: []
    };
  }
}

/**
 * ResourceCache - Advanced resource caching with configurable policies
 * Supports cache-first, network-first, and stale-while-revalidate strategies
 */

class ResourceCache {
  constructor(options = {}) {
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
  async get(resourceUrl, fetcher, options = {}) {
    const policy = options.cachePolicy || this.cachePolicy;
    const ttl = options.ttl || this.defaultTTL;
    switch (policy) {
      case 'cache-first':
        return await this.cacheFirst(resourceUrl, fetcher, ttl);
      case 'network-first':
        return await this.networkFirst(resourceUrl, fetcher, ttl);
      case 'stale-while-revalidate':
        return await this.staleWhileRevalidate(resourceUrl, fetcher, ttl);
      default:
        return await this.cacheFirst(resourceUrl, fetcher, ttl);
    }
  }

  /**
   * Cache-first strategy: return cached data if available, otherwise fetch and cache
   * @param {string} resourceUrl - Resource URL
   * @param {Function} fetcher - Function to fetch resource
   * @param {number} ttl - Time-to-live in milliseconds
   * @returns {Promise<any>} - Resource data
   */
  async cacheFirst(resourceUrl, fetcher, ttl) {
    // Check if we have cached data that's not expired
    const cached = await this.getFromCache(resourceUrl);
    if (cached && this.isNotExpired(cached, ttl)) {
      return cached.data;
    }

    // Fetch fresh data
    const data = await fetcher();
    await this.set(resourceUrl, data, ttl);
    return data;
  }

  /**
   * Network-first strategy: try network first, fall back to cache if network fails
   * @param {string} resourceUrl - Resource URL
   * @param {Function} fetcher - Function to fetch resource
   * @param {number} ttl - Time-to-live in milliseconds
   * @returns {Promise<any>} - Resource data
   */
  async networkFirst(resourceUrl, fetcher, ttl) {
    try {
      // Try to fetch from network first
      const data = await fetcher();
      await this.set(resourceUrl, data, ttl);
      return data;
    } catch (error) {
      // If network fails, try cache
      const cached = await this.getFromCache(resourceUrl);
      if (cached && this.isNotExpired(cached, ttl)) {
        return cached.data;
      }
      throw error;
    }
  }

  /**
   * Stale-while-revalidate strategy: return stale cache while fetching fresh data
   * @param {string} resourceUrl - Resource URL
   * @param {Function} fetcher - Function to fetch resource
   * @param {number} ttl - Time-to-live in milliseconds
   * @returns {Promise<any>} - Resource data
   */
  async staleWhileRevalidate(resourceUrl, fetcher, ttl) {
    // Return cached data if available (even if expired)
    const cached = await this.getFromCache(resourceUrl);
    const isStale = cached && this.isExpired(cached, ttl);
    if (cached && !isStale) {
      return cached.data;
    }

    // Fetch fresh data in background
    const fetchPromise = fetcher().then(async data => {
      await this.set(resourceUrl, data, ttl);
      return data;
    }).catch(error => {
      console.error('Error revalidating cache:', error);
      // If revalidation fails, return stale data if available
      if (cached) {
        return cached.data;
      }
      throw error;
    });

    // Return stale data immediately, fresh data when available
    if (cached) {
      return cached.data;
    }
    return fetchPromise;
  }

  /**
   * Set data in cache
   * @param {string} resourceUrl - Resource URL
   * @param {any} data - Data to cache
   * @param {number} ttl - Time-to-live in milliseconds
   * @returns {Promise<void>}
   */
  async set(resourceUrl, data, ttl = this.defaultTTL) {
    const expirationTime = Date.now() + ttl;
    const size = this.estimateSize(data);

    // Check if we need to evict items to stay within limits
    while ((this.size + size > this.maxCacheSize || this.cache.size >= this.maxEntries) && this.cache.size > 0) {
      await this.evictOldest();
    }
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      expirationTime,
      size
    };
    this.cache.set(resourceUrl, cacheEntry);
    this.metadata.set(resourceUrl, {
      accessCount: 0,
      lastAccess: Date.now()
    });
    this.size += size;

    // Persist to storage
    await this.saveToStorage();
  }

  /**
   * Get data from cache
   * @param {string} resourceUrl - Resource URL
   * @returns {Promise<Object|null>} - Cache entry or null
   */
  async getFromCache(resourceUrl) {
    // First try memory cache
    let entry = this.cache.get(resourceUrl);
    if (entry) {
      this.updateMetadata(resourceUrl);
      return entry;
    }

    // If not in memory, try storage
    entry = await this.getFromStorage(resourceUrl);
    if (entry) {
      // Add to memory cache
      this.cache.set(resourceUrl, entry);
      this.size += entry.size;
      this.updateMetadata(resourceUrl);
      return entry;
    }
    return null;
  }

  /**
   * Update metadata for resource access
   * @param {string} resourceUrl - Resource URL
   */
  updateMetadata(resourceUrl) {
    const metadata = this.metadata.get(resourceUrl) || {
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
  isExpired(entry, ttl) {
    return Date.now() > entry.expirationTime;
  }

  /**
   * Check if cache entry is not expired
   * @param {Object} entry - Cache entry
   * @param {number} ttl - Time-to-live
   * @returns {boolean} - True if not expired
   */
  isNotExpired(entry, ttl) {
    return !this.isExpired(entry, ttl);
  }

  /**
   * Estimate size of data in bytes
   * @param {any} data - Data to estimate
   * @returns {number} - Estimated size in bytes
   */
  estimateSize(data) {
    try {
      const str = JSON.stringify(data);
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
  async evictOldest() {
    if (this.cache.size === 0) return;
    let oldestKey = null;
    let oldestTime = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }
    if (oldestKey) {
      const entry = this.cache.get(oldestKey);
      this.size -= entry.size;
      this.cache.delete(oldestKey);
      this.metadata.delete(oldestKey);
    }
  }

  /**
   * Clear expired entries
   * @returns {Promise<number>} - Number of entries cleared
   */
  async clearExpired() {
    let clearedCount = 0;
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expirationTime) {
        this.size -= entry.size;
        this.cache.delete(key);
        this.metadata.delete(key);
        clearedCount++;
      }
    }
    await this.saveToStorage();
    return clearedCount;
  }

  /**
   * Save cache to storage
   * @returns {Promise<void>}
   */
  async saveToStorage() {
    try {
      // Only save entries that are not expired
      const now = Date.now();
      const serializableCache = {};
      for (const [key, entry] of this.cache.entries()) {
        if (now <= entry.expirationTime) {
          serializableCache[key] = {
            data: entry.data,
            timestamp: entry.timestamp,
            expirationTime: entry.expirationTime,
            size: entry.size
          };
        }
      }
      const cacheData = JSON.stringify(serializableCache);
      localStorage.setItem(this.storageKey, cacheData);
    } catch (error) {
      console.error('Error saving cache to storage:', error);
    }
  }

  /**
   * Load cache from storage
   * @returns {Promise<void>}
   */
  async loadFromStorage() {
    try {
      const cacheData = localStorage.getItem(this.storageKey);
      if (cacheData) {
        const serializableCache = JSON.parse(cacheData);
        const now = Date.now();
        for (const [key, entry] of Object.entries(serializableCache)) {
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
  }

  /**
   * Get cache entry from storage (for single entry)
   * @param {string} key - Cache key
   * @returns {Promise<Object|null>} - Cache entry or null
   */
  async getFromStorage(key) {
    try {
      const cacheData = localStorage.getItem(this.storageKey);
      if (cacheData) {
        const serializableCache = JSON.parse(cacheData);
        const entry = serializableCache[key];
        if (entry && Date.now() <= entry.expirationTime) {
          return entry;
        }
      }
    } catch (error) {
      console.error('Error getting cache entry from storage:', error);
    }
    return null;
  }

  /**
   * Clear all cache
   * @returns {Promise<void>}
   */
  async clear() {
    this.cache.clear();
    this.metadata.clear();
    this.size = 0;
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    const now = Date.now();
    let expiredCount = 0;
    for (const entry of this.cache.values()) {
      if (now > entry.expirationTime) {
        expiredCount++;
      }
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
  setPolicy(policy) {
    this.cachePolicy = policy;
  }

  /**
   * Set TTL for a specific resource
   * @param {string} resourceUrl - Resource URL
   * @param {number} ttl - Time-to-live in milliseconds
   * @returns {Promise<void>}
   */
  async setTTL(resourceUrl, ttl) {
    const entry = this.cache.get(resourceUrl);
    if (entry) {
      entry.expirationTime = Date.now() + ttl;
      await this.saveToStorage();
    }
  }
}

/**
 * OfflineQueue - Queue for offline operations that require authentication
 * Queues operations when offline and replays them when connectivity is restored
 */

class OfflineQueue {
  constructor() {
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
  async add(operation) {
    const operationId = this.generateOperationId();
    const queueItem = {
      id: operationId,
      type: operation.type,
      payload: operation.payload,
      executor: operation.executor,
      timestamp: Date.now(),
      retries: 0,
      status: 'pending'
    };
    this.queue.push(queueItem);
    await this.saveToStorage();
    return operationId;
  }

  /**
   * Process the queue when online
   * @param {Function} onlineAuthMethod - Method to execute operations when online
   * @returns {Promise<Object>} - Processing results
   */
  async process(onlineAuthMethod) {
    if (this.isProcessing || this.queue.length === 0) {
      return {
        processed: 0,
        failed: 0,
        remaining: this.queue.length
      };
    }
    this.isProcessing = true;
    let processedCount = 0;
    let failedCount = 0;
    try {
      // Process each item in the queue
      for (let i = 0; i < this.queue.length; i++) {
        const item = this.queue[i];
        if (item.status === 'completed') {
          continue; // Skip already completed items
        }
        try {
          // Execute the operation
          await item.executor(onlineAuthMethod);

          // Mark as completed
          item.status = 'completed';
          processedCount++;
        } catch (error) {
          // Handle failure
          item.retries += 1;
          item.status = 'failed';
          failedCount++;
          if (item.retries < this.maxRetries) {
            // Reset status to pending for retry
            item.status = 'pending';
            // Add delay before next retry
            await this.delay(this.retryDelay * item.retries);
          } else {
            console.error(`Operation ${item.id} failed after ${this.maxRetries} retries:`, error);
          }
        }
      }

      // Remove completed operations
      this.queue = this.queue.filter(item => item.status !== 'completed');
      await this.saveToStorage();
      return {
        processed: processedCount,
        failed: failedCount,
        remaining: this.queue.length
      };
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Retry failed operations
   * @param {Function} onlineAuthMethod - Method to execute operations when online
   * @returns {Promise<Object>} - Retry results
   */
  async retryFailed(onlineAuthMethod) {
    const failedItems = this.queue.filter(item => item.status === 'failed' && item.retries < this.maxRetries);
    let retriedCount = 0;
    let successCount = 0;
    for (const item of failedItems) {
      try {
        await item.executor(onlineAuthMethod);
        item.status = 'completed';
        successCount++;
        retriedCount++;
      } catch (error) {
        item.retries += 1;
        if (item.retries >= this.maxRetries) {
          item.status = 'failed';
          console.error(`Retry failed for operation ${item.id}:`, error);
        } else {
          // Reset to pending for another retry
          item.status = 'pending';
        }
      }
    }
    this.queue = this.queue.filter(item => item.status !== 'completed');
    await this.saveToStorage();
    return {
      retried: retriedCount,
      succeeded: successCount,
      remaining: this.queue.filter(item => item.status === 'failed').length
    };
  }

  /**
   * Get queue status
   * @returns {Object} - Queue status
   */
  getStatus() {
    const pending = this.queue.filter(item => item.status === 'pending').length;
    const failed = this.queue.filter(item => item.status === 'failed').length;
    const completed = this.queue.filter(item => item.status === 'completed').length;
    return {
      total: this.queue.length,
      pending,
      failed,
      completed,
      isProcessing: this.isProcessing
    };
  }

  /**
   * Clear the queue
   */
  async clear() {
    this.queue = [];
    this.isProcessing = false;
    await this.saveToStorage();
  }

  /**
   * Set connectivity restored callback
   * @param {Function} callback - Callback function
   */
  setOnConnectivityRestored(callback) {
    this.onConnectivityRestored = callback;
  }

  /**
   * Handle connectivity restoration
   * @param {Function} onlineAuthMethod - Method to execute operations when online
   */
  async handleConnectivityRestored(onlineAuthMethod) {
    if (this.onConnectivityRestored) {
      await this.onConnectivityRestored();
    }
    if (this.queue.length > 0) {
      await this.process(onlineAuthMethod);
    }
  }

  /**
   * Generate a unique operation ID
   * @returns {string} - Unique operation ID
   */
  generateOperationId() {
    return 'op_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Delay execution
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Save queue to storage
   */
  async saveToStorage() {
    try {
      // Store only essential data, not the executor function
      const serializableQueue = this.queue.map(item => ({
        id: item.id,
        type: item.type,
        payload: item.payload,
        timestamp: item.timestamp,
        retries: item.retries,
        status: item.status
      }));
      localStorage.setItem(this.storageKey, JSON.stringify(serializableQueue));
    } catch (error) {
      console.error('Error saving queue to storage:', error);
    }
  }

  /**
   * Load queue from storage
   */
  async loadFromStorage() {
    try {
      const queueData = localStorage.getItem(this.storageKey);
      if (queueData) {
        const serializableQueue = JSON.parse(queueData);
        // We can't restore the executor functions, so we'll need to handle this appropriately
        // For now, we'll load the queue metadata but operations will need to be reconstructed
        this.queue = serializableQueue.map(item => ({
          id: item.id,
          type: item.type,
          payload: item.payload,
          executor: null,
          // Will need to be set separately
          timestamp: item.timestamp,
          retries: item.retries,
          status: item.status
        }));
      }
    } catch (error) {
      console.error('Error loading queue from storage:', error);
      this.queue = [];
    }
  }

  /**
   * Add authentication operations to queue
   * @param {string} operationType - Type of operation
   * @param {Object} credentials - Authentication credentials
   * @returns {Promise<string>} - Operation ID
   */
  async addAuthOperation(operationType, credentials) {
    const operation = {
      type: operationType,
      payload: credentials,
      executor: async onlineAuthMethod => {
        // This would be implemented based on the specific auth method
        if (operationType === 'login') {
          return await onlineAuthMethod.login(credentials);
        } else if (operationType === 'signup') {
          return await onlineAuthMethod.signup(credentials);
        } else if (operationType === 'logout') {
          return await onlineAuthMethod.logout();
        }
        throw new Error(`Unknown operation type: ${operationType}`);
      }
    };
    return await this.add(operation);
  }

  /**
   * Add resource access operation to queue
   * @param {string} resourceUrl - Resource URL to access
   * @param {Object} options - Request options
   * @returns {Promise<string>} - Operation ID
   */
  async addResourceOperation(resourceUrl, options = {}) {
    const operation = {
      type: 'resource_access',
      payload: {
        resourceUrl,
        options
      },
      executor: async onlineAuthMethod => {
        // Execute resource access operation
        return await onlineAuthMethod.authenticateResource(resourceUrl, options);
      }
    };
    return await this.add(operation);
  }
}

/**
 * AnalyticsManager - Performance monitoring and analytics
 * Tracks authentication performance, sync times, and offline usage patterns
 */

class AnalyticsManager {
  constructor(options = {}) {
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
  initialize(userId) {
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
  trackAuthEvent(eventType, data = {}, duration = null) {
    if (!this.enabled) return;
    const event = {
      id: this.generateEventId(),
      type: eventType,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      data,
      duration,
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
        duration,
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
  trackSyncEvent(syncData, duration) {
    if (!this.enabled) return;
    const event = {
      id: this.generateEventId(),
      type: 'sync',
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      data: syncData,
      duration,
      metadata: {
        userAgent: navigator.userAgent,
        online: navigator.onLine
      }
    };
    this.events.push(event);

    // Track sync time metrics
    this.metrics.syncTimes.push({
      duration,
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
  trackOfflineUsage(usageData) {
    if (!this.enabled) return;
    const event = {
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
  trackError(errorType, message, context = {}) {
    if (!this.enabled) return;
    const event = {
      id: this.generateEventId(),
      type: 'error',
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      data: {
        errorType,
        message,
        context
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
      message,
      timestamp: event.timestamp
    });
    this.saveToStorage();
  }

  /**
   * Get performance metrics
   * @returns {Object} - Performance metrics
   */
  getMetrics() {
    return {
      authPerformance: this.calculatePerformanceMetrics(this.metrics.authPerformance),
      syncTimes: this.calculatePerformanceMetrics(this.metrics.syncTimes.map(s => ({
        duration: s.duration
      }))),
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
  calculatePerformanceMetrics(data) {
    if (data.length === 0) return {};
    const durations = data.map(item => item.duration);
    const sum = durations.reduce((a, b) => a + b, 0);
    const avg = sum / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);

    // Calculate median
    const sorted = [...durations].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return {
      average: avg,
      median,
      min,
      max,
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
  calculateErrorMetrics(errors) {
    if (errors.length === 0) return {
      count: 0,
      types: {}
    };
    const typeCounts = {};
    errors.forEach(error => {
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
  async flush() {
    if (!this.enabled || !this.apiEndpoint || this.events.length === 0) {
      return;
    }
    try {
      const eventsToSend = [...this.events];
      await fetch(this.apiEndpoint, {
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

      // Remove sent events
      this.events = [];
      this.saveToStorage();
    } catch (error) {
      console.error('Error flushing analytics:', error);
      // Keep events for next flush attempt
    }
  }

  /**
   * Start flush timer
   */
  startFlushTimer() {
    if (this.flushInterval && this.apiEndpoint) {
      this.flushTimer = setInterval(() => {
        this.flush();
      }, this.flushInterval);
    }
  }

  /**
   * Stop flush timer
   */
  stopFlushTimer() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  /**
   * Generate event ID
   * @returns {string} - Unique event ID
   */
  generateEventId() {
    return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Generate session ID
   * @returns {string} - Unique session ID
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Save analytics to storage
   */
  saveToStorage() {
    try {
      // Limit the number of events stored
      if (this.events.length > this.maxEvents) {
        this.events = this.events.slice(-this.maxEvents);
      }
      const analyticsData = {
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
  loadFromStorage() {
    try {
      const analyticsData = localStorage.getItem(this.storageKey);
      if (analyticsData) {
        const parsed = JSON.parse(analyticsData);
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
  clear() {
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
  setUserId(userId) {
    this.userId = userId;
  }

  /**
   * Set API endpoint
   * @param {string} endpoint - API endpoint
   */
  setApiEndpoint(endpoint) {
    this.apiEndpoint = endpoint;
  }

  /**
   * Enable/disable analytics
   * @param {boolean} enabled - Whether to enable analytics
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  /**
   * Get event counts by type
   * @returns {Object} - Event counts
   */
  getEventCounts() {
    const counts = {};
    this.events.forEach(event => {
      counts[event.type] = (counts[event.type] || 0) + 1;
    });
    return counts;
  }

  /**
   * Get events by type
   * @param {string} eventType - Event type
   * @returns {Array} - Events of specified type
   */
  getEventsByType(eventType) {
    return this.events.filter(event => event.type === eventType);
  }
}

class AuthOrchestrator {
  constructor(config = {}) {
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
  async initialize() {
    // Initialize enhanced modules
    await this.keyManager.initialize(this.config.encryptionKey);
    await this.resourceCache.loadFromStorage();
    await this.offlineQueue.loadFromStorage();

    // Check network status on initialization
    this.isOnline = await this.networkManager.isOnline();

    // Load current user from storage
    await this.loadCurrentUser();

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
  }
  setupNetworkMonitoring() {
    // Monitor online/offline events
    window.addEventListener('online', async () => {
      this.isOnline = true;
      await this.handleOnlineStatus();
    });
    window.addEventListener('offline', async () => {
      this.isOnline = false;
      await this.handleOfflineStatus();
    });
  }
  async handleOnlineStatus() {
    console.log('Network is online, attempting to sync authentication state');

    // Update sync status
    this.syncStatusManager.startSync();
    try {
      // If user was authenticated offline, sync with online service
      if (this.currentUser && this.currentUser.offline) {
        await this.syncOfflineAuth();
      }

      // Process offline queue
      if (this.offlineQueue.getStatus().total > 0) {
        await this.offlineQueue.handleConnectivityRestored(this.onlineAuth);
      }

      // Start sync process
      this.startSyncProcess();

      // Track in analytics
      this.analyticsManager.trackAuthEvent('online_status_restored', {
        previousStatus: 'offline',
        userId: this.currentUser?.id
      });
      this.syncStatusManager.completeSync();
    } catch (error) {
      this.syncStatusManager.recordError(error);
      this.analyticsManager.trackError('online_status_sync', error.message);
    }
  }
  async handleOfflineStatus() {
    console.log('Network is offline, switching to offline authentication');

    // Stop sync process
    this.stopSyncProcess();

    // If user was online, switch to offline mode
    if (this.currentUser && !this.currentUser.offline) {
      await this.switchToOfflineMode();
    }
  }
  async syncOfflineAuth() {
    try {
      // Try to sync offline credentials with online service
      const offlineCredentials = await this.storageManager.getItem('offline_credentials');
      if (offlineCredentials) {
        // Attempt to create online account with offline credentials
        const result = await this.onlineAuth.createAccount(_objectSpread2({
          email: offlineCredentials.email,
          password: offlineCredentials.password
        }, offlineCredentials.profile));
        if (result.success) {
          // Update user state to online
          this.currentUser = _objectSpread2(_objectSpread2({}, result.user), {}, {
            offline: false
          });

          // Clear offline credentials
          await this.storageManager.removeItem('offline_credentials');

          // Save updated user state
          await this.saveCurrentUser();
          console.log('Successfully synced offline authentication with online service');
        }
      }
    } catch (error) {
      console.error('Error syncing offline authentication:', error);
    }
  }
  async switchToOfflineMode() {
    try {
      // Store current online user data for offline use
      if (this.currentUser) {
        const offlineUserData = _objectSpread2(_objectSpread2({}, this.currentUser), {}, {
          offline: true
        });
        await this.storageManager.setItem('offline_user', offlineUserData);
        this.currentUser.offline = true;
        console.log('Switched to offline mode');
      }
    } catch (error) {
      console.error('Error switching to offline mode:', error);
    }
  }
  startSyncProcess() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
    }
    this.syncIntervalId = setInterval(async () => {
      await this.syncAuthenticationState();
    }, this.config.syncInterval);
  }
  stopSyncProcess() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }
  async syncAuthenticationState() {
    try {
      if (this.isOnline && this.currentUser && this.currentUser.offline) {
        // Try to verify online status for offline user
        const verifiedUser = await this.onlineAuth.verifySession();
        if (verifiedUser) {
          // Check for conflicts between offline and online data
          if (this.currentUser.lastLoginAt && verifiedUser.lastLoginAt) {
            // Create conflict object
            const conflict = this.conflictResolver.createConflict({
              data: this.currentUser,
              timestamp: this.currentUser.lastLoginAt
            }, {
              data: verifiedUser,
              timestamp: verifiedUser.lastLoginAt
            });

            // Resolve conflict using default strategy
            const resolvedUser = this.conflictResolver.resolve(conflict);
            this.currentUser = _objectSpread2(_objectSpread2({}, resolvedUser), {}, {
              offline: false
            });
          } else {
            // No conflict, just update
            this.currentUser = _objectSpread2(_objectSpread2({}, verifiedUser), {}, {
              offline: false
            });
          }
          await this.saveCurrentUser();
          console.log('Successfully verified online status for user');

          // Track in analytics
          this.analyticsManager.trackAuthEvent('sync_success', {
            userId: this.currentUser.id,
            syncType: 'user_data'
          });
        }
      }
    } catch (error) {
      console.warn('Authentication sync failed:', error);
      this.analyticsManager.trackError('sync_failed', error.message);
    }
  }
  async loadCurrentUser() {
    try {
      // Try to load from online storage first
      let user = await this.storageManager.getItem('current_user');
      if (!user) {
        // Try offline storage
        user = await this.storageManager.getItem('offline_user');
      }
      if (user) {
        this.currentUser = user;
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }
  async saveCurrentUser() {
    try {
      if (this.currentUser) {
        if (this.currentUser.offline) {
          await this.storageManager.setItem('offline_user', this.currentUser);
          await this.storageManager.removeItem('current_user');
        } else {
          await this.storageManager.setItem('current_user', this.currentUser);
          await this.storageManager.removeItem('offline_user');
        }
      }
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  }

  // Public API methods
  async login(credentials) {
    // Track in analytics
    const startTime = Date.now();
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.login(credentials);
        if (result.success) {
          // Check if this is a new account that needs migration
          const needsMigration = await this.migrationManager.needsMigration(result.user);
          if (needsMigration) {
            await this.migrationManager.migrateAccount(result.user, this.config.provider);
          }
          this.currentUser = result.user;
          await this.saveCurrentUser();

          // Initialize analytics with new user
          this.analyticsManager.initialize(result.user.id);
        }

        // Track in analytics
        this.analyticsManager.trackAuthEvent('login', {
          success: result.success,
          provider: this.config.provider,
          userId: result.user?.id
        }, Date.now() - startTime);
        return result;
      } catch (error) {
        console.warn('Online login failed, attempting offline login:', error);
        // Fall back to offline login

        // Track in analytics
        this.analyticsManager.trackError('login_failed', error.message, {
          provider: this.config.provider,
          userId: credentials.email
        });
      }
    }

    // Try offline login
    const result = await this.localAuth.login(credentials);
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
      userId: result.user?.id
    }, Date.now() - startTime);
    return result;
  }
  async signup(credentials) {
    // Track in analytics
    const startTime = Date.now();
    if (this.isOnline) {
      try {
        const result = await this.onlineAuth.signup(credentials);
        if (result.success) {
          // Check if this is a new account that needs migration
          const needsMigration = await this.migrationManager.needsMigration(result.user);
          if (needsMigration) {
            await this.migrationManager.migrateAccount(result.user, this.config.provider);
          }
          this.currentUser = result.user;
          await this.saveCurrentUser();

          // Initialize analytics with new user
          this.analyticsManager.initialize(result.user.id);
        }

        // Track in analytics
        this.analyticsManager.trackAuthEvent('signup', {
          success: result.success,
          provider: this.config.provider,
          userId: result.user?.id
        }, Date.now() - startTime);
        return result;
      } catch (error) {
        console.warn('Online signup failed, attempting offline signup:', error);
        // Fall back to offline signup if allowed

        // Track in analytics
        this.analyticsManager.trackError('signup_failed', error.message, {
          provider: this.config.provider,
          userId: credentials.email
        });
      }
    }

    // Try offline signup
    const result = await this.localAuth.signup(credentials);
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
      userId: result.user?.id
    }, Date.now() - startTime);
    return result;
  }
  async logout() {
    // Track in analytics
    const startTime = Date.now();

    // Clear current user
    this.currentUser = null;

    // Clear storage
    await this.storageManager.removeItem('current_user');
    await this.storageManager.removeItem('offline_user');

    // Also try to logout from online service if online
    if (this.isOnline) {
      await this.onlineAuth.logout();
    }

    // Logout from local auth as well
    await this.localAuth.logout();

    // Track in analytics
    this.analyticsManager.trackAuthEvent('logout', {
      success: true,
      userId: this.currentUser?.id
    }, Date.now() - startTime);
  }
  async authenticateResource(resourceUrl, options = {}) {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    // Use resource cache if enabled
    if (options.useCache !== false) {
      const cachedResult = await this.resourceCache.get(resourceUrl, async () => {
        // Fetch from online service if not in cache
        if (!this.isOnline) {
          // Check if resource is available offline
          if (this.isResourceAvailableOffline(resourceUrl)) {
            return {
              success: true,
              user: this.currentUser,
              offline: true
            };
          } else {
            return {
              success: false,
              error: 'Resource requires online access',
              offline: true,
              user: this.currentUser
            };
          }
        }

        // Online resource authentication
        return await this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);
      }, options);
      return cachedResult;
    }
    if (!this.isOnline) {
      // Check if resource is available offline
      if (this.isResourceAvailableOffline(resourceUrl)) {
        // Track offline resource usage
        this.analyticsManager.trackOfflineUsage({
          resourceUrl,
          userId: this.currentUser.id,
          timestamp: new Date().toISOString()
        });
        return {
          success: true,
          user: this.currentUser,
          offline: true
        };
      } else {
        // Add to offline queue if needed
        if (options.queueIfOffline) {
          await this.offlineQueue.addResourceOperation(resourceUrl, options);
        }
        return {
          success: false,
          error: 'Resource requires online access',
          offline: true,
          user: this.currentUser
        };
      }
    }

    // Online resource authentication
    const result = await this.onlineAuth.authenticateResource(resourceUrl, this.currentUser);

    // Track in analytics
    this.analyticsManager.trackAuthEvent('resource_access', {
      resourceUrl,
      userId: this.currentUser.id,
      success: result.success
    });
    return result;
  }
  isResourceAvailableOffline(resourceUrl) {
    // Check if resource is cached locally or is a local resource
    // This is a simplified implementation - in a real scenario, 
    // you'd have more sophisticated logic to determine offline availability
    const offlineResources = this.config.offlineResources || [];
    return offlineResources.some(pattern => resourceUrl.includes(pattern) || new RegExp(pattern).test(resourceUrl));
  }
  getCurrentUser() {
    return this.currentUser;
  }
  isAuthenticated() {
    return !!this.currentUser;
  }
  isOffline() {
    return !this.isOnline;
  }
  destroy() {
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
}

// AWS Cognito Adapter
class AWSCognitoAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.region = config.region;
    this.userPoolId = config.userPoolId;
    this.clientId = config.clientId;
    this.identityPoolId = config.identityPoolId;
    this.cognitoDomain = config.cognitoDomain; // Optional: for hosted UI
  }
  async login(credentials) {
    try {
      // AWS Cognito login using Amplify-style approach
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
        },
        body: JSON.stringify({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: this.clientId,
          AuthParameters: {
            USERNAME: credentials.email,
            PASSWORD: credentials.password
          }
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      return {
        success: true,
        user: this.formatUser(result.AuthenticationResult),
        token: result.AuthenticationResult.AccessToken,
        refreshToken: result.AuthenticationResult.RefreshToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    try {
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp'
        },
        body: JSON.stringify({
          ClientId: this.clientId,
          Username: credentials.email,
          Password: credentials.password,
          UserAttributes: [{
            Name: 'email',
            Value: credentials.email
          }, ...(credentials.profile ? [{
            Name: 'name',
            Value: credentials.profile.name || credentials.profile.firstName + ' ' + credentials.profile.lastName
          }] : [])]
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      return {
        success: true,
        user: this.formatUser(result),
        token: null // Need to confirm user before getting tokens
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    // AWS Cognito logout involves clearing tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
  async verifySession(token) {
    try {
      const response = await fetch(`https://cognito-idp.${this.region}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
        },
        body: JSON.stringify({
          AccessToken: token
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Session verification failed');
      }
      return {
        success: true,
        user: this.formatUser(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  formatUser(userData) {
    return {
      id: userData.Username || userData.UserSub,
      email: userData.UserAttributes?.find(attr => attr.Name === 'email')?.Value || userData.email,
      name: userData.UserAttributes?.find(attr => attr.Name === 'name')?.Value || userData.name,
      profile: userData.UserAttributes?.reduce((acc, attr) => {
        acc[attr.Name] = attr.Value;
        return acc;
      }, {}) || {},
      provider: 'aws-cognito',
      online: true
    };
  }
}

// Okta Adapter
class OktaAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.domain = config.domain; // e.g., 'dev-123456.okta.com'
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scopes = config.scopes || ['openid', 'email', 'profile'];
  }
  async login(credentials) {
    try {
      // Okta direct authentication
      const response = await fetch(`https://${this.domain}/api/v1/authn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.errorSummary || 'Login failed');
      }

      // If successful, exchange for OAuth tokens
      const tokenResponse = await this.getOAuthTokens(credentials);
      if (tokenResponse.success) {
        return _objectSpread2({
          success: true,
          user: await this.getUserInfo(tokenResponse.token)
        }, tokenResponse);
      } else {
        return tokenResponse;
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async getOAuthTokens(credentials) {
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        username: credentials.email,
        password: credentials.password,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: this.scopes.join(' ')
      });
      const response = await fetch(`https://${this.domain}/oauth2/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error_description || 'Token exchange failed');
      }
      return {
        success: true,
        token: result.access_token,
        refreshToken: result.refresh_token,
        expiresIn: result.expires_in
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    try {
      // Create user in Okta
      const response = await fetch(`https://${this.domain}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `SSWS ${this.clientSecret}` // Requires API token
        },
        body: JSON.stringify({
          profile: {
            firstName: credentials.profile?.firstName || credentials.email.split('@')[0],
            lastName: credentials.profile?.lastName || 'User',
            email: credentials.email,
            login: credentials.email
          },
          credentials: {
            password: {
              value: credentials.password
            }
          }
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.errorSummary || 'Signup failed');
      }

      // After creating user, they need to be activated and can then login
      return {
        success: true,
        message: 'User created successfully. Please check your email to activate your account.',
        user: this.formatUser(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async logout() {
    // Okta logout would involve revoking tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
  async verifySession(token) {
    try {
      const response = await fetch(`https://${this.domain}/oauth2/v1/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userInfo = await response.json();
      if (!response.ok) {
        throw new Error('Session verification failed');
      }
      return {
        success: true,
        user: this.formatUser(userInfo)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async getUserInfo(accessToken) {
    try {
      const response = await fetch(`https://${this.domain}/oauth2/v1/userinfo`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userInfo = await response.json();
      return this.formatUser(userInfo);
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }
  formatUser(userData) {
    return {
      id: userData.sub || userData.id,
      email: userData.email || userData.profile?.email,
      name: userData.name || `${userData.profile?.firstName || ''} ${userData.profile?.lastName || ''}`.trim(),
      profile: {
        firstName: userData.given_name || userData.profile?.firstName,
        lastName: userData.family_name || userData.profile?.lastName,
        email: userData.email || userData.profile?.email
      },
      provider: 'okta',
      online: true
    };
  }
}

// Azure Active Directory Adapter
class AzureADAdapter extends BaseAdapter {
  constructor(config) {
    super(config);
    this.tenantId = config.tenantId;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scopes = config.scopes || ['User.Read'];
  }
  async login(credentials) {
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: `https://graph.microsoft.com/${this.scopes.join(' ')}`,
        username: credentials.email,
        password: credentials.password
      });
      const response = await fetch(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error_description || 'Login failed');
      }
      return {
        success: true,
        user: await this.getUserInfo(result.access_token),
        token: result.access_token,
        refreshToken: result.refresh_token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async signup(credentials) {
    // Azure AD typically doesn't allow self-service signup
    // This would require admin access or Azure AD B2C
    return {
      success: false,
      error: 'Direct signup not supported. Please contact your administrator.'
    };
  }
  async logout() {
    // Azure AD logout involves clearing tokens
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
  async verifySession(token) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userInfo = await response.json();
      if (!response.ok) {
        throw new Error('Session verification failed');
      }
      return {
        success: true,
        user: this.formatUser(userInfo)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  async getUserInfo(accessToken) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userInfo = await response.json();
      return this.formatUser(userInfo);
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }
  formatUser(userData) {
    return {
      id: userData.id,
      email: userData.mail || userData.userPrincipalName,
      name: userData.displayName,
      profile: {
        firstName: userData.givenName,
        lastName: userData.surname,
        email: userData.mail || userData.userPrincipalName,
        jobTitle: userData.jobTitle,
        department: userData.department
      },
      provider: 'azure-ad',
      online: true
    };
  }
}

/**
 * Tab Authentication Orchestrator
 * Universal authentication library supporting both online and offline modes
 */

exports.AWSCognitoAdapter = AWSCognitoAdapter;
exports.AnalyticsManager = AnalyticsManager;
exports.AuthOrchestrator = AuthOrchestrator;
exports.AzureADAdapter = AzureADAdapter;
exports.ConflictResolver = ConflictResolver;
exports.EncryptionUtils = EncryptionUtils;
exports.KeyManager = KeyManager;
exports.LocalAuth = LocalAuth;
exports.MigrationManager = MigrationManager;
exports.NetworkManager = NetworkManager;
exports.OfflineQueue = OfflineQueue;
exports.OktaAdapter = OktaAdapter;
exports.OnlineAuth = OnlineAuth;
exports.ResourceCache = ResourceCache;
exports.StorageManager = StorageManager;
exports.SyncStatusManager = SyncStatusManager;
exports["default"] = AuthOrchestrator;
