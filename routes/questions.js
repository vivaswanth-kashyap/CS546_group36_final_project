import { Router } from "express";
import * as questionData from "../data/questions.js";
import * as helpers from "../helpers/questionsHelper.js";
const router = Router();

router.route("/").get(async (req, res) => {
	try {
		const questions = await questionData.findAllQuestions();
		console.log(questions);
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
	res.render("newQuestion", { title: "Ask a Question", bg: "bg-gray-100" });
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
			//console.log(question);
			res.render("question", {
				title: question.title,
				question: question,
				bg: "bg-stone-50",
			});
		}
	} catch (e) {
		res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let questionId = req.params.id;
		questionId = helpers.checkId(questionId);
		const question = await questionData.findQuestion(questionId);

		res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
		});
	} catch (e) {
		res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

export default router;
