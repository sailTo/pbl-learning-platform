import {Component, Input, OnInit} from '@angular/core';
import {NzDescriptionsSize, NzModalRef} from "ng-zorro-antd";
import {Course} from "../../../../models/course";

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {
  size: NzDescriptionsSize = 'default';
  type:string;
  status:string;
  @Input() course:Course;
  constructor(
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    if (this.course.status==2){
      this.type = 'success';
      this.status = '已发布';
    }else if (this.course.status==1){
      this.type = 'warning';
      this.status = '未发布';
    }else {
      this.type = 'error';
      this.status = '已删除';
    }
    // console.log(this.course);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
