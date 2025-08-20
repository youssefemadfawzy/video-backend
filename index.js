const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());

// إعداد مكان تخزين الفيديوهات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'videos');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// API لرفع الفيديو
app.post('/upload', upload.single('video'), (req, res) => {
  res.json({ message: '🎬 Video uploaded successfully', file: req.file });
});

// API لعرض قائمة الفيديوهات
app.get('/videos', (req, res) => {
  const uploadPath = path.join(__dirname, 'videos');
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read videos' });
    res.json({ videos: files });
  });
});

// API لتحميل فيديو معين
app.get('/videos/:name', (req, res) => {
  const filePath = path.join(__dirname, 'videos', req.params.name);
  res.download(filePath);
});

// صفحة رئيسية للتجربة
app.get('/', (req, res) => {
  res.send('✅ Video backend server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
