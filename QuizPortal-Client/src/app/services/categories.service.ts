import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get(environment.baseUrl +"/category");
  }

  getCategoriesById(categoryId:any){
    return this.http.get(environment.baseUrl + "/category/"+categoryId);
  }

  addCategories(data:any){
    return this.http.post(environment.baseUrl + '/category',data)
  }

  updateCategories(data :any){
    return this.http.put(environment.baseUrl + '/category',data)
  }

  removeCategories(categoryId :any){
   return this.http.delete(environment.baseUrl + "/category/"+categoryId)
  }
}
