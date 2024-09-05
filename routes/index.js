const express = require('express');
const path = require("node:path");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World');
  res.render('index', { title: 'Express' });
});

router.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
})

router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
})

module.exports = router;
