
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image/');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName);
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
};
