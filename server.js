require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const File = require('./models/File');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });

    await newFile.save();
    res.json({ file: newFile });
  } catch (err) {
    res.status(500).json({ error: 'Error saving file' });
  }
});

// Get file endpoint
app.get('/file/:filename', async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', file.contentType);
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving file' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Fetch all applications
app.get('/applications', async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

// Update application status
app.put('/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedFile = await File.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedFile) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(updatedFile);
  } catch (err) {
    res.status(500).json({ error: 'Error updating application' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
