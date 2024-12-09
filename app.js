const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');  // Allow POST to simulate PUT/DELETE
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRoute = require('./routes/items');  // Correct path to routes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));  // Body parser for form submissions
app.use(bodyParser.json());                          // For JSON requests
app.use(cors());                                    // Cross-origin resource sharing
app.use(express.static('public'));                  // Serve static files (CSS, JS, etc.)
app.use(methodOverride('_method'));                 // Allow method overrides (e.g., PUT, DELETE)

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Use the routes defined in 'items.js' for the root path
app.use('/', itemsRoute);  // Routes should be available from the root path

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
