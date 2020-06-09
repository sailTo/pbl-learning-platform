import { Component, OnInit,Input, OnChanges } from '@angular/core';
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import {columnItem} from '../../../models/colunmItem';
import { Project } from 'src/app/models/project';
import {ScoreService} from '../../../services/score.service';
import {UserService} from '../../../services/user.service'
import { NzMessageService } from 'ng-zorro-antd';
import { GradeItem } from 'src/app/models/GradeItem';
import {ItemData} from  '../../../models/ItemData';



@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit,OnChanges {
  @Input() selectProject:Project;
  searchValue = '';
  visible = false;
  userType: string;
  editId:string | null = null;
  canEdit:boolean;
  gradeItems:GradeItem[];
  maxDiscussNum : number;
  maxAssignmentDone:number;
  listofColumns: columnItem[];
  @Input() listOfData: ItemData[];
  listOfDisplayData:any;
  loading = false;
  constructor(
    private scoreService : ScoreService,
    private msgService : NzMessageService,
    private userService : UserService
    ){
      this.userType = this.userService.getUser().type;
  }
  ngOnChanges():void{
      
  }
  ngOnInit(): void {
    // const data = [];
    
    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     id : i,
    //     name: `Edward King ${i}`,
    //     taskNum: 10,
    //     taskScore: 20,
    //     remarkNum: 10,
    //     remarkScore: 20,
    //     selfScore : 20,
    //     mutualScore:20,
    //     teacherScore:0
    //   });
    // }
    // alert(this.selectProject);
   this.listofColumns = [
      {
        name: "学号",
        sortOrder: null,
        sortFn: (a:ItemData, b:ItemData) => {return a.s_id.localeCompare(b.s_id);}
      },
      {
        name: "姓名"
      },
      {
        name: "任务完成数",
        sortOrder: null,
        sortFn:  (a:ItemData, b:ItemData) => {return a.assignmentDoneNum-b.assignmentDoneNum;}
      },
      {
        name: "讨论版发言数",
        sortOrder: null,
        sortFn:  (a:ItemData, b:ItemData) => {return a.discussNum-b.discussNum;}
      },
      {
        name: "自评分",
        sortOrder: null,
        sortFn: null
      },
      {
        name: "互评分",
        sortOrder: null,
        sortFn: null
      },
    ];//固定的表头项
    // alert(JSON.stringify(this.selectProject));
    this.canEdit =this.userType!="student"&&(this.userType=="admin"|| !this.selectProject.grading_status);
    this.scoreService.getColumnItems(String(this.selectProject.p_id)).subscribe(
      (data)=>{
        if(data.code==200){
          //获得动态的表头项
            this.gradeItems =  data.data.grades;
            this.gradeItems.forEach((gradeItem) =>{
              var acolumn:columnItem = {
                name : gradeItem.description
              }
              this.listofColumns.push(acolumn);
            });
            this.listofColumns.push({
              name : "教师评分总分"
            });
            this.listofColumns.push({
              name : "总分",
              sortOrder: null,
              sortFn: (a:ItemData, b:ItemData) => {return (a.teacherAllScore+a.mutualScore+a.selfScore)-(b.teacherAllScore+b.mutualScore+b.selfScore);}
            });
            this.listofColumns.push({
              name : "操作"//提交button
            });
          //获得学生的得分和表现情况
          this.loading = true;
          this.scoreService.getCountDiscussion(String(this.selectProject.p_id)).subscribe(
            (discussionData)=>{
              if(discussionData.code==200){
                      this.maxDiscussNum = discussionData.data.maxDiscussNum;
                      this.listOfData = discussionData.data.discussInformations;
                      this.getAssignmentDone();
                      this.getSelfAndMutualScore();
                      this.getDynamicScore();
                      
                      
              }else{
                this.msgService.error("获取讨论数信息失败！");
              }
            }
          )
        }else{
          this.msgService.error("无法获得教师的评分细则！");
        }
      }
    );

    // this.listOfData = data;
    
  }

  getAssignmentDone(){
    this.scoreService.getAssignmentDone(String(this.selectProject.p_id)).subscribe(
      (assignmentData)=>{
        if(assignmentData.code ==200){
              this.maxAssignmentDone = assignmentData.data.totalAssignmentNum;
              // alert(assignmentData.data.doneInformations);
              assignmentData.data.doneInformations.forEach(
                (doneInformation,index)=>{
                  // alert(doneInformation.doneNum);
                  this.listOfData[index].assignmentDoneNum = doneInformation.doneNum;
                }
                )
              this.listOfDisplayData = [...this.listOfData]; 
        }else{
          this.msgService.error("获取任务数信息失败！");
        }
      }
    );
  }
  getSelfAndMutualScore(){
    this.scoreService. getSelfAndMutualScore(String(this.selectProject.p_id)).subscribe(
      (SelfAndMutualScoreData)=>{
        if(SelfAndMutualScoreData.code ==200){
          SelfAndMutualScoreData.data.selfAndMutualInformations.forEach(
                (discussInformation,index)=>{
                  this.listOfData[index].selfScore = discussInformation.selfScore;
                  this.listOfData[index].mutualScore = discussInformation.mutualScore;
                }
                );
                this.listOfDisplayData = [...this.listOfData]; 
        }else{
          this.msgService.error("获取个人自评互评信息失败！");
        }
      }
    );
  }
  getDynamicScore(){
    this.scoreService. getGradeItemScore(String(this.selectProject.p_id)).subscribe(
      (DynamicScoreData)=>{
        if(DynamicScoreData.code ==200){
          DynamicScoreData.data.allItems.forEach(
                (dynamicInformation,index)=>{
                  this.listOfData[index].dynamicScore = dynamicInformation.itemsList;
                  var teacherAllScore = 0;
                  this.listOfData[index].dynamicScore.forEach(
                    (item) =>{
                        if(item.grade==null){
                          item.grade = 0;
                        }else{
                          this.listOfData[index].haveScored = true;
                        }
                        // item.grade = item.grade==null?0:item.grade;
                        teacherAllScore += item.grade;
                        if( !this.listOfData[index].haveScored){
                          this.listOfData[index].haveScored = false;
                        }
                        
                    }
                  )
                  this.listOfData[index].teacherAllScore = teacherAllScore;
                }
                );
                this.listOfDisplayData = [...this.listOfData];
                this.loading = false; 
        }else{
          this.msgService.error("获取教师评分信息失败！");
        }
      }
    );
  }
  startEdit(id:string){
    this.editId = id;
  }
  stopEdit(data:ItemData): void {
    data.haveScored = true;
    this.editId = null;
    this.scoreService.postGradeItemScore(String(this.selectProject.p_id),data).subscribe(
      (data) =>{
         if(data.code==200){
           this.msgService.success("评分成功！");
         }else{
           this.msgService.error("评分失败！");
         }
      }
    )
  }
  updateTeacherScore(id:string){
    var aitem:ItemData = this.listOfData.find((x)=>x.s_id==id)
    var teacherAllScore = 0;
    var valid = true;
    aitem.dynamicScore.forEach(
      (item)=>{
        teacherAllScore+= + item.grade;
      }
    )
    // alert(teacherAllScore);
    // if(!valid){
    //   return;
    // }
    if(teacherAllScore>this.selectProject.teacher_grade_ratio){
      this.msgService.error("教师评分不能超出最高上限值！");
      return;
    }else{
      aitem.teacherAllScore = teacherAllScore;
    }
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: ItemData) => item.s_name.indexOf(this.searchValue) !== -1);
  }
  confirm():void{
    this.canEdit = false; 
  }
}
