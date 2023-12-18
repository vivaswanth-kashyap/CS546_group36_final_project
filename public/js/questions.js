document.addEventListener("DOMContentLoaded", async () => {
	const search = document.getElementById("search");
	const votes = document.getElementById("votes");
	const thumb_up = document.getElementById("thumb_up");
	const thumb_down = document.getElementById("thumb_down");
	const bookmark = document.getElementById("bookmark");

	const editQuestion = document.getElementById("editQuestion");
	const deleteQuestion = document.getElementById("deleteQuestion");
	//question creation validation
	const newQuestionForm = document.getElementById("createQuestionForm");
	const titleInput = document.getElementById("questionTitle");
	const titleError = document.getElementById("titleError");
	const problemDetailsInput = document.getElementById("problemDetails");
	const problemDetailsError = document.getElementById("problemDetailsError");
	const attemptDetailsInput = document.getElementById("attemptDetails");
	const attemptDetailsError = document.getElementById("attemptDetailsError");
	const tagsInput = document.getElementById("tags");
	const tagsError = document.getElementById("tagsError");

	if (newQuestionForm) {
		newQuestionForm.addEventListener("submit", function (event) {
			let valid = true;
			titleError.textContent = "";
			problemDetailsError.textContent = "";
			attemptDetailsError.textContent = "";
			tagsError.textContent = "";

			if (titleInput.value.trim().length === 0) {
				titleError.textContent = "Title shouldn't be empty";
				valid = false;
			}

			if (problemDetailsInput.value.trim().length < 20) {
				problemDetailsError.textContent =
					"Problem Details should be at least 20 characters long.";
				valid = false;
			}

			if (attemptDetailsInput.value.trim().length < 20) {
				attemptDetailsError.textContent =
					"Attempt Details should be at least 20 characters long.";
				valid = false;
			}

			if (tagsInput.value.trim().length === 0) {
				tagsError.textContent = "Please add at least one tag.";
				valid = false;
			}

			if (!valid) {
				event.preventDefault();
			}
		});
	}

	//other events

	//votes
	if (thumb_up) {
		thumb_up.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("upvote clicked");
			handleVote("up");
			// handleUpVote();
			// let tempVotes = parseInt(votes.textContent);
			// tempVotes += 1;
			// votes.textContent = tempVotes;
			// thumb_up.classList.add("selected");
			// thumb_down.classList.remove("selected");
		});
	}

	if (thumb_down) {
		thumb_down.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("downvote clicked");
			handleVote("down");
			// handleDownVote();
			// let tempVotes = parseInt(votes.textContent);
			// tempVotes -= 1;
			// votes.textContent = tempVotes;
			// thumb_down.classList.add("selected");
			// thumb_up.classList.remove("selected");
		});
	}

	//likes initialization
	if (thumb_down || thumb_up) {
		let questionId = document.getElementById("questionId").value;
		let user = document.getElementById("user");
		console.log(user);
		try {
			if (user) {
				const voteStatus = await axios.get("/questionVotes", {
					params: { questionId: questionId },
				});
				console.group("votes");
				console.log(voteStatus);
				if (voteStatus.status === 200 && voteStatus.data) {
					updateVoteUI(voteStatus.data.voteType);
				}
			}
		} catch (error) {
			console.error(
				"Error while fetching initial vote status:",
				error.response.data
			);
		}
	}

	//saving question
	if (bookmark) {
		bookmark.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("save clicked");
			bookmark.classList.add("selected");
		});
	}

	//filtering questions based on condition
	document.addEventListener("click", function (e) {
		if (e.target && e.target.id === "flash_on") {
			e.preventDefault();
			console.log("filter latest fired");
			handleSortLatest();
		} else if (e.target && e.target.id === "mode_heat") {
			e.preventDefault();
			console.log("filter top fired");
			handleTopSort();
		}
	});

	//editing question
	if (editQuestion) {
		editQuestion.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("edit fired");
			handleEdit();
		});
	}

	//deleting question
	if (deleteQuestion) {
		deleteQuestion.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("delete fired");
			handleDelete();
		});
	}

	//search function
	if (search) {
		search.addEventListener("input", (e) => {
			e.preventDefault();
			console.log(e.target.value);
			console.log("search fired");
			handleSearch(e.target.value);
		});
		search.addEventListener("keyup", (e) => {
			e.preventDefault();
			console.log(e.target.value);
			console.log("key up");
			handleKeyUp();
		});
	}
});

const handleUpVote = async () => {
	let id = document.getElementById("questionId").value;
	try {
		let res = await axios.patch("/questions/question", { id: id, key: "up" });
		window.location.reload();
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
		window.location.reload();
		//console.log(return res.data);
	} catch (e) {
		console.log(e);
	}
};

const handleVote = async (voteType) => {
	console.log("inside handleVote");
	let questionId = document.getElementById("questionId").value;
	let user = document.getElementById("user").textContent;
	if (user) {
		try {
			let voteStatus = await axios.get("/questionVotes", {
				params: { questionId: questionId },
			});

			window.location.reload();
			let hasVoted = voteStatus.status === 200 && voteStatus.data;

			if (!hasVoted) {
				await axios.post("/questionVotes", {
					questionId: questionId,
					voteType: voteType,
				});

				if (voteType == "up") {
					let tempVotes = parseInt(votes.textContent);
					// tempVotes += 1;
					votes.textContent = tempVotes;
					handleUpVote();
					window.location.reload();
				}
				if (voteType == "down") {
					let tempVotes = parseInt(votes.textContent);
					// tempVotes -= 1;
					votes.textContent = tempVotes;
					handleDownVote();
					window.location.reload();
				}
			} else if (hasVoted && voteStatus.data.voteType == voteType) {
				console.log("removing vote");
				console.warn(questionId);
				await axios.delete("/questionVotes", {
					params: { questionId: questionId, voteType: voteType },
				});
				console.log(voteType);
				if (voteType == "up") {
					console.log(thumb_up.classList);
					document.getElementById("thumb_up").classList.remove("selected");
					window.location.reload();
				} else if (voteType == "down") {
					console.log(thumb_down.classList);
					document.getElementById("thumb_down").classList.remove("selected");
					window.location.reload();
				}
			} else if (hasVoted && voteStatus.data.voteType !== voteType) {
				console.log("trying patch");
				await axios.patch("/questionVotes", {
					questionId: questionId,
					voteType: voteType,
				});
				if (voteType == "up") {
					let tempVotes = parseInt(votes.textContent);
					// tempVotes += 2;
					votes.textContent = tempVotes;
					handleUpVote();
					window.location.reload();
				}
				if (voteType == "down") {
					let tempVotes = parseInt(votes.textContent);
					// tempVotes -= 2;
					votes.textContent = tempVotes;
					handleDownVote();
					window.location.reload();
				}
			}

			updateVoteUI(voteType);
		} catch (error) {
			console.error("Error while fetching vote status:", error.response.data);
		}
	}
};

const updateVoteUI = (voteType) => {
	console.log("inside updateVoteUI", voteType);
	document
		.getElementById("thumb_up")
		.classList.toggle("selected", voteType === "up");
	document
		.getElementById("thumb_down")
		.classList.toggle("selected", voteType === "down");
};

const handleEdit = () => {
	let id = document.getElementById("questionId").value;
	window.location.href = `/questions/question/edit/${id}`;
};

const handleDelete = async () => {
	try {
		console.log("inside handle delete");
		let id = document.getElementById("questionId").value;
		let res = await axios.delete(`/questions/${id}`);
		console.log(res);
		if (res.status == 200) {
			window.location.href = "/questions";
		} else {
			console.error("Error deleting question");
		}
	} catch (e) {
		console.log(e.message);
	}
};

const handleSearch = async (searchTerm) => {
	console.log("Search term:", searchTerm);
	if (!searchTerm.trim()) {
		console.log("Empty search term, clearing results");
		displaySearchResults([]);
		return;
	}
	try {
		console.log("inside handleSearch");
		let res = await axios.get(
			`/questions/search/${encodeURIComponent(searchTerm)}`
		);
		console.log(res);
		console.log("Response data:", res.data);
		if (res.status == 200) {
			res.data.forEach((result) => {
				result.tagsObj = result.tagsObj.map((obj) => obj.tag);
			});
			displaySearchResults(res.data);
		}
	} catch (e) {
		e.message;
	}
};

const displaySearchResults = (results) => {
	console.log("Rendering results:", results);
	const container = document.getElementById("searchResultsContainer");
	container.innerHTML = "";
	container.hidden = false;

	if (results.length === 0) {
		container.innerHTML = "<p>No results found.</p>";
		return;
	}

	document.getElementById("questionsWrapper1").hidden = true;

	results.forEach((result) => {
		console.log(result);
		const questionDiv = document.createElement("div");
		questionDiv.classList.add(
			"questionWrapper1",
			"flex",
			"flex-row",
			"border-b-2",
			"px-2"
		);
		const questionStatsDiv = document.createElement("div");
		questionStatsDiv.classList.add(
			"questionStats",
			"my-4",
			"ml-8",
			"whitespace-normal",
			"basis-1/3"
		);
		questionStatsDiv.innerHTML = `
            <h4 class="pl-5 text-sm text-normal"><span class="ml-6">${result.votes} votes</span></h4>
            <h4 class="pl-5 text-sm text-extralight text-slate-500"><span class="ml-1">${result.comments.length} answers</span></h4>`;
		const questionDetailsDiv = document.createElement("div");
		questionDetailsDiv.classList.add(
			"question",
			"basis-2/3",
			"my-4",
			"w-fit",
			"ml-5",
			"h-auto",
			"whitespace-normal",
			"text-ellipsis",
			"overflow-hidden"
		);
		questionDetailsDiv.innerHTML = `
            <h3 class="text-sky-600 text-lg font-semibold hover:text-sky-700"><a href="/questions/${
							result._id
						}">${result.title}</a></h3>
            <p class="text-slate-500 py-6 my-2 text-ellipsis overflow-hidden max-h-36">${
							result.problemDetails
						}</p>
            <div>${result.tagsObj
							.map(
								(tag) =>
									`<button class="tags rounded-md border-slate-900 outline-0 px-2 py-1 my-1 bg-sky-100 text-sky-600 text-sm font-semibold hover:bg-sky-200">${tag}</button>`
							)
							.join(" ")}</div>`;
		questionDiv.appendChild(questionStatsDiv);
		questionDiv.appendChild(questionDetailsDiv);
		container.appendChild(questionDiv);
	});
};

const handleKeyUp = () => {
	const searchInput = document.getElementById("search");
	const questionsWrapper = document.getElementById("questionsWrapper1");

	if (searchInput && questionsWrapper) {
		if (searchInput.value === "") {
			questionsWrapper.hidden = false;
			const container = document.getElementById("searchResultsContainer");
			container.hidden = true;
		}
	}
};
const handleTopSort = async () => {
	console.log("inside handleTopSort");
	try {
		let res = await axios.get("/questions/?key=top");
		if (res.status === 200) {
			document.querySelector(".bg-stone-50").innerHTML = res.data;
		}
	} catch (e) {
		console.log(e);
	}
};

const handleSortLatest = async () => {
	console.log("inside handleSortLatest");
	try {
		let res = await axios.get("/questions/?key=latest");
		if (res.status === 200) {
			document.querySelector(".bg-stone-50").innerHTML = res.data;
		}
	} catch (e) {
		console.error("Error fetching latest questions:", e);
	}
};

const handleLike = async () => {
	// let id = document.getElementById("questionId").value;
	// try {
	// 	let res = await axios.patch("/questions/question", { id: id, key: "up" });

	// 	//console.log(return res.data);
	// } catch (e) {
	// 	if (e.response) {
	// 		console.log(e.response.data);
	// 		console.log(e.response.status);
	// 		console.log(e.response.headers);
	// 	} else if (e.request) {
	// 		console.log(e.request);
	// 	} else {
	// 		console.log("Error", e.message);
	// 	}
	// }
	console.log("in handle like");
};

const handleDislike = async () => {
	// let id = document.getElementById("questionId").value;
	// try {
	// 	let res = await axios.patch("/questions/question", {
	// 		id: id,
	// 		key: "down",
	// 	});
	// 	//console.log(return res.data);
	// } catch (e) {
	// 	console.log(e);
	// }
	console.log("in handle dislike");
};
// Ajax Requests
$(document).ready(function () {
	let questionId = window.location.href;
	questionId = questionId.split("questions/")[1];
	var userEmail = $("#user").text();
			
	if (questionId && userEmail) {
		// Check if user has already saved this
		let saved = false;
		$.ajax({
			url: "http://localhost:3000/questions/api/questionsSaved",
			method: "GET",
			dataType: "json",
			success: function (response) {
				response.forEach(function (item) {
					console.log(item.toString() == questionId.toString());
					if (item.toString() == questionId.toString()) saved = true;
				});
				if (saved) {
					$("#bookmark").css("color", "red");
					// Add a listener if the user has saved it
					// deleteQuestionsSaved
					$("#bookmark").click(function () {
						$("#bookmark").css("color", "black");
						// Perform AJAX request
						$.ajax({
							url: "http://localhost:3000/questions/api/deleteQuestionsSaved",
							method: "POST",
							dataType: "json",
							data: { questionId: questionId },
							success: function (response) {
								console.log("success");
							},
							error: function () {
								alert("Error fetching data");
							},
						});
						location.reload();
					});
				} else {
					// Add a listener only if the user has not saved it
					// questionsSaved
					$("#bookmark").click(function () {
						$("#bookmark").css("color", "red");
						// Perform AJAX request
						$.ajax({
							url: "http://localhost:3000/questions/api/questionsSaved",
							method: "POST",
							dataType: "json",
							data: { questionId: questionId },
							success: function (response) {
								console.log("success");
							},
							error: function () {
								alert("Error fetching data");
							},
						});
						location.reload();
					});
				}
			},
			error: function () {
				alert("Error fetching data");
			},
		});
		
		// $(document).on('click', '#acceptButtonDiv', function() {
		// 	// Get the data-comment-id attribute value
		// 	var commentId = $(this).find('.acceptButton').data('comment-id');
		// 	console.log(`${commentId} this one`);
	  
		// 	// Make AJAX call
		// 	$.ajax({
		// 	  type: 'POST',
		// 	  url: "http://localhost:3000/comments/api/commentAccepted",
		// 	  data: {commentId: commentId},
		// 	  success: function(response) {
		// 		console.log('AJAX call successful', response);
		// 		$(this).find('.acceptButton').remove();
		// 		$(this).append('<p class="selected">Selected Text</p>');
		// 	  },
		// 	  error: function(error) {
		// 		console.error('AJAX call failed', error);
		// 	  }
		// 	});
		// });

	}
});
