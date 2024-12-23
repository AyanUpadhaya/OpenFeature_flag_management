const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;
app.use(express.json());
// Use morgan to log routes
app.use(morgan("dev"));
app.use(userRoutes);

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
