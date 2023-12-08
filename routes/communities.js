import { Router } from "express";
import * as communityData from "../data/communities.js";
import * as helpers from "../helpers/commHelper.js";
const router = Router();
	
// GET all communities
router.route("/").get(async(req, res) => {
    try{
        const communities = await communityData.findAllCommunites();  
        return res.render('communities', {title: "All Communities",communities: communities});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});

// GET single community
router.route('/:id').get(async(req, res) => {
    try{
        const id = req.params.id;  
        const community = await communityData.findCommunity(id);
        return res.render('community', {name:community.title,members:community.members});
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});

// GET create form
router.route('/create').get(async(req, res) => {
        return res.render('newCommunity',{title: "add a new Community"});
});


// POST create community 
router.route('/create').post(async(req, res) => {
    try{
        const email = req.params.email;
        const { name, description } = req.body;
        const newCommunity = await communityData.createCommunity({name,  email, description,});
        return res.redirect(`/communities/${newCommunity._id}`);
    }catch(e){
        return res.render("communities", {title: "Error",message: e.message});
    }
});


export default router;