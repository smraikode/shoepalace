// will contain all of my user related routes
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'shri',
    database: 'shoepalace',
    multipleStatements: true,
})

function getConnection() {
    return pool
}

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
  });
})

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
  const articleNo = req.body.articleNo;
  let queryString;
  let input_array = [];
  if(req.body.size) {
    const size = req.body.size;
    queryString = "SELECT * FROM inventory WHERE articleNo = ? AND size = ?";
    input_array = [articleNo, size];
  } else {
    queryString = "SELECT * FROM inventory WHERE articleNo = ?";
    input_array = [articleNo];
  }
  connection.query(queryString, input_array, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      // throw err
      } else {
        res.send(rows)
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

router.post('/update', (req, res) => {
  const connection = getConnection()
  const articleNo = req.body.articleNo;
  const size = req.body.size;
  const newPrice = req.body.price;
  const newQuantity = req.body.quantity;
  const queryString = "SELECT * FROM inventory WHERE articleNo = ? AND size = ?"
  connection.query(queryString, [articleNo, size], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      } else {
        setValue(rows[0])
      }
  })

  function setValue(value) {
    var varUpdate = value;
    const oldPrice = varUpdate.price;
    const oldQuantity = varUpdate.quantity;
     console.log(newPrice);

    const finalQuantity = parseInt(oldQuantity)  + parseInt(newQuantity);
    const finalPrice = oldPrice>newPrice? oldPrice: newPrice; 

    const newQueryString = "UPDATE inventory SET price = ?, quantity= ? WHERE articleNo = ? AND size = ?";
    connection.query(newQueryString, [finalPrice, finalQuantity, articleNo, size], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500);
        return
      } else {
        res.status(200).send(results);
      }
      res.end()
    })
  }
});

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
});

router.post('/insertSell', (req, res) => {
  const connection = getConnection();
  const queryString0 = "SELECT billNo FROM bill WHERE billNo=(SELECT MAX(billNo) FROM bill)";
  connection.query(queryString0, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.status(500).send(err)
      return
    } else {
      setLastBillNo(rows[0].billNo);
    }
  });
  
  function setLastBillNo(lastBillNo) {
    let totalPurchase = 0, totalSell = 0, totalCgst = 0 , totalSgst = 0, totalSellPrice = 0, flag = false;
    for(let i=0, len=req.body.length; i<len; i++) {
      const queryString = "SELECT articleNo,quantity FROM inventory WHERE articleNo = ? AND size = ?";
      connection.query(queryString,[req.body[i].articleNo, req.body[i].size], (err, rows, fields) => {
        if (err) {
          console.log("Failed to query for users: " + err)
          res.status(500).send(err)
          return
        } else {
          reduceQuantity(rows[0]);
        }
      });

      const queryString1 = "INSERT INTO sell (billNo, articleNo, brandName, type, size, price, sellPrice, cgst, sgst, totalSellPrice, sellQuantity, sellDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
      let params = [lastBillNo, req.body[i].articleNo, req.body[i].brandName, req.body[i].type, req.body[i].size, req.body[i].price, req.body[i].sellPrice, req.body[i].cgst, req.body[i].sgst, req.body[i].totalPrice, req.body[i].sellQuantity];
      connection.query(queryString1, params, (err, rows, fields) => {
        if (err) {
          console.log("Failed to query for users: " + err)
          res.status(500).send(err)
          return
        } else {
          sendFinalStatus(i , lastBillNo);
        }
      });
      totalPurchase += req.body[i].price;
      totalSell += req.body[i].sellPrice;
      totalCgst += req.body[i].cgst;
      totalSgst += req.body[i].sgst;
      totalSellPrice += req.body[i].totalPrice;
    }

    const queryString2 = "INSERT INTO bill (billNo, purchasePrice, sellPrice, cgst, sgst, billDate) VALUES (?, ?, ?, ?, ?, NOW())";
    let params = [lastBillNo + 1, totalPurchase, totalSell, totalCgst, totalSgst];
    connection.query(queryString2, params, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for userss: " + err)
        res.status(500).send(err)
        return
      } else {
        res.status(200);
      }
    });
  }
  function reduceQuantity(data) {
    let newQuantity = data.quantity - 1;
    const queryString = "UPDATE inventory SET quantity = ? WHERE articleNo = ?";
    connection.query(queryString, [newQuantity,data.articleNo], (err, rows, fields) => {
      if(err) {
        console.log("Failed to query for users: " + err)
        res.status(500).send(err)
        return
      } else {
        res.status(200);
      }
    });
  }
  function sendFinalStatus(itemNo, lastBillNo) {
    if(itemNo == (req.body.length -1)) {
      let data = {billNo: lastBillNo};
      res.status(200).send(data);
    }
  }
})

router.post('/getReceipt', (req, res) => {
  const connection = getConnection();
  const queryString = "SELECT * FROM sell WHERE billNo = ?"
  connection.query(queryString, [req.body.billNo], (err, rows, fields) => {
    if(err) {
      console.log("Failed to query for users: " + err)
      res.status(500).send(err)
      return
    } else {
      res.send(rows);
    }
  })
});

router.post('/report', (req, res) => {
  console.log(req.body);
  let fromDate, endDate;
  if ((req.body.date.match(/-/g) || []).length == 2) {
    fromDate = req.body.date;
    endDate = fromDate + ' ' + '23:59:59';
  } else {
    fromDate = req.body.date + '-1';
    endDate = req.body.date + '-31' + ' ' + '23:59:59';
  }
  
  console.log(endDate);
  const connection = getConnection();
  const queryString = "SELECT * FROM sell WHERE sellDate BETWEEN ? AND ?";

  connection.query(queryString, [fromDate, endDate], (err, rows, fields) => {
    if(err) {
      console.log("Failed to query for users: " + err)
      res.status(500).send(err)
      return
    } else {
      res.send(rows);
    }
  })
});

router.post('/delete', (req, res) => {
  console.log(req.body);
  
  const connection = getConnection();
  const queryString = "delete from bill where billNo=?;SET @num := 0; UPDATE bill SET billNo = @num := (@num+1);ALTER TABLE bill AUTO_INCREMENT = 1;";

  connection.query(queryString, [fromDate, endDate], (err, rows, fields) => {
    if(err) {
      console.log("Failed to query for users: " + err)
      res.status(500).send(err)
      return
    } else {
      res.send(rows);
    }
  })
});

module.exports = router