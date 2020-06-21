package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface UserMapper extends Mapper<User> {

    /**
     * 查询id是否存在
     * @param u_id
     * @return
     */
    boolean idExist(String u_id);

}