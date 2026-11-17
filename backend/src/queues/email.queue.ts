import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const EMAIL_QUEUE_NAME = 'email';

export interface EmailJobData {
  to: string;
  subject: string;
  text: string;
}

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;
const FAILED_JOBS_TO_KEEP = 100;

export const emailQueue = new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: MAX_ATTEMPTS,
    backoff: { type: 'exponential', delay: RETRY_DELAY_MS },
    removeOnComplete: true,
    removeOnFail: FAILED_JOBS_TO_KEEP,
  },
});

export const enqueueEmail = (email: EmailJobData) => emailQueue.add('send-email', email);