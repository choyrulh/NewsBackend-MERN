const News = require("../models/newsModels");

exports.checkBody = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.url ||
    !req.body.published_at ||
    !req.body.author ||
    !req.body.publisher ||
    !req.body.short_description ||
    !req.body.keywords
  ) {
    res.status(400).send();
  } else {
    next();
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      status: "success",
      results: news.length,
      data: { news },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
