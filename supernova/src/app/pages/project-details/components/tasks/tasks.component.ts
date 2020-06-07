import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js";
import Selection from "gantt-schedule-timeline-calendar/dist/Selection.plugin.js";
import CalendarScroll from "gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin.js";
import WeekendHighlight from "gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin.js";

import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  p_id: number;
  groupers: User[];

  currentUser: User = this.userService.getUser();

  config: any;
  gstcState: any;

  tasks: Task[];
  totalNum: number; // 项目总人数

  zoom: number = 20; // 日期缩放级别

  modified: boolean = false; // 甘特图中内容是否被修改过
  loading: boolean = false; // 保存按键是否正在提交

  pallete = [
    '#E74C3C',
    '#DA3C78',
    '#7E349D',
    '#0077C0',
    '#07ABA0',
    '#0EAC51',
    '#F1892D',
    '#E3724B',
    '#AE7C5B',
    '#6C7A89',
    '#758586',
    '#707070'
  ];

  rows: {
    [id: string]: {
      id: string,
      label: string,
      progress?: number,
      expanded?: boolean, 
    }
  } = {};

  items: {
    [id: string]: {
      id: string,
      label: string,
      time: {
        start: number,
        end: number,
      },
      progress?: number,
      rowId: string,
      lines?: string[], 
      style: {
        background: string,
      }
    }
  } = {};

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService, 
    private taskService: TaskService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // const iterations = 10;

    // const rows = {}; // 决定每行左边的行名，ID，%
    // for (let i = 0; i < iterations; i++) {
    //   const withParent = i > 0 && i % 2 === 0;
    //   const id = i.toString();
    //   rows[id] = {
    //     id,
    //     label: `row id: ${id}`,
    //     progress: 50,
    //     parentId: withParent ? (i - 1).toString() : undefined,
    //     expanded: false
    //   };
    // }

    // const startDate = new Date();

    // const items = {}; // 决定每行彩色的item
    // for (let i = 0; i < iterations; i++) {
    //   let rowId;
    //   let id = (rowId = i.toString());
    //   let startDayjs = new Date();
    //   // GSTC.api
    //   //   .date(startDate)
    //   //   .startOf('day')
    //   //   .add(Math.floor(Math.random() * 90), 'days');
    //   items[id] = {
    //     id,
    //     label: 'item id ' + id,
    //     time: {
    //       start: startDayjs.valueOf(),
    //       end: startDayjs.setDate(startDate.getDate() + 3),
    //       // .clone()
    //       // .add(Math.floor(Math.random() * 10) + 4, 'days')
    //       // .valueOf()
    //     },
    //     progress: 50,
    //     rowId,
    //     lines: i > 0 && i % 2 === 0 ? [(i + 1).toString()] : [],
    //     style: { background: this.pallete[Math.floor(Math.random() * this.pallete.length)] }
    //   };
    // }

    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: { p_id: string, p_name: string, groupers: string }) => {
        this.p_id = Number(params.p_id);
        this.groupers = JSON.parse(params.groupers);

        // request tasks
        this.getTasks();
      }
    );

    this.generateGantt();
  }

  getTasks() {
    this.taskService.getTasks(this.p_id).subscribe((response) => {
      this.tasks = response.data.assignments;
      this.totalNum = response.data.totalNum;
      const finished = response.data.studentStatus;
      const urged = response.data.urgeStatus;
      const doneNum = response.data.doneNum;

      let from = this.gstcState.get('config.chart.time.from');
      let to = this.gstcState.get('config.chart.time.to');
      
      // get days offset
      let offset = (days: number) => 
        new Date().setDate(new Date().getDate() + days).valueOf() - new Date().valueOf();

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
          progress: Number((task.doneNum / this.totalNum * 100).toFixed(1)), 
          expanded: false, 
        };
        this.items[(index + 1).toString()] = {
          id: (index + 1).toString(), 
          label: task.a_description, 
          time: {
            start: task.a_start_date, 
            end: task.a_end_date, 
          }, 
          rowId: (index + 1).toString(), 
          lines: [(index + 1).toString()], 
          style: {
            background: this.pallete[index], 
          }
        }

        // get dynamic from, to
        if (from > task.a_start_date) {
          from = task.a_start_date;
        } 
        if (to < task.a_end_date) {
          to = task.a_end_date;
        }
      });

      // adjust from, to date
      this.gstcState.update('config.chart.time.from', from - offset(7));
      this.gstcState.update('config.chart.time.to', to + offset(7));

      // set rows and items
      this.gstcState.update('config.list.rows', this.rows);
      this.gstcState.update('config.chart.items', this.items);

      console.log(this.gstcState.get('config.chart.time.zoom'));

    });
  }

  generateGantt(): void {
    const columns = { // 决定左边几列的列名、标签样式
      percent: 100,
      resizer: {
        inRealTime: true
      },
      data: {
        id: {
          id: 'id',
          data: 'id',
          width: 50,
          header: {
            content: '任务ID'
          }
        },
        label: {
          id: 'label',
          data: 'label',
          expander: false, // 每行是否可展开
          isHTML: false,
          width: 150,
          header: {
            content: '任务名称'
          }
        },
        progress: {
          id: 'progress',
          data: 'progress',
          width: 80,
          header: {
            content: '完成率（%）'
          }
        }
      }
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
          moveable: 'x', // 只允许在本行移动（x轴）
          resizeable: true,
          collisionDetection: true
        }),
        // Selection({
        //   selected(data, type) {
        //     console.log(data, type);
        //   }
        // }),
        CalendarScroll(),
        WeekendHighlight()
      ],
      height: 623,
      headerHeight: 100, 
      list: {
        rows: this.rows,
        columns
      },
      chart: {
        items: this.items,
        time: {
          from: new Date().valueOf(), 
          to: new Date().setDate(new Date().getDate() + 120).valueOf(),
          period: 'day'
        }
      },
      classNames: {},
      actions: {
        'chart-timeline-items-row-item': [ResizingItemClass]
      }
    };
  }

  // GET THE GANTT INTERNAL STATE

  onState(state) {
    this.gstcState = state;

    // YOU CAN SUBSCRIBE TO CHANGES

    this.gstcState.subscribe("config.list.rows", rows => {
      console.log("rows changed", rows);
    });

    this.gstcState.subscribe(
      "config.chart.items.:id",
      (bulk, eventInfo) => {
        if (eventInfo.type === "update" && eventInfo.params.id) {
          this.modified = true;
          const itemId = eventInfo.params.id;
          console.log(
            `item ${itemId} changed`,
            this.gstcState.get("config.chart.items." + itemId)
          );
        }
      },
      { bulk: true }
    );
  }

  deleteRow() {
    const random = r => r[Math.floor(Math.random() * r.length)];
    this.gstcState.update('config.list.rows', rows => {
      const rando = random(Object.keys(rows));
      // @ts-ignore
      const child = Object.values(rows).find(row => row.parentId === rando);
      if (rows[rando] && !child) {
        console.log('deleting', rando, Object.keys(rows), rows[rando]);
        delete rows[rando];
      }
      return rows;
    });
  }

  deleteItem() {
    const random = r => r[Math.floor(Math.random() * r.length)];
    this.gstcState.update('config.chart.items', items => {
      const rando = random(Object.keys(items));
      if (items[rando]) {
        console.log('deleting', rando, Object.keys(items), items[rando]);
        delete items[rando];
      }
      return items;
    });
  }

  clearAll() {
    this.gstcState.update('config.list.rows', {});
  }

  randomizeItems() {
    const rows = Object.keys(this.gstcState.get('config.list.rows'));
    console.log(rows);
    this.gstcState.update('config.chart.items', items => {
      Object.values(items).forEach(item => {
        // @ts-ignore
        item.rowId = rows[Math.floor(Math.random() * rows.length)];
      });
      return items;
    });
  }

  onPercent($event) {
    this.gstcState.update('config.list.columns.percent', $event);
  }

  onZoom($event) {
    this.gstcState.update('config.chart.time.zoom', $event);
  }

  saveChanges() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.modified = false;
      this.message.success('保存成功！');
    }, 1000);
  }

}
