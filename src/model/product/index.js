const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    vender_id: { type: String, required: true },
    createDate: "date",
    updatedDate: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const Product = mongoose.model("products", productSchema);

module.exports = {
  Product,
};
