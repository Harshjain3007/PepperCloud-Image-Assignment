const aws=require("aws-sdk")

aws.config.update({
    accessKeyId:"AKIAY3L35MCRZNIRGT6N",
    secretAccessKey:"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",
    region : "ap-south-1",
  })

let uploadFile=(file)=>{    
    return new Promise((resolve,reject)=>{
    let s3=new aws.S3({apiversion:'2006-03-01'});
    var uploadParams={
        ACL:"public-read",
        Bucket:"classroom-training-bucket",
        Key:"user-profileimages-63/"+Date.now()+file.originalname,
        Body:file.buffer
    }
    s3.upload(uploadParams,function (err,data){
        if(err)return reject({error:err.message})
        return resolve(data.Location)
    })})
}
  
module.exports={uploadFile}