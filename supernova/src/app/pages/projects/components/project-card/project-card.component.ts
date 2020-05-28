import { Component, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements AfterViewInit {
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

  // card下的控制按键列表
  actions: TemplateRef<void>[] = [];

  STUDENT_PANEL: TemplateRef<void>[];
  MY_PANEL: TemplateRef<void>[];
  TEACHER_PANEL: TemplateRef<void>[];
  ADMIN_PANEL: TemplateRef<void>[];

  constructor(
    private message: NzMessageService
  ) { }

  ngAfterViewInit(): void {
    this.initControlPanel();
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

    let PANEL_TYPE_USER = {
      'student': this.taken ? this.MY_PANEL : this.STUDENT_PANEL, 
      'teacher': this.TEACHER_PANEL, 
      'admin': this.ADMIN_PANEL, 
    };

    this.actions = PANEL_TYPE_USER['student'];
}

}
