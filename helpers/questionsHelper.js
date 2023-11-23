import { ObjectId } from "mongodb";

export const isValidString = (str) => {
	if (typeof str !== "string") {
		return false;
	}
	str = str.trim();
	if (!str) {
		return false;
	}
	return true;
};

export const checkId = (id) => {
	if (!id) {
		throw new Error("You must provide an id to search for");
	}
	if (typeof id !== "string") {
		throw new Error("id must be a string");
	}
	id = id.trim();
	if (!ObjectId.isValid(id)) {
		throw new Error("invalid object Id");
	}
	if (id.length === 0)
		throw new Error("id cannot be an empty string or just spaces");
	return id;
};

export const isValidQuestion = (
	title,
	problemDetails,
	attemptDetails,
	tags
) => {
	if (!title || !problemDetails || !attemptDetails || !tags) {
		throw "All fields must exist";
	}

	if (
		!isValidString(title) ||
		!isValidString(problemDetails) ||
		!isValidString(attemptDetails) ||
		!isValidString(tags)
	) {
		throw "expected strings to be provided";
	}

	return true;
};
