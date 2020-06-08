import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../../services/score.service';
import {Project} from '../../models/project';
import {Course} from '../../models/course'
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
 
  selectedCourse=null;
  selectedProject = null;
  courseData : Course[];
  projectData: { [courseId: string]: Project[] } = {};
  scoreDatas = null;
  constructor(
    private scoreService : ScoreService,
    private msgService : NzMessageService,
  ) { }
  courseChange(value: string): void {
    if(this.projectData[value].length>0){
      this.selectedProject = this.projectData[value][0].p_id;
    }
    
  }
  

  ngOnInit(): void {
    this.scoreService.getAllMyCourses().subscribe(
      (data) =>{
        if(data.code==200){
          this.courseData =  data.data.courses;
          // alert(JSON.stringify(this.courseData));
          this.courseData.forEach((acourse)=>{
            this.scoreService.getProjectsByCourseId(acourse.c_id).subscribe(
              (data)=>{
                if(data.code==200){
                  // alert(this.courseData[i].c_id);
                  this.projectData[String(acourse.c_id)] =  data.data.projects; 
                }else{
                  this.msgService.error("获得课程对应项目失败！");
                }
               
              }
            );
          }
          )

        }else{
          this.msgService.error("获得课程失败！");
        }
      }
    );
      

      
  }
  projectChange(){
    //获得选择的课程id ，并向数据库请求获得选课的学生以及对应的评分
    // if(this.selectedProject!=null){
    //    this.scoreService.getProjectScoreById(this.selectedProject)
    // }
  }
}
