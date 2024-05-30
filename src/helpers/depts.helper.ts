import { InferInsertModel, and, desc, eq } from "drizzle-orm";
import { DeptsHelperDTOS } from "@dto/depts.dto";
import { Schema } from "@database/schema";
import { db } from "@database/pg";

export namespace DeptsHelper {
    
    type Deptor = InferInsertModel<typeof Schema.debtors>;
    export async function syncDeptorHelper(payload: DeptsHelperDTOS.SyncDeptorInterface): Promise<Deptor> {
        return await db.insert(Schema.debtors)
        .values({
            deptorPinfl: payload.deptor_pinfl,
            deptorFirstName: payload.deptor_first_name,
            deptorLastName: payload.deptor_last_name,
            deptorMiddleName: payload.deptor_middle_name,
            deptorBornDate: payload.deptor_born_data,
            deptorPassportSeries: payload.deptor_passport_series,
            deptorPassportNumber: payload.deptor_passport_number,
            deptorPassportDate: payload.deptor_passport_date,
        })
        .onConflictDoUpdate({
            target: Schema.debtors.deptorPinfl,
            set: {
                deptorFirstName: payload.deptor_first_name,
                deptorLastName: payload.deptor_last_name,
                deptorMiddleName: payload.deptor_middle_name,
                deptorBornDate: payload.deptor_born_data,
                deptorPassportSeries: payload.deptor_passport_series,
                deptorPassportNumber: payload.deptor_passport_number,
                deptorPassportDate: payload.deptor_passport_date
            }
        })
        .returning()
        .then(data => data[0])
    }

    export async function syncDeptHelper(deptor: Deptor, dept: DeptsHelperDTOS.SyncDeptInterface): Promise<boolean> {
        const deptSearch = await db.select()
        .from(Schema.debts)
        .where(and(
            eq(Schema.debts.deptContractId, dept.dept_contract_id),
            eq(Schema.debts.deptBranchId, dept.dept_branch_id),
            eq(Schema.debts.deptorId, deptor.deptorId || '')
        ))
        .orderBy(desc(Schema.debts.deptCreatedAt))
        .then(data => data[0]);
        

        if (!deptSearch) {
            await db.insert(Schema.debts)
            .values({
                deptBranchId: dept.dept_branch_id,
                deptContractId: dept.dept_contract_id,
                deptSum: dept.dept_sum,
                deptorId: deptor.deptorId || ''
            })
            return true
        }

        await db.update(Schema.debts)
        .set({
            deptSum: dept.dept_sum
        })
        .where(eq(Schema.debts.deptId, deptSearch.deptId))

        return true
    }
    
}