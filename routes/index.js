import homePageRoutes from "./homePage.js";
import userRoutes from "./users.js";
import userActivityRoutes from "./userActivity.js";
import questionRoutes from "./questions.js";
import communitiesRoutes from "./communities.js";

const constructorMethod = (app) => {
	app.use("/", homePageRoutes);
	app.use("/", userRoutes);
	app.use("/userActivity", userActivityRoutes);
	app.use("/communities", communitiesRoutes);
	app.use("/questions", questionRoutes);

	app.use("*", (req, res) => {
		return res.render("error", { title: "Stevens Overflow", css: "", js: "" });
	});
};

export default constructorMethod;
