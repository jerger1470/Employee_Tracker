var mysql = require("mysql");
const inquirer = require("inquirer");

//Setting up our connection to our database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Baseball1470!",
  database: "employees"
}); 



var showroles;
var showdepartments;
var showemployees;


connection.connect(function (err) {
  
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);

  connection.query("SELECT * from role", function (error, res) {
    showroles = res.map(role => ({ name: role.title, value: role.id }))
  }
  
  )
  connection.query("SELECT * from department", function (error, res) {
    showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
  })
  connection.query("SELECT * from employee", function (error, res) {
    
    showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
  })

  //Runs the verification login
  
  runLogin();
})

//Function that will ask the user, with proper login credentiials, that runs the program

function runLogin(){
    console.log("welcome to the Employee Tracker!")
    inquirer
    .prompt([
        {
         type: 'password',
        name: 'defaultpassword',
        message: 'Please enter a password!',
        },
  ])
  .then(answers => {
    if(answers.defaultpassword == "password"){
      runApp();
    } else{
      console.log("Please enter the correct password!")
      runLogin();
    }
  });
};

//Run Employee tracker, if verification passes

function runApp() {

    inquirer
      .prompt(

        {
          type: "list",
          message: "Sucessfully logged in! What would you like to do?",
          name: "choices",
          choices: [
            {
              name: "View all employees",
              value: "viewEmployees"
            },
            {
              name: "View all departments",
              value: "viewDepartments"
            },
            {
              name: "View all roles",
              value: "viewRoles"
            },
            {
              name: "Add employee",
              value: "addEmployee"
            },
            {
              name: "Add department",
              value: "addDept"
            },
            {
              name: "Add role",
              value: "addRole"
            },
            {
              name: "Update role",
              value: "updateRole"
            },
            {
              name: "Quit",
              value: "quit"
            }
          ]
        }).then(function (res) {
         
        menu(res.choices)
      })
  }
  
//Based on user imput, brings up menu that allows you to interact with the database

  function menu(option) {
    switch (option) {
      case "viewEmployees":
        viewAllEmployees();
        break;
      case "viewDepartments":
        viewAllDepartments();
        break;
      case "viewRoles":
        viewAllRoles();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "addDept":
        addDept();
        break;
      case "addRole":
        addRole();
        break;
      case "updateRole":
        updateRole();
        break;
      case "quit":
        end();
    }
  }

  //bring through all employees in datebase and shows in a table

  function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (error, res) {
      console.table(res);
      runApp();
    })
  }
  
  //bring through all departments in datebase and shows in a table

  function viewAllDepartments() {
    console.log("view all departments")
    connection.query("SELECT * from department", function (error, res) {
      console.table(res);
      runApp();
    })
  }
  
  //bring through all rolse in datebase and shows in a table

  function viewAllRoles() {
    connection.query("SELECT * from role", function (error, res) {
      console.table(res);
      runApp();
    })
  }
  
  // Ask the user for the new employee's information.

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: "Please enter employee's first name.",
          name: "firstName",
        },
        {
          type: "input",
          message: "Please enter employee's last name.",
          name: "lastName",
        },
        {
          type: "list",
          message: "Please enter employee's occupation.",
          name: "title",
          choices: showroles
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "manager",
          choices: showemployees,
        }
      ]).then(function (response) {
        
        addEmployees(response)
      })
  }
  
//Updates the database with new employee information.

  function addEmployees(data) {
  
    connection.query("INSERT INTO employee SET ?",
      {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.title,
        manager_id: data.manager
      }, function (error, res) {
        if (error) throw error;
      })
      runApp();
  }
  
 // Ask the user for the new department information.

  function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What department do you want to add?",
          name: "name"
        }
      ])
      .then(function (response) {
        
        addDepartment(response);
      })
  }
  
 // Updates the database for the new department.

  function addDepartment(data) {
    connection.query("INSERT INTO department SET ?", { name: data.name },
    function (error, res) {
      
      if (error) throw error;
    });
    runApp();
  }
  
// Ask the user for the employee's new role information.

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new employee role?",
          name: "title"
        },
        {
          type: "input",
          message: "How much is the new salary of the employee's role?",
          name: "salary"
        },
        {
          type: "list",
          message: "In which department is the new role?",
          name: "id",
          choices: showdepartments
        }
      ])
      .then(function (response) {
        
        addEmployeeRole(response);
      })
  }
  
//Updates the selected new role information in the database.

  function addEmployeeRole(data) {
    connection.query("INSERT INTO role SET ?", {
      title: data.title,
      salary: data.salary,
      department_id: data.id
    }, function (error, res) {
      
      if (error) throw error;
    });
    runApp();
  }
  
//Selects the employee for new role

  function updateRole() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Choice employee for updated role.",
          name: "empID",
          choices: showemployees
        },
        {
          type: "list",
          message: "What is the employee's new role?",
          name: "titleID",
          choices: showroles
        }
      ])
      .then(function (response) {
        
        updateEmployeeRole(response);
      })
  }
  
//Updates employee's new role in the database

  function updateEmployeeRole(data) {
    connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
    function (error, res) {
      
      if (error) throw error;
    });
    runApp();
  }

//ends app, closes all database connections

 function end() {
    console.log("You have ended to application. Have a nice day!");
    connection.end();
    process.exit();
  }
  
  
  
 