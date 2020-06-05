package com.SuperNova.service.impl;

import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.model.StudentAssignment;
import com.SuperNova.model.StudentGrade;
import com.SuperNova.model.StudentProject;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class AssignmentServiceImpl extends AbstractService<Assignment> implements AssignmentService {
    @Resource
    private AssignmentMapper assignmentMapper;

    @Resource
    private StudentAssignmentMapper studentAssignmentMapper;

    @Resource
    private StudentProjectMapper studentProjectMapper;

    @Override
    public int createAssignment(Assignment assignment) {
        assignmentMapper.addAssignment(assignment);
        StudentProject tmp = new StudentProject();
        tmp.setP_id(assignment.getP_id());
        List<StudentProject> sList = studentProjectMapper.select(tmp);
        List<StudentAssignment> stuAssigmentList = new ArrayList<>();

        for (StudentProject s:sList) {
            StudentAssignment studentAssignment = new StudentAssignment();
            studentAssignment.setA_id(assignment.getA_id());
            studentAssignment.setP_id(assignment.getP_id());
            studentAssignment.setU_id(s.getU_id());
            studentAssignment.setStatus(false);
            studentAssignment.setUrge(false);
            stuAssigmentList.add(studentAssignment);
        }
        studentAssignmentMapper.insertList(stuAssigmentList);

        return assignment.getA_id();
    }

    @Override
    public void changeAssignment(Assignment assignment) {
        assignmentMapper.updateByPrimaryKeySelective(assignment);
    }

    @Override
    public void deleteAssignment(int p_id, int a_id) {
        Assignment tmp = new Assignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        assignmentMapper.delete(tmp);

        StudentAssignment studentAssignment = new StudentAssignment();
        studentAssignment.setP_id(p_id);
        studentAssignment.setA_id(a_id);
        studentAssignmentMapper.delete(studentAssignment);
    }

    @Override
    public void urgeAssignment(int p_id, int a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        tmp.setUrge(true);
        Condition condition = new Condition(StudentAssignment.class);
        condition.createCriteria().andEqualTo("status",0);
        studentAssignmentMapper.updateByConditionSelective(tmp,condition);
    }

    @Override
    public int countAssignment(int p_id) {
        Assignment tmp = new Assignment();
        tmp.setP_id(p_id);
        return assignmentMapper.select(tmp).size();
    }

    @Override
    public List<Assignment> searchAssignment(int p_id) {
        Assignment tmp = new Assignment();
        tmp.setP_id(p_id);
        return assignmentMapper.select(tmp);
    }

    @Override
    public String countAssignmentDone(int p_id) {
        return JSON.toJSONString(assignmentMapper.countAssignmentDone(p_id));
    }

    @Override
    public String searchDoneStatus(int p_id, String s_id) {
        return JSON.toJSONString(studentAssignmentMapper.searchDoneStatus(p_id,s_id));
    }

    @Override
    public String searchAssignmentUrge(int p_id, String s_id) {
        return JSON.toJSONString(studentAssignmentMapper.searchAssignmentUrge(p_id,s_id));

    }

    @Override
    public boolean searchStudentDone(int p_id, String s_id, int a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setU_id(s_id);
        tmp.setA_id(a_id);
        studentAssignmentMapper.select(tmp);
        return tmp.getStatus();
    }

    @Override
    public void updateStudentDone(int p_id, String s_id, int a_id, boolean doneOrNot) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setU_id(s_id);
        tmp.setA_id(a_id);
        tmp.setStatus(doneOrNot);
        studentAssignmentMapper.updateByPrimaryKeySelective(tmp);
    }

    @Override
    public int searchAssignmentDoneNum(int p_id, int a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        tmp.setStatus(true);
        return studentAssignmentMapper.selectCount(tmp);
    }
}
