package com.SuperNova.service.impl;

import com.SuperNova.dao.GradeSystemMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.Project;
import com.SuperNova.service.ProjectService;
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
public class ProjectServiceImpl extends AbstractService<Project> implements ProjectService {
    @Resource
    private ProjectMapper projectMapper;
    @Resource
    private GradeSystemMapper gradeSystemMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;

    @Override
    public int studentCoursePID(String s_id, int c_id) {
        return studentProjectMapper.studentCoursePID(s_id,c_id);
    }

    @Override
    public String searchProject(int c_id) {
        Project tmp = new Project();
        tmp.setc_id(c_id);
        return JSON.toJSONString(projectMapper.select(tmp));
    }

    @Override
    public void deletProject(int p_id) {
        projectMapper.deleteByPrimaryKey(p_id);

        GradeSystem tmp = new GradeSystem();
        tmp.setp_id(p_id);
        gradeSystemMapper.delete(tmp);
    }

    @Override
    public int addProject(Project project, List<GradeSystem> grades) {
        projectMapper.addProject(project);
        int p_id = project.getp_id();
        int item_id = gradeSystemMapper.getMaxItemId(p_id);
        for (GradeSystem grade:grades) {
            grade.setp_id(p_id);
            //这里需要修改成设置item_id，因为它不是自增的
            grade.setitem_id(++item_id);
        }
        gradeSystemMapper.insertList(grades);
        return p_id;
    }

    @Override
    public void changeProject(Project project, List<GradeSystem> grades) {
        projectMapper.updateByPrimaryKey(project);
        for (GradeSystem grade:grades) {
            gradeSystemMapper.updateByPrimaryKey(grade);
        }
    }

    @Override
    public String searchGradeSystem(int p_id) {
        GradeSystem tmp = new GradeSystem();
        tmp.setp_id(p_id);
        return JSON.toJSONString(gradeSystemMapper.select(tmp));
    }

    @Override
    public int searchTotalNum(int p_id) {
        Project tmp = new Project();
        tmp.setp_id(p_id);
        return projectMapper.selectCount(tmp);
    }

    @Override
    public int countDone(int p_id) {
        return projectMapper.countDone(p_id);
    }

    @Override
    public String searchGroupers(int p_id) {
        return JSON.toJSONString(projectMapper.searchGroupers(p_id));
    }
}
