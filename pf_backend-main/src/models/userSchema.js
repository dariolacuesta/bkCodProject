const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    username: String,
    phone: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async password => {
  const salt =  await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("UserModel", UserSchema);
