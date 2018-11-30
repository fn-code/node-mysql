/**
 * Created by Ludin Nento on 06/05/2017.
 */

var test = require('../router/test')

class Socket{

    socketEvent(io){

        var dt = {
            Nama: "Ludin Nento",
            Alamat: "Tapa data"
        }

        io.on('connection', function(socket){

            test.Semua(function (results) {
                io.emit('send',{
                    data: results
                })
            })

            socket.on('send-data', function (data) {
                    test.addData(data.data)
                    test.Semua(function (results) {
                        socket.emit('send-data-again', {
                            data: results
                        })
                    })
            });

            socket.on('send-message', (data) => {


                if(data.status == 'add') {
                    console.log('add')
                    test.addData(data.data);
                    test.Semua(function (results) {
                        io.emit('message-received', {data: results});
                    })

                }else if(data.status == 'update'){
                    console.log('update')
                    test.ubahData(data.data)
                    test.Semua(function (results) {
                        io.emit('message-received', {data: results})
                    })
                }else if(data.status == 'hapus'){
                    console.log("hapus")
                    test.hapusData(data.data)
                        test.Semua(function (results) {
                            io.emit('message-received', {data: results})
                        })
                }else if(data.status == 'multi') {
                    var i = 0
                    var j = 0
                    for(i=0;i<data.data.length;i++){
                        test.cekData(data.data[i], function (res) {
                            j = j+i;
                            test.Semua(function (req) {
                                io.emit('message-received', {data: req})
                            })
                        })

                        j = j+i;
                    }
                    if(j == data.data.length){
                        console.log("Berhasil")
                    }

                }
                else{
                    console.log("show")
                    test.Semua(function (results) {
                        io.emit('message-received', {data: results})
                    })
                }

            });
        });

    }

}

module.exports = new Socket()
