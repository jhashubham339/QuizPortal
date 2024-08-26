import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  newCategory: any;

  constructor(private categoriesService : CategoriesService,
              private snackBar :MatSnackBar,
              private router : Router) { }
  category ={
    title : '',
    description :''
  }

  ngOnInit(): void {
  }

  AddNewCategories(category:any){
    if(this.category.title == ''){
      this.snackBar.open('Please enter the title !!', '', {
        duration: 2000
      });
    }else{
      this.categoriesService.addCategories(category).subscribe({
        next:(result)=>{
          this.newCategory=result;
          Swal.fire('Success !!', 'Category is added successfully','success');
          this.category.title='';
          this.category.description='';
          this.router.navigate(["/admin-dashboard/view-categories"]);
        },
        error:(error :any)=>{
          console.log(error);
          Swal.fire('Error !!', 'Server error  !!','error');
        }
      });
    }
    
  }

}
