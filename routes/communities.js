import { Router } from "express";
import * as communityData from "../data/communities.js";
import * as helpers from "../helpers/commHelper.js";
const router = Router();
router.route("/").get(async(req, res) => {
    try{
        const communities = await communityData.findAllCommunites();  
        return res.render('communities', {title: "All Communities",communities: communities});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});



// GET create form
router
.route('/create')
.get(async(req, res) => {
    return res.render('newCommunity',{title: "add a new Community"});
})
.post(async(req, res) => {
    try{
        const { title, email, description } = req.body;
        const newCommunity = await communityData.createCommunity(title,  email, description);
        return res.redirect(`/communities/${newCommunity._id}`,{id:newCommunity._id});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});
router
.route('/join')
.get(async (req, res) => {
    let id = req.query.id;
    return res.render('join',{title:'join', id:id});
})
.post(async (req, res) => {
    try{
        const communityId = req.query.id;
        const { email} = req.body;
        const newCommunity = await communityData.joinCommunity(communityId, email);
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});
// GET single community
router.route('/:id').get(async(req, res) => {
    try{
        const id = req.params.id;  
        const community = await communityData.findCommunity(id);
        return res.render('community', {title:community.title,description:community.description,members:community.members, id:community._id});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});

router.route("/search").post(async (req, res) => {
	try {
		const {searchTerm} = req.body;
        console.log(searchTerm);
		const results = await communityData.searchCommunities(searchTerm);
        console.log(results);
        return res.render('communities', {title: "All Communities",communities: results});
	} catch (e) {
		return res.render("communities", {title: "Error",message: e.message});
	}
});
 
export default router;