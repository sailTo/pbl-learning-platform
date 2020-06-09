import { Component, OnInit,Input } from '@angular/core';
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import {columnItem} from '../../../models/colunmItem';
import { Project } from 'src/app/models/project';
import {ScoreService} from '../../../services/score.service';
import { NzMessageService } from 'ng-zorro-antd';
import { GradeItem } from 'src/app/models/GradeItem';
interface ItemData {
  s_id: string;
  s_name: string;
  discussNum?: number;
  assignmentDoneNum?: number;
  selfScore?: number;
  mutualScore?:number;
  dynamicScore?: DynamicScore[];
}
interface DynamicScore{
  item_id: string,
  item_name: string,
  grade : number
}


@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {
  @Input() selectProject:Project;
  searchValue = '';
  visible = false;
  editId:number | null = null;
  canEdit:boolean;
  gradeItems:GradeItem[];
  maxDiscussNum : number;
  maxAssignmentDone:number;
  compare = (a, b) => {return a.name.localeCompare(b.name);};
  listofColumns: columnItem[];
  listOfData: ItemData[] = [];
  listOfDisplayData:any;
  constructor(
    private scoreService : ScoreService,
    private msgService : NzMessageService
  ){

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
   this.listofColumns = [
      {
        name: "学号",
        sortOrder: null,
        sortFn: this.compare
      },
      {
        name: "姓名"
      },
      {
        name: "任务完成数",
        sortOrder: null,
        sortFn: this.compare
      },
      {
        name: "讨论版发言数",
        sortOrder: null,
        sortFn: this.compare
      },
      {
        name: "自评分",
        sortOrder: null,
        sortFn: this.compare
      },
      {
        name: "互评分",
        sortOrder: null,
        sortFn: this.compare
      },
    ];//固定的表头项

    this.canEdit = !this.selectProject.grading_status;
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
          //获得学生的得分和表现情况
          this.scoreService.getCountDiscussion(String(this.selectProject.p_id)).subscribe(
            (discussionData)=>{
              if(discussionData.code==200){
                      this.maxDiscussNum = discussionData.data.maxDiscussNum;
                      this.listOfData = discussionData.data.discussInformations;
                      this.getAssignmentDone();
                      this.getSelfAndMutualScore();
              }else{
                this.msgService.error("获取讨论数信息失败！");
              }
            }
          )
        }else{
          this.msgService.error("无法获得教师的评分细则！");
        }
      }
    )

    // this.listOfData = data;
    // this.listOfDisplayData = [...this.listOfData];
  }

  getAssignmentDone(){
    this.scoreService.getAssignmentDone(String(this.selectProject.p_id)).subscribe(
      (assignmentData)=>{
        if(assignmentData.code ==200){
              this.maxAssignmentDone = assignmentData.data.totalAssignmentNum;
              assignmentData.data.doneInformations.forEach(
                (doneInformation,index)=>{
                  this.listOfData[index].assignmentDoneNum = doneInformation.doneNum;
                }
                )
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
                )
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
          DynamicScoreData.data.allitems.forEach(
                (dynamicInformation,index)=>{
                  this.listOfData[index].dynamicScore = dynamicInformation.itemsList;
                }
                )
        }else{
          this.msgService.error("获取教师评分信息失败！");
        }
      }
    );
  }
  startEdit(id:number){
    this.editId = id;
  }
  stopEdit(): void {
    this.editId = null;
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
