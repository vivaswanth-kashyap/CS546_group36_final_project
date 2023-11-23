import questionRoutes from "./questions.js";

const constructorMethod = (app) => {
	app.use("/questions", questionRoutes);

	app.use("*", (req, res) => {
		return res.status(404).json({ error: "ROUTE NOT FOUND" });
	});
};

export default constructorMethod;
