package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.User;

public interface UserMapper extends Mapper<User> {

    /**
     * 查询id是否存在
     * @param u_id
     * @return
     */
    boolean idExist(String u_id);

}