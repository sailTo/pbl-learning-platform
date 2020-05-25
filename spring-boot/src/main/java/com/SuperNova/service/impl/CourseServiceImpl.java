package com.SuperNova.service.impl;

import com.SuperNova.dao.CourseMapper;
import com.SuperNova.dao.StudentCourseMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.StudentCourse;
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
    @Resource
    private StudentCourseMapper studentCourseMapper;
    @Override
    public String getMyCourses(String u_id) {
        List<Course> courses = courseMapper.getMyCourses(u_id);
        return JSON.toJSONString(courses);
    }

    @Override
    public void updateCourse(Course course) {
        courseMapper.updateByPrimaryKeySelective(course);
    }

    @Override
    public int addCourse(Course course) {
        return courseMapper.insertSelective(course);
    }

    @Override
    public void joinCourse(int c_id, String u_id) {
        StudentCourse tmp = new StudentCourse();
        tmp.setc_id(c_id);
        tmp.sets_id(u_id);
        studentCourseMapper.insert(tmp);
    }

    @Override
    public String searchOtherCourses(String u_id) {

        List<Course> courses = courseMapper.searchOtherCourses(u_id);
        return JSON.toJSONString(courses);
    }

    @Override
    public void changeCourseStatus(int c_id, String status) {
        Course tmp = new Course();
        tmp.setcId(c_id);
        tmp.setStatus(Integer.parseInt(status));
        courseMapper.updateByPrimaryKeySelective(tmp);
    }

    @Override
    public String searchAllCourses() {
        List<Course> courses = courseMapper.selectAll();
        return JSON.toJSONString(courses);
    }
}
