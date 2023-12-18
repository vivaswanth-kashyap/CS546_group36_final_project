let commentContainer = document.getElementById("comment-container");


document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const textInput = commentForm.querySelector('input[name="text"]');
        const parentIdInput = commentForm.querySelector('input[name="parentId"]');

        const text = textInput.value;
        const parentId = parentIdInput.value;

        const response = await fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, parentId }),
        });

        const data = await response.json();
        //console.log(data);
    });
});

function createComment(text) {
    let div = document.createElement("div");
    div.classList.add("all-comment");

    div.innerHTML = `
    <div class="card">
      <span class="text">${text}</span>
      <span class="reply">Reply</span>
      <span class="edit">Edit</span>
      <span class="delete">Delete</span>
    </div>`;

    return div;
}

function createInputBox(isEditing) {
    let div = document.createElement("div");
    div.classList.add("comment-details");

    div.innerHTML = `
    <input type="text" placeholder="${isEditing ? 'Edit comment' : 'Add reply'}" class="edit-input" />
    <button class="btn ${isEditing ? 'edit' : 'submit'}">${isEditing ? 'Edit' : 'Submit'}</button>`;

    return div;
}

commentContainer.addEventListener("click", function (e) {
    let replyClicked = e.target.classList.contains("reply");
    let editClicked = e.target.classList.contains("edit");
    let deleteClicked = e.target.classList.contains("delete");
    let submitClicked = e.target.classList.contains("submit");
    let addCommentClicked = e.target.classList.contains("add-comment");

    let closestCard = e.target.closest(".card");

    if (addCommentClicked) {
        const commentDetails = e.target.closest(".comment-details");
        const newText = commentDetails.querySelector(".edit-input").value;

        if (newText) {
            commentContainer.appendChild(createComment(newText));
            commentDetails.querySelector(".edit-input").value = "";
        }
    }


    if (replyClicked) {
        closestCard.appendChild(createInputBox(false));
    }

    if (editClicked) {
        const commentText = closestCard.querySelector(".text");
        const existingReplies = closestCard.querySelectorAll(".all-comment");
        const editInputBox = createInputBox(true);
        editInputBox.querySelector(".edit-input").value = commentText.innerText;
        existingReplies.forEach(reply => {
            const replyText = reply.querySelector(".text").innerText;
            editInputBox.appendChild(createComment(replyText));
        });

        closestCard.innerHTML = "";
        closestCard.appendChild(editInputBox);

        const submitButton = editInputBox.querySelector(".btn.edit");
        submitButton.addEventListener("click", function () {
            const newText = editInputBox.querySelector(".edit-input").value;
            if (newText) {
                commentText.innerText = newText;
            }

            closestCard.innerHTML = "";

            closestCard.appendChild(commentText);

            existingReplies.forEach(reply => {
                const replyText = reply.querySelector(".text").innerText;
                closestCard.appendChild(createComment(replyText));
            });

            closestCard.innerHTML += `
                <span class="reply">Reply</span>
                <span class="edit">Edit</span>
                <span class="delete">Delete</span>`;
        });
    }

    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async event => {
            const commentId = event.target.getAttribute('data-comment-id');
            try {
                const response = await fetch(`/comments/comment/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the comment');
                }
                event.target.closest('.comment-item').remove();
            } catch (error) {
                // Handle error response
                //console.error(error);
            }
        });
    });

    if (submitClicked) {
        const commentDetails = e.target.closest(".comment-details");
        const newText = commentDetails.querySelector(".edit-input").value;

        if (newText) {
            if (closestCard.classList.contains("all-comment")) {
                closestCard.querySelector(".text").innerText = newText;
            } else {
                closestCard.appendChild(createComment(newText));
            }
            commentDetails.remove();
        }
    }
});