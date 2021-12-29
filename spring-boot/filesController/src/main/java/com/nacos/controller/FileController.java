package com.nacos.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.nacos.core.Result;
import com.nacos.core.ResultCode;
import com.nacos.core.ResultGenerator;
import com.nacos.entity.File;
import com.nacos.service.FileService;
import com.nacos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/fileController")
public class FileController {

    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @GetMapping("/searchAllFiles")
    public Result searchAllFiles(@RequestParam String pbl_token,
                                 @RequestParam String p_id) {
        return ResultGenerator.genSuccessResult(fileService.searchFiles(Integer.parseInt(p_id)));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/uploadFile")
    public Result uploadFile(@RequestParam String pbl_token,
                             @RequestParam String f_name,
                             @RequestParam String p_id,
                             @RequestParam MultipartFile file,
                             @RequestParam String description) {
        File fileObj = new File();
        fileObj.setF_name(f_name);
        fileObj.setP_id(Integer.parseInt(p_id));
        fileObj.setDescription(description);
        fileObj.setU_id(userService.getUIdByToken(pbl_token));

        //数据库中添加文件
        fileObj=fileService.addFile(fileObj);
        //磁盘中保留文件
        fileService.saveFile(file,fileObj);
        JSONObject data = new JSONObject();
        data.put("file",fileObj);
        return ResultGenerator.genSuccessResult(data).setMessage("上传文件成功");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteFile")
    public Result deleteFile(@RequestParam String pbl_token,
                             @RequestParam String f_id,
                             @RequestParam String p_id) {
        fileService.deleteFile(Integer.parseInt(p_id),Integer.parseInt(f_id));
        return ResultGenerator.genSuccessResult().setMessage("删除成功");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/downloadFile")
    public Result downloadFile(@RequestParam String pbl_token,
                               @RequestParam String p_id,
                               @RequestParam String f_id,
                               HttpServletResponse response) {
        File file = fileService.getFile(Integer.parseInt(p_id),Integer.parseInt(f_id));
        if(file==null){
            return ResultGenerator.genFailResult("文件不存在！");
        }

        if(!fileService.downloadFile(file,response)){
            return ResultGenerator.genFailResult("文件下载失败！");
        }

        return ResultGenerator.genSuccessResult().setMessage("文件下载成功！");
    }

}
