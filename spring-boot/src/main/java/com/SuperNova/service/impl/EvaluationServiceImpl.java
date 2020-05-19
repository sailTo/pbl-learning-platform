package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.model.Evaluation;
import com.SuperNova.service.EvaluationService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class EvaluationServiceImpl extends AbstractService<Evaluation> implements EvaluationService {
    @Resource
    private EvaluationMapper evaluationMapper;
    @Resource
    private ProjectMapper projectMapper;

    @Override
    public String searchEvaluateByOther(int p_id, int s_id) {

        JSONObject data = new JSONObject();
        data.put("totalNum",projectMapper.searchTotalNum(p_id));
        int num = evaluationMapper.haveEvaluatedNum(p_id,s_id);
        if(num==0){
            return data.toJSONString();
        }

        data.put("doneNum",num);
        data.put("grade",evaluationMapper.searchEvaluateByOther(p_id, s_id));
        return data.toJSONString();
    }

    @Override
    public void evaluate(int p_id, int s_id, int u_id, double grade) {
        evaluationMapper.evaluate(p_id, s_id, u_id, grade);
    }
}
