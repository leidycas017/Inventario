import { Role, User, Material, InventoryMovement} from "@prisma/client";


export interface UserQuery {
    users: User[];
}

export interface RolesQuery{
    roles: Role[];
}

export interface MaterialesQuery{
    materiales: Material[];
}

export interface inventoriesQuery{
    inventories: InventoryMovement[];
}