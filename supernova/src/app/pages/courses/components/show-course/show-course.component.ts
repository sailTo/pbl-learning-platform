import { Component, OnInit } from '@angular/core';
import {NzDescriptionsSize} from "ng-zorro-antd";

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {
  size: NzDescriptionsSize = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
