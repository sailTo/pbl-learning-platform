package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Evaluation;

public interface EvaluationMapper extends Mapper<Evaluation> {

    /**
     * 获取学生互评分平均分(未全评分则-1)
     * @param p_id
     * @param s_id
     * @return
     */
    double searchEvaluateByOther(int p_id,int s_id);

    /**
     * 获取已经对s_id的学生评分的学生人数
     * @param p_id
     * @param s_id
     * @return
     */
    int haveEvaluatedNum(int p_id,int s_id);

    /**
     * 获得自评分数(若未评分则为-1)
     * @param p_id
     * @param s_id
     * @return
     */
    double searchEvaluateBySelf(int p_id,int s_id);

    /**
     * 学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     * @param grade
     */
    void evaluate(int p_id,int s_id,int u_id,double grade);

}