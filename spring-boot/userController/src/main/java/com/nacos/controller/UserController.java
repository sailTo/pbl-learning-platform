package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultCode;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.User;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/userController")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @GetMapping("/searchMyInformation")
    public Result searchMyInformation(@RequestParam String pbl_token,
                                      @RequestParam String u_id) {
        User user = userService.searchUser(u_id);
        JSONObject data = new JSONObject();
        data.put("content",user);
        data.put("image",userService.getImageURL(u_id));
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeMyImage")
    public Result changeMyImage(@RequestParam String pbl_token,
                                @RequestParam String u_id,
                                @RequestParam(required = false) MultipartFile image) {
        User user = userService.searchUser(u_id);
        userService.deleteImage(user);
        String imgURL = userService.setImage(u_id,image);
        JSONObject data = new JSONObject();
        data.put("image",imgURL);
        return ResultGenerator.genSuccessResult(data).setMessage("修改头像成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeMyInformation")
    public Result changeMyInformation(@RequestParam String pbl_token,
                                      @RequestParam String content) {
        String u_id = userService.getUIdByToken(pbl_token);
        User user = JSON.parseObject(content,User.class);
        userService.setUser(user);
        JSONObject data = new JSONObject();
        data.put("token",userService.getToken(u_id));
        return ResultGenerator.genSuccessResult(data).setMessage("修改个人信息成功");
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/changeMyPassword")
    public Result changeMyPassword(@RequestParam String pbl_token,
                                   @RequestParam String oldPassword,
                                   @RequestParam String newPassword) {
        String u_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(u_id);
        if(!user.getPassword().equals(oldPassword)){
            ResultGenerator.genFailResult("原密码错误").setCode(ResultCode.FAIL);
        }
        user.setPassword(newPassword);
        userService.setUser(user);
        return ResultGenerator.genSuccessResult().setMessage(userService.getToken(u_id));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllTeachers")
    public Result searchAllTeachers(@RequestParam String pbl_token){
        String u_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(u_id);
        if(!user.getType().equals("admin")){
            ResultGenerator.genFailResult("无权限获得教师列表").setCode(ResultCode.FAIL);
        }

        return ResultGenerator.genSuccessResult(userService.getAllTeachers());
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeImage")
    public Result changeImage(@RequestParam String pbl_token,
                              @RequestParam String u_id,
                              @RequestParam(required = false) MultipartFile image) {
        String a_id = userService.getUIdByToken(pbl_token);
        User user = userService.searchUser(a_id);
        if(!user.getType().equals("admin")){
            return ResultGenerator.genFailResult("修改失败");
        }
        userService.deleteImage(user);
        String imgURL = userService.setImage(u_id,image);
        JSONObject data = new JSONObject();
        data.put("image",imgURL);
        return ResultGenerator.genSuccessResult(data).setMessage("修改成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeInformation")
    public Result changeInformation(@RequestParam String pbl_token,
                                    @RequestParam String user){
        String a_id = userService.getUIdByToken(pbl_token);
        User admin = userService.searchUser(a_id);
        if(!admin.getType().equals("admin")){
            return ResultGenerator.genFailResult("修改用户信息失败");
        }

        User userObj = JSON.parseObject(user,User.class);
        userService.setUser(userObj);
        return ResultGenerator.genSuccessResult().setMessage("修改用户信息成功");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addUser")
    public Result addUser(@RequestParam String pbl_token,
                          @RequestParam String user,
                          @RequestParam(required = false) MultipartFile image) {
        String a_id = userService.getUIdByToken(pbl_token);
        User admin = userService.searchUser(a_id);
        if(!admin.getType().equals("admin")){
            return ResultGenerator.genFailResult("添加用户失败");
        }
        User userObj = JSON.parseObject(user,User.class);

        //检查用户名是否存在
        if(userService.idExist(userObj.getU_id())){
            return ResultGenerator.genFailResult("用户名已存在");
        }
        userService.register(userObj);
        String imgURL = userService.setImage(userObj.getU_id(),image);
        JSONObject data = new JSONObject();
        data.put("image",imgURL);
        return ResultGenerator.genSuccessResult().setMessage("添加成功！");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getUserByUid")
    public Result getUserByUid(@RequestParam String pbl_token,
                               @RequestParam String u_id) {
        JSONObject data = new JSONObject();
        data.put("user",userService.findById(u_id));
        return ResultGenerator.genSuccessResult(data);
    }
}
