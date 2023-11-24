import { Router } from "express";
import * as questionData from "../data/questions.js";
import * as helpers from "../helpers/questionsHelper.js";
const router = Router();

router.route("/").get(async (req, res) => {
	try {
		const questions = await questionData.findAllQuestions();
		//console.log(questions);
		res.render("questions", {
			title: "All Questions",
			questions: questions,
			bg: "bg-stone-50",
		});
	} catch (e) {
		res.render("questions", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

router.route("/question").get(async (req, res) => {
	res.render("newQuestion", {
		title: "Ask a public question",
		bg: "bg-zinc-100",
	});
});

router.route("/question").post(async (req, res) => {
	try {
		const input = req.body;
		if (!input || Object.keys(input).length === 0) {
			res.render("newQuestion", {
				title: "Error",
				message: "Enter Valid data",
				bg: "bg-stone-50",
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
			const question = await questionData.createQuestion(
				input.title,
				input.problemDetails,
				input.attemptDetails,
				input.tags
			);

			let votes = question.likes - question.disLikes;
			//console.log(votes);
			//console.log(question);
			res.redirect(`/questions/${question._id}`);
		}
	} catch (e) {
		res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

router.route("/question").patch(async (req, res) => {
	try {
		let input = req.body;
		input.id = helpers.checkId(input.id);

		let question;
		if (input.event === "up") {
			question = await questionData.upVote(input.id);
		} else {
			question = await questionData.downVote(input.id);
		}

		res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
		});
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let questionId = req.params.id;
		questionId = helpers.checkId(questionId);
		const question = await questionData.findQuestion(questionId);
		let votes = question.likes - question.disLikes;

		res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
			votes: votes,
		});
	} catch (e) {
		res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

// res.render("question", {
// 	title: question.title,
// 	question: question,
// 	bg: "bg-stone-50",
// 	votes: votes,
// });

export default router;
