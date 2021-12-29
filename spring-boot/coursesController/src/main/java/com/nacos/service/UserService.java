package com.nacos.service;


import com.nacos.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@FeignClient(name = "user-service" ,path = "/user")
public interface UserService {


    /**
     * 通过token获得u_id
     * @param token
     * @return
     */
    @RequestMapping("/getUIdByToken")
    String getUIdByToken(@RequestParam("token") String token);

    /**
     * 查询用户相关信息
     * @param uId
     * @return 保存用户信息的user对象
     */
    @RequestMapping("/searchUser")
    User searchUser(@RequestParam("uId") String uId);

    /**
     * 获得头像的地址
     * @param uId
     * @return
     */
    @RequestMapping("/getImageURL")
    String getImageURL(@RequestParam("uId") String uId);

    /**
     * 删除用户的旧头像(如果default.jpg则不删除)
     * @param user
     */
    @RequestMapping("/deleteImage")
    void deleteImage(@RequestParam("user") User user);

    /**
     * 设置用户的头像
     * @param uId
     * @param image
     */
    @RequestMapping("/setImage")
    String setImage(@RequestParam("uId") String uId,@RequestParam("image") MultipartFile image);

    /**
     * 修改用户的相关信息
     * @param user 保存用户的新信息
     */
    @RequestMapping("/setUser")
    void setUser(@RequestParam("user") User user);


    /**
     * 通过uId获得token
     * @param uId
     * @return
     */
    @RequestMapping("/getToken")
    String getToken(@RequestParam("uId") String uId);


    /**
     * 获得所有教师信息(管理员)
     * @return
     */
    @RequestMapping("/getAllTeachers")
    List<User> getAllTeachers();

}
