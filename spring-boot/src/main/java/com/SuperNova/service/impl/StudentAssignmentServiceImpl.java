package com.SuperNova.service.impl;

import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.model.StudentAssignment;
import com.SuperNova.service.StudentAssignmentService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class StudentAssignmentServiceImpl extends AbstractService<StudentAssignment> implements StudentAssignmentService {
    @Resource
    private StudentAssignmentMapper studentAssignmentMapper;

}
