const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Route for the homepage (displaying the list of items)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();  // Fetch all items from the database
        res.render('index', { items });   // Render the index.ejs page and pass items
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading items');
    }
});

// Create Item
router.get('/add', (req, res) => {
        res.render('add');
        });
        
router.post('/add', async (req, res) => {
        console.log('Adding item with data:', req.body);  // Log the incoming request body
        try {
            const newItem = new Item(req.body);
            await newItem.save();  // Save the new item to the database
            console.log('Item added successfully');  // Log success message
            res.redirect('/');  // Redirect to homepage after adding
        } catch (error) {
            console.error('Error adding item:', error);  // Log the error
            res.status(500).send('Error creating item');
        }
    });

// View Item (GET route)
router.get('/view/:id', async (req, res) => {
        try{
        const item = await Item.findById(req.params.id);
        if (!item) {
                return res.status(404).send('Item not found');
        }
        res.render('view', { item });
        } catch (error){
                console.error('Error fetching item:', error);
                res.status(500).send('Error fetching item');
        }
        
    });

// Edit Item (GET route)
router.get('/edit/:id', async (req, res) => {
        const item = await Item.findById(req.params.id);
        res.render('edit', { item });
    });
    

// Update Item (PUT route)
router.post('/edit/:id', async (req, res) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.redirect('/');  // Redirect after updating
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).send('Error updating item');
        }
    });

// Delete Item (DELETE route)
router.post('/delete/:id', async (req, res) => {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/');  // Redirect after deleting
    });
    

module.exports = router;
