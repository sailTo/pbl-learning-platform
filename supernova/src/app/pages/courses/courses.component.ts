import { Component, OnInit } from '@angular/core';

import { CourseService } from "../../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course = {
    c_id: 4,
    t_id: 4, 
    c_name: "course name", 
    t_name: "teacher name", 
    point: 2.0, 
    description: "course description", 
    status: true, // 未发布false, 已发布true
    c_image_URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // course封面图，没有的话应该返回默认图URL
    t_image_URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 教师头像，没有的话应该返回默认图URL
  };

  courses: {
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

  contentTabIndex: number;

  myCourseTabTitle: string;
  otherCourseTabTitle: string;

  constructor(
    private courseService: CourseService, 
  ) { }

  ngOnInit(): void {
    this.myCourseTabTitle = '我学的课';
    this.otherCourseTabTitle = '其它课程';
    // this.courseService.getMyCourses().subscribe((data) => this.courses = data);
    this.courses = [this.course, this.course, this.course, this.course];
  }

}
