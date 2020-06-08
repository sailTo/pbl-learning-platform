import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  @Input() rowNum: number;
  
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef, 
  ) {
    this.validateForm = this.fb.group({
      rowId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  submitForm(value: {
    rowId: string, 
  }): void {
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
