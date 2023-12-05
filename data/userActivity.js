import * as helper from "../helpers/usersHelper.js";
import {userActivity} from '../config/mongoCollections.js';

export const createUserActivity = async(stevensEmail) =>
{
    // no validation required for stevensEmail since this function is only called when a new user is created
    
    let newActivity = {
        stevensEmail: stevensEmail,
        rating: 5,
        communitiesCreated: [],
        questionsCreated: [],
        commentsCreated: [],
        communitiesSaved: [],
        questionsSaved: [],
    };

    // Store
    const activityCollection = await userActivity();
    const insertInfo = await activityCollection.insertOne(newActivity);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) return false;
    
    return true;
};