import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  requestPassword = "123456";
  constructor(private messageservice:NzMessageService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    //在页面加载时向数据库发送请求获得用户的password，在此处进行对比
    if(this.requestPassword!=this.oldPassword){
      this.messageservice.info("你的密码输入错误！");
      
    }else{
      if(this.newPassword!=this.confirmPassword){
        this.messageservice.info("两次输入的密码应当一致！");
      }else{
          //向数据库发送更改
          setTimeout(() => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.messageservice.info("密码修改成功！");
          }, 3000);
      }
    }
    this.isConfirmLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
