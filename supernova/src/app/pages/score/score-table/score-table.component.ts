import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { columnItem } from '../../../models/colunmItem';
import { Project } from 'src/app/models/project';
import { ScoreService } from '../../../services/score.service';
import { UserService } from '../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { GradeItem } from 'src/app/models/GradeItem';
import { ItemData, DynamicScore } from '../../../models/ItemData';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css'],
})
export class ScoreTableComponent implements OnChanges {
  @Input() selectProject: Project;
  searchValue = '';
  visible = false;
  userType: string;
  editId: string | null = null;
  canEdit: boolean;
  gradeItems: GradeItem[];
  maxDiscussNum: number;
  maxAssignmentDone: number;
  listofColumns: columnItem[];
  listOfData: ItemData[];
  listOfDisplayData: any;
  loading = false;
  constructor(
    private scoreService: ScoreService,
    private msgService: NzMessageService,
    private userService: UserService
  ) {
    this.userType = this.userService.getUser().type;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.Init();
  }
  Init(): void {
    this.listofColumns = [
      {
        name: '学号',
        sortOrder: null,
        sortFn: (a: ItemData, b: ItemData) => {
          return a.s_id.localeCompare(b.s_id);
        },
      },
      {
        name: '姓名',
      },
      {
        name: '任务完成数',
        sortOrder: null,
        sortFn: (a: ItemData, b: ItemData) => {
          return a.assignmentDoneNum - b.assignmentDoneNum;
        },
      },
      {
        name: '讨论版发言数',
        sortOrder: null,
        sortFn: (a: ItemData, b: ItemData) => {
          return a.discussNum - b.discussNum;
        },
      },
    ]; // 固定的表头项

    if (this.selectProject.self_grade_ratio !== 0) {
      this.listofColumns.push({
        name: '自评分',
        sortOrder: null,
        sortFn: null,
      });
    }
    if (this.selectProject.mutual_grade_ratio !== 0) {
      this.listofColumns.push({
        name: '互评分',
        sortOrder: null,
        sortFn: null,
      });
    }

    // alert(JSON.stringify(this.selectProject));
    this.canEdit =
      this.userType != 'student' && !this.selectProject.grading_status;
    this.scoreService
      .getColumnItems(String(this.selectProject.p_id))
      .subscribe((data) => {
        if (data.code == 200) {
          //获得动态的表头项

          this.gradeItems = data.data.grades.sort(
            (a, b) => a.item_id - b.item_id
          );
          this.gradeItems.forEach((gradeItem) => {
            var acolumn: columnItem = {
              name: gradeItem.description,
            };
            this.listofColumns.push(acolumn);
          });
          if (this.selectProject.teacher_grade_ratio !== 0) {
            this.listofColumns.push({
              name: '教师评分总分',
            });
          }
          this.listofColumns.push({
            name: '总分',
            sortOrder: null,
            sortFn: (a: ItemData, b: ItemData) => {
              return (
                a.teacherAllScore +
                a.mutualScore +
                a.selfScore -
                (b.teacherAllScore + b.mutualScore + b.selfScore)
              );
            },
          });
          if (this.userService.getUser().type !== 'student') {
            this.listofColumns.push({
              name: '操作', // 提交button
            });
          }
          // 获得学生的得分和表现情况
          this.loading = true;
          this.listOfData = [];
          this.listOfDisplayData = [];
          if (this.userService.getUser().type == 'student') {
            this.getStudentData();
          } else {
            this.getTeacherData();
          }
        } else {
          this.msgService.error('无法获得教师的评分细则！');
          this.loading = false;
        }
      });

    // this.listOfData = data;
  }
  getStudentData() {
    if (!this.selectProject.grading_status) {
      this.msgService.info('该项目暂未评分！');
      this.loading = false;
      return;
    }
    this.scoreService
      .getStudentSelfScore(String(this.selectProject.p_id))
      .subscribe((studentselfScoreData) => {
        if (studentselfScoreData.code == 200) {
          this.listOfData = [];
          this.listOfData.push({
            s_id: this.userService.getUser().u_id,
            s_name: this.userService.getUser().u_name,
            selfScore: Number(
              (
                (+studentselfScoreData.data.grade / 100) *
                this.selectProject.self_grade_ratio
              ).toFixed(1)
            ),
          });
          this.getStudentMutualScore();
          this.getStudentTeacherScore();
          this.getStudentDiscussionAndAssignmentNum();
        } else {
          if (studentselfScoreData.code == 209) {
            this.msgService.info('自评分暂未评分！');
            this.loading = false;
          } else {
            this.msgService.error('获取学生自评分失败！');
            this.loading = false;
          }
        }
      });
  }
  getStudentMutualScore() {
    this.scoreService
      .getStudentMutualScore(String(this.selectProject.p_id))
      .subscribe((studentMutualScoreData) => {
        if (studentMutualScoreData.code == 200) {
          this.listOfData[0].mutualScore = Number(
            (
              (studentMutualScoreData.data.grade / 100) *
              this.selectProject.mutual_grade_ratio
            ).toFixed(1)
          );
          this.listOfDisplayData = [...this.listOfData];
        } else {
          if (studentMutualScoreData.code == 209) {
            this.msgService.info('互评分暂未评分！');
            this.loading = false;
          } else {
            this.msgService.error('获取学生互评分失败！');
            this.loading = false;
          }
        }
      });
  }
  getStudentTeacherScore() {
    this.scoreService
      .getStudentTeacherScore(String(this.selectProject.p_id))
      .subscribe((studentTeacherScoreData) => {
        if (studentTeacherScoreData.code == 200) {
          var temp = [];
          studentTeacherScoreData.data.grades = studentTeacherScoreData.data.grades.sort(
            (a, b) => +a.item_id - +b.item_id
          );
          var teacherAllScore = 0;
          studentTeacherScoreData.data.grades.forEach((teacherItem) => {
            var item: DynamicScore = {
              item_id: teacherItem.item_id,
              item_name: '',
              grade: +teacherItem.grade,
            };
            temp.push(item);
            teacherAllScore += teacherItem.grade;
          });
          this.listOfData[0].teacherAllScore = teacherAllScore;
          this.listOfData[0].dynamicScore = temp;
          this.listOfDisplayData = [...this.listOfData];
          this.loading = false;
        } else {
          if (studentTeacherScoreData.code == 209) {
            this.msgService.info('互评分暂未评分！');
            this.loading = false;
          } else {
            this.msgService.error('获取学生教师评分失败！');
            this.loading = false;
          }
        }
      });
  }

  getStudentDiscussionAndAssignmentNum() {
    this.scoreService
      .getStudentDiscussionAndAssignmentNum(String(this.selectProject.p_id))
      .subscribe((studentDiscussionData) => {
        if (studentDiscussionData.code == 200) {
          this.listOfData[0].discussNum =
            studentDiscussionData.data.discussionCount;
          this.listOfData[0].assignmentDoneNum =
            studentDiscussionData.data.assignmentDoneCount;

          this.listOfDisplayData = [...this.listOfData];
        } else {
          if (studentDiscussionData.code == 209) {
            this.msgService.info('互评分暂未评分！');
            this.loading = false;
          } else {
            this.msgService.error('获取学生讨论数和任务完成数失败！');
            this.loading = false;
          }
        }
      });
  }

  getTeacherData() {
    this.scoreService
      .getCountDiscussion(String(this.selectProject.p_id))
      .subscribe((discussionData) => {
        if (discussionData.code == 200) {
          this.maxDiscussNum = discussionData.data.maxDiscussNum;
          discussionData.data.discussInformations = discussionData.data.discussInformations.sort(
            (a, b) => a.s_id.localeCompare(b.s_id)
          );
          this.listOfData = discussionData.data.discussInformations;
          this.getAssignmentDone();
          this.getSelfAndMutualScore();
          this.getDynamicScore();
        } else {
          this.msgService.error('获取讨论数信息失败！');
          this.loading = false;
        }
      });
  }
  getAssignmentDone() {
    this.scoreService
      .getAssignmentDone(String(this.selectProject.p_id))
      .subscribe((assignmentData) => {
        if (assignmentData.code == 200) {
          this.maxAssignmentDone = assignmentData.data.totalAssignmentNum;
          // assignmentData.data.doneInformations = assignmentData.data.doneInformations.sort((a,b)=>a.s_id.localeCompare(b.s_id));
          this.listOfData.forEach((data) => {
            data.assignmentDoneNum = 0;
          });
          if (assignmentData.data.doneInformations.length > 0) {
            assignmentData.data.doneInformations.forEach((doneInformation) => {
              this.listOfData.find(
                (x) => x.s_id == doneInformation.s_id
              ).assignmentDoneNum = doneInformation.doneNum;
              // this.listOfData[index].assignmentDoneNum = doneInformation.doneNum==undefined?0:doneInformation.doneNum;
            });
          }

          this.listOfDisplayData = [...this.listOfData];
        } else {
          this.msgService.error('获取任务数信息失败！');
          this.loading = false;
        }
      });
  }
  getSelfAndMutualScore() {
    this.scoreService
      .getSelfAndMutualScore(String(this.selectProject.p_id))
      .subscribe((SelfAndMutualScoreData) => {
        if (SelfAndMutualScoreData.code == 200) {
          SelfAndMutualScoreData.data.selfAndMutualInformations = SelfAndMutualScoreData.data.selfAndMutualInformations.sort(
            (a, b) => a.s_id.localeCompare(b.s_id)
          );
          SelfAndMutualScoreData.data.selfAndMutualInformations.forEach(
            (discussInformation, index) => {
              this.listOfData[index].selfScore = Number(
                (
                  (discussInformation.selfScore / 100) *
                  this.selectProject.self_grade_ratio
                ).toFixed(1)
              );
              this.listOfData[index].mutualScore = Number(
                (
                  (discussInformation.mutualScore / 100) *
                  this.selectProject.mutual_grade_ratio
                ).toFixed(1)
              );
            }
          );
          this.listOfDisplayData = [...this.listOfData];
        } else {
          this.msgService.error('获取个人自评互评信息失败！');
          this.loading = false;
        }
      });
  }
  getDynamicScore() {
    this.scoreService
      .getGradeItemScore(String(this.selectProject.p_id))
      .subscribe((DynamicScoreData) => {
        if (DynamicScoreData.code == 200) {
          DynamicScoreData.data.allItems = DynamicScoreData.data.allItems.sort(
            (a, b) => a.u_id.localeCompare(b.u_id)
          );
          DynamicScoreData.data.allItems.forEach(
            (dynamicInformation, index) => {
              this.listOfData[index].dynamicScore =
                dynamicInformation.itemsList;
              this.listOfData[index].dynamicScore = this.listOfData[
                index
              ].dynamicScore.sort((a, b) => +a.item_id - +b.item_id);
              var teacherAllScore = 0;
              this.listOfData[index].dynamicScore.forEach((item) => {
                if (item.grade == null) {
                  item.grade = 0;
                } else {
                  this.listOfData[index].haveScored = true;
                }
                // item.grade = item.grade==null?0:item.grade;
                teacherAllScore += item.grade;
                if (!this.listOfData[index].haveScored) {
                  this.listOfData[index].haveScored = false;
                }
              });
              this.listOfData[index].teacherAllScore = teacherAllScore;
            }
          );
          this.listOfDisplayData = [...this.listOfData];
          this.loading = false;
        } else {
          this.msgService.error('获取教师评分信息失败！');
          this.loading = false;
        }
      });
  }
  startEdit(id: string) {
    this.editId = id;
  }
  stopEdit(data: ItemData): void {
    data.haveScored = true;
    this.editId = null;
    this.scoreService
      .postGradeItemScore(String(this.selectProject.p_id), data)
      .subscribe((data) => {
        if (data.code == 200) {
          this.msgService.success('评分成功！');
        } else {
          this.msgService.error('评分失败！');
        }
      });
  }
  updateTeacherScore(id: string) {
    var aitem: ItemData = this.listOfData.find((x) => x.s_id == id);
    var teacherAllScore = 0;
    var valid = true;
    aitem.dynamicScore.forEach((item) => {
      teacherAllScore += +item.grade;
    });
    if (teacherAllScore > this.selectProject.teacher_grade_ratio) {
      this.msgService.error('教师评分不能超出最高上限值！');
      return;
    } else {
      aitem.teacherAllScore = teacherAllScore;
    }
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ItemData) => item.s_name.indexOf(this.searchValue) !== -1
    );
  }
  confirm(): void {
    // let canSubmit = true;
    this.scoreService
      .getEvaluateDone(this.selectProject.p_id)
      .subscribe((response) => {
        const canSubmit = response;

        if (!canSubmit) {
          this.msgService.info('没有完成所有评分！无法最终提交！');
          return;
        }

        const teacherScores = [];
        this.listOfData.forEach((data) => {
          // if (!data.haveScored) {
          //   canSubmit = false;
          // }
          // if (this.selectProject.self_grade_ratio !== 0 && data.selfScore === 0) {
          //   canSubmit = false;
          // }
          // if (
          //   this.selectProject.mutual_grade_ratio !== 0 &&
          //   data.mutualScore === 0
          // ) {
          //   canSubmit = false;
          // }
          teacherScores.push({
            u_id: data.s_id,
            p_id: this.selectProject.p_id,
            is_group_leader: null,
            self_grade: data.selfScore,
            mutual_grade: data.mutualScore,
            teacher_grade: data.teacherAllScore,
          });
        });

        this.scoreService
          .updateTeacherGrade(teacherScores)
          .subscribe((data) => {
            if (data.code === 200) {
              this.msgService.success('项目评分最终提交成功！');
              this.canEdit = false;
              this.selectProject.grading_status = true;
            } else {
              this.msgService.error('项目评分最终提交失败！');
            }
          });
      });
  }
}
