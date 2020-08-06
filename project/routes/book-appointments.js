const route=require('express').Router()

route.get('/book-appointment',(req,res)=>{
    res.render('booking-appointments')
})

module.exports=route;