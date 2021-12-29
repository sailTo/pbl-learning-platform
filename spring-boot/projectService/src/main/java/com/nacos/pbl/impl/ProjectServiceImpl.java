package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSON;
import com.nacos.core.AbstractService;
import com.nacos.core.FileUtil;
import com.nacos.core.ProjectConstant;
import com.nacos.dao.*;
import com.nacos.entity.*;
import com.nacos.pbl.ProjectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by CodeGenerator on 2021/12/19.
 */
@Service
@Transactional
@RestController
@RequestMapping("/project")
public class ProjectServiceImpl extends AbstractService<Project> implements ProjectService {
    @Resource
    private ProjectMapper projectMapper;
    @Resource
    private GradeSystemMapper gradeSystemMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;
    @Resource
    private AssignmentMapper assignmentMapper;
    @Resource
    private StudentAssignmentMapper studentAssignmentMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private EvaluationMapper evaluationMapper;

    @Override
    @RequestMapping("/getSelfAndMutualGradeByPid")
    public ArrayList<Map<String, Object>> getSelfAndMutualGradeByPid(@RequestParam("p_id") int p_id) {
        StudentProject studentProject = new StudentProject();
        studentProject.setP_id(p_id);
        ArrayList<Map<String, Object>> ret = new ArrayList<>();
        List<StudentProject> studentProjects = studentProjectMapper.select(studentProject);
        for (StudentProject s : studentProjects) {
            Map<String, Object> tmp = new HashMap<>();
            User user = userMapper.selectByPrimaryKey(s.getU_id());
            Double mutual_Grade = evaluationMapper.searchEvaluateByOther(p_id,user.getU_id());
            if (mutual_Grade == null)
                mutual_Grade = 0.0;
            Double selfGrade = evaluationMapper.getMyEvaluate(p_id,user.getU_id(),user.getU_id());
            if (selfGrade == null)
                selfGrade = 0.0;
            tmp.put("s_id",s.getU_id());
            tmp.put("s_name",user.getU_name());
            tmp.put("selfScore",selfGrade);
            tmp.put("mutualScore",mutual_Grade);
            ret.add(tmp);
        }
        return ret;
    }

    @Override
    @RequestMapping("/studentCoursePID")
    public int studentCoursePID(@RequestParam("u_id") String u_id,@RequestParam("c_id") String c_id) {
          Integer res = studentProjectMapper.studentCoursePID(Integer.getInteger(c_id),u_id);
          return res==null?-1:res;
    }

    @Override
    @RequestMapping("/searchProject")
    public List<Project> searchProject(@RequestParam("c_id") String c_id) {
        Project tmp = new Project();
        tmp.setC_id(Integer.getInteger(c_id));
        return projectMapper.select(tmp);
    }

    @Override
    @RequestMapping("/deletProject")
    public void deletProject(@RequestParam("p_id") int p_id) {
        //删除项目文件存储的文件夹
        FileUtil.deleteStorageDir(ProjectConstant.File_BASE+p_id);

        projectMapper.deleteByPrimaryKey(p_id);

        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        gradeSystemMapper.delete(tmp);
    }

    @Override
    @RequestMapping("/addProject")
    public int addProject(@RequestParam("project") Project project,@RequestParam("grades") List<GradeSystem> grades) {
        project.setGrading_status(false);
        projectMapper.addProject(project);
        int p_id = project.getP_id();
        //新创建一个项目，项目的id从1开始计算
        int item_id = 1;
        for (GradeSystem grade:grades) {
            grade.setP_id(p_id);
            //这里需要修改成设置item_id，因为它不是自增的
            grade.setItem_id(item_id++);
            gradeSystemMapper.insert(grade);
        }
        return p_id;
    }

    @Override
    @RequestMapping("/changeProject")
    public void changeProject(@RequestParam("project") Project project,@RequestParam("grades") List<GradeSystem> grades) {
        projectMapper.updateByPrimaryKey(project);
        GradeSystem gradeSystem = new GradeSystem();
        gradeSystem.setP_id(project.getP_id());
        List<GradeSystem> preGradeSystems = gradeSystemMapper.select(gradeSystem);

        int index = gradeSystemMapper.getMaxItemId(project.getP_id());
        int deleteItemId = 0;
        for (GradeSystem preGrade: preGradeSystems) {
            deleteItemId = preGrade.getItem_id();
            boolean flag = true;
            for (GradeSystem grade : grades) {
                if (preGrade.getItem_id().equals(grade.getItem_id())) {
                    flag = false;
                    break;
                }
            }
            if (flag) {//遍历结束没找到，说明被删
                GradeSystem deleteTmp = new GradeSystem();
                deleteTmp.setP_id(project.getP_id());
                deleteTmp.setItem_id(deleteItemId);
                gradeSystemMapper.delete(deleteTmp);
            }else {//遍历结束找到了，说明被更新
                for (GradeSystem grade : grades) {
                    if (preGrade.getItem_id().equals(grade.getItem_id())) {
                        gradeSystemMapper.updateByPrimaryKey(grade);
                        break;
                    }
                }
            }
        }
        for (GradeSystem grade:grades) {
            if (grade.getItem_id() == -1){//新增的
                grade.setItem_id(++index);
                gradeSystemMapper.insert(grade);
                break;
            }
        }
    }

    @Override
    @RequestMapping("/updateProjectGradeStatus")
    public void updateProjectGradeStatus(@RequestParam("p_id") int p_id) {
        Project tmp = new Project();
        tmp.setP_id(p_id);
        tmp = projectMapper.selectByPrimaryKey(tmp);
        tmp.setGrading_status(true);
        projectMapper.updateByPrimaryKey(tmp);
    }

    @Override
    @RequestMapping("/searchGradeSystem")
    public List<GradeSystem> searchGradeSystem(@RequestParam("p_id") int p_id) {
        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        return gradeSystemMapper.select(tmp);
    }

    @Override
    @RequestMapping("/searchTotalNum")
    public int searchTotalNum(@RequestParam("p_id") int p_id) {
        StudentProject tmp = new StudentProject();
        tmp.setP_id(p_id);
        return studentProjectMapper.selectCount(tmp);
    }

    @Override
    @RequestMapping("/countDone")
    public int countDone(@RequestParam("p_id") int p_id) {
        return projectMapper.countDone(p_id);
    }

    @Override
    @RequestMapping("/searchGroupers")
    public List<User> searchGroupers(@RequestParam("p_id") int p_id) {
        return projectMapper.searchGroupers(p_id);
    }

    @Override
    @RequestMapping("/searchLeader")
    public String searchLeader(@RequestParam("p_id") int p_id) {
        StudentProject tmp = new StudentProject();
        tmp.setIs_group_leader(true);
        tmp.setP_id(p_id);
        List<StudentProject> list = studentProjectMapper.select(tmp);
        if(list.size()==0){
            return "null";
        }
        return list.get(0).getU_id();
    }

    @Override
    @RequestMapping("/joinProject")
    public void joinProject(@RequestParam("p_id") int p_id,@RequestParam("u_id") String u_id) {
        StudentProject tmp = new StudentProject();
        tmp.setP_id(p_id);
        List<StudentProject> list = studentProjectMapper.select(tmp);
        if(list.size()==0){
            tmp.setIs_group_leader(true);
        }else{
            tmp.setIs_group_leader(false);
        }
        tmp.setU_id(u_id);
        //初始化自评分、互评分、教师评分
        tmp.setMutual_grade(0.0);
        tmp.setSelf_grade(0.0);
        tmp.setTeacher_grade(0.0);
        //插入学生选项目
        studentProjectMapper.insert(tmp);

        //插入学生任务
        Assignment assignment = new Assignment();
        assignment.setP_id(p_id);
        List<Assignment> aList = assignmentMapper.select(assignment);
        for (Assignment a:aList) {
            StudentAssignment t = new StudentAssignment();
            t.setA_id(a.getA_id());
            t.setP_id(a.getP_id());
            t.setU_id(u_id);
            t.setStatus(false);
            String leaderId = searchLeader(p_id);
            if (leaderId != null){
                StudentAssignment flag = new StudentAssignment();
                flag.setU_id(leaderId);
                flag.setA_id(a.getA_id());
                flag.setP_id(a.getP_id());
                StudentAssignment if_Null_tmp = studentAssignmentMapper.selectOne(flag);
                if (if_Null_tmp != null && if_Null_tmp.getUrge())
                    t.setUrge(true);
                else
                    t.setUrge(false);
            }else
                t.setUrge(false);
            studentAssignmentMapper.insert(t);
        }
    }

    @Override
    @RequestMapping("/updateTeacherGrade")
    public void updateTeacherGrade(@RequestParam("studentProject") StudentProject studentProject) {
        studentProjectMapper.updateByPrimaryKeySelective(studentProject);
    }

    @Override
    @RequestMapping("/evaluationDone")
    public boolean evaluationDone(@RequestParam("p_id") int p_id) {
        Project tmp = new Project();
        tmp.setP_id(p_id);
        tmp = projectMapper.selectByPrimaryKey(tmp);
        if(tmp.getTeacher_grade_ratio()>0){
            //如果老师还有学生没评完分，则返回false
            if(evaluationMapper.searchTeacherNotEvaluateNum(p_id)>0){
                return false;
            }
        }

        if(tmp.getSelf_grade_ratio()>0){
            //如果还有学生没自评完，则返回false
            if(evaluationMapper.searchNotSelfEvaluateNum(p_id)>0){
                return false;
            }

            if(tmp.getMutual_grade_ratio()>0){
                //如果还有学生没互评/自评完分数，则返回false
                if(evaluationMapper.searchNotEvaluateNum(p_id)>0){
                    return false;
                }
            }
        }else{
            if(tmp.getMutual_grade_ratio()>0){
                int left = evaluationMapper.searchNotEvaluateNum(p_id)-evaluationMapper.searchNotSelfEvaluateNum(p_id);

                //如果还有学生没互评完分数，则返回false
                if(left>0){
                    return false;
                }
            }
        }

        //全部评完则返回true
        return true;
    }
}
