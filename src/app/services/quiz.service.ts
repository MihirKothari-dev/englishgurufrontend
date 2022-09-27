import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _httpclient:HttpClient) { }
  getAllQuiz() {
    return this._httpclient.get(environment.getAllQuiz);
  }
  deleteQuiz(reqDdata: any) {
    return this._httpclient.delete(environment.deleteQuizDetails+reqDdata);
  }
  createQuiz(reqData: any) {    
    return this._httpclient.post(environment.addQuizDetails, reqData);
  }
  updateQuiz(reqData: any) {    
    return this._httpclient.put(environment.updateQuizDetails, reqData);
  }
  getQuizById(reqData: any) {
    return this._httpclient.post(environment.getQuizDetailsById,reqData);
  }
  getQuizScoreByUser(reqData: any) {
    return this._httpclient.post(environment.getQuizScoreByUser, reqData);
  }
}
