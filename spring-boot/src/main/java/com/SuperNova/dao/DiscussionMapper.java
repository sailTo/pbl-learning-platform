package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.DiscussInformation;
import com.SuperNova.model.Discussion;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DiscussionMapper extends Mapper<Discussion> {

//    /**
//     * 搜索所有项目讨论
//     * @param p_id
//     * @return
//     */
//    List<Discussion> searchDiscussions(int p_id);

//    /**
//     * 搜索项目讨论
//     * @param p_id
//     * @return
//     */
//    Discussion searchDiscussion(int p_id,int d_id);

    /**
     * 新建讨论
     * @param discussion
     * discussion对象里不要带time，数据库里自动生成
     * @return
     */
    void addDiscussion(Discussion discussion);

//    /**
//     * 删除项目讨论
//     * @param p_id
//     * @param d_id
//     */
//    void deleteDiscussion(int p_id,int d_id);

    /**
     * 统计最大讨论数
     * @param p_id
     * @return
     */
    int maxDiscussionNum(int p_id);

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
    Integer countDiscussionByUidAndPid(@Param(value = "p_id")int p_id, @Param(value = "u_id")String u_id);
}