const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const GALLERY_PATH = path.join(__dirname, 'assets/img/gallery');
const INTERIOR_PATH = path.join(__dirname, 'assets/img/interior');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

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

app.post('/send', async (req, res) => {
  const { firstname, phone, email, message } = req.body;

  // Konfigurē Nodemailer
  const transporter = nodemailer.createTransport({
      service: 'Gmail', // vai citu, piem. 'Outlook', 'Yahoo'
      auth: {
          user: '15saveika@gmail.com', // ievietot rarina email vēlāk
          pass: 'hbfl fryy nerx wkwt' // App Password
      }
  });

  const mailOptions = {
      from: email,
      to: '15saveika@gmail.com',
      subject: 'Jauns ziņojums no rarina.com vietnes',
      text: `Vārds: ${firstname}\nTālrunis: ${phone}\nE-pasts: ${email}\nZiņa: ${message}`
  };

  try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Ziņa veiksmīgi nosūtīta!');
  } catch (error) {
      console.error('Sūtīšanas kļūda:', error);
      res.status(500).send('Kļūda, nosūtot ziņu.');
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/events.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/gallery.html'));
});

app.get('/prices', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/prices.html'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
