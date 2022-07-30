/* -------------------- Dependencias ---------------------- */
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const morgan = require("morgan");
const logger = require("./helpers/winston.js");
const config = require("./config/index.js");
const passport = require("passport");
const handlebars = require("express-handlebars");
require("./passport/passport.js");

/* -------------------- Rutas ---------------------- */
const router = require("./routes/productos.routes.js");
const routerMsg = require("./routes/mensajes.routes.js");
const usersRoutes = require("./routes/users.routes.js");
const cartRoutes = require("./routes/cart.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const routerInfo = require("./routes/info.routes.js");

/* -------------------- Controllers Socket ---------------------- */
const Mensaje = require("./controllers/Mensaje.js");
const Producto = require("./controllers/Producto.js");
const msg = new Mensaje();
const prodClass = new Producto();

/* -------------------- Configuracion Server ---------------------- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* -------------------- Conexion MongoDB ---------------------- */
const CxnMongoDAO = require("./DAO/CxnMongoDAO.js");
new CxnMongoDAO();

/* -------------------- Middlewares ---------------------- */
app.use(cookieParser());
app.use(
	session({
		secret: "shhhhhhhhhhhhhhhhhhhhh",
		rolling: true,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 },
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("./src/public"));
app.use(flash());
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.session = req.session;
	next();
});

/* -------------------- Ejs ---------------------- */
app.set("views", "./src/views");
app.set("view engine", "ejs");

/* -------------------- Endpoints ---------------------- */
app.use("/api/productos", router);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/chat", routerMsg);
app.use("/user", usersRoutes);
app.use("/info", routerInfo);
app.get("/", function (req, res) {
	res.render("index");
});

/* -------------------- Web Sockets ---------------------- */

let toChat = [];

io.on("connection", (socket) => {
	logger.info.info(
		`Cliente ID:${socket.id} inició conexión a traves de Socket`
	);
	io.sockets.emit("new-message-server", toChat);

	socket.on("new-message", async (data) => {
		const message = await data;
		toChat.push(data);
		msg.addMsg({ message });
		io.sockets.emit("new-message-server", toChat);
	});

	socket.on("new-producto", async (data) => {
		const producto = await data;
		prodClass.addBySocket({ producto });
		io.sockets.emit("new-prod-server", producto);
	});
});

/* -------------------- Servidor ---------------------- */
const PORT = process.env.PORT || config.PORT || 8080;

const server = httpServer.listen(PORT, () => {
	logger.info.info(
		`Se inició servidor en Puerto ${PORT} - PID WORKER: ${process.pid}`
	);
});
server.on("error", (error) =>
	logger.error.error(`Error al iniciar servidor ${error}`)
);
