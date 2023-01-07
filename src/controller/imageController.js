

const imageModel = require('../model/imageModel')
const { uploadFile } = require("../aws/uploadFile");

const createImage = async (req, res) => {
    try {
      let data = {}
  
      let file = req.files;
    // let image;
       
      if (file && file.length > 0) {

        if(file[0].size>1024*1024){
          return res.status(400).send({status:false,message:'Image should not be greater than 2MB'})
        }

        let allowedExtension = ["image/jpeg","image/png"];

          data.image = await uploadFile(file[0])

       if (!allowedExtension.includes(file[0].mimetype)){
       return res.status(400).send({ status: false, message: "Image should be in required format" });
        }
    
     
    } else
        return res.status(400).send({ status: false, message: "Please upload  image" });

          // let today = new Date()
          // let dateFormat = today.getDate()+ '-' + (today.getMonth()+1) + '-' + today.getFullYear()
          //    data.uploadedDate = dateFormat

          let today= new Date()
          let dayFormat = today.getDate()
          let monthFormat = today.getMonth()+1
          let yearFormat =  today.getFullYear()
          if(dayFormat<10) {
               dayFormat = '0'+dayFormat
          }
          if(monthFormat<10){
              monthFormat = '0'+ monthFormat
          } 
          let dateFormat = dayFormat + '-' + monthFormat + '-' + yearFormat
        
          data.uploadedDate = dateFormat

  
      let savedData = await imageModel.create(data);
  
      res.status(201).send({
        status: true,
        message: "Image created successfully",
        data: savedData,
      });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };


  const getImageDetails = async function(req,res){

    try{
    let imageDetails = req.query
     let {uploadedDate,dateSort,dateGreaterThan,dateLessThan,page,limit} = imageDetails
     dateSort = parseInt(dateSort)
      if(dateSort?.length==0){
          return res.status(400).send({status:false, message:'Please enter the dateSort value'})}

          if (dateSort) {
            if (dateSort != "1" && dateSort != "-1")
              return res.status(400).send({
                status: false,
                message: "Please enter priceSort value as 1 or -1 only",
              });
          }
    if (dateGreaterThan?.length == 0)
    return res.status(400).send({status: false,message: "Please enter dateGreaterThan value"});


    if (dateLessThan?.length == 0)
    return res.status(400).send({status: false,message: "Please enter dateLessThan value"});

  if (dateGreaterThan) {
     imageDetails.uploadedDate = { $gt: imageDetails.dateGreaterThan };
    }
    
  if (imageDetails.dateLessThan) {
       imageDetails.uploadedDate = { $lt: imageDetails.dateLessThan };
    }
    
    if (imageDetails.dateGreaterThan && imageDetails.dateLessThan)
     imageDetails.uploadedDate = { $lt: imageDetails.dateLessThan, $gt: imageDetails.dateGreaterThan };

     if(page?.length==0){return res.status(400).send({status:false,message:"Please enter the page number"})}
     if(limit?.length==0){return res.status(400).send({status:false,message:"Please enter the limit value"})}

     let skip = (page-1)*limit
       

    let imageData = await imageModel.find(imageDetails).sort({uploadedDate:dateSort}).limit(limit).skip(skip)

    let TotalImageCount = imageData.length

    return res.status(500).send({status:true, message:'Success',imageDetails:imageData,TotalImageCount})
    }catch(err){
      return res.status(500).send({status:false,message:err.message})
    }
  }


 

 module.exports.createImage = createImage
module.exports.getImageDetails = getImageDetails