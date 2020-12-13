import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BlogPost}  from './BlogPost';


const perPage = 6;


@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }
 
  getPosts(page, tag, category): Observable<BlogPost[]> {
    if(tag){      
      return this.http.get<BlogPost[]>(`https://web-blog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&tag=${tag}`)
    }
    else if(category){
      return this.http.get<BlogPost[]>(`https://web-blog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&category=${category}`)
    }
    else
    return this.http.get<BlogPost[]>(`https://web-blog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`)
  }
 
  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://web-blog-api.herokuapp.com/api/posts/${id}`)
  }

  getCategories(): Observable<any> {
    return this.http.get<BlogPost>(`https://web-blog-api.herokuapp.com/api/categories`)
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://web-blog-api.herokuapp.com/api/tags`)
  }

  getAllPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`https://web-blog-api.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`)
  }
 
  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://web-blog-api.herokuapp.com/api/posts`, data);

  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://web-blog-api.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://web-blog-api.herokuapp.com/api/posts/${id}`);
  }

}
