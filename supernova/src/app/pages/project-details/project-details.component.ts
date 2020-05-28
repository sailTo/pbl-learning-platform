import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  p_id: string;
  p_name: string;

  constructor(    
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    // get params
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string}) => {
        this.p_id = params.p_id;
        this.p_name = params.p_name;
      }
    );
  }

}
