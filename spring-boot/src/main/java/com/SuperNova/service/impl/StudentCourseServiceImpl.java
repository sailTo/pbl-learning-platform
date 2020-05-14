package com.SuperNova.service.impl;

import com.SuperNova.dao.StudentCourseMapper;
import com.SuperNova.model.StudentCourse;
import com.SuperNova.service.StudentCourseService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class StudentCourseServiceImpl extends AbstractService<StudentCourse> implements StudentCourseService {
    @Resource
    private StudentCourseMapper studentCourseMapper;

}
