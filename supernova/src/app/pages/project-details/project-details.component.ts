import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  p_id: number;
  p_name: string;

  groupers: User[];
  leaderId: string;
  // 以下部分用于本地测试数据
  user1 = {
    u_id: 'S001',
    type: '学生',
    u_name: '黄元敏',
    gender: '男',
    description: '5student_1 for test',
    image: 'http://123.56.219.88/SuperNova/UploadImage/default.jpg',
  };
  user2 = {
    u_id: 'S002',
    type: '学生',
    u_name: '张思源',
    gender: '男',
    description: '3student_2 for test',
    image: 'http://123.56.219.88/SuperNova/UploadImage/S002.jpeg',
  };
  user3 = {
    u_id: 'S003',
    type: '学生',
    u_name: '李翀',
    gender: '男',
    description: '3student_3 for test',
    image: 'http://123.56.219.88/SuperNova/UploadImage/S003.jpg',
  };
  constructor(    
    private route: ActivatedRoute, 
    private userService: UserService, 
  ) { }

  ngOnInit(): void {
    // get params
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string}) => {
        this.p_id = Number(params.p_id);
        this.p_name = params.p_name;
      }
    );

    // get groupers
    this.getGroupers();
  }

  getGroupers(): void {
    this.groupers = [this.user1,this.user2,this.user3];
    // this.userService.getGroupersByProjectId(this.p_id).subscribe((response) => {
    //   this.groupers = response.data.groupers;
    //   this.leaderId = response.data.leader;
    // })
  }

  stringifyGroupers(): string {
    return JSON.stringify(this.groupers);
  }

}
