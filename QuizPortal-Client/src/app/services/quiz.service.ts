import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  getAllQuiz(){
    return this.http.get(environment.baseUrl + '/quiz');
  }

  getQuizById(quizId :any){
    return this.http.get(`${environment.baseUrl}/quiz/${quizId}`)
  }

  createQuiz(data :any){
    return this.http.post(environment.baseUrl + '/quiz',data)
  }

  updateQuiz(data :any){
    return this.http.put(environment.baseUrl + '/quiz',data)
  }


  removeQuiz(quizId :any){
    return this.http.delete(`${environment.baseUrl}/quiz/${quizId}`)
  }

  getQuizzesOfCategories(categoryId :any){
    return this.http.get(`${environment.baseUrl}/quiz/category/${categoryId}`)
  }
    //get active quizzes
  getActiveQuizzes(){
    return this.http.get(environment.baseUrl + '/quiz/active')
  }
    // get Active Quizzes Of Category
  getActiveQuizzesOfCategory(categoryId :any){
    return this.http.get(`${environment.baseUrl}/quiz/category/active/${categoryId}`)
  }
}
