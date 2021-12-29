package com.nacos.core;

/**
 * 项目常量
 */
public final class ProjectConstant {
    public static final String BASE_PACKAGE = "com.SuperNova";//生成代码所在的基础包名称，可根据自己公司的项目修改（注意：这个配置修改之后需要手工修改src目录项目默认的包路径，使其保持一致，不然会找不到类）

    public static final String IMG_BASE = "/www/wwwroot/www.zhsyy.top/SuperNova/UploadImage/";//上传图片根地址，部署前记得修改
    public static final String File_BASE = "/www/wwwroot/www.zhsyy.top/SuperNova/UploadFile/";//上传文件根地址，部署前记得修改
    public static final String WEB_IMG_BASE = "http://161.189.51.112:8089/SuperNova/UploadImage/";//前端下载图片根地址，部署前记得修改
    public static final String WEB_File_BASE = "http://161.189.51.112:8089/SuperNova/UploadFile/";//前端下载文件根地址，部署前记得修改


    public static final String MODEL_PACKAGE = BASE_PACKAGE + ".model";//生成的Model所在包
    public static final String MAPPER_PACKAGE = BASE_PACKAGE + ".dao";//生成的Mapper所在包
    public static final String SERVICE_PACKAGE = BASE_PACKAGE + ".service";//生成的Service所在包
    public static final String SERVICE_IMPL_PACKAGE = SERVICE_PACKAGE + ".impl";//生成的ServiceImpl所在包
    public static final String CONTROLLER_PACKAGE = BASE_PACKAGE + ".web";//生成的Controller所在包

    public static final String DEAFULT_IMAGE = "default.jpg";//默认头像

    public static final String MAPPER_INTERFACE_REFERENCE = BASE_PACKAGE + ".core.Mapper";//Mapper插件基础接口的完全限定名
}
