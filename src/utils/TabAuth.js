/**
 * Non-React utilities for Tab Authentication
 * Provides authentication functionality for vanilla JavaScript applications
 */

import AuthOrchestrator from '../index';

class TabAuth {
  constructor(config = {}) {
    this.authOrchestrator = new AuthOrchestrator(config);
    this.eventListeners = {
      login: [],
      logout: [],
      networkChange: [],
      error: []
    };
    
    this.initialize();
  }

  async initialize() {
    await this.authOrchestrator.initialize();
    
    // Set up network status listener
    this.authOrchestrator.networkManager.addStatusListener((isOnline) => {
      this.emit('networkChange', { isOnline, offline: !isOnline });
    });
  }

  // Event system
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
    
    // Return a function to remove the listener
    return () => {
      const index = this.eventListeners[event].indexOf(callback);
      if (index > -1) {
        this.eventListeners[event].splice(index, 1);
      }
    };
  }

  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
          this.emit('error', error);
        }
      });
    }
  }

  // Login method
  async login(credentials) {
    try {
      const result = await this.authOrchestrator.login(credentials);
      
      if (result.success) {
        this.emit('login', result.user);
      }
      
      return result;
    } catch (error) {
      this.emit('error', error);
      return { success: false, error: error.message };
    }
  }

  // Signup method
  async signup(credentials) {
    try {
      const result = await this.authOrchestrator.signup(credentials);
      
      if (result.success) {
        this.emit('login', result.user);
      }
      
      return result;
    } catch (error) {
      this.emit('error', error);
      return { success: false, error: error.message };
    }
  }

  // Logout method
  async logout() {
    try {
      await this.authOrchestrator.logout();
      this.emit('logout');
      return { success: true };
    } catch (error) {
      this.emit('error', error);
      return { success: false, error: error.message };
    }
  }

  // Check authentication status
  isAuthenticated() {
    return this.authOrchestrator.isAuthenticated();
  }

  // Get current user
  getCurrentUser() {
    return this.authOrchestrator.getCurrentUser();
  }

  // Check if offline
  isOffline() {
    return this.authOrchestrator.isOffline();
  }

  // Authenticate resource access
  async authenticateResource(resourceUrl) {
    return await this.authOrchestrator.authenticateResource(resourceUrl);
  }

  // Get auth orchestrator instance for advanced usage
  getAuthOrchestrator() {
    return this.authOrchestrator;
  }

  // Destroy the instance and clean up
  destroy() {
    if (this.authOrchestrator) {
      this.authOrchestrator.destroy();
    }
    this.eventListeners = {};
  }
}

// Export a singleton instance by default, but allow creating new instances
let defaultInstance = null;

const getDefaultInstance = (config = {}) => {
  if (!defaultInstance) {
    defaultInstance = new TabAuth(config);
  }
  return defaultInstance;
};

// Export both the class and helper functions
export {
  TabAuth,
  getDefaultInstance as tabAuth
};

// For vanilla JS usage, provide global helper
if (typeof window !== 'undefined') {
  window.TabAuth = {
    create: (config) => new TabAuth(config),
    get: (config) => getDefaultInstance(config),
    login: (credentials) => getDefaultInstance().login(credentials),
    signup: (credentials) => getDefaultInstance().signup(credentials),
    logout: () => getDefaultInstance().logout(),
    isAuthenticated: () => getDefaultInstance().isAuthenticated(),
    getCurrentUser: () => getDefaultInstance().getCurrentUser(),
    isOffline: () => getDefaultInstance().isOffline(),
    authenticateResource: (resourceUrl) => getDefaultInstance().authenticateResource(resourceUrl),
    on: (event, callback) => getDefaultInstance().on(event, callback)
  };
}