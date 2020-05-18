package com.SuperNova.dao;

import com.SuperNova.core.Mapper;
import com.SuperNova.model.File;

import java.util.List;

public interface FileMapper extends Mapper<File> {
    /**
     * 搜索所有文件
     * @param p_id
     * @return
     */
    List<File> searchFiles(int p_id);

    /**
     * 搜索文件的最大id，用于存储下一个文件(maxid+1.xxx)
     * @param p_id
     * @return
     */
    int searchMaxId(int p_id);

    /**
     * 新建文件
     * @param file
     * @return f
     */
    void createFile(File file);

    /**
     * 删除文件
     * @param p_id
     * @param f_id
     */
    void deleteFile(int p_id,int f_id);
}