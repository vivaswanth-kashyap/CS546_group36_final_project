import { comments } from "../config/mongoCollections.js";
import { questions } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';
import * as helpers from "../helpers/commentHelper.js";

// const createComment = async (questionId, commentText) => {
//   commentText = commentText.trim();
//   let createdAt = new Date();

//   let newComment = {
//     questionId,
//     commentText,
//     createdAt,
//     likes: 0,
//     disLikes: 0,
//   };

//   const commentCollection = await comments();

//   const insertInfo = await commentCollection.insertOne(newComment);

//   if (!insertInfo.acknowledged || !insertInfo.insertedId) {
//     throw "Could not add a comment";
//   }

//   const newCommentId = insertInfo.insertedId.toString();
//   const comment = await findComment(newCommentId);
//   return comment;
// };

//new comment done
const createComment = async (commenter, commentText) => {
  commentText = commentText.trim();
  let createdAt = new Date();

  let newComment = {
    replies: [],
    commenter,
    commentText,
    createdAt,
    accepted: false,
    likes: 0,
    disLikes: 0,
  };
  // let newComment ={
  //   commenter,
  //   commentText
  // }
  const commentCollection = await comments();
  // const questionCollection = await questions();
  // const existingInfo = await questionCollection.findOne({
  //   _id: new ObjectId(questionId),
  // });

  // if (!existingInfo) {
  //   throw "no question found with id";
  // }
  // existingInfo.comments.push(newComment);
  // const updationInfo = await questionCollection.findOneAndUpdate(
  //   { _id: new ObjectId(questionId) },
  //   { $set:{comments : existingInfo.comments} },
  //   { returnDocument: "after" }
  // );

  // if (!updationInfo) {
  //   throw "update unsuccessful";
  // }

  // updationInfo._id = updationInfo._id.toString();

  // return updationInfo;

  const insertInfo = await commentCollection.insertOne(newComment);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add a comment";
  }
  const newId = insertInfo.insertedId.toString();
  const comment = await getComment(newId);
  return comment;
};

//get one commentbyId
const getComment = async (commentId) => {
  // const trimmedCommentId = commentId.trim();

  // const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  // if (!objectIdPattern.test(trimmedCommentId)) {
  //   throw new Error('ID is not a valid ObjectId.');
  // }
  //console.log(commentId);
  const commentCollection = await comments();
  const comment = await commentCollection.findOne({ _id: new ObjectId(commentId) });
  if (!comment) {
    throw new Error('No comment exists with that ID.');
  }
  //console.log(comment);
  comment._id = comment._id.toString();
  return comment;
};

//get all comment
const findAllComments = async () => {
  const commentCollection = await comments();
  const commentList = await commentCollection.find({}).toArray();

  if (commentList.length === 0) {
    throw 'There is no comment';
  }
  return commentList;
};

//remove main comment
export const remove = async (commentId) => {
  //Implement Code here
  if (!commentId) throw 'You must provide an id to search for';
  if (typeof commentId !== 'string') throw 'Id must be a string';
  if (commentId.trim().length === 0) throw 'id cannot be an empty string or just spaces';
  const id = commentId.trim();
  if (!ObjectId.isValid(id))
    throw new Error('Invalid ObjectId');
  const commentS = await comments();
  const deletionInfo = await commentS.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deletionInfo) {
    throw `No event exist with the give eventid ${eventId}`
  }
  // if (!deletionInfo) {
  //   throw `Could not delete event with id of ${id}`;
  // }
  return { deleted: true };
};

//remove replay comment 



const removeComment = async (replyId) => {
  if (!ObjectId.isValid(replyId)) {
    throw 'Invalid Id';
  }
  const commentC = await comments();
  const commentList = await commentC.find({}).toArray();
  let comment = null;
  for (let i of commentList) {
    if (i.comments && i.comments._id.toString() === replyId) {
      comment = i;
      break;
    }
  }
  if (comment === null) {
    // Return null if comment is not found
    return null;
  }
  delete comment.comments;
  const commentS = await comments();
  const updatedcomment = await commentS.findOneAndUpdate(
    { 'comments._id': new ObjectId(replyId) },
    { $unset: { 'comments.$': 1 } },
    { returnDocument: 'after' }
  );
  if (!updatedcomment) {
    throw `No comment`;
  }
  return updatedcomment;
};



//TODO - edit comment commentText remain null 
const editComment = async (commentId, commenter, commentText) => {
  if (!commentId) {
    throw new Error('Comment ID is required.');
  }
  if (!ObjectId.isValid(commentId)) {
    throw new Error('Invalid Comment ID.');
  }
  const originalComment = await getComment(commentId);
  if (!originalComment) {
    throw new Error(`Comment not found with ID: ${commentId}`);
  }
  let createdAt = new Date();
  const updateInfo = {
    commenter,
    commentText,
    createdAt,
  };
  const commentCollection = await comments();
  const updatedComment = await commentCollection.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    { $set: updateInfo },
    { returnDocument: 'after' }
  );
  if (!updatedComment) {
    throw new Error(`Error: Update failed! Could not update comment with ID: ${commentId}`);
  }
  return updatedComment;
};

//replay comment done 
const createReply = async (commentId, commenter, replyText) => {
  try {
    const commentCollection = await comments();
    const updatedComment = await commentCollection.findOneAndUpdate(
      { _id: new ObjectId(commentId) },
      {
        $push: {
          replies: {
            _id: new ObjectId(),
            commenter: commenter,
            replyText: replyText.trim(),
            createdAt: new Date(),
            likes: 0,
            disLikes: 0,
          },
        },
      },
      { returnDocument: 'after' }
    );

    if (!updatedComment) {
      throw new Error('Comment not found');
    }
    return updatedComment;
  } catch (error) {
    throw new Error('Failed to create reply: ' + error.message);
  }
};



const upVoteComment = async (commentId) => {
  commentId = helpers.checkId(commentId);
  const commentCollection = await comments();

  const comment = await commentCollection.findOne({
    _id: new ObjectId(commentId),
  });

  comment.likes += 1;

  const updateInfo = await commentCollection.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    { $set: { likes: comment.likes } },
    { returnDocument: "after" }
  );

  return updateInfo;
};

const downVoteComment = async (commentId) => {
  commentId = helpers.checkId(commentId);
  const commentCollection = await comments();

  const comment = await commentCollection.findOne({
    _id: new ObjectId(commentId),
  });

  comment.disLikes -= 1;

  const updateInfo = await commentCollection.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    { $set: { disLikes: comment.disLikes } },
    { returnDocument: "after" }
  );

  return updateInfo;
};

const toggleAccepted = async(commentId) =>
{
  commentId = helpers.checkId(commentId);

  let comment = await getComment(commentId);
  if (comment.accepted == true) comment.accepted = false;
  else comment.accepted = true;

  // Toggle
  const commentCollection = await comments();
  const updateInfo = await commentCollection.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    { $set: { accepted: comment.accepted } },
    { returnDocument: "after" }
  );
  
  return updateInfo;
}


export { createComment, findAllComments, removeComment, editComment, createReply, upVoteComment, downVoteComment,getComment, toggleAccepted}