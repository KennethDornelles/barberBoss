const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withCleartextTraffic(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const mainApplication = androidManifest.manifest.application[0];

    // Adicionar usesCleartextTraffic
    mainApplication.$['android:usesCleartextTraffic'] = 'true';
    // Adicionar networkSecurityConfig
    mainApplication.$['android:networkSecurityConfig'] = '@xml/network_security_config';

    return config;
  });
};
