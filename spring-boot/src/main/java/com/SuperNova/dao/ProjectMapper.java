package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.Project;
import com.SuperNova.model.User;

import java.util.List;

public interface ProjectMapper extends Mapper<Project> {

    /**
     * 获取课程的所有项目
     * @param c_id
     * @return
     */
    List<Project> searchProject(int c_id);

    /**
     * 新建项目
     * @param c_id
     * @param project
     * @param grades
     * @return
     */
    int addProject(int c_id, Project project, List<GradeSystem> grades);

    /**
     * 删除指定项目
     * @param p_id
     */
    void deletProject(int p_id);

    /**
     * 获取项目评分细则
     * @param p_id
     * @return
     */
    List<GradeSystem> searchGradeSystem(int p_id);

    /**
     * 获得选择该项目的用户数
     * @param p_id
     * @return
     */
    int searchTotalNum(int p_id);

    /**
     * 获得项目完成人数(所有assignment完成的人)
     * @param p_id
     * @return
     */
    int countDone(int p_id);

    /**
     * 获得项目中成员列表
     * 需要u_id，u_name
     * @param p_id
     * @return
     */
    List<User> searchGroupers(int p_id);


}