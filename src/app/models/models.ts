export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface UserInfo {
  username: string;
  email: string;
}
export interface RegisterPostData {
  fullName: string;
  email: string;
  password: string;
}
export interface User extends RegisterPostData {
  id: string;
}
