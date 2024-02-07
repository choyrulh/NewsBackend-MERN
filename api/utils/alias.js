exports.aliasNews = (req, res, next) => {
  req.query.limit = "10";
  req.query.page = "1";
  req.query.sort = "-publish_date";
  req.query.fields =
    "title" +
    "," +
    "author" +
    "," +
    "article_text" +
    "," +
    "main_image" +
    "," +
    "publish_date" +
    "," +
    "tag";

  next();
};
