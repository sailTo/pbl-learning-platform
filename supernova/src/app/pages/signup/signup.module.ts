import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers:[CookieService]
})
export class SignupModule { }
