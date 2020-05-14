package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.model.Evaluation;
import com.SuperNova.service.EvaluationService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class EvaluationServiceImpl extends AbstractService<Evaluation> implements EvaluationService {
    @Resource
    private EvaluationMapper evaluationMapper;

}
