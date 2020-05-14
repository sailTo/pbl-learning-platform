package com.SuperNova.service.impl;

import com.SuperNova.dao.ReplyMapper;
import com.SuperNova.model.Reply;
import com.SuperNova.service.ReplyService;
import com.SuperNova.core.AbstractService;
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

}
