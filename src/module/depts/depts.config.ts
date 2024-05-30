import { CreateDeptsNamespace } from "@dto/depts.dto";

export namespace DeptConfigs {
    export function createDeptValidation(value: any): boolean {
        try {
            const body: CreateDeptsNamespace.CreateDeptsInterface[] = value
            console.log(body[0].deptor.deptor_first_name);
            
            return true
        } catch (error) {
            console.log(error);

            return false
            
        }
    }
}