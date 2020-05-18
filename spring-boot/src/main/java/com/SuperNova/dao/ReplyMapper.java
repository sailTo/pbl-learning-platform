package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.Reply;

import java.util.List;

public interface ReplyMapper extends Mapper<Reply> {
    /**
     * 搜索所有回复
     * @param p_id
     * @return
     */
    Reply searchReplise(int p_id);

    /**
     * 搜索回复
     * @param p_id
     * @return
     */
    List<Reply> searchReply(int p_id, int r_id);

    /**
     * 新建回复
     * @param reply
     * @return reply id
     */
    int createReply(Reply reply);

    /**
     * 删除回复
     * @param p_id
     * @param r_id
     */
    void deleteReply(int p_id,int r_id);
}