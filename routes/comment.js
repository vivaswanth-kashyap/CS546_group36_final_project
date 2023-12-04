import express from 'express';
import * as commentData from '../data/comment.js';
import * as helper from '../helpers.js';
import { ObjectId } from 'mongodb';
import { comments } from '../config/mongoCollections.js';

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
    if (!input || Object.keys(input).length === 0) {
      return res.status(400).json({
        error: "Enter valid data",
      });
    }
    if (!helper.isValidComment(input.commenter, input.commentText)) {
      return res.status(400).json({
        error: "Invalid comment data",
      });
    }
    const comment = await commentData.createComment(
      input.commenter,
      input.commentText
    );
    //console.log(comment);
    return res.status(200).json(comment);
    // res.redirect(`/questions/${comment._id}`);
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





//like dislike
router.patch('/comment/:commentId', async (req, res) => {
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


export default router;

