package com.nacos.controller;


import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultCode;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.User;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@RestController
@RequestMapping("/accountController")
public class AccountController {

    @Autowired
    private UserService userService;

    /**
     * 仅用于测试调试
     * @return
     */
    @CrossOrigin(origins = "*")
    @PutMapping("/hello")
    public Result hello(@RequestParam String name) {
        return ResultGenerator.genSuccessResult(name);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public Result login(@RequestParam String u_id,
                        @RequestParam String password){

        //检查是否正确
        if(u_id==null||!userService.idExist(u_id)){
            return ResultGenerator.genFailResult("用户id不存在");
        }
        //userService.idLogin(u_id)为true代表能够登录
        if (!userService.idLogin(u_id))
            return ResultGenerator.genFailResult("禁止登录");

        User user= userService.login(u_id,password);

        if(user==null){
            return ResultGenerator.genFailResult("密码错误");
        }

        //正确则生成token，user对象，与imageURL
        String imageURL=userService.getImageURL(u_id);
        JSONObject data=new JSONObject();
        data.put("user",user);
        data.put("imageURL",imageURL);
        Result result = ResultGenerator.genSuccessResult(data);
        result.setMessage(userService.getToken(u_id));
        return result;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchId")
    public Result searchId(@RequestParam String u_id){

        //检查是否正确
        if(u_id==null||userService.idExist(u_id)){
            return ResultGenerator.genFailResult("学号已存在").setCode(ResultCode.DENY);
        }

        return ResultGenerator.genSuccessResult("学号可用");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public Result register(@RequestParam(name = "u_id") String u_id,
                           @RequestParam(name = "u_name") String u_name,
                           @RequestParam(name = "gender") String gender,
                           @RequestParam(name = "password") String password,
                           @RequestParam(required = false) String description,
                           @RequestParam(required = false) MultipartFile image){
        //检查用户名是否存在
        if(u_id==null||userService.idExist(u_id)){
            return ResultGenerator.genFailResult("学号已存在");
        }

        Result result = ResultGenerator.genSuccessResult();
        //如果不存在则新建用户，否则设置错误码并报错
        User user = new User();
        user.setU_id(u_id);
        user.setU_name(u_name);
        user.setGender(gender);
        user.setPassword(password);
        user.setType("student");

        if (description!=null){
            user.setDescription(description);
        }

        userService.register(user);
        String imgURL = userService.setImage(u_id,image);

        JSONObject data = new JSONObject();
        data.put("user",user);
        data.put("image",imgURL);

        return result.setMessage(userService.getToken(u_id)).setData(data);
    }
}
