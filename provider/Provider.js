

const { FLAGS } = require("../constants/flags");

class CustomProvider {
  constructor() {
    this.runsOn = "server";
    this.metadata = {
      name: "Custom Provider",
    };
  }

  async resolveBooleanEvaluation(flagKey, defaultValue, context) {
    // code to evaluate a boolean
    if (flagKey == FLAGS.hasPremiumAccess) {
      const isPremiumUser = context.accountLevel == "premium";
      return {
        value: isPremiumUser,
        reason: `account level`,
      };
    }
    if (flagKey == FLAGS.hasDashboardAccess) {
      const hasDashboardAccess = context.accountLevel == "premium";
      return {
        value: hasDashboardAccess,
        reason: `account level`,
      };
    }
    if (flagKey == FLAGS.isUserEligible) {
      const isUserEligible =
        context.userType == "freelancer" && context.country == "India";
        return {
        value: isUserEligible,
        reason: `${isUserEligible ? "Country and user type" : "Not eligible"}`,
      };
    }
    return { value: defaultValue, reason: "defaultValue" };
  }

  //optional

  async initialize(context){
    console.log("Initialized custom provider")
  }

  //optional
  async onClose() {
    console.log("Shutting down provider");
  }
}

module.exports = { CustomProvider };
