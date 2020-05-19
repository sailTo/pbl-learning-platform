package com.SuperNova.service.impl;

import com.SuperNova.dao.CourseMapper;
import com.SuperNova.model.Course;
import com.SuperNova.service.CourseService;
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
public class CourseServiceImpl extends AbstractService<Course> implements CourseService {
    @Resource
    private CourseMapper courseMapper;

    @Override
    public String getMyCourses(String u_id) {
        List<Course> courses = courseMapper.getMyCourses(u_id);
        return JSON.toJSONString(courses);
    }

    @Override
    public void updateCourse(Course course) {
        courseMapper.setCourse(course);
    }

    @Override
    public int addCourse(Course course) {
        return courseMapper.addCourse(course);
    }

    @Override
    public void joinCourse(int c_id, String u_id) {
        courseMapper.joinCourse(c_id,u_id);
    }

    @Override
    public String searchOtherCourses(String u_id) {
        List<Course> courses = courseMapper.searchOtherCourses(u_id);
        return JSON.toJSONString(courses);
    }

    @Override
    public void changeCourseStatus(int c_id, String status) {
        courseMapper.changeCourseStatus(c_id,Integer.parseInt(status));
    }

    @Override
    public String searchAllCourses() {
        List<Course> courses = courseMapper.searchAllCourses();
        return JSON.toJSONString(courses);
    }
}
