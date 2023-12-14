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
export const isvalidEmail = (email) =>{
    var pattern = /^([a-zA-Z0-9]|[a-zA-Z0-9][._%+-][a-zA-Z0-9])+@([a-zA-Z0-9][-][a-zA-Z0-9]|[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}
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

export const isValidCommunity = (
	title,
	email,
    description
) => {
	if (!title || !email || !description) {
		throw "All fields must exist";
	}

	if ( !isValidString(title) || !isValidString(description) || !isValidString(email)){
		throw "expected strings to be provided";
	}
	if(title.trim().length <3 || title.trim().length >15){
		throw "title must be 3 to 15 characters long";
	}
	if(description.trim().length <10 || description.trim().length >100){
		throw "Description should be between 10 and 100 characters.";
	}
    if(!isvalidEmail(email)){
        throw "email is not valid";
    }
	return true;
};