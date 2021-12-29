package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.DiscussInformation;
import com.nacos.entity.Discussion;
import feign.Param;

import java.util.List;

public interface DiscussionMapper extends Mapper<Discussion> {

    /**
     * 新建讨论
     * @param discussion
     * discussion对象里不要带time，数据库里自动生成
     * @return
     */
    void addDiscussion(Discussion discussion);

    /**
     * 统计最大讨论数
     * @param p_id
     * @return
     */
    Integer maxDiscussionNum(int p_id);

    /**
     * 统计讨论情况
     * @param p_id
     * @return
     */
    List<DiscussInformation> countDiscussion(int p_id);

    /**
     * 统计个人讨论情况
     * @param p_id
     * @return
     */
    Integer countDiscussionByUidAndPid(@Param(value = "p_id") int p_id, @Param(value = "u_id") String u_id);
}