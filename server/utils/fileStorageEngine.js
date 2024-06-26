const multer = require("multer");


const setDestination = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, "./files/images");

    } else if ( file.mimetype == "application/pdf" || 
                file.mimetype == "application/msword" || 
                file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                file.mimetype == "application/vnd.ms-excel" ||
                file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.mimetype == "application/vnd.ms-powerpoint" ||
                file.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" 

                ) {
        cb(null, "./files/uploads");
    }
}

const setFileName = (req, file, cb) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    cb(null, formattedDate + "--" + file.originalname);
}

const storage = multer.diskStorage({
    destination: setDestination ,
    filename: setFileName

});

module.exports = upload = multer({
    storage: storage
  });