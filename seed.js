require("dotenv").config();
const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("./src/model/user");
const DB_URL =
  "mongodb+srv://snmk1509:snm101510@kreatorverse.iiaxb4x.mongodb.net/kreatorverse?retryWrites=true&w=majority";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const seedSuperAdmin = [
  {
    name: "Super Admin",
    email: "super-admin@gmail.com",
    phone: "9767916172",
    address: "Demo address",
    role: "super_admin",
    login_at: moment().format("DD-MM-YYYY hh:mm:ss A"),
    last_login_at: moment().format("DD-MM-YYYY hh:mm:ss A"),
  },
];

const seedDB = async () => {
  const salt = await bcrypt.genSalt(10);
  seedSuperAdmin[0]["password"] = await bcrypt.hash("password", salt);
  await User.deleteMany({});
  await User.insertMany(seedSuperAdmin);
};

seedDB().then(() => {
  mongoose.connection.close();
});
