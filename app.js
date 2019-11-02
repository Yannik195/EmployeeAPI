// Express
const express = require("express");
const app = express();

// Mongoose
const mongoose = require("mongoose");

// Names
const names = require("dog-names");

// Random Number
function randomNumber(){
 return Math.floor(Math.random() * 40) + 21;
}

// Employee Array
var employees = [];

app.get("/api/employees", (req, res) => {
    res.send(employees);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening on port ${port}...`);
});

mongoose.connect("mongodb://localhost:27017/employeesDB", {useUnifiedTopology: true, useNewUrlParser: true});

const employeeSchema = {
    name: String,
    age: Number
}

const Employee = mongoose.model("Employee", employeeSchema);

function newEmployee(){
    const randomEmployee = new Employee({
        name: names.maleRandom(),
        age: randomNumber()
    });

    randomEmployee.save();
}

// Mongoose: Query
Employee.find({}, function (err, employee){
    console.log(employee);
    for(var i = 0; i < employee.length; i++){
        console.log(employee[i].name);
        employees.push(employee[i]);
    }
});

for (var i = 0; i < 10; i++){
    // newEmployee();
}

