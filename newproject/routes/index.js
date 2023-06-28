var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let meta = {};
  meta.description = "index file";
  meta.title = "index file";
  res.render("index", { title: "test", metaData: meta });
});

module.exports = router;
