const route=require('express').Router();
const path=require('path')

route.get('/profile-page',(req,res)=>{
    //pass user object to dynamically render the profile details of
    // relevant user as html
    res.render('profile-page');
})

module.exports=route