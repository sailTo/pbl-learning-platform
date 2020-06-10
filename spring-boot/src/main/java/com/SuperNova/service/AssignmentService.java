package com.SuperNova.service;
import com.SuperNova.model.Assignment;
import com.SuperNova.core.Service;
import com.SuperNova.model.DoneInformation;

import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface AssignmentService extends Service<Assignment> {

    /**
     * 创建一个项目
     * @param assignment
     */
    int createAssignment(Assignment assignment);

    /**
     * 创建多个项目
     * @param assignments
     * @return
     */
    List<Integer> createAssignments(List<Assignment> assignments);

    /**
     * 修改任务状态
     * @param assignment
     */
    void changeAssignment(Assignment assignment);

    /**
     * 一次修改多个任务
     * @param assignments
     */
    void changeAssignments(List<Assignment> assignments);

    /**
     * 删除任务
     * @param p_id
     * @param a_id
     */
    void deleteAssignment(int p_id,int a_id);

    /**
     * 一次删除多个任务
     * @param p_id
     * @param a_idList
     */
    void deleteAssignments(int p_id,List<Integer> a_idList);

    /**
     * 催促未完成的同学完成任务
     * @param p_id
     * @param a_id
     */
    void urgeAssignment(int p_id,int a_id);

    /**
     * 同学回应urge
     * @param p_id
     * @param a_id
     */
    void applyUrge(int p_id,int a_id,String s_id);

    /**
     * 搜索项目中所有的任务(按a_id排序)
     * @param p_id
     * @return
     */
    List<Assignment> searchAssignment(int p_id);

    /**
     * 获得该项目下任务总数
     * @param p_id
     * @return
     */
    int countAssignment(int p_id);

    /**
     * 搜索项目中任务的完成情况(按s_id排序)
     * @param p_id
     * @return
     */
    List<DoneInformation> countAssignmentDone(int p_id);

    /**
     * 搜索该生在每个项目中被urge的情况(按s_id排序)
     * @param p_id
     * @param s_id
     * @return
     */
    Object searchAssignmentUrge(int p_id, String s_id);

    /**
     * 搜索学生完成所有任务的状态(按a_id排序)
     * @param p_id
     * @param s_id
     * @return
     */
    Object searchDoneStatus(int p_id, String s_id);

    /**
     * 搜索学生完成该任务的状态
     * @param p_id
     * @param s_id
     * @return
     */
    boolean searchStudentDone(int p_id,String s_id,int a_id);

    /**
     * 修改学生完成该任务的状态
     * @param p_id
     * @param s_id
     * @return
     */
    void updateStudentDone(int p_id,String s_id,int a_id,boolean doneOrNot);

    /**
     * 获得完成该任务的学生个数
     * @param p_id
     * @param a_id
     * @return
     */
    int searchAssignmentDoneNum(int p_id,int a_id);

    /**
     * 搜索项目里所有任务完成的人数(以a_id排序)
     * @param p_id
     * @return
     */
    List<Integer> searchAllAssignmentsDoneNum(int p_id);

    /**
     * 搜索项目中指定学生的任务的完成情况
     * @param p_id
     * @param u_id
     * @return
     */
     int countAssignmentDoneByUidAndPid(int p_id, String u_id);
}
