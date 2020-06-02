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
  p_id: string;
  p_name: string;

  groupers: User[];

  user = {
    u_id: 4,
    type: 'S', 
    u_name: '学生4', 
    gender: 'M',
    description: '学生4简介',
    image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 
  };

  constructor(    
    private route: ActivatedRoute, 
    private userService: UserService, 
  ) { }

  ngOnInit(): void {
    // get params
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string}) => {
        this.p_id = params.p_id;
        this.p_name = params.p_name;
      }
    );

    // get groupers
    // this.getGroupers();
    this.groupers = [this.user, this.user, this.user];
  }

  getGroupers(): void {
    this.userService.getGroupersByProjectId(Number(this.p_id)).subscribe((data) => {
      this.groupers = data.groupers;
    })
  }

  stringifyGroupers(): string {
    return JSON.stringify(this.groupers);
  }

}
