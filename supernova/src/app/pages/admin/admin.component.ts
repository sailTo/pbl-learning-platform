import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {columnItem} from '../../models/colunmItem';
import {AdminService} from '../../services/admin.service';
import {HomeService} from '../../services/home.service';
import { Md5 } from 'ts-md5';
import {environment} from '../../../environments/environment';
import {NzMessageService} from 'ng-zorro-antd'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  editId:string | null = null;
  searchValue = "";
  searchVisible = false;
  storePassords:string[] = [];
  listofColumns: columnItem[] = [
    {
      name: "工号",
      sortOrder: null,
      sortFn:  (a:User, b:User) => {return a.u_id.localeCompare(b.u_id);}
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
      name: "个人简介"
    },
    {
      name: "密码",
   
    },
    {
      name: "操作"//提交按钮
    },

  ];
  listOfData: User[] = [];
  listOfDisplayData:any;
  
  constructor(
    private adminService : AdminService,
    private homeService : HomeService,
    private msgService : NzMessageService
  ) { }

  ngOnInit(): void {
    this.adminService.getUserInformation().pipe().subscribe(
      (data) =>{
        if(data.code==200){
          this.listOfData = data.data.users;
          for(var i=0;i<this.listOfData.length;i++){
            this.listOfData[i].image = data.data.images[i];
            this.storePassords[i] = this.listOfData[i].password;
            this.listOfData[i].password = null;
          }
          this.listOfData = this.listOfData.filter((item: User) => item.status==true);
          this.listOfDisplayData = [...this.listOfData];
          
        }else{
          this.msgService.error("获取用户失败！");
        }
       
      }
      
    )
  }

  startEdit(id:string){
    // alert(1);
    this.editId = id;
  }

  stopEdit(): void {
    // var hasEditId = this.editId;
    
    var editUser = this.listOfDisplayData.find((x)=>x.u_id===this.editId);
    var index =  this.listOfDisplayData.findIndex((x)=>x.u_id===this.editId);
    //向数据库更新信息
    // alert(this.storePassords);
    if(editUser.password==null){
      editUser.password = this.storePassords[index];
    }else{
      editUser.password = Md5.hashStr(editUser.password);
    }
   
    this.adminService.updateInformation(editUser).subscribe(
      (data) =>{
        if(data.code ==200){
          this.msgService.success("修改成功！");
          this.storePassords[index] = editUser.password;
          editUser.password = null;
        }else{
          this.msgService.error("修改失败");
        }
        
      }
     
    );
    
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
  deleteUser(){
    var editUser = this.listOfDisplayData.find((x)=>x.u_id===this.editId);
    var index =  this.listOfDisplayData.findIndex((x)=>x.u_id===this.editId);

    editUser.status = false;
    this.homeService.getUser(environment.deleteU_id).subscribe(
      (data)=>{
        if(data.code==200){
            var delete_user = data.data.content;
            editUser.u_name = delete_user.u_name;
            editUser.type = delete_user.type;
            editUser.description = delete_user.description;
            editUser.image = delete_user.image;
            editUser.gender = delete_user.gender;
            this.adminService.updateInformation(editUser).subscribe(
              (data) =>{
                if(data.code ==200){
                  this.msgService.success("删除成功！");
                  this.storePassords[index] = null;
                }else{
                  this.msgService.error("删除失败");
                }
                
              }
             
            );
        }else{
          this.msgService.error("获取删除用户失败!")
        }
      }
    )

  }


}
