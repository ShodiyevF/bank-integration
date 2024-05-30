import { CreatedebtsDTOS, GetdebtsDTOS } from "@dto/debts.dto";
import { debtsHelper } from "src/helpers/debts.helper";
import { Schema } from "@database/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@database/pg";

export namespace debtsModel {

    export async function createdebts(body: { debtors: CreatedebtsDTOS.CreatedebtsInterface[] }) {
        const { debtors } = body
        
        for (const debtor of debtors) {
            const inserteddebtor = await debtsHelper.syncdebtorHelper(debtor.debtor)

            for (const debt of debtor.debts) {
                await debtsHelper.syncdebtHelper(inserteddebtor, debt)
            }
        }
    }

    export async function getdebts(params: GetdebtsDTOS.GetdebtsParamsInterface) {
        const { page, count, branch_id } = params
        
        const filterDebsByBranchId = await db.select({
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
        .from(Schema.debts)
        .innerJoin(Schema.debtors, eq(Schema.debtors.debtorId, Schema.debts.debtorId))
        .where(eq(Schema.debts.debtBranchId, branch_id))
        .groupBy(Schema.debtors.debtorPinfl, Schema.debtors.debtorFirstName, Schema.debtors.debtorLastName, Schema.debtors.debtorMiddleName, Schema.debtors.debtorBornDate, Schema.debtors.debtorPassportSeries, Schema.debtors.debtorPassportNumber, Schema.debtors.debtorPassportDate)

        return filterDebsByBranchId
    }

}