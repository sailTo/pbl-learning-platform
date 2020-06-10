import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CourseService } from '../../services/course.service';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project';
import { CreateCourseComponent } from '../courses/components/create-course/create-course.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  optionList: { label: string; value: number }[];
  selectedValue: { label: string; value: number };
  projectTaking: number;
  projects: Project[];
  numOfCardsARow: number = 4;
  selectLoading: boolean = false;
  current_c_id: number;
  current_c_name: string;
  current_user: User;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private projectService: ProjectService,
    private modalService: NzModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getOptionList();
    this.projects = [];
    this.current_user = this.userService.getUser();
  }

  getOptionList(): void {
    this.optionList = [];
    this.selectLoading = true;

    this.courseService.getMyCourseNames().subscribe((response) => {
      response.data.courses.map((course) => {
        this.optionList.push({
          label: course.c_name,
          value: course.c_id,
        });
      });

      this.selectLoading = false;

      // get param c_id if there is
      this.route.params.subscribe((params: { c_id: string }) => {
        if (params.c_id) {
          this.selectedValue = this.optionList.find(
            (element) => element.value === Number(params.c_id)
          );
          // update project list if found select course
          if (this.selectedValue !== undefined) {
            this.onChange(this.selectedValue);
          }
        }
      });
    });
  }

  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  onChange(value: { label: string; value: number }): void {
    this.projects = [];
    this.current_c_id = value.value;
    this.current_c_name = value.label;

    if (value === null) {
      return;
    }

    this.projectService
      .findProjectsByCourseId(value.value)
      .subscribe((response) => {
        this.projectTaking = response.data.project_take;
        this.projects = response.data.projects;
      });
  }

  getProject(): void {
    console.log(this.current_c_id);
    this.projectService
      .findProjectsByCourseId(this.current_c_id)
      .subscribe((response) => {
        this.projectTaking = response.data.project_take;
        this.projects = response.data.projects;
      });
  }

  showModal(p_id: number): void {
    // this.isVisible = true;
    this.modalService
      .create({
        nzTitle: '新建项目',
        nzContent: CreateProjectComponent,
        nzComponentParams: {
          type: 'create',
          // p_id: p_id,
          course_id: this.current_c_id,
          course_name: this.current_c_name,
        },
      })
      .afterClose.subscribe((flag: number) => {
        if (flag === undefined) {
          return;
        }
        this.getProject();
      });
  }
}
