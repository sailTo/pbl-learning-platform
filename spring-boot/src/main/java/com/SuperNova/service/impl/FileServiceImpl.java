package com.SuperNova.service.impl;

import com.SuperNova.core.FileUtil;
import com.SuperNova.core.ProjectConstant;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.File;
import com.SuperNova.service.FileService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

    @Override
    public List<File> searchFiles(int p_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        return fileMapper.select(tmp);
    }

    @Override
    public File getFile(int p_id, int f_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        tmp.setF_id(f_id);
        return fileMapper.selectByPrimaryKey(tmp);
    }

    @Override
    public File addFile(File file) {
        int maxId = fileMapper.searchMaxId(file.getP_id());
        file.setF_id(maxId+1);
        file.setFile_URL(ProjectConstant.File_BASE+file.getP_id()+"\\"+getFileStorageName(file));
        fileMapper.createFile(file);
        return file;
    }

    @Override
    public void deleteFile(int p_id, int f_id) {
        File tmp = new File();
        tmp.setP_id(p_id);
        tmp.setF_id(f_id);

        //删除数据库中的信息
        fileMapper.delete(tmp);
        //删除磁盘中存储的文件
        FileUtil.deleteStorageFile(ProjectConstant.File_BASE+p_id+"\\"+getFileStorageName(tmp));
    }

    @Override
    public boolean saveFile(MultipartFile file,File fileObj) {
        return FileUtil.storageFile(file,fileObj.getP_id(),getFileStorageName(fileObj));
    }

    @Override
    public String getImageURL(MultipartFile image, String u_id) {
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
    public boolean saveImage(MultipartFile image,String imageName,String dir) {
        return FileUtil.storageImage(image,imageName,dir);
    }

    @Override
    public boolean downloadFile(File file, HttpServletResponse response) {
        return FileUtil.downloadFile(response,file.getP_id(),getFileStorageName(file),file.getF_name());
    }

    private String getFileStorageName(File file){
        return file.getF_id()+".file";
    }

}
