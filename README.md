# pbl-learning-platform
A course project for Advanced Web Technologies at FDU. 

*希望大嘎顺手学一下Markdown，基础使用超简单*

*可用资源包括但不限于[菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)*

***推荐可以使用[Typora](https://typora.io/)进行编写，工具干净好用跨平台***

## 实体类及其（可能存在的）继承关系
学生
教师
课程
项目
任务
管理员


## 数据库设计
- student (s_id, s_name, gender, major, password)  

  > major或许不需要

- teacher (t_id, t_name, gender, password)  

- admin (admin_id, a_name, password)  

- course (c_id, c_name, point, class_time)  

- project (p_id, p_name)  

- assignment (a_id, a_name, a_description, importance, a_start_date, a_end_date, a_point, a_status)  

  > 任务需要一个（甚至多个）负责人，组长可以分配任务给某个同学，或者多个，我觉得个数可以假定

- teach (t_id, c_id)  

- take (s_id, c_id)  

- course_project (c_id, p_id)  

  > 这个我觉得可以省掉，project一定只属于一个course，可以合并进project表

- student_project (s_id, p_id, group_id, group_leader)  

  > 这个可以改为s_id, p_id, is_group_leader，因为默认选择同一个项目的就是一个组，这样比较简单hhh，然后is_group_leader表示是否为leader，还是只是组员

- project_assignement (p_id, a_id)  

  > 这个我觉得可以省掉，因为assignment一定只属于一个project

## 按功能或者页面分类的接口设计（名称、输入输出等）

- ### 登录页面

- ### 注册页面

- ### 个人信息管理页面

- ### 课程管理页面

- ### 项目管理页面（下辖多个页面）

  - 需要的功能有：

    1. 展示某课程所有项目（学生可以加入，后查看详情；老师可以查看、添加、删除项目）

       > 这个可以用项目卡片的形式展示，给不同用户提供不同按钮。可以有快捷按钮直接到达项目讨论版、文件管理空间。如果点击查看详情则是进入项目详情页，展示所有任务。

    2. 进入项目详情后展示所有任务（老师、组长可以添加任务、分配任务、查看任务完成情况，督促学生尽快完成`是否需要站内信功能？`，`是否可以删除任务？`；学生可以被高亮自己被分配的任务、标记完成任务）、项目包含成员、讨论版、文件管理空间（上传、下载、删除）

       > 项目详情页主体我觉得可以做成switch的形式，在header上保留一个开关，让用户选择以卡片形式查看还是以甘特图形式查看所有任务，但是不论以哪种形式，需要展示的基本内容是相同的（开始日期、截至日期、重要程度、负责人等，以及被分配的学生可以勾选表示完成了），只是甘特图比较炫，开始日期、截至日期、重要程度这些都直接可视化了。
       >
       > 详情页的header需要包含去往讨论版的链接，去往文件管理空间的链接，点击一下可以显示项目所有成员信息和组长的按钮（`显示形式还没想好`），以及上段所述的switch开关。

  - 需要的页面：

    1. **项目展示页面**
    2. **项目详情页面**
    3. **项目讨论版页面**
    4. **项目文件管理空间页面**

- ### 评分页面

- ### 用户管理页面

