package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.Project;
import com.SuperNova.model.User;

import java.util.List;

public interface ProjectMapper extends Mapper<Project> {

    /**
     * 新建项目
     * @param project
     * @return 新建项目的p_id
     */
    void addProject(Project project);

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