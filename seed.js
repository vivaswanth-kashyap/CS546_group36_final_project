import * as communityData from "./data/communities.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as user from "./data/users.js";
import * as userActivity from "./data/userActivity.js";
import * as questionData from "./data/questions.js";
import * as commentData from './data/comment.js';

const db = await dbConnection();
await db.dropDatabase();

// Create 5 user variables
let user_1 = undefined;
let user_2 = undefined;
let user_3 = undefined;
let user_4 = undefined;
let user_5 = undefined;

// Create 4 Comminities
let comm_1 = undefined;
let comm_2 = undefined;
let comm_3 = undefined;
let comm_4 = undefined;

// Create 20 Questions
let question_1 = undefined;
let question_2 = undefined;
let question_3 = undefined;
let question_4 = undefined;
let question_5 = undefined;
let question_6 = undefined;
let question_7 = undefined;
let question_8 = undefined;
let question_9 = undefined;
let question_10 = undefined;
let question_11 = undefined;
let question_12 = undefined;
let question_13 = undefined;
let question_14 = undefined;
let question_15 = undefined;
let question_16 = undefined;
let question_17 = undefined;
let question_18 = undefined;
let question_19 = undefined;
let question_20 = undefined;

// Create 40 Comments
let comment_1 = undefined;
let comment_2 = undefined;
let comment_3 = undefined;
let comment_4 = undefined;
let comment_5 = undefined;
let comment_6 = undefined;
let comment_7 = undefined;
let comment_8 = undefined;
let comment_9 = undefined;
let comment_10 = undefined;
let comment_11 = undefined;
let comment_12 = undefined;
let comment_13 = undefined;
let comment_14 = undefined;
let comment_15 = undefined;
let comment_16 = undefined;
let comment_17 = undefined;
let comment_18 = undefined;
let comment_19 = undefined;
let comment_20 = undefined;
let comment_21 = undefined;
let comment_22 = undefined;
let comment_23 = undefined;
let comment_24 = undefined;
let comment_25 = undefined;
let comment_26 = undefined;
let comment_27 = undefined;
let comment_28 = undefined;
let comment_29 = undefined;
let comment_30 = undefined;
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
try {
	console.log(
		"\n----------------- Create Third Community -----------------------"
	);
	comm_3 = await communityData.createCommunity(
		"Third",
		user_1.stevensEmail,
		"Third description"
	);
	await userActivity.addCommunitiesCreated(
		user_1.stevensEmail,
		comm_3._id.toString()
	);
	let a = await userActivity.getUserActivity(user_1.stevensEmail);
	console.log(a);
} catch (e) {
	console.log(e);
}
try {
	console.log(
		"\n----------------- Create Fourth Community -----------------------"
	);
	comm_4 = await communityData.createCommunity(
		"Fourth",
		user_1.stevensEmail,
		"Fourth description"
	);
	await userActivity.addCommunitiesCreated(
		user_1.stevensEmail,
		comm_4._id.toString()
	);
	let a = await userActivity.getUserActivity(user_1.stevensEmail);
	console.log(a);
} catch (e) {
	console.log(e);
}

console.log("--------------------- Create Questions --------------------");
// Question 1
try {
    question_1 = await questionData.createQuestion(
        "centering a div",
        "I am working on a web frontend project which requires me to style the content well for which I have to center a div",
        "I have tried using various methods like 'align:center', etc., but nothing is working",
        "css,div,center",
        user_1.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_1._id.toString(), question_1._id.toString());
    await userActivity.addQuestionsCreated(user_1.stevensEmail, question_1._id.toString());

    console.log(question_1);
} catch (e) {
    console.log(e);
}

// Question 2
try {
    question_2 = await questionData.createQuestion(
        "Question 2 Title",
        "Question 2 Description",
        "Question 2 Details",
        "tag4,tag5,tag6",
        user_2.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_2._id.toString(), question_2._id.toString());
    await userActivity.addQuestionsCreated(user_2.stevensEmail, question_2._id.toString());

    console.log(question_2);
} catch (e) {
    console.log(e);
}

// Question 3
try {
    question_3 = await questionData.createQuestion(
        "Question 3 Title",
        "Question 3 Description",
        "Question 3 Details",
        "tag7,tag8,tag9",
        user_3.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_3._id.toString(), question_3._id.toString());
    await userActivity.addQuestionsCreated(user_3.stevensEmail, question_3._id.toString());

    console.log(question_3);
} catch (e) {
    console.log(e);
}

// Question 4
try {
    question_4 = await questionData.createQuestion(
        "Question 4 Title",
        "Question 4 Description",
        "Question 4 Details",
        "tag10,tag11,tag12",
        user_4.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_4._id.toString(), question_4._id.toString());
    await userActivity.addQuestionsCreated(user_4.stevensEmail, question_4._id.toString());

    console.log(question_4);
} catch (e) {
    console.log(e);
}

// Question 5
try {
    question_5 = await questionData.createQuestion(
        "Question 5 Title",
        "Question 5 Description",
        "Question 5 Details",
        "tag13,tag14,tag15",
        user_5.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_1._id.toString(), question_5._id.toString());
    await userActivity.addQuestionsCreated(user_5.stevensEmail, question_5._id.toString());

    console.log(question_5);
} catch (e) {
    console.log(e);
}

// Question 6
try {
    question_6 = await questionData.createQuestion(
        "Question 6 Title",
        "Question 6 Description",
        "Question 6 Details",
        "tag16,tag17,tag18",
        user_2.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_2._id.toString(), question_6._id.toString());
    await userActivity.addQuestionsCreated(user_2.stevensEmail, question_6._id.toString());

    console.log(question_6);
} catch (e) {
    console.log(e);
}

// Question 7
try {
    question_7 = await questionData.createQuestion(
        "Question 7 Title",
        "Question 7 Description",
        "Question 7 Details",
        "tag19,tag20,tag21",
        user_3.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_3._id.toString(), question_7._id.toString());
    await userActivity.addQuestionsCreated(user_3.stevensEmail, question_7._id.toString());

    console.log(question_7);
} catch (e) {
    console.log(e);
}

// Question 8
try {
    question_8 = await questionData.createQuestion(
        "Question 8 Title",
        "Question 8 Description",
        "Question 8 Details",
        "tag22,tag23,tag24",
        user_4.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_4._id.toString(), question_8._id.toString());
    await userActivity.addQuestionsCreated(user_4.stevensEmail, question_8._id.toString());

    console.log(question_8);
} catch (e) {
    console.log(e);
}

// Question 9
try {
    question_9 = await questionData.createQuestion(
        "Question 9 Title",
        "Question 9 Description",
        "Question 9 Details",
        "tag25,tag26,tag27",
        user_5.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_1._id.toString(), question_9._id.toString());
    await userActivity.addQuestionsCreated(user_5.stevensEmail, question_9._id.toString());

    console.log(question_9);
} catch (e) {
    console.log(e);
}

// Question 10
try {
    question_10 = await questionData.createQuestion(
        "Question 10 Title",
        "Question 10 Description",
        "Question 10 Details",
        "tag28,tag29,tag30",
        user_1.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_2._id.toString(), question_10._id.toString());
    await userActivity.addQuestionsCreated(user_1.stevensEmail, question_10._id.toString());

    console.log(question_10);
} catch (e) {
    console.log(e);
}
// Question 11
try {
    question_11 = await questionData.createQuestion(
        "Question 11 Title",
        "Question 11 Description",
        "Question 11 Details",
        "tag31,tag32,tag33",
        user_2.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_3._id.toString(), question_11._id.toString());
    await userActivity.addQuestionsCreated(user_2.stevensEmail, question_11._id.toString());

    console.log(question_11);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 12 to 20
// ...

// Question 12
try {
    question_12 = await questionData.createQuestion(
        "Question 12 Title",
        "Question 12 Description",
        "Question 12 Details",
        "tag34,tag35,tag36",
        user_3.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_4._id.toString(), question_12._id.toString());
    await userActivity.addQuestionsCreated(user_3.stevensEmail, question_12._id.toString());

    console.log(question_12);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 13 to 20
// ...

// Question 13
try {
    question_13 = await questionData.createQuestion(
        "Question 13 Title",
        "Question 13 Description",
        "Question 13 Details",
        "tag37,tag38,tag39",
        user_4.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_1._id.toString(), question_13._id.toString());
    await userActivity.addQuestionsCreated(user_4.stevensEmail, question_13._id.toString());

    console.log(question_13);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 14 to 20
// ...

// Question 14
try {
    question_14 = await questionData.createQuestion(
        "Question 14 Title",
        "Question 14 Description",
        "Question 14 Details",
        "tag40,tag41,tag42",
        user_5.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_2._id.toString(), question_14._id.toString());
    await userActivity.addQuestionsCreated(user_5.stevensEmail, question_14._id.toString());

    console.log(question_14);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 15 to 20
// ...

// Question 15
try {
    question_15 = await questionData.createQuestion(
        "Question 15 Title",
        "Question 15 Description",
        "Question 15 Details",
        "tag43,tag44,tag45",
        user_1.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_3._id.toString(), question_15._id.toString());
    await userActivity.addQuestionsCreated(user_1.stevensEmail, question_15._id.toString());

    console.log(question_15);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 16 to 20
// ...

// Question 16
try {
    question_16 = await questionData.createQuestion(
        "Question 16 Title",
        "Question 16 Description",
        "Question 16 Details",
        "tag46,tag47,tag48",
        user_2.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_4._id.toString(), question_16._id.toString());
    await userActivity.addQuestionsCreated(user_2.stevensEmail, question_16._id.toString());

    console.log(question_16);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 17 to 20
// ...

// Question 17
try {
    question_17 = await questionData.createQuestion(
        "Question 17 Title",
        "Question 17 Description",
        "Question 17 Details",
        "tag49,tag50,tag51",
        user_3.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_1._id.toString(), question_17._id.toString());
    await userActivity.addQuestionsCreated(user_3.stevensEmail, question_17._id.toString());

    console.log(question_17);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 18 to 20
// ...

// Question 18
try {
    question_18 = await questionData.createQuestion(
        "Question 18 Title",
        "Question 18 Description",
        "Question 18 Details",
        "tag52,tag53,tag54",
        user_4.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_2._id.toString(), question_18._id.toString());
    await userActivity.addQuestionsCreated(user_4.stevensEmail, question_18._id.toString());

    console.log(question_18);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Questions 19 and 20
// ...

// Question 19
try {
    question_19 = await questionData.createQuestion(
        "Question 19 Title",
        "Question 19 Description",
        "Question 19 Details",
        "tag55,tag56,tag57",
        user_5.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_3._id.toString(), question_19._id.toString());
    await userActivity.addQuestionsCreated(user_5.stevensEmail, question_19._id.toString());

    console.log(question_19);
} catch (e) {
    console.log(e);
}

// Question 20
try {
    question_20 = await questionData.createQuestion(
        "Question 20 Title",
        "Question 20 Description",
        "Question 20 Details",
        "tag58,tag59,tag60",
        user_1.stevensEmail
    );
    await communityData.addQuestionToCommunity(comm_4._id.toString(), question_20._id.toString());
    await userActivity.addQuestionsCreated(user_1.stevensEmail, question_20._id.toString());

    console.log(question_20);
} catch (e) {
    console.log(e);
}

console.log("--------------------- Create Comments --------------------");

// Comment 1
try {
    comment_1 = await commentData.createComment(user_1.stevensEmail, "First Comment");
    await questionData.addComment(question_1._id.toString(), comment_1._id.toString());
    await userActivity.addCommentsCreated(comment_1.commenter, comment_1._id.toString());

    console.log(comment_1);
} catch (e) {
    console.log(e);
}

// Comment 2
try {
    comment_2 = await commentData.createComment(user_2.stevensEmail, "Second Comment");
    await questionData.addComment(question_2._id.toString(), comment_2._id.toString());
    await userActivity.addCommentsCreated(comment_2.commenter, comment_2._id.toString());

    console.log(comment_2);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 3 to 10
// ...

// Comment 3
try {
    comment_3 = await commentData.createComment(user_3.stevensEmail, "Third Comment");
    await questionData.addComment(question_3._id.toString(), comment_3._id.toString());
    await userActivity.addCommentsCreated(comment_3.commenter, comment_3._id.toString());

    console.log(comment_3);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 4 to 10
// ...

// Comment 4
try {
    comment_4 = await commentData.createComment(user_4.stevensEmail, "Fourth Comment");
    await questionData.addComment(question_4._id.toString(), comment_4._id.toString());
    await userActivity.addCommentsCreated(comment_4.commenter, comment_4._id.toString());

    console.log(comment_4);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 5 to 10
// ...

// Comment 5
try {
    comment_5 = await commentData.createComment(user_5.stevensEmail, "Fifth Comment");
    await questionData.addComment(question_5._id.toString(), comment_5._id.toString());
    await userActivity.addCommentsCreated(comment_5.commenter, comment_5._id.toString());

    console.log(comment_5);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 6 to 10
// ...

// Comment 6
try {
    comment_6 = await commentData.createComment(user_2.stevensEmail, "Sixth Comment");
    await questionData.addComment(question_6._id.toString(), comment_6._id.toString());
    await userActivity.addCommentsCreated(comment_6.commenter, comment_6._id.toString());

    console.log(comment_6);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 7 to 10
// ...

// Comment 7
try {
    comment_7 = await commentData.createComment(user_3.stevensEmail, "Seventh Comment");
    await questionData.addComment(question_7._id.toString(), comment_7._id.toString());
    await userActivity.addCommentsCreated(comment_7.commenter, comment_7._id.toString());

    console.log(comment_7);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 8 to 10
// ...

// Comment 8
try {
    comment_8 = await commentData.createComment(user_4.stevensEmail, "Eighth Comment");
    await questionData.addComment(question_8._id.toString(), comment_8._id.toString());
    await userActivity.addCommentsCreated(comment_8.commenter, comment_8._id.toString());

    console.log(comment_8);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 9 and 10
// ...

// Comment 9
try {
    comment_9 = await commentData.createComment(user_5.stevensEmail, "Ninth Comment");
    await questionData.addComment(question_9._id.toString(), comment_9._id.toString());
    await userActivity.addCommentsCreated(comment_9.commenter, comment_9._id.toString());

    console.log(comment_9);
} catch (e) {
    console.log(e);
}

// Comment 10
try {
    comment_10 = await commentData.createComment(user_1.stevensEmail, "Tenth Comment");
    await questionData.addComment(question_10._id.toString(), comment_10._id.toString());
    await userActivity.addCommentsCreated(comment_10.commenter, comment_10._id.toString());

    console.log(comment_10);
} catch (e) {
    console.log(e);
}
// Continue the same pattern for Comments 11 to 20
// ...

// Comment 11
try {
    comment_11 = await commentData.createComment(user_2.stevensEmail, "Eleventh Comment");
    await questionData.addComment(question_11._id.toString(), comment_11._id.toString());
    await userActivity.addCommentsCreated(comment_11.commenter, comment_11._id.toString());

    console.log(comment_11);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 12 to 20
// ...

// Comment 12
try {
    comment_12 = await commentData.createComment(user_3.stevensEmail, "Twelfth Comment");
    await questionData.addComment(question_12._id.toString(), comment_12._id.toString());
    await userActivity.addCommentsCreated(comment_12.commenter, comment_12._id.toString());

    console.log(comment_12);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 13 to 20
// ...

// Comment 13
try {
    comment_13 = await commentData.createComment(user_4.stevensEmail, "Thirteenth Comment");
    await questionData.addComment(question_13._id.toString(), comment_13._id.toString());
    await userActivity.addCommentsCreated(comment_13.commenter, comment_13._id.toString());

    console.log(comment_13);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 14 to 20
// ...

// Comment 14
try {
    comment_14 = await commentData.createComment(user_5.stevensEmail, "Fourteenth Comment");
    await questionData.addComment(question_14._id.toString(), comment_14._id.toString());
    await userActivity.addCommentsCreated(comment_14.commenter, comment_14._id.toString());

    console.log(comment_14);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 15 to 20
// ...

// Comment 15
try {
    comment_15 = await commentData.createComment(user_1.stevensEmail, "Fifteenth Comment");
    await questionData.addComment(question_15._id.toString(), comment_15._id.toString());
    await userActivity.addCommentsCreated(comment_15.commenter, comment_15._id.toString());

    console.log(comment_15);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 16 to 20
// ...

// Comment 16
try {
    comment_16 = await commentData.createComment(user_2.stevensEmail, "Sixteenth Comment");
    await questionData.addComment(question_16._id.toString(), comment_16._id.toString());
    await userActivity.addCommentsCreated(comment_16.commenter, comment_16._id.toString());

    console.log(comment_16);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 17 to 20
// ...

// Comment 17
try {
    comment_17 = await commentData.createComment(user_3.stevensEmail, "Seventeenth Comment");
    await questionData.addComment(question_17._id.toString(), comment_17._id.toString());
    await userActivity.addCommentsCreated(comment_17.commenter, comment_17._id.toString());

    console.log(comment_17);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 18 to 20
// ...

// Comment 18
try {
    comment_18 = await commentData.createComment(user_4.stevensEmail, "Eighteenth Comment");
    await questionData.addComment(question_18._id.toString(), comment_18._id.toString());
    await userActivity.addCommentsCreated(comment_18.commenter, comment_18._id.toString());

    console.log(comment_18);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 19 and 20
// ...

// Comment 19
try {
    comment_19 = await commentData.createComment(user_5.stevensEmail, "Nineteenth Comment");
    await questionData.addComment(question_19._id.toString(), comment_19._id.toString());
    await userActivity.addCommentsCreated(comment_19.commenter, comment_19._id.toString());

    console.log(comment_19);
} catch (e) {
    console.log(e);
}

// Comment 20
try {
    comment_20 = await commentData.createComment(user_1.stevensEmail, "Twentieth Comment");
    await questionData.addComment(question_20._id.toString(), comment_20._id.toString());
    await userActivity.addCommentsCreated(comment_20.commenter, comment_20._id.toString());

    console.log(comment_20);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 21 to 30
// ...

// Comment 21
try {
    comment_21 = await commentData.createComment(user_2.stevensEmail, "Twenty-first Comment");
    await questionData.addComment(question_1._id.toString(),
	comment_21._id.toString());
    await userActivity.addCommentsCreated(comment_21.commenter, comment_21._id.toString());

    console.log(comment_21);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 22 to 30
// ...

// Comment 22
try {
    comment_22 = await commentData.createComment(user_3.stevensEmail, "Twenty-second Comment");
    await questionData.addComment(question_2._id.toString(), comment_22._id.toString());
    await userActivity.addCommentsCreated(comment_22.commenter, comment_22._id.toString());

    console.log(comment_22);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 23 to 30
// ...

// Comment 23
try {
    comment_23 = await commentData.createComment(user_4.stevensEmail, "Twenty-third Comment");
    await questionData.addComment(question_3._id.toString(), comment_23._id.toString());
    await userActivity.addCommentsCreated(comment_23.commenter, comment_23._id.toString());

    console.log(comment_23);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 24 to 30
// ...

// Comment 24
try {
    comment_24 = await commentData.createComment(user_5.stevensEmail, "Twenty-fourth Comment");
    await questionData.addComment(question_4._id.toString(), comment_24._id.toString());
    await userActivity.addCommentsCreated(comment_24.commenter, comment_24._id.toString());

    console.log(comment_24);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 25 to 30
// ...

// Comment 25
try {
    comment_25 = await commentData.createComment(user_1.stevensEmail, "Twenty-fifth Comment");
    await questionData.addComment(question_2._id.toString(), comment_25._id.toString());
    await userActivity.addCommentsCreated(comment_25.commenter, comment_25._id.toString());

    console.log(comment_25);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 26 to 30
// ...

// Comment 26
try {
    comment_26 = await commentData.createComment(user_2.stevensEmail, "Twenty-sixth Comment");
    await questionData.addComment(question_2._id.toString(), comment_26._id.toString());
    await userActivity.addCommentsCreated(comment_26.commenter, comment_26._id.toString());

    console.log(comment_26);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 27 to 30
// ...

// Comment 27
try {
    comment_27 = await commentData.createComment(user_3.stevensEmail, "Twenty-seventh Comment");
    await questionData.addComment(question_2._id.toString(), comment_27._id.toString());
    await userActivity.addCommentsCreated(comment_27.commenter, comment_27._id.toString());

    console.log(comment_27);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 28 to 30
// ...

// Comment 28
try {
    comment_28 = await commentData.createComment(user_4.stevensEmail, "Twenty-eighth Comment");
    await questionData.addComment(question_2._id.toString(), comment_28._id.toString());
    await userActivity.addCommentsCreated(comment_28.commenter, comment_28._id.toString());

    console.log(comment_28);
} catch (e) {
    console.log(e);
}

// Continue the same pattern for Comments 29 and 30
// ...

// Comment 29
try {
    comment_29 = await commentData.createComment(user_5.stevensEmail, "Twenty-ninth Comment");
    await questionData.addComment(question_2._id.toString(), comment_29._id.toString());
    await userActivity.addCommentsCreated(comment_29.commenter, comment_29._id.toString());

    console.log(comment_29);
} catch (e) {
    console.log(e);
}

// Comment 30
try {
    comment_30 = await commentData.createComment(user_1.stevensEmail, "Thirtieth Comment");
    await questionData.addComment(question_3._id.toString(), comment_30._id.toString());
    await userActivity.addCommentsCreated(comment_30.commenter, comment_30._id.toString());

    console.log(comment_30);
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
