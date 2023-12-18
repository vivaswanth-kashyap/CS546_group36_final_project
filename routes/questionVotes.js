import { Router } from "express";
import xss from "xss";
import * as questionVotesData from "../data/questionVotes.js";
import * as questionData from "../data/questions.js";
import * as helpers from "../helpers/questionsHelper.js";
import * as userActivity from "../data/userActivity.js";
import * as communityData from "../data/communities.js";

const router = Router();

router.route("/").get(async (req, res) => {
	try {
		let stevensEmail = xss(req.session.user.stevensEmail);
		let questionId = xss(req.query.questionId);
		let voteInfo = await questionVotesData.findVote(stevensEmail, questionId);

		return res.status(200).json(voteInfo);
	} catch (e) {
		return res.status(400).json(e.message);
	}
});

router.route("/").post(async (req, res) => {
	//console.log("inside post votes route");
	try {
		let questionId = xss(req.body.questionId);
		let vote = xss(req.body.voteType);
		if (req.session.user) {
			let insertInfo = await questionVotesData.addVote(
				req.session.user.stevensEmail,
				questionId,
				vote
			);
			//console.log("insert info vote", insertInfo);
			return res.status(200).json(insertInfo);
		} else {
			return res.redirect("/login");
		}
	} catch (e) {
		return res.json(e);
	}
});

router.route("/").patch(async (req, res) => {
	//console.log("inside patch");
	try {
		let questionId = xss(req.body.questionId);
		let vote = xss(req.body.voteType);
		//console.log(questionId, vote);
		if (req.session.user) {
			let updateInfo = await questionVotesData.updateVote(
				req.session.user.stevensEmail,
				questionId,
				vote
			);
			let updateVoteCount;
			if (vote == "up") {
				updateVoteCount = await questionData.upVote(questionId);
				//console.log(updateVoteCount);
			} else if (vote == "down") {
				updateVoteCount = await questionData.downVote(questionId);
				//console.log(updateVoteCount);
			}
			return res.status(200).json(updateInfo);
		} else {
			return res.redirect("/login");
		}
	} catch (e) {
		return res.json(e);
	}
});

router.route("/").delete(async (req, res) => {
	try {
		//console.log("delete");
		let questionId = xss(req.query.questionId);
		let vote = xss(req.query.voteType);
		//console.log(questionId, vote);
		if (req.session.user) {
			let deleteVote = await questionVotesData.deleteVote(
				req.session.user.stevensEmail,
				questionId
			);
			//console.log("delete vote", deleteVote);
			let updateVoteCount;
			if (vote == "up") {
				updateVoteCount = await questionData.downVote(questionId);
			} else if (vote == "down") {
				updateVoteCount = await questionData.upVote(questionId);
			}
			return res.status(200).json(deleteVote);
		} else {
			return res.redirect("/login");
		}
	} catch (e) {
		return res.json(e);
	}
});

export default router;
