// Single source of truth for app config
// Usage: modify config properties directly, then call writeConfig()

import fs from 'fs';
import crypto from 'crypto';
import type { AppConfig } from '../../core/src/types';

let _configPath: string | null = null;
const config: AppConfig = { deviceId: '' };

function initConfig(configPath: string): void {
  _configPath = configPath;
  try {
    // Mutate the existing object so all importers keep a valid reference
    Object.assign(config, JSON.parse(fs.readFileSync(_configPath, 'utf8')));
  } catch {}
  // Ensure deviceId exists
  if (!config.deviceId) {
    config.deviceId = crypto.randomUUID();
    writeConfig();
  }
}

function writeConfig(): void {
  if (!_configPath) return;
  try { fs.writeFileSync(_configPath, JSON.stringify(config)); } catch {}
}

let _writeTimer: ReturnType<typeof setTimeout> | null = null;
function debouncedWriteConfig(): void {
  if (_writeTimer) clearTimeout(_writeTimer);
  _writeTimer = setTimeout(writeConfig, 500);
}

// Flush any pending debounced write immediately (call on shutdown)
function flushConfig(): void {
  if (_writeTimer) { clearTimeout(_writeTimer); _writeTimer = null; }
  writeConfig();
}

export { config, initConfig, writeConfig, debouncedWriteConfig, flushConfig };
