package com.SuperNova.core;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class FileUtil {

    /**
     * 删除在服务器上保存的文件，如果不存在则不删除
     * @param filePath
     */
    public static void deleteStorageFile(String filePath){
        File file = new File(filePath);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件:" + filePath + "成功！");
            } else {
                System.out.println("删除单个文件:" + filePath + "失败！");
            }
        } else {
            System.out.println("删除单个文件失败：" + filePath + "不存在！");
        }
    }

    public static boolean storageFile(MultipartFile file,int p_id){
        try {
            if(file==null){
                return false;
            }

            String fileName = file.getOriginalFilename();

            java.io.File targetFile = new java.io.File(ProjectConstant.File_BASE+p_id+"\\", fileName);
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

    public static boolean  storageImage(MultipartFile image,String imageName,String dir){
        try {
            if(image==null){
                return false;
            }

            String suffix = image.getContentType().toLowerCase();//图片后缀，用以识别哪种格式数据
            suffix = suffix.substring(suffix.lastIndexOf("/")+1);

            if(suffix.equals("jpg") || suffix.equals("jpeg") || suffix.equals("png") || suffix.equals("gif")) {

                java.io.File targetFile = new java.io.File(dir, imageName);
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
