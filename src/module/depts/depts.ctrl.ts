import { controllerError } from "@lib/controllerError";
import { Request, Response } from "express";
import { DeptsModel } from "./depts.model";

export namespace DeptsCtrl{

    export async function createDept(req: Request, res: Response) {
        try {
            DeptsModel.createDepts(req.body)
            return res.status(201).json({
                status: 200,
                message: 'muvaffaqiyatli'
            })
        } catch (error) {
            controllerError(res, error)
        }
    }
    
}