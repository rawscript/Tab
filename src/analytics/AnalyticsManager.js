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
      syncTimes: this.calculatePerformanceMetrics(this.metrics.syncTimes.map(s => ({ duration: s.duration }))),
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
    if (errors.length === 0) return { count: 0, types: {} };

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

export { AnalyticsManager };