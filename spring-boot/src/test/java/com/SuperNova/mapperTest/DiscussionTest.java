package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.CourseMapper;
import com.SuperNova.dao.DiscussionMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.DiscussInformation;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class DiscussionTest extends Tester {
    @Resource
    private DiscussionMapper discussionMapper;
    @Test
//    @Rollback(false)
    public void test1(){
        List<DiscussInformation> result = discussionMapper.countDiscussion(1);
        Assert.assertEquals(2,result.size());
    }
    @Test
    public void test2(){
        int result = discussionMapper.maxDiscussionNum(1);
        Assert.assertEquals(3,result);
    }
}
