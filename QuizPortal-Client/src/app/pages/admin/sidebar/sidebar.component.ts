import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService : LoginService,
              private router : Router
  ) { }

  ngOnInit(): void {
  }

  logoutFormAdmin(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

}
