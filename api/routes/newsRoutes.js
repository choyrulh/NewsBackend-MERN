const express = require("express");

const newsController = require("../controllers/newsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/query").get(newsController.aliasNews, newsController.getAllNews);

// GET ALL NEWS
router
  .route("/")
  .get(newsController.getAllNews)
  .post(newsController.createNews);

// GET, DELETE, UPDATE, CREATE SINGLE NEWS
router
  .route("/:id")
  .get(newsController.getNews)
  .delete(newsController.deleteNews)
  .put(newsController.updateNews);

// GET BY KEYWORDS
router.route("/keywords").get(newsController.getAllNews);

// GET ALL AUTHOR
router.route("/all/author").get(newsController.getAllAuthor);

// GET ALL KEYWORDS
router.route("/all/tag").get(newsController.getAllTag);

// FILTER NEWS
router
  .route("/filter/author")
  .get(newsController.aliasNews, newsController.getAllNewsAuthor);
router
  .route("/filter/tag")
  .get(newsController.aliasNews, newsController.getAllNewsTag);
module.exports = router;
