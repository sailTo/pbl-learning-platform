import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

import { File } from "src/app/models/file";
import { User } from 'src/app/models/user';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit {  
  p_id: number;
  groupers: User[];
  files: File[];
  currentUser: User = this.userService.getUser();

  isVisible = false;
  isOkLoading = false;

  buttonVis = false;
  uploading = false;

  isLoadingOne = false;

  description = null;

  fileList: UploadFile[] = [];

  file = {
    f_id: 1,
    p_id: 1,
    u_id: "S001",
    f_name: '文件名称',
    description: '文件描述',
    file_URL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  }

  constructor(
    private route: ActivatedRoute, 
    private message: NzMessageService, 
    private fileService: FileService,
    private userService: UserService,
    private http: HttpClient, 
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string, groupers: string}) => {
        this.p_id = Number(params.p_id);
        this.groupers = JSON.parse(params.groupers);

        this.getFiles();
        console.log(this.files);
      }
    );
  }

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);

  }

  getFiles(): void {
    console.log("getfile!");
    this.fileService.getFilesByProjectId(this.p_id).subscribe((response) => {
      this.files = response.data;
      this.processFiles();
    });
  }

  processFiles(): void {
    console.log(this.files);
    this.files.forEach((file, index) => {
      // map u_id in file to u_name
      file['u_name'] = this.groupers.find(
        (grouper) => grouper.u_id === file.u_id
      )['u_name'];

      // add key to each file
      file['key'] = index + 1;
    });
  }

  downLoadFile(file: File): void {
    console.log("downfile!");
    // TODO: download logic
    const link = 'http://123.56.219.88:8081/api/downloadFile?pbl_token='+String(this.userService.getUser().token)+'&p_id='+file.p_id+'&f_id='+file.f_id;
    window.open(link, '_blank');
  }

  deleteFile(file: File): void {
    // TODO: delete logic
    // this.files = this.files.filter((file) => file.f_id !== file.f_id);
    this.fileService.deleteFile(file.p_id, file.f_id).subscribe((response) => {
      if (response.code === 200) {
        this.files = this.files.filter(item => item !== file);
        this.message.success(`${file.f_name}已成功删除`);
      } else {
        this.message.error(`${file.f_name}删除失败，请稍后重试！`);
      }
    });

    
  }

  showUploadModel(): void {
    this.buttonVis = true;
    this.isVisible = true;
  }

  beforeUpload = (file: UploadFile): boolean => {
    console.log("beforeUpload");
    console.log(file);
    //如果文件大小大于10M则不允许上传
    if(file.size>10000000){
      this.message.create('error',file.name+'上传失败,文件大小超过10M');
    }else{
      this.fileList = this.fileList.concat(file);
    }
    // this.buttonVis = false;
    return false;
  };

  handleUpload(): void {
    console.log("handleUpload");
    this.isLoadingOne = true;
    setTimeout(() => {
      this.fileList.forEach((fileUpload: any) => {
        this.fileService.upLoadFile(fileUpload,fileUpload.name,this.description,this.p_id).subscribe(
          (test:any) => {
            console.log("upload success!");
            this.message.create('success',fileUpload.name+'上传成功');
            // console.log(test.body.data);
            this.files = this.files.concat(JSON.parse(JSON.stringify(test.body.data["file"])));
            this.processFiles();
          },
          () => {
            console.log("upload fail!");
            this.message.create('error',fileUpload.name+'上传失败');
          }
        );
      });
      this.fileList = []
      this.isLoadingOne = false;
      this.handleCancel();
    }, 1000);
  }

  handleCancel(): void {
    this.fileList = [];
    this.isVisible = false;
    this.description = null;
  }

}
