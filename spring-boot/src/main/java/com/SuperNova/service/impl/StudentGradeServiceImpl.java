package com.SuperNova.service.impl;

import com.SuperNova.dao.StudentGradeMapper;
import com.SuperNova.model.StudentGrade;
import com.SuperNova.service.StudentGradeService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class StudentGradeServiceImpl extends AbstractService<StudentGrade> implements StudentGradeService {
    @Resource
    private StudentGradeMapper studentGradeMapper;

}
