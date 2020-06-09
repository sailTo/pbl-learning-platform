import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  isCollapsed = false;

  currentUser: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }

  logout(): void {
    this.userService.logout();
  }

}
