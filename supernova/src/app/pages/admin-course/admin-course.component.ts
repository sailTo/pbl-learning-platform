import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';

import { CreateCourseComponent } from '../courses/components/create-course/create-course.component';
import { isThisQuarter } from 'date-fns';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css'],
})
export class AdminCourseComponent implements OnInit {
  currentUser: User = this.userService.getUser();
  courses: Course[];
  allTeachers: User[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private adminService: AdminService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  type: string = 'all';
  pageIndex: number = 1;
  pageSize: number = 8;
  total: number;
  coursesTabTitle: string = '所有课程';
  numOfCardsARow: number = 4;
  editId: number = -1;

  ngOnInit(): void {
    this.getCourses();

    console.log(this.allTeachers);
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
        console.log(this.courses);
        // assign teacher to course
        this.courses.forEach((course, index) => {
          course.teacher = teachers[index];
        });
      });

    this.adminService.getAllTeachers().subscribe((response) => {
      console.log(response);
      this.allTeachers = response.data;
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
    });
  }

  edit(index: number) {
    this.editId = index;
    console.log('编辑：' + index);
  }

  upload(course: Course) {
    console.log(course);
    this.courseService.changeCourse(course).subscribe((response) => {
      console.log(response);
      this.message.success(`课程修改成功`);
    });

    this.editId = -1;
  }

  del(course: Course) {
    course.status = 0;
    this.courseService.changeCourse(course).subscribe((response) => {
      console.log(response);
      this.message.success(`课程删除成功`);
    });

    this.editId = -1;
  }

  onChange(value: any): void {
    if (value === null) {
      return;
    }
    console.log(value);
    // this.courses[this.editId].t_id = value.u_id;
    // this.courses[this.editId].teacher = value;

    this.courses[this.editId].t_id = value;
    this.courses[this.editId].teacher = this.allTeachers.find((teacher) => teacher.u_id === value);

    // this.courses[this.editId].teacher.u_name = value.label;
  }
}
