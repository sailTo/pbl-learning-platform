export interface User {
    u_id: string,
    type: string, 
    u_name: string, 
    gender: string,
    description: string,
    image: string, 
    status: boolean, 
    token?: string,
    password?: string, 
}
