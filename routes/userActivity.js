import * as users from "../data/users.js";
import * as userActivity from "../data/userActivity.js";
import * as helper from "../helpers/usersHelper.js";
import express from "express";
import xss from "xss";

import * as communityData from "../data/communities.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
	let activity = undefined;
	try {
		activity = await userActivity.getUserActivity(
			req.session.user.stevensEmail
		);
	} catch (e) {
		return res
			.status(400)
			.render("error", { title: "User Activity Error", error: e });
	}
	return res.render("userActivity", {
		title: "User Page",
		css: "userActivity",
		js: "userActivity",
		user: req.session.user,
		activity: activity,
	});
});

router
	.route("/setting")
	.get(async (req, res) => {
		return res.render("userSetting", {
			title: "Settings",
			css: "userActivity",
			js: "userActivity",
			user: req.session.user,
		});
	})
	.post(async (req, res) => {
		let firstName = xss(req.body.firstNameInput);
		let lastName = xss(req.body.lastNameInput);
		let academicStatus = xss(req.body.academicStatusInput);
		let output = undefined;

		// Validate input
		try {
			firstName = helper.validString(firstName);
			lastName = helper.validString(lastName);
			academicStatus = helper.validString(academicStatus);

			academicStatus = academicStatus.toLowerCase();
			let regex = /^[a-zA-Z]+$/;

			if (
				!regex.test(firstName) ||
				firstName.length < 2 ||
				firstName.length > 25
			)
				throw `${firstName} is not a valid First name`;
			if (!regex.test(lastName) || lastName.length < 2 || lastName.length > 25)
				throw `${lastName} is not a valid Last name`;
			if (!helper.validStatus(academicStatus))
				throw `${academicStatus} is not a valid academicStatus`;
		} catch (e) {
			return res
				.status(400)
				.render("userSetting", {
					title: "Settings",
					error: e,
					css: "userActivity",
					js: "userActivity",
					user: req.session.user,
				});
		}

		// Update the values
		try {
			// Update the fields which are different
			if (req.session.user.firstName != firstName) {
				output = await users.updateFirstName(
					req.session.user.stevensEmail,
					firstName
				);
			}
			if (req.session.user.lastName != lastName) {
				output = await users.updateLastName(
					req.session.user.stevensEmail,
					lastName
				);
			}
			if (req.session.user.academicStatus != academicStatus) {
				output = await users.updateAcademicStatus(
					req.session.user.stevensEmail,
					academicStatus
				);
			}
			// update the session
			output = await users.getUser(req.session.user.stevensEmail);
			req.session.user = output;
			return res.redirect("/userActivity");
		} catch (e) {
			return res.status(500).render("error", { title: "Error", error: e });
		}
	});

//export router
export default router;
