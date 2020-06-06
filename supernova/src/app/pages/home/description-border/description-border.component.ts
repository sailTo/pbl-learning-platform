import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { UploadFile } from 'ng-zorro-antd/upload';
import {User} from '../../../models/user';
import {HomeService} from  '../../../services/home.service'
import { HttpParams } from '@angular/common/http';
import {environment} from '../../../../environments/environment'
// interface data{
//   id: string;
//   name: string;
//   gender: string;
//   description: string;
//   courses :courseItems[];
// }

interface courseItems{
  name: string;
  path: string;
  description:string;
}

@Component({
  selector: 'app-description-border',
  templateUrl: './description-border.component.html'
})
export class DescriptionBorderComponent implements OnInit {
  @Input()  u_id :string; 
  canEdit : boolean;//是否有权限编辑
  editStatus:boolean;//编辑状态
  datas:User ;
  copydata:User;
  defaultImg = environment.defaultImgPath;

  loading = false;
  avatarUrl: string;
  constructor(
    private msg: NzMessageService,
    private homeServicce: HomeService
  ){
    
  }
  ngOnInit(){
    
    this.getUser(this.u_id);
    
    
   
  }
  startEdit(){
    this.editStatus = true;
  }

  cancelEdit(){
    this.datas = JSON.parse(JSON.stringify(this.copydata));
    // Object.assign( this.copydata,this.datas);
  
    // this.datas = this.copydata;
    this.editStatus = false;
  }

  saveEdit(){
    //向数据库发送数据
    this.homeServicce.changeInformation(this.datas,this.datas.image).subscribe(
      (data) =>{
        if(data.code==200){
          alert("保存成功!");
          this.copydata = JSON.parse(JSON.stringify(this.datas));
          
        }else{
          //error
          this.datas = JSON.parse(JSON.stringify(this.copydata));
          alert("登录超时！");
        }
      }
    )
    this.editStatus=false;
    
    
  }
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  getUser(u_id:string){
      // alert(u_id);
     this.homeServicce.getUser(u_id).subscribe(
       (data)=>{
        // alert(JSON.stringify(data.data.content))
      if(data.code==200){
        // alert(data.data.content);
        this.datas = data.data.content;
        // alert(this.datas.u_id);
        // this.datas.image = JSON.parse(data.data).image;
        
        this.copydata = JSON.parse(JSON.stringify(this.datas));
        if(this.u_id==JSON.parse(localStorage.getItem("User")).u_id){
          this.canEdit = true;
        }else{
          this.canEdit = false;
        }
        
        // alert(this.datas.u_id);
      }else{
        alert("error");
        //error
      }
      
    });
   
  }

  resetAvatar(){
    //将头像恢复为默认的头像
    this.datas.image = this.defaultImg;
    this.homeServicce.changeInformation(this.datas,null);
  }

  // changePassword(){
  //   //添加弹窗，弹窗中是表单
  // }


}
