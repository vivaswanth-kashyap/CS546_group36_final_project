import express from 'express';
import * as commentData from '../data/comment.js';
import * as questionData from '../data/questions.js';
import * as helper from '../helpers/commentHelper.js';
import { ObjectId } from 'mongodb';
import { comments } from '../config/mongoCollections.js';
import xss from 'xss';
import * as userActivity from "../data/userActivity.js";

const router = express.Router();

//homepage
router.get('/', async (req, res) => {
  try {
    const comments = await commentData.findAllComments();
    if (!comments || comments.length === 0) {
      return res.render('home', {
        title: 'Homepage',
        comments: [],
        errorMessage: 'No comments found'
      });
    }
    res.render('home', {
      title: 'Homepage',
      comments: comments
    });
  } catch (err) {
    console.error(err);
    res.render('home', {
      title: 'Homepage',
      comments: [],
      errorMessage: 'Failed to retrieve comments'
    });
  }
});

router.route('/comment').get(async (req, res) => {
  res.render("newComment", {
    title: "Add a Comment",
  });
  console.log("route fired");
});

// post new comment
router.post('/comment', async (req, res) => {
  try {
    const input = req.body;
    console.log(`${input} this ------------`);
    if (!input || Object.keys(input).length === 0) {
      return res.status(400).json({
        error: "Enter valid data",
      });
    }
    if (!helper.isValidComment(input.user, input.commentText)) {
      return res.status(400).json({
        error: "Invalid comment data",
      });
    }
    const comment = await commentData.createComment(
      input.user,
      input.commentText
    );
    const question = await questionData.addComment(
      input.questionId,
      comment._id,
    )

    await userActivity.addCommentsCreated(comment.commenter, comment._id);
    
    res.redirect(`/questions/${question._id}`);
  } catch (e) {
    res.status(500).json({
      error: e.message || "Failed to create a new comment",
    });
  }
});

//replay comment
router.post('/comment/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const { commenter, replyText } = req.body;
    if (!commenter || !replyText) {
      return res.status(400).json({ error: 'Username and reply text are required' });
    }
    const replyComment = await commentData.createReply(commentId, commenter, replyText);
    res.json(replyComment);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to reply to the comment' });
  }
});

//remove main comment
router.delete('/comment/:commentId', async (req, res) => {
  try {
    req.params.commentId = helper.validateString(req.params.commentId);
  } catch (e) {
    return res.status(400).send(e);
  }
  if (!ObjectId.isValid(req.params.commentId)) {
    return res.status(400).send("Invalid Comment ID");
  }
  try {
    const deletedComment = await commentData.remove(req.params.commentId);
    if (deletedComment === null) {
      return res.status(404).send('Comment not found');
    }
    return res.status(200).json(deletedComment);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// reomove nested comment
router.delete('/comment/:commentId/:replyId', async (req, res) => {
  try {
    req.params.replyId = helper.validateString(req.params.replyId);
  } catch (e) {
    return res.status(400).send(e);
  }
  if (!ObjectId.isValid(req.params.replyId)) {
    return res.status(400).send("Invalid Reply ID");
  }
  try {
    const deletedComment = await commentData.removeComment(req.params.commentId, req.params.replyId);
    if (deletedComment === null) {
      return res.status(404).send('Comment not found');
    }
    return res.status(200).json(deletedComment);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});


// Edit comment
router.put('/comment/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  const { commenter, commentText } = req.body;

  try {
    if (!commentId) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }
    const updatedComment = await commentData.editComment(commentId, commenter, commentText);
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update the comment' });
  }
});

router.patch('/like', async(req,res) =>{
  try{
    const commentId = req.body.commentId;
    const comment = await commentData.upVoteComment(commentId);
  
  }catch (e) {
    res.status(400).json({ error: e.message });
  }
});



//like dislike
router.post('/comment/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const event = req.body.event;
    const updatedComment = event === 'up' ? await commentData.upVoteComment(commentId) : await commentData.downVoteComment(commentId);
    res.render("comment", {
      title: "Comment Details",
      comment: updatedComment,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//like and dislike replay comment 
router.patch('/comment/:commentId/:replyId', async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const event = req.body.event;
    const updatedComment = event === 'up' ? await commentData.upVoteComment(replyId) : await commentData.downVoteComment(replyId);
    res.render("comment", {
      title: "Comment Details",
      comment: updatedComment,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//make this for question to get comment
router.route('/:id').get(async (req, res) => {
  try {
    let commentId = req.params.id;
    commentId = helper.checkId(commentId);
    const comment = await commentData.findComment(commentId);

    res.render("comment", {
      title: comment.title,
      comment: comment,
    });
  } catch (e) {
    res.render("comment", {
      title: "Error",
      message: e.message,
    });
  }
});


// Ajax routes
router.route("/api/commentAccepted/:id").post(async (req, res) => 
{
	// Check if User is logged in
  let commentId = xss(req.body.commentId);
  let questionId = xss(req.params.id);
  console.log(questionId);
	if (req.session.user)
	{
		try
		{
      if (!commentId)
      {
        return res.redirect(`/questions/${questionId}`);
      }
			let accepted = await commentData.toggleAccepted(commentId);
			return res.redirect(`/questions/${questionId}`);

		} catch (e)
		{
			return res.status(500).render("error", { title: "Error", error: e });
		}
	}
	else
	{
		return res.redirect("/login");
	}

});

export default router;