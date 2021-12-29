package com.nacos.service;

import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Service;
import com.nacos.entity.Evaluation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Map;


/**
 * Created by Chongli on 2020/05/14.
 */
@FeignClient(name = "evaluation-service",path = "/evaluation")
public interface EvaluationService  {

    /**
     * 获取学生互评平均分，评分人数，总人数
     * @param p_id
     * @param s_id
     * @return
     */
    @RequestMapping("/searchEvaluateByOther")
    JSONObject searchEvaluateByOther(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id);

    /**
     * 获取学生自评分
     * @param s_id
     * @return
     */
    @RequestMapping("/searchEvaluateBySelf")
    String searchEvaluateBySelf(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id);

    /**
     * 获取学生对其他人评分的结果
     * @param p_id
     * @param s_id
     */
    @RequestMapping("/getMyEvaluate")
    ArrayList<Map<String, String>> getMyEvaluate(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id);

    /**
     * 学生评分，s_id为评价方，u_id为被评价方，若相等则为自评
     * @param p_id
     * @param s_id
     * @param u_id
     * @param grade
     */
    @RequestMapping("/evaluate")
    void evaluate(@RequestParam("p_id") int p_id,@RequestParam("s_id") String s_id,@RequestParam("u_id") String u_id,@RequestParam("grade") double grade);
}
