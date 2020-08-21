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
    console.log("User Type is: "+usertype);
    if(usertype=='client')
    {
        console.log("Welcome Client");

        const query = datastore.createQuery('Patient').filter('email',EMAIL);    
            query.run((err,entities,info)=>{
        
            console.log(entities.length)

            if(entities.length==1)
            {
                console.log("client exists");
               // res.redirect('/profile-page/'+usertype);
               let user={
                    name: entities[0].name,
                    email: entities[0].email,
                    dob:entities[0].dob,
                    contact:entities[0].contact,
                    bloodgrp:entities[0].bloodgrp,
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
                let user={
                    email: EMAIL
                }
               // res.redirect('/edit-profile');
               res.render('profile-editor',{user});
            }
        });
    }
    else
    {
        console.log("Welcome Doctor");
        const query = datastore.createQuery('Doctor').filter('email',EMAIL);

        query.run((err,entities,info)=>{
        
            console.log(entities.length)

            if(entities.length==1)
            {
                console.log("doctor exists");
               //res.redirect('/profile-page/'+usertype);
               let user={
                    name: entities[0].name,
                    email: entities[0].email,
                    contact:entities[0].contact,
                    address: entities[0].address,
                    time: entities[0].time,
                    degree: entities[0].degree,
                    facility: entities[0].facility,
                    fee: entities[0].fee,
                    specialisation: entities[0].specialisation
                }
                res.render('doctor-dashboard',{user});
            }
            else
            {
                console.log("new doctor");
                let user={
                    email: EMAIL
                }
               // res.redirect('/edit-profile');
               res.render('doc-profile-editor',{user});
            }
        });


    }
          
        
    
})

module.exports=route