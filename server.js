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

async function getUserInput() {
    console.log('\n\n\n');
    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'userInput',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'View Employees By Manager',
                    'View Employees By Department',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role/Manager',
                    'Delete Department',
                    'Delete Role',
                    'Delete Employee',
                    'View Department Budget Total',
                    'Quit',
                ]
            }
        ])
        .then(async (answer) => {
            switch (answer.userInput) {
                case 'Quit':
                    console.log('Closing application.')
                    process.exit(1);
                case 'View All Departments':
                    await department.getAll();
                    break;
                case 'View All Roles':
                    await role.getAll();
                    break;
                case 'View All Employees':
                    await employee.getAll();
                    break;
                case 'Add Department':
                    await department.addNew();
                    break;
                case 'Add Role':
                    await role.addNew();
                    break;
                case 'Add Employee':
                    await employee.addNew();
                    break;
                case 'Update Employee Role/Manager':
                    await employee.update();
                    break;
                case 'View Employees By Manager':
                    await employee.getByManager();
                    break;
                case 'View Employees By Department':
                    await employee.getByDepartment();
                    break;
                case 'Delete Department':
                    await department.delete();
                    break;
                case 'Delete Role':
                    await role.delete();
                    break;
                case 'Delete Employee':
                    await employee.delete();
                    break;
                case 'View Department Budget Total':
                    await department.departmentBudget();
                    break;
                default:
                    console.log('error: default case');
                    break;
            }
            return;
        });

}

getUserInput();