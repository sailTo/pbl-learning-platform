package com.SuperNova.web;
import com.SuperNova.core.Result;
import com.SuperNova.core.ResultGenerator;
import com.SuperNova.model.Discussion;
import com.SuperNova.service.DiscussionService;
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
@RequestMapping("/discussion")
public class DiscussionController {
    @Resource
    private DiscussionService discussionService;

    @PostMapping("/add")
    public Result add(Discussion discussion) {
        discussionService.save(discussion);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam Integer id) {
        discussionService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Discussion discussion) {
        discussionService.update(discussion);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Discussion discussion = discussionService.findById(id);
        return ResultGenerator.genSuccessResult(discussion);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Discussion> list = discussionService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
