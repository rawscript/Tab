/**
 * KeyManager - Enhanced encryption key management
 * Manages encryption keys for different users and handles key rotation
 */

import { EncryptionUtils } from '../utils/EncryptionUtils';

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

// Extend EncryptionUtils to add key-specific methods
const originalEncrypt = EncryptionUtils.prototype.encrypt;
const originalDecrypt = EncryptionUtils.prototype.decrypt;

EncryptionUtils.prototype.encryptWithKey = function(data, key) {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, key);
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

EncryptionUtils.prototype.decryptWithKey = function(encryptedData, key) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Decryption failed - invalid data');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
};

EncryptionUtils.prototype.encrypt = function(data) {
  // Use the original method
  return originalEncrypt.call(this, data);
};

EncryptionUtils.prototype.decrypt = function(encryptedData) {
  // Use the original method
  return originalDecrypt.call(this, encryptedData);
};

export { KeyManager };