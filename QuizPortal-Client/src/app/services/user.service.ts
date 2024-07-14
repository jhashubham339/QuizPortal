import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient ) { }

  createUser(data : any){
    return this.http.post(environment.baseUrl + '/users',data)
  }
}
