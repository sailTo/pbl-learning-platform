package com.SuperNova.service.impl;

import com.SuperNova.core.ProjectConstant;
import com.SuperNova.dao.CourseMapper;
import com.SuperNova.dao.StudentCourseMapper;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.StudentCourse;
import com.SuperNova.model.User;
import com.SuperNova.service.CourseService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
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
    @Resource
    private UserMapper userMapper;


    private JSONObject splitPage(List<Course> courses, int pageIndex, int pageSize){
        List<User> teachers = new ArrayList<User>();


        for (Course c:courses) {
            User user = userMapper.selectByPrimaryKey(c.getT_id());
            teachers.add(user);
        }

        PageHelper.startPage(pageIndex, pageSize);
        JSONObject data = new JSONObject();
        PageInfo coursePageInfo = new PageInfo(courses);
        PageInfo teachersPageInfo = new PageInfo(teachers);
        data.put("courses",coursePageInfo);
//        System.out.println(teachers.get(0).getImage());
        data.put("teachers",teachersPageInfo);
        data.put("total",teachers.size());
        return data;
    }

    @Override
    public JSONObject getMyCourses(String u_id, int pageIndex, int pageSize) {
        List<Course> courses = courseMapper.getMyCourses(u_id);
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    public void updateCourse(Course course) {
        courseMapper.updateByPrimaryKeySelective(course);
    }

    @Override
    public int addCourse(Course course) {
        courseMapper.addCourse(course);
        return course.getC_id();
    }

    @Override
    public void joinCourse(int c_id, String u_id) {
        StudentCourse tmp = new StudentCourse();
        tmp.setC_id(c_id);
        tmp.setU_id(u_id);
        studentCourseMapper.insert(tmp);
    }

    @Override
    public JSONObject searchOtherCourses(String u_id, int pageIndex, int pageSize) {
        List<Course> courses = courseMapper.searchOtherCourses(u_id);
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    public void changeCourseStatus(int c_id, String status) {
        Course tmp = new Course();
        tmp.setC_id(c_id);
        tmp.setStatus(Integer.parseInt(status));
        courseMapper.updateByPrimaryKeySelective(tmp);
    }

    @Override
    public JSONObject searchAllCourses(int pageIndex, int pageSize) {
        List<Course> courses = courseMapper.selectAll();
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    public boolean isTeacher(String u_id, int c_id) {
        Course course = courseMapper.selectByPrimaryKey(c_id);
        return u_id.equals(course.getT_id());
    }

    @Override
    public Object searchAllMyCourses(String u_id) {
        User user = userMapper.selectByPrimaryKey(u_id);
        List<Course> courses;
        JSONObject data = new JSONObject();

        if(user.getType().equals("admin")){
            courses = courseMapper.selectAll();
            data.put("type","A");
        }else{
            courses = courseMapper.getMyCourses(u_id);
            data.put("type",user.getType().equals("teacher")? "T":"S");
        }
        data.put("courses",courses);

        return JSONObject.toJSON(data);
    }

    @Override
    public Course searchCourseByCid(int c_id) {
        Course course = new Course();
        course.setC_id(c_id);

        return courseMapper.selectOne(course);
    }
}
