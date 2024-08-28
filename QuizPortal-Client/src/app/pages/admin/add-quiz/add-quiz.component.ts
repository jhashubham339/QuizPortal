import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  AddQuiz: any;
  category: any;
  categoryControl: FormControl = new FormControl(null, Validators.required);
  addFormdata: any;

  constructor(private formBuilder : FormBuilder,
              private categoriesService : CategoriesService,
              private quizService : QuizService,
              private snackBar : MatSnackBar,
              private router :Router
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next:(result)=>{
        this.category = result;
      }
    })

    this.AddQuiz = this.formBuilder.group({
      title : ['',[Validators.required]],
      description : ['',[Validators.required]],
      maxMarks : ['',[Validators.required]],
      numberOfQuestions :['',[Validators.required]],
      active : false,
      category: this.formBuilder.group({
        cId: this.categoryControl
      })
    });
  }

submitForm(data :any){
    if(this.AddQuiz.value.title == '' || this.AddQuiz.value.description == '' || this.AddQuiz.value.maxMarks == '' ||
       this.AddQuiz.value.numberOfQuestions =='' || this.AddQuiz.value.category.cId == null){
      this.snackBar.open('Please enter the required field !!', '', {
        duration: 2000
      });
    }else{
      console.log(this.AddQuiz.value);
      this.quizService.createQuiz(data).subscribe({
        next:(result)=>{
          this.addFormdata = result;
          this.AddQuiz.reset();
          Swal.fire('Success !!', 'Quiz added successfully','success');
          this.router.navigate(['/admin-dashboard/view-quizzes']);
        },
        error:(error :any)=>{
          Swal.fire('Error !!', 'error in loading data from server','error');
        }
      });
    }
  }
}
