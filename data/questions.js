import { questions } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as helpers from "../helpers/questionsHelper.js";

const createQuestion = async (
	title,
	problemDetails,
	attemptDetails,
	tags,
	stevensEmail
) => {
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
		let newQuestion = {
			stevensEmail,
			title,
			problemDetails,
			attemptDetails,
			tagsObj,
			createdAt,
			votes: 0,
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

const findAllQuestions = async (key = "latest", questionIds = []) => {
	//console.log("inside data findAllQuestions");
	//console.log("list length", questionIds.length);
	//console.log("key", key);
	const questionCollection = await questions();

	let questionList = [];

	if (questionIds.length) {
		for (const id of questionIds) {
			let question = await findQuestion(id);
			questionList.push(question);
		}
		return questionList;
	}

	if (key === "latest") {
		questionList = await questionCollection
			.find({})
			.sort({ createdAt: -1 })
			.toArray();
	}
	if (key === "top") {
		questionList = await questionCollection
			.find({})
			.sort({ votes: -1 })
			.toArray();
	}
	if (!questionList) {
		throw "couldn't get all questions";
	}
	//console.log(questionList);
	return questionList;
};

const findQuestion = async (questionId) => {
	questionId = helpers.checkId(questionId);
	const questionCollection = await questions();

	const question = await questionCollection.findOne({
		_id: new ObjectId(questionId),
	});
	//console.log(question.stevensEmail);
	if (!question) {
		throw "No question with the id";
	}

	question._id = question._id.toString();
	return question;
};

const removeQuestion = async (questionId) => {
	//console.log("inside data delete");
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

	question.votes += 1;

	const updateInfo = await questionCollection.findOneAndUpdate(
		{ _id: new ObjectId(questionId) },
		{ $set: { votes: question.votes } },
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

	question.votes -= 1;

	const updateInfo = await questionCollection.findOneAndUpdate(
		{ _id: new ObjectId(questionId) },
		{ $set: { votes: question.votes } },
		{ document: "after" }
	);

	return updateInfo;
};

//https://www.mongodb.com/docs/manual/reference/operator/query/regex/
//a little help from chatGPT to properly construct the query
const searchQuestions = async (searchTerm, questionIds = []) => {
	//console.log("inside data searchQuestion");
	//console.log(searchTerm);
	const questionCollection = await questions();

	//console.log(searchTerm);

	searchTerm = searchTerm.toLowerCase();
	const searchTerms = searchTerm.split(/\s+/);

	const filteredSearchTerms = searchTerms.filter(
		(term) => !helpers.stopWords.includes(term)
	);

	if (filteredSearchTerms.length === 0) {
		return [];
	}

	let query = {
		$or: filteredSearchTerms.flatMap((word) => [
			{ title: { $regex: word, $options: "i" } },
			{ problemDetails: { $regex: word, $options: "i" } },
			{ "tagsObj.tag": { $regex: word, $options: "i" } },
		]),
	};

	if (questionIds.length > 0) {
		const objectIdArray = questionIds.map((id) => new ObjectId(id));
		query = { ...query, _id: { $in: objectIdArray } };
	}

	const results = await questionCollection.find(query).toArray();

	if (!results) {
		throw "No questions found matching the search criteria";
	}
	results.forEach((question) => (question._id = question._id.toString()));

	//console.log(results.length);
	return results;
};
const addComment = async( questionId, commentId) => {
	const questionCollection = await questions();
	const updatedQuestion = await questionCollection.findOneAndUpdate(
		{ _id : new ObjectId(questionId)},
		{ $push: {comments:commentId}},
		{ returnDocument: 'after'}
	);
	if(!updatedQuestion){
		throw "Could not add comment to question";
	}
	return updatedQuestion;
}
export {
	createQuestion,
	findAllQuestions,
	findQuestion,
	editQuestion,
	removeQuestion,
	searchQuestions,
	upVote,
	downVote,
	addComment
};
