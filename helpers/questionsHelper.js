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
	// if (!tags) {
	// 	console.log("tag missing");
	// }
	// if (!title) {
	// 	console.log("title missing");
	// }
	// if (!problemDetails) {
	// 	console.log("problem missing");
	// }
	// if (!attemptDetails) {
	// 	console.log("attempt missing");
	// }
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

export const stopWords = [
	"a",
	"about",
	"above",
	"after",
	"again",
	"against",
	"all",
	"am",
	"an",
	"and",
	"any",
	"are",
	"as",
	"at",
	"be",
	"because",
	"been",
	"before",
	"being",
	"below",
	"between",
	"both",
	"but",
	"by",
	"could",
	"did",
	"do",
	"does",
	"doing",
	"down",
	"during",
	"each",
	"few",
	"for",
	"from",
	"further",
	"had",
	"has",
	"have",
	"having",
	"he",
	"her",
	"here",
	"hers",
	"herself",
	"him",
	"himself",
	"his",
	"how",
	"i",
	"if",
	"in",
	"into",
	"is",
	"it",
	"its",
	"itself",
	"just",
	"me",
	"more",
	"most",
	"my",
	"myself",
	"no",
	"nor",
	"not",
	"now",
	"of",
	"off",
	"on",
	"once",
	"only",
	"or",
	"other",
	"our",
	"ours",
	"ourselves",
	"out",
	"over",
	"own",
	"s",
	"same",
	"she",
	"should",
	"so",
	"some",
	"such",
	"than",
	"that",
	"the",
	"their",
	"theirs",
	"them",
	"themselves",
	"then",
	"there",
	"these",
	"they",
	"this",
	"those",
	"through",
	"to",
	"too",
	"under",
	"until",
	"up",
	"very",
	"was",
	"we",
	"were",
	"what",
	"when",
	"where",
	"which",
	"while",
	"who",
	"whom",
	"why",
	"will",
	"with",
	"you",
	"your",
	"yours",
	"yourself",
	"yourselves",
];
