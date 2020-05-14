package com.SuperNova.service.impl;

import com.SuperNova.dao.AssignmentMapper;
import com.SuperNova.model.Assignment;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class AssignmentServiceImpl extends AbstractService<Assignment> implements AssignmentService {
    @Resource
    private AssignmentMapper assignmentMapper;

}
