// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // To parse incoming URL-encoded data

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection (remove deprecated options)
const dbURI = 'mongodb://localhost:27017/weatherApp'; // Your database URI

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Sample schema and model for a "City" collection
const citySchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  condition: String,
});

const City = mongoose.model('City', citySchema);

// Example route to get weather info (this is a placeholder, replace it with actual logic)
app.get('/weather/:cityName', async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const city = await City.findOne({ name: cityName });
    if (city) {
      res.json({
        name: city.name,
        temperature: city.temperature,
        condition: city.condition,
      });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Example route for handling the contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // You can add logic to save the contact form data to the database
  // For now, we just log it
  console.log(`New contact form submission: \nName: ${name} \nEmail: ${email} \nMessage: ${message}`);

  res.status(200).json({ message: 'Thank you for reaching out!' });
});

// Default route to serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
