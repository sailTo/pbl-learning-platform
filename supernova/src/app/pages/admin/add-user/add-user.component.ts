import { Component, OnInit, Output,EventEmitter, } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'; 
import {AdminService} from '../../../services/admin.service';
import {User} from '../../../models/user';
import {environment} from '../../../../environments/environment'
import { NzMessageService } from 'ng-zorro-antd';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isVisible = false;
  loading = false;
  validateForm:FormGroup;
  error = "";
  idError  = "";
  @Output() change = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private adminService : AdminService,
    private msgService : NzMessageService
  ) { }

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
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern('[0-9a-zA-Z]+'),
        Validators.required
      ]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      type: [null, [Validators.required]],

    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(){
    this.loading =true;
    if(this.validateForm.invalid){
      return;
    }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var comb_u_id;
    switch(this.validateForm.controls.type.value){
      case 'student':
        comb_u_id = "S" + this.validateForm.controls.id.value;
        break;
      case 'teacher':
        comb_u_id = "T" + this.validateForm.controls.id.value;
        break;
      case 'admin':
        comb_u_id = "A" + this.validateForm.controls.id.value;
        break;
    }
     
    var newUser:User = {
        u_id: comb_u_id,
        u_name: this.validateForm.controls.name.value,
        gender :this.validateForm.controls.gender.value,
        type : this.validateForm.controls.type.value,
        description :"",
        image:environment.defaultImgPath,
        password : (String)(Md5.hashStr(this.validateForm.controls.password.value)),
        status: true 
    }
    this.adminService.addNewUser(newUser).subscribe(
      (data) =>{
        if(data.code==200){
          this.msgService.success("添加成功！");
          this.change.emit();
        }else{
          this.msgService.error("添加失败！");
        }
        this.loading =false;
        this.isVisible = false;
      }
    )

  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

}
