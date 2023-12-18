import * as helper from "../helpers/usersHelper.js";
import { userActivity } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as communityData from "../data/communities.js";
import * as questionData from "../data/questions.js";
import * as commentData from '../data/comment.js';

// Create methods
export const createUserActivity = async (stevensEmail) => {
	// no validation required for stevensEmail since this function is only called when a new user is created

	let newActivity = {
		stevensEmail: stevensEmail,
		rating: 0,
		communitiesCreated: [],
		questionsCreated: [],
		commentsCreated: [],
		communitiesJoined: [],
		questionsSaved: [],
		questionsLiked: [],
		commentsLiked: [],
		createdAt: new Date(),
	};

	// Store
	const activityCollection = await userActivity();
	const insertInfo = await activityCollection.insertOne(newActivity);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) return false;

	return true;
};

// Get methods
export const getUserActivity = async (stevensEmail) => {
	// validate email
	stevensEmail = helper.validString(stevensEmail);
	stevensEmail = stevensEmail.toLowerCase();
	if (!helper.validEmail(stevensEmail))
		throw `${stevensEmail} is not a valid email`;

	// Fetch
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.findOne({
		stevensEmail: stevensEmail,
	});

	if (!activityInfo) throw `No user activity with the email ${stevensEmail}`;

	delete activityInfo._id;
	return activityInfo;
};

// Add methods
export const addCommunitiesCreated = async (stevensEmail, communityId) => {
	// Validate communityId
	communityId = helper.validString(communityId);
	if (!ObjectId.isValid(communityId)) throw `${communityId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.communitiesCreated.push(new ObjectId(communityId));
	let updatedcommunitiesCreated = currUser.communitiesCreated;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { communitiesCreated: updatedcommunitiesCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update communitiesCreated with email ${stevensEmail}`;

	return true;
};

export const addQuestionsCreated = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.questionsCreated.push(new ObjectId(questionId));
	let updatedquestionsCreated = currUser.questionsCreated;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsCreated: updatedquestionsCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsCreated with email ${stevensEmail}`;

	return true;
};

export const addCommentsCreated = async (stevensEmail, commentId) => {
	// Validate commentId
	commentId = helper.validString(commentId);
	if (!ObjectId.isValid(commentId)) throw `${commentId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.commentsCreated.push(new ObjectId(commentId));
	let updatedcommentsCreated = currUser.commentsCreated;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { commentsCreated: updatedcommentsCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update commentsCreated with email ${stevensEmail}`;

	return true;
};

export const addCommunitiesJoined = async (stevensEmail, communityId) => {
	// Validate communityId
	communityId = helper.validString(communityId);
	if (!ObjectId.isValid(communityId)) throw `${communityId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.communitiesJoined.push(new ObjectId(communityId));
	let updatedcommunitiesJoined = currUser.communitiesJoined;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { communitiesJoined: updatedcommunitiesJoined } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update communitiesJoined with email ${stevensEmail}`;

	return true;
};

export const addQuestionsSaved = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.questionsSaved.push(new ObjectId(questionId));
	let updatedquestionsSaved = currUser.questionsSaved;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsSaved: updatedquestionsSaved } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsSaved with email ${stevensEmail}`;

	return true;
};

export const addQuestionsLiked = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.questionsLiked.push(new ObjectId(questionId));
	let updatedquestionsLiked = currUser.questionsLiked;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsLiked: updatedquestionsLiked } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsLiked with email ${stevensEmail}`;

	return true;
};

export const addCommentsLiked = async (stevensEmail, commentId) => {
	// Validate commentId
	commentId = helper.validString(commentId);
	if (!ObjectId.isValid(commentId)) throw `${commentId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	currUser.commentsLiked.push(new ObjectId(commentId));
	let updatedcommentsLiked = currUser.commentsLiked;

	// Add
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { commentsLiked: updatedcommentsLiked } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update commentsLiked with email ${stevensEmail}`;

	return true;
};

// Delete methods
export const deleteCommunitiesCreated = async (stevensEmail, communityId) => {
	// Validate communityId
	communityId = helper.validString(communityId);
	if (!ObjectId.isValid(communityId)) throw `${communityId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.commentsCreated) {
		if (i == communityId) break;
		index += 1;
	}
	if (index == currUser.communitiesJoined.length)
		throw `${stevensEmail} is not the creater of this community`;

	currUser.communitiesCreated.splice(index, 1);
	let updatedcommunitiesCreated = currUser.communitiesCreated;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { communitiesCreated: updatedcommunitiesCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update communitiesCreated with email ${stevensEmail}`;

	return true;
};

export const deleteCommunitiesjoined = async (stevensEmail, communityId) => {
	// Validate communityId
	communityId = helper.validString(communityId);
	if (!ObjectId.isValid(communityId)) throw `${communityId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.commentsCreated) {
		if (i == communityId) break;
		index += 1;
	}
	if (index == currUser.communitiesJoined.length)
		throw `${stevensEmail} is not joined to this community`;

	currUser.communitiesJoined.splice(index, 1);
	let updatedcommunitiesJoined = currUser.communitiesJoined;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { communitiesJoined: updatedcommunitiesJoined } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update communitiesJoined with email ${stevensEmail}`;

	return true;
};

export const deleteQuestionsSaved = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.questionsSaved) {
		if (i == questionId) break;
		index += 1;
	}
	if (index == currUser.questionsSaved.length)
		throw `${stevensEmail} has not saved this question`;

	currUser.questionsSaved.splice(index, 1);
	let updatedquestionsSaved = currUser.questionsSaved;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsSaved: updatedquestionsSaved } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsSaved with email ${stevensEmail}`;

	return true;
};

export const deleteQuestionsCreated = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.questionsCreated) {
		if (i == questionId) break;
		index += 1;
	}
	if (index == currUser.questionsCreated.length)
		throw `${stevensEmail} has not created this question`;

	currUser.questionsCreated.splice(index, 1);
	let updatedquestionsCreated = currUser.questionsCreated;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsCreated: updatedquestionsCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsCreated with email ${stevensEmail}`;

	return true;
};

export const deleteCommentsCreated = async (stevensEmail, commentId) => {
	// Validate commentId
	commentId = helper.validString(commentId);
	if (!ObjectId.isValid(commentId)) throw `${commentId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.commentsCreated) {
		if (i == commentId) break;
		index += 1;
	}
	if (index == currUser.commentsCreated.length)
		throw `${stevensEmail} has not created this comment`;

	currUser.commentsCreated.splice(index, 1);
	let updatedcommentsCreated = currUser.commentsCreated;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { commentsCreated: updatedcommentsCreated } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update commentsCreated with email ${stevensEmail}`;

	return true;
};

export const deleteQuestionsLiked = async (stevensEmail, questionId) => {
	// Validate questionId
	questionId = helper.validString(questionId);
	if (!ObjectId.isValid(questionId)) throw `${questionId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.questionsLiked) {
		if (i == questionId) break;
		index += 1;
	}
	if (index == currUser.questionsLiked.length)
		throw `${stevensEmail} has not liked this question`;

	currUser.questionsLiked.splice(index, 1);
	let updatedquestionsLiked = currUser.questionsLiked;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { questionsLiked: updatedquestionsLiked } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update questionsLiked with email ${stevensEmail}`;

	return true;
};

export const deleteCommentsLiked = async (stevensEmail, commentId) => {
	// Validate commentId
	commentId = helper.validString(commentId);
	if (!ObjectId.isValid(commentId)) throw `${commentId} is not a valid id`;

	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);
	let index = 0;
	for (let i of currUser.commentsLiked) {
		if (i == commentId) break;
		index += 1;
	}
	if (index == currUser.commentsLiked.length)
		throw `${stevensEmail} has not liked this comment`;

	currUser.commentsLiked.splice(index, 1);
	let updatedcommentsLiked = currUser.commentsLiked;

	// Delete
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { commentsLiked: updatedcommentsLiked } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update commentsLiked with email ${stevensEmail}`;

	return true;
};

// Special methods
export const updateRating = async (stevensEmail) => {
	// Don't validate email since we are calling getUserActivity
	let currUser = await getUserActivity(stevensEmail);

	// For every communitiesCreated (+10 points)
	// For every questionsCreated (+5 points)
	// For every commentsCreated (+5 points)
	// For every communitiesJoined (+1 points)
	// For every like received in your question (+2 points)
	// For every dislike received in your question(-5 points)
	// For every Accepted comment (+20 points)
	currUser.rating =
		currUser.communitiesCreated.length * 10 +
		currUser.questionsCreated.length * 5 +
		currUser.commentsCreated.length * 5 +
		currUser.communitiesJoined.length * 1; // Need to add more

	let updatedrating = currUser.rating;
	// Update
	const activityCollection = await userActivity();
	const activityInfo = await activityCollection.updateOne(
		{ stevensEmail: stevensEmail },
		{ $set: { rating: updatedrating } },
		{ returnDocument: "after" }
	);

	if (!activityInfo)
		throw `Update failed! Could not update rating with email ${stevensEmail}`;

	return true;
};
