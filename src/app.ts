import dotnev from 'dotenv'
dotnev.config({ path: `.env` });

import express, { Application, Router } from 'express';
import expressFileupload from 'express-fileupload';
import expressBasicAuth from 'express-basic-auth';
import cors from 'cors';

import { logger, notFoundLogger } from '@middleware/logger.middleware';
import { runConfigCronJobs } from '@config/cronjobs.config';
import { initDefaultFolders } from '@config/defaultfiles';
import CORS_OPTIONS from '@config/cors';

export default function app(routes: Router[]) {
    const app: Application = express();
    const port: string = process.env.PORT || '3000';

    const authLogin = process.env.LOGIN || ''
    const authPassword = process.env.PASSWORD || ''
    
    function listener() {
        app.listen(port, () => {
            console.info('=================================');
            console.info(`======== ENV: production ========`);
            console.info(`🚀 App listening on the port ${port}`);
            console.info('=================================');
        });
    }

    function initMiddlewares() {
        app.use(logger);
        app.use(expressBasicAuth({
            users: { [authLogin]: authPassword },
            unauthorizedResponse: 'unauthorized'
        }))
        app.use(cors(CORS_OPTIONS));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(expressFileupload());        
    }

    function notFoundLogs() {
        app.use(notFoundLogger);        
    }

    function initCronjobs() {
        runConfigCronJobs();
    }

    function defaultFiles() {
        initDefaultFolders();
    }

    function initTestApi() {
        app.get('/api', (req, res) => {
            return res.status(200).json({
                result: {

                },
                error: null
            })
        })
    }

    function initRoutes(routes: Router[]) {
        routes.forEach(route => {
            app.use(route);
        });
    }

    async function runner() {
        defaultFiles();
        initCronjobs();
        initMiddlewares();
        initRoutes(routes);
        notFoundLogs();
        initTestApi()
        listener();
    }

    runner();
}
