package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.model.DoneInformation;
import com.SuperNova.model.StudentAssignment;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class AssignmentTest extends Tester {
    @Resource
    private AssignmentMapper assignmentMapper;
    @Resource
    private StudentAssignmentMapper studentAssignmentMapper;
    @Test
//    @Rollback(false)
    public void test1(){
        Assignment assignment = new Assignment();
        assignment.setP_id(2);
        assignment.setA_description("asd");
        assignment.setA_name("test");
        assignment.setImportance(5);
//        assignment.seta_end_date(n);
        assignmentMapper.addAssignment(assignment);
        int result = assignment.getA_id();
//        Assert.assertEquals(11,result);
    }

    @Test
    public void test2(){
        List<DoneInformation> result = assignmentMapper.countAssignmentDone(1);
        Assert.assertEquals(1,result.size());
    }

    @Test
    public void test3(){
        List<Boolean> result = studentAssignmentMapper.searchAssignmentUrge(1,"S001");
        Assert.assertEquals(2,result.size());
    }

    @Test
    public void test4(){
        List<Integer> result = assignmentMapper.searchAllAssignmentsDoneNum(1);
        System.out.println(result);
        Assert.assertEquals(2,result.size());
    }
}
