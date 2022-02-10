const multer = require('multer');

let storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../public/img')
    },
    filename:function(req,file,callback){
        callback(null,Date.now()+"-"+file.originalname)
    }
})

const uploader = multer({storage:storage});

module.exports = uploader;