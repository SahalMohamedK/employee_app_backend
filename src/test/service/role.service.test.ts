import RoleService from "../../service/role.service";
import { Role } from "../../utils/role.enum";


describe('Role service tests', () => {
    let roleService: RoleService;

    beforeAll(() => {
        roleService = new RoleService();
    })

    test('Test for getAll', () => {
        expect(roleService.getAll()).toMatchObject(Object.values(Role))
    })
})