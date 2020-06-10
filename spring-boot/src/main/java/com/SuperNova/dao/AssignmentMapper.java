package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.model.DoneInformation;

import javax.persistence.OrderBy;
import java.util.List;

public interface AssignmentMapper extends Mapper<Assignment> {

    /**
     * 创建一个项目
     * @param assignment
     */
    void addAssignment(Assignment assignment);

//    /**
//     * 修改任务状态
//     * @param assignment
//     */
//    void setAssignment(Assignment assignment);

//    /**
//     * 删除任务
//     * @param p_id
//     * @param a_id
//     */
//    void deleteAssignment(int p_id,int a_id);

//    /**
//     * 搜索项目中所有的任务(按a_id排序)
//     * @param p_id
//     * @return
//     */
//    List<Assignment> searchAssignment(int p_id);

//    /**
//     * 获得完成该任务的学生个数
//     * @param p_id
//     * @param a_id
//     * @return
//     */
//    int searchAssignmentDoneNum(int p_id,int a_id);

//    /**
//     * 获得项目中任务总数
//     * @param p_id
//     * @return
//     */
//    int countAssignment(int p_id);

    /**
     * 搜索项目中任务的完成情况(按s_id排序)
     * @param p_id
     * @return
     */
    List<DoneInformation> countAssignmentDone(int p_id);

    /**
     * 搜索每个任务的完成人数(按a_id排序)
     * @param p_id
     * @return
     */
    List<Integer> searchAllAssignmentsDoneNum(int p_id);

}