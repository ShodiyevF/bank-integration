import { boolean, json, pgTable, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const requestTypes: [string, ...string[]] = [ "SUCCESS", "ERROR" ]

export const users = pgTable('users', {
    userId: uuid('user_id').defaultRandom().primaryKey(),
    userName: varchar('user_name', { length: 36}).notNull(),
    userAge: smallint('user_age').notNull(),
    userGender: boolean('user_gender').default(true),
    userPhoneNumber: varchar('user_phone_number', { length: 13}).notNull().unique(),
    userCreatedAt: timestamp('user_created_at').notNull().defaultNow()
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