const express = require('express');
const path = require("node:path");
const multer = require("multer");
const router = express.Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads/');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// })

/* GET home page. */
// router.get('/upload', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/multipart.html'));
// })
//
// router.post('/upload', upload.single('image'), (req, res) => {
//   console.log(req.file);
//   res.send('ok');
// })

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
