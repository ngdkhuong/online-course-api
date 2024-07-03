import App from '@/app';
import { connect, connection } from 'mongoose';
import { dbConnection } from '@/Databases';
import * as http from 'http';
import { logger, stream } from '@/Utils/logger';

try {
    const app = new App();

    (async function connectToDatabase() {
        connect(dbConnection.url, dbConnection.options)
            .then(() => {
                const server = http.createServer(app.app);

                server.listen(app.port, () => {
                    logger.info;
                });
            })
            .catch();
    })();
} catch (err) {
    console.log(err);
}
