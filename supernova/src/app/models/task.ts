export interface Task {
    a_id: number, 
    p_id: number, 
    a_name: number, 
    a_description: string, 
    importance: string, 
    a_start_date: Date, 
    a_end_date: Date, 
}

export interface StudentTask {
    a_id: number, 
    p_id: number, 
    u_id: number, 
    status: boolean, 
    urge: boolean, 
}