import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tokenKey: any;
  user: any;

  constructor(private loginService : LoginService,
              private snackBar : MatSnackBar,
              private router : Router
  ) { }

  loginData = {
    username : '',
    password : ''
  }
 
  ngOnInit(): void {
  }

  LoginForm(loginData : any){
   // Trimming the loginData values
   loginData.username = loginData.username.trim();
   loginData.password = loginData.password.trim();

    if(this.loginData.username == '' || this.loginData.username == null){
      this.snackBar.open('Invalid username !!', '', {
        duration: 2000
      });
    }else if(this.loginData.password == '' || this.loginData.password == null){
      this.snackBar.open('Invalid password !!', '', {
        duration: 2000
      });
    }else{
      this.loginService.generateToken(loginData).subscribe({
        next:(result)=>{
          this.tokenKey = result;
            // Token generated Now will do login
           // first we stored that token to local storage.
          this.loginService.loginUser(this.tokenKey.token);
  
          this.loginService.CurrentUser().subscribe({       //get the current user
            next:(result)=>{
              this.user = result;
              //we set the user data in the setUser method which is in login service
              this.loginService.setUser(this.user);
                //redirect....If the user is Admin :admin-dashboard
                //redirect....If the user is Normal :normal/user-dashboard
                if(this.loginService.getUserRole() == "ADMIN" ){
                  this.router.navigate(["admin-dashboard"]);
                 // this.loginService.loginStatusSubject.next(true);
                }else if(this.loginService.getUserRole() == "NORMAL"){
                  this.router.navigate(["user-dashboard/0"]);
                //  this.loginService.loginStatusSubject.next(true);
                }else{
                  this.loginService.logOut();
                }
            },
            error: (error: any) => {
              this.snackBar.open('Invalid Details !!', '', {
                duration: 2000
              });
            }
          })
        },
        error: (error :any)=>{
          this.snackBar.open('Invalid User Name or Password !!', '', {
            duration: 2000
          });
        }
      })
    }
  }
}
