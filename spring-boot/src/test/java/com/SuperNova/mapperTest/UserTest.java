package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.core.ProjectConstant;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.User;
import com.SuperNova.service.UserService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class UserTest extends Tester {
    @Resource
    private UserMapper userMapper;
    @Resource
    private UserService userService;
    @Test
    public void test1(){
        User user = new User();
        user.setGender("man");
//        user.setType("teacher");
//        user.setType("student");
//        int a = userMapper.se(user);
//        Assert.assertEquals(3,a);
    }

    @Test
    public void test2(){
        Assert.assertFalse(userMapper.idExist("s003"));
    }

    @Test
    public void test3(){
        String users = userService.getAllUser();
        Assert.assertEquals(users,3);
    }

    @Test
    public void test4(){
        User user = new User();
        user.setU_id("t002");
        user.setU_name("teacher_test");
        user.setType("teacher");
        user.setPassword("123456");
        user.setDescription("empty");
        user.setImage(ProjectConstant.DEAFULT_IMAGE);
        user.setGender("man");
//        user.setType("student");
        userMapper.insertSelective(user);
//        Assert.assertEquals(users.size(),3);
    }
}
