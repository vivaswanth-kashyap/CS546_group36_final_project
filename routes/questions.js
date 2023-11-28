import { Router } from "express";
import * as questionData from "../data/questions.js";
import * as helpers from "../helpers/questionsHelper.js";
const router = Router();

router.route("/").get(async (req, res) => {
	try {
		const questions = await questionData.findAllQuestions();
		//console.log(questions);
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

router.route("/question").get(async (req, res) => {
	return res.render("newQuestion", {
		title: "Ask a public question",
		bg: "bg-zinc-100",
		css: "questions",
		js: "questions",
	});
});

router.route("/question").post(async (req, res) => {
	console.log("inside post");
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
			const question = await questionData.createQuestion(
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

router.route("/question").patch(async (req, res) => {
	try {
		let input = req.body;
		input.id = helpers.checkId(input.id);

		let question;
		console.log(input.key);
		if (input.key === "up") {
			question = await questionData.upVote(input.id);
		} else {
			question = await questionData.downVote(input.id);
		}

		return res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
			css: "questions",
			js: "questions",
		});
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

router.route("/question/edit/:id").put(async (req, res) => {
	let id = helpers.checkId(req.params.id);

	console.log("inside put");
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
			//let votes = question.likes - question.disLikes;
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

		return res.render("newQuestion", {
			title: "Ask a public question",
			question: question,
			bg: "bg-zinc-100",
			css: "questions",
			js: "questions",
		});
	} catch (e) {
		return res.status(400);
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let questionId = req.params.id;
		questionId = helpers.checkId(questionId);
		const question = await questionData.findQuestion(questionId);
		let votes = question.likes - question.disLikes;

		return res.render("question", {
			title: question.title,
			question: question,
			bg: "bg-stone-50",
			votes: votes,
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
	console.log("inside route delete");
	try {
		const questionId = helpers.checkId(req.params.id);
		const question = await questionData.removeQuestion(questionId);

		if (question.deleted) {
			console.log("deleted");
			return res.redirect("/questions/");
		}
	} catch (e) {
		return res.render("question", {
			title: "Error",
			message: e.message,
			bg: "bg-stone-50",
		});
	}
});

export default router;
