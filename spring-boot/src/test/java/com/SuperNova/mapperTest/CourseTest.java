package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.dao.CourseMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.model.Course;
import com.SuperNova.model.DoneInformation;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class CourseTest extends Tester {
    @Resource
    private CourseMapper courseMapper;
    @Test
//    @Rollback(false)
    public void test1(){
        List<Course> result = courseMapper.getMyCourses("s001");
        Assert.assertEquals(2,result.size());
    }

    @Test
    public void test2(){
        List<Course> result = courseMapper.searchOtherCourses("S002");
//        Assert.assertEquals(0,result.size());
    }
}
