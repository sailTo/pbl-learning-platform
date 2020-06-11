package com.SuperNova.service.impl;

import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.*;
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
    private UserMapper userMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;

    @Override
    public int createAssignment(Assignment assignment) {
        assignmentMapper.addAssignment(assignment);
        StudentProject tmp = new StudentProject();
        tmp.setP_id(assignment.getP_id());
        List<StudentProject> sList = studentProjectMapper.select(tmp);

        for (StudentProject s:sList) {
            StudentAssignment studentAssignment = new StudentAssignment();
            studentAssignment.setA_id(assignment.getA_id());
            studentAssignment.setP_id(assignment.getP_id());
            studentAssignment.setU_id(s.getU_id());
            studentAssignment.setUrge(false);
            studentAssignment.setStatus(false);
            studentAssignmentMapper.insert(studentAssignment);
        }

        return assignment.getA_id();
    }

    @Override
    public List<Integer> createAssignments(List<Assignment> assignments) {
        List<Integer> res = new ArrayList<>();
        for (Assignment a: assignments) {
            res.add(createAssignment(a));
        }
        return res;
    }

    @Override
    public void changeAssignment(Assignment assignment) {
        assignmentMapper.updateByPrimaryKeySelective(assignment);
    }

    @Override
    public void changeAssignments(List<Assignment> assignments) {
        for (Assignment a:assignments) {
            changeAssignment(a);
        }
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
    public void deleteAssignments(int p_id, List<Integer> a_idList) {
        for (Integer i:a_idList) {
            deleteAssignment(p_id,i);
        }
    }

    @Override
    public void urgeAssignment(int p_id, int a_id) {
        studentAssignmentMapper.urgeAssignment(p_id,a_id);
    }

    @Override
    public void applyUrge(int p_id, int a_id,String s_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        tmp.setU_id(s_id);
        tmp.setUrge(false);
        studentAssignmentMapper.updateByPrimaryKey(tmp);
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
    public List<DoneInformation> countAssignmentDone(int p_id) {
        List<DoneInformation> ret = assignmentMapper.countAssignmentDone(p_id);
        StudentAssignment studentAssignment = new StudentAssignment();
        studentAssignment.setP_id(p_id);
        List<StudentAssignment> studentAssignments = studentAssignmentMapper.select(studentAssignment);
        for (StudentAssignment s : studentAssignments){
            boolean flag = true;
            for (DoneInformation d : ret){
                if (s.getU_id().equals(d.getS_id())) {
                    flag = false;
                    break;
                }
            }
            if (flag){
                User u = userMapper.selectByPrimaryKey(s.getU_id());
                DoneInformation tmp = new DoneInformation(u.getU_id(),u.getU_name(),0);
                ret.add(tmp);
            }
        }
        return ret;
    }

    @Override
    public Object searchDoneStatus(int p_id, String s_id) {
        return JSON.toJSON(studentAssignmentMapper.searchDoneStatus(p_id,s_id));
    }

    @Override
    public Object searchAssignmentUrge(int p_id, String s_id) {
        return JSON.toJSON(studentAssignmentMapper.searchAssignmentUrge(p_id,s_id));

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

    @Override
    public List<Integer> searchAllAssignmentsDoneNum(int p_id) {
        return assignmentMapper.searchAllAssignmentsDoneNum(p_id);
    }

    @Override
    public int countAssignmentDoneByUidAndPid(int p_id, String u_id) {
        StudentAssignment assignment = new StudentAssignment();
        assignment.setP_id(p_id);
        assignment.setU_id(u_id);
        assignment.setStatus(true);
        int ret = studentAssignmentMapper.selectCount(assignment);
        return ret;
    }

    @Override
    public void doneAssignment(int a_id, int p_id,String u_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(p_id);
        tmp.setA_id(a_id);
        tmp.setU_id(u_id);
        tmp.setStatus(true);
        studentAssignmentMapper.updateByPrimaryKey(tmp);
    }
}
