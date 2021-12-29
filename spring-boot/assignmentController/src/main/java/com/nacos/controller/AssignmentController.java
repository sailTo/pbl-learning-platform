package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.Assignment;
import com.nacos.service.AssignmentService;
import com.nacos.service.ProjectService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignmentController")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAssignment")
    public Result searchAssignment(@RequestParam String pbl_token,
                                   @RequestParam String p_id) {
        String u_id = userService.getUIdByToken(pbl_token);

        JSONObject data = new JSONObject();
        data.put("assignments",assignmentService.searchAssignment(p_id));
        data.put("studentStatus",assignmentService.searchDoneStatus(p_id,u_id));
        data.put("urgeStatus",assignmentService.searchAssignmentUrge(p_id,u_id));
        data.put("doneNum",assignmentService.searchAllAssignmentsDoneNum(p_id));
        data.put("totalNum",projectService.searchTotalNum(p_id));
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchGrouperAssignment")
    public Result searchGrouperAssignment(@RequestParam String pbl_token,
                                          @RequestParam String p_id,
                                          @RequestParam String grouper_id) {
        return ResultGenerator.genSuccessResult(assignmentService.searchDoneStatus(p_id,grouper_id)).setMessage("查询成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAssignmentDone")
    public Result searchAssignmentDone(@RequestParam String pbl_token,
                                       @RequestParam String p_id,
                                       @RequestParam String a_id) {
        JSONObject data = new JSONObject();

        data.put("assignments",assignmentService.searchAssignmentDoneNum(p_id,a_id));
        data.put("totalNum",projectService.searchTotalNum(p_id));

        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createAssignment")
    public Result createAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {
        Assignment assignmentObj = JSON.parseObject(assignment, Assignment.class);
        int a_id = assignmentService.createAssignment(assignmentObj);
        JSONObject data = new JSONObject();
        data.put("a_id",a_id);
        return ResultGenerator.genSuccessResult(data).setMessage("创建任务成功");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createAssignments")
    public Result createAssignments(@RequestParam String pbl_token,
                                    @RequestParam String assignments) {
        List<Assignment> assignmentObjs = JSON.parseArray(assignments,Assignment.class);
        JSONObject data = new JSONObject();
        data.put("a_idList",assignmentService.createAssignments(assignmentObjs));
        return ResultGenerator.genSuccessResult(data).setMessage("批量创建任务成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeAssignment")
    public Result changeAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {
        Assignment assignmentObj = JSON.parseObject(assignment,Assignment.class);
        assignmentService.changeAssignment(assignmentObj);
        return ResultGenerator.genSuccessResult().setMessage("修改任务成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/doneAssignment")
    public Result doneAssignment(@RequestParam String pbl_token,
                                 @RequestParam String a_id,
                                 @RequestParam String p_id) {
        String u_id = userService.getUIdByToken(pbl_token);
        assignmentService.doneAssignment(a_id,p_id,u_id);
        return ResultGenerator.genSuccessResult().setMessage("标记完成成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeAssignments")
    public Result changeAssignments(@RequestParam String pbl_token,
                                    @RequestParam String assignments) {
        List<Assignment> assignmentObjs = JSON.parseArray(assignments,Assignment.class);
        assignmentService.changeAssignments(assignmentObjs);
        return ResultGenerator.genSuccessResult().setMessage("批量修改任务成功");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteAssignment")
    public Result deleteAssignment(@RequestParam String pbl_token,
                                   @RequestParam String a_id,
                                   @RequestParam String p_id) {
        assignmentService.deleteAssignment(p_id,a_id);
        return ResultGenerator.genSuccessResult().setMessage("删除任务成功");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteAssignments")
    public Result deleteAssignments(@RequestParam String pbl_token,
                                    @RequestParam String a_idList,
                                    @RequestParam String p_id) {
        List<Integer> a_ids = JSON.parseArray(a_idList,Integer.class);
        assignmentService.deleteAssignments(p_id,a_ids);
        return ResultGenerator.genSuccessResult().setMessage("批量删除任务成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/modifyAssignments")
    public Result modifyAssignments(@RequestParam String pbl_token,
                                    @RequestParam String assignmentList,
                                    @RequestParam String opList){
        List<Assignment> assignments = JSON.parseArray(assignmentList,Assignment.class);
        List<String> ops = JSON.parseArray(opList,String.class);
        for (int i=0;i<assignments.size();i++) {
            if(ops.get(i).equals("modify")){
                assignmentService.changeAssignment(assignments.get(i));
            }else{
                assignmentService.deleteAssignment(assignments.get(i).getP_id().toString(),assignments.get(i).getA_id().toString());
            }
        }
        return ResultGenerator.genSuccessResult().setMessage("批量修改任务成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/urgeAssignment")
    public Result urgeAssignment(@RequestParam String pbl_token,
                                 @RequestParam String a_id,
                                 @RequestParam String p_id) {
        assignmentService.urgeAssignment(p_id,a_id);
        return ResultGenerator.genSuccessResult().setMessage("催促消息发送成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/applyUrge")
    public Result applyUrge(@RequestParam String pbl_token,
                            @RequestParam String a_id,
                            @RequestParam String p_id) {
        assignmentService.applyUrge(p_id,a_id,userService.getUIdByToken(pbl_token));
        return ResultGenerator.genSuccessResult().setMessage("成功回应催促消息");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countAssignmentDone")
    public Result countAssignmentDone(@RequestParam String pbl_token,
                                      @RequestParam String p_id) {
        int totalAssignmentNum = assignmentService.countAssignment(p_id);
        JSONObject data = new JSONObject();
        data.put("totalAssignmentNum",totalAssignmentNum);
        data.put("doneInformations",assignmentService.countAssignmentDone(p_id));
        return ResultGenerator.genSuccessResult(data).setMessage("查询成功");
    }
}
