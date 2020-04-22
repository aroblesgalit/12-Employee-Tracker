const connection = require("./connection");

function viewAllEmployees() {
    return connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON role_id = role.id
        LEFT JOIN department ON department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    );
}

function viewAllByDepartment(department) {
    return connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON role_id = role.id
        LEFT JOIN department ON department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        WHERE department.name = "${department}"`
    );
}

module.exports = {
    viewAllEmployees,
    viewAllByDepartment,
    connection
}