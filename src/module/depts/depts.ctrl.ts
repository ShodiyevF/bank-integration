import { controllerError } from "@lib/controllerError";
import { Request, Response } from "express";
import { DeptsModel } from "./depts.model";

export namespace DeptsCtrl{

    export async function createDept(req: Request, res: Response) {
        try {
            DeptsModel.createDepts(req.body)
            return res.status(201).json({
                status: 201,
                message: 'muvaffaqiyatli'
            })
        } catch (error) {
            controllerError(res, error)
        }
    }

    export async function getDepts(req: Request, res: Response) {
        try {
            const page = req.query.page ? +req.query.page : 1
            const count = req.query.count ? +req.query.count : 1
            
            const model = await DeptsModel.getDepts({
                branch_id: req.query.branch_id ? +req.query.branch_id : 1,
                count: count,
                page: page,
            })

            return res.status(200).json({
                response: {
                    deptors: model
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
            console.log(error);
            
            controllerError(res, error)
        }
    }
    
}