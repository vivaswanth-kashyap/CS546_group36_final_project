import homePageRoutes from "./homePage.js";

const constructorMethod = (app) => {
	app.use("/", homePageRoutes);

	app.use("*", (req, res) => 
	{
		return res.render('error',  {title: 'Stevens Overflow', css: '', js: ''});
	});
};

export default constructorMethod;
