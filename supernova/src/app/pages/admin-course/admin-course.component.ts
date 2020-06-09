import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CreateCourseComponent } from '../courses/components/create-course/create-course.component';


@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})

export class AdminCourseComponent implements OnInit {
  currentUser: User = this.userService.getUser();
  courses: Course[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private modalService: NzModalService,
  ) { }

  type: string = 'all';
  pageIndex: number = 1;
  pageSize: number = 8;
  total: number;
  coursesTabTitle: string = "所有课程";
  numOfCardsARow: number = 4;

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses(this.type, this.currentUser.u_id, this.pageIndex, this.pageSize).subscribe((response) => {
      this.courses = response.data.courses.list;
      const teachers = response.data.teachers.list;
      this.total = response.data.total;
      console.log(this.courses)
      // assign teacher to course
      this.courses.forEach((course, index) => {
        course.teacher = teachers[index];
      })
    });
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getCourses();
  }

  showModal(): void {
    // this.isVisible = true;
    this.modalService.create({
      nzTitle: '新建课程',
      nzContent: CreateCourseComponent,
    })
  }
}
