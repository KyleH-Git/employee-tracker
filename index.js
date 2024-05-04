//require express for routes
const express = require('express');
//link routes directory
const routes = require('./routes');


//establish PORT for routes
const PORT = process.env.PORT || 3001;
//create an express object to call express methods
const app = express();

//define middleware for express, how to handle urlencoding / json objects for requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//tell the express object to use routes
app.use(routes);

//tell app to begin listening for requests sent to defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  