const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const app = express();

const SELECT_ALL = 'SELECT * FROM products'

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'markets',
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/',(req, res) => {
    res.send("hello go to http://localhost:4000/products/")

});

app.get('/products',(req, res) => {
    connection.query(SELECT_ALL, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data : results
            })
        }
    });
});

app.get('/products/add', (req, res) => {
    const { id,name,price } = req.query;
    const INSERT_PRODUCTS = `INSERT INTO products (id,name,price) VALUES("${id}",'${name}','${price}')`
    connection.query(INSERT_PRODUCTS, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('Successfully added product');
        }
    })
});




app.get('/products/delete',(req, res) => {
    const {id} = req.query;
    const DELETE_PRODUCT = `DELETE FROM products WHERE id ="${id}" `
    connection.query(DELETE_PRODUCT, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            console.log(results);
            return res.send('Successfully DELETEED product')
               
        }
    })
})

app.post('/product/save',(req, res) => {
    const data = {name: req.body.name, price: req.body.price};
    const sql = "INSERT INTO product SET ?";
    connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send('success');
    });
  });
   

app.get('/products/update',(req, res) => {
    const {id,name,price} = req.query;
    const UPDATE_PRODUCT = `UPDATE products SET name='${name}', price=${price} WHERE id=${id}`
    connection.query(UPDATE_PRODUCT, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            console.log(results);
            return res.send('Successfully Update product');
        }
    })
        
})

port = 4000 ; 
app.listen(port, () => {
    console.log("Start server on port ",port)
})