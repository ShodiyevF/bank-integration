import { InferInsertModel, and, desc, eq } from "drizzle-orm";
import { debtsHelperDTOS } from "@dto/debts.dto";
import { Schema } from "@database/schema";
import { db } from "@database/pg";

export namespace debtsHelper {
    
    type debtor = InferInsertModel<typeof Schema.debtors>;
    export async function syncdebtorHelper(payload: debtsHelperDTOS.SyncdebtorInterface): Promise<debtor> {
        return await db.insert(Schema.debtors)
        .values({
            debtorPinfl: payload.debtor_pinfl,
            debtorFirstName: payload.debtor_first_name,
            debtorLastName: payload.debtor_last_name,
            debtorMiddleName: payload.debtor_middle_name,
            debtorBornDate: payload.debtor_born_data,
            debtorPassportSeries: payload.debtor_passport_series,
            debtorPassportNumber: payload.debtor_passport_number,
            debtorPassportDate: payload.debtor_passport_date,
        })
        .onConflictDoUpdate({
            target: Schema.debtors.debtorPinfl,
            set: {
                debtorFirstName: payload.debtor_first_name,
                debtorLastName: payload.debtor_last_name,
                debtorMiddleName: payload.debtor_middle_name,
                debtorBornDate: payload.debtor_born_data,
                debtorPassportSeries: payload.debtor_passport_series,
                debtorPassportNumber: payload.debtor_passport_number,
                debtorPassportDate: payload.debtor_passport_date
            }
        })
        .returning()
        .then(data => data[0])
    }

    export async function syncdebtHelper(debtor: debtor, debt: debtsHelperDTOS.SyncdebtInterface): Promise<boolean> {
        const debtSearch = await db.select()
        .from(Schema.debts)
        .where(and(
            eq(Schema.debts.debtContractId, debt.debt_contract_id),
            eq(Schema.debts.debtBranchId, debt.debt_branch_id),
            eq(Schema.debts.debtorId, debtor.debtorId || '')
        ))
        .orderBy(desc(Schema.debts.debtCreatedAt))
        .then(data => data[0]);
        

        if (!debtSearch) {
            await db.insert(Schema.debts)
            .values({
                debtBranchId: debt.debt_branch_id,
                debtContractId: debt.debt_contract_id,
                debtSum: debt.debt_sum,
                debtorId: debtor.debtorId || ''
            })
            return true
        }

        await db.update(Schema.debts)
        .set({
            debtSum: debt.debt_sum
        })
        .where(eq(Schema.debts.debtId, debtSearch.debtId))

        return true
    }
    
}