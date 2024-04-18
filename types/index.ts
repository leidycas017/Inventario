import { Role, User, Material } from "@prisma/client";


export interface UserQuery {
    users: User[];
}

export interface RolesQuery{
    roles: Role[];
}

export interface MaterialQuery{
    material: Material[];
}