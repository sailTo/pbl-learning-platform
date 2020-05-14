package com.SuperNova.web;
import com.SuperNova.core.Result;
import com.SuperNova.core.ResultGenerator;
import com.SuperNova.model.StudentCourse;
import com.SuperNova.service.StudentCourseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by CodeGenerator on 2020/05/14.
*/
@RestController
@RequestMapping("/student/course")
public class StudentCourseController {
    @Resource
    private StudentCourseService studentCourseService;

    @PostMapping("/add")
    public Result add(StudentCourse studentCourse) {
        studentCourseService.save(studentCourse);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        studentCourseService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(StudentCourse studentCourse) {
        studentCourseService.update(studentCourse);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        StudentCourse studentCourse = studentCourseService.findById(id);
        return ResultGenerator.genSuccessResult(studentCourse);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<StudentCourse> list = studentCourseService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
