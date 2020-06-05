import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from "../../services/course.service";
import { ProjectService } from "../../services/project.service";
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  optionList: { label: string, value: number }[];
  selectedValue: { label: string, value: number };

  projectTaking: number;
  projects: Project[];

  numOfCardsARow: number = 4;

  selectLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getOptionList();
    this.projects = [];
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
      this.route.params.subscribe(
        (params: { c_id: string }) => {
          if (params.c_id) {
            this.selectedValue = this.optionList.find(element => element.value === Number(params.c_id));
            // update project list if found select course
            if (this.selectedValue !== undefined) {
              this.onChange(this.selectedValue);
            }
          }
        }
      );
    });
  }

  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  onChange(value: { label: string, value: number }): void {
    this.projects = [];

    if (value === null) {
      return;
    }

    this.projectService.findProjectsByCourseId(value.value).subscribe((response) => {
      this.projectTaking = response.data.project_take;
      this.projects = response.data.projects;
    })
  }

}
