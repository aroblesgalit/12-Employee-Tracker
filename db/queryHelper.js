const connection = require("./connection");

// Query for employee table
const viewAllEmployeesQuery = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role_id = role.id
    LEFT JOIN department ON department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
`

// Query for viewing manager table
const viewByManagerQuery = `
    SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
    FROM employee AS manager
    RIGHT JOIN employee ON employee.manager_id = manager.id
    RIGHT JOIN role ON employee.role_id = role.id
    RIGHT JOIN department ON department_id = department.id
`

// Query for viewing role table
const viewAllRolesQuery = `
    SELECT role.id, role.title, role.salary, department.name
    FROM role
    LEFT JOIN department ON department_id = department.id
`

// Query for viewing department table
const viewAllDepartmentsQuery =`
    SELECT * FROM department
`

// Query to view all employees
function viewAllEmployees() {
    return connection.query(viewAllEmployeesQuery);
}

// Query to view employees by department
function viewAllByDepartment(department) {
    return connection.query(viewAllEmployeesQuery + " WHERE department.name = ?", [department]);
}

// Query to view employee by manager
function viewAllByManager(first_name, last_name) {
    return connection.query(viewByManagerQuery + " WHERE manager.first_name = ? AND manager.last_name = ?", [first_name, last_name]);
}

// Function to get an array of existing manager names
async function getAllManager() {
    try {
        // Get list of managers
        const managerList = await connection.query(viewByManagerQuery);
        // Declare an empty array for names of managers
        const managerNames = [];
        // Loop through list of managers and push the names into managerNames
        await managerList.forEach(manager => {
            if (manager.manager !== null) {
                managerNames.push(manager.manager);
            }
        });
        // Declare empty array for no duplicate names
        const managerNamesFiltered = [];
        // Loop through managerNames and push the names only if it hasn't been pushed yet
        await managerNames.forEach(manager => {
            if (managerNamesFiltered.indexOf(manager) < 0) {
                managerNamesFiltered.push(manager)
            }
        });
        // Return the array managerNamesFiltered
        return managerNamesFiltered;
    } catch (err) {
        console.log(err);
    }
}

// Function to get an array of all the existing roles
async function getAllRoles() {
    try {
        const roleList = await connection.query(viewAllRolesQuery);
        const roleTitles = [];
        await roleList.forEach(role => {
            roleTitles.push(role.title);
        });
        return { roleTitles, roleList };
    } catch (err) {
        console.log(err);
    }
}

// Query to add an employee
function addEmployee(first_name, last_name, role_id, manager_id) {
    return connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
}

// Function to get all names of employees
async function getAllEmployeeNames() {
    try {
        // Get complete list of employees
        const employeeList = await viewAllEmployees();
        // Store employee names into an array
        const employeeNames = employeeList.map(employee => {
            return employee.first_name + " " + employee.last_name;
        });
        // Return an array of employee names and the employee list
        return employeeNames;

    } catch (err) {
        console.log(err);
    }
}

// Query to remove an employee by id
function removeEmployee(id) {
    return connection.query("DELETE FROM employee WHERE id = ?", [id]);
}

// Query to get an employee by first and last name
function getEmployeebyName(first_name, last_name) {
    return connection.query(viewAllEmployeesQuery + " WHERE employee.first_name = ? AND employee.last_name = ?", [first_name, last_name]);
}

// Query to update the role of an employee
function updateEmployeeRole(role_id, id) {
    return connection.query("UPDATE employee SET role_id = ? WHERE employee.id = ?", [role_id, id]);
}

// Query to update the manager of an employee
function updateEmployeeManager(manager_id, id) {
    return connection.query("UPDATE employee SET manager_id = ? WHERE employee.id = ?", [manager_id, id]);
}

// Query to view all roles
function viewAllRoles() {
    return connection.query(viewAllRolesQuery);
}

// Query to add a role
function addRole(title, salary, department_id) {
    return connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department_id]); 
}

// Function to get an array of all deparments
async function getAllDeparments() {
    try {
        const departmentList = await connection.query(viewAllDepartmentsQuery);
        const departmentNames = [];
        await departmentList.forEach(department => {
            departmentNames.push(department.name);
        });
        return { departmentNames };
    } catch (err) {
        console.log(err);
    }
}

// Query to get a department by name
function getDepartmentByName(name) {
    return connection.query(viewAllDepartmentsQuery + " WHERE name = ?", [name])
}

// Query for removing a role
function removeRole(title) {
    return connection.query("DELETE FROM role WHERE title = ?", [title]);
}

// Query to view all departments
function viewAllDepartments() {
    return connection.query(viewAllDepartmentsQuery);
}

// Query to add a department
function addDepartment(name) {
    return connection.query("INSERT INTO department (name) VALUES (?)", [name]);
}

// Query to remove a department
function removeDepartment(name) {
    return connection.query("DELETE FROM department WHERE name = ?", [name]);
}

module.exports = {
    viewAllEmployees,
    viewAllByDepartment,
    getAllManager,
    viewAllByManager,
    getAllRoles,
    addEmployee,
    getAllEmployeeNames,
    removeEmployee,
    getEmployeebyName,
    updateEmployeeRole,
    updateEmployeeManager,
    viewAllRoles,
    addRole,
    getAllDeparments,
    getDepartmentByName,
    removeRole,
    viewAllDepartments,
    addDepartment,
    removeDepartment,
    connection
}