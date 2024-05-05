//require express for routes
const express = require('express');
//link routes directory
const routes = require('./routes');
//require inquirer
const inquirer = require('inquirer');

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


    inquirer
    .prompt([
        {
            type:'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'Add Employee', 
                'Updated Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
                ]

        }
    ])
    .then((answers) => {
        console.log(answers);
    })
    .catch((error) => {

    });

