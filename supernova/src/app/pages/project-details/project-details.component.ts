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
