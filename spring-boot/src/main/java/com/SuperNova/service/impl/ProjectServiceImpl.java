package com.SuperNova.service.impl;

import com.SuperNova.dao.GradeSystemMapper;
import com.SuperNova.dao.ProjectMapper;
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

    @Override
    public String searchProject(int c_id) {
        return JSON.toJSONString(projectMapper.searchProject(c_id));
    }

    @Override
    public void deletProject(int p_id) {
        projectMapper.deletProject(p_id);
        gradeSystemMapper.deleteGradeSystems(p_id);
    }

    @Override
    public int addProject(Project project, List<GradeSystem> grades) {
        int p_id = projectMapper.addProject(project);
        for (GradeSystem grade:grades) {
            grade.setp_id(p_id);
        }
        gradeSystemMapper.addGradeSystems(grades);
        return p_id;
    }

    @Override
    public String searchGradeSystem(int p_id) {
        return JSON.toJSONString(gradeSystemMapper.searchGradeSystem(p_id));
    }

    @Override
    public int searchTotalNum(int p_id) {
        return projectMapper.searchTotalNum(p_id);
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
