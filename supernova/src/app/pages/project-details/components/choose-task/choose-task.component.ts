import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-choose-task',
  templateUrl: './choose-task.component.html',
  styleUrls: ['./choose-task.component.css'],
})
export class ChooseTaskComponent implements OnInit {
  @Input() rows: {};
  rowNum: number;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {
    this.validateForm = this.fb.group({
      rowId: ['', [this.rowIdValidator]],
    });
  }

  ngOnInit(): void {
    this.rowNum = Number(
      Object.keys(this.rows).sort((a, b) => Number(b) - Number(a))[0]
    );
  }

  rowIdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (!Object.keys(this.rows).includes(String(control.value))) {
      return { inExist: true, error: true };
    }
    return {};
  };

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: { rowId: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.modal.destroy(value.rowId);
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
