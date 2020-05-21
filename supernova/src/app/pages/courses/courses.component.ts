import { Component, OnInit } from '@angular/core';

import { CourseService, Course } from 'src/app/services/course.service';

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

  courses: Course[];

  myCourseTabTitle: string = '我学的课';
  otherCourseTabTitle: string = '其它课程';

  constructor(
    private courseService: CourseService, 
  ) { }

  ngOnInit(): void {
    this.courseService.getMyCourses().subscribe((data) => this.courses = data);
    this.courses = [this.course, this.course, this.course, this.course, this.course, this.course];
  }

  changeTab(selectedTitle: string): void {
    if (selectedTitle === this.myCourseTabTitle) {
      // this.courseService.getMyCourses().subscribe((data) => {this.courses = data;});
      this.courses = [this.course, this.course, this.course, this.course];
    } else {
      // this.courseService.getOtherCourses().subscribe((data) => {this.courses = data;});
      this.courses = [this.course, this.course, ];
    }
  }

  onPageIndexChange(pageIndex: number) {
    // TODO: request implementation
    console.log(pageIndex);
  }

}
