// will contain all of my user related routes
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const router = express.Router();
const axios = require('axios'); 
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM inventory"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.status(500).send(err).
        return
      }
      res.status(200).json(rows);
    //   axios.get(rows).then(posts=>{
    //     res.status(200).json(rows);
    //   })
    //   .catch(error => {
    //       res.status(500).send(error);
    //   })
    });
    
  })

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'shri',
    database: 'shoepalace'
})

function getConnection() {
    return pool
}

function loginCheck(req, res) {
  const loginId = req.body.loginId
  const password = req.body.password

  const queryString = "SELECT * FROM logindetails WHERE loginId = ?"
  getConnection().query(queryString, [loginId], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }
    console.log(results[0].password);
    if(results.length != 0 && password == results[0].password) {
      res.status(200).send(results);
    } else {
      res.status(500);
    }
    res.end()
  })
}

function insert(req, res) {
  const articleNo = req.body.articleNo
  const brandName = req.body.brandName
  const type = req.body.type
  const size = req.body.size
  const price = req.body.price
  const quantity = req.body.quantity
    
  const queryString = "INSERT INTO inventory (articleNo, brandName, type, size, price, quantity, sDate) VALUES (?, ?, ?, ?, ?, ?, NOW())"
  getConnection().query(queryString, [articleNo, brandName, type, size, price, quantity], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500);
      return
    } else {
      res.status(200).send(results);
    }
    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
}

function search(req, res) {
  const connection = getConnection()
  const articleNo = req.body.articleNo
  const queryString = "SELECT * FROM inventory WHERE articleNo = ?"
  connection.query(queryString, [articleNo], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      // throw err
      } else {
        res.json(rows)
      }
  })
}

router.post('/checkAndInsert', (req, res) => {

  if(req.body.loginId) {
      loginCheck(req, res); 
  } else if(req.body.articleNo) {
    if(req.body.brandName) {
      insert(req, res);
    } else {
      search(req, res);
    }
    
  } else {
    console.log("mela");
  }
})

router.get('/user/', (req, res) => {
    const connection = getConnection()

    const userId = req.params.id
    console.log(userId);
    const queryString = "SELECT * FROM inventory WHERE articleNo = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
        })

        res.json(rows)
    })
})

module.exports = router