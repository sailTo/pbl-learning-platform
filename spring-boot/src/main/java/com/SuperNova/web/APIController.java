package com.SuperNova.web;

import org.springframework.web.bind.annotation.*;
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
