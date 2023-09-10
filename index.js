const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');
const port = 3000;

app.use(bodyParser.json());

// Routes / URL / Endpoint utama kita method GET
app.get('/', (req, res) => {
    response(200, "API v1 ready to go", "SUCCESS", res)
});

app.get('/mahasiswa', (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (error, fields) => {
    if (error) throw error;
    response(200, fields, "Mahasiswa get list", res);
  });
});

app.get('/mahasiswa/:nrp', (req, res) => {
  const nrp = req.params.nrp;
  const sql = `SELECT * FROM mahasiswa WHERE nrp = ${nrp}`;
  db.query(sql, (error, fields)=> {
    if (error) throw error;
    response(200, fields, "get detail mahasiswa", res);
  });
});

app.post('/mahasiswa', (req,res) => {
  const { nama, nrp, email, jurusan } = req.body;
  const sql = `INSERT INTO phpmvc.mahasiswa (nama, nrp, email, jurusan) VALUES ('${nama}', '${nrp}', '${email}', '${jurusan}')`;
  db.query(sql, (error, fields) => {
    if (error) response(500, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      }
      response(200, data, "Data Added Succesfully", res);
    } else {
      console.log("gagal");
    }
  });
});

app.put('/mahasiswa', (req, res) => {
  const { nrp, nama, email, jurusan } = req.body;
  const sql = `UPDATE mahasiswa SET nama='${nama}', email='${email}', jurusan='${jurusan}' WHERE nrp=${nrp}`;
  db.query(sql, (error, fields) => {
    if (error) response(500, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message
      }
      response(200, data, "Update data successfully", res);
    } else {
      response(500, "Mohon maaf", "Error", res);
    }
  })
});

app.delete('/mahasiswa', (req, res) => {
  const { nrp } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nrp=${nrp}`;
  db.query(sql, (error, fields) => {
    if (error) response(500, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      }
      response(200, data, "Deleted Data Succesfully", res);
    } else {
      response(404, "User not found", " Error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});