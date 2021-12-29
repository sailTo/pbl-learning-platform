package com.nacos.pbl;


import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Service;
import com.nacos.entity.Course;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface CourseService extends Service<Course> {

    /**
     * 获取个人的课程(分页)
     * @param u_id
     * @return
     */
    JSONObject getMyCourses(String u_id, int pageIndex, int pageSize);

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
    void joinCourse(int c_id, String u_id);

    /**
     * 获取自己的其它未选的课程/未教的课程(已发布)+教师信息 (分页)
     * @param u_id
     * @return
     */
    JSONObject searchOtherCourses(String u_id, int pageIndex, int pageSize);

    /**
     * 修改课程状态(删除：-1,未发布：0,已发布：1)
     * @param c_id
     * @param status
     */
    void changeCourseStatus(int c_id, String status);

    /**
     * 获取所有课程(分页)
     * @return
     */
    JSONObject searchAllCourses(int pageIndex, int pageSize);

    /**
     *
     * @param u_id
     * @return
     */
    Object searchAllMyCourses(String u_id);

    /**
     * 判断该用户是否为该课程的主讲老师
     * @param u_id
     * @param c_id
     * @return
     */
    boolean isTeacher(String u_id, int c_id);

    /**
     * 查询c_id对应的课程
     * @return
     */
    Course searchCourseByCid(int c_id);
}
