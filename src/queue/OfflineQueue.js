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
      return { processed: 0, failed: 0, remaining: this.queue.length };
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
          executor: null, // Will need to be set separately
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
      executor: async (onlineAuthMethod) => {
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
      payload: { resourceUrl, options },
      executor: async (onlineAuthMethod) => {
        // Execute resource access operation
        return await onlineAuthMethod.authenticateResource(resourceUrl, options);
      }
    };

    return await this.add(operation);
  }
}

export { OfflineQueue };