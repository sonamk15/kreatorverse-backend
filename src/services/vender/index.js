const moment = require("moment");
const { Product } = require("../../model/product");

class VenderServices {
  createProduct = async (productData, venderId) => {
    try {
      const product = new Product(productData);
      product.vender_id = venderId;

      return await product
        .save()
        .then((doc) => {
          return { success: true, data: doc, status: 200 };
        })
        .catch((err) => {
          return { success: false, message: err.message, status: 400 };
        });
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };

  getProductByVenderId = async (venderId) => {
    try {
      const allVenderProducts = await Product.find({ vender_id: venderId });
      return { success: true, data: allVenderProducts, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };

  updateProductById = async (payload, productId) => {
    payload.updated_at = new Date();
    try {
      const updateProducts = await Product.findByIdAndUpdate(
        { _id: productId },
        payload
      );
      return { success: true, data: updateProducts, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };

  deleteProductById = async (productId) => {
    try {
      const deleteProduct = await Product.deleteOne({ _id: productId });
      return { success: true, data: deleteProduct, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };
}

module.exports = new VenderServices();
