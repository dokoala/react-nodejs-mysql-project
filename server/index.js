const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'dokoala',
    host: 'localhost',
    port: '7277',
    password: 'rlaehdgus12!',
    database: 'employeesystem',
});

app.get('/employees', (req,res) => {
    db.query('select * from employees'
    ,(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });    
})

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name
    const age = req.body.age
    const position = req.body.position
    const country = req.body.country
    const wage = req.body.wage

    db.query('INSERT INTO employees (name, age, position, country, wage) VALUES (?,?,?,?,?)'
    ,[name, age, position, country, wage]
    ,(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("add values");
        }
    });    
});

app.listen(3001, () => {
    console.log("server on (port 3001)")
});