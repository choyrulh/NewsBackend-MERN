const express = require("express");

const newsController = require("../controllers/newsController");

const router = express.Router();

router.route("/query").get(newsController.aliasNews, newsController.getAllNews);

router
  .route("/")
  .get(newsController.getAllNews)
  .post(newsController.createNews);

router
  .route("/:id")
  .get(newsController.getNews)
  .delete(newsController.deleteNews)
  .put(newsController.updateNews);

module.exports = router;
