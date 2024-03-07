export interface User{
    id: string;
    name:string;
    email:string;
    emailVerified: Date;
    image: string;
    roleId: string;
}

export interface UserQuery {
    users: User[];
}