## 数据库设计
- user (<u>u_id</u>, type, u_name, gender, password, description, image)  

  - image为布尔值，true表示已经上传头像，名称为u_id.jpg；false表示使用默认头像
  
- course (<u>c_id</u>, t_id, c_name, point, ~~class_time~~, description, status,image_URL)  

  - status: 未发布(0)，已发布(1)，已删除(-1)
  - t_id是课程教师，reference u_id@user, type=teacher
  - image_URL为课程封面URL
  
- project (<u>p_id</u>, c_id, p_name, description, grading_status,teacher_grade_ratio, self_grade_ratio, mutual_grade_ratio)  

  - grading_status: 未评分，已评分
  
  - c_id是所属的课程，reference c_id@course
  
  - teacher_grade_ratio为教师评分占比
  
  - self_grade_ratio, mutual_grade_ratio 可以为null，表示不开启自评、互评，不为null则表示评分占比
  
- grade_system(<u>p_id</u>,<u>item_id</u>,description,max_grade) 

  - p_id是项目id，reference p_id@project

  - item_id是每个评分细则的id
  - description是对每个评分细则的描述
  - max_grade是每个评分细则的最大得分上限

- assignment (<u>a_id</u>, <u>p_id</u>, ~~s_id,~~ a_name, a_description, importance, a_start_date, a_end_date, ~~a_status, urge~~)  

- student_grade(<u>s_id</u>,<u>p_id</u>,<u>item_id</u>,grade)

  - s_id是同学，p_id为项目id，reference (s_id, p_id)@student_project
  - item_id为评分细则的id，reference item_id@grade_system
  - grade为评分，每个评分不能超过grade_system中的max_grade

- student_assignment (<u>a_id</u>, <u>p_id</u>, <u>s_id</u>, status, urge)
  - a_id是任务，p_id是所属于的项目，reference (a_id, p_id)@assignment
  - s_id是同学，reference (s_id, p_id)@student_project
  - status是任务完成情况，默认false
  - urge是布尔值，表示目前该任务有没有被催促，默认false，学生进入项目详情页面时会根据该值弹出提示的催促尽快完成信息
  - 每个同学加入一个项目时，后端需要检索该项目所有任务，每个任务都添加一行到该表中
  - 每当组长、老师增加新任务时，所有在项目中的同学都要增加一行到该表中，删除时也要全部删除
  - 组长、老师督促某个任务时，所有相关任务未完成的同学的urge被改为true，阅读一次后改回false
  
- student_course (<u>s_id</u>, <u>c_id</u>)  

  - s_id是被分配的同学，reference u_id@user, type=student
  
- student_project (<u>s_id</u>, <u>p_id</u>, is_group_leader, self_grade, mutual_grade, teacher_grade)  

  - is_group_leader表示是否为leader，还是只是组员
  - s_id是同学，reference u_id@user, type=student
  - p_id是项目，reference p_id@project
  - self_grade, mutual_grade, teacher_grade
    - 默认为0，取数据时要考虑project表中是否评分状态为已评分，如果未评分需要自行计算数据，如果已评分则写入该表，通过该表查询
    - 总分需要去project表中查询占比，然后与这里的分数做加权平均得到
  
- discussion (<u>d_id</u>, p_id, u_id, content, time)
  - p_id是所属于的项目，reference p_id@project
  - u_id是老师或者学生，reference u_id@user, type=student || teacher
  
- reply (<u>r_id</u>, d_id, u_id, content, time)
  - 讨论版数据（每个project有一个讨论版，讨论版可以有好多帖子，每个帖子包含发帖人、主题、内容、时间戳；每个帖子有好多回复，每个回复有回复人、时间戳）
  - u_id是老师或者学生，reference u_id@user, type=student || teacher
  - d_id是某个帖子的id，reference d_id@discussion
  
- file (<u>f_id</u>, <u>p_id</u>, u_id, f_name, description, file_URL)

  - f_name保留原有上传时的文件名
  - fileURL根据f_id和p_id生成
  - p_id是项目，reference p_id@project
  - u_id是老师或者学生，reference u_id@user, type=student || teacher
  
- evaluation (<u>p_id</u>, <u>active\_s_id</u>, <u>passive\_s_id</u>, grade)

  - p_id是项目，reference p_id@project
  - 两个s_id是同学，reference u_id@user, type=student
  - 如果两个s_id相同，表明是自评，不同则是互评
  - 如果来查询自评、互评成绩时还没有评分过，后端应该手动返回未评分而非null
  - 可以通过后端返回count和sum的形式完成要求，count是0前端就明白还没有人评分
  