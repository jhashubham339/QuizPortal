import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-all-quiz',
  templateUrl: './load-all-quiz.component.html',
  styleUrls: ['./load-all-quiz.component.css']
})
export class LoadAllQuizComponent implements OnInit {
  catId: any;
  QuizData: any;

  constructor(private activatedRouter : ActivatedRoute,
              private quizService : QuizService,
              private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params)=>{
      this.catId = this.activatedRouter.snapshot.params['catId']
      console.log(this.catId)

      if(this.catId == 0){
        this.quizService.getActiveQuizzes().subscribe({
          next:(result)=>{
            this.QuizData = result; 
            console.log(this.QuizData)
          },
          error: (error: any) => {
            this.snackBar.open('Server side error !!', '', {
              duration: 2000
            });
          } 
        })
      }else{
        console.log("load specific quiz")
       this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
        next:(result)=>{
          this.QuizData = result;
        }
       })
      }
    })
  }
}
