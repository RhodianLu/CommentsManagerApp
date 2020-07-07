import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post$;

  constructor(private postService : PostService, private router : Router) { }

  ngOnInit(): void {
    
    this.post$ = this.postService.fetchPosts();
  }

  showComments(postId){
    this.router.navigate(['comments',postId]);
  }  
}
