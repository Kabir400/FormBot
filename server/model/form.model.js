const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  content: [
    {
      img: { type: String, default: null },
      text: { type: Title, required: true },
      input: {
        type: String,
        required: true,
        enum: ["text", "date", "number", "checkbox", "email"],
      },
    },
  ],
  dashboardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dashboard",
    required: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folder",
    default: null,
  },
});

const formModel = mongoose.model("form", formSchema);

module.exports = formModel;
