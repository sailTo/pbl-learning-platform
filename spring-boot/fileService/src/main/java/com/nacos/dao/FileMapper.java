package com.nacos.dao;


import com.nacos.core.Mapper;
import com.nacos.entity.File;



public interface FileMapper extends Mapper<File>{

    /**
     * 搜索文件的最大id，用于存储下一个文件(maxid+1.xxx),如果没有则返回0
     * @param p_id
     * @return
     */
    int searchMaxId(int p_id);

    /**
     * 新建文件
     * @param file
     * @return f_id
     */
    void createFile(File file);

}