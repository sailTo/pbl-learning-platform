package com.nacos.service;


import com.nacos.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


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



}
