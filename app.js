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
  })
  connection.query("SELECT * from department", function (error, res) {
    showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
  })
  connection.query("SELECT * from employee", function (error, res) {
    
    showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
  })

  //Runs the Program
  
  runApp();
})


  
  
  
 