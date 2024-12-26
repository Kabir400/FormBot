const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
    required: true,
  },
  content: [
    {
      field: {
        type: String,
        required: true,
        enum: ["text", "number", "email", "phone", "rating", "date", "button"],
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  submited: {
    type: Date,
    default: null,
  },
});

responseSchema.path("content").default([]);

const responseModel = mongoose.model("response", responseSchema);

module.exports = responseModel;
