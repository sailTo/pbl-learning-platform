package com.nacos.pbl.impl;


import com.nacos.core.AbstractService;
import com.nacos.core.FileUtil;
import com.nacos.core.ProjectConstant;
import com.nacos.dao.FileMapper;
import com.nacos.entity.File;
import com.nacos.pbl.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
@RestController
@RequestMapping("/file")
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

    @Override
    @RequestMapping("/searchFiles")
    public List<File> searchFiles(@RequestParam("p_id") int p_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        return fileMapper.select(tmp);
    }

    @Override
    @RequestMapping("/getFile")
    public File getFile(@RequestParam("p_id") int p_id,@RequestParam("f_id") int f_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        tmp.setF_id(f_id);
        return fileMapper.selectByPrimaryKey(tmp);
    }

    @Override
    @RequestMapping("/addFile")
    public File addFile(@RequestParam("file") File file) {
        int maxId = fileMapper.searchMaxId(file.getP_id());
        file.setF_id(maxId+1);
        file.setFile_URL(ProjectConstant.File_BASE+file.getP_id()+"/"+getFileStorageName(file));
        fileMapper.createFile(file);
        return file;
    }

    @Override
    @RequestMapping("/deleteFile")
    public void deleteFile(@RequestParam("p_id") int p_id,@RequestParam("f_id") int f_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        tmp.setF_id(f_id);

        //删除数据库中的信息
        fileMapper.delete(tmp);
        //删除磁盘中存储的文件
        FileUtil.deleteStorageFile(ProjectConstant.File_BASE+p_id+"/"+getFileStorageName(tmp));
    }

    @Override
    @RequestMapping("/saveFile")
    public boolean saveFile(@RequestParam("file") MultipartFile file,@RequestParam("fileObj") File fileObj) {
        return FileUtil.storageFile(file,fileObj.getP_id(),getFileStorageName(fileObj));
    }

    @Override
    @RequestMapping("getImageURL")
    public String getImageURL(@RequestParam("image") MultipartFile image,@RequestParam("u_id") String u_id) {
        try {
            if(image==null){
                return null;
            }

            String suffix = image.getContentType().toLowerCase();//图片后缀，用以识别哪种格式数据
            suffix = suffix.substring(suffix.lastIndexOf("/")+1);

            if(suffix.equals("jpg") || suffix.equals("jpeg") || suffix.equals("png") || suffix.equals("gif")) {
                return u_id+"."+suffix;
            }
        } catch (Exception e) {
            System.out.println("上传图片异常");
            System.out.println(e.toString());
            return null;
        }
        //后缀不合法
        return null;
    }

    @Override
    @RequestMapping("/saveImage")
    public boolean saveImage(@RequestParam("image") MultipartFile image,@RequestParam("imageName") String imageName,@RequestParam("dir") String dir) {
        return FileUtil.storageImage(image,imageName,dir);
    }

    @Override
    @RequestMapping("/downloadFile")
    public boolean downloadFile(@RequestParam("file") File file, HttpServletResponse response) {
        return FileUtil.downloadFile(response,file.getP_id(),getFileStorageName(file),file.getF_name());
    }


    @RequestMapping("/getFileStorageName")
    private String getFileStorageName(@RequestParam("file") File file){
        return file.getF_id()+".file";
    }

}
