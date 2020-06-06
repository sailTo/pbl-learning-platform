import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NzModalRef, UploadFile, NzMessageService } from 'ng-zorro-antd';

import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',

  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  currentUser: User = this.userService.getUser();

  validateForm: FormGroup;
  fileList: UploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private msg: NzMessageService,
  ) {
    this.validateForm = this.fb.group({
      c_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      point: ['', [Validators.required]],
      t_id: ['', [Validators.required]],
      // image: ['', [this.uploadValidator]],
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: Course): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.destroyModal();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('图片必须小于2MB!');
      return false;
    }

    this.fileList = [file];
    this.validateForm.controls.image.setValue(file.filename);
    this.validateForm.controls.image.updateValueAndValidity();
    return false;
  };

  uploadValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.fileList.length < 1) {
      return { error:true, required: true };
    } 
    return {};
  }
}
