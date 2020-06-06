import { Component, OnInit } from '@angular/core';
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import {columnItem} from '../../../models/colunmItem';
interface ItemData {
  id: number;
  name: string;
  taskNum: number;
  taskScore: number;
  remarkNum: number;
  remarkScore: number;
  selfScore : number;
  mutualScore:number;
  teacherScore:number;
}


@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {
  searchValue = '';
  visible = false;
  editId:number | null = null;
  canEdit:boolean;
  compare = (a, b) => {return a.name.localeCompare(b.name);};
  listofColumns: columnItem[] = [
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
      name: "任务完成得分",
      sortOrder: null,
      sortFn: this.compare
    },
    {
      name: "讨论版发言数",
      sortOrder: null,
      sortFn: this.compare
    },
    {
      name: "讨论版得分",
      sortOrder: null,
      sortFn:this.compare
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
    {
      name: "教师加分",
      sortOrder: null,
      sortFn: this.compare
    },
    {
      name: "总分",
      sortOrder: null,
      sortFn: this.compare
    },
  ];
  listOfData: ItemData[] = [];
  listOfDisplayData:any;

  ngOnInit(): void {
    const data = [];
    this.canEdit = true;
    for (let i = 0; i < 100; i++) {
      data.push({
        id : i,
        name: `Edward King ${i}`,
        taskNum: 10,
        taskScore: 20,
        remarkNum: 10,
        remarkScore: 20,
        selfScore : 20,
        mutualScore:20,
        teacherScore:0
      });
    }
    this.listOfData = data;
    this.listOfDisplayData = [...this.listOfData];
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
    this.listOfDisplayData = this.listOfData.filter((item: ItemData) => item.name.indexOf(this.searchValue) !== -1);
  }
  confirm():void{
    this.canEdit = false; 
  }
}
