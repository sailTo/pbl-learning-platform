package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Course;

import java.util.List;

public interface CourseMapper extends Mapper<Course> {
    /**
     * 获取个人的课程,支持老师和同学
     * @param u_id
     * @return
     */
    List<Course> getMyCourses(String u_id);

    /**
     * 添加课程
     * @param course
     * @return 返回课程id
     */
    void addCourse(Course course);

    /**
     * 获取自己的其它未选的课程/未教的课程(已发布)
     * @param u_id
     * @return
     */
    List<Course> searchOtherCourses(String u_id);

}