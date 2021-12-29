package com.nacos.service;

import com.nacos.core.Service;
import com.nacos.entity.Reply;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "discussionAndReply-service",path = "/reply")
public interface ReplyService  {
    /**
     * 搜索一个讨论下所有回复
     * @param d_id
     * @return
     */
    @RequestMapping("/searchReplise")
    List<Reply> searchReplise(@RequestParam("d_id") int d_id);

    /**
     * 搜索回复
     * @param p_id
     * @return
     */
    @RequestMapping("/searchReply")
    String searchReply(@RequestParam("p_id") int p_id,@RequestParam("r_id") int r_id);

    /**
     * 新建回复
     * @param reply
     * @return
     */
    @RequestMapping("/createReply")
    int createReply(@RequestParam("reply") Reply reply);

    /**
     * 删除回复
     * @param r_id
     */
    @RequestMapping("/deleteReply")
    void deleteReply(@RequestParam("r_id") int r_id);
}
