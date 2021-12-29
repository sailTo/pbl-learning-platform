package com.nacos.pbl;

import com.nacos.core.Service;
import com.nacos.entity.Reply;

import java.util.List;

public interface ReplyService extends Service<Reply> {
    /**
     * 搜索一个讨论下所有回复
     * @param d_id
     * @return
     */
    List<Reply> searchReplise(int d_id);

    /**
     * 搜索回复
     * @param p_id
     * @return
     */
    String searchReply(int p_id, int r_id);

    /**
     * 新建回复
     * @param reply
     * @return
     */
    int createReply(Reply reply);

    /**
     * 删除回复
     * @param r_id
     */
    void deleteReply(int r_id);
}
