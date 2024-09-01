import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  quizId: any;
  quiz: any;

  constructor(private activatedRoute :ActivatedRoute,
              private quizService : QuizService,
              private snackBar :MatSnackBar,
              private router :Router,
              private loder : NgxUiLoaderService
              ) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['qId']
  
    this.quizService.getQuizById(this.quizId).subscribe({
      next:(result)=>{
        this.quiz =result;
        console.log(this.quiz)
      },
      error: (error: any) => {
        this.snackBar.open('Server error !!', '', {
          duration: 2000
        });
      }
    })
  }

  startQuiz(){
    Swal.fire({
      icon : 'info' ,
      title : 'Do you want to start the quiz?',
      confirmButtonText : 'Start',
      denyButtonText  : 'Do not start',
      showCancelButton : true
    }).then((result)=>{
      if(result.isConfirmed){
        this.loder.start();
        this.router.navigate(['/instruction/'+this.quiz.qId +'/start-quiz'])
        this.loder.stop();
      }else if(result.isDenied){
        Swal.fire('info','somthing wrong !!','info');
      }
    })
  }

}
