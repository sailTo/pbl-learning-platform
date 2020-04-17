# pbl-learning-platform
A course project for Advanced Web Technologies at FDU. 

*希望大嘎顺手学一下Markdown，基础使用超简单*

*可用资源包括但不限于菜鸟教程 https://www.runoob.com/markdown/md-tutorial.html*

## 实体类及其（可能存在的）继承关系
学生
教师
课程
项目
任务
管理员


## 数据库设计
student (s_id,s_name,gender,major,password)
teacher (t_id,t_name,gender,password)
course (c_id,c_name,point,class_time)
project (p_id,p_name)
assignment (a_id,a_name,a_description,importance,a_start_date,a_end_date,a_point,a_status)
admin (admin_id,a_name,password)
teach (t_id,c_id)
take (s_id,c_id)
course_project (c_id,p_id)
student_project (s_id,p_id,group_id,group_leader)
project_assignement (p_id,a_id)


## 按功能或者页面分类的接口设计（名称、输入输出等）
