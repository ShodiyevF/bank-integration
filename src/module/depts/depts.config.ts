import { CreateDeptsNamespace } from "@dto/depts.dto";

function isCreateDeptsInterface(data: any): data is CreateDeptsNamespace.CreateDeptsInterface {                
    for (const deptorObj of data) {
        if (typeof deptorObj !== 'object' || !deptorObj) return false;
        const deptor = deptorObj.deptor;
        
        if (
            typeof deptor.pinfl !== 'number' ||
            typeof deptor.deptor_first_name !== 'string' ||
            typeof deptor.deptor_last_name !== 'string' ||
            typeof deptor.deptor_middle_name !== 'string' ||
            typeof deptor.deptor_born_data !== 'string' ||
            typeof deptor.deptor_passport_series !== 'string' ||
            typeof deptor.deptor_passport_number !== 'number' ||
            typeof deptor.deptor_passport_date !== 'string'
        ) {
            return false;
        }
        
        if (!Array.isArray(deptorObj.depts)) return false;
        for (const dept of deptorObj.depts) {
            if (
                typeof dept.dept_branch_id !== 'number' ||
                typeof dept.dept_contract_id !== 'number' ||
                typeof dept.dept_sum !== 'number'
            ) {
                return false;
            }
        }
    }
    
    return true;
}

export namespace DeptConfigs {
    export function createDeptValidation(value: CreateDeptsNamespace.CreateDeptsInterface[]): boolean {
        try {
            return isCreateDeptsInterface(value)
        } catch (error: any) {
            return false
        }
    }
}