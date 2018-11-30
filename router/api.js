var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var dbConect = require('../model/config')
var test = require('./test')


router.get('/mhs', function(req, res) {

    dbConect.query('SELECT * from mahasiswa order by id ASC', function(err, rows) {
        if (!err)
            res.json(rows)
        else {
            res.send(err)
        }
    })

});

router.get('/test', function(req, res){
    var nama = "1"
    test.Pengetesan(nama, function(error, results){
        if(!error){
            res.json(results)
        }else{
            res.send(error)
        }
    });
});

router.get('/mhs/:id',  function (req,res) {
    var id = req.params.id
    dbConect.query("select * from mahasiswa where id = ?", id , function (err, rows) {
        if (!err){
            res.json(rows)
        }else{
            res.send(err)
        }
    })

});
router.post('/mhs', function (req, res) {
    var data = dbConect.query("insert into mahasiswa set ?", req.body , function (error,result,fields) {
        console.log(result)
    })
});

router.delete('/mhs/:id', function (req,res) {
    var id = req.params.id
    var dat = dbConect.query("delete from mahasiswa where id= ? ", id, function (error,result,field) {
       console.log(dat.sql)
   })
});

router.put('/mhs', function (req,res) {
   var data = dbConect.query("update mahasiswa set npm = ?, nama = ?, jurusan = ? where id =?",
       [req.body.npm, req.body.nama,req.body.jurusan,req.body.id], function (error,result,field) {
       console.log(data.sql)
   })
});

module.exports = router;