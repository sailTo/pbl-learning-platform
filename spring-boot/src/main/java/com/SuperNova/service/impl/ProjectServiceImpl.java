package com.SuperNova.service.impl;

import com.SuperNova.core.FileUtil;
import com.SuperNova.core.ProjectConstant;
import com.SuperNova.dao.*;
import com.SuperNova.model.*;
import com.SuperNova.service.ProjectService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
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
    private StudentGradeMapper studentGradeMapper;
    @Resource
    private FileMapper fileMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    public ArrayList<Map<String, Object>> getSelfAndMutualGradeByPid(int p_id) {
        StudentProject studentProject = new StudentProject();
        studentProject.setP_id(p_id);
        ArrayList<Map<String, Object>> ret = new ArrayList<>();
        List<StudentProject> studentProjects = studentProjectMapper.select(studentProject);
        for (StudentProject s : studentProjects) {
            Map<String, Object> tmp = new HashMap<>();
            User user = userMapper.selectByPrimaryKey(s.getU_id());
            tmp.put("s_id",s.getU_id());
            tmp.put("s_name",user.getU_name());
            tmp.put("selfScore",s.getSelf_grade());
            tmp.put("mutualScore",s.getMutual_grade());
            ret.add(tmp);
        }
        return ret;
    }

    @Override
    public int studentCoursePID(String u_id, int c_id) {
          Integer res = studentProjectMapper.studentCoursePID(c_id,u_id);
          return res==null?-1:res;
    }

    @Override
    public Object searchProject(int c_id) {
        Project tmp = new Project();
        tmp.setC_id(c_id);
        return JSON.toJSON(projectMapper.select(tmp));
    }

    @Override
    public void deletProject(int p_id) {
        //删除项目文件存储的文件夹
        FileUtil.deleteStorageDir(ProjectConstant.File_BASE+p_id);

        projectMapper.deleteByPrimaryKey(p_id);

        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        gradeSystemMapper.delete(tmp);
    }

    @Override
    public int addProject(Project project, List<GradeSystem> grades) {
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
    public void changeProject(Project project, List<GradeSystem> grades) {
        projectMapper.updateByPrimaryKey(project);
        for (GradeSystem grade:grades) {
            gradeSystemMapper.updateByPrimaryKey(grade);
        }
    }

    @Override
    public List<GradeSystem> searchGradeSystem(int p_id) {
        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        return gradeSystemMapper.select(tmp);
    }

    @Override
    public int searchTotalNum(int p_id) {
        StudentProject tmp = new StudentProject();
        tmp.setP_id(p_id);
        return studentProjectMapper.selectCount(tmp);
    }

    @Override
    public int countDone(int p_id) {
        return projectMapper.countDone(p_id);
    }

    @Override
    public Object searchGroupers(int p_id) {
        return JSON.toJSON(projectMapper.searchGroupers(p_id));
    }

    @Override
    public String searchLeader(int p_id) {
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
    public void joinProject(int p_id, String u_id) {
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
            t.setUrge(false);
            studentAssignmentMapper.insert(t);
        }
    }
}
