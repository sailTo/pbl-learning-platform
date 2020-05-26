import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Input() taken: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
