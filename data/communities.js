import { questions } from "../config/mongoCollections.js";
import { communities } from "../config/mongoCollections.js";
import * as helpers from "../helpers/commHelper.js";

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
	communityId = helpers.checkId(communityId);
	const communityCollection = await communities();
	let community = await communityCollection.findOne({_id : communityId});
	if (!community) {
		throw "couldn't get community";
	}
	let memberList = community.members;
	return memberList;
}
const findCommunity = async(communityId) =>{
	communityId = helpers.checkId(communityId);
	const communityCollection = await communities();
	let community = await communityCollection.findOne({_id : communityId});
	if (!community) {
		throw "couldn't get community";
	}
	return community;
}

const searchCommunities = async (keyword) => {
	const communityCollection = await communities();

	const regex = new RegExp(keyword, 'i'); // Case-insensitive regex for the keyword
    const result = await communityCollection.find({ name: regex }).toArray();
    

	if (!result) {
		throw "No communities found matching the search criteria";
	}
	result.forEach((community) => (community._id = community._id.toString()));
	return result;
};

export {
	createCommunity,
	findAllCommunites,
	findMembers,
	findCommunity,
	searchCommunities
};