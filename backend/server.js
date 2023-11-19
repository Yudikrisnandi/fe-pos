const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const app = express();

app.use(cors())
connectDB();

app.get('/', (req, res) => {
  res.send('API running...')
})

app.use('/api/v1/product', require('./router/product'))

app.listen(process.env.PORT || 5000, () => console.log('Server start running'))
