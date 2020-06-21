import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';
import { CreateCourseComponent } from '../courses/components/create-course/create-course.component';

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

  type = 'all';
  pageIndex = 1;
  pageSize = 8;
  total: number;
  coursesTabTitle = '所有课程';
  numOfCardsARow = 4;
  editId = -1;

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

  // 项目管理员新建课程弹窗
  showModal(): void {
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

  // 编辑按键
  edit(index: number) {
    this.editId = index;
    console.log('编辑：' + index);
  }

  // 修改上传
  upload(course: Course) {
    console.log(course);
    this.courseService.changeCourse(course).subscribe((response) => {
      console.log(response);
      this.message.success(`课程修改成功`);
      this.getCourses();
    });

    this.editId = -1;
  }

  // 删除课程
  del(course: Course) {
    course.status = 0;
    this.courseService.changeCourse(course).subscribe((response) => {
      console.log(response);
      this.message.success(`课程删除成功`);
      this.getCourses();
    });

    this.editId = -1;
  }

  // 选择对应的老师
  onChange(value: any): void {
    if (value === null) {
      return;
    }
    console.log(value);
    this.courses[this.editId].t_id = value;
    this.courses[this.editId].teacher = this.allTeachers.find((teacher) => teacher.u_id === value);
  }
}
