import { CreateDebtsDTOS } from "@dto/debts.dto";

function isCreatedebtsInterface(data: any): data is CreateDebtsDTOS.CreateDebtsInterface {                
    for (const debtorObj of data) {
        if (typeof debtorObj !== 'object' || !debtorObj) return false;
        const debtor = debtorObj.debtor;
        
        if (
            typeof debtor.debtor_pinfl !== 'string' ||
            typeof debtor.debtor_first_name !== 'string' ||
            typeof debtor.debtor_last_name !== 'string' ||
            typeof debtor.debtor_middle_name !== 'string' ||
            typeof debtor.debtor_born_data !== 'string' ||
            typeof debtor.debtor_passport_series !== 'string' ||
            typeof debtor.debtor_passport_number !== 'number' ||
            typeof debtor.debtor_passport_date !== 'string'
        ) {
            return false;
        }
        
        if (!Array.isArray(debtorObj.debts)) return false;
        for (const debt of debtorObj.debts) {
            if (
                typeof debt.debt_branch_id !== 'number' ||
                typeof debt.debt_contract_id !== 'number' ||
                typeof debt.debt_sum !== 'number'
            ) {
                return false;
            }
        }
    }
    
    return true;
}

export namespace debtsConfigs {
    export function createdebtValidation(value: CreateDebtsDTOS.CreateDebtsInterface[]): boolean {
        try {
            return isCreatedebtsInterface(value)
        } catch (error: any) {
            return false
        }
    }
}