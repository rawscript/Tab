/**
 * StorageManager - Local storage caching and synchronization
 * Handles encrypted storage of authentication data
 */

import localforage from 'localforage';
import { EncryptionUtils } from './EncryptionUtils';

class StorageManager {
  constructor(prefix = 'tab_auth_') {
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
      return { keys: 0, approximateSize: 0 };
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

export { StorageManager };