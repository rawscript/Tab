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

// New modules
import { SyncStatusManager } from './sync/SyncStatusManager';
import { ConflictResolver } from './conflict/ConflictResolver';
import { KeyManager } from './keys/KeyManager';
import { MigrationManager } from './migrate/MigrationManager';
import { ResourceCache } from './cache/ResourceCache';
import { OfflineQueue } from './queue/OfflineQueue';
import { AnalyticsManager } from './analytics/AnalyticsManager';

// Enhanced providers
import { 
  AWSCognitoAdapter, 
  OktaAdapter, 
  AzureADAdapter 
} from './providers/EnhancedProviders';

export {
  AuthOrchestrator,
  LocalAuth,
  OnlineAuth,
  NetworkManager,
  EncryptionUtils,
  StorageManager,
  // New modules
  SyncStatusManager,
  ConflictResolver,
  KeyManager,
  MigrationManager,
  ResourceCache,
  OfflineQueue,
  AnalyticsManager,
  // Enhanced providers
  AWSCognitoAdapter,
  OktaAdapter,
  AzureADAdapter
};

// Default export for easy usage
export default AuthOrchestrator;