/**
 * Tab Authentication Orchestrator
 * Universal authentication library supporting both online and offline modes
 */

import { AuthOrchestrator } from './core/AuthOrchestrator';
import { LocalAuth } from './core/LocalAuth';
import { OnlineAuth } from './core/OnlineAuth';
import { NetworkManager } from './utils/NetworkManager';
import { EncryptionUtils } from './utils/EncryptionUtils';
import { StorageManager } from './utils/StorageManager';

export {
  AuthOrchestrator,
  LocalAuth,
  OnlineAuth,
  NetworkManager,
  EncryptionUtils,
  StorageManager
};

// Default export for easy usage
export default AuthOrchestrator;