package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.dao.StudentGradeMapper;
import com.SuperNova.model.Evaluation;
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
    public String searchEvaluateByTeacher(int p_id, String s_id) {
        StudentGrade tmp = new StudentGrade();
        tmp.setp_id(p_id);
        tmp.sets_id(s_id);
        List<StudentGrade> grades = studentGradeMapper.select(tmp);
        if(grades.size()==0){
            return null;
        }
        return JSON.toJSONString(grades);
    }

    @Override
    public String searchGrade(int p_id, String s_id) {
        StudentGrade studentGrade = new StudentGrade();
        studentGrade.setp_id(p_id);
        studentGrade.sets_id(s_id);
        List<StudentGrade> grades = studentGradeMapper.select(studentGrade);
        Project project = projectMapper.selectByPrimaryKey(p_id);

        if(project.getteacher_grade_ratio()>0&&grades.size()==0){
            return null;
        }

        Evaluation evaluation = new Evaluation();
        evaluation.setpassive_s_id(s_id);
        evaluation.setp_id(p_id);
        Project tmp = new Project();
        tmp.setp_id(p_id);

        //这里选出来评分人包括了自己,可能会有bug
        if(project.getmutual_grade_ratio() > 0 && evaluationMapper.selectCount(evaluation) < projectMapper.selectCount(tmp)-1){
            return null;
        }

        evaluation = new Evaluation();
        evaluation.setp_id(p_id);
        evaluation.setpassive_s_id(s_id);
        evaluation.setactive_s_id(s_id);

        double gradeBySelf = evaluationMapper.select(evaluation)==null ? -1 : evaluation.getGrade();

        if(project.getself_grade_ratio()>0 && gradeBySelf < 0){
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
