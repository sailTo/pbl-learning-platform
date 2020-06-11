import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';

import { CreateCourseComponent } from './components/create-course/create-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  currentUser: User = this.userService.getUser();
  courses: Course[];

  myTabTitle = {
    student: '我学的课',
    teacher: '我教的课',
  };

  type: string = 'my';
  myCourseTabTitle: string = this.myTabTitle[this.currentUser.type];
  otherCourseTabTitle: string = '其它课程';

  pageIndex: number = 1;
  pageSize: number = 8;
  total: number;

  numOfCardsARow: number = 4;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService
      .getCourses(
        this.type,
        this.currentUser.u_id,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((response) => {
        this.courses = response.data.courses.list;
        const teachers = response.data.teachers.list;
        this.total = response.data.total;

        // assign teacher to course
        this.courses.forEach((course, index) => {
          course.teacher = teachers[index];
        });
      });
  }

  changeTab(selectedTitle: string): void {
    // reset params
    this.pageIndex = 1;
    this.courses = [];

    if (selectedTitle === this.myCourseTabTitle) {
      this.type = 'my';
      this.getCourses();
    } else {
      this.type = 'other';
      this.getCourses();
    }
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
    }).afterClose.subscribe((flag: number) => {
      if (flag === undefined) {
        return;
      }
      this.getCourses();
    });
  }
}
