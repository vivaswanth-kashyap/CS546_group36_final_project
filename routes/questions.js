import { Router } from "express";
import xss from "xss";
import * as questionData from "../data/questions.js";
import * as helpers from "../helpers/questionsHelper.js";
import * as userActivity from "../data/userActivity.js";
import * as communityData from "../data/communities.js";
import * as commentData from "../data/comment.js";
const router = Router();

router.route("/").get(async (req, res) => {
	// if (req.session.user) {
	// 	console.log(req.session.user.stevensEmail);
	// }
	// console.log("inside route findAll");
	try {
		const keyword = xss(req.query.key);
		//console.log(keyword);
		let questions;
		if (keyword) {
			// console.log("top keyword recognized");
			questions = await questionData.findAllQuestions(keyword);
		} else {
			questions = await questionData.findAllQuestions();
		}

		//console.log(questions);
		if (req.session.user) {
			return res.render("questions", {
				title: "All Questions",
				questions: questions,
				bg: "bg-stone-50",
				css: "questions",
				js: "questions",
				user: req.session.user,
			});
		}
		return res.render("questions", {
			title: "All Questions",
			questions: questions,
			bg: "bg-stone-50",
			css: "questions",
			js: "questions",
		});
	} catch (e) {
		return res.render("questions", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

router.route("/search/:searchTerm").get(async (req, res) => {
	// console.log("inside route search");
	try {
		const searchTerm = xss(req.params.searchTerm);
		const results = await questionData.searchQuestions(searchTerm);
		return res.status(200).json(results);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

router.route("/question").get(async (req, res) => {
	if (req.session.user) {
		return res.render("newQuestion", {
			title: "Ask a public question",
			bg: "bg-zinc-100",
			css: "questions",
			js: "questions",
			user: req.session.user,
		});
	} else {
		return res.render("error", {
			title: "Error",
			error: "You have to login first to ask a question",
		});
	}
});

router.route("/question").post(async (req, res) => {
	// console.log("inside post");
	try {
		if (req.session.user) {
			const input = req.body;
			if (!input || Object.keys(input).length === 0) {
				return res.render("newQuestion", {
					title: "Error",
					message: "Enter Valid data",
					bg: "bg-stone-50",
					css: "questions",
					js: "questions",
					user: req.session.user,
				});
			}
			if (
				helpers.isValidQuestion(
					input.title,
					input.problemDetails,
					input.attemptDetails,
					input.tags
				)
			) {
				const sanitizedTitle = xss(input.title);
				const sanitizedProblemDetails = xss(input.problemDetails);
				const sanitizedAttemptDetails = xss(input.attemptDetails);
				const sanitizedTags = xss(input.tags);

				const question = await questionData.createQuestion(
					sanitizedTitle,
					sanitizedProblemDetails,
					sanitizedAttemptDetails,
					sanitizedTags,
					req.session.user.stevensEmail
				);
				// Added to the userActivity here
				await userActivity.addQuestionsCreated(
					req.session.user.stevensEmail,
					question._id
				);
				//console.log(votes);
				//console.log(question);
				return res.redirect(`/questions/selectCommunity/${question._id}`);
			}
		} else {
			// console.log("inside else");
			return res.render("question", {
				title: "Error",
				message: "You have to login first to ask a question",
				bg: "bg-stone-50",
				css: "questions",
				js: "questions",
			});
		}
	} catch (e) {
		// console.log("inside catch");
		return res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
			css: "questions",
			js: "questions",
		});
	}
});

router.route("/selectCommunity/:id").get(async (req, res) => {
	// console.log("inside select Community");
	try {
		let questionId = xss(req.params.id);
		questionId = helpers.checkId(questionId);
		if (req.session.user) {
			let communities = await communityData.findAllCommunites();
			//console.log(communities);
			return res.render("selectCommunity", {
				title: "Join the Conversation - Pick a Community to Post In",
				communities: communities,
				questionId: questionId,
				bg: "bg-stone-50",
				user: req.session.user,
				css: "questions",
			});
		}
	} catch (e) {
		//console.log(e);
		return res.render("selectCommunity", { title: "error", error: e.message });
	}
});

router.route("/selectCommunity/:id").post(async (req, res) => {
	//console.log("inside select post");
	//console.log("request body: ", req.body);
	try {
		let questionId = xss(req.params.id);
		questionId = helpers.checkId(questionId);
		let communityId = xss(req.body.communityId);
		if (req.session.user) {
			const inputInfo = await communityData.addQuestionToCommunity(
				communityId,
				questionId
			);
			//console.log(inputInfo);
			return res.redirect(`/questions/${questionId}`);
		}
	} catch (e) {
		return res.render("selectCommunity", { title: "error", error: e });
	}
});

router.route("/question").patch(async (req, res) => {
	try {
		if (req.session.user) {
			let input = req.body;
			input.id = helpers.checkId(input.id);

			let question;
			// console.log(input.key);
			if (input.key === "up") {
				question = await questionData.upVote(input.id);
			} else {
				question = await questionData.downVote(input.id);
			}

			return res.status(200).render("question", {
				title: question.title,
				question: question,
				bg: "bg-stone-50",
				css: "questions",
				js: "questions",
				user: req.session.user,
			});
		} else {
			return res.status(400).json({ error: "You have to login first" });
		}
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

router.route("/question/edit/:id").put(async (req, res) => {
	let id = helpers.checkId(req.params.id);

	// console.log("inside put");
	//console.log(req.body);
	try {
		const input = req.body;
		if (!input || Object.keys(input).length === 0) {
			return res.render("newQuestion", {
				title: "Error",
				message: "Enter Valid data",
				bg: "bg-stone-50",
				css: "questions",
				js: "questions",
			});
		}
		if (
			helpers.isValidQuestion(
				input.title,
				input.problemDetails,
				input.attemptDetails,
				input.tags
			)
		) {
			const question = await questionData.editQuestion(
				id,
				input.title,
				input.problemDetails,
				input.attemptDetails,
				input.tags
			);
			//console.log(votes);
			//console.log(question);
			return res.redirect(`/questions/${question._id}`);
		}
	} catch (e) {
		return res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
			css: "questions",
			js: "questions",
		});
	}
});

router.route("/question/edit/:id").get(async (req, res) => {
	try {
		let questionId = req.params.id;
		questionId = helpers.checkId(questionId);

		const question = await questionData.findQuestion(questionId);
		//console.log(question);

		question.tagsObj = question.tagsObj.map((obj) => obj.tag.trim()).join(", ");
		if (req.session.user) {
			if (req.session.user.stevensEmail == question.stevensEmail) {
				return res.status(200).render("newQuestion", {
					title: "Ask a public question",
					question: question,
					bg: "bg-zinc-100",
					css: "questions",
					js: "questions",
					user: req.session.user,
				});
			} else {
				return res.status(400).render("error", {
					title: "error",
					error: "you are not authorized to edit the message",
					user: req.session.user,
				});
			}
		} else {
			return res.render("error", {
				title: "error",
				error: "you are not authorized to edit the message",
			});
		}
	} catch (e) {
		return res.status(400);
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let questionId = req.params.id;
		questionId = helpers.checkId(questionId);
		const question = await questionData.findQuestion(questionId);
		let commentList = [];
		if (question.comments.length) {
			const commentIds = question.comments;
			for (const commentId of commentIds) {
				const comment = await commentData.getComment(commentId);
				if (comment) {
					commentList.push({
						id: comment._id,
						commentText: comment.commentText,
						commenter: comment.commenter,
						createdAt: comment.createdAt,
						likes: comment.likes,
						disLikes: comment.disLikes,
						accepted: comment.accepted,
					});
				}
			}
		}
		let accepted = undefined;
		let count = 0;

		for (let i of commentList)
		{
			if (i.accepted == true)
			{
				accepted = i;
				break;
			}
			count += 1;
		}
		commentList.splice(count, 1);

		if (req.session.user) {
			if (accepted)
			{
					//console.log(req.session.user);
				if (req.session.user.stevensEmail == question.stevensEmail) {
					return res.render("question", {
						title: question.title,
						question: question,
						comment: commentList,
						bg: "bg-stone-50",
						css: "questions",
						js: "questions",
						user: req.session.user,
						owner: true,
						accepted: accepted,
					});
				}
				return res.render("question", {
					title: question.title,
					question: question,
					comment: commentList,
					bg: "bg-stone-50",
					css: "questions",
					js: "questions",
					user: req.session.user,
					accepted: accepted,
				});
			}
			else{
			//console.log(req.session.user);
			if (req.session.user.stevensEmail == question.stevensEmail) {
				return res.render("question", {
					title: question.title,
					question: question,
					comment: commentList,
					bg: "bg-stone-50",
					css: "questions",
					js: "questions",
					user: req.session.user,
					owner: true,
				});
			}
			return res.render("question", {
				title: question.title,
				question: question,
				comment: commentList,
				bg: "bg-stone-50",
				css: "questions",
				js: "questions",
				user: req.session.user,
			});
		}
		}
		return res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
			css: "questions",
			js: "questions",
		});
	} catch (e) {
		return res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

router.route("/:id").delete(async (req, res) => {
	// console.log("inside route delete");
	try {
		const questionId = helpers.checkId(req.params.id);

		const exists = await questionData.findQuestion(questionId);
		//console.log("session", req.session.user.stevensEmail);
		//console.log("data", exists.stevensEmail);
		if (req.session.user.stevensEmail == exists.stevensEmail) {
			const question = await questionData.removeQuestion(questionId);

			// Deleted to the userActivity here
			await userActivity.deleteQuestionsCreated(
				req.session.user.stevensEmail,
				questionId
			);
			// deleted to the communities here
			// Find the community id of that question
			let allCommunities = await communityData.findAllCommunites();
			let communityId = undefined;
			for (let i of allCommunities) {
				for (let j of i.questions) {
					if (questionId == j.toString()) {
						communityId = i._id.toString();
						break;
					}
				}
			}
			if (communityId == undefined)
				throw `${questionId} does not belong to any community`;

			await communityData.deleteQuestionFromCommunity(communityId, questionId);

			if (question.deleted) {
				// console.log("deleted");
				return res.status(200).json(question);
			}
		} else {
			return res.render("error", {
				title: "error",
				error: "you are not authorized to delete the message",
				user: req.session.user,
			});
		}
	} catch (e) {
		return res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

// Ajax routes
// questionsSaved
router.route("/api/questionsSaved").get(async (req, res) => {
	// Check if User is logged in
	if (req.session.user) {
		try {
			let userData = await userActivity.getUserActivity(
				req.session.user.stevensEmail
			);
			return res.json(userData.questionsSaved);
		} catch (e) {
			return res.status(500).render("error", { title: "Error", error: e });
		}
	} else {
		return res.redirect("/login");
	}
});

router.route("/api/questionsSaved").post(async (req, res) => {
	// Check if User is logged in
	if (req.session.user) {
		try {
			await userActivity.addQuestionsSaved(
				req.session.user.stevensEmail,
				req.body.questionId
			);
		} catch (e) {
			return res.status(500).render("error", { title: "Error", error: e });
		}
	} else {
		return res.redirect("/login");
	}
});

router.route("/api/deleteQuestionsSaved").post(async (req, res) => {
	// Check if User is logged in
	if (req.session.user) {
		try {
			await userActivity.deleteQuestionsSaved(
				req.session.user.stevensEmail,
				req.body.questionId
			);
		} catch (e) {
			return res.status(500).render("error", { title: "Error", error: e });
		}
	} else {
		return res.redirect("/login");
	}
});

export default router;
