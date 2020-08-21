const route=require('express').Router();
const datastore=require('../db.js')

route.post('/save-profile',(req,res)=>{
    // console.log(req);

    //query to database of client, if client already exists, update the DB, else add a new entity
    const EMAIL=req.body.email;

    const user = {
                    name: req.body.name,
                    email: req.body.email,
                    dob: req.body.dob,
                    contact: req.body.contact,
                    bloodgrp: req.body.bloodgrp,
                    address: req.body.address,
                    weight: req.body.weight,
                    height: req.body.height 
                };


    const query = datastore.createQuery('Patient').filter('email',EMAIL);    
            query.run((err,entities,info)=>{        
            console.log(entities.length)

            if(entities.length==1)
            {
                console.log("Existing client wants to update the DB");
                console.log(entities[0]);
                console.log(entities[0][datastore.KEY].id);
                var id=entities[0][datastore.KEY].id;
                const key = datastore.key(['Patient',parseInt(id)]);                
                
                datastore.update({
                key: key,
                data: user
                }, function(err) {
                if (!err) {
                    console.log("Record updated successfully.")
                }
                else {
                    console.log(err)
                }
                });
                res.render('user-dashboard',{user});
                // console.log(datastore.KEY.id);
            }
            else
            {
                const key = datastore.key(['Patient']);
                 console.log(EMAIL)
                datastore.save({
                key: key,
                data: user
                }, function(err) {
                if (!err) {
                    console.log("Record saved successfully.")
                }
                });

                res.render('user-dashboard',{user});
            }
        });

    // res.render('user-dashboard');
})

module.exports=route