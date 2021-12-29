package com.nacos.service;


import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Service;
import com.nacos.entity.Course;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@FeignClient(name = "course-service",path = "/course")
public interface CourseService {

    /**
     * 获取个人的课程(分页)
     * @param u_id
     * @return
     */
    @RequestMapping("/getMyCourses")
    JSONObject getMyCourses(@RequestParam("u_id") String u_id,@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize);

    /**
     * 更新课程相关信息
     * @param course
     */
    @RequestMapping("/updateCourse")
    void updateCourse(@RequestParam("course") Course course);

    /**
     * 添加课程
     * @param course
     * @return 返回课程id
     */
    @RequestMapping("/addCourse")
    int addCourse(@RequestParam("course") Course course);

    /**
     * 学生选课
     * @param c_id
     * @param u_id
     */
    @RequestMapping("/joinCourse")
    void joinCourse(@RequestParam("c_id") int c_id,@RequestParam("u_id") String u_id);

    /**
     * 获取自己的其它未选的课程/未教的课程(已发布)+教师信息 (分页)
     * @param u_id
     * @return
     */
    @RequestMapping("/searchOtherCourses")
    JSONObject searchOtherCourses(@RequestParam("u_id") String u_id,@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize);

    /**
     * 修改课程状态(删除：-1,未发布：0,已发布：1)
     * @param c_id
     * @param status
     */
    @RequestMapping("/changeCourseStatus")
    void changeCourseStatus(@RequestParam("c_id") int c_id,@RequestParam("status") String status);

    /**
     * 获取所有课程(分页)
     * @return
     */
    @RequestMapping("/searchAllCourses")
    JSONObject searchAllCourses(@RequestParam("pageIndex") int pageIndex,@RequestParam("pageSize") int pageSize);

    /**
     *
     * @param u_id
     * @return
     */
    @RequestMapping("/searchAllMyCourses")
    Object searchAllMyCourses(@RequestParam("u_id") String u_id);

    /**
     * 判断该用户是否为该课程的主讲老师
     * @param u_id
     * @param c_id
     * @return
     */
    @RequestMapping("/isTeacher")
    boolean isTeacher(@RequestParam("u_id") String u_id,@RequestParam("c_id") int c_id);

    /**
     * 查询c_id对应的课程
     * @return
     */
    @RequestMapping("/searchCourseByCid")
    Course searchCourseByCid(@RequestParam("c_id") int c_id);

    @RequestMapping("/findAll")
    List<Course> findAll();
}
