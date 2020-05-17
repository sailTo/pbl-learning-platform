package com.SuperNova;

import com.SuperNova.model.Course;
import com.SuperNova.service.CourseService;
import com.SuperNova.service.UserService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class UserTest {
    @Resource
    private CourseService courseService;
    @Test
    public void test1(){
        Course course = courseService.findById(1);
        Assert.assertEquals(course.getc_name(),"Ad_web");
    }
}
