package com.SuperNova.service.impl;

import com.SuperNova.dao.FileMapper;
import com.SuperNova.model.File;
import com.SuperNova.service.FileService;
import com.SuperNova.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/05/14.
 */
@Service
@Transactional
public class FileServiceImpl extends AbstractService<File> implements FileService {
    @Resource
    private FileMapper fileMapper;

}
