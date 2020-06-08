package com.SuperNova;

import com.SuperNova.core.ResultGenerator;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.StudentAssignment;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.service.CourseService;
import com.SuperNova.service.ProjectService;
import com.SuperNova.service.StudentGradeService;
import com.alibaba.fastjson.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ServiceTest extends Tester {
    @Resource
    private CourseService courseService;
    @Resource
    private AssignmentService assignmentService;
    @Resource
    private ProjectService projectService;
    @Resource
    private FileMapper fileMapper;
    @Resource
    private StudentGradeService studentGradeService;

    @Test
    public void test1(){
        Course course = courseService.findById(1);
        Assert.assertEquals(course.getC_name(),"Ad_web");
    }
    @Test
    @Rollback(false)
    public void test3(){
        Object res = assignmentService.searchDoneStatus(1,"S001");
//        Assert.assertEquals("Ad_web",course.getc_name());
        System.out.println(res);
    }

    @Test
    public void test2(){
        Object str = assignmentService.searchDoneStatus(1,"S001");
//        String str = assignmentService.searchAssignmentUrge(1,"S001");
        System.out.println(str);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test5(){
        int res = projectService.studentCoursePID("S001",1);
        Assert.assertEquals(1,res);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test4(){
//        String str = projectService.searchGroupers(1);
        System.out.println("pid=1: "+fileMapper.searchMaxId(1));
        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test6(){
//        String str = projectService.searchGroupers(1);

        System.out.println(ResultGenerator.genSuccessResult(courseService.getMyCourses("S001",1,8)));
//        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test7(){
//        String str = projectService.searchGroupers(1);
        JSONObject data = new JSONObject();
        data.put("groupers",projectService.searchGroupers(2));
        data.put("leader",projectService.searchLeader(2));
        System.out.println(ResultGenerator.genSuccessResult(data));
//        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test8(){
        ArrayList<Map<String,Object>> ret = studentGradeService.searchEvaluateByPid(1);
        Assert.assertEquals(2,ret.size());
    }
}
