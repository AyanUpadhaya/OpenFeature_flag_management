const { FLAGS } = require("../constants/flags");
const { featureFlags } = require("../config/openfeature.config");
const { FeatureFlagService } = require("../services/featureFlagService");

async function checkUserIsEligible(req, res, next) {
  try {
    const { flagKey } = req.params;
    const { userType, country, accountLevel } = req.body;
    if (!userType || !country || !accountLevel) {
      return res.status(400).json({ message: "Missing required fields " });
    }
    //create context
    const context = {
      userType,
      country,
      accountLevel,
    };

    const isEnabled = await FeatureFlagService.isFeatureEnabled(
      flagKey,
      context
    );

    res.status(200).json({
      success: true,
      flagKey,
      isEnabled: isEnabled,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkUserIsEligible,
};
