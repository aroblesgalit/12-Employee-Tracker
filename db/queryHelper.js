const connection = require("./connection");

const viewAllEmployeesQuery = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role_id = role.id
    LEFT JOIN department ON department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
`

const viewByManagerQuery = `
    SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
    FROM employee AS manager
    RIGHT JOIN employee ON employee.manager_id = manager.id
    RIGHT JOIN role ON employee.role_id = role.id
    RIGHT JOIN department ON department_id = department.id
`

const viewAllRoles = `
    SELECT * FROM role
`

function viewAllEmployees() {
    return connection.query(viewAllEmployeesQuery);
}

function viewAllByDepartment(department) {
    return connection.query(viewAllEmployeesQuery + " WHERE department.name = ?", [department]);
}

function viewAllByManager(first_name, last_name) {
    return connection.query(viewByManagerQuery + " WHERE manager.first_name = ? AND manager.last_name = ?", [first_name, last_name]);
}

async function getAllManager() {
    try {
        const managerList = await connection.query(viewByManagerQuery);
        const managerListNames = [];
        await managerList.forEach(manager => {
            if (manager.manager !== null) {
                managerListNames.push(manager.manager);
            }
        });
        const managerListFiltered = [];
        await managerListNames.forEach(manager => {
            if (managerListFiltered.indexOf(manager) < 0) {
                managerListFiltered.push(manager)
            }
        });
        return managerListFiltered;
    } catch (err) {
        console.log(err);
    }
}

async function getAllRoles() {
    try {
        const roleList = await connection.query(viewAllRoles);
        const roleTitles = [];
        await roleList.forEach(role => {
            roleTitles.push(role.title);
        });
        return {roleTitles, roleList};
    } catch (err) {
        console.log(err);
    }
}

function addEmployee(first_name, last_name, role_id, manager_id) {
    return connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
}

module.exports = {
    viewAllEmployees,
    viewAllByDepartment,
    getAllManager,
    viewAllByManager,
    getAllRoles,
    addEmployee,
    connection
}