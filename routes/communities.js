import { Router } from "express";
import * as communityData from "../data/communities.js";
import * as helpers from "../helpers/commHelper.js";
import xss from 'xss';
const router = Router();

router.route("/").get(async(req, res) => {
    try{
        const communities = await communityData.findAllCommunites();  
        return res.render('communities', {title: "All Communities",communities: communities, bg: "bg-stone-50", user: req.session.user,
        css: "communities",
        js: "communities"});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});



// GET create form
router
.route('/create')
.get(async(req, res) => {
    return res.render('newCommunity',{title: "add a new Community", css:"communities", js:"communities"});
})
.post(async(req, res) => {
    let title = xss(req.body.title);
    let description = xss(req.body.description);

    try{
        if(!helpers.isValidCommunity(title,req.session.user.stevensEmail,description)){
            throw "Enter Valid Data";
        }
        const newCommunity = await communityData.createCommunity(title,  req.session.user.stevensEmail, description);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});
router
.route('/join')
.get(async (req, res) => {

    let id = xss(req.query.id);
    try
    {
        const newCommunity = await communityData.joinCommunity(id, req.session.user.stevensEmail);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("error", {title: "Error", error: e.message});
    }
});
router
.route('/unjoin')
.get(async (req, res) => {

    let id = xss(req.query.id);
    try
    {
        const newCommunity = await communityData.unjoinCommunity(id, req.session.user.stevensEmail);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("error", {title: "Error", error: e.message});
    }
});
// GET single community
router.route('/:id').get(async(req, res) => {
    let id = xss(req.params.id);
    // Check if user is logged in
    if (req.session.user)
    {
        try{
            // check if the user is already joined or was the creater
            id = helpers.checkId(id);
            let members = await communityData.findMembers(id);
            let joined = false;
            if (members.includes(req.session.user.stevensEmail))
            {
                joined = true;
            }
            const community = await communityData.findCommunity(id);
            if (community.email == req.session.user.stevensEmail) joined = true;

            return res.render('community', {title:community.title,description:community.description,members:community.members, creater: community.email, id:community._id, js:"communitites", css:"communities", user: req.session.user, joined: joined});
        }catch(e){
            return res.render("communities", {title: "Error",message: e.message});
        }
    }
    // User not logged in
    else{
        try{
            id = helpers.checkId(id); 
            const community = await communityData.findCommunity(id);
            return res.render('community', {title:community.title,description:community.description,members:community.members, creater: community.email, id:community._id, js:"communitites", css:"communities"});
        }catch(e){
            return res.render("communities", {title: "Error",message: e.message});
        }     
    }

});

router.route("/search/:searchterm").get(async (req, res) => {
    let searchValue = xss(req.params.searchterm);
	try {
		const results = await communityData.searchCommunities(searchValue);
        return res.render('communities', {title: "All Communities",communities: results, js:"communitites", css:"communities"});
	} catch (e) {
		return res.render("communities", {title: "Error",message: e.message});
	}
});
 
export default router;