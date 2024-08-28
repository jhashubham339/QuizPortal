import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  updateQuizForm: any;

  categoryControl: FormControl = new FormControl(null, Validators.required);
  categoriesData: any;
  updatedData: any;
  quiz: any;
  quizData: any;
  
  constructor(private formBuilder : FormBuilder,
              private categoriesService : CategoriesService,
              private activateRoute :ActivatedRoute,
              private quizService : QuizService,
              private router :Router) { }

  ngOnInit(): void {
      //Assume this is your form
      this.updateQuizForm = this.formBuilder.group({
        qId : [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
        maxMarks: ['', Validators.required],
        numberOfQuestions: ['', Validators.required],
        active : false,
        category: this.formBuilder.group({
          cId: this.categoryControl
        })
      });

      this.categoriesService.getCategories().subscribe({
        next:(result)=>{
          this.categoriesData = result;
        }
      })

      this.quiz = this.activateRoute.snapshot.params['qId'];

   this.quizService.getQuizById(this.quiz).subscribe({
    next:(result)=>{
      this.quizData = result;
      console.log(result);

      this.quizData= this.updateQuizForm.patchValue({
        qId : this.quiz,
        title : this.quizData.title,
        description : this.quizData.description,
        maxMarks : this.quizData.maxMarks,
        numberOfQuestions : this.quizData.numberOfQuestions,
        active : this.quizData.active,
        category: {
          cId: this.quizData.category.cId
        }       
      })
    },
    error:(error)=>{
      console.log("server error",error);
    }
   })
  }

  UpdateSubmit(data :any){
    data = this.updateQuizForm.value;
   this.quizService.updateQuiz(data).subscribe({
    next:(result)=>{
      this.updatedData = result;
      Swal.fire('Success','Quiz updated Successfully','success');
      this.router.navigate(['/admin-dashboard/view-quizzes'])
    },
    error:(error)=>{
      console.log("Server error",error);
      Swal.fire('Error','Server error','error');
    }
   })
  }

}
