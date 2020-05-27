import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from "../../services/course.service";
import { ProjectService, Project } from "../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  project = {
    p_id: 2, 
    c_id: 4, 
    p_name: '项目名称', 
    description: '项目描述描述描述', 
    grading_status: false, // true 表示已评分，false 未评分
    teacher_grade_ratio: 0.2, 
    self_grade_ratio: 0.4, 
    mutual_grade_ratio: 0.4, 
  }

  optionList: {label: string, value: number}[];
  selectedValue: {label: string, value: number};

  projectTaking: number;
  projects: Project[];

  numOfCardsARow: number = 4;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private courseService: CourseService, 
    private projectService: ProjectService, 
  ) { }

  ngOnInit(): void {
    this.getOptionList();
    this.projects = [];

    // get param c_id if there is
    this.route.params.subscribe(
      (params: {c_id: string}) => {
        if (params.c_id) {
          this.selectedValue = this.optionList.find(element => element.value === Number(params.c_id));
          // update project list if found select course
          if (this.selectedValue !== undefined) {
            this.onChange(this.selectedValue);
          }
        }
      }
    );
  }

  getOptionList(): void {
    this.optionList = [];
    // this.courseService.getMyCourseNames().subscribe((data) => {
    //   data.map((element) => {
    //     this.optionList.push({
    //       label: element.c_name, 
    //       value: element.c_id, 
    //     });
    //   })
    // });
    this.optionList = [
      {label: '测试课程1', value: 1}, 
      {label: '测试课程2测试课程2测试课程2测试课程2', value: 2}, 
      {label: '测试课程3', value: 3}, 
      {label: '测试课程4', value: 4},
    ]
  }

  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  onChange(value: {label: string, value: number}): void {
    this.projects = [];

    if (value === null) {
      return;
    }

    // this.projectService.findProjectsByCourseId(value.value).subscribe((data) => {
    //   this.projectTaking = data.project_take;
    //   this.projects = data.projects;
    // })
    this.projectTaking = 4;
    for (let i = 0; i < 10; i++) {
      const project = {...this.project};
      project.p_id = i;
      this.projects.push(project);
    }
  }

}
