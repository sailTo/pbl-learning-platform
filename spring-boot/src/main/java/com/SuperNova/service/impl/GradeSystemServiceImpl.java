package com.SuperNova.service.impl;

import com.SuperNova.dao.GradeSystemMapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.service.GradeSystemService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class GradeSystemServiceImpl extends AbstractService<GradeSystem> implements GradeSystemService {
    @Resource
    private GradeSystemMapper gradeSystemMapper;

}
