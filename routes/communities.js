import { Router } from "express";
import * as communityData from "../data/communities.js";
import * as helpers from "../helpers/commHelper.js";
import xss from 'xss';
const router = Router();
router.route("/").get(async(req, res) => {
    try{
        const communities = await communityData.findAllCommunites();  
        return res.render('communities', {title: "All Communities",communities: communities, bg: "bg-stone-50",
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
    let email = xss(req.body.email);
    try{
        if(!helpers.isValidCommunity(title,email,description)){
            throw "Enter Valid Data";
        }
        const newCommunity = await communityData.createCommunity(title,  email, description);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});
router
.route('/join')
.get(async (req, res) => {
    let id = req.query.id;
    return res.render('join',{title:'join', id:id, css:"communities"});
})
.post(async (req, res) => {
    let communityId = req.query.id;
    let email = xss(req.body.email);
    try{
        if(!(helpers.isvalidEmail(email))){
            throw "email is not valid";
        }
        console.log(email);
        const newCommunity = await communityData.joinCommunity(communityId, email);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("error", {title: "Error",message: e.message});
    }
});
// GET single community
router.route('/:id').get(async(req, res) => {
    let id = xss(req.params.id)
    try{
        id = helpers.checkId(id); 
        const community = await communityData.findCommunity(id);
        return res.render('community', {title:community.title,description:community.description,members:community.members, id:community._id, js:"communitites", css:"communities"});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
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