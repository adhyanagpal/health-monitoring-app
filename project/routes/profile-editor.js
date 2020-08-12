const route=require('express').Router();
const path=require('path')

route.post('/edit-profile',(req,res)=>{
 console.log(req)
    let user={
        name: req.body.name,
        dob: req.body.dob,
        contact: req.body.contact,
        bloodgrp: req.body.bloodgrp,
        address: req.body.address,
        weight: req.body.weight,
        height: req.body.height 
    }

    res.render('profile-editor',{user})
    console.log("Redirected to Edit Profile Page")
    
})

module.exports=route