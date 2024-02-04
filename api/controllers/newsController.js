const News = require("../models/newsModels");
const { APIFeatures } = require("../utils/apiFeatures");

exports.checkBody = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.url ||
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

exports.aliasNews = (req, res, next) => {
  req.query.limit = "10";
  req.query.page = "1";
  req.query.sort = "-created_at";
  req.query.fields =
    "title" +
    "," +
    "publisher" +
    "," +
    "short_description" +
    "," +
    "header_image";

  next();
};

exports.getAllNews = async (req, res) => {
  try {
    const features = new APIFeatures(News.find(), req.query)
      .filter()
      .search()
      .limitFields()
      .paginate()
      .sort();

    const news = await features.query;

    res.status(200).json({
      status: "success",
      results: news.length,
      data: { news },
    });

    // const news = await News.find();
    // res.status(200).json({
    //   status: "success",
    //   results: news.length,
    //   data: { news },
    // });
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

exports.createNews = async (req, res) => {
  const {
    title,
    url,
    author,
    publisher,
    short_description,
    keywords,
    header_image,
    description,
    created_at,
    updated_at,
  } = req.body;

  const news = await News.create({
    title: title,
    url: url,
    author: author,
    publisher: publisher,
    short_description: short_description,
    keywords: keywords,
    header_image: header_image,
    description: description,
    created_at: created_at,
    updated_at: updated_at,
  });
  res.status(201).json({
    status: "success",
    data: { news },
  });
};

exports.deleteNews = async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: "success", data: null });
};

exports.updateNews = async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: "success", data: { news } });
};
