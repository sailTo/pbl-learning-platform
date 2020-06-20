import { Component, OnInit } from '@angular/core';
import { ProjectData } from '../../models/ProjectData';
import { columnItem } from '../../models/colunmItem';
import { AdminService } from '../../services/admin.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Course } from 'src/app/models/course';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project';
import { GradeItem } from 'src/app/models/GradeItem';
import { CreateProjectComponent } from '../projects/components/create-project/create-project.component';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css'],
})
export class AdminProjectComponent implements OnInit {
  loading = false;
  searchValue = '';
  searchVisible = false;
  editId: number | null = null;
  listofColumns: columnItem[];
  canSubmit = true;
  listofChileColums = ['评分项', '评分占比'];
  constructor(
    private adminService: AdminService,
    private msgService: NzMessageService,
    private projectService: ProjectService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.listofColumns = [
      {
        name: '项目ID',
        sortOrder: null,
        sortFn: (a: ProjectData, b: ProjectData) => {
          return a.p_id - b.p_id;
        },
      },
      {
        name: '所属课程',
      },
      {
        name: '项目名称',
      },
      {
        name: '项目简介',
      },
      {
        name: '是否评分',
      },
      {
        name: '自评占比',
      },
      {
        name: '互评占比',
      },
      {
        name: '教评占比',
      },
      {
        name: '操作',
      },
      // {
      //   name: '',
      // },
    ];
    this.getAllProjects();
  }
  listOfData: ProjectData[];
  listOfDisplayData: any;
  courses: Course[];

  startEdit(id: number) {
    this.editId = id;
  }

  stopEdit(): void {
    if (!this.canSubmit) {
      this.msgService.error('评分不符合规则！');
      return;
    }
    var editProject = this.listOfData.find((x) => x.p_id == this.editId);
    if(editProject.mutual_grade_ratio+editProject.teacher_grade_ratio+editProject.self_grade_ratio!=100){
      this.msgService.error('评分不符合规则！');
      return;
    }
    editProject.expand = false;
    var aproject: Project = {
      p_id: editProject.p_id,
      c_id: editProject.c_id,
      p_name: editProject.p_name,
      description: editProject.description,
      grading_status: editProject.grading_status,
      teacher_grade_ratio: editProject.teacher_grade_ratio,
      self_grade_ratio: editProject.self_grade_ratio,
      mutual_grade_ratio: editProject.mutual_grade_ratio,
    };

    var gradeItems: GradeItem[] = editProject.gradeItems;
    this.projectService
      .changeProject(aproject, gradeItems)
      .subscribe((data) => {
        if (data.code == 200) {
          this.msgService.success('修改成功!');
          this.editId = null;
        } else {
          this.msgService.error('修改失败!');
          this.editId = null;
        }
      });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ProjectData) => item.p_name.indexOf(this.searchValue) !== -1
    );
  }

  deleteProject() {
    this.projectService.deleteProject(this.editId).subscribe((data) => {
      if (data.code == 200) {
        this.msgService.success('删除成功!');
        this.listOfData = this.listOfData.filter(
          (data) => data.p_id !== this.editId
        );
        this.listOfDisplayData = [...this.listOfData];
      } else {
        this.msgService.error('删除失败!');
      }
    });
  }

  showModal(): void {
    // this.isVisible = true;
    this.modalService
      .create({
        nzTitle: '新建项目',
        nzContent: CreateProjectComponent,
        nzComponentParams: {
          type: 'create',
          courses: this.courses,
        },
      })
      .afterClose.subscribe((flag: number) => {
        if (flag === undefined) {
          return;
        }
        //应该向项目列表中添加该项目
        this.getAllProjects();
      });
  }

  updateTeacherScore(p_id: number) {
    var aproject = this.listOfData.find((x) => x.p_id == p_id);
    var teacherAllScore = 0;
    aproject.gradeItems.forEach((item) => {
      teacherAllScore += +item.max_grade;
    });
    if (
      teacherAllScore >
      100 - aproject.mutual_grade_ratio - aproject.self_grade_ratio
    ) {
      this.msgService.error('一项评分不能超出教师评分最高上限值！');
      this.canSubmit = false;
      return;
    } else {
      aproject.teacher_grade_ratio = teacherAllScore;
    }
  }

  getAllProjects() {
    this.loading = true;
    this.adminService.getAllProjects().subscribe((projectsData) => {
      if (projectsData.code == 200) {
        this.listOfData = projectsData.data.projectList;
        this.listOfData.sort((a, b) => a.c_id - b.c_id);
        this.getAllCourses();
        this.getAllGradeItems();
        this.listOfDisplayData = [...this.listOfData];
      } else {
        this.msgService.error('无法获得项目信息!');
      }
    });
  }
  getAllCourses() {
    this.adminService.getAllCourses().subscribe((courseData) => {
      if (courseData.code == 200) {
        this.courses = courseData.data.courseList;
        this.listOfData.forEach((data) => {
          data.c_name = this.courses.find((x) => x.c_id == data.c_id).c_name;
        });
        this.listOfDisplayData = [...this.listOfData];
      } else {
        this.msgService.error('无法获得课程信息！');
      }
    });
  }
  getAllGradeItems() {
    this.adminService.getAllGradeItems().subscribe((ItemData) => {
      if (ItemData.code == 200) {
        //to do
        this.listOfData.forEach((data) => {
          data.gradeItems = ItemData.data.itemList[data.p_id];
          data.expand = false;
        });
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      } else {
        this.msgService.error('无法获得教师评分信息！');
      }
    });
  }
}
