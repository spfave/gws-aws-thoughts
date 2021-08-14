const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../utils/params-config');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

// 'image' is the key
const upload = multer({ storage }).single('image');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

router.post('/image-upload', upload, (req, res) => {
  const params = paramsConfig(req.file);

  // set up S3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;
