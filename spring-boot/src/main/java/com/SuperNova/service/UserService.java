package com.SuperNova.service;
import com.SuperNova.model.User;
import com.SuperNova.core.Service;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
public interface UserService extends Service<User> {
    /**
     * 登录，如果成功则返回token，否则返回-1
     * @param uId
     * @param Password
     * @return
     */
    String login(String uId,String Password);

    /**
     * 查询id是否存在
     * @param uId
     * @return
     */
    boolean idExist(String uId);

    /**
     * 向表中添加新用户
     * @param user 保存新用户相关信息
     */
    void addUser(User user);

    /**
     * 修改用户的相关信息
     * @param user 保存用户的新信息
     */
    void setUser(User user);

    /**
     * 设置用户的头像
     * @param uId
     */
    void setImage(String uId);

    /**
     * 查询用户相关信息
     * @param uId
     * @return 保存用户信息的user对象
     */
    User searchUser(String uId);



}
