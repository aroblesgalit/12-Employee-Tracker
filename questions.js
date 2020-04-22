const inquirer = require("inquirer");

function mainMenu() {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by Manager",
                "Add an employee",
                "Remove an employee",
                "Update an employee's role",
                "Update an employee's manager",
                "View all roles",
                "Add a role",
                "Remove a role",
                "View all departments",
                "Add a department",
                "Remove a department",
                "View a department's budget",
                "Exit"
            ]
        }
    ])
}

function departmentPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Choose a department to view:",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]

        }
    ])
}

function managerPrompt(managerList) {
    return inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Choose a manager to view:",
            choices: managerList
        }
    ])
}

module.exports = {
    mainMenu,
    departmentPrompt,
    managerPrompt
}