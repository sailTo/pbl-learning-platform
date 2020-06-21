import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Project } from '../../models/project';
import { Course } from '../../models/course';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  selectedCourse_id = null;
  selectedProject_id = null;
  selectedProject: Project = null;
  selectedCourse: Course = null;
  courseData: Course[];
  projectData: { [courseId: string]: Project[] } = {};
  scoreDatas = null;
  data = [];

  currentUser: User;

  constructor(
    private scoreService: ScoreService,
    private projectService: ProjectService,
    private msgService: NzMessageService,
    private userService: UserService
  ) {}
  courseChange(value: string): void {
    this.selectedCourse = this.courseData.find(
      (x) => x.c_id == this.selectedCourse_id
    );
    this.selectedProject = null;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();

    this.scoreService.getAllMyCourses().subscribe((data) => {
      if (data.code == 200) {
        this.courseData = data.data.courses;

        this.courseData.forEach((acourse) => {
          this.projectService
            .findProjectsByCourseId(acourse.c_id)
            .subscribe((response) => {
              if (response.code == 200) {
                if (this.currentUser.type === 'student') {
                  this.projectData[
                    String(acourse.c_id)
                  ] = response.data.projects.filter(
                    (project) => project.p_id === response.data.project_take
                  );
                } else {
                  this.projectData[String(acourse.c_id)] =
                    response.data.projects;
                }
              } else {
                this.msgService.error('获得课程对应项目失败！');
              }
            });
        });
      } else {
        this.msgService.error('获得课程失败！');
      }
    });
  }
  projectChange(value: { label: string; value: number }) {
    this.selectedProject = this.projectData[this.selectedCourse_id].find(
      (x) => x.p_id == this.selectedProject_id
    );
  }
}
