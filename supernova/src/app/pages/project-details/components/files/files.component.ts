import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  p_id: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get param p_name
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string}) => {
        this.p_id = Number(params.p_id);
      }
    );
  }

}
