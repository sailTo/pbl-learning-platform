package com.SuperNova.service;
import com.SuperNova.model.DiscussInformation;
import com.SuperNova.model.Discussion;
import com.SuperNova.core.Service;

import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface DiscussionService extends Service<Discussion> {

    /**
     * 搜索所有项目讨论
     * @param p_id
     * @return
     */
    List<Discussion> searchDiscussions(int p_id);

    /**
     * 搜索项目讨论
     * @param p_id
     * @return
     */
    String searchDiscussion(int p_id,int d_id);

    /**
     * 新建讨论
     * @param discussion
     * @return
     */
    int createDiscussion(Discussion discussion);

    /**
     * 删除项目讨论
     * @param p_id
     * @param d_id
     */
    void deleteDiscussion(int p_id,int d_id);

    /**
     * 统计讨论情况
     * @param p_id
     * @return
     */
    List<DiscussInformation> countDiscussion(int p_id);

    /**
     * 统计该课程讨论情况
     * @param p_id
     * @return
     */
    String getMaxDiscussionNum(int p_id);

    /**
     * 获取该角色在该项目中的讨论数，没有就为0
     * @param p_id
     * @param u_id
     */
    int getDiscussionAndReplyCount(int p_id, String u_id);
}
