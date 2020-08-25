const route=require('express').Router();
const fs = require("fs");
const multer = require("multer");
const path=require('path');
const mkdirp=require('mkdirp')

fs.chmod('./uploads',0o777,(err) => {
	if (err) {
		console.error(err)
	}

	console.log('Permissions changed successfully');
})

route.get('/test-reports/:email',(req,res)=>{
    ///fetch reports from db

    const uploadDir = "./uploads/"+req.params.email;
    mkdirp(uploadDir).then(data=>{
        console.log("Folder didn't exist, created new folder");
        fs.promises.readdir('./uploads/'+req.params.email)
        .then(filenames=>{
            let reports=filenames.map(fname=>{
                return {fname, geturl: "/display-report/"+req.params.email+"/"+fname};
            })
            res.render('reports',{email: req.params.email, reports});
        })
    })
    
    
    
})

route.get('/display-report/:email/:filename',(req,res)=>{
    
    const dirPath=__dirname;
    dirPath.toString();
    //console.log(dirPath);
    const len=dirPath.length;
    //console.log(len);
    let newpath=dirPath.substr(0,len-6);
    res.sendFile(path.join(newpath,"/uploads/"+req.params.email+"/"+req.params.filename));
})

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        
    const uploadDir = "./uploads/"+req.params.email;
    mkdirp(uploadDir).then(data =>{
        console.log("created new directory")
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