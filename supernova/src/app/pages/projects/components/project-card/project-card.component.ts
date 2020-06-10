import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
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
import { Course } from '../../../../models/course';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit, AfterViewInit {
  @Input() project: Project;
  @Input() taken: boolean;
  @Input() canTake: boolean;
  @Input() c_name: string;
  @Output() change = new EventEmitter();

  @ViewChild('actionJoin') join: TemplateRef<void>;
  @ViewChild('actionInfo') info: TemplateRef<void>;
  @ViewChild('actionEdit') edit: TemplateRef<void>;
  @ViewChild('actionMember') member: TemplateRef<void>;
  @ViewChild('actionDiscussion') discussion: TemplateRef<void>;
  @ViewChild('actionDelete') delete: TemplateRef<void>;
  @ViewChild('actionFileMgmt') fileMgmt: TemplateRef<void>;

  groupers: User[];
  leaderId: string;

  currentUser: User = this.userService.getUser();

  // user = {
  //   u_id: "S4",
  //   type: 'S',
  //   u_name: '学生4',
  //   gender: 'M',
  //   description: '学生4简介',
  //   image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  // };

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
    private modalService: NzModalService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // get groupers
    this.getGroupers();
    this.actions = [];
    // this.groupers = [this.user, this.user, this.user];
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
    this.TEACHER_PANEL = [
      this.info,
      this.member,
      this.discussion,
      this.fileMgmt,
      this.delete,
    ];
    this.ADMIN_PANEL = [
      this.info,
      this.member,
      this.discussion,
      this.fileMgmt,
      this.edit,
      this.delete,
    ];

    const PANEL_TYPE_USER = {
      student: this.taken ? this.MY_PANEL : this.STUDENT_PANEL,
      teacher: this.TEACHER_PANEL,
      admin: this.project.grading_status
        ? this.ADMIN_PANEL.filter((item) => item !== this.edit)
        : this.ADMIN_PANEL,
    };

    this.actions = PANEL_TYPE_USER[this.currentUser.type];
  }

  getGroupers(): void {
    this.userService
      .getGroupersByProjectId(this.project.p_id)
      .subscribe((response) => {
        this.groupers = response.data.groupers;
        this.leaderId = response.data.leader;
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
      // this.change.emit();
    });
  }
}
