package com.SuperNova.mapperTest;

import com.SuperNova.Tester;
import com.SuperNova.dao.CourseMapper;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.Course;
import com.SuperNova.model.File;
import org.junit.Assert;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class FileTest extends Tester {
    @Resource
    private FileMapper fileMapper;
    @Test
    public void test1(){
        int result = fileMapper.searchMaxId(1);
        Assert.assertEquals(2,result);
    }
    @Test
    public void test2(){
        File file = new File();
        file.setP_id(1);
        file.setU_id("s001");
        file.setF_name("tmp");
        file.setFile_URL("tmp");
        file.setDescription("tmp");
        fileMapper.createFile(file);
        Assert.assertEquals(5,(int)file.getF_id());
    }
}
