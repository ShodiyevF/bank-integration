import { debtsConfigs } from "@module/debts/debts.config";
import { DTO } from "@shared/validation/validation";

namespace debtsHelperDTOS {
    export interface SyncdebtorInterface {
        debtor_pinfl: string
        debtor_first_name: string
        debtor_last_name: string
        debtor_middle_name: string
        debtor_born_data: string
        debtor_passport_series: string
        debtor_passport_number: number
        debtor_passport_date: string
    }

    export interface SyncdebtInterface {
        debt_branch_id: number
        debt_contract_id: number
        debt_sum: number
    }
}

namespace CreatedebtsDTOS {
    export interface CreatedebtsInterface {
        debtor: {
            debtor_pinfl: string
            debtor_first_name: string
            debtor_last_name: string
            debtor_middle_name: string
            debtor_born_data: string
            debtor_passport_series: string
            debtor_passport_number: number
            debtor_passport_date: string
        }
        debts: {
            debt_branch_id: number
            debt_contract_id: number
            debt_sum: number
        }[]
    }
    
    export const createdebtsMockdata: CreatedebtsInterface = {
        debtor: {
            debtor_pinfl: '',
            debtor_first_name: '',
            debtor_last_name: '',
            debtor_middle_name: '',
            debtor_born_data: '',
            debtor_passport_series: '',
            debtor_passport_number: 0,
            debtor_passport_date: ''
        },
        debts: [
            {
                debt_branch_id: 0,
                debt_contract_id: 0,
                debt_sum: 0
            }
        ]    
    };
    
    export const createdebtsDto: DTO = {
        debtors: {
            required: true,
            type: 'array',
            custom_validation: [debtsConfigs.createdebtValidation, `Must be this schema`, createdebtsMockdata]
        }
    }
}

namespace GetDebtsDTOS {
    export interface GetDebtsParamsInterface {
        page: number,
        count: number,
        branch_id: number
    }
    
    export const getDebtsQueryDto: DTO = {
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
    debtsHelperDTOS,
    CreatedebtsDTOS,
    GetDebtsDTOS
}