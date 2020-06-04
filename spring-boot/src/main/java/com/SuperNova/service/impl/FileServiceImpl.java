package com.SuperNova.service.impl;

import com.SuperNova.core.FileUtil;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.File;
import com.SuperNova.service.FileService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
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
        tmp.setp_id(p_id);
        return fileMapper.select(tmp);
    }

    @Override
    public String addFile(File file) {
        fileMapper.createFile(file);
        return JSON.toJSONString(file);
    }



    @Override
    public void deleteFile(int p_id, int f_id) {
        File tmp = new File();
        tmp.setp_id(p_id);
        tmp.setf_id(f_id);

        List<File> files = fileMapper.select(tmp);
        String file_url = files.get(0).getfile_URL();

        fileMapper.delete(tmp);
    }

    @Override
    public boolean saveFile(MultipartFile file,int p_id) {
        return FileUtil.storageFile(file,p_id);
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
}
