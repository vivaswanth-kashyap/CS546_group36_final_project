import { questions } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as helpers from "../helpers/questionsHelper.js";

const createQuestion = async (title, problemDetails, attemptDetails, tags) => {
	if (helpers.isValidQuestion(title, problemDetails, attemptDetails, tags)) {
		title = title.trim();
		problemDetails = problemDetails.trim();
		attemptDetails = attemptDetails.trim();
		tags = tags.trim();

		tags = tags.split(",");

		let createdAt = new Date();

		const tagsObj = [];

		for (let i of tags) {
			tagsObj.push({ tag: i });
		}
		const likes = 0;
		const disLikes = 0;
		let newQuestion = {
			title,
			problemDetails,
			attemptDetails,
			tagsObj,
			createdAt,
			likes,
			disLikes,
			votes: likes - disLikes,
			comments: [],
		};

		const questionCollection = await questions();
		const insertInfo = await questionCollection.insertOne(newQuestion);
		if (!insertInfo.acknowledged || !insertInfo.insertedId) {
			throw "could not add a question";
		}

		const newId = insertInfo.insertedId.toString();

		const question = await findQuestion(newId);

		return question;
	}
};

const findAllQuestions = async () => {
	const questionCollection = await questions();
	const questionList = await questionCollection
		.find({})
		.sort({ createdAt: -1 })
		.toArray();

	if (!questionList) {
		throw "couldn't get all questions";
	}
	return questionList;
};

const findQuestion = async (questionId) => {
	questionId = helpers.checkId(questionId);
	const questionCollection = await questions();

	const question = await questionCollection.findOne({
		_id: new ObjectId(questionId),
	});

	if (!question) {
		throw "No question with the id";
	}

	question._id = question._id.toString();
	return question;
};

const removeQuestion = async (questionId) => {
	console.log("inside data delete");
	questionId = helpers.checkId(questionId);
	const questionCollection = await questions();

	const deletionInfo = await questionCollection.findOneAndDelete({
		_id: new ObjectId(questionId),
	});

	if (!deletionInfo) {
		throw "could not delete the question";
	}

	return { title: deletionInfo.title, deleted: true };
};

const editQuestion = async (
	questionId,
	title,
	problemDetails,
	attemptDetails,
	tags
) => {
	// console.log("question id", questionId);
	// console.log("title", title);
	// console.log("problem ", problemDetails);
	// console.log("attemot", attemptDetails);
	// console.log(tags);
	if (helpers.isValidQuestion(title, problemDetails, attemptDetails, tags)) {
		questionId = helpers.checkId(questionId);
		const questionCollection = await questions();

		const existingInfo = await questionCollection.findOne({
			_id: new ObjectId(questionId),
		});

		if (!existingInfo) {
			throw "no question found with id";
		}

		const updationInfo = await questionCollection.findOneAndUpdate(
			{ _id: new ObjectId(questionId) },
			{ $set: { title, problemDetails, attemptDetails, tags } },
			{ returnDocument: "after" }
		);

		if (!updationInfo) {
			throw "update unsuccessful";
		}

		updationInfo._id = updationInfo._id.toString();

		return updationInfo;
	}
};

const upVote = async (questionId) => {
	questionId = helpers.checkId(questionId);
	const questionCollection = await questions();

	const question = await questionCollection.findOne({
		_id: new ObjectId(questionId),
	});

	question.likes += 1;

	const updateInfo = await questionCollection.findOneAndUpdate(
		{ _id: new ObjectId(questionId) },
		{ $set: { likes: question.likes } },
		{ document: "after" }
	);

	return updateInfo;
};

const downVote = async (questionId) => {
	questionId = helpers.checkId(questionId);
	const questionCollection = await questions();

	const question = await questionCollection.findOne({
		_id: new ObjectId(questionId),
	});

	question.disLikes += 1;

	const updateInfo = await questionCollection.findOneAndUpdate(
		{ _id: new ObjectId(questionId) },
		{ $set: { disLikes: question.disLikes } },
		{ document: "after" }
	);

	return updateInfo;
};

const searchQuestions = async (searchTerm) => {
	console.log("inside data searchQuestion");
	console.log(searchTerm);
	const questionCollection = await questions();
	let query = {
		$or: [
			{ title: { $regex: searchTerm, $options: "i" } },
			{ problemDetails: { $regex: searchTerm, $options: "i" } },
			{ "tagsObj.tag": { $regex: searchTerm, $options: "i" } },
		],
	};

	const results = await questionCollection.find(query).toArray();

	if (!results) {
		throw "No questions found matching the search criteria";
	}
	results.forEach((question) => (question._id = question._id.toString()));

	return results;
};

export {
	createQuestion,
	findAllQuestions,
	findQuestion,
	editQuestion,
	removeQuestion,
	searchQuestions,
	upVote,
	downVote,
};
