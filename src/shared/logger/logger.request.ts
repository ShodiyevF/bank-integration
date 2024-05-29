import { internalErrorCatcher } from "./logger.internal";
import { requests } from "@database/schema";
import { db } from "@database/pg";

export async function logWriter(statusCode: number, host: string, method: string, url: string, userAgent: string | undefined, body: object, res: string) {
    try {
        const logType: string = statusCode >= 200 && statusCode <= 299 ? 'SUCCESS' : 'ERROR';
    
        await db.insert(requests)
        .values({
            requestType: logType,
            requestMethod: method,
            requestRoute: url,
            requestHost: host,
            requestUserAgent: userAgent || '',
            requestBody: body,
            requestResponseStatus: statusCode,
            requestResponseBody: res,
        })

    } catch (error) {
        internalErrorCatcher(error);
    }
}