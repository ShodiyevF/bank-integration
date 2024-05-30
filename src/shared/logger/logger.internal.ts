import { getErrorLine } from '@sharedLib/helper';
import { Schema } from '@database/schema';
import { db } from '@database/pg';

export async function internalErrorCatcher(error: any): Promise<void>{
    const errorFile = getErrorLine(error);
    
    await db.insert(Schema.internalErrors)
    .values({
        ieDescription: error instanceof Error ? errorFile : error,
        ieStack: error.stack
    })
}