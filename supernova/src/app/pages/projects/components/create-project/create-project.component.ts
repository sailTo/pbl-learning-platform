import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NzModalRef, UploadFile, NzMessageService } from 'ng-zorro-antd';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable, Observer } from 'rxjs';
import {Project} from "../../../../models/project";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',

  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  currentUser: User = this.userService.getUser();
  // currentCourse: Course = this.
  validateForm: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string;controlInstance_value: string }> = [];
  // check_teacher:boolean = false;
  check_student:boolean = false;
  @Input() course_id: number;
  @Input() course_name: string;
  items_value:number[];


  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private msg: NzMessageService,
  ) {
    this.validateForm = this.fb.group({
      p_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      c_id: [this.course_id, [Validators.required]],
      teacher_point: [0, [this.confirmValidator]],
      student_point_self: [0, this.judgeIfUse],
      student_point_mutual: [0, this.judgeIfUse],
      // image: ['', [this.uploadValidator]],
    });
    this.addField();
  }

  judgeOneHundred = (control: FormControl): { [s: string]: boolean } => {
    if (this.check_student) {
      if ( this.validateForm.controls.teacher_point.value && this.validateForm.controls.student_point_self.value
        && this.validateForm.controls.student_point_mutual.value){
        if ( (parseInt(this.validateForm.controls.teacher_point.value)
          + parseInt(this.validateForm.controls.student_point_self.value)
          + parseInt(this.validateForm.controls.student_point_mutual.value)) != 100){
          return{ error: true, notOneHundred: true }
        }
      }
    }else {
      if ( !this.validateForm.controls.teacher_point.value && parseInt(this.validateForm.controls.teacher_point.value) == 100)
        return{ error: true, notOneHundred: true }
    }
    return { };
  };
  
  judgeIfUse = (control: FormControl): { [s: string]: boolean } => {
    if ( this.check_student ){
      if (!control.value) {
        return { error: true, required: true };
      }
    }
    
    return { };
  };

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    let sum = 0;
    if (this.listOfControl.length == 0){
      return { };
    } else {
      this.listOfControl.forEach((item)=> {
        // console.log(this.validateForm.controls[item.controlInstance_value].value);
        if (this.validateForm.controls[item.controlInstance_value].value == null){//还未填完,不检测
          return { };
        } else
          sum += parseInt(this.validateForm.controls[item.controlInstance_value].value);
      });
    }
    // console.log("sum : " +sum);
    if (sum != control.value) {
      return {error: true, notEqual: true};
    }

    // if (this.check_student) {
    //   if ( this.validateForm.controls.teacher_point.value && this.validateForm.controls.student_point_self.value
    //     && this.validateForm.controls.student_point_mutual.value){
        if ( (parseInt(this.validateForm.controls.teacher_point.value)
          + parseInt(this.validateForm.controls.student_point_self.value)
          + parseInt(this.validateForm.controls.student_point_mutual.value)) != 100){
          return{ error: true, notOneHundred: true }
        }
      // }
    // }else {
    //   if ( !this.validateForm.controls.teacher_point.value && parseInt(this.validateForm.controls.teacher_point.value) == 100)
    //     return{ error: true, notOneHundred: true }
    // }
    return { };
  };

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: Project): void {

    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.destroyModal();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      this.listOfControl.forEach((control)=>{
        if (control.id != 0){
          this.validateForm.removeControl(control.controlInstance);
          this.validateForm.removeControl(control.controlInstance_value);
        }
      });
    }
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }



  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `item${id}`,
      controlInstance_value: `item${id}_value`
    };

    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(control.controlInstance, new FormControl(null, Validators.required));
    this.validateForm.addControl(control.controlInstance_value, new FormControl(null, Validators.required));
    this.listOfControl.push(control);
  }

  removeField(i: { id: number; controlInstance: string ;controlInstance_value: string}, e: MouseEvent): void {
    e.preventDefault();
    // if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
      this.validateForm.removeControl(i.controlInstance_value);
    // }
  }

}
