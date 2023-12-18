import { questions } from "../config/mongoCollections.js";
import { communities } from "../config/mongoCollections.js";
import * as helpers from "../helpers/commHelper.js";
import { ObjectId } from "mongodb";

const createCommunity = async (title, email, description) => {
	if (helpers.isValidCommunity(title,email,description)) {
		title = title.trim();
		email = email.trim();
		description = description.trim();
		let createdAt = new Date();
		let newComminuty = {
			email,
			title,
			description,
			createdAt,
			members:[],
			questions: [],
		};

		const communityCollection = await communities();
 		const sameCommunity = await communityCollection.findOne({title:title});
		if(sameCommunity) throw "community with same name found";
		const insertInfo = await communityCollection.insertOne(newComminuty);
		if (!insertInfo.acknowledged || !insertInfo.insertedId) {
			throw "could not add a community";
		}

		const newId = insertInfo.insertedId.toString();

		const community = await findCommunity(newId);

		return community;
	}
};

const findAllCommunites = async () => {
	const communityCollection = await communities();
	let communityList = await communityCollection.find({}).toArray();
	if (!communityList) {
		throw "couldn't get all communities";
	}
	return communityList;
};
const findMembers = async(communityId) =>{
	//communityId = helpers.checkId(communityId);
	const communityCollection = await communities();
	let community = await communityCollection.findOne({_id : new ObjectId(communityId)});
	if (!community) {
		throw "couldn't get community";
	}
	let memberList = community.members;
	return memberList;
}
const findCommunity = async(communityId) =>{
	//communityId = helpers.checkId(communityId);
	const communityCollection = await communities();
	let community = await communityCollection.findOne({_id : new ObjectId(communityId)});
	if (!community) {
		throw "couldn't get community";
	}
	return community;
}
const joinCommunity = async(communityId, email) =>{
	if (!helpers.isValidString(email)) throw `${email} is invalid`;
	email = email.trim();

	const communityCollection = await communities();
	let community = await communityCollection.findOne({_id : new ObjectId(communityId)});
	if (!community) {
		throw "couldn't get community";
	}
	for (const member of community.members) {
		if(member === email) throw 'same email address';
	}
	community.members.push(email);
	const community1 = await communityCollection.findOneAndUpdate(
		{_id: new ObjectId(communityId)},
		{$set: {members : community.members}},
		{returnDocument: 'after'}
	  );
	  
	  if (!community1) {
		throw 'could not add member successfully';
	  }

	  const newCommunity = await findCommunity(communityId);

	  return newCommunity;
}
const searchCommunities = async (keyword) => {
	const communityCollection = await communities();
	
	const regex = new RegExp(keyword, 'i'); 
    const result = await communityCollection.find({ title: regex }).toArray();
    
	if (!result) {
		throw "No communities found matching the search criteria";
	}
	result.forEach((community) => (community._id = community._id.toString()));
	return result;
};
const unjoinCommunity = async (communityId, email) => {
    if (!helpers.isValidString(email)) throw `${email} is invalid`;
    email = email.trim();

    const communityCollection = await communities();
    let community = await communityCollection.findOne({ _id: new ObjectId(communityId) });
    if (!community) {
        throw "Couldn't get community";
    }

    let isMember = false;
    for (let i = 0; i < community.members.length; i++) {
        if (community.members[i] === email) {
            community.members.splice(i, 1);
            isMember = true;
            break;
        }
    }

    if (!isMember) {
        throw 'Email address is not a member of this community';
    }

    const updatedCommunity = await communityCollection.findOneAndUpdate(
        { _id: new ObjectId(communityId) },
        { $set: { members: community.members } },
        { returnDocument: 'after' }
    );

    if (!updatedCommunity) {
        throw 'Could not remove member successfully';
    }

    const newCommunity = await findCommunity(communityId);

    return newCommunity;
}
const addQuestionToCommunity = async(communityId, questionId) => {
	const communityCollection = await communities();
	const updatedCommunity = await communityCollection.findOneAndUpdate(
		{ _id : new ObjectId(communityId)},
		{ $push: {questions: questionId}},
		{ returnDocument: 'after'}
	);
	if(!updatedCommunity){
		throw "Could not add question to the community";
	}
	return updatedCommunity;
}
const deleteQuestionFromCommunity = async(communityId, questionId) => {
	const communityCollection = await communities();
	const updatedCommunity = await communityCollection.findOneAndUpdate(
		{_id : new ObjectId(communityId)},
		{$pull : {questions: questionId}},
		{returnDocument: 'after'}
	);
	if(!updatedCommunity){
		throw 'Could not delete question from the community';
	}
	return updatedCommunity;
}
const getQuestionFromCommunity = async(communityId) =>{
	const community = findCommunity(communityId);
	const questionCollection = await questions();

	const questionIds = community.questions;
	const questionList = [];

	for(const questionId of questionIds){
		const question = await questionCollection.findOne(
			{_id: new ObjectId(questionId)}, 
			{projection: {title: 1}}
		);
		if(question){
			questionList.push({id: questionId, title:question.title});
		}
	}
	return questionList;
};
export {
	createCommunity,
	findAllCommunites,
	findMembers,
	findCommunity,
	searchCommunities,
	joinCommunity,
	unjoinCommunity,
	addQuestionToCommunity,
	deleteQuestionFromCommunity,
	getQuestionFromCommunity
};