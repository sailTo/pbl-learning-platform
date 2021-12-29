package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.Discussion;
import com.nacos.entity.Reply;
import com.nacos.service.AssignmentService;
import com.nacos.service.DiscussionService;
import com.nacos.service.ReplyService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/discussionAndReplyController")
public class DiscussionAndReplyController {

    @Autowired
    private DiscussionService discussionService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private UserService userService;
    @Autowired
    private AssignmentService assignmentService;


    @CrossOrigin(origins = "*")
    @GetMapping("/searchDiscussions")
    public Result searchDiscussions(@RequestParam String pbl_token,
                                    @RequestParam String p_id) {
        JSONObject data = new JSONObject();
        data.put("discussions",discussionService.searchDiscussions(Integer.parseInt(p_id)));
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createDiscussion")
    public Result createDiscussion(@RequestParam String pbl_token,
                                   @RequestParam String discussion) {
        Discussion discussionObj = JSON.parseObject(discussion,Discussion.class);
        int d_id = discussionService.createDiscussion(discussionObj);
        JSONObject data = new JSONObject();
        data.put("d_id",d_id);
        return ResultGenerator.genSuccessResult(data).setMessage("发布成功");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteDiscussion")
    public Result deleteDiscussion(@RequestParam String pbl_token,
                                   @RequestParam String d_id,
                                   @RequestParam String p_id) {
        discussionService.deleteDiscussion(Integer.parseInt(p_id),Integer.parseInt(d_id));
        return ResultGenerator.genSuccessResult().setMessage("删除成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchReply")
    public Result searchReply(@RequestParam String pbl_token,
                              @RequestParam String d_id) {
        JSONObject data = new JSONObject();
        data.put("replies",replyService.searchReplise(Integer.parseInt(d_id)));
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createReply")
    public Result createReply(@RequestParam String pbl_token,
                              @RequestParam String reply) {
        Reply replyObj = JSON.parseObject(reply, Reply.class);
        int r_id = replyService.createReply(replyObj);
        JSONObject data = new JSONObject();
        data.put("r_id",r_id);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteReply")
    public Result deleteReply(@RequestParam String pbl_token,
                              @RequestParam String r_id) {
        replyService.deleteReply(Integer.parseInt(r_id));
        return ResultGenerator.genSuccessResult("删除成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countDiscussion")
    public Result countDiscussion(@RequestParam String pbl_token,
                                  @RequestParam String p_id) {
        JSONObject data = new JSONObject();
        data.put("maxDiscussNum",discussionService.getMaxDiscussionNum(Integer.parseInt(p_id)));
        data.put("discussInformations",discussionService.countDiscussion(Integer.parseInt(p_id)));
        return ResultGenerator.genSuccessResult(data).setMessage("查询成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getStudentDiscussonAndAssignmentCountByPid")
    public Result getStudentDiscussonCountByPid(@RequestParam String pbl_token,
                                                @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        int discussionCount = discussionService.getDiscussionAndReplyCount(Integer.parseInt(p_id),s_id);
        int assignmentDoneCount = assignmentService.countAssignmentDoneByUidAndPid(Integer.parseInt(p_id),s_id);
        JSONObject data = new JSONObject();
        data.put("discussionCount",discussionCount);
        data.put("assignmentDoneCount",assignmentDoneCount);
        return ResultGenerator.genSuccessResult(data);
    }
}
