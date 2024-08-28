import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  title: any;
  quizId: any;
  QuestionId: any;
  formData: any;
  getData: any;
  updatedData: any;

  constructor(private activatedRoute : ActivatedRoute ,
              private formBuilder : FormBuilder ,
              private questionService : QuestionService,
              private router : Router) { }

  ngOnInit(): void {

    this.title = this.activatedRoute.snapshot.params['title'];
    this.quizId = parseInt(this.activatedRoute.snapshot.params['qId']),
    this.QuestionId  = this.activatedRoute.snapshot.params['qId']
    
    this.formData = this.formBuilder.group({
      quesId  : [],
      content : ['',[Validators.required]],
      option1 : ['',[Validators.required]],
      option2 : ['',[Validators.required]],
      option3 : ['',[Validators.required]],
      option4 : ['',[Validators.required]],
      answer  : ['',[Validators.required]],
      quiz    : {
                  qId :  this.quizId
                }
    })

    this.questionService.getQuestionById(this.QuestionId).subscribe({
      next:(result)=>{
        this.getData = result;

        this.getData = this.formData.patchValue({
          quesId  : this.getData.quesId,
          content : this.getData.content,
          option1 : this.getData.option1,
          option2 : this.getData.option2,
          option3 : this.getData.option3,
          option4 : this.getData.option4,
          answer  : this.getData.answer,
          quiz    : {
            qId :  this.getData.quiz.qId
          }
        })
      }
    })
  }

  editQuestion(data :any){
    this.questionService.UpdateQuestion(data).subscribe({
     next:(result)=>{
       this.updatedData = result;
       Swal.fire('Success','Question updated Successfully','success');
       this.router.navigate(['admin-dashboard/view-quizzes/view-questions', this.quizId, this.title]);
     },
      error:(error)=>{
       console.log("server error",error);
       Swal.fire('Error','Server error','error');
     }
    })
   }

}
