import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  category: any;

  constructor(private categoriesService :CategoriesService,
              private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next:(result)=>{
        this.category = result;
      },
      error: (error: any) => {
        this.snackBar.open('Server side error !!', '', {
          duration: 2000
        });
      }
    })
  }

}
