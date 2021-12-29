package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultCode;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.StudentGrade;
import com.nacos.entity.StudentProject;
import com.nacos.entity.User;
import com.nacos.service.EvaluationService;
import com.nacos.service.ProjectService;
import com.nacos.service.StudentGradeService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/evaluateController")
public class EvaluateController {

    @Autowired
    private UserService userService;
    @Autowired
    private EvaluationService evaluationService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private StudentGradeService studentGradeService;


    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateBySelf")
    public Result searchEvaluateBySelf(@RequestParam String pbl_token,
                                       @RequestParam String p_id) {
        String u_id = userService.getUIdByToken(pbl_token);

        JSONObject data = new JSONObject();
        String grade = evaluationService.searchEvaluateBySelf(Integer.parseInt(p_id),u_id);
        if(grade.equals("-1")){
            return ResultGenerator.genFailResult("暂未评分").setCode(ResultCode.DENY);
        }

        data.put("grade",grade);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateSelf")
    public Result evaluateSelf(@RequestParam String pbl_token,
                               @RequestParam String p_id,
                               @RequestParam String grade){
        String u_id = userService.getUIdByToken(pbl_token);
        evaluationService.evaluate(Integer.parseInt(p_id),u_id,u_id,Double.parseDouble(grade));
        return ResultGenerator.genSuccessResult().setMessage("自评成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateByOther")
    public Result searchEvaluateByOther(@RequestParam String pbl_token,
                                        @RequestParam String p_id) {
        String u_id = userService.getUIdByToken(pbl_token);
        return ResultGenerator.genSuccessResult(evaluationService.searchEvaluateByOther(Integer.parseInt(p_id),u_id));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateOther")
    public Result evaluateOther(@RequestParam String pbl_token,
                                @RequestParam String p_id,
                                @RequestParam String u_id,
                                @RequestParam String grade) {
        String s_id = userService.getUIdByToken(pbl_token);
        evaluationService.evaluate(Integer.parseInt(p_id),s_id,u_id,Double.parseDouble(grade));
        return ResultGenerator.genSuccessResult("评分成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getMyEvaluation")
    public Result getMyEvaluation(@RequestParam String pbl_token,
                                  @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        ArrayList<Map<String, String>> ret = evaluationService.getMyEvaluate(Integer.parseInt(p_id),s_id);
        JSONObject data = new JSONObject();
        data.put("rateMapping",ret);
        return ResultGenerator.genSuccessResult(data);
    }

    //这个是学生查询自己的用的接口
    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateByTeacher")
    public Result searchEvaluateByTeacher(@RequestParam String pbl_token,
                                          @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        List<StudentGrade> res = studentGradeService.searchEvaluateByTeacher(Integer.parseInt(p_id),s_id);
        if(res==null){
            return ResultGenerator.genFailResult("教师未评分").setCode(ResultCode.DENY);
        }
        JSONObject data = new JSONObject();
        data.put("grades",res);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchGrade")
    public Result searchGrade(@RequestParam String pbl_token,
                              @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        String grade = studentGradeService.searchGrade(Integer.parseInt(p_id),s_id);
        if(grade==null){
            return ResultGenerator.genFailResult("未生成最终评分").setCode(ResultCode.DENY);
        }
        JSONObject data = new JSONObject();
        data.put("grade",grade);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateByTeacher")
    public Result evaluateByTeacher(@RequestParam String pbl_token,
                                    @RequestParam String grades) {
        String t_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(t_id);
        if(!user.getType().equals("teacher")){
            return ResultGenerator.genFailResult("评分失败");
        }
        List<StudentGrade> studentGrades = JSON.parseArray(grades,StudentGrade.class);
        studentGradeService.evaluateByTeacher(studentGrades);
        return ResultGenerator.genSuccessResult().setMessage("评分成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/evaluateDone")
    public Result evaluateDone(@RequestParam String pbl_token,
                               @RequestParam String p_id) {
        return ResultGenerator.genSuccessResult(projectService.evaluationDone(Integer.parseInt(p_id))).setMessage("评价成功");
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/setTeacherGrade")
    public Result setTeacherGrade(@RequestParam String pbl_token,
                                  @RequestParam String student_grade) {
        String s_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(s_id);
        if(user.getType().equals("student")){
            return ResultGenerator.genFailResult("修改教师评分权限不够").setCode(ResultCode.DENY);
        }
        StudentGrade studentGradeObj = JSON.parseObject(student_grade,StudentGrade.class);
        studentGradeService.update(studentGradeObj);
        return ResultGenerator.genSuccessResult().setMessage("更新成功！");
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/SelfAndMutualevaluateScore")
    public Result getSelfAndMutualGrade(@RequestParam String pbl_token,
                                        @RequestParam String p_id) {
        String s_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(s_id);
        if(user.getType().equals("student")){
            return ResultGenerator.genFailResult("获取自评互评分权限不够").setCode(ResultCode.DENY);
        }
        ArrayList<Map<String,Object>> ret = projectService.getSelfAndMutualGradeByPid(Integer.parseInt(p_id));
        JSONObject data = new JSONObject();
        data.put("selfAndMutualInformations",ret);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateTeacherGrade")
    public Result updateTeacherGrade(@RequestParam String pbl_token,
                                     @RequestParam String student_project_list){
        String a_id = userService.getUIdByToken(pbl_token);
        User teacher = userService.searchUser(a_id);
        if(!teacher.getType().equals("teacher")){
            return ResultGenerator.genFailResult("权限不够，修改教师评分失败");
        }
        List<StudentProject> studentProjectsObj = JSON.parseArray(student_project_list,StudentProject.class);
        for (StudentProject s : studentProjectsObj){
            projectService.updateTeacherGrade(s);
        }
        projectService.updateProjectGradeStatus(studentProjectsObj.get(0).getP_id());
        return ResultGenerator.genSuccessResult().setMessage("修改教师评分成功");
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/getAllGradeItems")
    public Result getAllGradeItems(@RequestParam String pbl_token) {
        String a_id = userService.getUIdByToken(pbl_token);
        User admin = userService.searchUser(a_id);
        if(!admin.getType().equals("admin")){
            return ResultGenerator.genFailResult("权限不够，获取评分细则失败");
        }
        JSONObject data = new JSONObject();
        data.put("itemList",JSON.toJSON(studentGradeService.getAllGradeItems()));
        return ResultGenerator.genSuccessResult(data);
    }
}
