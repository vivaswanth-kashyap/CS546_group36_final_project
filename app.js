import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import configRoutes from "./routes/index.js";

const app = express();

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
	// If the user posts to the server with a property called _method, rewrite the request's method
	// To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
	// rewritten in this middleware to a PUT route
	if (req.body && req.body._method) {
	  req.method = req.body._method;
	  delete req.body._method;
	}
  
	// let the next middleware run:
	next();
  };

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
app.use(rewriteUnsupportedBrowserMethods);

app.use(express.static(path.join(__dirname, "public")));

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server");
	console.log("Your routes will be running on http://localhost:3000");
});
