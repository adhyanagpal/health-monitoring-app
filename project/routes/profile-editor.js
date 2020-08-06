const route=require('express').Router();
const path=require('path')

route.get('/edit-profile',(req,res)=>{

    let user={
        name: "Simran Kaur",
        dob:"25-05-1998",
        contact:"9988324510",
        bloodgrp:"B+",
        address: "Abc Road",
        weight: "55",
        height: "160" 
    }

    res.render('profile-editor',{user})
    console.log("Redirected to Edit Profile Page")
    
})

module.exports=route