import { Component, OnInit } from '@angular/core';

import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js";
import Selection from "gantt-schedule-timeline-calendar/dist/Selection.plugin.js";
import CalendarScroll from "gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin.js";
import WeekendHighlight from "gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin.js";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  config: any;
  gstcState: any;

  constructor() { }

  ngOnInit() {
    const iterations = 10;

    const pallete = [
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

    const rows = {};
    for (let i = 0; i < iterations; i++) {
      const withParent = i > 0 && i % 2 === 0;
      const id = i.toString();
      rows[id] = {
        id,
        label: `row id: ${id}`,
        progress: 50,
        parentId: withParent ? (i - 1).toString() : undefined,
        expanded: false
      };
    }

    const startDate = new Date();

    const items = {};
    for (let i = 0; i < iterations; i++) {
      let rowId;
      let id = (rowId = i.toString());
      let startDayjs = new Date();
      // GSTC.api
      //   .date(startDate)
      //   .startOf('day')
      //   .add(Math.floor(Math.random() * 90), 'days');
      items[id] = {
        id,
        label: 'item id ' + id,
        time: {
          start: startDayjs.valueOf(),
          end: startDayjs.setDate(startDate.getDate() + 3),
            // .clone()
            // .add(Math.floor(Math.random() * 10) + 4, 'days')
            // .valueOf()
        },
        progress: 50,
        rowId,
        lines: i > 0 && i % 2 === 0 ? [(i + 1).toString()] : [],
        style: { background: pallete[Math.floor(Math.random() * pallete.length)] }
      };
    }

    const columns = {
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
            content: 'ID'
          }
        },
        label: {
          id: 'label',
          data: 'label',
          expander: true,
          isHTML: false,
          width: 230,
          header: {
            content: 'Label'
          }
        },
        progress: {
          id: 'progress',
          data: 'progress',
          width: 30,
          header: {
            content: '%'
          }
        }
      }
    };

    // // GENERATE SOME ROWS

    // const rows = {};
    // for (let i = 0; i < iterations; i++) {
    //   const withParent = i > 0 && i % 2 === 0;
    //   const id = i.toString();
    //   rows[id] = {
    //     id,
    //     label: "Room " + i,
    //     parentId: withParent ? (i - 1).toString() : undefined,
    //     expanded: false
    //   };
    // }

    // const dayLen = 24 * 60 * 60 * 1000;

    // // GENERATE SOME ROW -> ITEMS

    // const items = {};
    // for (let i = 0; i < iterations; i++) {
    //   const id = i.toString();
    //   const start = new Date().getTime();
    //   items[id] = {
    //     id,
    //     label: "User id " + i,
    //     time: {
    //       start: start + i * dayLen,
    //       end: start + (i + 2) * dayLen
    //     },
    //     rowId: id
    //   };
    // }

    // // LEFT SIDE LIST COLUMNS

    // const columns = {
    //   percent: 100,
    //   resizer: {
    //     inRealTime: true
    //   },
    //   data: {
    //     label: {
    //       id: "label",
    //       data: "label",
    //       expander: true,
    //       isHtml: true,
    //       width: 200,
    //       minWidth: 100,
    //       header: {
    //         content: "Room"
    //       }
    //     }
    //   }
    // };

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
          moveable: 'x',
          resizeable: true,
          collisionDetection: true
        }),
        Selection({
          selected(data, type) {
            console.log(data, type);
          }
        }),
        CalendarScroll(),
        WeekendHighlight()
      ],
      height: 623,
      list: {
        rows,
        columns
      },
      chart: {
        items,
        time: {
          period: 'day'
        }
      },
      classNames: {},
      actions: {
        'chart-timeline-items-row-item': [ResizingItemClass]
      }
    };

    // this.config = {
    //   // height: 800,
    //   headerHeight: 100, 
    //   locale: {
    //     name: 'zh-cn', 
    //   }, 
    //   list: {
    //     rows,
    //     columns
    //   },
    //   chart: {
    //     items
    //   }
    // };
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
    const period = this.gstcState.get('config.chart.time');
  }

}
