package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.ReplyMapper;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.Reply;
import com.SuperNova.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import javax.annotation.Resource;
import java.util.List;

public class ReplyTest extends Tester {
    @Resource
    private ReplyMapper replyMapper;
    @Test
//    @Rollback(false)
    public void test1(){
        Reply reply = new Reply();
        reply.setd_id(1);
        reply.setu_id("u001");
        reply.setContent("asd");
        replyMapper.insertSelective(reply);
//        user.setGender("man");
//        user.setType("student");
//        List<User> users = userMapper.select(user);
        int a = reply.getr_id();
        Assert.assertEquals(a,1);
    }
}
