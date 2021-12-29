package com.nacos.pbl.impl;


import com.nacos.core.AbstractService;
import com.nacos.dao.*;
import com.nacos.entity.*;
import com.nacos.pbl.StudentGradeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@RestController
@Transactional
@RequestMapping("/studentGrade")
public class StudentGradeServiceImpl extends AbstractService<StudentGrade> implements StudentGradeService {
    @Resource
    private StudentGradeMapper studentGradeMapper;
    @Resource
    private EvaluationMapper evaluationMapper;
    @Resource
    private ProjectMapper projectMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private GradeSystemMapper gradeSystemMapper;

    @Override
    @RequestMapping("/searchEvaluateByPid")
    public ArrayList<Map<String,Object>> searchEvaluateByPid(@RequestParam("pid") int pid) {
        StudentProject studentProject = new StudentProject();
        studentProject.setP_id(pid);
        List<StudentProject> studentProjects = studentProjectMapper.select(studentProject);

        GradeSystem gradeSystem = new GradeSystem();
        gradeSystem.setP_id(pid);
        List<GradeSystem> gradeSystems = gradeSystemMapper.select(gradeSystem);
        ArrayList<Map<String,Object>> ret = new ArrayList<>();
        for (StudentProject s : studentProjects) {
            Map<String,Object> tmp = new HashMap<>();
            User user = userMapper.selectByPrimaryKey(s.getU_id());
            tmp.put("u_id",user.getU_id());
            tmp.put("u_name",user.getU_name());
            ArrayList<Map<String,Object>> mapList = new ArrayList<>();
            for (GradeSystem g : gradeSystems) {
                StudentGrade studentGrade = new StudentGrade();
                studentGrade.setP_id(pid);
                studentGrade.setU_id(user.getU_id());
                studentGrade.setItem_id(g.getItem_id());
                StudentGrade tmpStudentGrade = studentGradeMapper.selectOne(studentGrade);
                Map<String,Object> tmp_map = new HashMap<>();
                tmp_map.put("item_id",g.getItem_id());
                tmp_map.put("item_name",g.getDescription());
                if (tmpStudentGrade!=null){
                    tmp_map.put("grade",tmpStudentGrade.getGrade());
                }else
                    tmp_map.put("grade",null);
                mapList.add(tmp_map);
            }
            tmp.put("itemsList",mapList);
            ret.add(tmp);
        }
        return ret;
    }

    @Override
    @RequestMapping("/searchEvaluateByTeacher")
    public List<StudentGrade> searchEvaluateByTeacher(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id) {
        StudentGrade tmp = new StudentGrade();
        tmp.setP_id(p_id);
        tmp.setU_id(s_id);
        List<StudentGrade> grades = studentGradeMapper.select(tmp);
        if(grades.size()==0){
            return null;
        }
        return grades;
    }

    @Override
    @RequestMapping("/searchGrade")
    public String searchGrade(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id) {
        StudentGrade studentGrade = new StudentGrade();
        studentGrade.setP_id(p_id);
        studentGrade.setU_id(s_id);
        List<StudentGrade> grades = studentGradeMapper.select(studentGrade);
        Project project = projectMapper.selectByPrimaryKey(p_id);

        if(project.getTeacher_grade_ratio()>0&&grades.size()==0){
            return null;
        }

        Evaluation evaluation = new Evaluation();
        evaluation.setPassive_s_id(s_id);
        evaluation.setP_id(p_id);
        Project tmp = new Project();
        tmp.setP_id(p_id);

        //这里选出来评分人包括了自己,可能会有bug
        if(project.getMutual_grade_ratio() > 0 && evaluationMapper.selectCount(evaluation) < projectMapper.selectCount(tmp)-1){
            return null;
        }

        evaluation = new Evaluation();
        evaluation.setP_id(p_id);
        evaluation.setPassive_s_id(s_id);
        evaluation.setActive_s_id(s_id);

        double gradeBySelf = evaluationMapper.select(evaluation)==null ? -1 : evaluation.getGrade();

        if(project.getSelf_grade_ratio()>0 && gradeBySelf < 0){
            return null;
        }

        double gradeByOther = evaluationMapper.searchEvaluateByOther(p_id,s_id);
        double gradeByTeacher = 0;

        for (StudentGrade grade:grades) {
            gradeByTeacher += grade.getGrade();
        }

        double totalGrade = gradeByTeacher*project.getTeacher_grade_ratio()+gradeByOther*project.getMutual_grade_ratio()+gradeBySelf*project.getSelf_grade_ratio();

        return ""+totalGrade;
    }

    @Override
    @RequestMapping("/studentGrades")
    public void evaluateByTeacher(@RequestParam("studentGrades") List<StudentGrade> studentGrades) {
        for (StudentGrade s:studentGrades){
            studentGradeMapper.insert(s);
        }
    }

    @Override
    @RequestMapping("/getAllGradeItems")
    public Map<Integer, Object> getAllGradeItems() {
        List<Project> list = projectMapper.selectAll();
        Map<Integer, Object> tmp_map = new HashMap<>();
        for (Project p:list){
            GradeSystem gradeSystem = new GradeSystem();
            gradeSystem.setP_id(p.getP_id());
            List<GradeSystem> arrayList = gradeSystemMapper.select(gradeSystem);
            tmp_map.put(p.getP_id(),arrayList);
        }
        return tmp_map;
    }
}
