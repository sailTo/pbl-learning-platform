package com.nacos.pbl.impl;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.AbstractService;
import com.nacos.core.FileUtil;
import com.nacos.core.ProjectConstant;
import com.nacos.dao.UserMapper;
import com.nacos.entity.User;
import com.nacos.pbl.EncryptService;
import com.nacos.pbl.FileService;
import com.nacos.pbl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
@RestController
@RequestMapping("/user")
public class UserServiceImpl extends AbstractService<User> implements UserService {

    @Resource
    private UserMapper userMapper;
    @Autowired
    private EncryptService encryptService;
    @Autowired
    private FileService fileService;

    @Override
    @RequestMapping("/idLogin")
    public boolean idLogin(@RequestParam("uId") String uId) {
        User user = userMapper.selectByPrimaryKey(uId);
        return user.getStatus();
    }

    /**
     * 通过uId获得token
     * @param uId
     * @return
     */
    @Override
    @RequestMapping("/getToken")
    public String getToken(@RequestParam("uId") String uId){
        User user = userMapper.selectByPrimaryKey(uId);
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
    @RequestMapping("/checkToken")
    public boolean checkToken(@RequestParam("token") String token){
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
            User user = userMapper.selectByPrimaryKey(uId);
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
    @RequestMapping("/getUIdByToken")
    public String getUIdByToken(@RequestParam("token") String token) {
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
    @RequestMapping("/login")
    public User login(@RequestParam("uId") String uId,@RequestParam("Password") String Password) {

        User user = userMapper.selectByPrimaryKey(uId);

        if(user.getPassword().equals(Password)){
            return user;
        }
        else return null;
    }

    @Override
    @RequestMapping("/idExist")
    public boolean idExist(@RequestParam("uId") String uId) {
        return userMapper.idExist(uId);
    }

    @Override
    @RequestMapping("/register")
    public void register(@RequestParam("user") User user) {
        userMapper.insertSelective(user);
    }

    @Override
    @RequestMapping("/setUser")
    public void setUser(@RequestParam("user") User user) {
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    @RequestMapping("/setImage")
    public String setImage(@RequestParam("uId") String uId,@RequestParam(value = "image",required = false) MultipartFile image) {
        User user = userMapper.selectByPrimaryKey(uId);

        String imgURL;
        if(image==null){
            imgURL = ProjectConstant.WEB_IMG_BASE+ProjectConstant.DEAFULT_IMAGE;
        }else{
            imgURL = fileService.getImageURL(image,uId);
            fileService.saveImage(image,imgURL,ProjectConstant.IMG_BASE);
            imgURL = ProjectConstant.WEB_IMG_BASE+imgURL;
        }

        user.setImage(imgURL);
        userMapper.updateByPrimaryKeySelective(user);
        return imgURL;
    }

    @Override
    @RequestMapping("/getImageURL")
    public String getImageURL(@RequestParam("uId") String uId) {
        User user = userMapper.selectByPrimaryKey(uId);
        return user.getImage();
    }

    @Override
    @RequestMapping("/deleteImage")
    public void deleteImage(@RequestParam("user") User user) {
        String imagePath = user.getImage();
        if(!imagePath.equals(ProjectConstant.WEB_IMG_BASE+ProjectConstant.DEAFULT_IMAGE)){
            imagePath = imagePath.substring(imagePath.lastIndexOf('/')+1);
            FileUtil.deleteStorageFile(ProjectConstant.IMG_BASE+imagePath);
        }
    }

    @Override
    @RequestMapping("/searchUser")
    public User searchUser(@RequestParam("uId") String uId) {
        return userMapper.selectByPrimaryKey(uId);
    }

    @Override
    @RequestMapping("/getAllUser")
    public List<User> getAllUser() {
        return userMapper.selectAll();
    }

    @Override
    @RequestMapping("/getAllTeachers")
    public List<User> getAllTeachers() {
        User tmp = new User();
        tmp.setType("teacher");
        tmp.setStatus(true);
        return userMapper.select(tmp);
    }
}
