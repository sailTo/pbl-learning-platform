import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course = {c_id: 4,
    t_id: 4, 
    c_name: "course name", 
    t_name: "teacher name", 
    point: 2.0, 
    description: "course description", 
    status: true, // 未发布false, 已发布true
    c_image_URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // course封面图，没有的话应该返回默认图URL
    t_image_URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 教师头像，没有的话应该返回默认图URL
  }

  constructor() { }

  ngOnInit(): void {
  }

}
