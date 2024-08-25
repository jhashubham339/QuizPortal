import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quiz: any;
  deleteQuizz: any;

  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
    this.getQuiz()
  }

  getQuiz(){
    this.quizService.getAllQuiz().subscribe({
      next:(result)=>{
        this.quiz = result;
      },
      error: (error: any) => {
        console.log(error);
       }
    })
  }

  deleteQuiz(quizId :any){
    Swal.fire({
      icon : 'info' ,
      title : 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText : 'Yes, delete it!',
      showCancelButton : true
      }).then((result)=>{
      if(result.isConfirmed){
       this.quizService.removeQuiz(quizId).subscribe({
        next:(result)=>{
        this.deleteQuizz = result;
        this.getQuiz();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
        Swal.fire('Error !!', 'error in loading data from server','error');
       }
     })
   }
 })  
}

}
