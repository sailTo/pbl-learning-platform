import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  u_id = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { u_id: string }) => {
      if (params.u_id) {
        this.u_id = params.u_id;
      } else {
        this.u_id = JSON.parse(localStorage.getItem('User')).u_id;
      }
    });
  }
}
