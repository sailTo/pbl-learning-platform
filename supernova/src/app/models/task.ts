export interface Task {
    a_id: number,
    p_id: number,
    a_name: string,
    a_description: string,
    importance: number,
    a_start_date: number,
    a_end_date: number,
    finished?: boolean, // 本人是否已经完成任务
    urged?: boolean, // 任务是否被催促
    doneNum?: number, // 任务已经完成的人数
}

// export interface StudentTask {
//     a_id: number,
//     p_id: number,
//     u_id: number,
//     status: boolean,
//     urge: boolean,
// }
