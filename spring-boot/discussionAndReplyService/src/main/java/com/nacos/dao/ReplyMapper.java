package com.nacos.dao;

import com.nacos.core.Mapper;
import com.nacos.entity.Reply;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReplyMapper extends Mapper<Reply> {
    /**
     * 搜索一个pj下所有回复
     * @param p_id
     * @return
     */
    List<Reply> searchReplise(int p_id);

    /**
     * 搜索回复
     * @param p_id
     * 这里由于r_id是唯一主键，因此查询的时候不需要p_id
     * 这里先不做修改，可以进行讨论
     * @return
     */
    Reply searchReply(@Param("p_id") int p_id, @Param("r_id") int r_id);

    /**
     * 新建回复
     * @param reply
     * @return reply id
     */
    void createReply(Reply reply);

}