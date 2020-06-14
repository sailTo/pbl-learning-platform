import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from 'src/app/services/task.service';

import { User } from 'src/app/models/user';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-completion',
  templateUrl: './task-completion.component.html',
  styleUrls: ['./task-completion.component.css'],
})
export class TaskCompletionComponent implements OnInit {
  p_id: number;
  groupers: User[];
  leaderId: string;

  tasks: Task[];
  totalNum: number; // 项目总人数
  grouperDoneStatus: boolean[];

  optionList: { label: string; value: string }[];
  selectedValue: { label: string; value: string };

  selectLoading = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.selectLoading = true;

    this.route.queryParams.subscribe(
      (params: {
        p_id: number;
        p_name: string;
        groupers: string;
        leaderId: string;
      }) => {
        this.p_id = params.p_id;
        this.groupers = JSON.parse(params.groupers);
        this.leaderId = params.leaderId;

        this.getTasks();
        this.getOptionList();
      }
    );
  }

  getTasks(): void {
    this.taskService.getTasks(this.p_id).subscribe((response) => {
      this.tasks = response.data.assignments;
      this.totalNum = response.data.totalNum;
      const doneNum = response.data.doneNum;

      this.tasks.forEach((task, index) => {
        task.doneNum = doneNum[index];
      });
    });
  }

  getOptionList(): void {
    this.optionList = [];

    this.groupers.forEach((grouper) => {
      this.optionList.push({
        label: `${grouper.u_id} - ${grouper.u_name}`,
        value: grouper.u_id,
      });
    });

    this.selectLoading = false;
  }

  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.value === o2.value : o1 === o2

  onChange(value: { label: string; value: string }): void {
    if (value === null) {
      return;
    }

    const grouperId = value.value;

    this.taskService.getGrouperDoneStatus(this.p_id, grouperId).subscribe((response) => {
      this.grouperDoneStatus = response.data;

      this.tasks.forEach((task, index) => {
        task.finished = this.grouperDoneStatus[index];
      });
    });
  }
}
