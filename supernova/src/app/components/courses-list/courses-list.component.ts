import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: {
    c_id: number,
    t_id: number, 
    c_name: string, 
    t_name: string, 
    point: number, 
    description: string, 
    status: boolean, // 未发布false, 已发布true
    c_image_URL: string, // course封面图，没有的话应该返回默认图URL
    t_image_URL: string, // 教师头像，没有的话应该返回默认图URL
  }[];

  constructor() { }

  ngOnInit(): void {
  }

}
