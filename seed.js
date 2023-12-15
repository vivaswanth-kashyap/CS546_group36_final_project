import * as communityData from "./data/communities.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as user from "./data/users.js";
import * as userActivity from "./data/userActivity.js";

const db = await dbConnection();
await db.dropDatabase();

// Create 5 user variables
let user_1 = undefined;
let user_2 = undefined;
let user_3 = undefined;
let user_4 = undefined;
let user_5 = undefined;

// Create 2 Comminities
let comm_1 = undefined;
let comm_2 = undefined;

// Create users
console.log("\n----------------- create Users -----------------------");
try {
	user_1 = await user.registerUser(
		"Anish",
		"Dhamelia",
		"adhameli@stevens.edu",
		"Abcd@1234",
		"graduate"
	);
	user_1 = await user.getUser("adhameli@stevens.edu");
	console.log(user_1);
} catch (e) {
	console.log(e);
}
try {
	user_2 = await user.registerUser(
		"John",
		"Doe",
		"johndoe@stevens.edu",
		"Abcd@1234",
		"undergraduate"
	);
	user_2 = await user.getUser("johndoe@stevens.edu");
	console.log(user_2);
} catch (e) {
	console.log(e);
}
try {
	user_3 = await user.registerUser(
		"Alice",
		"Johnson",
		"alicejohnson@stevens.edu",
		"Abcd@1234",
		"graduate"
	);
	user_3 = await user.getUser("alicejohnson@stevens.edu");
	console.log(user_3);
} catch (e) {
	console.log(e);
}
try {
	user_4 = await user.registerUser(
		"Bob",
		"Smith",
		"bobsmith@stevens.edu",
		"Abcd@1234",
		"undergraduate"
	);
	user_4 = await user.getUser("bobsmith@stevens.edu");
	console.log(user_4);
} catch (e) {
	console.log(e);
}
try {
	user_5 = await user.registerUser(
		"Eva",
		"Miller",
		"evamiller@stevens.edu",
		"Abcd@1234",
		"graduate"
	);
	user_5 = await user.getUser("evamiller@stevens.edu");
	console.log(user_5);
} catch (e) {
	console.log(e);
}

// Update User
try {
	console.log("\n----------------- Update First Name -----------------------");
	await user.updateFirstName(user_5.stevensEmail, "CHANGEDFIRSTNAME");
	user_5 = await user.getUser("evamiller@stevens.edu");
	console.log(user_5);
} catch (e) {
	console.log(e);
}
try {
	console.log("\n----------------- Update Last Name -----------------------");
	await user.updateLastName(user_5.stevensEmail, "CHANGEDLASTNAME");
	user_5 = await user.getUser("evamiller@stevens.edu");
	console.log(user_5);
} catch (e) {
	console.log(e);
}
try {
	console.log(
		"\n----------------- Update Academic Status -----------------------"
	);
	await user.updateAcademicStatus(user_5.stevensEmail, "teacher");
	user_5 = await user.getUser("evamiller@stevens.edu");
	console.log(user_5);
} catch (e) {
	console.log(e);
}

// Create Community
console.log("\n----------------- Create Communities -----------------------");
try {
	console.log(
		"\n----------------- Create First Community -----------------------"
	);
	comm_1 = await communityData.createCommunity(
		"First",
		user_1.stevensEmail,
		"First description"
	);
	await userActivity.addCommunitiesCreated(
		user_1.stevensEmail,
		comm_1._id.toString()
	);
	let a = await userActivity.getUserActivity(user_1.stevensEmail);
	console.log(a);
} catch (e) {
	console.log(e);
}
try {
	console.log(
		"\n----------------- Create Second Community -----------------------"
	);
	comm_2 = await communityData.createCommunity(
		"Second",
		user_1.stevensEmail,
		"Second description"
	);
	await userActivity.addCommunitiesCreated(
		user_1.stevensEmail,
		comm_2._id.toString()
	);
	let a = await userActivity.getUserActivity(user_1.stevensEmail);
	console.log(a);
} catch (e) {
	console.log(e);
}

// Join Community
console.log("\n----------------- Join Communities -----------------------");
try {
	console.log(
		"\n----------------- Join first Community -----------------------"
	);
	await communityData.joinCommunity(comm_1._id.toString(), user_2.stevensEmail);
	await userActivity.addCommunitiesJoined(
		user_2.stevensEmail,
		comm_1._id.toString()
	);
	let a = await userActivity.getUserActivity(user_2.stevensEmail);
	console.log(a);
} catch (e) {
	console.log(e);
}

console.log("Done seeding database");
await closeConnection();

// let c1 = undefined;
// let c2 = undefined;
// let m1 = undefined;
// let m2 = undefined;

// try{
//      c2 = await communityData.createCommunity("Java old", "npatel24@stevens.edu","this is about java");
// }catch(e){
//     console.log(e);
// }
// try{
//      c1 = await communityData.createCommunity("python new", "npatel24@stevens.edu","this is about java");
// }catch(e){
//     console.log(e);
// }
// try{
//     m1 = await communityData.joinCommunity(c1._id, "npatel24@stevens.edu");
// }catch(e){
//     console.log(e);
// }
// try{
//     m2 = await communityData.joinCommunity(c2._id, "npatel24@stevens.edu");
// }catch(e){
//     console.log(e);
// }
// try{
//     let c3 = await communityData.searchCommunities("java");
//     console.log(c3);
// }catch(e){
//     console.log(e);
// }
// try{
//     let m3 = await communityData.findMembers(c2._id);
//     console.log(m3);
// }catch(e){
//     console.log(e);
// }

// Update UserActivity
// console.log("\n----------------- Update UserActivity -----------------------");
// try
// {
//     console.log("\n----------------- Update addCommunitiesCreated -----------------------");
//     await userActivity.addCommunitiesCreated(user_1.stevensEmail, "656fa0d8549455916693cbb2");
//     let a = await userActivity.getUserActivity(user_1.stevensEmail);
//     console.log(a);
// }
// catch (e)
// {
//     console.log(e);
// }
// try
// {
//     console.log("\n----------------- Update addQuestionsCreated -----------------------");
//     await userActivity.addQuestionsCreated(user_1.stevensEmail, "656fa0d8549455916693cbb2");
//     let a = await userActivity.getUserActivity(user_1.stevensEmail);
//     console.log(a);
// }
// catch (e)
// {
//     console.log(e);
// }
// try
// {
//     console.log("\n----------------- Update addCommentsCreated -----------------------");
//     await userActivity.addCommentsCreated(user_1.stevensEmail, "656fa0d8549455916693cbb2");
//     let a = await userActivity.getUserActivity(user_1.stevensEmail);
//     console.log(a);
// }
// catch (e)
// {
//     console.log(e);
// }
// try
// {
//     console.log("\n----------------- Update addCommunitiesJoined -----------------------");
//     await userActivity.addCommunitiesJoined(user_1.stevensEmail, "656fa0d8549455916693cbb2");
//     let a = await userActivity.getUserActivity(user_1.stevensEmail);
//     console.log(a);
// }
// catch (e)
// {
//     console.log(e);
// }
// try
// {
//     console.log("\n----------------- Update addQuestionsSaved -----------------------");
//     await userActivity.addQuestionsSaved(user_1.stevensEmail, "656fa0d8549455916693cbb2");
//     let a = await userActivity.getUserActivity(user_1.stevensEmail);
//     console.log(a);
// }
// catch (e)
// {
//     console.log(e);
// }
