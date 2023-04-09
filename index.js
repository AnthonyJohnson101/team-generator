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
                htmlGen(teamArr);
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
            message: 'what\'s the manager\'s ID?'
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
            message: 'what\'s the engineer\'s ID?'
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
            message: 'what\'s the intern\'s ID?'
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


function writeHTML(teamArr){
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
        <title>Team Members</title>
    </head>
    <body class="bg-secondary">
        <div class="d-flex flex-column align-items-center" style="position:relative; min-height:100vh; padding-bottom: 10vh;">
            <nav class="navbar container-fluid d-flex justify-content-center bg-info opacity-25" style="height:15vh">
                <h1>My Team</h1>
            </nav>
            <main class="d-flex p-4 flex-wrap justify-content-center align-items-center"style="flex: 1 1 auto">
                ${buildCards(teamArr)}
            </main>
            <footer class="container-fluid d-flex justify-content-center align-items-center bg-info opacity-25" style="height:10vh; position: absolute; bottom: 0;">
            </footer>
        </div>
    </body>
</html>
        `
}

//Writes the html file
function writeToFile(fileName, content){
    fs.writeFile(fileName, content, (err) =>
    err ? console.log(err) : console.log(`Created ${fileName}`)
)}

//Builds out our team cards with html. Uses a switch and template literals to dynamically produce cards based on each team member's roles.
function buildCards(teamArr){
    const cards = teamArr.map(member=>{

        let special;
        let desc;
        let tag;
        let symbol;
        let link = ''
        let style = ''
        let target = ''

        switch(member.getRole()){
            case "Manager": {
                special = member.officeNum
                tag = "li"
                desc = "Office #:"
                symbol = `<i class="fa-solid fa-mug-hot"></i>`
                break
            }
            case "Engineer": {
                special = member.getGithub()
                tag = "a"
                desc = `<i class="fa-brands fa-github"></i>`
                link = `https://github.com/${special}`
                style = 'link-primary'
                target = '_blank'
                symbol = `<i class="fa-solid fa-gear"></i>`
                break
            }
            case "Intern" : {
                special = member.getSchool()
                tag = "li"
                desc = `<i class="fa-solid fa-school"></i>`
                symbol = `<i class="fa-sharp fa-solid fa-graduation-cap"></i>`
                break
            }
            default: break
        }

        return `
                <div class="card m-4" style="width: 15rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px rgba(0, 0, 0, 0.581); word-break: break-all">
                    <div class="card-body">
                        <h5 class="card-title">${member.getName()}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${symbol} ${member.getRole()}</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${member.getId()}</li>
                            <a href="mailto:${member.getEmail()}"  class="list-group-item"><i class="fa fa-envelope""></i> <span class="link-primary">${member.getEmail()}</span></a>
                            <${tag} href="${link}" target="${target}" class="list-group-item">${desc} <span class=${style}>${special}</span></${tag}>
                        </ul>
                    </div>
                </div>`
    })
    return cards.join("")
}








startPrompt();