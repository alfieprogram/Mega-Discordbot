
const express = require('express');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Route for the loading screen
app.get('/', (req, res) => {
  res.render('index');
});

// Middleware to serve files from the public directory
app.use('/random', express.static(path.join(__dirname, 'public/api/porn-api/random')));

// Endpoint 1: Returns a random greeting
app.get('/greeting', (req, res) => {
    const greetings = ["Hello", "Hi", "Hey", "Greetings", "Howdy"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    res.json({ message: randomGreeting });
});

// Endpoint 2: Returns a random number
app.get('/random-number-to-hundred', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    res.json({ number: randomNumber });
});

// Endpoint 3: Returns a URL to a random file in the public directory
app.get('/random-nsfw', (req, res) => {
    fs.readdir('./public/api/porn-api/random', (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to access the file directory' });
        }
        if (files.length === 0) {
            return res.status(404).json({ message: 'No files found in the directory' });
        }
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const fileUrl = `${req.protocol}://${req.get('host')}/random/${randomFile}`;
        res.json({ url: fileUrl });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
