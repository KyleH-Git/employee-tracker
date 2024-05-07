const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Role extends Route {
    constructor(userInput){
        super(userInput);
    }

    getAll() {
        console.log('function called')
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                console.log('role id    job title    department    salary \n------------   --------------');
                console.log(res);
                res.data.forEach(role => {
                    console.log(` ${role.id}     ${role.title}     ${role.department}        ${role.salary}`);
                });
            });
        });
    };

    addNew() {
        let department = [];
        let id = [];
        console.log('add new role called');
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(role => {
                    department.push(role.title);
                    id.push(role.id);
                })
                console.log(department);
            })
        })
        
        inquirer
            .prompt([
                {
                    type:'input',
                    name: 'roleTitle',
                    message: 'What is the name of the role?',
                },
                {
                    type:'input',
                    name: 'roleSalary',
                    message: 'What is the salary of the role?',
                },
                {
                    type:'list',
                    name: 'roleDepartment',
                    message: 'What is the department of the role?',
                    choices: department,
                },
            ])
            .then((answer)  => {
                fetch('http://localhost:3001/api/role/add', {
                    method: 'POST',
                    body: JSON.stringify(answer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(function (res) {
                    res.json().then(function (res) {
                        console.log(res);
                        console.log(`Added ${res.rows[0].title} to the database with id of: ${res.rows[0].id}`);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
        });
    }
}

module.exports = Role;