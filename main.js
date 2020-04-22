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
            const data = await queryHelper.viewAllByManager(managerName[0], managerName[1]);
            console.table(data);
            mainMenu();
        } else if (action === "Add an employee") {
            // Need list of roles and managers
            const managerList = await queryHelper.getAllManager();
            const { roleTitles, roleList } = await queryHelper.getAllRoles();
            // Run prompt and get data
            const { first_name, last_name, role, manager } = await questions.addEmployeePrompt(roleTitles, managerList);
            // Use role and manager data to get id's
            const chosenRole = roleList.filter(roleItem => roleItem.title === role);
            const role_id = chosenRole[0].id;
            const chosenManager = await manager.split(" ");
            const data = await queryHelper.viewAllByManager(chosenManager[0], chosenManager[1]);
            const manager_id = data[0].id;
            // Use data for first_name, last_name, role_id, and manager_id and queryHelper to add employee
            await queryHelper.addEmployee(first_name, last_name, role_id, manager_id);
            // Run mainMenu()
            mainMenu();
        }
    } catch(err) {
        console.log(err);
    }
};