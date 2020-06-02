package com.SuperNova.service.impl;

import com.SuperNova.dao.DiscussionMapper;
import com.SuperNova.model.Discussion;
import com.SuperNova.service.DiscussionService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class DiscussionServiceImpl extends AbstractService<Discussion> implements DiscussionService {
    @Resource
    private DiscussionMapper discussionMapper;

    @Override
    public String searchDiscussions(int p_id) {
        Discussion tmp = new Discussion();
        tmp.setp_id(p_id);
        return JSON.toJSONString(discussionMapper.select(tmp));
    }

    @Override
    public String searchDiscussion(int p_id, int d_id) {
        Discussion tmp = new Discussion();
        tmp.setp_id(p_id);
        tmp.setd_id(d_id);
        return JSON.toJSONString(discussionMapper.select(tmp));
    }

    @Override
    public int createDiscussion(Discussion discussion) {
        discussionMapper.addDiscussion(discussion);
        return discussion.getd_id();
    }

    @Override
    public void deleteDiscussion(int p_id, int d_id) {
        Discussion tmp = new Discussion();
        tmp.setp_id(p_id);
        tmp.setd_id(d_id);
        discussionMapper.delete(tmp);
    }

    @Override
    public String countDiscussion(int p_id) {
        return JSON.toJSONString(discussionMapper.countDiscussion(p_id));
    }

    @Override
    public String getMaxDiscussionNum(int p_id) {
        return JSON.toJSONString(discussionMapper.maxDiscussionNum(p_id));
    }
}
