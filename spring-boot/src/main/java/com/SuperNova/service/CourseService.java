package com.SuperNova.service;
import com.SuperNova.model.Course;
import com.SuperNova.core.Service;

import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
public interface CourseService extends Service<Course> {

    /**
     * 获取个人的课程
     * @param u_id
     * @return
     */
    String getMyCourses(String u_id);

    /**
     * 更新课程相关信息
     * @param course
     */
    void updateCourse(Course course);

    /**
     * 添加课程
     * @param course
     * @return 返回课程id
     */
    int addCourse(Course course);

    /**
     * 学生选课
     * @param c_id
     * @param u_id
     */
    void joinCourse(int c_id,String u_id);

    /**
     * 获取自己的其它未选的课程/未教的课程(已发布)+教师信息
     * @param u_id
     * @return
     */
    String searchOtherCourses(String u_id);

    /**
     * 修改课程状态
     * @param c_id
     * @param status
     */
    void changeCourseStatus(int c_id,String status);

    /**
     * 获取所有课程
     * @return
     */
    String searchAllCourses();
}
