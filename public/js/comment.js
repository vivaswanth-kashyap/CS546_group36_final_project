document.addEventListener("DOMContentLoaded", () => {
    const votes = document.getElementById("votes");
    const thumb_up = document.getElementById("thumb_up");
    if (thumb_up) {
        thumb_up.addEventListener("click", async (e) => {
            e.preventDefault();
            //console.log("Upvote clicked");
            await handleUpVote();
            let tempVotes = parseInt(votes.textContent);
            tempVotes += 1;
            votes.textContent = tempVotes;
            thumb_up.classList.add("selected");
        });
    }

    const thumb_down = document.getElementById("thumb_down");
    if (thumb_down) {
        thumb_down.addEventListener("click", async (e) => {
            e.preventDefault();
            //console.log("Downvote clicked");
            await handleDownVote();
            let tempVotes = parseInt(votes.textContent);
            tempVotes -= 1;
            votes.textContent = tempVotes;
        });
    }
});

const handleUpVote = async () => {
    let commentId = document.getElementById("commentId").value;
    try {
        let res = await axios.patch("/comments/comment", { id: commentId, event: "up" });
        //console.log(res.data);
    } catch (e) {
        if (e.response) {
            // console.log(e.response.data);
            // console.log(e.response.status);
            // console.log(e.response.headers);
        } else if (e.request) {
            // console.log(e.request);
        } else {
            // console.log("Error", e.message);
        }
    }
};

const handleDownVote = async () => {
    let commentId = document.getElementById("commentId").value;
    try {
        let res = await axios.patch("/comments/comment", { id: commentId, event: "down" });
        console.log(res.data);
    } catch (e) {
        console.log(e);
    }
};



// document.addEventListener('DOMContentLoaded', async () => {
//     const commentsSection = document.getElementById('commentsSection');

//     try {
//         const response = await axios.get('/comments');

//         if (response.status === 200) {
//             const comments = response.data.comments;

//             comments.forEach(comment => {
//                 const commentDiv = document.createElement('div');
//                 commentDiv.classList.add('comment');
//                 commentDiv.innerHTML = `
//                     <h3>${comment.commenter}</h3>
//                     <p>${comment.commentText}</p>
//                     <!-- Other comment details/buttons -->
//                 `;
//                 commentsSection.appendChild(commentDiv);
//             });
//         } else {
//             console.error('Failed to fetch comments.');
//         }
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }

//     document.getElementById('commentForm').addEventListener('submit', async (event) => {
//         event.preventDefault();

//         // Your code to handle form submission and adding comments...
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('commentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const commenter = document.getElementById('commenter').value;
        const commentText = document.getElementById('commentText').value;

        try {
            const response = await fetch('/comments/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commenter, commentText })
            });

            if (response.ok) {
                const newComment = await response.json();

                const commentsSection = document.getElementById('commentsSection');
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <h3>${newComment.commenter}</h3>
                    <p>${newComment.commentText}</p>
                    <button class="reply-btn">Reply</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-comment-btn">Delete</button>
                `;

                commentsSection.insertBefore(commentDiv, commentsSection.firstChild);

                // Clear the form after successful submission
                document.getElementById('commenter').value = '';
                document.getElementById('commentText').value = '';
            } else {
                console.error('Failed to add comment.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    });
});
$(document).ready(function () {
    $('#commentForm').submit(async function (event) {
        event.preventDefault();

        const commenter = $('#commenter').val();
        const commentText = $('#commentText').val();

        try {
            const response = await $.ajax({
                url: '/comments/comment',
                method: 'POST',
                data: { commenter, commentText },
                dataType: 'json'
            });

            if (response.success) {
                $('#commentsSection').prepend(`
                    <div class="comment">
                        <h3>${response.data.commenter}</h3>
                        <p>${response.data.commentText}</p>
                        <button class="reply-btn">Reply</button>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-comment-btn">Delete</button>
                    </div>
                `);
                $('#commenter').val('');
                $('#commentText').val('');
            } else {
                console.error('Failed to add comment:', response.error);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    });
});


















// let commentContainer = document.getElementById("new-comment");
// document.addEventListener('DOMContentLoaded', () => {
//     const commentForm = document.getElementById('commentForm');

//     commentForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const textInput = commentForm.querySelector('input[name="text"]');
//         const parentIdInput = commentForm.querySelector('input[name="parentId"]');
//         const text = textInput.value;
//         const parentId = parentIdInput.value;
//         const response = await fetch('/comments', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text, parentId }),
//         });
//         const data = await response.json();
//         console.log(data);
//     });
// });

// function createComment(text) {
//     let div = document.createElement("div");
//     div.classList.add("all-comment");
//     div.innerHTML = `
//     <div class="card">
//       <span class="text">${text}</span>
//       <span class="reply">Reply</span>
//       <span class="edit">Edit</span>
//       <span class="delete">Delete</span>
//     </div>`;
//     return div;
// }

// function createInputBox(isEditing) {
//     let div = document.createElement("div");
//     div.classList.add("comment-details");
//     div.innerHTML = `
//     <input type="text" placeholder="${isEditing ? 'Edit comment' : 'Add reply'}" class="edit-input" />
//     <button class="btn ${isEditing ? 'edit' : 'submit'}">${isEditing ? 'Edit' : 'Submit'}</button>`;
//     return div;
// }

// commentContainer.addEventListener("click", function (e) {
//     let replyClicked = e.target.classList.contains("reply");
//     let editClicked = e.target.classList.contains("edit");
//     let deleteClicked = e.target.classList.contains("delete");
//     let submitClicked = e.target.classList.contains("submit");
//     let addCommentClicked = e.target.classList.contains("add-comment");
//     let closestCard = e.target.closest(".card");
//     if (addCommentClicked) {
//         const commentDetails = e.target.closest(".comment-details");
//         const newText = commentDetails.querySelector(".edit-input").value;
//         if (newText) {
//             commentContainer.appendChild(createComment(newText));
//             commentDetails.querySelector(".edit-input").value = "";
//         }
//     }


//     if (replyClicked) {
//         closestCard.appendChild(createInputBox(false));
//     }
//     if (editClicked) {
//         const commentText = closestCard.querySelector(".text");
//         const existingReplies = closestCard.querySelectorAll(".all-comment");
//         const editInputBox = createInputBox(true);
//         editInputBox.querySelector(".edit-input").value = commentText.innerText;
//         existingReplies.forEach(reply => {
//             const replyText = reply.querySelector(".text").innerText;
//             editInputBox.appendChild(createComment(replyText));
//         });

//         closestCard.innerHTML = "";
//         closestCard.appendChild(editInputBox);
//         const submitButton = editInputBox.querySelector(".btn.edit");
//         submitButton.addEventListener("click", function () {
//             const newText = editInputBox.querySelector(".edit-input").value;
//             if (newText) {
//                 commentText.innerText = newText;
//             }

//             closestCard.innerHTML = "";

//             closestCard.appendChild(commentText);

//             existingReplies.forEach(reply => {
//                 const replyText = reply.querySelector(".text").innerText;
//                 closestCard.appendChild(createComment(replyText));
//             });

//             closestCard.innerHTML += `
//                 <span class="reply">Reply</span>
//                 <span class="edit">Edit</span>
//                 <span class="delete">Delete</span>`;
//         });
//     }

//     if (deleteClicked) {
//         closestCard.closest(".all-comment").remove();
//     }

//     if (submitClicked) {
//         const commentDetails = e.target.closest(".comment-details");
//         const newText = commentDetails.querySelector(".edit-input").value;

//         if (newText) {
//             if (closestCard.classList.contains("all-comment")) {
//                 closestCard.querySelector(".text").innerText = newText;
//             } else {
//                 closestCard.appendChild(createComment(newText));
//             }
//             commentDetails.remove();
//         }
//     }
// });