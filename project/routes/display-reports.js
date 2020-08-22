const route=require('express').Router();
const fs = require("fs");
const multer = require("multer");
const path=require('path');
const mkdirp=require('mkdirp')

route.get('/test-reports/:email',(req,res)=>{
    ///fetch reports from db
    
    fs.promises.readdir('./uploads/'+req.params.email)
        .then(filenames=>{
            let reports=filenames.map(fname=>{
                return {fname, geturl: "/display-report/"+req.params.email+"/"+fname};
            })
            res.render('reports',{email: req.params.email, reports});
        })
    
})

route.get('/display-report/:email/:filename',(req,res)=>{
    res.sendFile("/home/anagpal/health-monitoring-app/project/uploads/"+req.params.email+"/"+req.params.filename);
})

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        
    const uploadDir = "./uploads/"+req.params.email;
    mkdirp(uploadDir).then(data =>{
        callback(null, uploadDir);
    })

  },
  filename: function(req, file, callback) {
    callback(null, file.originalname );
  }
});

//Date.now() + "_" + 
//+ path.extname(file.originalname)

var upload = multer({ storage: storage });

route.post("/upload-report/:email", upload.single("report"), function(req, res) {
  
  const file = req.file;
  if (!file) {
    res.status(400).send("No File Selected");
  }
 
  console.log("File uploaded successfully")
  res.redirect('/test-reports/'+req.params.email)
  //res.send(file);
});


module.exports=route