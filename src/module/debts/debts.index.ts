import validationMiddleware from "@middleware/validator.middleware";
import { CreatedebtsDTOS, GetDebtsDTOS } from "@dto/debts.dto";
import { DebtsCtrl } from "./debts.ctrl";
import { Router } from "express";

const express = Router()

express.get('/api/contract-debt/get-debtors-by-branch', validationMiddleware(GetDebtsDTOS.getDebtsQueryDto, 'query'), DebtsCtrl.getDebts)

express.post('/api/debts', validationMiddleware(CreatedebtsDTOS.createdebtsDto, 'body'), DebtsCtrl.createdebt)


export default express