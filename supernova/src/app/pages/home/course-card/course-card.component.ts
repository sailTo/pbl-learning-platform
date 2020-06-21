import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-mycourse-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class MyCourseCardComponent implements OnInit {
  currentUser: User = this.userService.getUser();
  courses: Course[];

  pageIndex = 1;
  pageSize = 8;
  total: number;

  numOfCardsARow = 4;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private modalService: NzModalService
  ) {}
  ngOnInit() {
    this.getCourses();
  }
  getCourses(): void {
    this.courseService
      .getCourses('my', this.currentUser.u_id, this.pageIndex, this.pageSize)
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

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getCourses();
  }
}
