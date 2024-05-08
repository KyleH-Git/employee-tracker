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

                console.table(res.data);
                    
                });
            });
        }
    

    addNew() {
        let roles = [];
        let roleId = [];
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(role => {
                    roles.push(role.title);
                    roleId.push(role.id);
                })
            })
        });

        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(employee => {
                    employees.push(`${employee.first_name} ${employee.last_name}`);
                    employeesId.push(employee.id)
                    
                })
            })
        });

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
                    choices: roles,
                },
                {
                    type:'list',
                    name:'employeeManager',
                    message: 'Who is the employee\'s manager?',
                    choices: employees,
                }
            ])
            .then((answer)  => {
                answer.employeeRole = roleId[roles.indexOf(answer.employeeRole)];
                answer.employeeManager = employeesId[employees.indexOf(answer.employeeManager)]
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
        console.log('update employee called');
        let roles = [];
        let roleId = [];
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(role => {
                    roles.push(role.title);
                    roleId.push(role.id);
                })
            })
        });

        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(employee => {
        
                    employees.push(`${employee.first_name} ${employee.last_name}`);
                    employeesId.push(employee.id)      
                })
            })
        });

        inquirer
            .prompt([
                {
                    type:'input',
                    name:'dummy',
                    message: 'is this a bug?'
                },
                {
                    type:'list',
                    name:'employeeUpdate',
                    message: 'Who is the employee to update?',
                    choices: employees,
                },
                {
                    type:'list',
                    name: 'employeeRole',
                    message: 'What is the employee\'s role?',
                    choices: roles,
                },
                {
                    type:'list',
                    name:'employeeManager',
                    message: 'Who is the employee\'s manager?',
                    choices: employees,
                },
            ])
            .then((answer)  => {
                answer.employeeUpdate = employeesId[employees.indexOf(answer.employeeUpdate)];
                answer.employeeRole = roleId[roles.indexOf(answer.employeeRole)];
                answer.employeeManager = employeesId[employees.indexOf(answer.employeeManager)];
                console.log('reached here 1');
                fetch('http://localhost:3001/api/employee/update', {
                    method: 'PUT',
                    body: JSON.stringify(answer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(function (res) {
                    res.json().then(function (res) {
                        console.log(`Updated ${res.rows[0].first_name} ${res.rows[0].last_name} with the role of ${roles[roleId.indexOf(res.rows[0].role)]} and manager ${employees[employeesId.indexOf(res.rows[0].manager)]}.`);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
        });
    }
}

module.exports = Employee;