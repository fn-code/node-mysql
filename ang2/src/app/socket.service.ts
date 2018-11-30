import {Injectable} from "@angular/core"
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    socket: SocketIOClient.Socket;

    constructor(){
        this.socket = io.connect('http://localhost:8000')
    }

    on(eventName){
        let observable = new Observable(obser => {
            this.socket.emit('send-message',{
                data:null
            })

            if(this.socket) {
                this.socket.on(eventName, (data: any) => {
                    obser.next(data.data)
                });
            }
        });
        return observable
    }

    emit(eventName, data){
        var Alldata = {
            data: data.data,
            status: data.status
        }
        if(this.socket) {
            this.socket.emit(eventName, Alldata)
        }
    }

    removeListener(eventName){
        if(this.socket){
            this.socket.removeListener(eventName)
        }
    }
}