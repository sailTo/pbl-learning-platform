package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.StudentAssignment;

import java.util.List;

public interface StudentAssignmentMapper extends Mapper<StudentAssignment> {

    /**
     * 搜索学生完成项目的状态(按a_id排序)
     * @param p_id
     * @param s_id
     * @return
     */
    List<Boolean> searchDoneStatus(int p_id, String s_id);

    /**
     * 催促未完成的同学完成任务
     * @param p_id
     * @param a_id
     */
    void urgeAssignment(int p_id,int a_id);
}