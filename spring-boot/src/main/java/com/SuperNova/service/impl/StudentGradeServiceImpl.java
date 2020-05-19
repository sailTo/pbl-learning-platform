package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.dao.StudentGradeMapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.Project;
import com.SuperNova.model.StudentGrade;
import com.SuperNova.service.StudentGradeService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class StudentGradeServiceImpl extends AbstractService<StudentGrade> implements StudentGradeService {
    @Resource
    private StudentGradeMapper studentGradeMapper;
    @Resource
    private EvaluationMapper evaluationMapper;
    @Resource
    private ProjectMapper projectMapper;

    @Override
    public String searchEvaluateByTeacher(int p_id, int s_id) {
        List<StudentGrade> grades = studentGradeMapper.searchEvaluateByTeacher(p_id,s_id);
        if(grades.size()==0){
            return null;
        }
        return JSON.toJSONString(grades);
    }

    @Override
    public String searchGrade(int p_id, int s_id) {
        List<StudentGrade> grades = studentGradeMapper.searchEvaluateByTeacher(p_id,s_id);
        Project project = projectMapper.searchProjectById(p_id);

        if(project.getteacher_grade_ratio()>0&&grades.size()==0){
            return null;
        }

        if(project.getmutual_grade_ratio()>0&&evaluationMapper.haveEvaluatedNum(p_id,s_id)<projectMapper.searchTotalNum(p_id)-1){
            return null;
        }

        double gradeBySelf = evaluationMapper.searchEvaluateBySelf(p_id, s_id);

        if(project.getself_grade_ratio()>0&&gradeBySelf<0){
            return null;
        }

        double gradeByOther = evaluationMapper.searchEvaluateByOther(p_id,s_id);
        double gradeByTeacher = 0;

        for (StudentGrade grade:grades) {
            gradeByTeacher += grade.getGrade();
        }

        double totalGrade = gradeByTeacher*project.getteacher_grade_ratio()+gradeByOther*project.getmutual_grade_ratio()+gradeBySelf*project.getself_grade_ratio();

        return ""+totalGrade;
    }
}
