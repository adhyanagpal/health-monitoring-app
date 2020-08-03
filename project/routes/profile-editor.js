const route=require('express').Router();
const path=require('path')

route.get('/edit-profile',(req,res)=>{

    res.render('profile-editor')
    console.log("Redirected to Edit Profile Page")
    
})

module.exports=route