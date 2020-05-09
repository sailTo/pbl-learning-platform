import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',

  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //向数据库请求判断用户名工号是否合法 若合法则进入首页 否则报出错误信息
    
    alert(this.validateForm.controls["gender"].value);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.pattern("[0-9]*") , Validators.required]],
      name: [null, [
        Validators.maxLength(6),
        Validators.pattern("[^0-9]+"),
        Validators.required]],
      gender:[null,[Validators.required]],
      password: [null, [
        Validators.pattern("[0-9]+[a-zA-Z]+"),
        Validators.minLength(8),
        Validators.minLength(16),
        Validators.required
      ]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false]
    });
  }
}
