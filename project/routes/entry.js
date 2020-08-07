const route=require('express').Router();
const path=require('path')

route.post('/profile-page',(req,res)=>{
    //query to db, if user already exists, redirect to dashboard
    //else redirect to profile page
    //pass user object
    const usertype=req.body.user;
    console.log("User Type is: "+usertype);
    res.redirect('/profile-page/'+usertype);
})

module.exports=route