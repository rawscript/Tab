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
    this.syncStatus = {
      ...this.syncStatus,
      ...statusUpdate
    };
    
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
    return { ...this.syncStatus };
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

export { SyncStatusManager };