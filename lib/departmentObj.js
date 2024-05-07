const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Department extends Route {
    constructor(userInput){
        super(userInput);
    }

    getAll() {
        console.log('function called')
        fetch('http://localhost:3001/api/department/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                console.table(res.data);
            }
        )}
        )
    };

    addNew() {
        console.log('add new department called');
        inquirer
            .prompt([
                {
                    type:'input',
                    name: 'departmentName',
                    message: 'What is the name of the department?',
                }
            ])
            .then((answer)  => {
                fetch('http://localhost:3001/api/department/add', {
                    method: 'POST',
                    body: JSON.stringify(answer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(function (res) {
                    res.json().then(function (res) {
                        console.log(`Added ${res.rows[0].name} to the database with id of: ${res.rows[0].id}`);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
        });
    }
}
module.exports = Department;