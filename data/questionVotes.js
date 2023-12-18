import { questionVotes } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as questionsHelper from "../helpers/questionsHelper.js";

const addVote = async (stevensEmail, questionId, vote) => {
	// console.log("inside data add Vote");
	//console.group("params");
	//console.log(stevensEmail);
	//console.log(questionId);
	// console.log(vote);
	//console.groupEnd();
	if (!stevensEmail || !questionId || !vote) {
		throw "stevensEmail, vote and questionId required";
	}
	if (
		!questionsHelper.isValidString(stevensEmail) ||
		!questionsHelper.isValidString(vote)
	) {
		throw "invalid email or vote, expected strings";
	}

	questionId = questionsHelper.checkId(questionId);
	let newPair = {
		user: stevensEmail,
		question: questionId,
		voteType: vote,
	};

	const questionVotesCollection = await questionVotes();
	const insertInfo = await questionVotesCollection.insertOne(newPair);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw "could not add vote";
	}

	//console.group("insert Info");
	//console.log(insertInfo);
	const newId = insertInfo.insertedId.toString();
	const currVote = await findVote(stevensEmail, questionId);

	//console.log(currVote);
	//console.groupEnd();

	return currVote;
};

const findVote = async (stevensEmail, questionId) => {
	if (!stevensEmail || !questionId) {
		throw "stevensEmail and questionId should be present";
	}

	questionId = questionsHelper.checkId(questionId);

	const questionVotesCollection = await questionVotes();
	const voteInfo = await questionVotesCollection.findOne({
		user: stevensEmail,
		question: questionId,
	});
	if (!voteInfo) {
		return null;
	}

	voteInfo._id = voteInfo._id.toString();

	return voteInfo;
};

const updateVote = async (stevensEmail, questionId, vote) => {
	//console.log("inside update vote data");
	//console.log(stevensEmail, questionId, vote);
	if (!stevensEmail || !questionId || !vote) {
		throw "stevensEmail, vote, and questionId required";
	}
	if (
		!questionsHelper.isValidString(stevensEmail) ||
		!questionsHelper.isValidString(vote)
	) {
		throw "Invalid email or vote, expected strings";
	}
	if (vote == "null") {
		vote = null;
	}

	questionId = questionsHelper.checkId(questionId);

	const questionVotesCollection = await questionVotes();
	const voteInfo = await questionVotesCollection.findOne({
		user: stevensEmail,
		question: questionId,
	});

	if (!voteInfo) {
		throw "No existing vote found";
	}

	const updateInfo = await questionVotesCollection.updateOne(
		{ _id: voteInfo._id },
		{ $set: { voteType: vote } }
	);

	if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
		throw "Update operation failed";
	}

	return { updated: true };
};

const deleteVote = async (stevensEmail, questionId) => {
	if (!stevensEmail || !questionId) {
		throw "stevensEmail, vote and questionId required";
	}
	if (!questionsHelper.isValidString(stevensEmail)) {
		throw "invalid email or vote, expected strings";
	}
	const questionVotesCollection = await questionVotes();
	const deletionInfo = await questionVotesCollection.findOneAndDelete({
		user: stevensEmail,
		question: questionId,
	});

	if (!deletionInfo) {
		throw "couldn't delete the vote";
	}

	//console.log(deletionInfo);
	return { deleted: true };
};
export { addVote, findVote, updateVote, deleteVote };
