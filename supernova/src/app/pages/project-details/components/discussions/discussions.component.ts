import { Component, OnInit, Input} from '@angular/core';
import { addDays, formatDistance } from 'date-fns';
import {ActivatedRoute} from "@angular/router";
import {DiscussionService} from "../../../../services/discussion.service";
import {Discussion} from "../../../../models/discussion";
import {User} from "../../../../models/user";
import {Reply} from "../../../../models/reply";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})

export class DiscussionsComponent implements OnInit {
  p_id: number;
  groupers: User[];
  u_id:string;
  u_name:string;
  // isVisible:boolean[];
  num:number;
  likes:number[];
  dislikes:number[];
  // time:string;
  // data:Date;
  discussions: Discussion[];

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
  ) { }

  ngOnInit(): void {
    // this.time = formatDistance(new Date(), new Date());

    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {p_id: number, p_name: string, groupers: string}) => {
        this.p_id = params.p_id;
        this.groupers = JSON.parse(params.groupers);
        this.getDiscussions();
        // this.isVisible = (() => {
        //   let isVisible = [];
        //   for (let i = 0; i < this.num; i++)
        //     isVisible.push(false);
        //   return isVisible;
        // })();
        this.likes = Array.apply(0,{length:this.num});
        this.dislikes = Array.apply(0,{length:this.num});
        // this.isVisible = Array.apply(false,{length:this.num});

        // this.likes = (() => {
        //   let likes = [];
        //   for (let i = 0; i < this.num; i++)
        //     likes.push(0);
        //   return likes;
        // })();
        // this.dislikes = (() => {
        //   let dislikes = [];
        //   for (let i = 0; i < this.num; i++)
        //     dislikes.push(0);
        //   return dislikes;
        // })();
      }
    );

    this.u_id = 'S001';
    this.u_name = this.groupers.find(
      (grouper) => grouper.u_id == this.u_id
    )['u_name']
  }

  //方法复杂，怀疑会有bug
  getDiscussions(): void {
    this.discussionService.getAllDiscussion(this.p_id).subscribe((data) => {
      this.num = 0;
      this.discussions = data.data.discussions;
      // console.log(this.discussions);
      this.discussions.forEach((discussion, index) => {
        // map u_id in file to u_name
        discussion['u_name'] = this.groupers.find(
          (grouper) => grouper.u_id == discussion.u_id
        )['u_name'];
        discussion['avatar'] = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
        // add key to each file
        discussion['key'] = index;
        discussion['time_for_show'] = formatDistance(discussion['time'], new Date());
        this.discussionService.getReplyByDid(discussion.d_id).subscribe((data) => {
          data.data.replies.forEach((reply) => {
            reply['u_name'] = this.groupers.find(
              (grouper) => grouper.u_id == reply['u_id']
            )['u_name'];
            reply['time_for_show'] = formatDistance(reply['time'], new Date());
            reply['key'] = index;
            reply['avatar'] = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
          });
          discussion['replies'] = data.data.replies;
        })
      });
    });
  }

  // like(): void {
  //   this.likes = 1;
  //   this.dislikes = 0;
  // }
  //
  // dislike(): void {
  //   this.likes = 0;
  //   this.dislikes = 1;
  // }

  // tslint:disable-next-line:no-any
  data: any[] = [];
  submitting = false;
  // user = {
  //   author: 'Han Solo',
  //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  // };
  inputValue = '';


  isVisible = false;
  isConfirmLoading = false;

  //回复的讨论的序号
  reply_d_id:number;
  //点击回复的讨论在数组中的信号
  reply_discussion_index:number;
  //点击回复的人名
  reply_to_u_name:string;
  showModal(u_name, d_id, index): void {
    this.reply_d_id=d_id;
    this.reply_to_u_name=u_name;
    this.reply_discussion_index = index;
    this.isVisible = true;
  }


  handleOk(): void {
    this.inputValue = 'Reply '+this.reply_to_u_name+': ' + this.inputValue ;
    this.isConfirmLoading = true;
    let s = {};
    s["d_id"] = this.reply_d_id;
    s["u_id"] = this.u_id;
    s["u_name"] = this.u_name;
    s["content"] = this.inputValue;
    s['key'] = this.reply_discussion_index;
    s['time_for_show'] = formatDistance( new Date(), new Date());
    // s['key'] = this.num++;
    s['avatar'] = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
    this.discussions[this.reply_discussion_index]["replies"].push(s);

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 100);
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';

    //此处需要添加向后台请求添加数据的http请求

    // setTimeout(() => {
    //   this.submitting = false;
    //   this.data = [
    //     ...this.data,
    //     {
    //       ...this.user,
    //       content,
    //       datetime: new Date(),
    //       displayTime: formatDistance(new Date(), new Date())
    //     }
    //   ].map(e => {
    //     return {
    //       ...e,
    //       displayTime: formatDistance(new Date(), e.datetime)
    //     };
    //   });
    // }, 800);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
