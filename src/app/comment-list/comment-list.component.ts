import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { CommentService } from "../shared/comment.service";
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs";
import { CommentComponent } from "./comment/comment.component";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"]
})
export class CommentListComponent implements OnInit, OnDestroy {
  // commentList variable
  commentList: any = [];
  commentListLocalStorage: any = [];
  subscription: Subscription;

  @ViewChild(CommentComponent) commentChild: CommentComponent;

  // injecting commentService to use the method to get comment list values
  constructor(public commentService: CommentService) {}

  ngOnInit() {
    // subscribing to the comments
    this.subscription = this.commentService.getCommentListData().subscribe(data => {
      this.commentList = data;

      // checking if localStorage is present or not based on that create the localStorage
      if (localStorage.getItem("commentListArray") === null) {
        this.commentListLocalStorage = this.commentList;
        localStorage.setItem(
          "commentListArray",
          JSON.stringify(this.commentListLocalStorage)
        );

      } else {
        this.commentListLocalStorage = JSON.parse(localStorage.getItem("commentListArray"));
      }
    });
  }

  // using postComment method to post name and comment
  postComment(form: NgForm) {
    const authorName = form.value.authorName;
    const authorComment = form.value.authorComment;

    // setting current Date and Time
    let currentDate = new Date();
    let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();

    // adding new comment to commentList 
    this.commentListLocalStorage.push( {
      commentId: this.commentList.length + 1,
      author: authorName,
      comment: authorComment,
      datePosted: currentDate.toDateString() + " " + currentTime,
      level: 0,
      parentId: 0
    });

    // using localStorage to set the array post submitting the form
    localStorage.setItem("commentListArray", JSON.stringify(this.commentListLocalStorage));
    form.reset();
  }

  // method to clear the form input fields
  onClearForm(form: NgForm) {
    form.reset();
  }

  // getting updated commentList form child component
  getUpdatedComment(newUpdatedList) {
    this.commentListLocalStorage = newUpdatedList;
    localStorage.setItem("commentListArray", JSON.stringify(this.commentListLocalStorage));
  }

  ngOnDestroy() {
    // unsubscribing the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
