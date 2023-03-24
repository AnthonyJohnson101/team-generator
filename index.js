const inquirer = require("inquirer")
const fs = require("fs")

//Class imports
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const teamArr = []

function startPrompt () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'Add Manager', 'Add Engineer', 'Add Intern', 'Generate Team'    
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'Add Manager':
                managerGen(); 
                break;   

            case 'Add Engineer':
                engineerGen();
                break;

            case 'Add Intern':
                internGen();
                break;

            case 'Generate Team':
                htmlGen();
                break;
        }
    })
}

function managerGen () {
    inquirer.prompt([
        {   
            type: 'input',
            name: 'name',
            message: 'What\'s the manager\'s name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'what\'s the manager\'s name?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What\'s the manager\'s email?'
        },
        {
            type: 'input',
            name: 'officeNum',
            message: 'What\'s the manager\'s office number?'
        }
    ]).then (res =>{
        const manager = new Manager(res.name, res.id, res.email, res.officeNum) 
        teamArr.push(manager)
        startPrompt();
    })
}

function engineerGen () {
    inquirer.prompt([
        {   
            type: 'input',
            name: 'name',
            message: 'What\'s the engineer\'s name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'what\'s the engineer\'s name?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What\'s the engineer\'s email?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What\'s the engineer\'s github?'
        }
    ]).then (res =>{
        const engineer = new Engineer(res.name, res.id, res.email, res.github) 
        teamArr.push(engineer)
        startPrompt();
    })
}

function internGen () {
    inquirer.prompt([
        {   
            type: 'input',
            name: 'name',
            message: 'What\'s the intern\'s name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'what\'s the intern\'s name?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What\'s the intern\'s email?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school does the intern go to?'
        }
    ]).then (res =>{
        const intern = new Intern(res.name, res.id, res.email, res.school) 
        teamArr.push(intern)
        startPrompt();
    })
}

function htmlGen(teamArr){
    const html = writeHTML(teamArr)
    writeToFile("./dist/index.html", html)
}











startPrompt();