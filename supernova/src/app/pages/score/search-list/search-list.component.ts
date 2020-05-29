import { Component } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {
  selectedValue = null;
  onChanges(){
    //获得选择的课程id ，并向数据库请求获得选课的学生以及对应的评分
    
  }
}
