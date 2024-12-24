const { OpenFeature, ProviderEvents } = require("@openfeature/server-sdk");
const { CustomProvider } = require("../provider/Provider");

let openFeature;


const initializeOpenFeature = async () => {
  if (!openFeature) {
    client = OpenFeature.getClient();
    await OpenFeature.setProviderAndWait(new CustomProvider());
    client.addHandler(ProviderEvents.Ready, async (eventDetails) => {
      console.log("Open feature initialized with custom provider");
    });
  }

  return client;
};

// module.exports = initializeOpenFeature;
