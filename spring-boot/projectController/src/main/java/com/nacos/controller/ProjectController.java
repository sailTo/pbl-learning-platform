package com.nacos.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultCode;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.GradeSystem;
import com.nacos.entity.Project;
import com.nacos.entity.User;
import com.nacos.service.ProjectService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/projectController")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @GetMapping("/searchProject")
    public Result searchProject(@RequestParam String pbl_token,
                                @RequestParam String c_id) {
        String u_id = userService.getUIdByToken(pbl_token);
//        String u_id = "S001";
        int p_id = projectService.studentCoursePID(u_id,c_id);
        User user = userService.searchUser(u_id);
        JSONObject data = new JSONObject();
        data.put("type",user.getType());
        data.put("project_take",p_id);
        data.put("projects",projectService.searchProject(c_id));

        return ResultGenerator.genSuccessResult(data);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/getProjectByPid")
    public Result getProjectByPid(@RequestParam String pbl_token,
                                  @RequestParam Integer p_id) {
        JSONObject data = new JSONObject();

        data.put("project",projectService.findById(p_id));

        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createProject")
    public Result createProject(@RequestParam String pbl_token,
                                @RequestParam String project,
                                @RequestParam String grades) {
        String t_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(t_id);

        if(!user.getType().equals("admin")&&!user.getType().equals("teacher")){
            return ResultGenerator.genFailResult("创建失败，权限不够").setCode(ResultCode.DENY);
        }

        Project projectObj = JSON.parseObject(project,Project.class);
        List<GradeSystem> gradeSystems = JSON.parseArray(grades,GradeSystem.class);
        int p_id = projectService.addProject(projectObj,gradeSystems);
        JSONObject data = new JSONObject();
        data.put("p_id",p_id);

        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/joinProject")
    public Result joinProject(@RequestParam String pbl_token,
                              @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        projectService.joinProject(Integer.parseInt(p_id),s_id);
        return ResultGenerator.genSuccessResult().setMessage("加入项目成功！");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteProject")
    public Result deleteProject(@RequestParam String pbl_token,
                                @RequestParam String p_id) {
        String t_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(t_id);
        if(!user.getType().equals("admin")&&!user.getType().equals("teacher")){
            return ResultGenerator.genFailResult("删除失败，权限不够").setCode(ResultCode.DENY);
        }
        projectService.deletProject(Integer.parseInt(p_id));
        return ResultGenerator.genSuccessResult("删除成功");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/changeProject")
    public Result changeProject(@RequestParam String pbl_token,
                                @RequestParam String project,
                                @RequestParam String grades) {
        String t_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(t_id);
        if(!user.getType().equals("admin")){
            return ResultGenerator.genFailResult("修改项目失败，权限不够").setCode(ResultCode.DENY);
        }
        Project projectObj = JSON.parseObject(project,Project.class);
        List<GradeSystem> gradeSystems = JSON.parseArray(grades,GradeSystem.class);
        projectService.changeProject(projectObj,gradeSystems);
        return ResultGenerator.genSuccessResult().setMessage("修改成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchProjectGradeSystem")
    public Result searchProjectGradeSystem(@RequestParam String pbl_token,
                                           @RequestParam String p_id) {
        JSONObject data = new JSONObject();
        data.put("grades",projectService.searchGradeSystem(Integer.parseInt(p_id)));
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countDone")
    public Result countDone(@RequestParam String pbl_token,
                            @RequestParam String p_id) {
        int doneNum = projectService.countDone(Integer.parseInt(p_id));
        int totalNum = projectService.searchTotalNum(Integer.parseInt(p_id));
        JSONObject data = new JSONObject();
        data.put("done_num",doneNum);
        data.put("total_num",totalNum);
        return ResultGenerator.genSuccessResult(data).setMessage("成功统计项目完成人数");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchGroupers")
    public Result searchGroupers(@RequestParam String pbl_token,
                                 @RequestParam String p_id) {
        JSONObject data = new JSONObject();
        data.put("groupers",projectService.searchGroupers(Integer.parseInt(p_id)));
        data.put("leader",projectService.searchLeader(Integer.parseInt(p_id)));

        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getGradeItems")
    public Result getGradeItems(@RequestParam String pbl_token,
                                @RequestParam String p_id) {
        JSONObject data = new JSONObject();
        data.put("grades",projectService.searchGradeSystem(Integer.parseInt(p_id)));
        return ResultGenerator.genSuccessResult(data).setMessage("查询成功");
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/evaluateDone")
    public Result evaluateDone(@RequestParam String pbl_token,
                               @RequestParam String p_id) {
        return ResultGenerator.genSuccessResult(projectService.evaluationDone(Integer.parseInt(p_id))).setMessage("评价成功");
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/getAllProjects")
    public Result getAllProjects(@RequestParam String pbl_token) {
        String a_id = userService.getUIdByToken(pbl_token);
        User admin = userService.searchUser(a_id);
        if(!admin.getType().equals("admin")){
            return ResultGenerator.genFailResult("权限不够，获取项目失败");
        }
        JSONObject data = new JSONObject();
        data.put("projectList",projectService.findAll());
        return ResultGenerator.genSuccessResult(data);
    }


}
