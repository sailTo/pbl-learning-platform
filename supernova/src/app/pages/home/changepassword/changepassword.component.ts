import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {AuthService} from '../../../services/auth.service';
import {HomeService} from '../../../services/home.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent {
  isVisible = false;
  isConfirmLoading = false;
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  error= "";
  constructor(
    private messageservice:NzMessageService,
    private authService:AuthService,
    private homeService:HomeService
     ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
   
    //在页面加载时向数据库发送请求获得用户的password，在此处进行对比
    if(this.newPassword!=this.confirmPassword){
      this.messageservice.info("两次输入的密码应当一致！");
    }else{
        if(Md5.hashStr(this.oldPassword)==String(JSON.parse(localStorage.getItem("User")).password)){
          var get_user = JSON.parse(localStorage.getItem("User"));
          get_user.password =Md5.hashStr(this.newPassword);
          this.homeService.changeInformation(get_user,get_user.image).subscribe(
            (data) =>{
              if(data.code==200){
                //修改成功 修改前端token值
                alert(data);
                get_user.token =  data.data.message;
                localStorage.setItem("User",JSON.stringify(get_user));
                alert("修改密码成功！");
              }
            else{
                  //error
                this.error = "连接超时"
                }
            }
          )
        }else{
          //原有密码错误
          this.error = "您输入的密码不正确！";
        }
       
      //this.changepasswordService.changePassword(this.oldPassword,this.newPassword);
    }
    
    this.isConfirmLoading = false;
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
