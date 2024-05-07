//require express for routes
const express = require('express');
//link routes directory
const routes = require('./routes/index.js');
//require inquirer
const inquirer = require('inquirer');
//import route objects
const Department = require('./lib/departmentObj.js');
const Role = require('./lib/roleObj.js');
const Employee = require('./lib/employeeObj.js');

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
//create department/role/employee objects to call their functions
const department = new Department;
const role = new Role;
const employee = new Employee;

function getUserInput() {
    inquirer
        .prompt([
            {
                type:'list',
                name: 'userInput',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee', 
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'View Specific Department',
                    'Add Department',
                    'Quit',
                    ]

            }
        ])
        .then(async (answer)  => {
            
            switch(answer.userInput) {
                case 'Quit':
                    console.log('Closing application.')
                    process.exit(1);
                case 'View All Departments':
                    console.log('department all checked');
                    await department.getAll();
                    break;
                case 'View All Roles':
                    console.log('role all checked');
                    await role.getAll();
                    break;
                case 'View All Employees':
                    console.log('employee all checked');
                    await employee.getAll();
                    break;
                case 'Add Department':
                    console.log('add new department');
                    await department.addNew();
                    break;
                case 'Add Role':
                    console.log('add new role');
                    await role.addNew();
                    break;
                case 'Add Employee':
                    console.log('add new employee');
                    await employee.addNew();
                    break;
                case 'Update Employee Role':
                    console.log('update employee');
                    await employee.update();
                    break;
                default:
                    console.log('error');
            }
        })
}
getUserInput();
