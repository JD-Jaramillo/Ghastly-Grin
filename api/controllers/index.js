const router = require('express').Router();

const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.get("/testAPI", function(req, res, next) {
  res.send("API is working properly");
});
module.exports = router;
