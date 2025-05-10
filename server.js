const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const GALLERY_PATH = path.join(__dirname, 'assets/img/gallery');
const INTERIOR_PATH = path.join(__dirname, 'assets/img/interior');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API to list image filenames
app.get('/api/gallery', (req, res) => {
  fs.readdir(GALLERY_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read gallery folder' });
    }
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    res.json(imageFiles);
  });
});

app.get('/api/interior', (req, res) => {
  fs.readdir(INTERIOR_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read interior folder' });
    }
    const interiorImgFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    res.json(interiorImgFiles);
  });
});

app.get('/api/event_data', (req, res) => {
  fs.readFile(path.join(__dirname, 'mock', 'event_data.json'), 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading event_data.json:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      try {
          const event_data = JSON.parse(data);
          res.json(event_data);
      } catch (error) {
          console.error('Error parsing event_data.json:', error);
          res.status(500).send('Internal Server Error');
      }
  });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, 'events.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'gallery.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
