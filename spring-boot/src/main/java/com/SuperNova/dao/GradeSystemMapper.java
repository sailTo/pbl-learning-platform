package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.model.StudentGrade;

import java.util.List;

public interface GradeSystemMapper extends Mapper<GradeSystem> {

    /**
     * 获取当前项目最大的item_id
     * @param p_id
     * @return
     */
    int getMaxItemId(int p_id);
}