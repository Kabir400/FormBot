const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder",
    },
  ],
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "form",
    },
  ],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  assignedUsers: [
    {
      assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      isEditable: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const dashboardModel = mongoose.model("dashboard", dashboardSchema);

module.exports = dashboardModel;
