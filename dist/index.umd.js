(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto-js'), require('localforage')) :
  typeof define === 'function' && define.amd ? define(['exports', 'crypto-js', 'localforage'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TabAuth = {}, global.CryptoJS, global.localforage));
})(this, (function (exports, CryptoJS, localforage) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
        } = await import('@supabase/supabase-js');
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
      this.isOnline = true;
      this.currentUser = null;
      this.syncIntervalId = null;
      this.initialize();
    }
    async initialize() {
      // Check network status on initialization
      this.isOnline = await this.networkManager.isOnline();

      // Load current user from storage
      await this.loadCurrentUser();

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

      // If user was authenticated offline, sync with online service
      if (this.currentUser && this.currentUser.offline) {
        await this.syncOfflineAuth();
      }

      // Start sync process
      this.startSyncProcess();
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
            this.currentUser = _objectSpread2(_objectSpread2({}, verifiedUser), {}, {
              offline: false
            });
            await this.saveCurrentUser();
            console.log('Successfully verified online status for user');
          }
        }
      } catch (error) {
        console.warn('Authentication sync failed:', error);
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
      if (this.isOnline) {
        try {
          const result = await this.onlineAuth.login(credentials);
          if (result.success) {
            this.currentUser = result.user;
            await this.saveCurrentUser();
          }
          return result;
        } catch (error) {
          console.warn('Online login failed, attempting offline login:', error);
          // Fall back to offline login
        }
      }

      // Try offline login
      return await this.localAuth.login(credentials);
    }
    async signup(credentials) {
      if (this.isOnline) {
        try {
          const result = await this.onlineAuth.signup(credentials);
          if (result.success) {
            this.currentUser = result.user;
            await this.saveCurrentUser();
          }
          return result;
        } catch (error) {
          console.warn('Online signup failed, attempting offline signup:', error);
          // Fall back to offline signup if allowed
        }
      }

      // Try offline signup
      return await this.localAuth.signup(credentials);
    }
    async logout() {
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
    }
    async authenticateResource(resourceUrl) {
      if (!this.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
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
      this.stopSyncProcess();
      this.currentUser = null;
    }
  }

  /**
   * Tab Authentication Orchestrator
   * Universal authentication library supporting both online and offline modes
   */

  exports.AuthOrchestrator = AuthOrchestrator;
  exports.EncryptionUtils = EncryptionUtils;
  exports.LocalAuth = LocalAuth;
  exports.NetworkManager = NetworkManager;
  exports.OnlineAuth = OnlineAuth;
  exports.StorageManager = StorageManager;
  exports["default"] = AuthOrchestrator;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
