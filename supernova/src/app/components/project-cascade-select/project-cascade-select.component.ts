import { Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

import { CourseService } from "../../services/course.service";

const provinces = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  }
];

const cities: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  zhejiang: [
    {
      value: 'hangzhou',
      label: 'Hangzhou', 
      isLeaf: true
    },
    {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }
  ],
  jiangsu: [
    {
      value: 'nanjing',
      label: 'Nanjing', 
      isLeaf: true
    }
  ]
};

@Component({
  selector: 'app-project-cascade-select',
  templateUrl: './project-cascade-select.component.html'
})
export class ProjectCascadeSelectComponent implements OnInit {
  nzOptions: NzCascaderOption[] | null = null;
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];
  courses: string[];

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    
  }

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  /** load data async execute by `nzLoadData` method */
  loadData(node: NzCascaderOption, index: number): PromiseLike<void> {
    return new Promise(resolve => {
      if (index < 0) {
        // if index less than 0 it is root node
        node.children = provinces;
      } else if (index === 0) {
        node.children = cities[node.value];
      } 
      resolve();
    });
  }

  loadCourses(): void {
    // const coursesList = this.courseService.getMyCourseNames();
  }
}
