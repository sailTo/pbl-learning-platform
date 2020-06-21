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
    Double searchEvaluateByOther(@Param("p_id")int p_id, @Param("s_id")String s_id);


    /**
     * 获得没有自评的学生人数
     * @param p_id
     * @return
     */
    Integer searchNotSelfEvaluateNum(@Param("p_id") int p_id);

    /**
     * 获得暂未互评/自评的人数
     * @param p_id
     * @return
     */
    Integer searchNotEvaluateNum(@Param("p_id") int p_id);

    /**
     * 获得老师暂未评分的人数
     * @param p_id
     * @return
     */
    Integer searchTeacherNotEvaluateNum(@Param("p_id") int p_id);

    /**
     * 获取学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     */
    Double getMyEvaluate(@Param("p_id")int p_id, @Param("s_id")String s_id, @Param("u_id")String u_id);
}