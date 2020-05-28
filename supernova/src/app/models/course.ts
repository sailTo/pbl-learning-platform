export interface Course {
    c_id: number,
    t_id: number, 
    c_name: string, 
    t_name: string, 
    point: number, 
    description: string, 
    status: string, // 未发布unpublished, 已发布published, 已删除deleted
    c_image_URL: string, // course封面图，没有的话应该返回默认图URL
    t_image_URL: string, // 教师头像，没有的话应该返回默认图URL
}
