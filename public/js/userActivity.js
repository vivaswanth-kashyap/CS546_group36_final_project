$(document).ready(function () {
	// Set the default values
	var defaultFirstName = $("#defaultFirstName").val();
	var defaultLastName = $("#defaultLastName").val();
	var defaultStatus = $("#defaultStatus").val();
	$("#academicStatusInput").val(defaultStatus).prop("selected", true);

	// Form event
	$("#setting-form").submit(function (event) {
		event.preventDefault();
		$(".error").hide();

		// validation
		var firstName = $("#firstNameInput").val().trim();
		var lastName = $("#lastNameInput").val().trim();
		var academicStatus = $("#academicStatusInput").val().trim();
		let regex = /^[a-zA-Z]+$/;

		if (
			!firstName ||
			!regex.test(firstName) ||
			firstName.length < 2 ||
			firstName.length > 25
		) {
			$("#firstNameError").show();
			$("#firstNameInput").focus();
			$("#firstNameInput").val(defaultFirstName);
			return;
		}
		if (
			!lastName ||
			!regex.test(lastName) ||
			lastName.length < 2 ||
			lastName.length > 25
		) {
			$("#lastNameError").show();
			$("#lastNameInput").focus();
			$("#lastNameInput").val(defaultLastName);
			return;
		}

		this.submit();
	});

	// Show the user data according to the button pressed

	// Function to handle the AJAX response and populate the list
	function populateList(id, data) {
		var ul = $("#container");
		data.forEach(function (item) {
			ul.append(item);
		});
		// Reset
		$("#bottomDiv").empty().append(ul);
	}

	// communitiesCreated
	$("#communitiesCreated").click(function () {
		var clickedElementId = $(this).attr("id");
		$("#container").empty();

		// Perform AJAX request
		$.ajax({
			url: "http://localhost:3000/userActivity/api/communitiesCreated",
			method: "GET",
			dataType: "json",
			success: function (response) {
				// Populate the list with the response data
				let content = [];
				content.push('<p class="communityTitle">Communities Created</p>');
				response.forEach(function (item) {
					let x =
						'<div class="communitySquare border-solid border-2 rounded-lg p-4 m-4">' +
						'<a href="/communities/' +
						item._id +
						'">' +
						'<h2 class="communityTitle">' +
						item.title +
						"</h2>" +
						'<p class="communityDescription"> Description: ' +
						item.description +
						"</p>" +
						"</a>" +
						"</div>";
					content.push(x);
				});
				populateList(clickedElementId, content);
			},
			error: function () {
				alert("Error fetching data");
			},
		});
	});

	// communitiesJoined
	$("#communitiesJoined").click(function () {
		var clickedElementId = $(this).attr("id");
		$("#container").empty();

		// Perform AJAX request
		$.ajax({
			url: "http://localhost:3000/userActivity/api/communitiesJoined",
			method: "GET",
			dataType: "json",
			success: function (response) {
				// Populate the list with the response data
				let content = [];
				content.push('<p class="communityTitle">Communities Joined</p>');
				response.forEach(function (item) {
					let x =
						'<div class="communitySquare border-solid border-2 rounded-lg p-4 m-4">' +
						'<a href="/communities/' +
						item._id +
						'">' +
						'<h2 class="communityTitle">' +
						item.title +
						"</h2>" +
						'<p class="communityDescription"> Description: ' +
						item.description +
						"</p>" +
						"</a>" +
						"</div>";
					content.push(x);
				});
				populateList(clickedElementId, content);
			},
			error: function () {
				alert("Error fetching data");
			},
		});
	});

	// questionsCreated
	$("#questionsCreated").click(function () {
		var clickedElementId = $(this).attr("id");
		$("#container").empty();

		// Perform AJAX request
		$.ajax({
			url: "http://localhost:3000/userActivity/api/questionsCreated",
			method: "GET",
			dataType: "json",
			success: function (response) {
				// Populate the list with the response data
				let content = [];
				content.push('<p class="communityTitle">Questions Asked</p>');
				response.forEach(function (item) {
					let x =
						'<div class="communitySquare border-solid border-2 rounded-lg p-4 m-4">' +
						'<a href="/questions/' +
						item._id +
						'">' +
						'<h2 class="communityTitle">' +
						item.title +
						"</h2>" +
						'<p class="communityDescription"> Details: ' +
						item.problemDetails +
						"</p>" +
						"</a>" +
						"</div>";
					content.push(x);
				});
				populateList(clickedElementId, content);
			},
			error: function () {
				alert("Error fetching data");
			},
		});
	});

	// questionsSaved
	$("#questionsSaved").click(function () {
		var clickedElementId = $(this).attr("id");
		$("#container").empty();

		// Perform AJAX request
		$.ajax({
			url: "http://localhost:3000/userActivity/api/questionsSaved",
			method: "GET",
			dataType: "json",
			success: function (response) {
				// Populate the list with the response data
				let content = [];
				content.push('<p class="communityTitle">Questions Saved</p>');
				response.forEach(function (item) {
					let x =
						'<div class="communitySquare border-solid border-2 rounded-lg p-4 m-4">' +
						'<a href="/questions/' +
						item._id +
						'">' +
						'<h2 class="communityTitle">' +
						item.title +
						"</h2>" +
						'<p class="communityDescription"> Details: ' +
						item.problemDetails +
						"</p>" +
						"</a>" +
						"</div>";
					content.push(x);
				});
				populateList(clickedElementId, content);
			},
			error: function () {
				alert("Error fetching data");
			},
		});
	});

	// commentsCreated
	$("#commentsCreated").click(function () {
		var clickedElementId = $(this).attr("id");
		$("#container").empty();

		// Perform AJAX request
		$.ajax({
			url: "http://localhost:3000/userActivity/api/commentsCreated",
			method: "GET",
			dataType: "json",
			success: function (response) {
				// Populate the list with the response data
				let content = [];
				content.push('<p class="communityTitle">Comments Made</p>');
				response.forEach(function (item) {
					let x =
						'<div class="communitySquare border-solid border-2 rounded-lg p-4 m-4">' +
						'<h2 class="communityTitle">' +
						item.commentText +
						"</h2>" +
						'<p class="communityDescription"> Accepted: ' +
						item.accepted +
						"</p>" +
						"</a>" +
						"</div>";
					content.push(x);
				});
				populateList(clickedElementId, content);
			},
			error: function () {
				alert("Error fetching data");
			},
		});
	});


	// Keep this at the very bottom (this clicks the communitiesCreated by default)
	$("#communitiesCreated").click();
});
