const mongoose = require("mongoose")
const shortId=require('shortid')

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email address",
    ],
  },
  date:{
    type:Date,
    required: true,
    default: new Date()

  }
})

module.exports = mongoose.model("ShortUrl", shortUrlSchema)
