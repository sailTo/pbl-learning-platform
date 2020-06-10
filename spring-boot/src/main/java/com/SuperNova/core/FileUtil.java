package com.SuperNova.core;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

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

    /**
     * 删除文件夹
     * @param dirPath
     */
    public static void deleteStorageDir(String dirPath){
        String[] cmd = new String[] { "/bin/sh", "-c", "rm -rf "+dirPath};
        try{
            Process process = Runtime.getRuntime().exec(cmd);
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public static boolean storageFile(MultipartFile file,int p_id,String fileStorageName){
        try {
            if(file==null){
                return false;
            }

            java.io.File targetFile = new java.io.File(ProjectConstant.File_BASE+p_id+"/", fileStorageName);
            if(!targetFile.getParentFile().exists()){ //注意，判断父级路径是否存在
                targetFile.getParentFile().mkdirs();
            }
            System.out.println("dir:");
            System.out.println(ProjectConstant.File_BASE+p_id+"/");
            System.out.println("filename:");
            System.out.println(fileStorageName);

            targetFile.setWritable(true, false);
            //保存
            file.transferTo(targetFile);
            return true;
        } catch (Exception e) {
            System.out.println("上传文件异常");
            System.out.println(e.toString());
            return false;
        }
    }

    public static boolean downloadFile(HttpServletResponse response, int p_id, String fileStorageName,String fileName){
        File file = new File(ProjectConstant.File_BASE+p_id+"\\"+fileStorageName);
        if (file.exists()) {
            response.setContentType("application/force-download");// 设置强制下载不打开
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            try {
                response.addHeader("Content-Disposition", "attachment;charset=UTF-8;fileName=" + java.net.URLEncoder.encode(fileName,"utf-8"));// 设置文件名
                byte[] buffer = new byte[1024];
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                OutputStream os = response.getOutputStream();
                int i = bis.read(buffer);
                while (i != -1) {
                    os.write(buffer, 0, i);
                    i = bis.read(buffer);
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return false;
            }
        }

        return false;
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
                targetFile.setWritable(true, false);

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
