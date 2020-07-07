import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IComment } from './comments/comment';

@Injectable()
export class PostService {
    testvalue$;
    commentcon: IComment[];
    constructor (private http: HttpClient) {}

    fetchPosts(): Observable<Object> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }

    fetchComments(postId): Observable<IComment> {
        let link = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId;
        return this.http.get<IComment>(link);
        
    }
    searchComments(postId, searchtext): Observable<Object> {
        var comments = [];

        let link = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId;
        let objArr = this.http.get<IComment>(link);
        objArr.subscribe(comment => {
        this.commentcon = comment as unknown as IComment[]
        })

        if(searchtext != null && searchtext != "")
        {
            this.commentcon.forEach(comment => 
                {
                  if (comment.name.toLowerCase().toString().includes(searchtext.toString().toLowerCase())
                   || comment.email.toLowerCase().toString().includes(searchtext.toString().toLowerCase())
                   || comment.body.toLowerCase().toString().includes(searchtext.toString().toLowerCase())
                  )
                    {
                      comments.push(comment);
                    }
                });
            
          return of(comments);
        }
        else{
            return objArr;
        }        
    }
}