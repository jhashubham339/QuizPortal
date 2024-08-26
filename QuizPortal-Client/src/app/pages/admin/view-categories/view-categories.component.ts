import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  allCategories: any;
  delete: any;

  constructor(private categoriesService :CategoriesService) { }

  ngOnInit(): void {
    this.viewCategories();
  }

  viewCategories(){
    this.categoriesService.getCategories().subscribe({
      next:(result)=>{
        this.allCategories =result;
      },
      error: (error: any) => {
       console.log(error);
      }
    });
  }

  deleteCategory(categoryId :any){
    Swal.fire({
      icon : 'info' ,
      title : 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText : 'Yes, delete it!',
      showCancelButton : true
    }).then((result)=>{
      if(result.isConfirmed){
        //delete..
        this.categoriesService.removeCategories(categoryId).subscribe({
          next:(result)=>{
            this.delete =result;
            this.viewCategories();
            Swal.fire('Success !!', 'Category deleted','success');
          },
          error: (error) => {
            Swal.fire('Error !!', 'error in loading data from server','error');
          }
        })
      }
    })
  }
}
