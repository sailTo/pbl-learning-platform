package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Evaluation;
import org.apache.ibatis.annotations.Param;

public interface EvaluationMapper extends Mapper<Evaluation> {

    /**
     * 获取学生互评分平均分
     * 此处删除(未全评分则-1)的要求，每次获取都取已经评分的平均分
     * @param p_id
     * @param s_id
     * @return
     */
    double searchEvaluateByOther(@Param("p_id")int p_id, @Param("s_id")String s_id);

//    /**
//     * 获取已经对s_id的学生评分的学生人数
//     * @param p_id
//     * @param s_id
//     * @return
//     */
//    int haveEvaluatedNum(int p_id,int s_id);

//    /**
//     * 获得自评分数(若未评分则为-1)
//     * @param p_id
//     * @param s_id
//     * @return
//     */
//    double searchEvaluateBySelf(int p_id,int s_id);

//    /**
//     * 学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
//     * @param p_id
//     * @param s_id
//     * @param u_id
//     * @param grade
//     */
//    void evaluate(int p_id,int s_id,int u_id,double grade);
    /**
     * 获取学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     */
    double getMyEvaluate(@Param("p_id")int p_id, @Param("s_id")String s_id, @Param("s_id")String u_id);
}