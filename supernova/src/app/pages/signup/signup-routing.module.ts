import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup.component'


const routes: Routes = [
  { path: '', component: SignupComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SignupRoutingModule { }