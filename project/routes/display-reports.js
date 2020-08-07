const route=require('express').Router();

route.get('/test-reports',(req,res)=>{
    ///fetch reports from db
    res.render('reports');
})

module.exports=route