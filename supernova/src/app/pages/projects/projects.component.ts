import { Component, OnInit } from '@angular/core';

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
    private courseService: CourseService, 
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getOptionList();
    this.projects = [];
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
    // this.projectService.findProjectsByCourseId(value.value).subscribe((data) => {
    //   this.projectTaking = data.project_take;
    //   this.projects = data.projects;
    // })
    this.projects = [this.project, ];
  }

}
