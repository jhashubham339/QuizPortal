import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: any;
  newUser: any;

  constructor(private formBuilder : FormBuilder ,
              private userService : UserService,
              private snackBar :MatSnackBar) { }

  ngOnInit(): void {

    this.signup = this.formBuilder.group({
      userName : ['',[Validators.required]],
      password : ['',[Validators.required]],
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : ['',[Validators.required , Validators.email]],
      phone : ['',[Validators.required , Validators.pattern('^[0-9]+$')]]
    })
  }

  registerForm(user :any){
    if(this.signup.value.userName ==null || this.signup.value.userName ==""){
      this.snackBar.open('User Name is required !!', '', {
        duration: 2000
      });
    }else{
      this.userService.createUser(user).subscribe({
        next:(result)=>{
          this.newUser = result;
          Swal.fire('Successfully done !!', 'User is registered','success');
          this.signup.reset();
        },
        error: (error :any)=>{
          this.snackBar.open('User Name already exist !!', '', {
            duration: 2000
          });
        }
      })
    }
  }

  resetForm(){
    this.signup.reset();
  }

}
