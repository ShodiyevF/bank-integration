import { integer, bigint, json, pgTable, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const requestTypes: [string, ...string[]] = [ "SUCCESS", "ERROR" ]

export const debtorsTable = pgTable('debtors', {
    debtorId: uuid('debtor_id').defaultRandom().primaryKey(),
    debtorPinfl: varchar('debtor_pinfl', { length: 16 }).notNull().unique(),
    debtorFirstName: varchar('debtor_first_name', { length: 32 }).notNull(),
    debtorLastName: varchar('debtor_last_name', { length: 32 }).notNull(),
    debtorMiddleName: varchar('debtor_middle_name', { length: 32 }).notNull(),
    debtorBornDate: varchar('debtor_born_date', { length: 10 }).notNull(),
    debtorPassportSeries: varchar('debtor_passport_series', { length: 2 }).notNull(),
    debtorPassportNumber: integer('debtor_passport_number').notNull(),
    debtorPassportDate: varchar('debtor_passport_date', { length: 10 }).notNull(),
    debtorCreatedAt: timestamp('debtor_created_at').notNull().defaultNow()
})

export const debtsTable = pgTable('debts', {
    debtId: uuid('debt_id').defaultRandom().primaryKey(),
    debtBranchId: integer('debt_branch_id').notNull(),
    debtContractId: integer('debt_contract_id').notNull(),
    debtSum: integer('debt_sum').notNull(),
    debtorId: uuid('debtor_id').references(() => debtorsTable.debtorId).notNull(),
    debtCreatedAt: timestamp('debt_created_at').notNull().defaultNow()
})

export const requestsTable = pgTable('requests', {
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

export const internalErrorsTable = pgTable('internal_errors', {
    ieId: uuid('ie_id').defaultRandom().primaryKey(),
    ieDescription: text('ie_description').notNull(),
    ieStack: text('ie_stack').notNull(),
    ieCreatedAt: timestamp('ie_created_at').notNull().defaultNow(),
})

export const sumTable = pgTable('sum', {
    sumId: uuid('sum_id').defaultRandom().primaryKey(),
    sumModuleName: varchar('sum_module_name', { length: 64 }).notNull(),
    sum: bigint('sum', { mode: "bigint" }).notNull(),
    sumCreatedAt: timestamp('sum_created_at').notNull().defaultNow()
})

export namespace Schema {
    export const debtors = debtorsTable
    export const debts = debtsTable
    export const requests = requestsTable
    export const internalErrors = internalErrorsTable
    export const sum = sumTable
}