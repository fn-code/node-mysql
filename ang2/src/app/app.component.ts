import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { SocketService } from './socket.service';

import * as io from 'socket.io-client';
import {send} from "q";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //socket: SocketIOClient.Socket;
  private MahasiswaData ={};

  private mahasiswaData;
  constructor(private userService: UserService, private socketService : SocketService) {

    //this.socket = io.connect('http://localhost:8000');
  }
    ngOnInit() {

      this.socketService.on('message-received').subscribe(res => {
        this.mahasiswaData = res
      });

      this.userService.getUser().subscribe(res => {
        console.log(res)
      })

    }

  ngOnDestroy() {
    this.socketService.removeListener('send-message');
  }

    //dataMahasis(){
      //let obser = new Observable(observ => {
        //if(this.socket) {
          //this.socket.on('send-data-again', (data: any) => {
            //observ.next(data.data);

          //});
        //}

      //});
      //return obser;
    //}

    addMahasiswa(id,npm,nama,jur){
      var mahasiswa = {
        id : id,
        npm: npm,
        nama: nama,
        jurusan: jur,
      }
      this.socketService.emit('send-message', {
        data : mahasiswa,
        status: 'add'
      })

      /*
      this.userService.addMahasiswa(mahasiswa).subscribe(data => {
        this.mhs.push(mahasiswa);
      })
      */
    }
    addData(){
      var data = [
          { id: "8", npm: "008", nama: "8888", jurusan: "88888" },
          { id: "9", npm: "008", nama: "8888", jurusan: "88888" },
          { id: "7", npm: "008", nama: "8888", jurusan: "88888" }
          ]
      this.socketService.emit('send-message',{
        data: data,
        status: "multi"
      })
    }

    hapus(id){
      var mahasiswa = {
        id: id
      }
      this.socketService.emit('send-message',{
        data : id,
        status: 'hapus'
      })
        //this.userService.hapusMahasiswa(id).subscribe()
    }

    updateMahasiswa(id,npm,nama,jur){
        var mahasiswa = {
          id : id,
          npm: npm,
          nama: nama,
          jurusan: jur,

        }
        this.socketService.emit('send-message', {
          data: mahasiswa,
          status: 'update'
        })
    }

}
