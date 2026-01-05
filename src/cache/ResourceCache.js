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
    const fetchPromise = fetcher()
      .then(async (data) => {
        await this.set(resourceUrl, data, ttl);
        return data;
      })
      .catch(error => {
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
    const metadata = this.metadata.get(resourceUrl) || { accessCount: 0 };
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

export { ResourceCache };