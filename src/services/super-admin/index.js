const bcrypt = require("bcrypt");
const moment = require("moment");
const { User } = require("../../model/user");
const { Product } = require("../../model/product");

class SuperAdminServices {
  createVender = async (venderData) => {
    try {
      const user = new User(venderData);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(venderData.password, salt);
      user.login_at = moment().format("DD-MM-YYYY hh:mm:ss A");
      user.last_login_at = moment().format("DD-MM-YYYY hh:mm:ss A");
      return await user
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

  getAllvenders = async () => {
    try {
      const allVenders = await User.find({ role: "vender" });
      return { success: true, data: allVenders, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };

  getAllProducts = async () => {
    try {
      const getAllProduct = await Product.find();
      return { success: true, data: getAllProduct, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };
}

module.exports = new SuperAdminServices();
