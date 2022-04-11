const { imageUpload } = require("../controllers/post");
const express = require("express");
const router = express.Router();

router.post("/upload_files", imageUpload)

module.exports = router;