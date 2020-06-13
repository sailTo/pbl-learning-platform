import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private userService: UserService
  ) {
    this.form = fb.group({
      u_id: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
          Validators.pattern('[0-9]+'),
        ],
        [this.checkUId],
      ],
      u_name: [
        null,
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('[^0-9]+'),
        ],
      ],
      gender: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          UserRegisterComponent.checkPassword.bind(this),
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          UserRegisterComponent.passwordEquar,
        ],
      ],
      agree: [false, [Validators.required]],
    });
  }

  // #region fields

  get u_id() {
    return this.form.controls.u_id;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }

  form: FormGroup;
  error = '';
  type = 0;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  count = 0;
  interval$: any;

  loading = false;

  static checkPassword(control: FormControl) {
    if (!control) {
      return null;
    }
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress =
        control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('password').value) {
      return { equar: true };
    }
    return null;
  }

  checkUId = (control: FormControl) =>
    new Observable((observer: Observer<Record<string, boolean> | null>) => {
      if (!control) {
        observer.next(null);
      }
      this.userService.checkValidId('S' + control.value).subscribe((data) => {
        if (data.code === 200) {
          // 可用
          observer.next(null);
        } else {
          if (data.code === 208) {
            // 已有
            observer.next({ hasExist: true, error: true });
          } else {
            this.msg.error('网络错误！');
          }
        }
        observer.complete();
      });
    })
  submit() {
    this.error = '';
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const data = this.form.value;
    this.userService.register(this.form).subscribe((data2) => {
      // alert(data2.code==200);
      if (data2.code === 200) {
        // alert(data2.user);
        let ret_user;

        ret_user = data2.data.user;
        ret_user.token = data2.message;
        ret_user.image = data2.data.image;
        // TODO: 替换掉local storage实现
        localStorage.setItem('User', JSON.stringify(ret_user));
        this.router.navigate(['/home']);
      } else {
        this.msg.error('注册失败！');
      }
      this.loading = false;
    });
    // this.msg.info('抱歉，尚未开放注册哦！');
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
