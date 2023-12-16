$(document).ready(function () {
	// Get the login button element
	const loginBtn = $(".login-btn");
	const logoutBtn = $(".logout-btn");
	const registerBtn = $(".register-btn");

	loginBtn.click(function () {
		window.location.href = "/login";
	});

	registerBtn.click(function () {
		window.location.href = "/register";
	});

	logoutBtn.click(function () {
		window.location.href = "/logout";
	});

	const animatedText = document.querySelector(".animated-text");
	if (animatedText) {
		animatedText.classList.add("text-animation");
	}
});
