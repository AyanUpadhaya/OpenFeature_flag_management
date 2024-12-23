const initializeOpenFeature = require("../config/openfeature.config");

class FeatureFlagService {
  static async isFeatureEnabled(flagkey, context) {
    const openFeature = await initializeOpenFeature();
    const flagValue = await openFeature.getBooleanValue(flagkey, false, context);
    return flagValue;
  }
}
module.exports = { FeatureFlagService };
