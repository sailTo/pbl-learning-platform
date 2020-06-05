import { Component, Input, TemplateRef, ViewChild, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { CourseService } from 'src/app/services/course.service';

import { Course } from 'src/app/models/course';
import { NzButtonType } from 'ng-zorro-antd/button/ng-zorro-antd-button';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html'
})
export class CourseCardComponent implements AfterViewInit, OnChanges {
    @Input() course: Course;
    @Input() type: string;

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
    }

    // 课程card下的控制按键列表
    actions: TemplateRef<void>[] = [];

    STUDENT_MY_PANEL: TemplateRef<void>[];
    STUDENT_OTHER_PANEL: TemplateRef<void>[];
    TEACHER_MY_PANEL: TemplateRef<void>[];
    TEACHER_OTHER_PANEL: TemplateRef<void>[];
    ADMIN_PANEL: TemplateRef<void>[];
    SIMPLE_PANEL: TemplateRef<void>[];

    // 确认框
    confirmModal?: NzModalRef;

    constructor(
        private modal: NzModalService,
        private message: NzMessageService, 
        private courseService: CourseService, 
    ) { }

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
        }

        this.STUDENT_MY_PANEL = [this.info];
        this.STUDENT_OTHER_PANEL = [this.join];
        this.TEACHER_MY_PANEL = PANEL_STATUS[this.course.status];
        this.TEACHER_OTHER_PANEL = [];
        this.ADMIN_PANEL = PANEL_STATUS[this.course.status];
        this.SIMPLE_PANEL = [];

        const PANEL_TYPE_USER = {
            'my': {
                'student': this.STUDENT_MY_PANEL,
                'teacher': this.TEACHER_MY_PANEL,
            },
            'other': {
                'student': this.STUDENT_OTHER_PANEL,
                'teacher': this.TEACHER_OTHER_PANEL,
            },
            'admin': {
                'admin': this.ADMIN_PANEL,
            },
            // 用于简单显示，没有操作按键
            'simple': {
                'student': this.SIMPLE_PANEL,
                'teacher': this.SIMPLE_PANEL,
                'admin': this.SIMPLE_PANEL,
            }
        };

        this.actions = PANEL_TYPE_USER[this.type]['student'];
    }

    showConfirm(title: string, type: NzButtonType): void {
        this.confirmModal = this.modal.confirm({
            nzTitle: title,
            // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
            nzOkType: type, 
            nzOnOk: () => {
                this.courseService.joinCourse(this.course.c_id).subscribe((response) => {
                    if (response.code === 200) {
                        this.message.success(`加入课程${this.course.c_name}成功！`);
                        this.change.emit();
                    } else {
                        this.message.error(`加入课程${this.course.c_name}失败，请稍后重试！`);
                    }
                })
            }
        });
    }
}
