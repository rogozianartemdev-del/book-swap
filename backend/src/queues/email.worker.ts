import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import { env } from '../config/config-env';
import { redisConnection } from '../config/redis';
import { EMAIL_QUEUE_NAME, EmailJobData } from './email.queue';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,

  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const verifySmtpConnection = async () => {
    await transporter.verify();
    console.log('SMTP server is ready');
  };

export const startEmailWorker = () => {
  const worker = new Worker<EmailJobData>(
    EMAIL_QUEUE_NAME,
    async (job) => {
      await transporter.sendMail({ from: env.MAIL_FROM, ...job.data });
    },
    { connection: redisConnection },
  );

  worker.on('failed', (job, error) => {
    console.error(`Email job ${job?.id} failed: ${error.message}`);
  });

  return worker;
};