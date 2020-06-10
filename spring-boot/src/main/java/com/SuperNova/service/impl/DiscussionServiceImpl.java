package com.SuperNova.service.impl;

import com.SuperNova.dao.DiscussionMapper;
import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.DiscussInformation;
import com.SuperNova.model.Discussion;
import com.SuperNova.model.StudentProject;
import com.SuperNova.model.User;
import com.SuperNova.service.DiscussionService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class DiscussionServiceImpl extends AbstractService<Discussion> implements DiscussionService {
    @Resource
    private DiscussionMapper discussionMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    public List<Discussion> searchDiscussions(int p_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        return discussionMapper.select(tmp);
    }

    @Override
    public String searchDiscussion(int p_id, int d_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        tmp.setD_id(d_id);
        return JSON.toJSONString(discussionMapper.select(tmp));
    }

    @Override
    public int createDiscussion(Discussion discussion) {
        discussionMapper.addDiscussion(discussion);
        return discussion.getD_id();
    }

    @Override
    public void deleteDiscussion(int p_id, int d_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        tmp.setD_id(d_id);
        discussionMapper.delete(tmp);
    }

    @Override
    public List<DiscussInformation> countDiscussion(int p_id) {
        List<DiscussInformation> ret = discussionMapper.countDiscussion(p_id);
        StudentProject studentProject = new StudentProject();
        studentProject.setP_id(p_id);
        List<StudentProject> studentProjects = studentProjectMapper.select(studentProject);
        for (StudentProject s : studentProjects){
            String u_id = s.getU_id();
            boolean flag = true;
            for (DiscussInformation i : ret){
                if (u_id.equals(i.getS_id())) {
                    flag = false;
                    break;
                }
            }
            if (flag){
                User u = userMapper.selectByPrimaryKey(u_id);
                DiscussInformation join = new DiscussInformation(u_id,u.getU_name(),0);
                ret.add(join);
            }
        }
        return ret;
    }

    @Override
    public String getMaxDiscussionNum(int p_id) {
        return JSON.toJSONString(discussionMapper.maxDiscussionNum(p_id));
    }

    @Override
    public int getDiscussionAndReplyCount(int p_id, String u_id) {
        int ret = discussionMapper.countDiscussionByUidAndPid(p_id,u_id);
        return ret;
    }
}
