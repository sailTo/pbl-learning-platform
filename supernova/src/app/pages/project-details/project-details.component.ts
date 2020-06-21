import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  p_id: number;
  p_name: string;

  groupers: User[];
  leaderId: string;

  currentUser: User;

  tabs = [];

  loading = true;

  showCompletion = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // get params
    this.route.queryParams.subscribe(
      (params: { p_id: string; p_name: string }) => {
        this.p_id = Number(params.p_id);
        this.p_name = params.p_name;
      }
    );

    // get groupers
    this.getGroupers();

    this.currentUser = this.userService.getUser();
  }

  getGroupers(): void {
    this.userService.getGroupersByProjectId(this.p_id).subscribe((response) => {
      this.groupers = response.data.groupers;
      this.leaderId = response.data.leader;

      // this.getTabs();

      this.showCompletion = this.currentUser.type === 'teacher' || this.currentUser.u_id === this.leaderId;

      this.loading = false;
    });
  }

  stringifyGroupers(): string {
    return JSON.stringify(this.groupers);
  }
}
