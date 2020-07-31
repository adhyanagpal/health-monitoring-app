const route=require('express').Router();
const path=require('path')

route.get('/entry/:emailid',(req,res)=>{
    //find query to db using email id

    // if user already exists redirect to dashboard
    // else redirect to profile page

    console.log("User's Eamil Address: "+req.params.emailid);
    console.log("Redirecting to Profile Page")
    res.redirect('/display_profile/'+req.params.emailid);
})

module.exports=route