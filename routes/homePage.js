import express from "express";
const router = express.Router();

router.route("/").get(async (req, res) => {
	// provide a title, css file name, js file name

	if (req.session.user)
	{
		res.render("homepage", {
			title: "Stevens Overflow",
			css: "homePage",
			js: "",
			user: req.session.user,
		});
	} else {
		res.render("homepage", {
			title: "Stevens Overflow",
			css: "homePage",
			js: "",
		});
	}
});

//export router
export default router;
