package com.nacos.service;



import com.nacos.core.Service;
import com.nacos.entity.StudentGrade;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Chongli on 2020/05/14.
 */
@FeignClient(name = "studentGrade-service" ,path = "/studentGrade")
public interface StudentGradeService  {
    /**
     * 获取教师评分(未评分则为null)
     * @param p_id
     * @param s_id
     * @return
     */
    @RequestMapping("/searchEvaluateByTeacher")
    List<StudentGrade> searchEvaluateByTeacher(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id);

    /**
     * 获取学生总分(未评分则为null)
     * @param p_id
     * @param s_id
     * @return
     */
    @RequestMapping("/searchGrade")
    String searchGrade(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id);

    /**
     * 教师为学生评分
     * @param studentGrades
     */
    @RequestMapping("/evaluateByTeacher")
    void evaluateByTeacher(@RequestParam("/studentGrades") List<StudentGrade> studentGrades);

    /**
     * 获取项目中所有人的评分细则的真实评分list，未评的item分数为null
     * @param pid
     */
    @RequestMapping("/searchEvaluateByPid")
    ArrayList<Map<String,Object>> searchEvaluateByPid(@RequestParam("pid") int pid);

    /**
     * 获取所有评分项，以p_id区分
     */
    @RequestMapping("/getAllGradeItems")
    Map<Integer, Object> getAllGradeItems();

    @RequestMapping("/update")
     void update(StudentGrade studentGradeObj);
}
