import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuestionOfQuiz(q_quizId :any){
    return this.http.get(`${environment.baseUrl}/question/all/${q_quizId}`)
   }
 
   getQuestionById(quesId :any){
     return this.http.get(`${environment.baseUrl}/question/${quesId}`);
   }
 
   createQuestion(data :any){
     return this.http.post(environment.baseUrl + '/question',data);
   }
 
   UpdateQuestion(data :any){
     return this.http.put(environment.baseUrl +'/question',data);
   }
 
   removeQuestion(quesId : any){
     return this.http.delete(`${environment.baseUrl}`+ '/question/'+`${quesId}`);
   }
}
