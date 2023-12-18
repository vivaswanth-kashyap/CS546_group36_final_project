import { ObjectId } from 'mongodb';
export const isValidComment = (commenter, commentText) => {
  if (!commenter || !commentText) {
    throw new Error("Both commenter and commentText must exist");
  }

  if (
    !validateString(commenter) ||
    !validateString(commentText)
  ) {
    throw new Error("Expected commenter and commentText as non-empty strings");
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



export function validateString(s) {
  // Returns a valid trimmed string
  if (typeof s !== 'string') throw `Input is not a string`;
  const validString = s.trim();
  if (validString.length === 0) throw `String is empty`;
  return validString;

}