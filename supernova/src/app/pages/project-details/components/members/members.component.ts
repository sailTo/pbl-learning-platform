import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user";
import {ActivatedRoute} from "@angular/router";
import {Rating} from "../../../../models/rating";
import {RatingService} from "../../../../services/rating.service";
import {ProjectService} from "../../../../services/project.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  p_id: number;
  groupers: User[];

  ifOpenRating:boolean;
  ifUpdate:boolean[];
  ifEdit:boolean[];

  ratings:Rating[];

  u_id:string;
  constructor(
    private route: ActivatedRoute,
    private ratingService: RatingService,
    private projectService: ProjectService
  ) { }

  edit(index):void {
    this.ifEdit[index] = true;
  }
  update(index): void{
    this.ifUpdate[index] = true;
  }
  ngOnInit(): void {
    this.u_id = 'S001';
    this.projectService.getProject(this.p_id).subscribe((response) => {
      this.ifOpenRating = (response.data.project.self_grade_ratio != null);
    });
    if (this.ifOpenRating) {
      this.getMyRating();
      this.ratings.forEach((rating, index) => {
        rating['u_name'] = this.groupers.find(
          (grouper) => grouper.u_id == rating['u_id']
        )['u_name'];
        if (rating['rating'] != null){
          this.ifEdit[index] = true;
          this.ifUpdate[index] = true;
        }
      });
      this.route.queryParams.subscribe(
        (params: { p_id: number, p_name: string, groupers: string }) => {
          this.p_id = params.p_id;
          this.groupers = JSON.parse(params.groupers);
        }
      );
      // this.ifEdit[] = true;
    }
  }

  getMyRating():void{
    this.ratingService.getRating(this.p_id).subscribe((response) => {
      this.ratings = response.data.ratings;
    });
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  // demoValue: number = 0;
}
