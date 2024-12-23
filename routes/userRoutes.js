const router = require("express").Router();
const { checkUserIsEligible } = require("../controllers/flagController");

router.post("/user_is_eligible/:flagKey", checkUserIsEligible);

const userRoutes = router;

module.exports = userRoutes;
