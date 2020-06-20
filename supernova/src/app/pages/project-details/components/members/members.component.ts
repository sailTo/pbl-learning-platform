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
  all_submit_button_rating: number[];

  // u_id:string;
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
    // console.log("edit "+this.all_submit_button_rating);
  }

  update(index): void {
    this.all_submit_button_rating.splice(
      this.all_submit_button_rating.indexOf(index),
      1
    );
    console.log('update ' + this.all_submit_button_rating);
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
    // this.u_id = String(this.user.u_id);
    // console.log(
    this.projectService.getProject(this.p_id).subscribe((data) => {
      // console.log(data.data.project);
      this.ifOpenRating = data.data.project.self_grade_ratio != 0;
      // this.ifOpenRating = false;
      if (this.ifOpenRating) this.getMyRating();
      // if (this.user.type == 'admin')
      //   this.ifOpenRating = false;
    });
  }

  getMyRating(): void {
    this.projectService.getProject(this.p_id).subscribe((response) => {
      this.scoreService.getRating(this.p_id).subscribe((data) => {
        this.ratings = data.data.rateMapping;
        // console.log(this.ratings);
        this.groupers.forEach((grouper) => {
          grouper['rating'] = this.ratings.find(
            (rating) => rating.u_id == grouper['u_id']
          )['rating'];
          // console.log(grouper['rating']);
          if (
            this.user.type == 'admin' ||
            response.data.project.grading_status
          ) {
            this.ifEdit.push(false);
            this.ifUpdate.push(false);
          } else {
            this.ifEdit.push(grouper['rating'] == null);
            this.ifUpdate.push(grouper['rating'] == null);
          }
        });
        // console.log(this.groupers);
      });

      // if (!response.data.project.grading_status){
      //
      // }
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
      .subscribe(() => {
        // console.log('All completed!');
      });
  }

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
      // console.log(this.p_id,u_id,score);
      this.scoreService
        .toRating(this.p_id, u_id, score)
        .subscribe
        // (data) =>{
        //   console.log(data);
        // }
        ();
    });
    this.startShowMessages();
    this.all_submit_button_rating = [];
  }
}
