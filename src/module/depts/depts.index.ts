import { CreateDeptsNamespace } from "@dto/depts.dto";
import validationMiddleware from "@middleware/validator.middleware";
import { Router } from "express";

const express = Router()

express.post('/api/depts', validationMiddleware(CreateDeptsNamespace.createDeptsDto, 'body'), (req, res) =>{ 
    console.log('ishladi');
})

export default express