package com.nacos.service;

import com.nacos.core.Service;
import com.nacos.entity.DiscussInformation;
import com.nacos.entity.Discussion;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "discussionAndReply-service",path = "/discussion")
public interface DiscussionService {

    /**
     * 搜索所有项目讨论
     * @param p_id
     * @return
     */
    @RequestMapping("/searchDiscussions")
    List<Discussion> searchDiscussions(@RequestParam("p_id") int p_id);

    /**
     * 搜索项目讨论
     * @param p_id
     * @return
     */
    @RequestMapping("/searchDiscussion")
    String searchDiscussion(@RequestParam("p_id") int p_id,@RequestParam("d_id") int d_id);

    /**
     * 新建讨论
     * @param discussion
     * @return
     */
    @RequestMapping("/createDiscussion")
    int createDiscussion(@RequestParam("discussion") Discussion discussion);

    /**
     * 删除项目讨论
     * @param p_id
     * @param d_id
     */
    @RequestMapping("/deleteDiscussion")
    void deleteDiscussion(@RequestParam("p_id") int p_id,@RequestParam("d_id") int d_id);

    /**
     * 统计讨论情况
     * @param p_id
     * @return
     */
    @RequestMapping("/countDiscussion")
    List<DiscussInformation> countDiscussion(@RequestParam("p_id") int p_id);

    /**
     * 统计该课程讨论情况
     * @param p_id
     * @return
     */
    @RequestMapping("/getMaxDiscussionNum")
    String getMaxDiscussionNum(@RequestParam("p_id") int p_id);

    /**
     * 获取该角色在该项目中的讨论数，没有就为0
     * @param p_id
     * @param u_id
     */
    @RequestMapping("/getDiscussionAndReplyCount")
    int getDiscussionAndReplyCount(@RequestParam("p_id") int p_id,@RequestParam("u_id") String u_id);

}
