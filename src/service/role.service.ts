import { Role } from "../utils/role.enum";

class RoleService{
    getAll(){
        return Object.values(Role)
    }
}

export default RoleService;