package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.nacos.core.AbstractService;
import com.nacos.dao.CourseMapper;
import com.nacos.dao.StudentCourseMapper;
import com.nacos.dao.UserMapper;
import com.nacos.entity.Course;
import com.nacos.entity.StudentCourse;
import com.nacos.entity.User;
import com.nacos.pbl.CourseService;
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
@RequestMapping("/course")
public class CourseServiceImpl extends AbstractService<Course> implements CourseService {
    @Resource
    private CourseMapper courseMapper;
    @Resource
    private StudentCourseMapper studentCourseMapper;
    @Resource
    private UserMapper userMapper;

    @RequestMapping("/splitPage")
    private JSONObject splitPage(@RequestParam("courses") List<Course> courses,@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize){
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
    @RequestMapping("/getMyCourses")
    public JSONObject getMyCourses(@RequestParam("u_id") String u_id,@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize) {
        List<Course> courses = courseMapper.getMyCourses(u_id);
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    @RequestMapping("/updateCourse")
    public void updateCourse(@RequestParam("course") Course course) {
        courseMapper.updateByPrimaryKeySelective(course);
    }

    @Override
    @RequestMapping("/addCourse")
    public int addCourse(@RequestParam("course") Course course) {
        courseMapper.addCourse(course);
        return course.getC_id();
    }

    @Override
    @RequestMapping("/joinCourse")
    public void joinCourse(@RequestParam("c_id") int c_id,@RequestParam("u_id") String u_id) {
        StudentCourse tmp = new StudentCourse();
        tmp.setC_id(c_id);
        tmp.setU_id(u_id);
        studentCourseMapper.insert(tmp);
    }

    @Override
    @RequestMapping("/searchOtherCourses")
    public JSONObject searchOtherCourses(@RequestParam("u_id") String u_id,@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize) {
        List<Course> courses = courseMapper.searchOtherCourses(u_id);
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    @RequestMapping("/changeCourseStatus")
    public void changeCourseStatus(@RequestParam("c_id") int c_id,@RequestParam("status") String status) {
        Course tmp = new Course();
        tmp.setC_id(c_id);
        tmp.setStatus(Integer.parseInt(status));
        courseMapper.updateByPrimaryKeySelective(tmp);
    }

    @Override
    @RequestMapping("/searchAllCourses")
    public JSONObject searchAllCourses(@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize) {
        List<Course> courses = courseMapper.selectAll();
        return splitPage(courses,pageIndex,pageSize);
    }

    @Override
    @RequestMapping("/isTeacher")
    public boolean isTeacher(@RequestParam("u_id") String u_id,@RequestParam("c_id") int c_id) {
        Course course = courseMapper.selectByPrimaryKey(c_id);
        return u_id.equals(course.getT_id());
    }

    @Override
    @RequestMapping("/searchAllMyCourses")
    public Object searchAllMyCourses(@RequestParam("u_id") String u_id) {
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
    @RequestMapping("/searchCourseByCid")
    public Course searchCourseByCid(@RequestParam("c_id") int c_id) {
        Course course = new Course();
        course.setC_id(c_id);

        return courseMapper.selectOne(course);
    }
}
