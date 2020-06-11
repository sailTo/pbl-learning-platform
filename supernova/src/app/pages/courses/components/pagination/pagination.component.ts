import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pageIndex: number; // current page index
  @Input() pageSize: number; // page size
  @Input() total: number; // total element number

  @Output() pageIndexChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
