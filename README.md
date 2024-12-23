### FLAG MANAGEMENT WITH OPEN FEATURE

Step 1:
install openfeature server sdk

Step 2:
configure your client and provider

```js
client = OpenFeature.getClient();
await OpenFeature.setProviderAndWait(new CustomProvider());
client.addHandler(ProviderEvents.Ready, async (eventDetails) => {
  console.log("Open feature initialized with custom provider");
});
```

Step 3:
Create your own flagservice and retrive flag values

```js
const flagkey ="has-access-to-dashboard"
const context ={
    accountLevel:"premium"
}
const flagValue = await client.getBooleanValue(flagkey, false, context);
```

### Exmaple with context evaluation

``` js
const express = require("express"); 
const { OpenFeature, InMemoryProvider } = require("@openfeature/server-sdk");
const app = express();
const port = 3001;

app.use((_, res, next) => {
  res.setHeader("content-type", "text/plain");
  next();
});


const app = express();
const routes = Router();
app.use((_, res, next) => {
  res.setHeader("content-type", "text/plain");
  next();
}, routes);

const featureFlags = OpenFeature.getClient();


const FLAG_CONFIGURATION = {
"with-cows": {
  variants: {
    on: true,
    off: false,
  },
  disabled: false,
  defaultVariant: "off",
  contextEvaluator: (context) => {
    if (context.cow === "Bessie") {
      return "on";
    }
    return "off";
  },
},
};

// Initialize OpenFeature with InMemoryProvider
const featureFlagProvider = new InMemoryProvider(FLAG_CONFIGURATION);

OpenFeature.setProvider(featureFlagProvider);

app.get("/", async (req, res) => {
   const context = {
     cow: req.get("x-cow"),
   };
   const withCows = await featureFlags.getBooleanValue(
     "with-cows",
     false,
     context
   );
  if (withCows) {
    res.send({ text: "Hello, world!" });
  } else {
    res.send("Hello, world!");
  }
});
```