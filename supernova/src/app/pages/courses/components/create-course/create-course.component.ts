import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { NzModalRef, UploadFile, NzMessageService } from 'ng-zorro-antd';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable, Observer } from 'rxjs';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',

  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  currentUser: User = this.userService.getUser();
  validateForm: FormGroup;
  fileList: UploadFile[] = [];
  course: Course;
  @Input() course_id: number;
  @Input() setType: string;
  // @Output() change = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private msg: NzMessageService,
    private courseService: CourseService
  ) {
    this.validateForm = this.fb.group({
      c_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      point: ['', [Validators.required]],
      t_id: [this.currentUser.u_id, [this.uploadValidator]],
      // image: ['', [this.uploadValidator]],
    });
  }

  ngOnInit(): void {
    if (this.setType == 'edit') {
      this.courseService.getCourse(this.course_id).subscribe((data) => {
        console.log(data.data.course);
        this.course = data.data.course;
        this.userService
          .getUserById(String(this.course.t_id))
          .subscribe((data) => {
            this.currentUser = data.data.user;
            this.validateForm.controls.t_id.updateValueAndValidity();
          });

        this.validateForm.controls.c_name.setValue(this.course.c_name);
        this.validateForm.controls.description.setValue(
          this.course.description
        );
        this.validateForm.controls.point.setValue(this.course.point);

        for (const key in this.validateForm.controls)
          this.validateForm.controls[key].updateValueAndValidity();
      });
    }
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: Course): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.course = {
      c_id: null,
      c_name: this.validateForm.controls.c_name.value,
      description: this.validateForm.controls.description.value,
      t_id: this.validateForm.controls.t_id.value,
      point: this.validateForm.controls.point.value,
      status: 0,
      image_URL: null,
    };
    // console.log(this.course);
    console.log(this.fileList[0]);
    this.courseService.createCourse(this.course,this.fileList[0]).subscribe((data: any) => {
      console.log(data.body);
      if (data.body.code == 200) {

        // var temp = this.datas;
        // temp.token = JSON.parse(localStorage.getItem("User")).token;
        // localStorage.setItem("User", JSON.stringify(temp));
        this.msg.success("新建课程成功！");
        this.modal.destroy(1);
        // this.change.emit();
      } else {
        this.msg.error("新建课程失败!");
      }
      // this.loading = false;
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.fileList = [];
  }

  beforeUpload = (file: UploadFile): boolean => {
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('图片必须小于2MB!');
      return false;
    }

    this.fileList = [file];
    // this.validateForm.controls.t_id.markAsDirty();
    this.validateForm.controls.t_id.updateValueAndValidity();
    // this.validateForm.controls.image.setValue(file.filename);
    // this.validateForm.controls.image.updateValueAndValidity();
    return false;
  };

  uploadValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.fileList.length < 1) {
      return { error: true };
    }
    return { };
  };
}
