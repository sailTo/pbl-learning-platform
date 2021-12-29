package com.nacos.pbl;



import com.nacos.core.Service;
import com.nacos.entity.StudentGrade;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface StudentGradeService extends Service<StudentGrade> {
    /**
     * 获取教师评分(未评分则为null)
     * @param p_id
     * @param s_id
     * @return
     */
    List<StudentGrade> searchEvaluateByTeacher(int p_id, String s_id);

    /**
     * 获取学生总分(未评分则为null)
     * @param p_id
     * @param s_id
     * @return
     */
    String searchGrade(int p_id, String s_id);

    /**
     * 教师为学生评分
     * @param studentGrades
     */
    void evaluateByTeacher(List<StudentGrade> studentGrades);

    /**
     * 获取项目中所有人的评分细则的真实评分list，未评的item分数为null
     * @param pid
     */
    ArrayList<Map<String,Object>> searchEvaluateByPid(int pid);

    /**
     * 获取所有评分项，以p_id区分
     */
    Map<Integer, Object> getAllGradeItems();
}
