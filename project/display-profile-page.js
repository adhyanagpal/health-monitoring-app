const route=require('express').Router();
const path=require('path')

route.get('/display_profile/:emailid',(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/profile-page.html'));
    // console.log("User's Eamil Address: "+req.params.emailid);
})

module.exports=route