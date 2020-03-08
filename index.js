const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose')
const uploadFolder = __dirname + '/uploads/images'

const path = require('path')

// Upload Models
const UploadImg = require('./Models/UploadImg')

// Db config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, { useUnifiedTopology: true , useNewUrlParser: true})
.then(() => console.log('Mongo Connected...'))
.catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })


const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
  const {images} = req.file.path
  const newUpload = new UploadImg({
    images
  })
  newUpload.save().then(result => {
      if(req.file) {
        console.log('path added to database')
        res.json(req.file);
      }
      else throw 'error';
    }).catch(err => console.log(err))
});

app.get('/image/:fileName', (req,res) => {
    const file = `${uploadFolder}/${req.params.fileName}`
    res.sendFile(file)
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});