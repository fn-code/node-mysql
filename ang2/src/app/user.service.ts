import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor (
    private http: Http
  ) {}

  getUser() {
    let Url = '/addMessage';
    return this.http.get(Url)
    .map((res:Response) => res.json());
  }

  addMahasiswa(mahasiswa) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/api/mhs", JSON.stringify(mahasiswa), { headers: headers })
        .map(response => response.json());
  }

  hapusMahasiswa(id){
    var urls = '/api/mhs/'+id;
    return this.http.delete(urls)
        .map(response => response.json());

  }

  ubahMahasiswa(mahasiswa){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('/api/mhs', JSON.stringify(mahasiswa), {headers:headers})
        .map(response => response.json())
  }

}
