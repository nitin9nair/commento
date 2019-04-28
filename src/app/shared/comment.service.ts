// developed a comment service to get commentList via HTTP calls and this can be injected to any component 
// to get the list of comments
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // URL to get the commentlist
  API_URL = "https://api.myjson.com/bins/6ppzg";

  constructor(private _http: HttpClient) { }

  // method to get commentList data
  getCommentListData() {
    return this._http.get(this.API_URL).map((data) => {
      return data;
    });
  }
}
