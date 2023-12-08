import homePageRoutes from "./homePage.js";
import userRoutes from "./users.js";
import questionRoutes from "./questions.js";

const constructorMethod = (app) => {
	app.use("/", homePageRoutes);
	app.use("/", userRoutes);
	app.use("/questions", questionRoutes);
	app.use("*", (req, res) => {
		// console.log(req.session.user);
		if (req.session.user) {
			return res.render("error", {
				title: "Stevens Overflow",
				css: "",
				js: "",
				user: req.session.user,
			});
		}
		return res.render("error", {
			title: "Stevens Overflow",
			css: "",
			js: "",
		});
	});
};

export default constructorMethod;
