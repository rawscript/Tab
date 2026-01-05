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
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
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

export { ConflictResolver };