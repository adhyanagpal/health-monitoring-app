const route=require('express').Router();
const path=require('path')
const datastore=require('../db.js')


route.post('/profile-page',(req,res)=>{
    //query to db, if user already exists, redirect to dashboard
    //else redirect to profile page
    //pass user object
   // console.log(req)
    const usertype=req.body.user;
    const EMAIL=req.body.emailid;
    console.log(EMAIL)
    if(usertype=='client')
    {
        console.log("User Type is: "+usertype);

        const query = datastore.createQuery('Patient').filter('email',EMAIL);    
            query.run((err,entities,info)=>{
        
            console.log(entities.length)

            if(entities.length==1)
            {
                console.log("client exists");
               // res.redirect('/profile-page/'+usertype);
               let user={
                    name: entities[0].name,
                    dob:entities[0].dob,
                    contact:entities[0].contact,
                    bloodgrp:entities[0].bloodgroup,
                    address: entities[0].address,
                    weight: entities[0].weight,
                    height: entities[0].height 
                }
               //res.redirect('/profile-page/client',{dummy});
               res.render('user-dashboard',{user});
            }
            else
            {
                console.log("new client");
               // res.redirect('/edit-profile');
               res.render('profile-editor');
            }
        });
    }

          
        
    
})

module.exports=route