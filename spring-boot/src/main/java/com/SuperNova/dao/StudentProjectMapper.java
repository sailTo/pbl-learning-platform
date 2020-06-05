package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.StudentProject;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StudentProjectMapper extends Mapper<StudentProject> {

    /**
     * 学生是否参加该课程下的项目，是则返回该项目p_id，否则返回-1
     * @param c_id
     * @param u_id
     * @return
     */
    Integer studentCoursePID(@Param("c_id")int c_id, @Param("u_id")String u_id);
}