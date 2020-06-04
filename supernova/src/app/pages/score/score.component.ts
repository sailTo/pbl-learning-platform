import { Component, OnInit } from '@angular/core';
import {ScoreService,ret_courseData} from '../../services/score.service';
import {Project} from '../../models/project'
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
 
  selectedCourse=null;
  selectedProject = null;
  courseData : ret_courseData[];
  projectData: { [courseId: string]: Project[] } = {};
  scoreDatas = null;
  constructor(
    private scoreService : ScoreService
  ) { }
  courseChange(value: string): void {
    this.selectedProject = this.projectData[value][0].p_id;
  }
  

  ngOnInit(): void {
      this.courseData = this.scoreService.getAllMyCourses();
      for(var i=0;i<this.courseData.length;i++){
        this.projectData[String(this.courseData[i].c_id)] =   this.scoreService.getProjectsByCourseId(this.courseData[i].c_id);
      }

      
  }
  projectChange(){
    //获得选择的课程id ，并向数据库请求获得选课的学生以及对应的评分
    if(this.selectedProject!=null){
       this.scoreService.getProjectScoreById(this.selectedProject)
    }
  }
}
