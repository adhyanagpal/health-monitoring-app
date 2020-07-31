const route=require('express').Router();
const path=require('path')

route.get('/edit-profile',(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/edit-profile.html'));
    console.log("Redirected to Edit Profile Page")
    
})

module.exports=route