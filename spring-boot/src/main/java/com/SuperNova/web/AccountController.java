package com.SuperNova.web;

import com.SuperNova.core.ProjectConstant;
import com.SuperNova.core.Result;
import com.SuperNova.core.ResultGenerator;
import com.SuperNova.model.User;
import com.SuperNova.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Resource
    private UserService userService;

    /**
     * 仅用于测试调试
     * @return
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/hello")
    public Result hello() {
        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public Result login(@RequestParam String u_id,
                        @RequestParam String password){

        //检查是否正确
        if(u_id==null||!userService.idExist(u_id)){
            return ResultGenerator.genFailResult("用户id不存在");
        }
        String data = userService.login(u_id,password);

        if(data.equals("-1")){
            return ResultGenerator.genFailResult("密码错误");
        }

        //正确则生成token，user对象，与imageURL
        Result result = ResultGenerator.genSuccessResult(data);
        result.setMessage(userService.getToken(u_id));
        return result;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchId")
    public Result searchId(@RequestParam String u_id){

        //检查是否正确
        if(u_id==null||userService.idExist(u_id)){
            return ResultGenerator.genFailResult("学号已存在");
        }

        return ResultGenerator.genSuccessResult("学号可用");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public Result register(@RequestParam String u_id,
                           @RequestParam String u_name,
                           @RequestParam String gender,
                           @RequestParam String password,
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
        data.put("image", ProjectConstant.WEB_IMG_BASE+imgURL);

        return result.setMessage(userService.getToken(u_id)).setData(data);
    }
}
