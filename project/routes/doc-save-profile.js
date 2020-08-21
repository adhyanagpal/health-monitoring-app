const route=require('express').Router();
const datastore=require('../db.js')

route.post('/doc-save-profile',(req,res)=>{

    const EMAIL=req.body.email;

    const user={
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
    
    const query = datastore.createQuery('Doctor').filter('email',EMAIL);    
            query.run((err,entities,info)=>{        
            console.log(entities.length)

            if(entities.length==1)
            {
                console.log("Existing doctor wants to update the DB");
                console.log(entities[0]);
                console.log(entities[0][datastore.KEY].id);
                var id=entities[0][datastore.KEY].id;
                const key = datastore.key(['Doctor',parseInt(id)]);                
                
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
                res.render('doctor-dashboard',{user});
                // console.log(datastore.KEY.id);
            }
            else
            {
                const key = datastore.key(['Doctor']);
                 console.log(EMAIL)
                datastore.save({
                key: key,
                data: user
                }, function(err) {
                if (!err) {
                    console.log("Record saved successfully.")
                }
                });

                res.render('doctor-dashboard',{user});
            }
        });

    // res.render('user-dashboard');

})

module.exports=route