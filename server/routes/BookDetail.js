const express = require('express');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const db = require('../db'); // Import the existing database connection

router.get('/book_data', async (req, res) => {
    try {
        db.query("SELECT * FROM books", (err, info) => {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).send(err.message);
            } else {
                res.json(info);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(error.message);
    }
});

router.get('/book_data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        db.query(`SELECT * FROM books WHERE id=${mysql.escape(id)}`, (err, info) => {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).send(err.message);
            } else {
                res.json(info);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email=${mysql.escape(email)}`, (err, users) => {
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
                    { username: user.username, usertype: user.role, mobileno: user.mobileno },
                    "importantsecret"
                );
                res.json({ token: accessToken, username: user.username, usertype: user.role, mobileno: user.mobileno });
            });
        }
    });
});

router.post("/signup", async (req, res) => {
    const { username, password, mobileNumber, email } = req.body;

    db.query(`SELECT * FROM users WHERE user_name=${mysql.escape(username)}`, async (err, users) => {
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
            const query = `INSERT INTO users (user_name, password, phone, email) VALUES (${mysql.escape(username)}, ${mysql.escape(hash)}, ${mysql.escape(mobileNumber)}, ${mysql.escape(email)})`;
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    res.status(500).send(err.message);
                    return;
                }

                const accessToken = sign(
                    { username: username, usertype: "user", mobileno: mobileNumber },
                    "importantsecret"
                );
                res.json({ token: accessToken, username: username, usertype: "user", mobileno: mobileNumber });
            });
        });
    });
});



module.exports = router;