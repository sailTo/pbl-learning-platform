import { GradeItem } from './GradeItem';
export interface ProjectData {
  p_id: number;
  c_id: number;
  p_name: string;
  c_name?: string;
  description: string;
  grading_status: boolean;
  self_grade_ratio: number;
  mutual_grade_ratio: number;
  teacher_grade_ratio: number;
  gradeItems?: GradeItem[];
  expand?: boolean;
}
