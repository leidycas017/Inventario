export interface User{
    id: string;
    name: string;
    email: string;
    emailverified:Date;
    image: string;
}

export interface UsersQuery{
    users: User[];
}