import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}

export interface User {
  u_id: number,
  type: string, 
  u_name: string, 
  gender: string,
  description: string,
  image: string, 
}