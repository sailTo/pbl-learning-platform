import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { NzModalRef, UploadFile, NzMessageService } from 'ng-zorro-antd';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable, Observer } from 'rxjs';
import { Project } from '../../../../models/project';
import { ProjectService } from '../../../../services/project.service';
import { GradeItem } from '../../../../models/GradeItem';
import {Course} from '../../../../models/course';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',

  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  project: Project;
  items: GradeItem[];
  currentUser: User = this.userService.getUser();
  // currentCourse: Course = this.
  validateForm: FormGroup;
  listOfControl: Array<{
    id: number;
    controlInstance: string;
    controlInstance_value: string;
    controlInstanceId: string;
  }> = [];
  // check_teacher:boolean = false;
  check_student: boolean = false;

  @Input() course_id?: number;
  @Input() course_name?: string;
  @Input() type: string;
  @Input() p_id: number;
  @Input() courses?:Course[];
  @Output() change = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private msg: NzMessageService,
    private projectService: ProjectService
  ) {
    this.validateForm = this.fb.group({
      p_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      c_id: [this.course_id==undefined?null:this.course_id, [Validators.required]],
      teacher_point: [0, [Validators.required, this.confirmValidator]],
      student_point_self: [0, this.judgeIfUse],
      student_point_mutual: [0, this.judgeIfUse],
    });
    this.validateForm.controls.student_point_mutual.updateValueAndValidity();
    this.validateForm.controls.student_point_self.updateValueAndValidity();
  }

  ngOnInit(): void {
    // if(this.course_id){
    //   this.validateForm.controls.c_id.updateValueAndValidity();
    // }
    // console.log(this.course_id);
    // console.log(this.p_id);
    if (this.type != 'create') {
      this.projectService.getProject(this.p_id).subscribe((data) => {
        this.project = data.data.project;
        this.validateForm.controls.p_name.setValue(this.project.p_name);
        this.validateForm.controls.description.setValue(
          this.project.description
        );
        this.validateForm.controls.c_id.setValue(this.course_id);
        // this.validateForm.setControl("c_id",null);
        this.validateForm.controls.teacher_point.setValue(
          this.project.teacher_grade_ratio
        );
        this.validateForm.controls.student_point_self.setValue(
          this.project.self_grade_ratio
        );
        this.validateForm.controls.student_point_mutual.setValue(
          this.project.mutual_grade_ratio
        );
        this.validateForm.controls.student_point_mutual.updateValueAndValidity();
        this.validateForm.controls.student_point_self.updateValueAndValidity();
        for (const key in this.validateForm.controls)
          this.validateForm.controls[key].updateValueAndValidity();
      });
      this.projectService.findGradeItemsByPid(this.p_id).subscribe((data) => {
        this.items = data.data.grades;
        this.items.forEach((item, index) => {
          let control = {
            id: index,
            controlInstance: `item${index}`,
            controlInstanceId: `item${index}_id`,
            controlInstance_value: `item${index}_value`,
          };
          this.validateForm.addControl(
            control.controlInstance,
            new FormControl(item.description, Validators.required)
          );
          this.validateForm.addControl(
            control.controlInstanceId,
            new FormControl(item.item_id, Validators.required)
          );
          this.validateForm.addControl(
            control.controlInstance_value,
            new FormControl(item.max_grade, Validators.required)
          );
          this.listOfControl.push(control);
        });
        for (const key in this.validateForm.controls)
          this.validateForm.controls[key].updateValueAndValidity();
      });
    }else if (this.course_id){
      this.validateForm.controls.c_id.setValue(this.course_id);
      this.validateForm.controls.c_id.updateValueAndValidity();
      this.addField();
    }
    else
      this.addField();
    // if(this.course_id){
    //   this.validateForm.controls.c_id.updateValueAndValidity();
    // }
  }

  judgeIfUse = (control: FormControl): { [s: string]: boolean } => {
    if (this.check_student) {
      if (!control.value && control.value != 0) {
        return { error: true, required: true };
      }
    }
    return {};
  };

  change_student_grade(): void {
    this.check_student = !this.check_student;
    if (!this.check_student) {
      this.validateForm.controls.student_point_mutual.setValue(0);
      this.validateForm.controls.student_point_self.setValue(0);
      this.validateForm.controls.student_point_mutual.updateValueAndValidity();
      this.validateForm.controls.student_point_self.updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.teacher_point.updateValueAndValidity()
    );
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      if (control.value == 0){
        if (this.validateForm != null) {
          let total =
            parseInt(this.validateForm.controls.student_point_self.value) +
            parseInt(this.validateForm.controls.student_point_mutual.value);
          // console.log(total);
          if (total != 100) {
            return { error: true, notOneHundred: true };
          }
        }
        return {};
      }
      return { error: true, required: true };
    }

    if (this.listOfControl.length != 0) {
      let sum = 0;
      let flag = false;
      this.listOfControl.forEach((item) => {
        // console.log(this.validateForm.controls[item.controlInstance_value].value);
        if (
          this.validateForm.controls[item.controlInstance_value].value == null
        ) {
          //还未填完,不检测
          flag = true;
          return;
        } else
          sum += parseInt(
            this.validateForm.controls[item.controlInstance_value].value
          );
      });
      // if (flag)
      //   return { };
      // else
      if (!flag && sum != control.value) {
        return { error: true, notEqual: true };
      }
    }else {
      if (control.value != 0)
        return { error: true, notEqual: true };
    }
    // console.log("sum : " +sum);

    // if (this.check_student) {
    //   if ( this.validateForm.controls.teacher_point.value && this.validateForm.controls.student_point_self.value
    //     && this.validateForm.controls.student_point_mutual.value){
    let total =
      parseInt(this.validateForm.controls.teacher_point.value) +
      parseInt(this.validateForm.controls.student_point_self.value) +
      parseInt(this.validateForm.controls.student_point_mutual.value);
    // console.log(total);
    if (total != 100) {
      return { error: true, notOneHundred: true };
    }
    // }
    // }else {
    //   if ( !this.validateForm.controls.teacher_point.value && parseInt(this.validateForm.controls.teacher_point.value) == 100)
    //     return{ error: true, notOneHundred: true }
    // }
    return {};
  };

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: Project): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(value);
    if (this.type == 'create') this.createProject();
    else if (this.type == 'edit') this.editProject();
  }

  resetForm(e: MouseEvent): void {
    // console.log(this.validateForm.controls);
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      for (let i = 0; i < this.listOfControl.length; i++) {
        let control = this.listOfControl[i];
        if (control.id != 0) {
          this.validateForm.removeControl(control.controlInstance);
          this.validateForm.removeControl(control.controlInstanceId);
          this.validateForm.removeControl(control.controlInstance_value);
          this.listOfControl.splice(i--, 1);
        }
      }
    }
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.validateForm.controls.teacher_point.setValue(0);
    this.validateForm.controls.student_point_mutual.setValue(0);
    this.validateForm.controls.student_point_self.setValue(0);
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;
    const control = {
      id,
      controlInstance: `item${id}`,
      controlInstanceId: `item${id}_id`,
      controlInstance_value: `item${id}_value`,
    };
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      control.controlInstance,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      control.controlInstance_value,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      control.controlInstanceId,
      new FormControl(-1, Validators.required)
    );
    this.listOfControl.push(control);
  }

  removeField(
    i: {
      id: number;
      controlInstance: string;
      controlInstance_value: string;
      controlInstanceId: string;
    },
    e: MouseEvent
  ): void {
    e.preventDefault();
    // if (this.listOfControl.length > 1) {
    const index = this.listOfControl.indexOf(i);
    this.listOfControl.splice(index, 1);
    // this.
    // console.log(this.listOfControl);
    this.validateForm.removeControl(i.controlInstance);
    this.validateForm.removeControl(i.controlInstance_value);
    this.validateForm.removeControl(i.controlInstanceId);
    // }
  }

  editProject(): void {
    let project = {
      p_id: this.p_id,
      c_id: this.course_id,
      p_name: this.validateForm.controls.p_name.value,
      description: this.validateForm.controls.description.value,
      grading_status: false,
      teacher_grade_ratio: this.validateForm.controls.teacher_point.value,
      self_grade_ratio: this.validateForm.controls.student_point_self.value,
      mutual_grade_ratio: this.validateForm.controls.student_point_mutual.value,
    };
    let items = [];
    this.listOfControl.forEach((item) => {
      let tmp = {
        p_id: this.p_id,
        item_id: this.validateForm.controls[item.controlInstanceId].value,
        description: this.validateForm.controls[item.controlInstance].value,
        max_grade: this.validateForm.controls[item.controlInstance_value].value,
      };
      items.push(tmp);
    });
    this.projectService.changeProject(project, items).subscribe((response) => {
      if (response.code === 200) {
        this.msg.success(`编辑项目成功！`);
        this.change.emit();
        this.modal.destroy();
      } else {
        this.msg.error(`编辑项目失败，请稍后重试！`);
      }
      // this.change.emit();
    });
  }

  createProject(): void {
    let project = {
      p_id: null,
      c_id: this.course_id==undefined? this.validateForm.controls.c_id.value:this.course_id,
      p_name: this.validateForm.controls.p_name.value,
      description: this.validateForm.controls.description.value,
      grading_status: false,
      teacher_grade_ratio: this.validateForm.controls.teacher_point.value,
      self_grade_ratio: this.validateForm.controls.student_point_self.value,
      mutual_grade_ratio: this.validateForm.controls.student_point_mutual.value,
    };
    let items = [];
    this.listOfControl.forEach((item) => {
      let tmp = {
        p_id: null,
        item_id: null,
        description: this.validateForm.controls[item.controlInstance].value,
        max_grade: this.validateForm.controls[item.controlInstance_value].value,
      };
      items.push(tmp);
    });
    this.projectService.addProject(project, items).subscribe((response) => {
      if (response.code === 200) {
        this.msg.success(`新增项目成功！`);
        this.change.emit();
        this.modal.destroy(1);
      } else {
        this.msg.error(`新增项目失败，请稍后重试！`);
      }
      // this.change.emit();
    });
  }
}
