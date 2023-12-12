import * as helper from "../helpers/usersHelper.js";
import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcryptjs';
import * as userActivity from "./userActivity.js";

// Register and Login
export const registerUser = async (
    firstName,
    lastName,
    stevensEmail,
    password,
    academicStatus
  ) => 
{

    // Validation
    firstName = helper.validString(firstName);
    lastName = helper.validString(lastName);
    stevensEmail = helper.validString(stevensEmail);
    password = helper.validString(password);
    academicStatus = helper.validString(academicStatus);

    // Convert name to title case and store all other strings in lowercase
    firstName = firstName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    lastName = lastName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    stevensEmail = stevensEmail.toLowerCase();
    academicStatus = academicStatus.toLowerCase();

    // Other conditions
    let regex = /^[a-zA-Z]+$/;

    if (!regex.test(firstName) || firstName.length < 2 || firstName.length > 25) throw `${firstName} is not a valid first name`;
    if (!regex.test(lastName) || lastName.length < 2 || lastName.length > 25) throw `${lastName} is not a valid last name`; 
    if (!helper.validEmail(stevensEmail)) throw `${stevensEmail} is not a valid email`;
    if (!helper.validPassword(password)) throw `${password} is not a valid password`;
    if (!helper.validStatus(academicStatus)) throw `${academicStatus} is not a valid academicStatus`;

    // Make sure the email is unique
    const userCollection = await users();
    const already = await userCollection.findOne({stevensEmail: stevensEmail});
    if (already) throw `There is already a user with the email address ${stevensEmail}`;

    // Hash password
    var salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    // Store
    const insertInfo = await userCollection.insertOne({firstName: firstName, lastName: lastName, stevensEmail: stevensEmail, password: password, academicStatus: academicStatus});

    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add user';
    
    // User is created (initialize the userActivity)
    let acknowledgement = await userActivity.createUserActivity(stevensEmail);
    if (!acknowledgement) throw 'Could not add user Activity';

    return {insertedUser: true};
};
  
export const loginUser = async (stevensEmail, password) => 
{
    // Validation
    stevensEmail = helper.validString(stevensEmail);
    password = helper.validString(password);

    stevensEmail = stevensEmail.toLowerCase();
    if (!helper.validEmail(stevensEmail) || !helper.validPassword(password)) throw `Either the email address or password is invalid`;

    // Find user
    const userCollection = await users();
    const userInfo = await userCollection.findOne({stevensEmail: stevensEmail});

    if (userInfo === null) throw `Either the email address or password is invalid`;

    // Check password
    if (!bcrypt.compareSync(password, userInfo.password)) throw `Either the email address or password is invalid`;

    delete userInfo._id;
    delete userInfo.password;
    return userInfo;
};

// Get methods
export const getUser = async (stevensEmail) =>
{
    // Given a email fetch that user (only show basic info)

    // Validate email
    stevensEmail = helper.validString(stevensEmail);
    stevensEmail = stevensEmail.toLowerCase();
    if (!helper.validEmail(stevensEmail)) throw `${stevensEmail} is not a valid email`;

    // Find and fetch
    const userCollection = await users();
    const userInfo = await userCollection.findOne({stevensEmail: stevensEmail});
    
    if (userInfo === null) throw `No user with the email ${stevensEmail}`;

    delete userInfo._id;
    delete userInfo.password;
    return userInfo;
};

// Update methods
export const updateFirstName = async (stevensEmail, newFirstName) =>
{
    // Validate
    newFirstName = helper.validString(newFirstName);
    newFirstName = newFirstName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(newFirstName) || newFirstName.length < 2 || newFirstName.length > 25) throw `${newFirstName} is not a valid first name`;

    stevensEmail = helper.validString(stevensEmail);
    stevensEmail = stevensEmail.toLowerCase();
    if (!helper.validEmail(stevensEmail)) throw `${stevensEmail} is not a valid email`;

    // Update
    const userCollection = await users();
    const userInfo = await userCollection.updateOne(
        {stevensEmail: stevensEmail},
        {$set: {firstName: newFirstName}},
        {returnDocument: 'after'});
    
    if (!userInfo)
    throw `Update failed! Could not update firstName with email ${stevensEmail}`;
    
    return true; 
};

export const updateLastName = async (stevensEmail, newLastName) =>
{
    // Validate
    newLastName = helper.validString(newLastName);
    newLastName = newLastName.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(newLastName) || newLastName.length < 2 || newLastName.length > 25) throw `${newLastName} is not a valid last name`;

    stevensEmail = helper.validString(stevensEmail);
    stevensEmail = stevensEmail.toLowerCase();
    if (!helper.validEmail(stevensEmail)) throw `${stevensEmail} is not a valid email`;

    // Update
    const userCollection = await users();
    const userInfo = await userCollection.updateOne(
        {stevensEmail: stevensEmail},
        {$set: {lastName: newLastName}},
        {returnDocument: 'after'});
    
    if (!userInfo)
    throw `Update failed! Could not update lastName with email ${stevensEmail}`;
    
    return true; 
};

export const updateAcademicStatus = async (stevensEmail, newAcademicStatus) =>
{
    // Validate
    newAcademicStatus = helper.validString(newAcademicStatus);
    newAcademicStatus = newAcademicStatus.toLowerCase();
    if (!helper.validStatus(newAcademicStatus)) throw `${newAcademicStatus} is not a valid academicStatus`;

    stevensEmail = helper.validString(stevensEmail);
    stevensEmail = stevensEmail.toLowerCase();
    if (!helper.validEmail(stevensEmail)) throw `${stevensEmail} is not a valid email`;

    // Update
    const userCollection = await users();
    const userInfo = await userCollection.updateOne(
        {stevensEmail: stevensEmail},
        {$set: {academicStatus: newAcademicStatus}},
        {returnDocument: 'after'});
    
    if (!userInfo)
    throw `Update failed! Could not update academicStatus with email ${stevensEmail}`;
    
    return true; 
};