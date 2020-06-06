import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import {SignupService} from '../../services/signup.service';
import {AuthService} from '../../auth/auth.service';
import { Router,ActivatedRoute }      from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  validateForm: FormGroup;
  idError  = "";
  error = "";
  loading = false;
  idValid = false;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private authService:AuthService,
    public router: Router,) {}
  submitForm(): void {
    if(this.validateForm.invalid){
      return;
    }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    } 
      this.register();
      // alert(this.idValid);

        // if(this.idValid){
        // //合法 
        // this.signupService.register(this.validateForm).subscribe(
        //   (data) =>{
        //     if(data.code==200){
        //       var ret_user;
        //       ret_user = JSON.parse(data.user);
        //       ret_user.token = JSON.parse(data.message).token;
        //       ret_user.image = data.image;
        //       localStorage.setItem('User', JSON.stringify(ret_user));
        //       this.router.navigate(["/home"]);
        //     }else{
        //       this.error = "注册失败！"
        //     }
            
        //   }
        // )
        // }else{
        //   this.idError = "用户ID已经存在！换一个试试？"
        // }
          
         
     
      //执行登陆操作，在这之前要保证后端已经将数据库更新
        
          // this.authService.login(this.validateForm.controls.id.value,this.validateForm.controls.password.value)
          // .pipe(first())
          // .subscribe(
          //   data => {
          //     this.router.navigate(["/home"]);
          // }
          // )
   
    // alert(this.validateForm.controls.gender.value);
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
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null, [
      Validators.pattern('[0-9]+') ,
      Validators.maxLength(10),
      Validators.minLength(3),
      // this.isIdValidValidator(),
      Validators.required]],
      
      name: [null, [
        Validators.maxLength(6),
        Validators.pattern('[^0-9]+'),
        Validators.required]],
      gender: [null, [Validators.required]],
      // type:[null,[Validators.required]],
      password: [null, [
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('[0-9a-zA-Z]+'),
        Validators.required
      ]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false]
    });
  }

  register(){
    // alert(1);
    this.loading = true;
    this.signupService.checkValidId(this.validateForm.controls.id.value).subscribe(
      (data) => {
       if(data.code==200){
          this.idValid = true;
          this.signupService.register(this.validateForm).subscribe(
            (data2) =>{
              // alert(data2.code==200);
              if(data2.code==200){
                alert(data2.user);
                var ret_user;
                
                ret_user = JSON.parse(data2.user);
                ret_user.token = JSON.parse(data2.message).token;
                ret_user.image = data2.image;
                localStorage.setItem('User', JSON.stringify(ret_user));
                this.router.navigate(["/home"]);
              }else{
                this.error = "注册失败！";
              }
              this.loading = false;
              
            }
          )
       }else{
         this.idError = "用户ID已经存在！换一个试试？";
         this.loading = false;
       }
      }
    );
   
    }
//    isIdValidValidator(nameRe: RegExp): ValidatorFn {
//       return (control: AbstractControl): {[id: string]: any} | null => {
//         const isValid = this.checkValidId();
//         return null;
//       };
//     }
}
