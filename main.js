const queryHelper = require("./db/queryHelper");
const questions = require("./questions");

async function main() {
    try {

        mainMenu();

    } catch(err) {
        console.log(err);
    }
};

main();

async function mainMenu() {
    try {
        const { action } = await questions.mainMenu();
        if (action === "Exit") {
            queryHelper.connection.end();
        } else if (action === "View all employees") {
            const data = await queryHelper.viewAllEmployees();
            console.table(data);
            mainMenu();
        } else if (action === "View all employees by department") {
            const { department } = await questions.departmentPrompt();
            const data = await queryHelper.viewAllByDepartment(department);
            console.table(data);
            mainMenu();
        } else if (action === "View all employees by Manager") {
            console.log("Viewing all employees by Manager");
            mainMenu();
        }
    } catch(err) {
        console.log(err);
    }
};