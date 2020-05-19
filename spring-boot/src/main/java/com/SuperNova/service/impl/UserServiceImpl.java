package com.SuperNova.service.impl;

import com.SuperNova.core.ProjectConstant;
import com.SuperNova.dao.UserMapper;
import com.SuperNova.model.User;
import com.SuperNova.service.EncryptService;
import com.SuperNova.service.UserService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {
    @Resource
    private UserMapper userMapper;
    @Resource
    private EncryptService encryptService;

    /**
     * 通过uId获得token
     * @param uId
     * @return
     */
    public String getToken(String uId){
        User user = userMapper.getUser(uId);
        String password = user.getPassword();
        String token = uId+"_"+System.currentTimeMillis()+"_"+password.substring(password.length()-5);
        String ret;
        try{
            ret = encryptService.encrypt(token);
        }catch (Exception e){
            System.out.println("Token加密失败");
            System.out.println(e.toString());
            ret = token;
        }
        return ret;
    }

    /**
     * 检查token是否正确
     * @param token
     * @return
     */
    @Override
    public boolean checkToken(String token){
        String str;

        try{
            str = encryptService.decrypt(token);
        }catch (Exception e){
            System.out.println("Token解密失败");
            System.out.println(e.toString());
            return false;
        }

        if(str.length()<=7){
            return false;
        }

        String p5 = str.substring(str.length()-5);
        str = str.substring(0,str.length()-6);
        int index = str.lastIndexOf("_");

        if(index==-1){
            return false;
        }

        String uId = str.substring(0,index);
        if(!userMapper.idExist(uId)){
            return false;
        }else{
            User user = userMapper.getUser(uId);
            String password = user.getPassword();
            password = password.substring(password.length()-5);
            if(!password.equals(p5)){
                return false;
            }
        }

        String time = str.substring(index+1);

        long currentTime = System.currentTimeMillis();
        long frontTime;
        try {
             frontTime = Long.parseLong(time);
        }catch (Exception e){
            System.out.println("时间格式错误");
            System.out.println(e.toString());
            return false;
        }

        //如果时间超过或在2小时以前则错误
        if(frontTime>currentTime||frontTime<currentTime-7200000){
            return false;
        }

        return true;
    }

    @Override
    public String getUIdByToken(String token) {
        String str;

        try{
            str = encryptService.decrypt(token);
        }catch (Exception e){
            System.out.println("Token解密失败");
            System.out.println(e.toString());
            return null;
        }

        if(str.length()<=7){
            return null;
        }

        str = str.substring(0,str.length()-6);
        int index = str.lastIndexOf("_");

        if(index==-1){
            return null;
        }

        return str.substring(0,index);
    }

    @Override
    public String login(String uId, String Password) {
        if(!userMapper.idExist(uId)){
            return "-1";
        }

        User user = userMapper.getUser(uId);

        if(user.getPassword().equals(Password)){
            return getToken(uId);
        }

        return "-1";
    }

    @Override
    public boolean idExist(String uId) {
        return userMapper.idExist(uId);
    }

    @Override
    public void register(User user) {
        userMapper.addUser(user);
    }

    @Override
    public void setUser(User user) {
        userMapper.setUser(user);
    }

    @Override
    public void setImage(String uId, boolean defaultOrNot) {
        User user = userMapper.getUser(uId);
        user.setImage(defaultOrNot);
        userMapper.setUser(user);
    }

    @Override
    public String getImageURL(String uId) {
        User user = userMapper.getUser(uId);
        if(!user.getImage()){
            return ProjectConstant.DEAFULT_IMAGE;
        }
        return uId+".jpg";
    }

    @Override
    public User searchUser(String uId) {
        return userMapper.getUser(uId);
    }

    @Override
    public String getAllUser() {
        List<User> users = userMapper.getAllUser();
        return JSON.toJSONString(users);
    }
}
