package com.SuperNova.service.impl;

import com.SuperNova.dao.*;
import com.SuperNova.model.*;
import com.SuperNova.service.ProjectService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


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
//    @Resource
//    private

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
        projectMapper.deleteByPrimaryKey(p_id);

        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        gradeSystemMapper.delete(tmp);
    }

    @Override
    public int addProject(Project project, List<GradeSystem> grades) {
        projectMapper.addProject(project);
        int p_id = project.getP_id();
        int item_id = gradeSystemMapper.getMaxItemId(p_id);
        for (GradeSystem grade:grades) {
            grade.setP_id(p_id);
            //这里需要修改成设置item_id，因为它不是自增的
            grade.setItem_id(++item_id);
        }
        gradeSystemMapper.insertList(grades);
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
        Project tmp = new Project();
        tmp.setP_id(p_id);
        return projectMapper.selectCount(tmp);
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
        }
        tmp.setU_id(u_id);
        //插入学生选项目
        studentProjectMapper.insert(tmp);

        //插入学生任务
        Assignment assignment = new Assignment();
        assignment.setP_id(p_id);
        List<Assignment> aList = assignmentMapper.select(assignment);
        List<StudentAssignment> addList = new ArrayList<>();
        for (Assignment a:aList) {
            StudentAssignment t = new StudentAssignment();
            t.setA_id(a.getA_id());
            t.setP_id(a.getP_id());
            t.setU_id(u_id);
            t.setStatus(false);
            addList.add(t);
        }
        studentAssignmentMapper.insertList(addList);
    }
}
