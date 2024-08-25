import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css']
})
export class UpdateCategoriesComponent implements OnInit {
  categoriesData: any = {
    title: '',
    description: ''
  };
  modifyData: any;
  cId: any;

  constructor(private categoriesService : CategoriesService,
              private activatedRoute : ActivatedRoute,
              private router : Router,
  ) { }

  ngOnInit(): void {
    this.cId = this.activatedRoute.snapshot.params['cId'];
   
    this.categoriesService.getCategoriesById(this.cId).subscribe({
     next:(result)=>{
       this.categoriesData = result;
       console.log(result)
     },
     error:(error)=>{
       console.log("server error", error);
     }
    })
  }

  modifyCategories(){
    this.categoriesService.updateCategories(this.categoriesData).subscribe({
      next:(result)=>{
        this.modifyData = result;
        Swal.fire('Success','Category updated Successfully','success');
        this.router.navigate(['/admin-dashboard/view-categories'])
      },
      error:(error)=>{
        console.log("Server error",error);
        Swal.fire('Error','Server error','error');
      }
    })
  }
}
