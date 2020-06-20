import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { UploadFile } from 'ng-zorro-antd/upload';
import { User } from '../../../models/user';
import { HomeService } from '../../../services/home.service'
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { UserService } from 'src/app/services/user.service';
// interface data{
//   id: string;
//   name: string;
//   gender: string;
//   description: string;
//   courses :courseItems[];
// }

interface courseItems {
  name: string;
  path: string;
  description: string;
}

@Component({
  selector: 'app-description-border',
  templateUrl: './description-border.component.html',
})
export class DescriptionBorderComponent implements OnInit {
  @Input() u_id: string;
  canEdit: boolean;//是否有权限编辑
  editStatus: boolean;//编辑状态
  datas: User;
  copydata: User;
  defaultImg = environment.defaultImgPath;

  loading = false;
  avatarUrl: string;
  imgValid = false;
  constructor(
    private msg: NzMessageService,
    private homeServicce: HomeService,
    private userService: UserService,
    private changeDetect: ChangeDetectorRef
  ) {

  }
  ngOnInit() {

    this.getUser(this.u_id);
  }
  startEdit() {
    this.editStatus = true;
  }

  cancelEdit() {
    this.datas = JSON.parse(JSON.stringify(this.copydata));
    // Object.assign( this.copydata,this.datas);

    // this.datas = this.copydata;
    this.editStatus = false;
  }

  saveEdit() {
    //向数据库发送数据
    this.homeServicce.changeInformation(this.datas).subscribe(
      (data) => {
        if (data.code == 200) {
          this.msg.success("保存成功!");
          this.copydata = JSON.parse(JSON.stringify(this.datas));
          var temp = this.datas;
          temp.token = JSON.parse(localStorage.getItem("User")).token;
          localStorage.setItem("User", JSON.stringify(temp));
        } else {
          //error
          this.datas = JSON.parse(JSON.stringify(this.copydata));
          this.msg.error('保存失败！');
        }
      }
    )
    this.editStatus = false;


  }
  beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG file!');
      this.imgValid = false;
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
      this.imgValid = false;
      return false;
    }
    this.imgValid = true;
    this.handleChange(file);
    return false;
  };

  handleChange(file: UploadFile): void {
    // alert(1);
    if (!this.imgValid) {
      return;
    }
    this.loading = true;
    // Get this url from response in real world.
    this.homeServicce.uploadImg(file, this.datas.u_id).subscribe(
      (data: any) => {
        if (data.body.code == 200) {

          this.datas.image = data.body.data.img;
          var temp = this.datas;
          temp.token = JSON.parse(localStorage.getItem("User")).token;
          localStorage.setItem("User", JSON.stringify(temp));
          this.msg.success("上传头像成功！");
          this.ngOnInit();
        } else {
          this.msg.error("上传头像失败!");
        }
        this.loading = false;
      }
    );
  }
  getUser(u_id: string) {
    // alert(u_id);
    this.homeServicce.getUser(u_id).subscribe(
      (data) => {
        if (data.code == 200) {
          this.datas = data.data.content;

          this.copydata = JSON.parse(JSON.stringify(this.datas));
          if (this.u_id == JSON.parse(localStorage.getItem("User")).u_id) {
            this.canEdit = true;
          } else {
            this.canEdit = false;
          }

        } else {
          this.msg.error("获取用户失败！");
          this.userService.logout();
          //error
        }

      });

  }

  resetAvatar() {
    //将头像恢复为默认的头像
    // this.datas.image = this.defaultImg;
    this.homeServicce.uploadImg(null, this.datas.u_id).subscribe(
      (data: any) => {
        if (data.body.code == 200) {
          this.msg.success("恢复成功!");
          this.datas.image = data.body.image;
          this.copydata = JSON.parse(JSON.stringify(this.datas));
          var temp = this.datas;
          temp.token = JSON.parse(localStorage.getItem("User")).token;
          localStorage.setItem("User", JSON.stringify(temp));
          this.ngOnInit();
        } else {
          //error
          this.msg.error("恢复失败！");
        }
      }
    );
  }

  // changePassword(){
  //   //添加弹窗，弹窗中是表单
  // }
}
