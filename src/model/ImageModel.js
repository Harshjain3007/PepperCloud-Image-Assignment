const mongoose = require('mongoose');
const { uploadFile } = require('../aws/uploadFile');


const imageSchema = new mongoose.Schema({
    image:{
        type:String,
         required:true,
        trim:true
    },
    uploadedDate:{type:String}

},{timestamps:true})


module.exports = mongoose.model('Image',imageSchema)