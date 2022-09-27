import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {

  constructor(private _httpclient:HttpClient) { }
  getAllQuizQuestionByQuizId(reqData: any) {
    return this._httpclient.post(environment.getAllQuizQuestion, reqData);
  }
  // deleteQuiz(reqDdata: any) {
  //   return this._httpclient.delete(environment.deleteQuizDetails+reqDdata);
  // }
  createQuizQuestion(reqData: any) {    
    return this._httpclient.post(environment.createQuizQuestion, reqData);
  }
  updateQuizQuestion(reqData: any) {    
    return this._httpclient.put(environment.updateQuizQuestion, reqData);
  }
  getQuizQuestionById(reqData: any) {
    return this._httpclient.get(environment.getQuizQuestionDetailsById+reqData);
  }
}
