import { Component, OnInit } from '@angular/core';
import {NzDescriptionsSize} from "ng-zorro-antd";

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  size: NzDescriptionsSize = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
