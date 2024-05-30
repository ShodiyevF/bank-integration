import { DeptsHelper } from "src/helpers/depts.helper";
import { CreateDeptsDTOS } from "@dto/depts.dto";

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

}