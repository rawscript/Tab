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
      })
      .then(response => {
        clearTimeout(timeoutId);
        if (response.ok) {
          resolve(true);
        } else {
          reject(new Error(`Network check failed with status: ${response.status}`));
        }
      })
      .catch(error => {
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

export { NetworkManager };