package com.nacos.pbl;


import com.nacos.core.Service;
import com.nacos.entity.File;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
public interface FileService extends Service<File> {
    /**
     * 搜索所有文件
     * @param p_id
     * @return
     */
    List<File> searchFiles(int p_id);

    /**
     * 从数据库中新建文件相关信息
     * @param file
     * @return json序列化的file对象
     */
    File addFile(File file);

    /**
     * 获得file对象
     * @param p_id
     * @param f_id
     * @return
     */
    File getFile(int p_id, int f_id);

    /**
     * 从数据库与磁盘中删除文件
     * @param p_id
     * @param f_id
     */
    void deleteFile(int p_id, int f_id);

    /**
     * 通过u_id和上传文件后缀生成存储用户头像的文件名，如17302010025.jpg
     * 图像文件后缀仅支持jpg,jpeg,png,gif
     * @param image
     * @param u_id
     * @return
     */
    String getImageURL(MultipartFile image, String u_id);

    /**
     * 保存上传的图片
     * @param image
     * @param imageName
     * @param dir
     * @return True : 上传成功
     *         False: 上传失败
     */
    boolean saveImage(MultipartFile image, String imageName, String dir);

    /**
     * 保存上传的文件
     * @param file
     * @param fileObj
     * @return True : 上传成功
     *         False: 上传失败
     */
    boolean saveFile(MultipartFile file, File fileObj);

    /**
     * 下载文件
     * @param file
     * @param response
     * @return
     */
    boolean downloadFile(File file, HttpServletResponse response);


}
