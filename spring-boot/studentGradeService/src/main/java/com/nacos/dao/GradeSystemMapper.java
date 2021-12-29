package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.GradeSystem;

public interface GradeSystemMapper extends Mapper<GradeSystem> {

    /**
     * 获取当前项目最大的item_id
     * @param p_id
     * @return
     */
    int getMaxItemId(int p_id);
}