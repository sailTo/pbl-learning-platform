import {Component, Input, OnInit} from '@angular/core';
import {NzDescriptionsSize, NzModalRef} from "ng-zorro-antd";
import {Project} from "../../../../models/project";
import {GradeItem} from "../../../../models/GradeItem";
import {ProjectService} from "../../../../services/project.service";
import {ScoreService} from "../../../../services/score.service";

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  size: NzDescriptionsSize = 'default';
  @Input() p_id;
  @Input() course_name;
  project: Project;
  Items: GradeItem[];
  type:string;
  status:string;

  constructor(
    private modal: NzModalRef,
    private projectService:ProjectService,
  ) { }

  ngOnInit(): void {
    this.projectService.getProject(this.p_id).subscribe((data)=>{
      this.project = data.data.project;
      if (this.project.grading_status){
        this.type = 'success';
        this.status = '已完成评分';
      }else {
        this.type = 'warning';
        this.status = '未完成评分';
      }
    });
    this.projectService.findGradeItemsByPid(this.p_id).subscribe((data)=>{
      this.Items = data.data.grades;
    });
    // console.log(this.course);
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
