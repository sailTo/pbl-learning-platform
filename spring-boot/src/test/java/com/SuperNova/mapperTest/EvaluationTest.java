package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.EvaluationMapper;
import com.SuperNova.dao.FileMapper;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;

public class EvaluationTest extends Tester {
    @Resource
    private EvaluationMapper evaluationMapper;
    @Test
//    @Rollback(false)
    public void test1(){
//        double result = evaluationMapper.searchEvaluateByOther(1,"s002");
//        Assert.assertEquals(25,result,0.0001);
    }
}

