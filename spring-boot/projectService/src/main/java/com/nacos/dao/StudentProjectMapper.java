package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.StudentProject;
import feign.Param;

public interface StudentProjectMapper extends Mapper<StudentProject> {

    /**
     * 学生是否参加该课程下的项目，是则返回该项目p_id，否则返回-1
     * @param c_id
     * @param u_id
     * @return
     */
    Integer studentCoursePID(@Param("c_id") int c_id, @Param("u_id") String u_id);
}