const mongoose = require('mongoose')

const DataSchema  = new mongoose.Schema({
    images: {
        type: String
    }
})


const UploadImg = mongoose.model('UploadImg', DataSchema)
module.exports = UploadImg