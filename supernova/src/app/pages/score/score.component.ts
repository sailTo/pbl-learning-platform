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
 
  selectedCourse_id = null;
  selectedProject_id = null;
  selectedProject:Project = null;
  selectedCourse:Course = null;
  courseData : Course[];
  projectData: { [courseId: string]: Project[] } = {};
  scoreDatas = null;
  data = [];
  constructor(
    private scoreService : ScoreService,
    private msgService : NzMessageService,
  ) { }
  courseChange(value: string): void {
   this.selectedCourse = this.courseData.find((x)=>x.c_id ==this.selectedCourse_id);
   
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
  projectChange(value: { label: string; value: number }){
    this.selectedProject  = this.projectData[this.selectedCourse_id].find((x)=>x.p_id==this.selectedProject_id);
    
    //获得选择的课程id ，并向数据库请求获得选课的学生以及对应的评分
    // if(this.selectedProject!=null){
    //    this.scoreService.getProjectScoreById(this.selectedProject)
    // }
    
  }
}
