export interface User {
    u_id: string,
    type: string, 
    u_name: string, 
    gender: string,
    description: string,
    image: string, 
    token?: string,
    password?: string, 
}
