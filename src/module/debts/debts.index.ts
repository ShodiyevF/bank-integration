import validationMiddleware from "@middleware/validator.middleware";
import { CreatedebtsDTOS, GetdebtsDTOS } from "@dto/debts.dto";
import { debtsCtrl } from "./debts.ctrl";
import { Router } from "express";

const express = Router()

express.get('/api/contract-debt/get-debtors-by-branch', validationMiddleware(GetdebtsDTOS.getdebtsQueryDto, 'query'), debtsCtrl.getdebts)

express.post('/api/debts', validationMiddleware(CreatedebtsDTOS.createdebtsDto, 'body'), debtsCtrl.createdebt)


export default express