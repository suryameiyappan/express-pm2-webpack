var express = require("express");
var router = express.Router();
var multer = require("multer");

/* GET users listing. */
router.get("/file-upload", function (req, res, next) {
  let meta = {};
  meta.description = "upload file";
  meta.title = "upload file";
  res.render("upload", { metaData: meta });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/file-upload", upload.single("myfile"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: res.req.file.filename,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Error uploading file.",
      code: 500,
    });
  }
});

module.exports = router;
