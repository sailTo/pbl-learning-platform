import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd';

import { CourseService } from 'src/app/services/course.service';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements AfterViewInit, OnChanges {
  @Input() course: Course;
  @Input() type: string;
  @Input() currentUser?: User;

  @Output() change = new EventEmitter();

  @ViewChild('actionJoin') join: TemplateRef<void>;
  @ViewChild('actionInfo') info: TemplateRef<void>;
  @ViewChild('actionEdit') edit: TemplateRef<void>;
  @ViewChild('actionPublish') publish: TemplateRef<void>;
  @ViewChild('actionDelete') delete: TemplateRef<void>;
  @ViewChild('actionResume') resume: TemplateRef<void>;

    BADGE_STATUS = {
        1: 'default',
        2: 'success',
        0: 'error',
    };

  // 课程card下的控制按键列表
  actions: TemplateRef<void>[] = [];

  STUDENT_MY_PANEL: TemplateRef<void>[];
  STUDENT_OTHER_PANEL: TemplateRef<void>[];
  TEACHER_MY_PANEL: TemplateRef<void>[];
  TEACHER_OTHER_PANEL: TemplateRef<void>[];
  ADMIN_PANEL: TemplateRef<void>[];
  SIMPLE_PANEL: TemplateRef<void>[];

  // modal
  loading = false;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private courseService: CourseService
  ) {}

  ngAfterViewInit(): void {
    this.initControlPanel();
  }

  ngOnChanges(): void {
    this.ngAfterViewInit();
  }

  initControlPanel(): void {
    const PANEL_STATUS = {
      1: [this.edit, this.publish],
      2: [this.info, this.delete],
      0: [this.info, this.resume],
    };

    this.STUDENT_MY_PANEL = [this.info];
    this.STUDENT_OTHER_PANEL = [this.join];
    this.TEACHER_MY_PANEL = PANEL_STATUS[this.course.status];
    this.TEACHER_OTHER_PANEL = [];
    this.ADMIN_PANEL = PANEL_STATUS[this.course.status];
    this.SIMPLE_PANEL = [];

    const PANEL_TYPE_USER = {
      my: {
        student: this.STUDENT_MY_PANEL,
        teacher: this.TEACHER_MY_PANEL,
      },
      other: {
        student: this.STUDENT_OTHER_PANEL,
        teacher: this.TEACHER_OTHER_PANEL,
      },
      admin: {
        admin: this.ADMIN_PANEL,
      },
      // 用于简单显示，没有操作按键
      simple: {
        student: this.SIMPLE_PANEL,
        teacher: this.SIMPLE_PANEL,
        admin: this.SIMPLE_PANEL,
      },
    };

    this.actions = PANEL_TYPE_USER[this.type][this.currentUser.type];
  }

  showJoinConfirm(): void {
    this.modal.confirm({
      nzTitle: `确认加入课程${this.course.c_name}吗？`,
      nzOkLoading: this.loading,
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () => {
        this.loading = true;
        this.courseService
          .joinCourse(this.course.c_id)
          .subscribe((response) => {
            this.loading = false;
            if (response.code === 200) {
              this.message.success(`加入课程${this.course.c_name}成功！`);
              this.change.emit();
            } else {
              this.message.error(
                `加入课程${this.course.c_name}失败，请稍后重试！`
              );
            }
          });
      },
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `确认删除课程${this.course.c_name}吗？`,
      nzContent: '<b>删除之后不可恢复<b/>',
      nzOkType: 'danger',
      nzOkLoading: this.loading,
      nzOnOk: () => {
        this.loading = true;
        this.courseService.deleteCourse(this.course).subscribe((response) => {
          this.loading = false;
          if (response.code === 200) {
            this.message.success(`删除课程${this.course.c_name}成功！`);
            this.change.emit();
          } else {
            this.message.error(
              `删除课程${this.course.c_name}失败，请稍后重试！`
            );
          }
        });
      },
    });
  }

  showPublishConfirm(action: string): void {
    this.modal.confirm({
      nzTitle: `确认${action}课程${this.course.c_name}吗？`,
      nzContent: `<b>${action}之后学生可见<b/>`,
      nzOkLoading: this.loading,
      nzOnOk: () => {
        if (action === '发布') {
          this.loading = true;
          this.courseService
            .publishCourse(this.course)
            .subscribe((response) => {
              this.loading = false;
              if (response.code === 200) {
                this.message.success(
                  `${action}课程${this.course.c_name}成功！`
                );
                this.change.emit();
              } else {
                this.message.error(
                  `${action}课程${this.course.c_name}失败，请稍后重试！`
                );
              }
            });
        } else if (action === '恢复') {
          this.loading = true;
          this.courseService.resumeCourse(this.course).subscribe((response) => {
            this.loading = false;
            if (response.code === 200) {
              this.message.success(`${action}课程${this.course.c_name}成功！`);
              this.change.emit();
            } else {
              this.message.error(
                `${action}课程${this.course.c_name}失败，请稍后重试！`
              );
            }
          });
        } else {
          this.message.error('出错了，请稍后重试！');
        }
      },
    });
  }
}
