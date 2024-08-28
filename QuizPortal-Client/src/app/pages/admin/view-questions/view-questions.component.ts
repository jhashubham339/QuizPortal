import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  QuestionQuizId: any;
  QuestionTitle: any;
  QuestionId: any;
  questionOfQuiz: any;
  QuestionDeleated: any;

  constructor(private activatedRoute : ActivatedRoute,
              private questionService :QuestionService) { }

  ngOnInit(): void {
    this.QuestionQuizId = this.activatedRoute.snapshot.params['qId']
    this.QuestionTitle = this.activatedRoute.snapshot.params['title']
    this.QuestionId  = this.activatedRoute.snapshot.params['quesId']
 
    this.questionService.getQuestionOfQuiz(this.QuestionQuizId).subscribe({
     next:(result)=>{
       this.questionOfQuiz =result;
     }
    })
  }

  deleteQuestion(quesId :any){
    Swal.fire({
      icon : 'info' ,
      title : 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText : 'Yes, delete it!',
      showCancelButton : true
    }).then((result)=>{
      if(result.isConfirmed){
        this.questionService.removeQuestion(quesId).subscribe({
          next:(result)=>{
            this.QuestionDeleated = result;
            Swal.fire('Success !!', 'Question deleted successfully','success');
            this.ngOnInit();
          },
           error: (error: any) => {
           console.log("Server error");
            }
        })
      }
    })
  }

}
