// upload.js
const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// AWS config
AWS.config.update({
  region: "us-east-1", // change to your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: fileContent,
    };

    const result = await s3.upload(params).promise();

    fs.unlinkSync(req.file.path); // cleanup temp file

    res.json({ message: "File uploaded successfully", url: result.Location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
