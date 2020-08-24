const route=require('express').Router()
const datastore=require('../db.js')

route.post('/book-appointment',(req,res)=>{
    // console.log(req.body)
    
    var doclist=[];
    // doclist.push(req.body.email)
    const query = datastore.createQuery('Doctor').filter('specialisation',req.body.specialisation);
    query.run((err,entities,info)=>{
        
        for(var i=0;i<entities.length;i++)
        {
            //console.log(entities[i]);
            const doc={
                name: entities[i].name,
                email: entities[i].email,
                //clientEmail:req.body.email
            }
            doclist.push(doc);
        }
        //console.log(doclist)
        var list={
            clientEmail:req.body.email,
            doclist: doclist
        }
        //console.log("sending this as clientEmail: "+req.body.email)
        res.render('booking-appointments',list)
    });

    
})

module.exports=route;