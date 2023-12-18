import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import configRoutes from "./routes/index.js";
import * as middleWare from "./middleware.js";
import session from "express-session";

const app = express();

// Session
app.use(
	session({
		name: "UserState",
		secret:
			"For best practice, this should be a unique string which is changed periodically",
		saveUninitialized: false,
		resave: false,
	})
);

// Custom middleware
app.use(middleWare.rewriteUnsupportedBrowserMethods);
app.get("/login", middleWare.rejectAuthenticatedUser);
app.get("/register", middleWare.rejectAuthenticatedUser);
app.get("/logout", middleWare.allowAuthenticatedUser);
app.get("/userActivity", middleWare.allowAuthenticatedUser);
app.get("/userActivity/setting", middleWare.allowAuthenticatedUser);
app.get("/communities/create", middleWare.allowAuthenticatedUser);
app.get("/communities/join", middleWare.allowAuthenticatedUser);
app.get("/communities/unjoin", middleWare.allowAuthenticatedUser);
app.get("/questions/:id/comments/comment", (req, res) => {
	let questionId = req.params.id;
	let user = req.session.user.stevensEmail;
	res.render("newcomment", { title: "add a comment", questionId, user });
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
	"handlebars",
	exphbs.engine("handlebars", {
		defaultLayout: "main",
		layoutsDir: path.join(__dirname, "views/layouts"),
		partialsDir: path.join(__dirname, "views/partials"),
	})
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/questions/question/edit", async (req, res, next) => {
	//console.log(req);
	// console.log("inside middleware");

	if (req.method == "POST") {
		req.method = "PUT";
		// return res.redirect("/questions/question");
	}
	next();
});

// app.use("/questions/:id", async (req, res, next) => {
// 	console.log("inside middleware");

// 	if (req.method == "POST") {
// 		req.method = "DELETE";
// 	}
// 	next();
// });

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server");
	console.log("Your routes will be running on http://localhost:3000");
});
