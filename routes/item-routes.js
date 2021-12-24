const express = require('express');
const router = new express.Router();
const { ExpressError } = require('../expressError');

const items = require('../fake-db');

// get all shopping list items
router.get('/', (req, res, next) => {
    try {
        return res.json({items : items});
    } catch (error) {
        // If error is thrown, send it to the error handler below.
        console.log(error);
        next(error);
    }
})

// Get single item
router.get('/:name', (req, res, next) => {
    try {
        const matchedItem = items.find(item => item.name === req.params.name);
        console.log(matchedItem);
        // If no match is found, throw an error
        if(matchedItem === undefined) {
            throw new ExpressError('Could not find that item', 400);
        }

        return res.json(matchedItem);

    } catch (error) {
        // If error is thrown, send it to the error handler.
        console.log(error);
        next(error);
    }
})

// Add new item to shopping list
router.post('/', (req, res, next) => {
    try {
        console.log(req.body);
        const newItem = { name : req.body.name, price : req.body.price };
        items.push(newItem);
        return res.status(201).json({ item : newItem });
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        const matchedItem = items.find(item => item.name === req.params.name);
        console.log(matchedItem);
        // If no match is found, throw an error
        if(matchedItem === undefined) {
            throw new ExpressError('Could not find that item', 400);
        }

        // Only update when new credentials exist
        if(req.body.name) {
            matchedItem.name = req.body.name; 
        }

        if (req.body.price) {
            matchedItem.price = req.body.price;
        }

        return res.status(200).json({ item : matchedItem });

    } catch (error) {
        // If error is thrown, send it to the error handler.
        console.log(error);
        next(error);
    }
})

// Delete single item
router.delete('/:name', (req, res, next) => {
    try {
        const matchedIdx = items.findIndex(item => item.name === req.params.name);
        console.log(matchedIdx);
        // If no match is found, throw an error
        if(matchedIdx === -1) {
            throw new ExpressError('Could not find that item', 400);
        }
        const deleted = items.splice(matchedIdx, 1)
        return res.status(200).json({ "Sucessfully deleted" : deleted[0] });

    } catch (error) {
        // If error is thrown, send it to the error handler.
        console.log(error);
        next(error);
    }
})


module.exports = router;
