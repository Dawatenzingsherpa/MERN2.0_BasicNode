const multer = require('multer');
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    
    
    const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
    if(!allowedFileTypes.includes(file.mimetype)){
      cb(new Error("This file is not supported"));
      return;
    }
    cb(null,"./storage");
  },
  filename : function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname);
  }
})

module.exports = {multer,storage};