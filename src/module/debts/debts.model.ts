import { CreateDebtsDTOS, GetDebtsDTOS } from "@dto/debts.dto";
import { DebtsHelper } from "@helper/debts.helper";
import { Schema } from "@database/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@database/pg";

export namespace DebtsModel {

    export async function getDebts(params: GetDebtsDTOS.GetDebtsParamsInterface) {
        const { page, count, branch_id } = params
        
        const filterDebtsByBranchId = await db.select({
            client: sql`json_build_object(
                'pinfl', ${Schema.debtors.debtorPinfl},
                'first_name', ${Schema.debtors.debtorFirstName},
                'last_name', ${Schema.debtors.debtorLastName},
                'middle_name', ${Schema.debtors.debtorMiddleName},
                'bord_date', ${Schema.debtors.debtorBornDate},
                'passport_series', ${Schema.debtors.debtorPassportSeries},
                'passport_number', ${Schema.debtors.debtorPassportNumber},
                'passport_date', ${Schema.debtors.debtorPassportDate}
            )`,
            contracts: sql`array_agg(
                json_build_object(
                    'branch_id', ${Schema.debts.debtBranchId},
                    'contract_id', ${Schema.debts.debtContractId},
                    'debt', ${Schema.debts.debtSum}
                )
            )`
        })
        .from(Schema.debtors)
        .rightJoin(Schema.debts, eq(Schema.debts.debtorId, Schema.debtors.debtorId))
        .where(eq(Schema.debts.debtBranchId, branch_id))
        .groupBy(Schema.debtors.debtorPinfl, Schema.debtors.debtorFirstName, Schema.debtors.debtorLastName, Schema.debtors.debtorMiddleName, Schema.debtors.debtorBornDate, Schema.debtors.debtorPassportSeries, Schema.debtors.debtorPassportNumber, Schema.debtors.debtorPassportDate)
        .offset(page-1)
        .limit(count)

        return filterDebtsByBranchId
    }

    export async function createDebts(body: { debtors: CreateDebtsDTOS.CreateDebtsInterface[] }) {
        const { debtors } = body
        
        for (const debtor of debtors) {
            const insertedDebtor = await DebtsHelper.syncDebtorHelper(debtor.debtor)

            for (const debt of debtor.debts) {
                await DebtsHelper.syncDebtHelper(insertedDebtor, debt)
            }
        }
    }

}