import { app } from './app';
import { env } from './config/config-env';
import { sequelize } from './database/sequelize';
import { startEmailWorker, verifySmtpConnection } from './queues/email.worker';

const start = async()=>{
    await sequelize.authenticate();
    await verifySmtpConnection();
    startEmailWorker();

    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
}

start().catch((err) => {
    console.error('Failed to start the server:', err);
    process.exit(1);
});