const express = require('express');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('✅ Video Backend running'));

app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
