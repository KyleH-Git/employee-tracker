const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Employee extends Route {
    constructor(userInput){
        super(userInput);
    }

    getAll() {
        console.log('function called')
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                console.log(res);
                console.log('Employee ID      First Name       Last Name     Job Title    Department     Salary    Manager\n------------   --------------');
                res.data.forEach(employee => {
                    console.log(`${employee.id}      ${employee.first_name}          ${employee.last_name}              ${employee.manager}`);
                });
            });
        });
    };

    addNew() {
        console.log('add new employee called');
        inquirer
            .prompt([
                {
                    type:'input',
                    name: 'employeeFirst',
                    message: 'What is the employee\'s first name?',
                },
                {
                    type:'input',
                    name: 'employeeLast',
                    message: 'What is the employee\'s last name?',
                },
                {
                    type:'list',
                    name: 'employeeRole',
                    message: 'What is the employee\'s role?',
                    choices: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        ]
                },
                {
                    type:'list',
                    name:'employeeManager',
                    message: 'Who is the employee\'s manager?',
                    choices: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                    ]
                }
            ])
            .then((answer)  => {
                fetch('http://localhost:3001/api/employee/add', {
                    method: 'POST',
                    body: JSON.stringify(answer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(function (res) {
                    res.json().then(function (res) {
                        console.log(res);
                        console.log(`Added ${res.rows[0].first_name} ${res.rows[0].last_name} to the database with id of: ${res.rows[0].id}`);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
        });
    }

    update(){

    }
}

module.exports = Employee;