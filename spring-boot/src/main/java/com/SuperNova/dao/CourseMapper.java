package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Course;

import java.util.List;

public interface CourseMapper extends Mapper<Course> {
    /**
     * 获取个人的课程
     * @param u_id
     * @return
     */
    List<Course> getMyCourses(String u_id);

//    /**
//     * 设置课程信息
//     * @param course
//     */
//    void setCourse(Course course);

//    /**
//     * 学生选课
//     * @param c_id
//     * @param u_id
//     */
//    void joinCourse(int c_id,String u_id);

//    /**
//     * 添加课程
//     * @param course
//     * @return 返回课程id
//     */
//    int addCourse(Course course);

    /**
     * 获取自己的其它未选的课程/未教的课程(已发布)
     * @param u_id
     * @return
     */
    List<Course> searchOtherCourses(String u_id);

//    /**
//     * 修改课程状态
//     * @param c_id
//     * @param status
//     */
//    void changeCourseStatus(int c_id,int status);

//    /**
//     * 获取所有课程(管理员用)
//     * @return
//     */
//    List<Course> searchAllCourses();
}