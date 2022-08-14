const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["super_admin", "vender"], required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    login_at: { type: String, required: true },
    last_login_at: { type: String, required: true },
    createDate: "date",
    updatedDate: "date",
  },
  {
    timestamps: {
      createDate: "created_at",
      updatedDate: "updated_at",
    },
  }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
