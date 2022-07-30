const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async function (password, userPassword) {
  const pass = await bcrypt.compare(password, userPassword);
  return pass;
};

module.exports = { encryptPassword, checkPassword };
