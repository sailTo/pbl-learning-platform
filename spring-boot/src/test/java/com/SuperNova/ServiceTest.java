package com.SuperNova;

import com.SuperNova.model.Course;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.service.CourseService;
import com.SuperNova.service.ProjectService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class ServiceTest extends Tester {
    @Resource
    private CourseService courseService;
    @Resource
    private AssignmentService assignmentService;
    @Resource
    private ProjectService projectService;
    @Test
    public void test1(){
        Course course = courseService.findById(1);
        Assert.assertEquals(course.getC_name(),"Ad_web");
    }

    @Test
    public void test2(){
        String str = assignmentService.searchDoneStatus(1,"s001");
        System.out.println(str);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test3(){
        String str = projectService.searchGroupers(1);
        System.out.println(str);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }
}
