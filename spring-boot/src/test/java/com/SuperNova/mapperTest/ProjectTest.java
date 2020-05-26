package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.dao.ProjectMapper;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class ProjectTest extends Tester {
    @Resource
    private ProjectMapper projectMapper;
    @Test
//    @Rollback(false)
    public void test1(){
        int result = projectMapper.countDone(1);
        Assert.assertEquals(1,result);
    }
}
