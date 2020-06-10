package com.SuperNova.service;
import com.SuperNova.model.Evaluation;
import com.SuperNova.core.Service;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface EvaluationService extends Service<Evaluation> {

    /**
     * 获取学生互评平均分，评分人数，总人数
     * @param p_id
     * @param s_id
     * @return
     */
    JSONObject searchEvaluateByOther(int p_id, String s_id);

    /**
     * 获取学生自评分
     * @param s_id
     * @return
     */
    String searchEvaluateBySelf(int p_id,String s_id);

    /**
     * 获取学生对其他人评分的结果
     * @param p_id
     * @param s_id
     */
    ArrayList<Map<String, String>> getMyEvaluate(int p_id, String s_id);

    /**
     * 学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     * @param grade
     */
    void evaluate(int p_id, String s_id, String u_id, double grade);
}
