import { internalErrors } from '@database/schema';
import { getErrorLine } from '@sharedLib/helper';
import { db } from '@database/pg';

export async function internalErrorCatcher(error: any): Promise<void>{
    const errorFile = getErrorLine(error);
    
    await db.insert(internalErrors)
    .values({
        ieDescription: error instanceof Error ? errorFile : error,
        ieStack: error.stack
    })
}