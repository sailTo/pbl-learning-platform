import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router,ActivatedRoute }      from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // 
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  returnUrl: string;
  loading = false;
  error = '';
  // radioValue: '学生';
  //脏校验
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
     public router: Router,
     public route:ActivatedRoute
    ) {
   
  }
  submitForm(): void {
    this.loading = true;
    if(this.validateForm.invalid){
      return;
    }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      
    }
    this.authService.login(this.validateForm.controls.id.value,this.validateForm.controls.password.value)
    .pipe(first())
    .subscribe(
      data => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.error = error;
          this.loading = false;
      }
      // if (this.authService.isLogin) {
      //   // Get the redirect URL from our auth service
      //   // If no redirect has been set, use the default
      //   let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';

      //   // Redirect the user
      //   this.router.navigateByUrl(redirect);
      // }
    );
 
  }

  

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null, [
        Validators.maxLength(10),
        Validators.minLength(3),
        // Validators.pattern('^[0-9]'),
        Validators.pattern('[0-9]+'),
        Validators.required
      ]],
      password: [null, [Validators.required]],
      // type: [null, [Validators.required]],
      // remember: [true]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

}
