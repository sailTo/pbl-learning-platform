package com.nacos.service;


import com.nacos.core.Service;
import jdk.nashorn.internal.ir.Assignment;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Created by Chongli on 2020/05/14.
 */
@FeignClient(name = "assignment-service",path = "/assignment")
public interface AssignmentService {


    /**
     * 搜索项目中指定学生的任务的完成情况
     * @param p_id
     * @param u_id
     * @return
     */
    @RequestMapping("/countAssignmentDoneByUidAndPid")
     int countAssignmentDoneByUidAndPid(@RequestParam("p_id") int p_id,@RequestParam("u_id") String u_id);


}
