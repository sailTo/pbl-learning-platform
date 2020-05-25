package com.SuperNova;

import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.User;
import com.SuperNova.service.CourseService;
import com.SuperNova.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class UserTest extends Tester{
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
        List<User> users = userMapper.selectAll();
        Assert.assertEquals(users.size(),3);
    }

    @Test
    public void test3(){
        String users = userService.getAllUser();
        Assert.assertEquals(users,3);
    }

    @Test
    public void test4(){
        User user = new User();
        user.setu_id("t002");
        user.setu_name("teacher_test");
        user.setType("teacher");
        user.setPassword("123456");
        user.setDescription("empty");
        user.setImage(false);
        user.setGender("man");
//        user.setType("student");
        userMapper.insertSelective(user);
//        Assert.assertEquals(users.size(),3);
    }
}
