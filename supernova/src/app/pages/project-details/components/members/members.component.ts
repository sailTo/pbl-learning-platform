import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../../../../models/rating';
import { ProjectService } from '../../../../services/project.service';
import { ScoreService } from '../../../../services/score.service';
import { concatMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  p_id: number;
  groupers: User[];
  leaderId: string;
  ifOpenRating: boolean;
  ifUpdate: boolean[];
  ifEdit: boolean[];

  ratings: Rating[];

  offsetTop = 50;
  all_submit_button_style: string;
  all_submit_button_disable: boolean;

  //全局提交按钮
  all_submit_button_rating: number[];

  //新增两个变量，用于判断自评或者互评为0的情况，在前端会有不一样的显示
  open_self_rating: boolean;
  open_mutual_rating: boolean;

  //储存当前user，用于自评互评时判断
  user: User;

  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private projectService: ProjectService,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  edit(index): void {
    this.all_submit_button_style = 'primary';
    this.all_submit_button_disable = true;
    this.ifEdit[index] = false;
    this.all_submit_button_rating.push(index);
  }

  //支持单个条目更新，通过index进行更新，此index由前端生成页面绑定
  update(index): void {
    this.all_submit_button_rating.splice(
      this.all_submit_button_rating.indexOf(index),
      1
    );
    this.ifUpdate[index] = false;
    let u_id = this.ratings[index].u_id;
    let score = this.groupers.find(
      (group) => group.u_id == this.ratings[index].u_id
    )['rating'];

    this.scoreService.toRating(this.p_id, u_id, score).subscribe((data) => {
      console.log(data);
    });
    this.startShowMessages();
  }

  ngOnInit(): void {
    this.all_submit_button_style = 'default';
    this.ifEdit = [];
    this.ifUpdate = [];
    this.all_submit_button_rating = [];
    this.user = this.userService.getUser();

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
      }
    );
    //获取项目状态，初始化几个变量
    this.projectService.getProject(this.p_id).subscribe((data) => {
      this.open_self_rating = data.data.project.self_grade_ratio != 0;
      this.open_mutual_rating = data.data.project.mutual_grade_ratio != 0;
      this.ifOpenRating = this.open_self_rating || this.open_mutual_rating;
      if (this.ifOpenRating) this.getMyRating();
    });
  }

  getMyRating(): void {
    this.projectService.getProject(this.p_id).subscribe((response) => {
      this.scoreService.getRating(this.p_id).subscribe((data) => {
        this.ratings = data.data.rateMapping;
        //获取已经评分的人的状态和分数
        this.groupers.forEach((grouper) => {
          grouper['rating'] = this.ratings.find(
            (rating) => rating.u_id == grouper['u_id']
          )['rating'];
          if (
            this.user.type == 'admin' ||
            response.data.project.grading_status
          ) {
            this.ifEdit.push(false);
            this.ifUpdate.push(false);
          } else {
            if (grouper['u_id'] == this.user.u_id) {
              if (this.open_self_rating) {
                this.ifEdit.push(grouper['rating'] == null);
                this.ifUpdate.push(grouper['rating'] == null);
              } else {
                this.ifEdit.push(false);
                this.ifUpdate.push(false);
              }
            } else {
              if (this.open_mutual_rating) {
                if (grouper['u_id'] != this.user.u_id) {
                  this.ifEdit.push(grouper['rating'] == null);
                  this.ifUpdate.push(grouper['rating'] == null);
                }
              } else {
                this.ifEdit.push(false);
                this.ifUpdate.push(false);
              }
            }
          }
        });
      });
    });
  }

  startShowMessages(): void {
    this.message
      .loading('正在提交评分', { nzDuration: 1000 })
      .onClose!.pipe(
        concatMap(
          () => this.message.success('评分成功', { nzDuration: 1500 }).onClose!
        )
      )
      .subscribe(() => {});
  }
  //改按钮会固定在title上，点击时会使用foreach对每一项条目进行提交，实现一键提交操作
  setOffsetBottom(): void {
    this.offsetTop = 50;
    this.all_submit_button_style = 'default';
    this.all_submit_button_disable = false;

    this.all_submit_button_rating.forEach((index) => {
      this.ifUpdate[index] = false;
      let u_id = this.ratings[index].u_id;
      let score = this.groupers.find(
        (group) => group.u_id == this.ratings[index].u_id
      )['rating'];
      if (
        (this.open_self_rating && u_id == this.user.u_id) ||
        (this.open_mutual_rating && u_id != this.user.u_id)
      ) {
        this.scoreService.toRating(this.p_id, u_id, score).subscribe();
      }
    });
    this.startShowMessages();
    this.all_submit_button_rating = [];
  }
}
