
const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cros=require('cors');
const app = express();
app.use(cros({ origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname + '-' + Date.now());
    }
});
let upload = multer({storage: storage});

 
app.get('/', function (req, res) {
  res.send('file upload');
});
 
app.post('/',upload.single('file'), function (req, res) {
    const file=req.file
    console.log(file);
    if (!file) {
        console.log("Your request doesn’t have any file");
        return res.send({
          success: false
        });
    
      } else {
        console.log('Your file has been received successfully');
        return res.send(file);
      } 
});
 
const PORT = process.env.PORT || 4000;
 
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});