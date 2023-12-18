import express from "express";
import * as commentData from "../data/comment.js";
import * as questionData from "../data/questions.js";
import * as helper from "../helpers/commentHelper.js";
import { ObjectId } from "mongodb";
import { comments } from "../config/mongoCollections.js";
import xss from "xss";
import * as userActivity from "../data/userActivity.js";

const router = express.Router();

//homepage
router.get("/", async (req, res) => {
	try {
		const comments = await commentData.findAllComments();
		if (!comments || comments.length === 0) {
			return res.render("home", {
				title: "Homepage",
				comments: [],
				errorMessage: "No comments found",
			});
		}
		res.render("home", {
			title: "Homepage",
			comments: comments,
		});
	} catch (err) {
		console.error(err);
		res.render("home", {
			title: "Homepage",
			comments: [],
			errorMessage: "Failed to retrieve comments",
		});
	}
});

router.route("/comment").get(async (req, res) => {
	res.render("newComment", {
		title: "Add a Comment",
	});
	console.log("route fired");
});

// post new comment
router.post("/comment", async (req, res) => {
	try {
		const input = req.body;
		console.log(`${input} this ------------`);
		if (!input || Object.keys(input).length === 0) {
			return res.status(400).json({
				error: "Enter valid data",
			});
		}
		if (!helper.isValidComment(xss(input.user), xss(input.commentText))) {
			return res.status(400).json({
				error: "Invalid comment data",
			});
		}
		const comment = await commentData.createComment(
			xss(input.user),
			xss(input.commentText)
		);
		const question = await questionData.addComment(
			xss(input.questionId),
			comment._id
		);

		await userActivity.addCommentsCreated(comment.commenter, comment._id);

		res.redirect(`/questions/${question._id}`);
	} catch (e) {
		res.status(500).json({
			error: e.message || "Failed to create a new comment",
		});
	}
});

//make this for question to get comment
router.route("/:id").get(async (req, res) => {
	try {
		let commentId = req.params.id;
		commentId = helper.checkId(commentId);
		const comment = await commentData.findComment(commentId);

		res.render("comment", {
			title: comment.title,
			comment: comment,
		});
	} catch (e) {
		res.render("comment", {
			title: "Error",
			message: e.message,
		});
	}
});

// Ajax routes
router.route("/api/commentAccepted/:id").post(async (req, res) => {
	// Check if User is logged in
	let commentId = xss(req.body.commentId);
	let questionId = xss(req.params.id);
	console.log(questionId);
	if (req.session.user) {
		try {
			if (!commentId) {
				return res.redirect(`/questions/${questionId}`);
			}
			let accepted = await commentData.toggleAccepted(commentId);
			return res.redirect(`/questions/${questionId}`);
		} catch (e) {
			return res.status(500).render("error", { title: "Error", error: e });
		}
	} else {
		return res.redirect("/login");
	}
});

export default router;
