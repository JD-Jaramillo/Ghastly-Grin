const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");


router.use('/api', apiRoutes);
router.get("/testAPI", function(req, res, next) {
  res.send("API is working properly");
});


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
module.exports = router;
