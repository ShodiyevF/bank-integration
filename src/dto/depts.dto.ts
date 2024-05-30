import { DeptsConfigs } from "@module/depts/depts.config";
import { DTO } from "@shared/validation/validation";

namespace DeptsHelperDTOS {
    export interface SyncDeptorInterface {
        deptor_pinfl: string
        deptor_first_name: string
        deptor_last_name: string
        deptor_middle_name: string
        deptor_born_data: string
        deptor_passport_series: string
        deptor_passport_number: number
        deptor_passport_date: string
    }

    export interface SyncDeptInterface {
        dept_branch_id: number
        dept_contract_id: number
        dept_sum: number
    }
}

namespace CreateDeptsDTOS {
    export interface CreateDeptsInterface {
        deptor: {
            deptor_pinfl: string
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
            deptor_pinfl: '',
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
            custom_validation: [DeptsConfigs.createDeptValidation, `Must be this schema`, createDeptsMockdata]
        }
    }
}

namespace GetDeptsDTOS {
    export interface GetDeptsParamsInterface {
        page: number,
        count: number,
        branch_id: number
    }
    
    export const getDeptsQueryDto: DTO = {
        page: {
            required: true,
            type: 'number',
            min: 1,
        },
        count: {
            required: true,
            type: 'number',
            min: 1,
            max: 500,
        },
        branch_id: {
            required: true,
            type: 'number',
            min: 1,
        }
    }
}

export {
    DeptsHelperDTOS,
    CreateDeptsDTOS,
    GetDeptsDTOS
}