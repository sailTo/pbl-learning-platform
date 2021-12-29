package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.StudentAssignment;
import feign.Param;

import java.util.List;

public interface StudentAssignmentMapper extends Mapper<StudentAssignment> {

    /**
     * 搜索学生完成任务的状态(按a_id排序)
     * @param p_id
     * @param s_id
     * @return
     */
    List<Boolean> searchDoneStatus(@Param(value = "p_id") int p_id, @Param(value = "s_id") String s_id);

    /**
     * 搜索该生在每个项目中被urge的情况(按s_id排序)
     * @param p_id
     * @param s_id
     * @return
     */
    List<Boolean> searchAssignmentUrge(@Param(value = "p_id") int p_id, @Param(value = "s_id") String s_id);

    /**
     * 催促未完成的同学完成任务
     * @param p_id
     * @param a_id
     */
    void urgeAssignment(@Param("p_id") int p_id, @Param("a_id") int a_id);
}