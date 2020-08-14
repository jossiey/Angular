import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { Subscription } from 'rxjs';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;  
  querySub:  Subscription;
  
  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }
  
 
  ngOnInit(): void {   
    this.querySub = this.route.params.subscribe(params =>{      
      this.data.getPostbyId(params['id']).subscribe(post => {
        this.blogPost = post;
        this.tags = post.tags.toString();
     //   console.log(this.blogPost);        
      });        
    })   
 
  }

  formSubmit(form: NgForm): void {
      if (form.valid) {
      this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
      this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(() =>this.router.navigate(['admin']));
    }
  }

  deletePost() : void {
     this.data.deletePostById(this.blogPost._id).subscribe(() =>this.router.navigate(['admin']));
  }

}
