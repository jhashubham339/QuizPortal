import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questions :any

  MarksGot :any = 0;
  CorrectAnswer :any = 0;
  AttemptedQuestion :any = 0;
  isSubmit :any = false;
  timer :any

  constructor(private locationStrategy : LocationStrategy,
              private activatedRoute :ActivatedRoute,
              private questionService :QuestionService,
              private loder :NgxUiLoaderService) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['qId']
    
    this.questionService.getQuestionOfQuiz(this.quizId).subscribe({
      next:(result)=>{
        this.questions = result;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q :any) => {
          q['givenAnswer']= '';
        });
        this.startTimer()
      }
    })
    this.preventBackButton();
  }
   // This method does not allow going back to the previous page.
   preventBackButton(){
    history.pushState(null, location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      icon : 'info' ,
      title : 'Do you want to submit the quiz?',
      confirmButtonText : 'Submit',
      showCancelButton : true
    }).then((result)=>{
      if(result.isConfirmed){
        this.loder.start();
       this.evalQuiz();
       this.loder.stop();
      }
    })
   
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer <=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz(){
    this.isSubmit = true
    this.questions.forEach((q :any) => {
      if(q.givenAnswer == q.answer){
        this.CorrectAnswer++;
        let OneQuestionMarks = this.questions[0].quiz.maxMarks/this.questions.length;
        this.MarksGot +=OneQuestionMarks;
      }
      if(q.givenAnswer.trim() !=''){
        this.AttemptedQuestion++;
      }
    });
  }

}
