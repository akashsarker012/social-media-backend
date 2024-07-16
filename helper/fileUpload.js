const multer = require('multer');
const path = require('path');

// Define storage for the multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    console.log(file.originalname);
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Export the multer single file upload middleware
module.exports = upload.single('image');
