import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';

import { UserService } from 'src/app/services/user.service';

import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from '../../../../services/project.service';
import { NzModalService } from 'ng-zorro-antd';
import { CreateProjectComponent } from '../create-project/create-project.component';
import {ShowProjectComponent} from "../show-project/show-project.component";


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Input() taken: boolean;
  @Input() canTake: boolean;
  @Input() c_name: string;
  @Input() index: number;
  @Output() change = new EventEmitter();

  @ViewChild('actionJoin') join: TemplateRef<void>;
  @ViewChild('actionInfo') info: TemplateRef<void>;
  @ViewChild('actionEdit') edit: TemplateRef<void>;
  @ViewChild('actionMember') member: TemplateRef<void>;
  @ViewChild('actionDiscussion') discussion: TemplateRef<void>;
  @ViewChild('actionDelete') delete: TemplateRef<void>;
  @ViewChild('actionFileMgmt') fileMgmt: TemplateRef<void>;
  @ViewChild('actionTaskCompletion') taskCompletion: TemplateRef<void>;

  groupers: User[];
  leaderId: string;
  leader: User;
  loading = true;
  currentUser: User = this.userService.getUser();

  colorMapping = {
    0: '#52c41a', // red
    1: '#13c2c2', // orange
    2: '#fa8c16', // yellow
    3: '#fadb14', // cyan
    4: '#f5222d', // green
    5: '#722ed1', // purple
    6: '#d9d9d9', // grey
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
    private modalService: NzModalService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // get groupers
    this.getGroupers();
    this.actions = [];
  }

  onJoin(p_id: number): void {
    if (!this.canTake) {
      this.message.error('您已经加入过别的项目了');
      return;
    }
    if (this.project.grading_status) {
      this.message.error('该项目已结束，不可加入');
      return;
    }
    this.canTake = false;
    this.projectService.joinProject(p_id).subscribe((response) => {
      if (response.code === 200) {
        this.message.success(`加入项目成功！`);
        this.change.emit();
      } else {
        this.message.error(`加入项目失败，请稍后重试！`);
      }
    });
  }

  initControlPanel(): void {
    this.STUDENT_PANEL = [this.join];
    this.MY_PANEL = [
      this.info,
      this.member,
      this.discussion,
      this.fileMgmt,
      this.taskCompletion,
    ];
    this.TEACHER_PANEL = [
      this.info,
      this.member,
      this.discussion,
      this.fileMgmt,
      this.taskCompletion,
      this.delete,
    ];
    this.ADMIN_PANEL = [
      this.info,
      this.member,
      this.discussion,
      this.fileMgmt,
      this.taskCompletion,
      this.edit,
      this.delete,
    ];

    const PANEL_TYPE_USER = {
      student: this.taken
        ? this.currentUser.u_id === this.leaderId
          ? this.MY_PANEL
          : this.MY_PANEL.filter((item) => item !== this.taskCompletion)
        : this.STUDENT_PANEL,
      teacher: this.TEACHER_PANEL,
      admin: this.project.grading_status
        ? this.ADMIN_PANEL.filter((item) => item !== this.edit)
        : this.ADMIN_PANEL,
    };

    this.actions = PANEL_TYPE_USER[this.currentUser.type];

    //此处push仅用于测试
    // this.actions.push(this.edit);
  }

  getGroupers(): void {
    this.userService
      .getGroupersByProjectId(this.project.p_id)
      .subscribe((response) => {
        this.groupers = response.data.groupers;
        this.leaderId = response.data.leader;
        this.leader = this.groupers.find(grouper => grouper.u_id === this.leaderId);

        this.initControlPanel();

        this.loading = false;
      });
  }

  stringifyGroupers(): string {
    return JSON.stringify(this.groupers);
  }

  showModal(type: string, p_id: number): void {
    // let course_name =
    // this.isVisible = true;
    this.modalService.create({
      nzTitle: '项目详情',
      nzContent: CreateProjectComponent,
      nzComponentParams: {
        type,
        p_id,
        course_id: this.project.c_id,
        course_name: this.c_name,
      },
    });
  }

  deleteProject(p_id: number): void {
    this.projectService.deleteProject(p_id).subscribe((response) => {
      if (response.code === 200) {
        this.message.success(`删除项目成功！`);
        this.change.emit();
      } else {
        this.message.error(`删除项目失败，请稍后重试！`);
      }
    });
  }

  showDetails(p_id: number){
      this.modalService.create({
        nzTitle: '项目详情',
        nzContent: ShowProjectComponent,
        nzWidth: '70%',
        nzComponentParams: {
          p_id,
          course_name: this.c_name,
        },
      });
  }
}
