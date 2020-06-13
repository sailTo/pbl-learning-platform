import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ItemMovement from 'gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js';
import Selection from 'gantt-schedule-timeline-calendar/dist/Selection.plugin.js';
import CalendarScroll from 'gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin.js';
import WeekendHighlight from 'gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin.js';

import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { Response } from 'src/app/models/generic-response';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

import { AddTaskComponent } from '../add-task/add-task.component';
import { ChooseTaskComponent } from '../choose-task/choose-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  p_id: number;
  groupers: User[];
  leaderId: string;

  currentUser: User = this.userService.getUser();

  config: any;
  gstcState: any;

  tasks: Task[];
  totalNum: number; // 项目总人数

  isEmpty = true; // 任务是否为空

  percent = 100; // 行头显示比例
  zoom = 20; // 日期缩放级别

  daysOffset = 3; // 前后日期冗余显示天数

  modifiable: boolean; // 甘特图中内容是否可修改
  modified = false; // 甘特图中内容是否被修改过
  loading = false; // 保存按键是否正在提交
  addLoading = false;
  urgeLoading = false;
  completeLoading = false;
  urgeOrCompleteItemId: string = undefined; // 记录催促或完成任务导致的颜色变更

  modifiedAssignmentList: Task[] = []; // 删改过的task列表
  opList: string[] = []; // task列表对应的操作：modify or delete

  colorMapping = {
    1: '#f5222d', // red
    2: '#fa8c16', // orange
    3: '#fadb14', // yellow
    4: '#13c2c2', // cyan
    5: '#52c41a', // green
    急迫: '#722ed1', // purple
    完成: '#d9d9d9', // grey
  };

  rows: {
    [id: string]: {
      id: string;
      label: string;
      progress?: number;
      expanded?: boolean;
      itemId: string;
      // status: string,
    };
  } = {};

  items: {
    [id: string]: {
      id: string;
      label: string;
      time: {
        start: number;
        end: number;
      };
      // progress?: number,
      resizable: boolean;
      rowId: string;
      style: {
        background: string;
      };
      task: Task;
    };
  } = {};

  lastRows: {};
  lastItems: {};

  percentFormatter = (value: number) => `行头缩放：${value}`;
  zoomFormatter = (value: number) => `时间轴缩放：${value}`;

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private modalService: NzModalService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {
        p_id: string;
        p_name: string;
        leaderId: string;
        groupers: string;
      }) => {
        this.p_id = Number(params.p_id);
        this.groupers = JSON.parse(params.groupers);
        this.leaderId = params.leaderId;

        // 仅当是学生、且不是leader的时候不能修改
        this.modifiable = !(
          this.currentUser.type === 'student' &&
          this.currentUser.u_id !== this.leaderId
        );

        // request tasks
        this.getTasks();
      }
    );

    this.generateGantt();
  }

  // get days offset
  offset = (days: number) =>
    new Date().setDate(new Date().getDate() + days).valueOf() -
    new Date().valueOf()

  getTasks() {
    this.taskService.getTasks(this.p_id).subscribe((response) => {
      this.tasks = response.data.assignments;
      this.totalNum = response.data.totalNum;
      const finished = response.data.studentStatus;
      const urged = response.data.urgeStatus;
      const doneNum = response.data.doneNum;

      this.isEmpty = this.tasks.length === 0;

      let from = this.gstcState.get('config.chart.time.from');
      let to = this.gstcState.get('config.chart.time.to');

      this.tasks.forEach((task, index) => {
        // generate fields for tasks
        if (this.currentUser.type === 'student') {
          // only student has finished and urged status
          task.finished = finished[index];
          task.urged = urged[index];
        }
        task.doneNum = doneNum[index];

        // generate fields for rows and items
        this.rows[(index + 1).toString()] = {
          id: (index + 1).toString(),
          label: task.a_name,
          progress: Number(((task.doneNum / this.totalNum) * 100).toFixed(1)),
          expanded: false,
          itemId: (index + 1).toString(),
          // status: '<b>测试</b>',
        };

        let itemColor: string;
        if (task.finished) {
          itemColor = this.colorMapping.完成;
        } else if (task.urged) {
          itemColor = this.colorMapping.急迫;
        } else {
          itemColor = this.colorMapping[task.importance];
        }

        this.items[(index + 1).toString()] = {
          id: (index + 1).toString(),
          label: task.a_description,
          time: {
            start: task.a_start_date,
            end: task.a_end_date,
          },
          resizable: this.modifiable,
          rowId: (index + 1).toString(),
          style: {
            background: itemColor,
          },
          task,
        };

        // get dynamic from, to
        if (from > task.a_start_date) {
          from = task.a_start_date;
        }
        if (to < task.a_end_date) {
          to = task.a_end_date;
        }
      });

      // adjust from, to date
      this.gstcState.update(
        'config.chart.time.from',
        from - this.offset(this.daysOffset)
      );
      this.gstcState.update(
        'config.chart.time.to',
        to + this.offset(this.daysOffset)
      );

      // set rows and items
      this.gstcState.update('config.list.rows', this.rows);
      this.gstcState.update('config.chart.items', this.items);

      this.lastRows = JSON.parse(JSON.stringify(this.rows));
      this.lastItems = JSON.parse(JSON.stringify(this.items));
    });
  }

  generateGantt(): void {
    const columns = {
      // 决定左边几列的列名、标签样式
      percent: 100,
      resizer: {
        inRealTime: true,
      },
      data: {
        id: {
          id: 'id',
          data: 'id',
          width: 50,
          header: {
            content: '任务ID',
          },
        },
        // status: {
        //   id: 'status',
        //   data: 'status',
        //   isHTML: true,
        //   width: 30,
        //   header: {
        //     content: '状态'
        //   }
        // },
        label: {
          id: 'label',
          data: 'label',
          expander: false, // 每行是否可展开
          isHTML: false,
          width: 150,
          header: {
            content: '任务名称',
          },
        },
        progress: {
          id: 'progress',
          data: 'progress',
          width: 80,
          header: {
            content: '完成率（%）',
          },
        },
      },
    };

    class ResizingItemClass {
      update(element, data) {
        const hasClass = element.classList.contains('resizing');
        if (data.item.isResizing && !hasClass) {
          element.classList.add('resizing');
        } else if (!data.item.isResizing && hasClass) {
          element.classList.remove('resizing');
        }
      }
    }

    this.config = {
      plugins: [
        ItemMovement({
          moveable: this.modifiable ? 'x' : false, // 只允许在本行移动（x轴）
          resizeable: this.modifiable,
          collisionDetection: true,
        }),
        // Selection({
        //   selected(data, type) {
        //     console.log(data, type);
        //   }
        // }),
        CalendarScroll(),
        WeekendHighlight(),
      ],
      height: 623,
      headerHeight: 100,
      list: {
        rows: this.rows,
        columns,
      },
      chart: {
        items: this.items,
        time: {
          from: new Date().valueOf(),
          to: new Date().setDate(new Date().getDate() + 120).valueOf(),
          period: 'day',
        },
      },
      classNames: {},
      actions: {
        'chart-timeline-items-row-item': [ResizingItemClass],
      },
    };
  }

  // GET THE GANTT INTERNAL STATE

  onState(state) {
    this.gstcState = state;

    // YOU CAN SUBSCRIBE TO CHANGES

    // this.gstcState.subscribe("config.list.rows", rows => {
    //   console.log("rows changed", rows);
    // });

    this.gstcState.subscribe(
      'config.list.columns.percent',
      (percent: number) => {
        this.percent = percent;
      }
    );

    this.gstcState.subscribe('config.chart.time.zoom', (zoom: number) => {
      this.zoom = zoom;
    });

    this.gstcState.subscribe(
      'config.chart.items.:id',
      (bulk, eventInfo) => {
        if (eventInfo.type === 'update' && eventInfo.params.id) {
          const itemId = eventInfo.params.id;
          const thisModifiedItem = this.items[itemId];
          const thisModifiedTask = thisModifiedItem.task;

          if (itemId === this.urgeOrCompleteItemId) {
            // caused by urge or complete item, not modification we need to record
            this.urgeOrCompleteItemId = undefined;
            return;
          }

          this.modified = true;

          const lastElementOf = (list: any[]) => list[list.length - 1];

          if (this.modifiedAssignmentList.length !== 0) {
            // if this modified is last modified, then will not add a new operation
            // instead, substitute the new one for the old one
            const lastModifiedItem = lastElementOf(this.modifiedAssignmentList);
            const lastOp = lastElementOf(this.opList);

            if (
              lastOp === 'modify' &&
              lastModifiedItem.a_id === thisModifiedItem.task.a_id
            ) {
              this.modifiedAssignmentList[
                this.modifiedAssignmentList.length - 1
              ].a_start_date = thisModifiedItem.time.start;
              this.modifiedAssignmentList[
                this.modifiedAssignmentList.length - 1
              ].a_end_date = thisModifiedItem.time.end;
              return;
            }
          }

          [thisModifiedTask.a_start_date, thisModifiedTask.a_end_date] = [
            thisModifiedItem.time.start,
            thisModifiedItem.time.end,
          ];

          this.modifiedAssignmentList.push(thisModifiedTask);
          this.opList.push('modify');

          // console.log(this.items, this.lastItems);

          // console.log(
          //   `item ${itemId} changed`,
          //   this.gstcState.get("config.chart.items." + itemId)
          // );
        }
      },
      { bulk: true }
    );
  }

  showCompleteModal() {
    this.modalService
      .create({
        nzTitle: '标志完成任务',
        nzContent: ChooseTaskComponent,
        nzComponentParams: {
          rows: this.rows,
        },
      })
      .afterClose.subscribe((rowId) => {
        if (rowId === undefined) {
          return;
        }
        this.completeLoading = true;
        this.completeTask(rowId.toString());
      });
  }

  completeTask(rowId: string) {
    const rows = this.gstcState.get('config.list.rows');
    const items = this.gstcState.get('config.chart.items');

    const itemId = rows[rowId].itemId;
    const task = items[itemId].task;

    this.taskService
      .completeTask(task.a_id, this.p_id)
      .subscribe((response) => {
        if (response.code === 200 && !task.finished) {
          // request succeeded, change color
          this.urgeOrCompleteItemId = itemId;
          this.gstcState.update(
            `config.chart.items.${itemId}.style.background`,
            this.colorMapping.完成
          );
        }
        this.handleResponse(response);
        this.completeLoading = false;
      });
  }

  showUrgeModal() {
    this.modalService
      .create({
        nzTitle: '催促任务',
        nzContent: ChooseTaskComponent,
        nzComponentParams: {
          rows: this.rows,
        },
      })
      .afterClose.subscribe((rowId) => {
        if (rowId === undefined) {
          return;
        }
        this.urgeLoading = true;
        this.urgeTask(rowId.toString());
      });
  }

  urgeTask(rowId: string) {
    const rows = this.gstcState.get('config.list.rows');
    const items = this.gstcState.get('config.chart.items');

    const itemId = rows[rowId].itemId;
    const task = items[itemId].task;

    this.taskService.urgeTask(task.a_id, this.p_id).subscribe((response) => {
      if (response.code === 200 && !task.finished) {
        // request succeeded, if task not finished, change color
        this.urgeOrCompleteItemId = itemId;
        this.gstcState.update(
          `config.chart.items.${itemId}.style.background`,
          this.colorMapping.急迫
        );
      }
      this.handleResponse(response);
      this.urgeLoading = false;
    });
  }

  showAddModal() {
    if (this.modified) {
      this.modalService.error({
        nzTitle: '暂时无法新建任务',
        nzContent: '请先提交或者放弃删改',
      });
      return;
    }
    this.modalService
      .create({
        nzTitle: '新增任务',
        nzContent: AddTaskComponent,
        nzComponentParams: {
          p_id: this.p_id,
        },
      })
      .afterClose.subscribe((task: Task) => {
        if (task === undefined) {
          return;
        }
        this.addLoading = true;
        this.handleAddition(task);
      });
  }

  addTask(task: Task) {
    const rows = this.gstcState.get('config.list.rows');
    const items = this.gstcState.get('config.chart.items');
    let from = this.gstcState.get('config.chart.time.from');
    let to = this.gstcState.get('config.chart.time.to');

    // obtain maxium id
    let rowId = String(
      Number(Object.keys(rows).sort((a, b) => Number(b) - Number(a))[0]) + 1
    );
    let itemId = String(
      Number(Object.keys(items).sort((a, b) => Number(b) - Number(a))[0]) + 1
    );

    if (rowId === 'NaN') {
      rowId = '1';
      itemId = '1';
    }

    rows[rowId] = {
      id: rowId,
      label: task.a_name,
      progress: 0,
      expanded: false,
      itemId,
    };
    items[itemId] = {
      id: itemId,
      label: task.a_description,
      time: {
        start: task.a_start_date,
        end: task.a_end_date,
      },
      resizable: this.modifiable,
      rowId,
      style: {
        background: this.colorMapping[task.importance],
      },
      task,
    };

    // set rows and items
    this.gstcState.update('config.list.rows', rows);
    this.gstcState.update('config.chart.items', items);

    this.isEmpty = false;

    // get dynamic from, to
    if (from > task.a_start_date) {
      from = task.a_start_date;
      this.gstcState.update(
        'config.chart.time.from',
        from - this.offset(this.daysOffset)
      );
    }
    if (to < task.a_end_date) {
      to = task.a_end_date;
      this.gstcState.update(
        'config.chart.time.to',
        to + this.offset(this.daysOffset)
      );
    }
  }

  showDeleteModal() {
    this.modalService
      .create({
        nzTitle: '删除任务',
        nzContent: ChooseTaskComponent,
        nzComponentParams: {
          rows: this.rows,
        },
      })
      .afterClose.subscribe((rowId) => {
        if (rowId === undefined) {
          return;
        }
        this.deleteTask(rowId.toString());
      });
  }

  deleteTask(rowId: string) {
    const rows = this.gstcState.get('config.list.rows');
    const items = this.gstcState.get('config.chart.items');

    console.log(rows);
    // get element
    const itemId = rows[rowId].itemId;
    const item = items[itemId];

    // update view
    delete rows[rowId];
    // delete items[itemId];
    items[itemId].rowId = '-1';

    this.isEmpty = Object.keys(rows).length === 0;

    // set rows and items
    this.gstcState.update('config.list.rows', rows);
    this.gstcState.update('config.chart.items', items);

    // record the item
    this.modifiedAssignmentList.push(item.task);
    this.opList.push('delete');
    this.modified = true;
  }

  onPercent($event) {
    this.gstcState.update('config.list.columns.percent', $event);
  }

  onZoom($event) {
    this.gstcState.update('config.chart.time.zoom', $event);
  }

  discardChanges() {
    this.modifiedAssignmentList = [];
    this.opList = [];

    // console.log(this.items, this.lastItems);

    this.isEmpty = Object.keys(this.lastRows).length === 0;

    // roll back rows and items
    this.gstcState.update('config.list.rows', this.lastRows);
    this.gstcState.update('config.chart.items', this.lastItems);

    this.rows = this.gstcState.get('config.list.rows');
    this.items = this.gstcState.get('config.chart.items');

    this.lastRows = JSON.parse(JSON.stringify(this.lastRows));
    this.lastItems = JSON.parse(JSON.stringify(this.lastItems));

    this.modified = false;
  }

  saveChanges() {
    this.loading = true;
    console.log(this.modifiedAssignmentList, this.opList);
    this.handleModifications();
  }

  handleAddition(task: Task) {
    this.taskService.addTask(task).subscribe((response) => {
      this.handleResponse(response);

      if (response.code === 200) {
        task.a_id = response.data.a_id;
        this.addTask(task);
      }
      this.addLoading = false;
    });
  }

  handleModifications() {
    this.taskService
      .modifyAndDeleteAssignments(this.modifiedAssignmentList, this.opList)
      .subscribe((response) => {
        // if succeeded, empty lists
        if (response.code === 200) {
          this.modifiedAssignmentList = [];
          this.opList = [];
          this.modified = false;

          this.lastRows = JSON.parse(JSON.stringify(this.rows));
          this.lastItems = JSON.parse(JSON.stringify(this.items));
        }
        this.loading = false;
        this.handleResponse(response);
      });
  }

  handleResponse(response: Response<{}>) {
    if (response.code === 200) {
      this.message.success(response.message);
    } else if (response.code === 208) {
      this.message.error(response.message);
    } else if (response.code === 209) {
      this.message.error(response.message);
    }
  }
}
