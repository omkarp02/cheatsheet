const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace <DB_URI> with your MongoDB connection string
const dbURI = 'mongodb+srv://opwebdev:Omkar^100@omkar.iuqcpfi.mongodb.net/testdb';

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware and routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
