const passport = require("passport");
const JWTstrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/userSchema.js");
const mailing = require("../helpers/nodemailer.js");
const config = require("../config/index.js");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	UserModel.findById(id, (err, user) => {
		done(err, user);
	});
});

const strategyJWT = {
	secretOrKey: config.TOKEN,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
	"register",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async function (req, email, password, done) {
			try {
				const { username, password, phone, email } = req.body;
				const userInDb = await UserModel.findOne({ email: email });
				if (userInDb) {
					return done(null, false, req.flash("error", "Usuario ya registrado"));
				} else {
					const newUser = new UserModel({ email, password, phone, username });
					newUser.password = await newUser.encryptPassword(password);
					await newUser.save();

					const subject = "Nuevo Registro de Usuario";
					const html = `<p>El usuario: ${newUser.username} se ha registrado
                        con el mail: ${newUser.email}</p>`;
					await mailing("", subject, html);

					return done(
						null,
						newUser,
						req.flash("success", "Usuario registrado con éxito")
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
	)
);

passport.use(
	"login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const { email, password } = req.body;

				const userRegistered = await UserModel.findOne({ email: email });

				if (!userRegistered) {
					return done(
						null,
						false,
						req.flash("error", "Usuario y/o Password inválido")
					);
				} else {
					const matchPassword = await userRegistered.checkPassword(password);
					if (matchPassword) {
						return done(
							null,
							userRegistered,
							req.flash("welcome", `${userRegistered.username}`)
						);
					} else {
						return done(
							null,
							false,
							req.flash("error", "Usuario y/o Password inválido")
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	)
);

passport.use(
	new JWTstrategy(strategyJWT, async (token, done) => {
		try {
			return done(null, token.user);
		} catch (error) {
			done(error);
		}
	})
);

module.exports = passport;
