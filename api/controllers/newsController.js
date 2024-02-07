const NewsIndonesia = require("../models/newsModels");
const { APIFeatures } = require("../utils/apiFeatures");

exports.checkBody = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.url ||
    !req.body.author ||
    !req.body.article_text ||
    !req.body.tag
  ) {
    res.status(400).send();
  } else {
    next();
  }
};

exports.aliasNews = (req, res, next) => {
  req.query.limit = "10";
  req.query.page = "1";
  req.query.sort = "-publish_date";
  req.query.fields =
    "title" +
    "," +
    "url" +
    "," +
    "article_text" +
    "," +
    "main_image" +
    "," +
    "header_image" +
    "," +
    "publish_date" +
    "," +
    "author" +
    "," +
    "tag";

  next();
};

exports.getAllNews = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(NewsIndonesia.find(), req.query)
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
    res.status(500).json({ status: "fail", message: err.message });
  }
};
exports.getAllNewsAuthor = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(NewsIndonesia.find(), req.query)
      .filter()
      .searchAuthor()
      .limitFields()
      .paginate()
      .sort();

    const news = await features.query;

    res.status(200).json({
      status: "success",
      results: news.length,
      data: { news },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
exports.getAllNewsTag = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(NewsIndonesia.find(), req.query)
      .filter()
      .searchTag()
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
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await NewsIndonesia.findById(req.params.id);
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
    article_text,
    tag,
    header_image,
    created_at,
    updated_at,
  } = req.body;

  const news = await NewsIndonesia.create({
    title: title,
    url: url,
    author: author,
    article_text: article_text,
    tag: tag,
    header_image: header_image,
    created_at: created_at,
    updated_at: updated_at,
  });
  res.status(201).json({
    status: "success",
    data: { news },
  });
};

exports.deleteNews = async (req, res) => {
  const news = await NewsIndonesia.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: "success", data: null });
};

exports.updateNews = async (req, res) => {
  const news = await NewsIndonesia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: "success", data: { news } });
};

exports.getAllAuthor = async (req, res) => {
  const author = await NewsIndonesia.distinct("author");
  res.status(200).json({ status: "success", author });
};

exports.getAllTag = async (req, res) => {
  const tag = await NewsIndonesia.distinct("tag");
  res.status(200).json({ status: "success", tag });
};
