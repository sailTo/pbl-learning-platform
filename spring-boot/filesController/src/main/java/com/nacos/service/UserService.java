package com.nacos.service;


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


}
