const bcrypt = require("bcrypt");
const moment = require("moment");
const { createJwtToken } = require("../../middleware/auth");
const { User } = require("../../model/user");

class AuthServices {
  Login = async (payload) => {
    try {
      const body = payload;
      const user = await User.findOne({ email: body.email });
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(
          body.password,
          user.password
        );
        if (validPassword) {
          const userPayload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
          const loginAt = user.login_at;
          const newLoginTime = moment().format("DD-MM-YYYY hh:mm:ss A");
          await User.findByIdAndUpdate(
            { _id: user._id },
            { login_at: newLoginTime, last_login_at: loginAt }
          );
          const token = await createJwtToken(userPayload);
          return { success: true, token: token, role: user.role, status: 200 };
        } else {
          return { success: false, message: "Invalid Password", status: 400 };
        }
      } else {
        return { success: false, message: "User does not exist", status: 401 };
      }
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };
}

module.exports = new AuthServices();
