const route=require('express').Router();
const path=require('path')

route.get('/profile-page/client',(req,res)=>{
    //pass user object to dynamically render the profile details of
    // relevant user as html
   console.log(req)
    let user={
        name: "Simran Kaur",
        dob:"25-05-1998",
        contact:"9988324510",
        bloodgrp:"B+",
        address: "Abc Road",
        weight: "55",
        height: "160" 
    }

    res.render('user-dashboard',{user});
})

route.get('/profile-page/doctor',(req,res)=>{
    res.render('doctor-dashboard');
})

module.exports=route