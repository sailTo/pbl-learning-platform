package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSON;
import com.nacos.core.AbstractService;
import com.nacos.dao.DiscussionMapper;
import com.nacos.dao.StudentProjectMapper;
import com.nacos.dao.UserMapper;
import com.nacos.entity.DiscussInformation;
import com.nacos.entity.Discussion;
import com.nacos.entity.StudentProject;
import com.nacos.entity.User;
import com.nacos.pbl.DiscussionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@RestController
@Transactional
@RequestMapping("/discussion")
public class DiscussionServiceImpl extends AbstractService<Discussion> implements DiscussionService {
    @Resource
    private DiscussionMapper discussionMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    @RequestMapping("/searchDiscussions")
    public List<Discussion> searchDiscussions(@RequestParam("p_id") int p_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        return discussionMapper.select(tmp);
    }

    @Override
    @RequestMapping("/searchDiscussion")
    public String searchDiscussion(@RequestParam("p_id") int p_id,@RequestParam("d_id") int d_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        tmp.setD_id(d_id);
        return JSON.toJSONString(discussionMapper.select(tmp));
    }

    @Override
    @RequestMapping("/createDiscussion")
    public int createDiscussion(@RequestParam("discussion") Discussion discussion) {
        discussionMapper.addDiscussion(discussion);
        return discussion.getD_id();
    }

    @Override
    @RequestMapping("/deleteDiscussion")
    public void deleteDiscussion(@RequestParam("p_id") int p_id,@RequestParam("d_id") int d_id) {
        Discussion tmp = new Discussion();
        tmp.setP_id(p_id);
        tmp.setD_id(d_id);
        discussionMapper.delete(tmp);
    }

    @Override
    @RequestMapping("/countDiscussion")
    public List<DiscussInformation> countDiscussion(@RequestParam("p_id") int p_id) {
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
    @RequestMapping("/getMaxDiscussionNum")
    public String getMaxDiscussionNum(@RequestParam("p_id") int p_id) {
        return JSON.toJSONString((discussionMapper.maxDiscussionNum(p_id)==null?0:discussionMapper.maxDiscussionNum(p_id)));
    }

    @Override
    @RequestMapping("/getDiscussionAndReplyCount")
    public int getDiscussionAndReplyCount(@RequestParam("p_id") int p_id,@RequestParam("u_id") String u_id) {
        int ret = discussionMapper.countDiscussionByUidAndPid(p_id,u_id);
        return ret;
    }
}
