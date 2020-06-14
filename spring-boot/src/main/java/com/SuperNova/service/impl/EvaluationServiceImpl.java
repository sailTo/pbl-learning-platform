package com.SuperNova.service.impl;

import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.model.Evaluation;
import com.SuperNova.model.Project;
import com.SuperNova.model.User;
import com.SuperNova.service.EvaluationService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    public JSONObject searchEvaluateByOther(int p_id, String s_id) {

        JSONObject data = new JSONObject();

        Project project = new Project();
        project.setP_id(p_id);
        data.put("totalNum",projectMapper.selectCount(project));

        Evaluation evaluation = new Evaluation();
        evaluation.setP_id(p_id);
        evaluation.setPassive_s_id(s_id);
        int num = evaluationMapper.selectCount(evaluation);
        if(num==0){
            return data;
        }

        data.put("doneNum",num);
        data.put("grade",evaluationMapper.searchEvaluateByOther(p_id, s_id));
        return data;
    }

    @Override
    public String searchEvaluateBySelf(int p_id,String s_id) {
        Evaluation tmp = new Evaluation();
        tmp.setP_id(p_id);
        tmp.setActive_s_id(s_id);
        tmp.setPassive_s_id(s_id);
        tmp = evaluationMapper.selectByPrimaryKey(tmp);
        if(tmp == null){
            return "-1";
        }
        return ""+tmp.getGrade();
    }

    @Override
    public void evaluate(int p_id, String s_id, String u_id, double grade) {
        Evaluation tmp = new Evaluation();
        tmp.setP_id(p_id);
        tmp.setActive_s_id(s_id);
        tmp.setPassive_s_id(u_id);
        tmp.setGrade(grade);
        evaluationMapper.insertSelective(tmp);
    }

    @Override
    public ArrayList<Map<String, String>> getMyEvaluate(int p_id, String s_id) {
        ArrayList<Map<String, String>> res = new ArrayList<>();
        List<User> users = projectMapper.searchGroupers(p_id);
        users.forEach(user -> {
            Map<String,String> tmp = new HashMap<>();
            Evaluation evaluation = new Evaluation();
            evaluation.setP_id(p_id);
            evaluation.setActive_s_id(s_id);
            evaluation.setPassive_s_id(user.getU_id());
            evaluation = evaluationMapper.selectOne(evaluation);
            tmp.put("u_id",user.getU_id());
            tmp.put("rating",evaluation==null?null:evaluation.getGrade().toString());
            res.add(tmp);
        });
        return res;
    }
}
