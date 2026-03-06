// Single source of truth for app config
// Usage: modify config properties directly, then call writeConfig()

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let _configPath = null;
let config = {};

function initConfig(configPath) {
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

function writeConfig() {
  if (!_configPath) return;
  try { fs.writeFileSync(_configPath, JSON.stringify(config)); } catch {}
}

module.exports = { config, initConfig, writeConfig };
