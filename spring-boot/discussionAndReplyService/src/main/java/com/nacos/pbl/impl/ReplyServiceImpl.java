package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSON;
import com.nacos.core.AbstractService;
import com.nacos.dao.ReplyMapper;
import com.nacos.entity.Reply;
import com.nacos.pbl.ReplyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@RestController
@Transactional
@RequestMapping("/reply")
public class ReplyServiceImpl extends AbstractService<Reply> implements ReplyService {
    @Resource
    private ReplyMapper replyMapper;

    @Override
    @RequestMapping("/searchReplise")
    public List<Reply> searchReplise(@RequestParam("d_id") int d_id) {
        Reply reply = new Reply();
        reply.setD_id(d_id);
        return replyMapper.select(reply);
    }

    @Override
    @RequestMapping("/searchReply")
    public String searchReply(@RequestParam("p_id") int p_id,@RequestParam("r_id") int r_id) {
        return JSON.toJSONString(replyMapper.searchReply(p_id,r_id));
    }

    @Override
    @RequestMapping("/createReply")
    public int createReply(@RequestParam("reply") Reply reply) {
        replyMapper.createReply(reply);
        return reply.getR_id();
    }

    @Override
    @RequestMapping("/deleteReply")
    public void deleteReply(@RequestParam("r_id") int r_id) {
        replyMapper.deleteByPrimaryKey(r_id);
    }
}
