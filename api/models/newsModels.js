const mongoose = require("mongoose");

const newsIndonesiaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    publish_date: {
      type: Date,
      default: Date.now(),
    },
    author: {
      type: String,
      required: true,
    },
    article_text: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    main_image: {
      type: String,
      required: true,
    },
  },
  { collection: "berita" }
);

const NewsIndonesia = mongoose.model("newsIndonesia", newsIndonesiaSchema);

module.exports = NewsIndonesia;
