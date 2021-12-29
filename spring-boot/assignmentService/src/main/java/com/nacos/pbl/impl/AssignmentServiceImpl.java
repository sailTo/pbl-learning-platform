package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSON;
import com.nacos.core.AbstractService;
import com.nacos.dao.AssignmentMapper;
import com.nacos.dao.StudentAssignmentMapper;
import com.nacos.dao.StudentProjectMapper;
import com.nacos.dao.UserMapper;
import com.nacos.entity.*;
import com.nacos.pbl.AssignmentService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
@RestController
@RequestMapping("/assignment")
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
    @RequestMapping("/createAssignment")
    public int createAssignment(@RequestParam("assignment") Assignment assignment) {
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
    @RequestMapping("/createAssignments")
    public List<Integer> createAssignments(@RequestParam("assignments") List<Assignment> assignments) {
        List<Integer> res = new ArrayList<>();
        for (Assignment a: assignments) {
            res.add(createAssignment(a));
        }
        return res;
    }

    @Override
    @RequestMapping("/changeAssignment")
    public void changeAssignment(@RequestParam("assignment") Assignment assignment) {
        assignmentMapper.updateByPrimaryKeySelective(assignment);
    }

    @Override
    @RequestMapping("/changeAssignments")
    public void changeAssignments(@RequestParam("assignments") List<Assignment> assignments) {
        for (Assignment a:assignments) {
            changeAssignment(a);
        }
    }

    @Override
    @RequestMapping("/deleteAssignment")
    public void deleteAssignment(@RequestParam("p_id") String p_id,@RequestParam("a_id") String a_id) {
        Assignment tmp = new Assignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setA_id(Integer.parseInt(a_id));
        assignmentMapper.delete(tmp);

        StudentAssignment studentAssignment = new StudentAssignment();
        studentAssignment.setP_id(Integer.parseInt(p_id));
        studentAssignment.setA_id(Integer.parseInt(a_id));
        studentAssignmentMapper.delete(studentAssignment);
    }

    @Override
    @RequestMapping("/deleteAssignments")
    public void deleteAssignments(@RequestParam("p_id") String p_id,@RequestParam("a_idList") List<Integer> a_idList) {
        for (Integer i:a_idList) {
            deleteAssignment(p_id,i.toString());
        }
    }

    @Override
    @RequestMapping("/urgeAssignment")
    public void urgeAssignment(@RequestParam("p_id") String p_id,@RequestParam("a_id") String a_id) {
        studentAssignmentMapper.urgeAssignment(Integer.parseInt(p_id),Integer.parseInt(a_id));
    }

    @Override
    @RequestMapping("/applyUrge")
    public void applyUrge(@RequestParam("p_id") String p_id,@RequestParam("a_id") String a_id,@RequestParam("s_id") String s_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setA_id(Integer.parseInt(a_id));
        tmp.setU_id(s_id);
        tmp.setUrge(false);
        studentAssignmentMapper.updateByPrimaryKey(tmp);
    }

    @Override
    @RequestMapping("/countAssignment")
    public int countAssignment(@RequestParam("p_id") String p_id) {
        Assignment tmp = new Assignment();
        tmp.setP_id(Integer.parseInt(p_id));
        return assignmentMapper.select(tmp).size();
    }

    @Override
    @RequestMapping("/searchAssignment")
    public List<Assignment> searchAssignment(@RequestParam("p_id") String p_id) {
        int p_idInt = Integer.parseInt(p_id);
        Assignment tmp = new Assignment();
        tmp.setP_id(p_idInt);
        List<Assignment> assignmentList= assignmentMapper.select(tmp);

        return  assignmentList;
    }

    @Override
    @RequestMapping("/countAssignmentDone")
    public List<DoneInformation> countAssignmentDone(@RequestParam("p_id") String p_id) {
        List<DoneInformation> ret = assignmentMapper.countAssignmentDone(Integer.parseInt(p_id));
        StudentAssignment studentAssignment = new StudentAssignment();
        studentAssignment.setP_id(Integer.parseInt(p_id));
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
    @RequestMapping("/searchDoneStatus")
    public Object searchDoneStatus(@RequestParam("p_id") String p_id,@RequestParam("s_id") String s_id) {
        return JSON.toJSON(studentAssignmentMapper.searchDoneStatus(Integer.parseInt(p_id),s_id));
    }

    @Override
    @RequestMapping("/searchAssignmentUrge")
    public Object searchAssignmentUrge(@RequestParam("p_id") String p_id,@RequestParam("s_id") String s_id) {
        return JSON.toJSON(studentAssignmentMapper.searchAssignmentUrge(Integer.parseInt(p_id),s_id));

    }

    @Override
    @RequestMapping("/searchStudentDone")
    public boolean searchStudentDone(@RequestParam("p_id") String p_id,@RequestParam("s_id") String s_id,@RequestParam("a_id") String a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setU_id(s_id);
        tmp.setA_id(Integer.parseInt(a_id));
        studentAssignmentMapper.select(tmp);
        return tmp.getStatus();
    }

    @Override
    @RequestMapping("/updateStudentDone")
    public void updateStudentDone(@RequestParam("p_id") String p_id,@RequestParam("s_id") String s_id,@RequestParam("a_id") String a_id,@RequestParam("doneOrNot") boolean doneOrNot) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setU_id(s_id);
        tmp.setA_id(Integer.parseInt(a_id));
        tmp.setStatus(doneOrNot);
        studentAssignmentMapper.updateByPrimaryKeySelective(tmp);
    }

    @Override
    @RequestMapping("/searchAssignmentDoneNum")
    public int searchAssignmentDoneNum(@RequestParam("p_id") String p_id,@RequestParam("a_id") String a_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setA_id(Integer.parseInt(a_id));
        tmp.setStatus(true);
        return studentAssignmentMapper.selectCount(tmp);
    }

    @Override
    @RequestMapping("/searchAllAssignmentsDoneNum")
    public List<Integer> searchAllAssignmentsDoneNum(@RequestParam("p_id") String p_id) {
        return assignmentMapper.searchAllAssignmentsDoneNum(Integer.parseInt(p_id));
    }

    @Override
    @RequestMapping("/countAssignmentDoneByUidAndPid")
    public int countAssignmentDoneByUidAndPid(@RequestParam("p_id") String p_id,@RequestParam("u_id") String u_id) {
        StudentAssignment assignment = new StudentAssignment();
        assignment.setP_id(Integer.parseInt(p_id));
        assignment.setU_id(u_id);
        assignment.setStatus(true);
        int ret = studentAssignmentMapper.selectCount(assignment);
        return ret;
    }

    @Override
    @RequestMapping("/doneAssignment")
    public void doneAssignment(@RequestParam("a_id") String a_id,@RequestParam("p_id") String p_id,@RequestParam("u_id") String u_id) {
        StudentAssignment tmp = new StudentAssignment();
        tmp.setP_id(Integer.parseInt(p_id));
        tmp.setA_id(Integer.parseInt(a_id));
        tmp.setU_id(u_id);
        tmp.setStatus(true);
        tmp.setUrge(false);
        studentAssignmentMapper.updateByPrimaryKey(tmp);
    }
}
