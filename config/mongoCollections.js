import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
	let _col = undefined;

	return async () => {
		if (!_col) {
			const db = await dbConnection();
			_col = await db.collection(collection);
		}

		return _col;
	};
};

export const users = getCollectionFn("users");
export const userActivity = getCollectionFn("userActivity");
export const questions = getCollectionFn("questions");
export const communities = getCollectionFn("communities");
