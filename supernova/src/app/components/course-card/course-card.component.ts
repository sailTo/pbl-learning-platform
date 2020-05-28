import { Component, Input, TemplateRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';

import { Course } from 'src/app/model/course';


@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html'
})
export class CourseCardComponent implements AfterViewInit, OnChanges {
    @Input() course: Course;
    @Input() type: string;

    @ViewChild('actionJoin') join: TemplateRef<void>;
    @ViewChild('actionInfo') info: TemplateRef<void>;
    @ViewChild('actionEdit') edit: TemplateRef<void>;
    @ViewChild('actionPublish') publish: TemplateRef<void>;
    @ViewChild('actionDelete') delete: TemplateRef<void>;
    @ViewChild('actionResume') resume: TemplateRef<void>;

    BADGE_STATUS = {
        'unpublished': 'default', 
        'published': 'success', 
        'deleted': 'error', 
    }

    // 课程card下的控制按键列表
    actions: TemplateRef<void>[] = [];
    
    STUDENT_MY_PANEL: TemplateRef<void>[];
    STUDENT_OTHER_PANEL: TemplateRef<void>[];
    TEACHER_MY_PANEL: TemplateRef<void>[];
    TEACHER_OTHER_PANEL: TemplateRef<void>[];
    ADMIN_PANEL: TemplateRef<void>[];
    SIMPLE_PANEL: TemplateRef<void>[];

    constructor() { }

    ngAfterViewInit(): void {
        this.initControlPanel();
    }

    ngOnChanges(): void {
        this.ngAfterViewInit();
    }

    initControlPanel(): void {
        const PANEL_STATUS = {
            'unpublished': [this.edit, this.publish], 
            'published': [this.info, this.delete], 
            'deleted': [this.info, this.resume], 
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

        this.actions = PANEL_TYPE_USER[this.type]['teacher'];
    }
}
