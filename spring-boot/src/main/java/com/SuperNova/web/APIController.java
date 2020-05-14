package com.SuperNova.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.SuperNova.core.Result;
import com.SuperNova.core.ResultGenerator;

@RestController
@RequestMapping("/api")
public class APIController {

    @PostMapping("/hello")
    public Result hello() {
        return ResultGenerator.genSuccessResult();
    }
}
