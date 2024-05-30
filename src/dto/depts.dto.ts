import { DeptConfigs } from "@module/depts/depts.config";
import { DTO } from "@shared/validation/validation";

namespace CreateDeptsNamespace {
    export const createDeptsDto: DTO = {
        deptors: {
            required: true,
            type: 'array',
            custom_validation: [DeptConfigs.createDeptValidation, 'muammo']
        }
    }

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
}

export {
    CreateDeptsNamespace
}