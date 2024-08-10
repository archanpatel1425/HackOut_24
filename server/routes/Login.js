const express = require('express');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const db = require('../db'); // Import the existing database connection


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    db.query(`SELECT * FROM user_details WHERE username=${mysql.escape(username)}`, (err, users) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send(err.message);
        } else {
            if (users.length === 0) {
                res.json({ error: "User Doesn't Exist" });
                return;
            }
            const user = users[0];
            console.log(password)
            console.log(user.password)
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {
                    res.json({ error: "Wrong Username or Password 123" });
                    return;
                }

                const accessToken = sign(
                    { username: user.username, email: user.email, mobileno: user.mobileno },
                    "importantsecret"
                );
                res.json({ token: accessToken, username: user.username, email: user.email, mobileno: user.mobileno });
            });
        }
    });
});

router.post("/signup", async (req, res) => {
    const { firstname,lastname,username, password, mobileno, email ,date_of_birth} = req.body;
    console.log("Hello")
    db.query(`SELECT * FROM user_details WHERE username=${mysql.escape(username)}`, async (err, users) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send(err.message);
            return;
        }

        if (users.length > 0) {
            res.json({ error: "User Name Is Already Exists" });
            return;
        }

        bcrypt.hash(password, 10).then((hash) => {
            const query = `INSERT INTO user_details (username,email, password,first_name,last_name, phone_number,date_of_birth) VALUES (${mysql.escape(username)}, ${mysql.escape(email)}, ${mysql.escape(hash)}, ${mysql.escape(firstname)}, ${mysql.escape(lastname)} ,${mysql.escape(mobileno)},${mysql.escape(date_of_birth)})`;
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    res.status(500).send(err.message);
                    return;
                }

                const accessToken = sign(
                    { username: username, email: email, mobileno: mobileno },
                    "importantsecret"
                );
                res.json({ token: accessToken, username: username, email: email, mobileno: mobileno });
            });
        });
    });
});



module.exports = router;