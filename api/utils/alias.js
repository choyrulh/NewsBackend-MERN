exports.aliasNews = (req, res, next) => {
  req.query.limit = "10";
  req.query.page = "1";
  req.query.sort = "-created_at";
  req.query.fields = "title";

  next();
};
