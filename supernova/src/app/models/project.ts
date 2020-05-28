export interface Project {
    p_id: number, 
    c_id: number, 
    p_name: string, 
    description: string, 
    grading_status: boolean, // true 表示已评分，false 未评分
    teacher_grade_ratio: number, 
    self_grade_ratio: number, 
    mutual_grade_ratio: number, 
}
