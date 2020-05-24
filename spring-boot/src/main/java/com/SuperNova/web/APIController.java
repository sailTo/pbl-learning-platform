package com.SuperNova.web;

import com.SuperNova.core.Result;
import com.SuperNova.core.ResultCode;
import com.SuperNova.core.ResultGenerator;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class APIController {

    @CrossOrigin(origins = "*")
    @GetMapping("/searchMyCourses")
    public Result searchMyCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchMyInformation")
    public Result searchMyInformation(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeMyImage")
    public Result changeMyImage(@RequestParam String pbl_token,
                                @RequestParam(required = false) MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeMyInformation")
    public Result changeMyInformation(@RequestParam String pbl_token,
                                      @RequestParam String content,
                                      @RequestParam(required = false) MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchOtherCourses")
    public Result searchOtherCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllCourses")
    public Result searchAllCourses(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeCourseStatus")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam Integer c_id,
                                     @RequestParam String status) {

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeCourse")
    public Result changeCourseStatus(@RequestParam String pbl_token,
                                     @RequestParam String course) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addCourse")
    public Result addCourse(@RequestParam String pbl_token,
                            @RequestParam String course,
                            @RequestParam MultipartFile image) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/joinCourse")
    public Result joinCourse(@RequestParam String pbl_token,
                             @RequestParam String s_id,
                             @RequestParam Integer c_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchProject")
    public Result searchProject(@RequestParam String pbl_token,
                                @RequestParam Integer c_id) {


        return ResultGenerator.genSuccessResult();
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/createProject")
    public Result createProject(@RequestParam String pbl_token,
                                @RequestParam String project,
                                @RequestParam String grades) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteProject")
    public Result deleteProject(@RequestParam String pbl_token,
                                @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchProjectGradeSystem")
    public Result searchProjectGradeSystem(@RequestParam String pbl_token,
                                           @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAssignment")
    public Result searchAssignment(@RequestParam String pbl_token,
                                   @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAssignmentDone")
    public Result searchAssignmentDone(@RequestParam String pbl_token,
                                       @RequestParam Integer p_id,
                                       @RequestParam Integer a_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createAssignment")
    public Result createAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeAssignment")
    public Result changeAssignment(@RequestParam String pbl_token,
                                   @RequestParam String assignment) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteAssignment")
    public Result deleteAssignment(@RequestParam String pbl_token,
                                   @RequestParam Integer a_id,
                                   @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/urgeAssignment")
    public Result urgeAssignment(@RequestParam String pbl_token,
                                 @RequestParam Integer a_id,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countDone")
    public Result countDone(@RequestParam String pbl_token,
                            @RequestParam Integer p_id) {

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchGroupers")
    public Result searchGroupers(@RequestParam String pbl_token,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateBySelf")
    public Result searchEvaluateBySelf(@RequestParam String pbl_token, @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateSelf")
    public Result evaluateSelf(@RequestParam String pbl_token,
                               @RequestParam Integer p_id,
                               @RequestParam Double grade){


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateByOther")
    public Result searchEvaluateByOther(@RequestParam String pbl_token,
                                        @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateOther")
    public Result evaluateOther(@RequestParam String pbl_token,
                                @RequestParam Integer p_id,
                                @RequestParam Integer u_id,
                                @RequestParam Double grade) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchEvaluateByTeacher")
    public Result searchEvaluateByTeacher(@RequestParam String pbl_token,
                                          @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchGrade")
    public Result searchGrade(@RequestParam String pbl_token,
                              @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchDiscussions")
    public Result searchDiscussions(@RequestParam String pbl_token,
                                    @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createDiscussion")
    public Result createDiscussion(@RequestParam String pbl_token,
                                   @RequestParam String discussion) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteDiscussion")
    public Result deleteDiscussion(@RequestParam String pbl_token, @RequestParam String discussion) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchReply")
    public Result searchReply(@RequestParam String pbl_token,
                              @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createReply")
    public Result createReply(@RequestParam String pbl_token,
                              @RequestParam String reply) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteReply")
    public Result deleteReply(@RequestParam String pbl_token,
                              @RequestParam Integer r_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllFiles")
    public Result searchAllFiles(@RequestParam String pbl_token,
                                 @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/uploadFile")
    public Result uploadFile(@RequestParam String pbl_token,
                             @RequestParam String f_name,
                             @RequestParam Integer p_id,
                             @RequestParam MultipartFile file,
                             @RequestParam String description) {

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteFile")
    public Result deleteFile(@RequestParam String pbl_token,
                             @RequestParam Integer f_id,
                             @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countAssignmentDone")
    public Result countAssignmentDone(@RequestParam String pbl_token,
                                      @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countDiscussion")
    public Result countDiscussion(@RequestParam String pbl_token,
                                  @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getGradeItems")
    public Result getGradeItems(@RequestParam String pbl_token,
                                @RequestParam Integer p_id) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/evaluateByTeacher")
    public Result evaluateByTeacher(@RequestParam String pbl_token,
                                    @RequestParam Integer p_id,
                                    @RequestParam String s_id,
                                    @RequestParam String grade) {

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllUsers")
    public Result searchAllUsers(@RequestParam String pbl_token) {


        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeImage")
    public Result changeImage(@RequestParam String pbl_token,
                              @RequestParam String u_id,
                              @RequestParam(required = false) MultipartFile image) {

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/changeInformation")
    public Result changeInformation(@RequestParam String pbl_token,
                                    @RequestParam String user){

        return ResultGenerator.genSuccessResult();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addUser")
    public Result addUser(@RequestParam String pbl_token,
                          @RequestParam String user,
                          @RequestParam String password,
                          @RequestParam(required = false) MultipartFile image) {

        return ResultGenerator.genSuccessResult();
    }

}
