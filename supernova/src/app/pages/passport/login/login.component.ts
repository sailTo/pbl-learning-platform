import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  // providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    public msg: NzMessageService,
    private userService: UserService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    modalSrv.closeAll();
  }

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  form: FormGroup;
  error = '';

  count = 0;
  interval$: any;

  loading = false;

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();

    if (this.userName.invalid || this.password.invalid) {
      return;
    }

    this.loading = true;

    this.userService
      .login(this.userName.value, this.password.value)
      .subscribe((response) => {
        if (response.code === 200) {
          this.msg.success('登录成功！');

          const user = response.data.user;
          user.token = response.message;
          user.image = response.data.image;

          localStorage.setItem('User', JSON.stringify(user));

          this.router.navigateByUrl(
            this.route.snapshot.queryParams['returnUrl'] || '/home'
          );
        }
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
