import { DeptConfigs } from "@module/depts/depts.config";
import { DTO } from "@shared/validation/validation";

namespace CreateDeptsNamespace {
    export interface CreateDeptsInterface {
        deptor: {
            pinfl: number
            deptor_first_name: string
            deptor_last_name: string
            deptor_middle_name: string
            deptor_born_data: string
            deptor_passport_series: string
            deptor_passport_number: number
            deptor_passport_date: string
        }
        depts: {
            dept_branch_id: number
            dept_contract_id: number
            dept_sum: number
        }[]
    }
    
    export const createDeptsMockdata: CreateDeptsInterface = {
        deptor: {
            pinfl: 0,
            deptor_first_name: '',
            deptor_last_name: '',
            deptor_middle_name: '',
            deptor_born_data: '',
            deptor_passport_series: '',
            deptor_passport_number: 0,
            deptor_passport_date: ''
        },
        depts: [
            {
                dept_branch_id: 0,
                dept_contract_id: 0,
                dept_sum: 0
            }
        ]    
    };
    
    export const createDeptsDto: DTO = {
        deptors: {
            required: true,
            type: 'array',
            custom_validation: [DeptConfigs.createDeptValidation, `Must be this schema`, createDeptsMockdata]
        }
    }
}

export {
    CreateDeptsNamespace
}