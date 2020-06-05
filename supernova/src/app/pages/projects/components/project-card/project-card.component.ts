import { Component, Input, TemplateRef, ViewChild, AfterViewInit, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

import { UserService } from 'src/app/services/user.service';

import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit, AfterViewInit {
  @Input() project: Project;
  @Input() taken: boolean;
  @Input() canTake: boolean;

  @ViewChild('actionJoin') join: TemplateRef<void>;
  @ViewChild('actionInfo') info: TemplateRef<void>;
  @ViewChild('actionEdit') edit: TemplateRef<void>;
  @ViewChild('actionMember') member: TemplateRef<void>;
  @ViewChild('actionDiscussion') discussion: TemplateRef<void>;
  @ViewChild('actionDelete') delete: TemplateRef<void>;
  @ViewChild('actionFileMgmt') fileMgmt: TemplateRef<void>;

  groupers: User[];

  user = {
    u_id: "S4",
    type: 'S', 
    u_name: '学生4', 
    gender: 'M',
    description: '学生4简介',
    image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 
  };

  // card下的控制按键列表
  actions: TemplateRef<void>[] = [];

  STUDENT_PANEL: TemplateRef<void>[];
  MY_PANEL: TemplateRef<void>[];
  TEACHER_PANEL: TemplateRef<void>[];
  ADMIN_PANEL: TemplateRef<void>[];

  constructor(
    private message: NzMessageService, 
    private userService: UserService, 
    private changeDectect: ChangeDetectorRef, 
  ) { }

  ngOnInit():void {
    // get groupers
    // this.getGroupers();
    this.actions = [];
    this.groupers = [this.user, this.user, this.user];
  }

  ngAfterViewInit(): void {
    this.initControlPanel();
    this.changeDectect.detectChanges();
  }

  onJoin(): void {
    if (!this.canTake) {
      this.message.error('您已经加入过别的项目了');
      return;
    }
    // TODO: join logic
  }

  initControlPanel(): void {
    this.STUDENT_PANEL = [this.join];
    this.MY_PANEL = [this.info, this.member, this.discussion, this.fileMgmt];
    this.TEACHER_PANEL = [this.info, this.member, this.discussion, this.fileMgmt, this.delete];
    this.ADMIN_PANEL = [this.info, this.member, this.discussion, this.fileMgmt, this.edit, this.delete];

    const PANEL_TYPE_USER = {
      'student': this.taken ? this.MY_PANEL : this.STUDENT_PANEL, 
      'teacher': this.TEACHER_PANEL, 
      'admin': this.ADMIN_PANEL, 
    };

    this.actions = PANEL_TYPE_USER['student'];
  }

  getGroupers(): void {
    this.userService.getGroupersByProjectId(this.project.p_id).subscribe((data) => {
      this.groupers = data.groupers;
    })
  }

  stringifyGroupers(): string {
    return JSON.stringify(this.groupers);
  }

}
