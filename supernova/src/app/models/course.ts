import { User } from './user';

export interface Course {
    c_id: number,
    t_id: number, 
    c_name: string, 
    point: number, 
    description: string, 
    status: number, // 1 unpublished, 2 published, 0 deleted
    image_URL: string, // course封面图，没有的话应该返回默认图URL
    teacher?: User, 
}
