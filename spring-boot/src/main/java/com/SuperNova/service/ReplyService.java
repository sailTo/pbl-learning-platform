package com.SuperNova.service;
import com.SuperNova.model.Reply;
import com.SuperNova.core.Service;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface ReplyService extends Service<Reply> {
    /**
     * 搜索所有回复
     * @param p_id
     * @return
     */
    String searchReplise(int p_id);

    /**
     * 搜索回复
     * @param p_id
     * @return
     */
    String searchReply(int p_id,int r_id);

    /**
     * 新建回复
     * @param reply
     * @return
     */
    int createReply(Reply reply);

    /**
     * 删除回复
     * @param p_id
     * @param r_id
     */
    void deleteReply(int p_id,int r_id);
}