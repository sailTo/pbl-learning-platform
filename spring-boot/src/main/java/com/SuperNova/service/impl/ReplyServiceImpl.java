package com.SuperNova.service.impl;

import com.SuperNova.dao.ReplyMapper;
import com.SuperNova.model.Reply;
import com.SuperNova.service.ReplyService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class ReplyServiceImpl extends AbstractService<Reply> implements ReplyService {
    @Resource
    private ReplyMapper replyMapper;

    @Override
    public List<Reply> searchReplise(int d_id) {
        Reply reply = new Reply();
        reply.setD_id(d_id);
        return replyMapper.select(reply);
    }

    @Override
    public String searchReply(int p_id, int r_id) {
        return JSON.toJSONString(replyMapper.searchReply(p_id,r_id));
    }

    @Override
    public int createReply(Reply reply) {
        replyMapper.createReply(reply);
        return reply.getR_id();
    }

    @Override
    public void deleteReply(int r_id) {
        replyMapper.deleteByPrimaryKey(r_id);
    }
}
