const { OpenFeature, ProviderEvents } = require("@openfeature/server-sdk");
const { CustomProvider } = require("../provider/Provider");

let openFeature;

// Mock analytics system
const sendToAnalytics = (data) => {
  console.log("Sending data to analytics:", data);
};

//hooks are for monitoring
class LoggingHook {
  before(hookContext) {
    console.log(
      `Open feature initialized with custom provider of flag: ${hookContext.flagKey}`
    );
  }

  after(hookContext, flagValue) {
    console.log(
      `[Tracking] Evaluation complete: ${hookContext.flagKey} = ${flagValue?.value}`
    );

    // Send evaluation data to analytics
    sendToAnalytics({
      feature: hookContext.flagKey,
      value: flagValue?.value,
      userContext: hookContext.context,
      timestamp: new Date().toISOString(),
    });
  }
  error(hookContext, error) {
    console.error(
      `[Tracking] Error evaluating feature: ${hookContext.flagKey}`,
      error
    );
  }
}
// global Register the custom hook
// OpenFeature.addHooks(new LoggingHook());

const initializeOpenFeature = async () => {
  if (!openFeature) {
    client = OpenFeature.getClient();
    await OpenFeature.setProviderAndWait(new CustomProvider());
    //registering hook for specific client
    client.addHooks(new LoggingHook());
  }

  return client;
};

module.exports = initializeOpenFeature;
