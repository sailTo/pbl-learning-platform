package com.SuperNova.service.impl;

import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.File;
import com.SuperNova.service.FileService;
import com.SuperNova.core.AbstractService;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


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
}
