

USE employees;

/*Populate the Departments */
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

/*Populate the roles valeys */

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

/*Create base employees */

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bryan", "Jerger", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marcus", "Pullett", 2, "Bryan Jerger");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sean", "Fuentes", 3, "Bryan Jerger");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joseph", "Jerger", 4, null);

/*