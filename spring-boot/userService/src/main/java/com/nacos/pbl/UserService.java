package com.nacos.pbl;

import com.nacos.core.Service;
import com.nacos.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService extends Service<User> {

    /**
     * 通过uId获得token
     * @param uId
     * @return
     */
    String getToken(String uId);

    /**
     * 检查token是否正确
     * @param token
     * @return
     */
    boolean checkToken(String token);

    /**
     * 通过token获得u_id
     * @param token
     * @return
     */
    String getUIdByToken(String token);

    /**
     * 登录，如果成功则返回token，否则返回-1
     * @param uId
     * @param Password
     * @return
     */
    User login(String uId, String Password);

    /**
     * 查询id是否存在
     * @param uId
     * @return
     */
    boolean idExist(String uId);

    /**
     * 查询id是否能够登录
     * @param uId
     * @return
     */
    boolean idLogin(String uId);

    /**
     * 向表中添加新用户
     * @param user 保存新用户相关信息
     */
    void register(User user);

    /**
     * 修改用户的相关信息
     * @param user 保存用户的新信息
     */
    void setUser(User user);

    /**
     * 设置用户的头像
     * @param uId
     * @param image
     */
    String setImage(String uId, MultipartFile image);

    /**
     * 获得头像的地址
     * @param uId
     * @return
     */
    String getImageURL(String uId);

    /**
     * 查询用户相关信息
     * @param uId
     * @return 保存用户信息的user对象
     */
    User searchUser(String uId);

    /**
     * 获得所有用户信息(管理员)
     * User:u_id，type，u_name，gender，description
     * @return
     */
    List<User> getAllUser();

    /**
     * 获得所有教师信息(管理员)
     * @return
     */
    List<User> getAllTeachers();

    /**
     * 删除用户的旧头像(如果default.jpg则不删除)
     * @param user
     */
    void deleteImage(User user);


}
