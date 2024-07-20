import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

    //For genearte the token
    generateToken(loginData : any){
     return this.http.post(environment.loginBaseUrl + '/generate-token', loginData);
    }

    //Get Current user
    CurrentUser(){
      return this.http.get(environment.loginBaseUrl + '/current-user');
    }

    //Login user : set token in localStorage
    loginUser(token: any) {
      localStorage.setItem("token", token)
      return true;
    }
    //get token 
    getToken(){
       return localStorage.getItem("token");
    }
    //isLogin : user is logged in or not
    isLoggedIn(){
      let tokenStr = localStorage.getItem("token")
     if(tokenStr == undefined || tokenStr == '' || tokenStr ==null){
      return false;
      }else{
      return true;
      }
    }

  //logOut : remove token from localStorage
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //---------- Store user in localStorage-----------

  setUser(user :any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  // get userDetails
  getUser(){
    let userStr =localStorage.getItem("user");
    if(userStr !=null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

 // get user role
  getUserRole(){
    let userRole = this.getUser();
    return userRole.authorities[0].authority;
  }


}
