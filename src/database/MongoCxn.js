const mongoose = require("mongoose");
const config = require("../config/index.js");

class MongoCxn {
	constructor() {
		if (MongoCxn.instancia) {
			return MongoCxn.instancia;
		}

		this.connection = this.createConnection();
		MongoCxn.instancia = this;
	}

	createConnection() {
		const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@ecommerce.gohoj.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;
		const options = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		};
		mongoose.connect(uri, options).then(
			() => {
				console.log("Connected");
			},
			(err) => {
				err;
			}
		);
	}
}

module.exports = MongoCxn;
