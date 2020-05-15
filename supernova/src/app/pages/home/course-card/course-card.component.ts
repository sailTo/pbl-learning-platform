import { Component, OnInit } from '@angular/core';

interface courseData{
  name: string;
  url : string;
  description: string;
}

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})


export class CourseCardComponent implements OnInit {
  arr = Array;
  courseDatas: courseData[]=[];
  linesNum : Number;
  gridStyle = {
    width: '25%',
    textAlign: 'center',
    margin: 12
  };
  constructor(){

  }
  ngOnInit(){
    this.linesNum = 3;
    for( var i=0;i<4;i++){
      var coursedata = {name:"myname"+ i , url :"https://www.baidu.com/"+ i , description :"区别就在于，$apply是对$rootScope及子作用域做脏值检测，意味着性能消耗更大。支持回掉函数算是一个好处。"}
      this.courseDatas.push(coursedata);
    }
    
  }


}
