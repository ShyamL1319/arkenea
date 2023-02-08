const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname.substring(0, file.originalname.lastIndexOf(".")) + Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const uploads = multer({ storage })

const upload = uploads.single('profileImg');
module.exports = upload;