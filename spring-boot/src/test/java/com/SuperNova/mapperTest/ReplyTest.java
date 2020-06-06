package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.ReplyMapper;
import com.SuperNova.model.Reply;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class ReplyTest extends Tester {
    @Resource
    private ReplyMapper replyMapper;
    @Test
    public void test2(){
        Reply reply = new Reply();
        reply.setD_id(1);
        List<Reply> replies = replyMapper.select(reply);
        Assert.assertEquals(2,replies.size());
    }

    @Test
//    @Rollback(false)
    public void test1(){
        Reply reply = new Reply();
        reply.setD_id(1);
        reply.setU_id("u001");
        reply.setContent("asd");
        replyMapper.insertSelective(reply);
//        user.setGender("man");
//        user.setType("student");
//        List<User> users = userMapper.select(user);
//        int a = reply.getR_id();
//        Assert.assertEquals(a,1);
    }
}
