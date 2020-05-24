package com.SuperNova.service;
import com.SuperNova.model.File;
import com.SuperNova.core.Service;
import org.springframework.web.multipart.MultipartFile;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface FileService extends Service<File> {
    /**
     * 搜索所有文件
     * @param p_id
     * @return
     */
    String searchFiles(int p_id);

    /**
     * 从数据库中新建文件相关信息
     * @param file
     * @return json序列化的file对象
     */
    String addFile(File file);

    /**
     * 从数据库中删除文件
     * @param p_id
     * @param f_id
     */
    void deleteFile(int p_id,int f_id);

    /**
     * 保存上传的图片
     * @param image
     * @param imageName
     * @return True : 上传成功
     *         False: 上传失败
     */
    boolean saveImage(MultipartFile image,String imageName);

    /**
     * 保存上传的文件
     * @param file
     * @return True : 上传成功
     *         False: 上传失败
     */
    boolean saveFile(MultipartFile file);
}
