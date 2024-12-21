const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  contents: [
    {
      type: {
        type: String,
        required: true,
        enum: ["bubble", "input"],
      },
      value: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            if (this.type === "bubble") {
              return ["text", "image", "gif", "video"].includes(v);
            } else if (this.type === "input") {
              return [
                "text",
                "number",
                "email",
                "phone",
                "rating",
                "date",
                "button",
              ].includes(v);
            }
            return false;
          },
          message: (props) =>
            `Invalid value: ${props.value} for type: ${props.instance.type}`,
        },
      },
      content: {
        type: String,
        required: true,
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
