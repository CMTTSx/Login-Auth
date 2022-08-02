const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//Middlewares
const app = express();

// Solve CORS
app.use(cors());

//Parsing JSON object
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "mysqldb00",
    database: "loginSystem"
});

app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query('INSERT INTO users (username,password) VALUES (?, ?)',
     [username, password],
     (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req,res ) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?'),
    [username, password],
    (err, result) => {

        if (err) {
            res.send({ err: err });
        }

        if(result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Combinação de Username e Password errada!" });
        }

    }
})


app.listen(3001, () => {
    console.log("Servidor em funcionamento na Porta 3001!")
});