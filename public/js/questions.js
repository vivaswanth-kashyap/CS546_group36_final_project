document.addEventListener("DOMContentLoaded", () => {
	const votes = document.getElementById("votes");
	const thumb_up = document.getElementById("thumb_up");
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

	const thumb_down = document.getElementById("thumb_down");
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
});

const handleUpVote = async () => {
	let id = document.getElementById("questionId").value;
	try {
		let res = await axios.patch("/questions/question", { id: id, event: "up" });

		console.log(res.data);
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
			event: "down",
		});
		console.log(res.data);
	} catch (e) {
		console.log(e);
	}
};
