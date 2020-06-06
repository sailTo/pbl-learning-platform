export interface Task {
    a_id: number, 
    p_id: number, 
    a_name: string, 
    a_description: string, 
    importance: number, 
    a_start_date: Date, 
    a_end_date: Date, 
    finished?: boolean, 
    urged?: boolean, 
}

export interface StudentTask {
    a_id: number, 
    p_id: number, 
    u_id: number, 
    status: boolean, 
    urge: boolean, 
}