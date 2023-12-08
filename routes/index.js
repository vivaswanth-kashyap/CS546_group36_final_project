import communitiesRoutes from "./communities.js";
import homePageRoutes from "./homePage.js";

const constructorMethod = (app) => {
	app.use("/",homePageRoutes);
	app.use("/communities", communitiesRoutes);

	app.use("*", (req, res) => {
		return res.status(404).json({ error: "ROUTE NOT FOUND" });
	});
};

export default constructorMethod;