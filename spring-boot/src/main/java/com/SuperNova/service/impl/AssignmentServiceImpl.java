package com.SuperNova.service.impl;

import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


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
        return assignmentMapper.addAssignment(assignment);
    }

    @Override
    public void changeAssignment(Assignment assignment) {
        assignmentMapper.setAssignment(assignment);
    }

    @Override
    public void deleteAssignment(int p_id, int a_id) {
        assignmentMapper.deleteAssignment(p_id,a_id);
    }

    @Override
    public void urgeAssignment(int p_id, int a_id) {
        studentAssignmentMapper.urgeAssignment(p_id,a_id);
    }

    @Override
    public String searchAssignment(int p_id) {
        return JSON.toJSONString(assignmentMapper.searchAssignment(p_id));
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
    public boolean searchStudentDone(int p_id, String s_id, int a_id) {
        return studentAssignmentMapper.searchStudentDone(p_id,s_id,a_id);
    }

    @Override
    public void updateStudentDone(int p_id, String s_id, int a_id, boolean doneOrNot) {
        studentAssignmentMapper.updateStudentDone(p_id,s_id,a_id,doneOrNot);
    }

    @Override
    public int searchAssignmentDoneNum(int p_id, int a_id) {
        return assignmentMapper.searchAssignmentDoneNum(p_id,a_id);
    }
}
