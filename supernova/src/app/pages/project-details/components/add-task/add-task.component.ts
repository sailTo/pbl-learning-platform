import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzModalRef } from 'ng-zorro-antd';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Input() p_id: number;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {
    this.validateForm = this.fb.group({
      a_name: ['', [Validators.required]],
      a_description: ['', [Validators.required]],
      rangePicker: ['', [Validators.required]],
      importance: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: {
    a_name: string;
    a_description: string;
    importance: number;
    rangePicker: Date[];
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    const task: Task = {
      a_id: -1,
      p_id: this.p_id,
      a_name: value.a_name,
      a_description: value.a_description,
      a_start_date: value.rangePicker[0].valueOf(),
      a_end_date: value.rangePicker[1].valueOf(),
      importance: value.importance,
      finished: false,
      urged: false,
    };

    this.modal.destroy(task);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
