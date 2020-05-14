package com.SuperNova.service.impl;

import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.model.StudentProject;
import com.SuperNova.service.StudentProjectService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class StudentProjectServiceImpl extends AbstractService<StudentProject> implements StudentProjectService {
    @Resource
    private StudentProjectMapper studentProjectMapper;

}
