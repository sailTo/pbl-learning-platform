package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.model.Evaluation;
import com.SuperNova.model.Project;
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
    public String searchEvaluateByOther(int p_id, String s_id) {

        JSONObject data = new JSONObject();

        Project project = new Project();
        project.setp_id(p_id);
        data.put("totalNum",projectMapper.selectCount(project));

        Evaluation evaluation = new Evaluation();
        evaluation.setp_id(p_id);
        evaluation.setpassive_s_id(s_id);
        int num = evaluationMapper.selectCount(evaluation);
        if(num==0){
            return data.toJSONString();
        }

        data.put("doneNum",num);
        data.put("grade",evaluationMapper.searchEvaluateByOther(p_id, s_id));
        return data.toJSONString();
    }

    @Override
    public String searchEvaluateBySelf(int p_id,String s_id) {
        Evaluation tmp = new Evaluation();
        tmp.setp_id(p_id);
        tmp.setactive_s_id(s_id);
        tmp.setpassive_s_id(s_id);
        tmp = evaluationMapper.selectByPrimaryKey(tmp);
        if(tmp==null){
            return "-1";
        }
        return ""+tmp.getGrade();
    }

    @Override
    public void evaluate(int p_id, String s_id, String u_id, double grade) {
        Evaluation tmp = new Evaluation();
        tmp.setp_id(p_id);
        tmp.setactive_s_id(s_id);
        tmp.setpassive_s_id(u_id);
        tmp.setGrade(grade);
        evaluationMapper.insertSelective(tmp);
    }
}
