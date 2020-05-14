package com.SuperNova.service.impl;

import com.SuperNova.dao.DiscussionMapper;
import com.SuperNova.model.Discussion;
import com.SuperNova.service.DiscussionService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class DiscussionServiceImpl extends AbstractService<Discussion> implements DiscussionService {
    @Resource
    private DiscussionMapper discussionMapper;

}
