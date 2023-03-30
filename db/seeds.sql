INSERT INTO department (name)
VALUES("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("HR"), ("Corporate");

INSERT INTO role (title, salary, department_id)
VALUES("Manager", 2042, 6), ("Sales Lead", 50, 1), ("Lead Engineer", 120, 2), ("Financer", 10000000, 3), ("Lawyer", 200000, 4), ("HR Officer", 3, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- seed order matters. Joe must have a null manager
VALUES("Joe", "Shmo", 1, NULL), ("John", "Doe", 2, 1), ("Jane", "Doe", 3, 1), ("Saul", "Goodman", 5, 1), ("Karen", "justKaren", 6, 1);

