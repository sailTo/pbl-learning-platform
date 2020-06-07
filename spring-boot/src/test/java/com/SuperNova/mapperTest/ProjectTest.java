package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.dao.ProjectMapper;
import com.SuperNova.dao.StudentProjectMapper;
import com.SuperNova.model.StudentProject;
import com.SuperNova.service.ProjectService;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class ProjectTest extends Tester {
    @Resource
    private ProjectMapper projectMapper;
    @Resource
    private StudentProjectMapper studentProjectMapper;
    @Resource
    private ProjectService projectService;

    @Test
//    @Rollback(false)
    public void test1(){
        int result = projectService.searchTotalNum(1);
//        Assert.assertEquals(3,result);
    }
}
