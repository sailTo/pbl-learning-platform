package com.nacos.pbl;


import com.nacos.core.Service;
import com.nacos.entity.GradeSystem;
import com.nacos.entity.Project;
import com.nacos.entity.StudentProject;
import com.nacos.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


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
    int studentCoursePID(String s_id, String c_id);

    /**
     * 获取课程的所有项目
     * @param c_id
     * @return
     */
    List<Project> searchProject(String c_id);

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
     * 将项目的评分状态修改成true
     * @param p_id
     */
    void updateProjectGradeStatus(int p_id);

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
     * @param p_id
     * @return
     */
    List<User> searchGroupers(int p_id);

    /**
     * 获取项目的组长s_id，如果该项目还没有组员则返回null
     * @param p_id
     * @return
     */
    String searchLeader(int p_id);

    /**
     * 学生加入项目
     * @param p_id
     * @param u_id
     */
    void joinProject(int p_id, String u_id);

    /**
     * 通过pid获取项目中所有成员的自评互评得分，没有评的设为null
     * @param p_id
     * @return
     */
    ArrayList<Map<String,Object>> getSelfAndMutualGradeByPid(int p_id);

    /**
     * 更新student_project中的教师评分
     * @param studentProject
     */
    void updateTeacherGrade(StudentProject studentProject);

    /**
     * 获得项目是否评分完毕
     * !现在仅考虑了全存在的情况!
     * @param p_id
     * @return
     */
    boolean evaluationDone(int p_id);
}
