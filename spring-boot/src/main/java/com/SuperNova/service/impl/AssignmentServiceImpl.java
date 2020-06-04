package com.SuperNova.service.impl;

import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.model.StudentAssignment;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
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

    @Override
    public int createAssignment(Assignment assignment) {
        assignmentMapper.addAssignment(assignment);
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
    }

    @Override
    public void urgeAssignment(int p_id, int a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        tmp.setUrge(true);
        studentAssignmentMapper.updateByPrimaryKeySelective(tmp);
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
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setU_id(s_id);
        tmp.setStatus(true);//表示已完成
        return JSON.toJSONString(studentAssignmentMapper.select(tmp));
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
