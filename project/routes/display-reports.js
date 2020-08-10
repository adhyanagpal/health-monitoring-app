const route=require('express').Router();
const fs = require("fs");
const multer = require("multer");
const path=require('path');

route.get('/test-reports',(req,res)=>{
    ///fetch reports from db
    res.render('reports');
})

const uploadDir = "./uploads";

// @creates the upload destination [folder] if it doesn't exist at server boot.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname );
  }
});

//Date.now() + "_" + 
//+ path.extname(file.originalname)

var upload = multer({ storage: storage });

route.post("/upload-report", upload.single("report"), function(req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).send("No File Selected");
  }
  console.log("File uploaded successfully")
  res.redirect('/test-reports')
  //res.send(file);
});

module.exports=route