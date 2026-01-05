import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
process.env.MAILTRAP_SMTP_USER = 'test-user';
process.env.MAILTRAP_SMTP_PASS = 'test-pass';
process.env.MAIL_FROM = 'test@example.com';
process.env.MAIL_FROM_NAME = 'Test Sender';

jest.setTimeout(10000);
