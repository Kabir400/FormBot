const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const folderModel = mongoose.model("folder", folderSchema);

module.exports = folderModel;
