const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  content: [
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
      placeholder: {
        type: String,
        default: "",
      },
    },
  ],
  title: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folder",
    default: null,
  },
  views: {
    type: Number,
    default: 0,
  },
  starts: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Number,
    default: 0,
  },
  theme: {
    type: String,
    default: "light",
  },
});

const formModel = mongoose.model("form", formSchema);

module.exports = formModel;
