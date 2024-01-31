const express = require("express");

const newsController = require("../controllers/newsController");

const router = express.Router();

router.route("/").get(newsController.getAllNews);

router.route("/:id").get(newsController.getNews);

module.exports = router;
