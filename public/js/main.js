$(document).ready(function () {
	// Get the login button element
	const loginBtn = $(".login-btn");
	const logoutBtn = $(".logout-btn");

	loginBtn.click(function () {
		window.location.href = "/login";
	});

	logoutBtn.click(function () {
		window.location.href = "/logout";
	});
});
