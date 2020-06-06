import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FileService } from 'src/app/services/file.service';

import { File } from "src/app/models/file";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {  
  p_id: number;
  groupers: User[];
  files: File[];

  isVisible = false;
  isOkLoading = false;

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
  ) { }

  ngOnInit(): void {
    // get files
    // this.getFiles();
    this.files = (() => {
      let files = [];
      for (let i = 0; i < 3; i++) {
        this.file.f_id = i;
        files.push(JSON.parse(JSON.stringify(this.file)));
      }
      return files;
    })();

    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string, groupers: string}) => {
        this.p_id = Number(params.p_id);
        this.groupers = JSON.parse(params.groupers);

        this.processFiles();
        console.log(this.files);
      }
    );
  }

  getFiles(): void {
    this.fileService.getFilesByProjectId(this.p_id).subscribe((response) => {
      this.files = response.data.files;
    });
  }

  processFiles(): void {
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
    // TODO: download logic
    this.fileService.getFileString(file.p_id, file.f_id).subscribe((response) => {
      const blob = new Blob([response.data.file_str]);
      const link = document.createElement('a');

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', file.f_name);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log('HTML 5 download feature not supported. ');
      }
    })
  }

  deleteFile(file: File): void {
    // TODO: delete logic
    // this.files = this.files.filter((file) => file.f_id !== file.f_id);
    this.fileService.deleteFile(file.p_id, file.f_id).subscribe((response) => {
      if (response.code === 200) {
        this.message.success(`${file.f_name}已成功删除`);
      } else {
        this.message.error(`${file.f_name}删除失败，请稍后重试！`);
      }
    });
  }

  showUploadModel(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
