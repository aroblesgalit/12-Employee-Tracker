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
            const managerList = await queryHelper.getAllManager();
            const { manager } = await questions.managerPrompt(managerList);
            const managerName = await manager.split(" ");
            const first_name = managerName[0];
            const last_name = managerName[1];
            const data = await queryHelper.viewAllByManager(first_name, last_name);
            console.table(data);
            mainMenu();
        }
    } catch(err) {
        console.log(err);
    }
};