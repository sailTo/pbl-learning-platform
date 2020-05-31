package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.StudentProject;

public interface StudentProjectMapper extends Mapper<StudentProject> {

    /**
     * 学生是否参加该课程下的项目，是则返回该项目p_id，否则返回-1
     * @param s_id
     * @param c_id
     * @return
     */
    int studentCoursePID(String s_id,int c_id);
}