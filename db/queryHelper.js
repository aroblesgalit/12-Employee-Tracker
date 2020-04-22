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

function viewAllByManager(first_name, last_name) {
    return connection.query(
        `SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
        FROM employee AS manager
        RIGHT JOIN employee ON employee.manager_id = manager.id
        RIGHT JOIN role ON employee.role_id = role.id
        RIGHT JOIN department ON department_id = department.id
        WHERE manager.first_name = "${first_name}" AND manager.last_name = "${last_name}"`
    );
}

async function getAllManager() {
    try {
        const managerList = await connection.query(
            `SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
            FROM employee AS manager
            RIGHT JOIN employee ON employee.manager_id = manager.id
            RIGHT JOIN role ON employee.role_id = role.id
            RIGHT JOIN department ON department_id = department.id`
        );
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

module.exports = {
    viewAllEmployees,
    viewAllByDepartment,
    getAllManager,
    viewAllByManager,
    connection
}