const UserModel = require("../models/userSchema.js");
const logger = require("../helpers/winston.js");

class UserMongo {
	/* -------------------- Register ---------------------- */

	async userRegister(user) {
		try {
			const userSaved = await UserModel.create(user);
			return userSaved;
		} catch (error) {}
		logger.error.error(error);
	}

	async checkEmailDB(email) {
		try {
			const checkEmailIfExist = await UserModel.findOne({ email: email });
			if (checkEmailIfExist) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			logger.error.error(error);
		}
	}

	/* -------------------- Login ---------------------- */

	async userLoginDB(email) {
		const user = await UserModel.findOne({ email: email });
		return user;
	}

	async mainGetPersistance(userName, photo) {
		try {
			userInfo.push(await userName, photo);
		} catch (error) {
			logger.error.error(error);
		}
	}

	async logoutPersistence() {
		try {
			return userInfo;
		} catch (error) {
			logger.error.error(error);
		}
	}
}

module.exports = UserMongo;
