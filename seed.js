import * as communityData from "./data/communities.js";
let c1 = undefined;
let c2 = undefined;
let m1 = undefined;
let m2 = undefined;

try{
     c2 = await communityData.createCommunity("Java old", "npatel24@stevens.edu","this is about java");
}catch(e){
    console.log(e);
}
try{
     c1 = await communityData.createCommunity("python new", "npatel24@stevens.edu","this is about java");
}catch(e){
    console.log(e);
}
try{
    m1 = await communityData.joinCommunity(c1._id, "npatel24@stevens.edu");
}catch(e){
    console.log(e);
}
try{
    m2 = await communityData.joinCommunity(c2._id, "npatel24@stevens.edu");
}catch(e){
    console.log(e);
}
try{
    let c3 = await communityData.searchCommunities("java");
    console.log(c3);
}catch(e){
    console.log(e);
}
try{
    let m3 = await communityData.findMembers(c2._id);
    console.log(m3);
}catch(e){
    console.log(e);
}