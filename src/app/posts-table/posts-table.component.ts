import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import {BlogPost} from '../BlogPost'


@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {


  blogPosts: Array<BlogPost>;
  querySub:  any;
  

//  private livePostsSub; 
  constructor(private data: PostService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.querySub = this.data.getAllPosts().subscribe(posts => this.blogPosts = posts );
    
    console.log(this.blogPosts);
  }

 /*  rowClicked(e, id) {
    this.livePostsSub = this.data. getPostbyId(id).subscribe();
  } */
  rowClicked(e: Event, id: string) {
    e.preventDefault();
    this.router.navigate(['/admin', 'post', id]);
  }
}
