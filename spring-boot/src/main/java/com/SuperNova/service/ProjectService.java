package com.SuperNova.service;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.Project;
import com.SuperNova.core.Service;

import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface ProjectService extends Service<Project> {

    /**
     * 学生是否参加该课程下的项目，是则返回该项目p_id，否则返回-1
     * @param s_id
     * @param c_id
     * @return
     */
    int studentCoursePID(String s_id,int c_id);

    /**
     * 获取课程的所有项目
     * @param c_id
     * @return
     */
    String searchProject(int c_id);

    /**
     * 删除指定项目
     * @param p_id
     */
    void deletProject(int p_id);

    /**
     * 新建项目
     * @param project
     * @param grades
     * @return
     */
    int addProject(Project project, List<GradeSystem> grades);

    /**
     * 修改项目
     * @param project
     * @param grades
     */
    void changeProject(Project project, List<GradeSystem> grades);

    /**
     * 获取项目评分细则
     * @param p_id
     * @return
     */
    String searchGradeSystem(int p_id);

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
     * @param p_id
     * @return
     */
    String searchGroupers(int p_id);

}
