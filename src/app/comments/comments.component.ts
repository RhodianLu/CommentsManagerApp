import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comment$;
  postId$;

  constructor(private postService : PostService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => 
        this.postId$ = params.get('postId'));

    this.comment$ = this.postService.fetchComments(this.postId$);
  }

  showFilteredComments(postId)
  {
    var searchtext = ((document.getElementById("searchboxtxt") as HTMLInputElement).value);
    this.comment$ = this.postService.searchComments(postId, searchtext);

  }
}