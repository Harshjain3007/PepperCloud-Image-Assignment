const express = require('express')
const router = express.Router()
 
const imageController = require('../controller/imageController')


router.post("/image", imageController.createImage)
router.get("/images", imageController.getImageDetails)


module.exports=router;