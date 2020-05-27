import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;

  tabs = [
    {active: false, name: '任务列表', icon: 'unordered-list'}, 
    {active: false, name: '成员列表', icon: 'user'}, 
    {active: false, name: '讨论空间', icon: 'comment'}, 
    {active: false, name: '文件管理', icon: 'download'}, 
  ]

  constructor(    
    private route: ActivatedRoute, 
    private projectService: ProjectService, 
  ) { }

  ngOnInit(): void {
    // get param p_id
    this.route.params.subscribe(
      (params: {p_id: string}) => {
        console.log(params.p_id);
      }
    );
  }

}
