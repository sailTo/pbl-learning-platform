package com.SuperNova.service;
import com.SuperNova.model.Evaluation;
import com.SuperNova.core.Service;


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
    String searchEvaluateByOther(int p_id,String s_id);

    /**
     * 学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     * @param grade
     */
    void evaluate(int p_id,String s_id,String u_id,int grade);
}
