import express from "express";
const router = express.Router();

router.route("/").get(async (req, res) => {
	// provide a title, css file name, js file name
	res.render("homepage", {
		title: "Stevens Overflow",
		css: "homepage",
		js: "",
	});
});

//export router
export default router;
