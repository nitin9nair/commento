import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  // getting values from parent 'commentlist' component to child via @Input decorator
  @Input() parentId:number;
  @Input() commentList:any [];

  // sending values from 'comment' component to parent component via @Output decorator and Eventemitter
  @Output() commentValueUpdate = new EventEmitter<any>();

  // flag to check for which comment to be replied
  replyCommentFlag: number = null;
  constructor() { }

  ngOnInit() {
  }

  // method to remove comments with different parentId
  removeSameLevelComments(commentList,parentId){
    return commentList.filter(item=>item.parentId!=parentId);
  }

  // method to launch the reply comment form
  openReplyForm(commentId) {
    this.replyCommentFlag = commentId;
  }

  // method to generate the reply comment for a specific comment based on commentId of the parent comment
  postReplyComment(form: NgForm, levelNum, commentId, commentList) {

    // fetching reply author name and comment from the form
    const replyAuthorName = form.value.replyAuthorName;
    const replyAuthorComment = form.value.replyAuthorComment;

    // fetching commentList from localStorage
    commentList = JSON.parse(localStorage.getItem("commentListArray"));

    // setting current Date and Time
    let currentDate = new Date();
    let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();

    // pushing new value to comment list
    commentList.push( {
      commentId: commentList.length + 1,
      author: replyAuthorName,
      comment: replyAuthorComment,
      datePosted: currentDate.toDateString() + " " + currentTime,
      level: levelNum + 1,
      parentId: commentId
    });

    // using localStorage to store the commentList
    localStorage.setItem("commentListArray", JSON.stringify(commentList));
    this.replyCommentFlag = null;

    // emitting updated commentList
    this.commentValueUpdate.emit(commentList);
  }

  // emit updatedlist from child to parent component
  reEmitUpdatedList(updatedList) {
    updatedList = JSON.parse(localStorage.getItem("commentListArray"));
    this.commentValueUpdate.emit(updatedList);
  }

  // method to clear/reset the form
  onClearForm(form: NgForm) {
    form.reset();
  }
}
