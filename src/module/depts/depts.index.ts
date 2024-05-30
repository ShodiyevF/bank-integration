import validationMiddleware from "@middleware/validator.middleware";
import { CreateDeptsDTOS, GetDeptsDTOS } from "@dto/depts.dto";
import { DeptsCtrl } from "./depts.ctrl";
import { Router } from "express";

const express = Router()

express.get('/api/contract-debt/get-debtors-by-branch', validationMiddleware(GetDeptsDTOS.getDeptsQueryDto, 'query'), DeptsCtrl.getDepts)

express.post('/api/depts', validationMiddleware(CreateDeptsDTOS.createDeptsDto, 'body'), DeptsCtrl.createDept)


export default express