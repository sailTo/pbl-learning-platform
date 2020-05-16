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
    List<Course> getMyCourses(String u_id);

    /**
     * 获取自己的其它未选的课程/未教的课程
     * @param u_id
     * @return
     */
    List<Course> searchOtherCourses(String u_id);


}
