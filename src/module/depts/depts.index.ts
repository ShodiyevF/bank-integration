import validationMiddleware from "@middleware/validator.middleware";
import { CreateDeptsDTOS } from "@dto/depts.dto";
import { DeptsCtrl } from "./depts.ctrl";
import { Router } from "express";

const express = Router()

express.post('/api/depts', validationMiddleware(CreateDeptsDTOS.createDeptsDto, 'body'), DeptsCtrl.createDept)

export default express