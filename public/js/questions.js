document.addEventListener("DOMContentLoaded", () => {
	const votes = document.getElementById("votes");
	const thumb_up = document.getElementById("thumb_up");
	const thumb_down = document.getElementById("thumb_down");
	const editQuestion = document.getElementById("editQuestion");
	const deleteQuestion = document.getElementById("deleteQuestion");
	if (thumb_up) {
		thumb_up.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("upvote clicked");
			handleUpVote();
			let tempVotes = parseInt(votes.textContent);
			tempVotes += 1;
			votes.textContent = tempVotes;
			thumb_up.classList.add("selected");
		});
	}

	if (thumb_down) {
		thumb_down.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("downvote clicked");
			handleDownVote();
			let tempVotes = parseInt(votes.textContent);
			tempVotes -= 1;
			votes.textContent = tempVotes;
		});
	}

	if (editQuestion) {
		editQuestion.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("edit fired");
			handleEdit();
		});
	}

	if (deleteQuestion) {
		deleteQuestion.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("delete fired");
			handleDelete();
		});
	}
});

const handleUpVote = async () => {
	let id = document.getElementById("questionId").value;
	try {
		let res = await axios.patch("/questions/question", { id: id, key: "up" });

		//console.log(return res.data);
	} catch (e) {
		if (e.response) {
			console.log(e.response.data);
			console.log(e.response.status);
			console.log(e.response.headers);
		} else if (e.request) {
			console.log(e.request);
		} else {
			console.log("Error", e.message);
		}
	}
};

const handleDownVote = async () => {
	let id = document.getElementById("questionId").value;
	try {
		let res = await axios.patch("/questions/question", {
			id: id,
			key: "down",
		});
		//console.log(return res.data);
	} catch (e) {
		console.log(e);
	}
};

const handleEdit = () => {
	let id = document.getElementById("questionId").value;
	window.location.href = `/questions/question/edit/${id}`;
};

const handleDelete = async () => {
	try {
		let id = document.getElementById("questionId").value;
		let res = await axios.delete(`/questions/${id}`);
		if (res.ok) {
			window.location.href = "/questions/";
		} else {
			console.error("Error deleting question");
		}
	} catch (e) {}
};
