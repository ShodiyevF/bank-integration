import { controllerError } from "@lib/controllerError";
import { Request, Response } from "express";
import { DebtsModel } from "./debts.model";

export namespace DebtsCtrl{

    export async function getDebts(req: Request, res: Response) {
        try {
            const page = req.query.page ? +req.query.page : 1
            const count = req.query.count ? +req.query.count : 1
            
            const model = await DebtsModel.getDebts({
                branch_id: req.query.branch_id ? +req.query.branch_id : 1,
                count: count,
                page: page,
            })

            return res.status(200).json({
                response: {
                    debtors: model
                },
                error: null,
                meta: {
                    current_page: page,
                    from: 1,
                    last_page: 2,
                    per_page: count,
                    total: 820
                }
            })
        } catch (error) {
            controllerError(res, error)
        }
    }

    export async function createDebt(req: Request, res: Response) {
        try {
            DebtsModel.createDebts(req.body)
            return res.status(201).json({
                status: 201,
                message: 'muvaffaqiyatli'
            })
        } catch (error) {
            controllerError(res, error)
        }
    }
    
}