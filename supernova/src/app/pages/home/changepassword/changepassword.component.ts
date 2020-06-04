import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ChangePasswordService} from '../../../services/change-password.service';
import {AuthService} from '../../../auth/auth.service';
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
  constructor(
    private messageservice:NzMessageService,
    private changepasswordService: ChangePasswordService,
    private authService:AuthService
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
        this.changepasswordService.changePassword(this.oldPassword,this.newPassword).subscribe(
          (data) =>{
            if(data.code==200){
              //修改成功 修改前端token值

            }else{
              if(data.code==204){
                //原有密码错误
              }else{
                //error
              }
            }
          }
        )
      //this.changepasswordService.changePassword(this.oldPassword,this.newPassword);
    }
    
    this.isConfirmLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
