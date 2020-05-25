package com.SuperNova.service.impl;

import com.SuperNova.core.ProjectConstant;
import com.SuperNova.core.ResultGenerator;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.File;
import com.SuperNova.service.FileService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.UUID;


/**
 * Created by Chongli on 2020/05/14.
 */
@Service
@Transactional
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

    @Override
    public String searchFiles(int p_id) {
        File tmp = new File();
        tmp.setp_id(p_id);
        return JSON.toJSONString(fileMapper.select(tmp));
    }

    @Override
    public String addFile(File file) {
        int f_id = fileMapper.insertSelective(file);
        file.setf_id(f_id);
        return JSON.toJSONString(file);
    }

    @Override
    public void deleteFile(int p_id, int f_id) {
        File tmp = new File();
        tmp.setp_id(p_id);
        tmp.setf_id(f_id);
        fileMapper.delete(tmp);
    }

    @Override
    public boolean saveFile(MultipartFile file) {
        try {
            if(file==null){
                return false;
            }

            String fileName = file.getOriginalFilename();

            java.io.File targetFile = new java.io.File(ProjectConstant.File_BASE, fileName);
            if(!targetFile.getParentFile().exists()){ //注意，判断父级路径是否存在
                targetFile.getParentFile().mkdirs();
            }
            //保存
            file.transferTo(targetFile);
            return true;
        } catch (Exception e) {
            System.out.println("上传文件异常");
            System.out.println(e.toString());
            return false;
        }
    }


    @Override
    public boolean saveImage(MultipartFile image,String imageName) {
        try {
            if(image==null){
                return false;
            }

            String suffix = image.getContentType().toLowerCase();//图片后缀，用以识别哪种格式数据
            suffix = suffix.substring(suffix.lastIndexOf("/")+1);

            if(suffix.equals("jpg") || suffix.equals("jpeg") || suffix.equals("png") || suffix.equals("gif")) {

                java.io.File targetFile = new java.io.File(ProjectConstant.IMG_BASE, imageName);
                if(!targetFile.getParentFile().exists()){ //注意，判断父级路径是否存在
                    targetFile.getParentFile().mkdirs();
                }

                //保存
                image.transferTo(targetFile);

                return true;
            }

            return false;
        } catch (Exception e) {
            System.out.println("上传图片异常");
            System.out.println(e.toString());
            return false;
        }
    }
}
