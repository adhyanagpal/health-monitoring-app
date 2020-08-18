const route=require('express').Router();
const path=require('path')

route.post('/doc-edit-profile',(req,res)=>{
//  console.log(req)
    let user={
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        time: req.body.time,
        degree: req.body.degree,
        facility: req.body.facility,
        fee: req.body.fee,
        specialisation: req.body.specialisation
    }

    res.render('doc-profile-editor',{user})
    console.log("Redirected to doctor's Edit Profile Page")
    
})

module.exports=route