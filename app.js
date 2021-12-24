const express = require('express');


const itemRoutes = require('./routes/item-routes');

const app = express();

// To parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.use('/api/items', itemRoutes);

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status).send(error.message);
})


module.exports = app;