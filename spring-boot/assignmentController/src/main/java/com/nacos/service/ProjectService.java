package com.nacos.service;


import com.nacos.core.Service;
import com.nacos.entity.GradeSystem;
import com.nacos.entity.Project;
import com.nacos.entity.StudentProject;
import com.nacos.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Chongli on 2020/05/14.
 */
@FeignClient(name = "project-service" ,path = "/project")
public interface ProjectService {

    /**
     * 学生是否参加该课程下的项目，是则返回该项目p_id，否则返回-1
     * @param s_id
     * @param c_id
     * @return
     */
    @RequestMapping("/studentCoursePID")
    int studentCoursePID(@RequestParam("s_id") String s_id,@RequestParam("c_id") int c_id);

    /**
     * 获取课程的所有项目
     * @param c_id
     * @return
     */
    @RequestMapping("/searchProject")
    List<Project> searchProject(@RequestParam("c_id") int c_id);

    /**
     * 删除指定项目
     * @param p_id
     */
    @RequestMapping("/deletProject")
    void deletProject(@RequestParam("p_id") int p_id);

    /**
     * 新建项目
     * @param project
     * @param grades
     * @return
     */
    @RequestMapping("/addProject")
    int addProject(@RequestParam("project") Project project,@RequestParam("grades") List<GradeSystem> grades);

    /**
     * 修改项目
     * @param project
     * @param grades
     */
    @RequestMapping("/changeProject")
    void changeProject(@RequestParam("project") Project project,@RequestParam("grades") List<GradeSystem> grades);

    /**
     * 将项目的评分状态修改成true
     * @param p_id
     */
    @RequestMapping("/updateProjectGradeStatus")
    void updateProjectGradeStatus(@RequestParam("p_id") int p_id);

    /**
     * 获取项目评分细则
     * @param p_id
     * @return
     */
    @RequestMapping("/searchGradeSystem")
    List<GradeSystem> searchGradeSystem(@RequestParam("p_id") int p_id);

    /**
     * 获得选择该项目的用户数
     * @param p_id
     * @return
     */
    @RequestMapping("/searchTotalNum")
    int searchTotalNum(@RequestParam("p_id") String p_id);

    /**
     * 获得项目完成人数(所有assignment完成的人)
     * @param p_id
     * @return
     */
    @RequestMapping("/countDone")
    int countDone(@RequestParam("p_id") int p_id);

    /**
     * 获得项目中成员列表
     * @param p_id
     * @return
     */
    @RequestMapping("/searchGroupers")
    List<User> searchGroupers(@RequestParam("p_id") int p_id);

    /**
     * 获取项目的组长s_id，如果该项目还没有组员则返回null
     * @param p_id
     * @return
     */
    @RequestMapping("/searchLeader")
    String searchLeader(@RequestParam("p_id") int p_id);

    /**
     * 学生加入项目
     * @param p_id
     * @param u_id
     */
    @RequestMapping("/joinProject")
    void joinProject(@RequestParam("p_id") int p_id,@RequestParam("u_id") String u_id);

    /**
     * 通过pid获取项目中所有成员的自评互评得分，没有评的设为null
     * @param p_id
     * @return
     */
    @RequestMapping("/getSelfAndMutualGradeByPid")
    ArrayList<Map<String,Object>> getSelfAndMutualGradeByPid(@RequestParam("p_id") int p_id);

    /**
     * 更新student_project中的教师评分
     * @param studentProject
     */
    @RequestMapping("/updateTeacherGrade")
    void updateTeacherGrade(@RequestParam("studentProject") StudentProject studentProject);

    /**
     * 获得项目是否评分完毕
     * !现在仅考虑了全存在的情况!
     * @param p_id
     * @return
     */
    @RequestMapping("/evaluationDone")
    boolean evaluationDone(@RequestParam("p_id") int p_id);
}
