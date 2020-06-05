package com.SuperNova.web;

import com.SuperNova.core.ResultGenerator;
import com.SuperNova.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class VerificationAspect {

    @Resource
    private UserService userService;

    //拦截条件
    @Pointcut("within(com.SuperNova.web.APIController)&!&within(com.SuperNova.web.AccountController)")
    public void log() {}

    @Around("log()")
    public Object signVerification(ProceedingJoinPoint pjp) throws Throwable{

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String token = request.getParameter("pbl_token");

        if(token==null){
            return ResultGenerator.genFailResult("未携带Token!");
        }

        if(userService.checkToken(token)) {//已经登录且有效
            return pjp.proceed();          //继续执行被拦截的方法
        }

        return ResultGenerator.genFailResult("无效的Token!");
    }
}
