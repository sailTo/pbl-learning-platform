package com.SuperNova.web;

import com.SuperNova.core.Result;
import com.SuperNova.core.ResultCode;
import com.SuperNova.core.ResultGenerator;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class APIController {

    @PostMapping("/hello")
    public Result hello() {
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/login")
    public Result login(@RequestParam String u_id,
                        @RequestParam String password){

        //检查是否正确

        //正确则生成token，user对象，与imageURL
        String data = "tokenxxxx";

        Result result = ResultGenerator.genSuccessResult(data);

        result.setMessage("12345_5000_AB2DC");

        return result;
    }

    @GetMapping("/searchId")
    public Result searchId(@RequestParam String u_id){
        Result result = ResultGenerator.genSuccessResult();

        //search Id

        //如果学号已存在，则设置code为208
        result.setCode(ResultCode.FAIL);

        return result;
    }

    @PostMapping("/register")
    public Result register(@RequestParam String u_id,
                           @RequestParam String u_name,
                           @RequestParam String gender,
                           @RequestParam String password,
                           @RequestParam(required = false) String description,
                           @RequestParam(required = false) MultipartFile image){
        Result result = ResultGenerator.genSuccessResult();

        //检查用户名是否存在

        //如果不存在则新建用户，否则设置错误码并报错

        //新建成功后记得检查是否上传头像，是否设置描述
        if(image==null){

        }else{

        }


        return result;
    }

    @GetMapping("/searchMyCourses")
    public Result searchMyCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchMyInformation")
    public Result searchMyInformation(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeMyImage")
    public Result changeMyImage(@RequestParam String pbl_token,
                                @RequestParam(required = false) MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeMyInformation")
    public Result changeMyInformation(@RequestParam String pbl_token,
                                      @RequestParam String content,
                                      @RequestParam(required = false) MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchOtherCourses")
    public Result searchOtherCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchAllCourses")
    public Result searchAllCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeCourseStatus")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam Integer c_id,
                                     @RequestParam String status) {

        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeCourse")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam String course) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/addCourse")
    public Result addCourse(@RequestParam String pbl_token,
                            @RequestParam String course,
                            @RequestParam MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/joinCourse")
    public Result joinCourse(@RequestParam String pbl_token,
                             @RequestParam String s_id,
                             @RequestParam Integer c_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchProject")
    public Result searchProject(@RequestParam String pbl_token,
                                @RequestParam Integer c_id) {


        return ResultGenerator.genSuccessResult();
    }


    @PostMapping("/createProject")
    public Result createProject(@RequestParam String pbl_token,
                                @RequestParam String project,
                                @RequestParam String grades) {


        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/deleteProject")
    public Result deleteProject(@RequestParam String pbl_token,
                                @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchProjectGradeSystem")
    public Result searchProjectGradeSystem(@RequestParam String pbl_token,
                                           @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchAssignment")
    public Result searchAssignment(@RequestParam String pbl_token,
                                   @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchAssignmentDone")
    public Result searchAssignmentDone(@RequestParam String pbl_token,
                                       @RequestParam Integer p_id,
                                       @RequestParam Integer a_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/createAssignment")
    public Result createAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeAssignment")
    public Result changeAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {


        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/deleteAssignment")
    public Result deleteAssignment(@RequestParam String pbl_token,
                                   @RequestParam Integer a_id,
                                   @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/urgeAssignment")
    public Result urgeAssignment(@RequestParam String pbl_token,
                                 @RequestParam Integer a_id,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/countDone")
    public Result countDone(@RequestParam String pbl_token,
                            @RequestParam Integer p_id) {

        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchGroupers")
    public Result searchGroupers(@RequestParam String pbl_token,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchEvaluateBySelf")
    public Result searchEvaluateBySelf(@RequestParam String pbl_token, @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/evaluateSelf")
    public Result evaluateSelf(@RequestParam String pbl_token,
                               @RequestParam Integer p_id,
                               @RequestParam Double grade){


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchEvaluateByOther")
    public Result searchEvaluateByOther(@RequestParam String pbl_token,
                                        @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/evaluateOther")
    public Result evaluateOther(@RequestParam String pbl_token,
                                @RequestParam Integer p_id,
                                @RequestParam Integer u_id,
                                @RequestParam Double grade) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchEvaluateByTeacher")
    public Result searchEvaluateByTeacher(@RequestParam String pbl_token,
                                          @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchGrade")
    public Result searchGrade(@RequestParam String pbl_token,
                              @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchDiscussions")
    public Result searchDiscussions(@RequestParam String pbl_token,
                                    @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/createDiscussion")
    public Result createDiscussion(@RequestParam String pbl_token,
                                   @RequestParam String discussion) {


        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/deleteDiscussion")
    public Result deleteDiscussion(@RequestParam String pbl_token, @RequestParam String discussion) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchReply")
    public Result searchReply(@RequestParam String pbl_token,
                              @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/createReply")
    public Result createReply(@RequestParam String pbl_token,
                              @RequestParam String reply) {


        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/deleteReply")
    public Result deleteReply(@RequestParam String pbl_token,
                              @RequestParam Integer r_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchAllFiles")
    public Result searchAllFiles(@RequestParam String pbl_token,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/uploadFile")
    public Result uploadFile(@RequestParam String pbl_token,
                             @RequestParam String f_name,
                             @RequestParam Integer p_id,
                             @RequestParam MultipartFile file,
                             @RequestParam String description) {

        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/deleteFile")
    public Result deleteFile(@RequestParam String pbl_token,
                             @RequestParam Integer f_id,
                             @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/countAssignmentDone")
    public Result countAssignmentDone(@RequestParam String pbl_token,
                                      @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/countDiscussion")
    public Result countDiscussion(@RequestParam String pbl_token,
                                  @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/getGradeItems")
    public Result getGradeItems(@RequestParam String pbl_token,
                                @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/evaluateByTeacher")
    public Result evaluateByTeacher(@RequestParam String pbl_token,
                                    @RequestParam Integer p_id,
                                    @RequestParam String s_id,
                                    @RequestParam String grade) {

        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/searchAllUsers")
    public Result searchAllUsers(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeImage")
    public Result changeImage(@RequestParam String pbl_token,
                              @RequestParam String u_id,
                              @RequestParam(required = false) MultipartFile image) {

        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/changeInformation")
    public Result changeInformation(@RequestParam String pbl_token,
                                    @RequestParam String user){

        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/addUser")
    public Result addUser(@RequestParam String pbl_token,
                          @RequestParam String user,
                          @RequestParam String password,
                          @RequestParam(required = false) MultipartFile image) {

        return ResultGenerator.genSuccessResult();
    }

}
