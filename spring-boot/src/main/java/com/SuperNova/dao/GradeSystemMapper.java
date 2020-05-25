package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.StudentGrade;

import java.util.List;

public interface GradeSystemMapper extends Mapper<GradeSystem> {

    /**
     * 添加项目评分细则
     * @param gradeSystems
     */
    void addGradeSystems(List<GradeSystem> gradeSystems);

    /**
     * 删除项目相关评分细则
     * @param p_id
     */
    void deleteGradeSystems(int p_id);

    /**
     * 获取项目评分细则
     * @param p_id
     * @return
     */
    List<GradeSystem> searchGradeSystem(int p_id);

}