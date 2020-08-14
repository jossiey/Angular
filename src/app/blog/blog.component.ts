import { Component, OnInit, OnDestroy } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

 // blogPosts: Array<BlogPost> = blogData; 

 blogPosts: Array<BlogPost>;

 page:  number = 1;
 tag:   string = null;
 category: string = null;
 querySub:  any;

 
 constructor(private data: PostService, private route: ActivatedRoute ) { }
 
 private livePostsSub;
 getPage(num: any): void {
  this.livePostsSub = this.data.getPosts(num, this.tag, this.category).subscribe(data => this.blogPosts = data);
      if(this.livePostsSub.length > 0) {
     this.blogPosts = this.livePostsSub;
     this.page = num;
    // console.log(this.page);
   }
  }

 ngOnInit(): void { 
 
  this.querySub = this.route.queryParams.subscribe(params => {
    if(params['tag']){
    this.tag = params['tag'];
    this.category = null;
    }else{
    this.tag = null;
    }
    if(params['category']){
    this.category = params['category'];
    this.tag = null;
    }else{
    this.category = null;
    }
    this.getPage(+params['page'] || 1);
  });
}
  
ngOnDestroy() {
  if(this.querySub){this.querySub.unsubscribe();}
}

}