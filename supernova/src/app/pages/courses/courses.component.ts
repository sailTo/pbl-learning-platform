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
    status: "published", // 未发布unpublished, 已发布published, 已删除deleted
    c_image_URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // course封面图，没有的话应该返回默认图URL
    t_image_URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 教师头像，没有的话应该返回默认图URL
  };

  dcourse = {
    c_id: 4,
    t_id: 4, 
    c_name: "course name", 
    t_name: "teacher name", 
    point: 2.0, 
    description: "course description", 
    status: "deleted", // 未发布unpublished, 已发布published, 已删除deleted
    c_image_URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // course封面图，没有的话应该返回默认图URL
    t_image_URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 教师头像，没有的话应该返回默认图URL
  };

  ucourse = {
    c_id: 4,
    t_id: 4, 
    c_name: "course name", 
    t_name: "teacher name", 
    point: 2.0, 
    description: "course description", 
    status: "unpublished", // 未发布unpublished, 已发布published, 已删除deleted
    c_image_URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // course封面图，没有的话应该返回默认图URL
    t_image_URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 教师头像，没有的话应该返回默认图URL
  };

  courses: Course[];

  type: string = 'my';
  myCourseTabTitle: string = '我学的课';
  otherCourseTabTitle: string = '其它课程';

  pageIndex: number = 1;
  pageSize: number = 8;
  total: number;

  constructor(
    private courseService: CourseService, 
  ) { }

  ngOnInit(): void {
    // this.getCourses();
    this.total = 10;
    this.courses = [this.course, this.dcourse, this.ucourse, this.course, this.course, this.course];
  }

  getCourses(): void {
    this.courseService.getCourses(this.type, this.pageIndex, this.pageSize).subscribe((data) => {
      this.courses = data.courses;
      this.total = data.total;
    });
  }

  changeTab(selectedTitle: string): void {
    this.pageIndex = 1;
    if (selectedTitle === this.myCourseTabTitle) {
      this.type = 'my';
      // this.getCourses();
      this.courses = [this.course, this.course, this.course, this.course, this.course, this.course];
    } else {
      this.type = 'other';
      // this.getCourses();
      this.courses = [this.course, this.course, ];
    }
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    // this.getCourses();
  }

}