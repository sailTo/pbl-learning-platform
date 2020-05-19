package com.SuperNova.service.impl;

import com.SuperNova.dao.ReplyMapper;
import com.SuperNova.model.Reply;
import com.SuperNova.service.ReplyService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class ReplyServiceImpl extends AbstractService<Reply> implements ReplyService {
    @Resource
    private ReplyMapper replyMapper;

    @Override
    public String searchReplise(int p_id) {
        return JSON.toJSONString(replyMapper.searchReplise(p_id));
    }

    @Override
    public String searchReply(int p_id, int r_id) {
        return JSON.toJSONString(replyMapper.searchReply(p_id,r_id));
    }

    @Override
    public int createReply(Reply reply) {
        return replyMapper.createReply(reply);
    }

    @Override
    public void deleteReply(int p_id, int r_id) {
        replyMapper.deleteReply(p_id,r_id);
    }
}
