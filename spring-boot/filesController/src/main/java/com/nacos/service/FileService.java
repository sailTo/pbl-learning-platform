package com.nacos.service;



import com.nacos.entity.File;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;


@FeignClient(name = "file-service",path = "/file")
public interface FileService {
    /**
     * 搜索所有文件
     * @param p_id
     * @return
     */
    @RequestMapping("/searchFiles")
    List<File> searchFiles(@RequestParam("p_id")  int p_id);

    /**
     * 从数据库中新建文件相关信息
     * @param file
     * @return json序列化的file对象
     */
    @RequestMapping("/addFile")
    File addFile(@RequestParam("file") File file);

    /**
     * 获得file对象
     * @param p_id
     * @param f_id
     * @return
     */
    @RequestMapping("/getFile")
    File getFile(@RequestParam("p_id") int p_id, @RequestParam("f_id") int f_id);

    /**
     * 从数据库与磁盘中删除文件
     * @param p_id
     * @param f_id
     */
    @RequestMapping("/deleteFile")
    void deleteFile(@RequestParam("p_id") int p_id,@RequestParam("f_id") int f_id);

    /**
     * 通过u_id和上传文件后缀生成存储用户头像的文件名，如17302010025.jpg
     * 图像文件后缀仅支持jpg,jpeg,png,gif
     * @param image
     * @param u_id
     * @return
     */
    @RequestMapping("/getImageURL")
    String getImageURL(@RequestParam("image") MultipartFile image,@RequestParam("u_id") String u_id);

    /**
     * 保存上传的图片
     * @param image
     * @param imageName
     * @param dir
     * @return True : 上传成功
     *         False: 上传失败
     */
    @RequestMapping("/saveImage")
    boolean saveImage(@RequestParam("image")  MultipartFile image,@RequestParam("imageName") String imageName,@RequestParam("dir") String dir);

    /**
     * 保存上传的文件
     * @param file
     * @param fileObj
     * @return True : 上传成功
     *         False: 上传失败
     */
    @RequestMapping("/saveFile")
    boolean saveFile(@RequestParam("file") MultipartFile file,@RequestParam("fileObj") File fileObj);

    /**
     * 下载文件
     * @param file
     * @param response
     * @return
     */
    @RequestMapping("/downloadFile")
    boolean downloadFile(@RequestParam("file") File file, HttpServletResponse response);
}
