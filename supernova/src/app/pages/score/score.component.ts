import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }
  selectedValue = null;
  onChanges(){
    //获得选择的课程id ，并向数据库请求获得选课的学生以及对应的评分
    
  }
}
