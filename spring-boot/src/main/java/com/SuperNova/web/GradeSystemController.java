package com.SuperNova.web;
import com.SuperNova.core.Result;
import com.SuperNova.core.ResultGenerator;
import com.SuperNova.model.GradeSystem;
import com.SuperNova.service.GradeSystemService;
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
@RequestMapping("/grade/system")
public class GradeSystemController {
    @Resource
    private GradeSystemService gradeSystemService;

    @PostMapping("/add")
    public Result add(GradeSystem gradeSystem) {
        gradeSystemService.save(gradeSystem);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        gradeSystemService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(GradeSystem gradeSystem) {
        gradeSystemService.update(gradeSystem);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        GradeSystem gradeSystem = gradeSystemService.findById(id);
        return ResultGenerator.genSuccessResult(gradeSystem);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<GradeSystem> list = gradeSystemService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
