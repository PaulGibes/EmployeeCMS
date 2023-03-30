const inquirer = require("inquirer");
const db = require("./db/db.js");

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
          "Update Employee Managers",
          "View Employees By Manager",
          "View Employees By Department",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Department Budgets",
        ],
      },
    ])
    .then(async (data) => {
      switch (data.choices) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
        case "Update Employee Managers":
          updateEmployeeManager();
          break;
        case "View Employees By Manager":
          viewEmployeesByManager();
          break;
        case "View Employees By Department":
          viewEmployeesByDepartment();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

viewAllEmployees = () => {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
};

init();
