import { integer, json, pgTable, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const requestTypes: [string, ...string[]] = [ "SUCCESS", "ERROR" ]

export const debtors = pgTable('debtors', {
    deptorId: uuid('deptor_id').defaultRandom().primaryKey(),
    deptorPinfl: varchar('deptor_pinfl', { length: 16 }).notNull(),
    deptorFirstName: varchar('deptor_first_name', { length: 32 }).notNull(),
    deptorLastName: varchar('deptor_last_name', { length: 32 }).notNull(),
    deptorMiddleName: varchar('deptor_middle_name', { length: 32 }).notNull(),
    deptorBornDate: varchar('deptor_born_date', { length: 10 }).notNull(),
    deptorPassportSeries: varchar('deptor_passport_series', { length: 2 }).notNull(),
    deptorPassportNumber: integer('deptor_passport_number').notNull(),
    deptorPassportDate: varchar('deptor_passport_date', { length: 10 }).notNull(),
    deptorCreatedAt: timestamp('deptor_created_at').notNull().defaultNow()
})

export const debts = pgTable('debts', {
    deptId: uuid('dept_id').defaultRandom().primaryKey(),
    deptBranchId: integer('dept_branch_id').notNull(),
    deptContractId: integer('dept_contract_id').notNull(),
    deptSum: integer('dept_sum').notNull(),
    deptCreatedAt: timestamp('dept_created_at').notNull().defaultNow()
})

export const requests = pgTable('requests', {
    requestId: uuid('request_id').defaultRandom().primaryKey(),
    requestType: varchar('request_type', { enum: requestTypes }).notNull(),
    requestMethod: varchar('request_method', { length: 32 }).notNull(),
    requestRoute: text('request_route').notNull(),
    requestHost: text('request_host').notNull(),
    requestUserAgent: text('request_user_agent').notNull(),
    requestBody: json('request_body').notNull(),
    requestResponseStatus: smallint('request_response_status').notNull(),
    requestResponseBody: text('request_response_body').notNull(),
    requestCreatedAt: timestamp('request_created_at').notNull().defaultNow(),
})

export const internalErrors = pgTable('internal_errors', {
    ieId: uuid('ie_id').defaultRandom().primaryKey(),
    ieDescription: text('ie_description').notNull(),
    ieStack: text('ie_stack').notNull(),
    ieCreatedAt: timestamp('ie_created_at').notNull().defaultNow(),
})