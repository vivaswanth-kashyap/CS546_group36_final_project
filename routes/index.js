import homePageRoutes from "./homePage.js";
import userRoutes from "./users.js";


const constructorMethod = (app) => {
	app.use("/", homePageRoutes);
	app.use("/", userRoutes);
	app.use("*", (req, res) => 
	{
		return res.render('error',  {title: 'Stevens Overflow', css: '', js: ''});
	});
};

export default constructorMethod;
