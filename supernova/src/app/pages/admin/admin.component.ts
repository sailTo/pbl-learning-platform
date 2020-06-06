import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {columnItem} from '../../models/colunmItem';
import {AdminService} from '../../services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  editId:string | null = null;
  searchValue = "";
  searchVisible = false;
  compare = (a, b) => {return a.name.localeCompare(b.name);};
  listofColumns: columnItem[] = [
    {
      name: "工号",
      sortOrder: null,
      sortFn: this.compare
    },
    {
      name: "姓名"
    },
    {
      name: "身份",
    },
    {
      name:"性别",
    },
    {
      name: "密码",
   
    },
   
    {
      name: ""//按钮
    }

  ];
  listOfData: User[] = [];
  listOfDisplayData:any;
  
  constructor(
    private adminService : AdminService
  ) { }

  ngOnInit(): void {
  }

  startEdit(id:string){
    this.editId = id;
  }

  stopEdit(): void {
    // var hasEditId = this.editId;
    var editUser = this.listOfDisplayData.find(x=>x.u_id===this.editId);
    //向数据库更新信息
    this.adminService.updateInformation(editUser);
    
    this.editId = null;
    
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    this.listOfDisplayData = this.listOfData.filter((item: User) => item.u_name.indexOf(this.searchValue) !== -1);
  }
  changePassword(id:string){

  }



}
