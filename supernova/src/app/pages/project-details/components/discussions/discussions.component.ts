import { Component, OnInit, Input} from '@angular/core';
import { addDays, formatDistance } from 'date-fns';
import {ActivatedRoute} from "@angular/router";
import {DiscussionService} from "../../../../services/discussion.service";
import {Discussion} from "../../../../models/discussion";
import {User} from "../../../../models/user";
import {Reply} from "../../../../models/reply";
import {UserService} from "../../../../services/user.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})

export class DiscussionsComponent implements OnInit {
  p_id: number;
  groupers: User[];
  user:User;
  // likes:number[];
  // dislikes:number[];
  // time:string;
  discussions: Discussion[];
  newDiscussion:string;
  discussion_submitting:boolean=false;

  user1 = {
    u_id: 'S001',
    type: '学生',
    u_name: '黄元敏',
    gender: '男',
    description: '5student_1 for test',
    image: 'http://123.56.219.88/SuperNova/UploadImage/default.jpg',
  };

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private message: NzMessageService,
    private userService:UserService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    // this.time = formatDistance(new Date(), new Date());

    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {p_id: number, p_name: string, groupers: string}) => {
        this.p_id = params.p_id;
        this.groupers = JSON.parse(params.groupers);
        this.getDiscussions();
        // this.likes = Array.apply(0,{length:this.num});
        // this.dislikes = Array.apply(0,{length:this.num});
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

    this.user = this.userService.getUser();
    // this.user = this.user1;
  }

  //方法复杂，但无bug
  getDiscussions(): void {
    this.discussionService.getAllDiscussion(this.p_id).subscribe((data) => {
      // let num = 0;
      this.discussions = data.data.discussions;
      // console.log(this.discussions);
      this.discussions.forEach((discussion, index) => {
        // map u_id in file to u_name
        discussion['u_name'] = this.groupers.find(
          (grouper) => grouper.u_id == discussion.u_id
        )['u_name'];
        discussion['image'] = this.groupers.find(
          (grouper) => grouper.u_id == discussion.u_id
        )['image'];
        // add key to each file
        discussion['d_index'] = index;
        discussion['show'] = true;
        discussion['type'] = 'discussion';
        // discussion['index'] = num++;
        discussion['time_for_show'] = formatDistance(discussion['time'], new Date());
        this.discussionService.getReplyByDid(discussion.d_id).subscribe((data) => {
          data.data.replies.forEach((reply) => {
            reply['u_name'] = this.groupers.find(
              (grouper) => grouper.u_id == reply['u_id']
            )['u_name'];
            reply['type'] = 'reply';
            reply['show'] = true;
            reply['image'] = this.groupers.find(
              (grouper) => grouper.u_id == reply['u_id']
            )['image'];
            reply['time_for_show'] = formatDistance(reply['time'], new Date());
            reply['d_index'] = index;
            // reply['index'] = num++;
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

  data: any[] = [];
  submitting = false;
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

  handleCancel(): void {
    this.isVisible = false;
    console.log(this.discussions[0]['replies']);
  }
  handleOk(): void {
    this.inputValue = '回复 '+this.reply_to_u_name+': ' + this.inputValue ;
    this.isConfirmLoading = true;

    let new_reply = {
      d_id: this.reply_d_id,
      u_id: this.user.u_id,
      u_name: this.user.u_name,
      content: this.inputValue,
      d_index: this.reply_discussion_index,
      time_for_show: formatDistance( new Date(), new Date()),
      type: 'reply',
      show: true,
      image: this.user.image,
    };

    this.discussions[this.reply_discussion_index]["replies"].splice(0, 0, new_reply);

    let reply = {
      r_id: null,
      d_id: this.reply_d_id,
      u_id: this.user.u_id,
      content: this.inputValue,
      time: null
    };
    this.discussionService.createReply(JSON.stringify(reply)).subscribe(
      (data) =>{
        console.log(data);
        this.discussions[this.reply_discussion_index]["replies"][0]['r_id'] = data.data.r_id;
      }
    );

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 100);
    this.submitting = true;
    this.inputValue = '';
  }

  // cancel(index): void {
  //   this.nzMessageService.info('delete cancel!');
  // }

  confirm(index, object, type): void {
    if (type == 'discussion') {
      this.discussions[index]['show'] = false;
      this.discussionService.deleteDiscussion(object["d_id"],this.p_id);
    }
    else{
      let i = this.discussions[index]["replies"].indexOf(object);
      this.discussions[index]["replies"][i].show = false;
      this.discussionService.deleteReply(object["r_id"]);
    }
    let flag = true;
    this.discussions.forEach((discussion) => {
      if (discussion['show']) {
        flag = false;
        return;
      }
    });
    if (flag)
      this.discussions = null;
  }

  handleSubmit(): void {
    this.discussion_submitting = true;
    const content = this.newDiscussion;
    this.newDiscussion = '';

    let length = this.discussions.length;
    let new_discussion = {
      d_id : null,
      p_id : this.p_id,
      u_id : this.user.u_id,
      u_name: this.user.u_name,
      image: this.user.image,
      d_index: length,
      show: true,
      type: 'discussion',
      time_for_show: formatDistance(new Date(), new Date()),
      content : content,
      time : new Date(),
      replies : []
    };
    this.discussions = [
      ...this.discussions,
      new_discussion
    ];
    // this.discussions.push(new_discussion);

    let discussion = {
      d_id : null,
      p_id : this.p_id,
      u_id : this.user.u_id,
      content : content,
      time : new Date()
    };
    this.discussionService.createDiscussion(JSON.stringify(discussion)).subscribe(
      (data) =>{
        // console.log(data);
        // this.getDiscussions();
        this.discussions[length]["d_id"] = data.data.d_id;
      }
    );

    setTimeout(() => {
      this.discussion_submitting = false;
      this.message.success('添加话题成功', {
        nzDuration: 1500
      });
      // this.data = [
      //   ...this.data,
      //   {
      //     ...this.user,
      //     content,
      //     datetime: new Date(),
      //     displayTime: formatDistance(new Date(), new Date())
      //   }
      // ].map(e => {
      //   return {
      //     ...e,
      //     displayTime: formatDistance(new Date(), e.datetime)
      //   };
      // });
    }, 500);
  }
}
