const queryHelper = require("./db/queryHelper");
const questions = require("./questions");

async function main() {
    try {

        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

main();

async function mainMenu() {
    try {
        // Prompt for mainMenu()
        const { action } = await questions.mainMenu();

        if (action === "Exit") {
            // End connection
            queryHelper.connection.end();

        } else if (action === "View all employees") {
            // Use queryHelper to view all employees
            const data = await queryHelper.viewAllEmployees();
            // Log data to a table
            console.table(data);
            // Run mainMenu()
            mainMenu();

        } else if (action === "View all employees by department") {
            // Prompt user for a department
            const { department } = await questions.departmentPrompt();
            // Then pass the chosen department into query viewAllByDepartment
            const data = await queryHelper.viewAllByDepartment(department);
            // Log data to a table
            console.table(data);
            // Run mainMenu()
            mainMenu();

        } else if (action === "View all employees by Manager") {
            // Get manager list using query getAllManager()
            const managerList = await queryHelper.getAllManager();
            // Prompt user for a manager
            const { manager } = await questions.managerPrompt(managerList);
            // Split manager's name into an array of first and last name
            const managerName = await manager.split(" ");
            // Pass first and last name to query viewAllByManager
            const data = await queryHelper.viewAllByManager(managerName[0], managerName[1]);
            // Log data to a table
            console.table(data);
            // Run mainMenu()
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

        } else if (action === "Remove an employee") {
            // Get list of employees
            const employeeNames = await queryHelper.getAllEmployeeNames();
            // Prompt user to choose an employee
            const { employee } = await questions.chooseEmployee(employeeNames);
            // Split employee name into an array of first and last name
            const chosenEmployee = await employee.split(" ");
            // Get id of employee by first and last name
            const employeeData = await queryHelper.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // Use id and pass it on to query to remove employee
            await queryHelper.removeEmployee(id);
            // Run mainMenu()
            mainMenu();

        } else if (action === "Update an employee's role") {
            // Get list of employees and roles
            const employeeNames = await queryHelper.getAllEmployeeNames();
            const { roleTitles, roleList } = await queryHelper.getAllRoles();
            // Prompt user to choose an employee and a role
            const { employee, role } = await questions.updateEmployeeRole(employeeNames, roleTitles);
            // Split employee name into an array of first and last name
            const chosenEmployee = await employee.split(" ");
            // Use role data to get its id
            const chosenRole = roleList.filter(roleItem => roleItem.title === role);
            const role_id = chosenRole[0].id;
            // Get id of employee by first and last name
            const employeeData = await queryHelper.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // Use role_id and id and pass them on to query to update employee's role
            await queryHelper.updateEmployeeRole(role_id, id);
            // Run mainMenu()
            mainMenu();

        } else if (action === "Update an employee's manager") {
            // Get list of of employees and managers
            const employeeNames = await queryHelper.getAllEmployeeNames();
            const managerList = await queryHelper.getAllManager();
            // Prompt user for the employee and manager
            const { employee, manager } = await questions.updateEmployeeManager(employeeNames, managerList);
            // Split employee name into an array of first and last name
            const chosenEmployee = await employee.split(" ");
            // Get id of employee by first and last name
            const employeeData = await queryHelper.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // Split manager's name into an array of first and last name
            const managerName = await manager.split(" ");
            // Pass first and last name to query viewAllByManager and get id of manager
            const data = await queryHelper.viewAllByManager(managerName[0], managerName[1]);
            const manager_id = data[0].id;
            // Pass manager_id and id into query to update an employee's manager
            await queryHelper.updateEmployeeManager(manager_id, id);
            // Run mainMenu()
            mainMenu();

        } else if (action === "View all roles") {
            // Use query to viewAllRoles
            const data = await queryHelper.viewAllRoles();
            // Log data to a table
            console.table(data);
            // Run mainMenu()
            mainMenu();
            
        }

    } catch (err) {
        console.log(err);
    }
};