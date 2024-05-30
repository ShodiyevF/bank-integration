import { CreateDeptsDTOS, GetDeptsDTOS } from "@dto/depts.dto";
import { DeptsHelper } from "src/helpers/depts.helper";
import { Schema } from "@database/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@database/pg";

export namespace DeptsModel {

    export async function createDepts(body: { deptors: CreateDeptsDTOS.CreateDeptsInterface[] }) {
        const { deptors } = body
        
        for (const deptor of deptors) {
            const insertedDeptor = await DeptsHelper.syncDeptorHelper(deptor.deptor)

            for (const dept of deptor.depts) {
                await DeptsHelper.syncDeptHelper(insertedDeptor, dept)
            }
        }
    }

    export async function getDepts(params: GetDeptsDTOS.GetDeptsParamsInterface) {
        const { page, count, branch_id } = params
        
        const filterDebsByBranchId = await db.select({
            client: sql`json_build_object(
                'pinfl', ${Schema.debtors.deptorPinfl},
                'first_name', ${Schema.debtors.deptorFirstName},
                'last_name', ${Schema.debtors.deptorLastName},
                'middle_name', ${Schema.debtors.deptorMiddleName},
                'bord_date', ${Schema.debtors.deptorBornDate},
                'passport_series', ${Schema.debtors.deptorPassportSeries},
                'passport_number', ${Schema.debtors.deptorPassportNumber},
                'passport_date', ${Schema.debtors.deptorPassportDate}
            )`,
            contracts: sql`array_agg(
                json_build_object(
                    'branch_id', ${Schema.debts.deptBranchId},
                    'contract_id', ${Schema.debts.deptContractId},
                    'debt', ${Schema.debts.deptSum}
                )
            )`
        })
        .from(Schema.debts)
        .innerJoin(Schema.debtors, eq(Schema.debtors.deptorId, Schema.debts.deptorId))
        .where(eq(Schema.debts.deptBranchId, branch_id))
        .groupBy(Schema.debtors.deptorPinfl, Schema.debtors.deptorFirstName, Schema.debtors.deptorLastName, Schema.debtors.deptorMiddleName, Schema.debtors.deptorBornDate, Schema.debtors.deptorPassportSeries, Schema.debtors.deptorPassportNumber, Schema.debtors.deptorPassportDate)

        return filterDebsByBranchId
    }

}