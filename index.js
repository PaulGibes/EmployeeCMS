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

addEmployee = async () => {
  const [roles] = await db
    .promise()
    .query("SELECT title AS name, id AS value FROM role;");
  const [employees] = await db
    .promise()
    .query(
      "SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee;"
    );
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: employees,
      },
    ])
    .then((data) => {
      db.promise().query("INSERT INTO employee SET ?;", [data]).then(init);
    });
};

updateRole = async () => {
  const [roles] = await db
    .promise()
    .query("SELECT title AS name, id AS value FROM role;");
  const [employees] = await db
    .promise()
    .query(
      `SELECT CONCAT(first_name," ", last_name) AS name, id AS value FROM employee;`
    );
  inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Who is the Employee that you would like to update?",
        choices: employees,
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the new role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is their manager?",
        choices: employees,
      },
    ])
    .then((data) => {
      db.promise()
        .query(
          "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?;",
          [data.role_id, data.manager_id, data.id]
        )
        .then(init);
    });
};

viewAllRoles = async () => {
  db.query(
    `SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
};

addRole = async () => {
  const [departments] = await db
    .promise()
    .query("SELECT name, id AS value FROM department;");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary for the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What department does this role belong to?",
        choices: departments,
      },
    ])
    .then((data) => {
      db.promise().query("INSERT INTO role SET ?;", [data]).then(init);
    });
};

viewAllDepartments = async () => {
  db.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

addDepartment = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) VALUES ('${data.name}')`,
        (err, res) => {
          if (err) throw err;
          init();
        }
      );
    });
};

quit = async () => {
  db.end();
};

init();
