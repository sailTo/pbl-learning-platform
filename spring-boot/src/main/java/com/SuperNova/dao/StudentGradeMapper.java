package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.StudentGrade;

import java.util.List;

public interface StudentGradeMapper extends Mapper<StudentGrade> {

    /**
     * 获取教师评分(未评分则为空)
     * @param p_id
     * @param s_id
     * @return
     */
    List<StudentGrade> searchEvaluateByTeacher(int p_id, int s_id);

    /**
     * 获取互评分
     * @param p_id
     * @param s_id
     * @return
     */
    String searchEvaluateByOther(int p_id, int s_id);

    /**
     * 老师对学生的每一项评分细则进行评分
     * @param studentGrades
     */
    void evaluateByTeacher(List<StudentGrade> studentGrades);
}