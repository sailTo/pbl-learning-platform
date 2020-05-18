package com.SuperNova.service;
import com.SuperNova.model.File;
import com.SuperNova.core.Service;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
public interface FileService extends Service<File> {
    /**
     * 搜索所有文件
     * @param p_id
     * @return
     */
    String searchFiles(int p_id);

    /**
     * 新建文件
     * @param file
     * @return
     */
    void createFile(File file);

    /**
     * 删除文件
     * @param p_id
     * @param f_id
     */
    void deleteFile(int p_id,int f_id);
}
