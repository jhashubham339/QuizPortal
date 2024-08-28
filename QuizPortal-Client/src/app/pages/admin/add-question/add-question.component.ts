import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  title: any;
  quizId: any;
  formData: any;
  addQuestionData: any;

  constructor(private activatedRoute : ActivatedRoute,
              private formBuilder : FormBuilder,
              private questionService : QuestionService,
              private snackBar : MatSnackBar,
              private router :Router
  ) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.params['title'];
    this.quizId = parseInt(this.activatedRoute.snapshot.params['qId'])
    
    this.formData = this.formBuilder.group({
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
  }

  save(data :any){
    if(this.formData.value.content == '' || this.formData.value.option1 =='' || 
       this.formData.value.option2 == ''||this.formData.value.option3 =='' ||
       this.formData.value.option4 =='' || this.formData.value.answer == ''){
        this.snackBar.open('Please fill the required field !!', '', {
          duration: 2000
        });
       }else{
        data = this.formData.value;
        this.questionService.createQuestion(data).subscribe({
          next:(result)=>{
            this.addQuestionData = result;
            Swal.fire('Success !!', 'Question added successfully','success');
          //  this.router.navigate(['/admin-dashboard/view-quizzes/view-questions', this.quizId, this.title]);
          },
          error: (error) => {
            console.error('Error not adding question:', error);
            Swal.fire('Error !!', 'error in loading data from server','error');
           }
        })
      }
  }

}
