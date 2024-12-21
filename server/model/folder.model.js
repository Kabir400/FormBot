const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dashboardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dashboard",
    required: true,
  },
});

const folderModel = mongoose.model("folder", folderSchema);

module.exports = folderModel;
