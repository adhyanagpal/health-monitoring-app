const route=require('express').Router();

route.get('/view-calendar',(req,res)=>{
    res.send("User will be redirected to their google calendar")
})

module.exports=route;