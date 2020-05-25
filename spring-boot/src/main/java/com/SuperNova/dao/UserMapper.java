package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.User;

import java.util.List;

public interface UserMapper extends Mapper<User> {

//    User getUser(String u_id);
//
//    void setUser(User user);
//
//    void addUser(User user);
//
//    void deleteUser(String u_id);

    /**
     * 查询id是否存在
     * @param u_id
     * @return
     */
    boolean idExist(String u_id);

//    /**
//     * 获得所有用户信息(管理员)
//     * User:u_id，type，u_name，gender，description
//     * @return
//     */
//    List<User> getAllUser();
}