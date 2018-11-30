/**
 * Created by Ludin Nento on 04/05/2017.
 */

var dbConect = require('../model/config')

'use strict';

class Helper{

 Pengetesan(data , callback){
    dbConect.query("select * from mahasiswa where id = ?", data, function(error,results){

        return callback(error,results)
    });

 }

    Terimadata(callback){
        dbConect.query("select * from mahasiswa", function(results){
            return callback(results)
        });
    }

    Semua(callback){
        dbConect.query("select * from mahasiswa ", function(error,results){
            return callback(results)
        });
    }

    ubahData(data){
        dbConect.query("update mahasiswa set npm = ?, nama = ?, jurusan = ? where id =?",
            [data.npm, data.nama,data.jurusan, data.id], function (error,result,field) {
            })
    }

    addData(data){
        dbConect.query("insert into mahasiswa set ?", data , function (error,result,fields) {
        })
    }

    hapusData(data){
        dbConect.query("delete from mahasiswa where id= ? ", data, function (error,result,field) {
        })
    }

    cekData(data,callback){
        var dt = dbConect.query("select * from mahasiswa where id=?", data.id, function (err,res) {
            if(res.length == 0){
                dbConect.query("insert into mahasiswa set ?", data , function (error,result,fields) {
                    callback(result)

                })

            }else {
                dbConect.query("update mahasiswa set npm = ?, nama = ?, jurusan = ? where id =?",
                    [data.npm, data.nama,data.jurusan, data.id], function (error,result,field) {
                    callback(result)

                })

            }
        })
    }


}
module.exports = new Helper()
