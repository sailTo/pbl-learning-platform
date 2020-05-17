import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html'
})
export class CourseCardComponent {
    @Input() course: {
        c_id: number,
        t_id: number, 
        c_name: string, 
        t_name: string, 
        point: number, 
        description: string, 
        status: boolean, // 未发布false, 已发布true
        c_image_URL: string, // course封面图，没有的话应该返回默认图URL
        t_image_URL: string, // 教师头像，没有的话应该返回默认图URL
    };
}
