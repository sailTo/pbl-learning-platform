package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.*;
import com.nacos.entity.Course;
import com.nacos.entity.User;
import com.nacos.service.CourseService;
import com.nacos.service.FileService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/coursesController")
public class CoursesController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    @Autowired
    private CourseService courseService;

    @CrossOrigin(origins = "*")
    @GetMapping("/searchMyCourses")
    public Result searchMyCourses(@RequestParam String pbl_token,
                                  @RequestParam String u_id,
                                  @RequestParam String pageIndex,
                                  @RequestParam String pageSize) {
        return ResultGenerator.genSuccessResult(courseService.getMyCourses(u_id,Integer.parseInt(pageIndex),Integer.parseInt(pageSize)));
    }

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
    @GetMapping("/searchOtherCourses")
    public Result searchOtherCourses(@RequestParam String pbl_token,
                                     @RequestParam String pageIndex,
                                     @RequestParam String pageSize) {
        String u_id = userService.getUIdByToken(pbl_token);
        return ResultGenerator.genSuccessResult(courseService.searchOtherCourses(u_id,Integer.parseInt(pageIndex),Integer.parseInt(pageSize)));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllCourses")
    public Result searchAllCourses(@RequestParam String pbl_token,
                                   @RequestParam String pageIndex,
                                   @RequestParam String pageSize) {
        return ResultGenerator.genSuccessResult(courseService.searchAllCourses(Integer.parseInt(pageIndex),Integer.parseInt(pageSize)));
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeCourseStatus")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam String c_id,
                                     @RequestParam String status) {
        courseService.changeCourseStatus(Integer.parseInt(c_id),status);
        return ResultGenerator.genSuccessResult().setMessage("修改成功");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeCourse")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam String course) {
        Course courseObj = JSON.parseObject(course,Course.class);
        courseService.updateCourse(courseObj);
        return ResultGenerator.genSuccessResult().setMessage("修改成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchCourseByCid")
    public Result searchCourseByCid(@RequestParam String pbl_token,
                                    @RequestParam String c_id) {
        Course course = courseService.searchCourseByCid(Integer.parseInt(c_id));
        JSONObject data = new JSONObject();
        data.put("course",course);
        return ResultGenerator.genSuccessResult(data);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addCourse")
    public Result addCourse(@RequestParam String pbl_token,
                            @RequestParam String course,
                            @RequestParam MultipartFile image) {
        Course courseObj = JSON.parseObject(course,Course.class);
        //先添加一个默认的img URL，再利用生成的course id更新img URL
        courseObj.setImage_URL(ProjectConstant.DEAFULT_IMAGE);
        int c_id = courseService.addCourse(courseObj);
        String imgURL = fileService.getImageURL(image,""+c_id);
        FileUtil.storageImage(image,imgURL, ProjectConstant.IMG_BASE+c_id+"/");
        courseObj.setImage_URL(ProjectConstant.WEB_IMG_BASE+c_id+"/"+imgURL);
        courseService.updateCourse(courseObj);

        JSONObject data = new JSONObject();
        data.put("c_id",c_id);
        data.put("image_URL",courseObj.getImage_URL());
        return ResultGenerator.genSuccessResult(data).setMessage("课程创建成功");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/changeCourseWithImg")
    public Result changeCourseWithImg(@RequestParam String pbl_token,
                                      @RequestParam String course,
                                      @RequestParam MultipartFile image) {
        Course courseObj = JSON.parseObject(course, Course.class);
        //先添加一个默认的img URL，再利用生成的course id更新img URL
        courseObj.setImage_URL(ProjectConstant.DEAFULT_IMAGE);
        int c_id = courseObj.getC_id();
        String imgURL = fileService.getImageURL(image,""+c_id);
        FileUtil.storageImage(image,imgURL, ProjectConstant.IMG_BASE+c_id+"/");
        courseObj.setImage_URL(ProjectConstant.WEB_IMG_BASE+c_id+"/"+imgURL);
        courseService.updateCourse(courseObj);

        JSONObject data = new JSONObject();
        data.put("c_id",c_id);
        data.put("image_URL",courseObj.getImage_URL());
        return ResultGenerator.genSuccessResult(data).setMessage("课程更新成功");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/joinCourse")
    public Result joinCourse(@RequestParam String pbl_token,
                             @RequestParam String s_id,
                             @RequestParam String c_id) {
        courseService.joinCourse(Integer.parseInt(c_id),s_id);
        return ResultGenerator.genSuccessResult().setMessage("成功加入课程");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllMyCourses")
    public Result searchAllMyCourses(@RequestParam String pbl_token) {
        String u_id = userService.getUIdByToken(pbl_token);
//        String u_id = "S001";
        return ResultGenerator.genSuccessResult(courseService.searchAllMyCourses(u_id));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllCourses")
    public Result getAllCourses(@RequestParam String pbl_token) {
        String a_id = userService.getUIdByToken(pbl_token);
        User admin = userService.searchUser(a_id);
        if(!admin.getType().equals("admin")){
            return ResultGenerator.genFailResult("权限不够，获取课程失败");
        }
        JSONObject data = new JSONObject();
        data.put("courseList",courseService.findAll());
        return ResultGenerator.genSuccessResult(data);
    }
}
