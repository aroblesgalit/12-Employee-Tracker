const connection = require("./connection");

function viewAllEmployees() {
    return connection.query(
        `SELECT employee.id, first_name, last_name, title, salary
        FROM employee
        INNER JOIN role WHERE role_id = role.id`
    );
}

module.exports = {
    viewAllEmployees,
    connection
}