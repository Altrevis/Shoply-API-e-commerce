// Setup file for Jest tests
import { jest } from '@jest/globals';

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.MAILTRAP_SMTP_USER = 'test-user';
process.env.MAILTRAP_SMTP_PASS = 'test-pass';
process.env.MAIL_FROM = 'test@example.com';
process.env.MAIL_FROM_NAME = 'Test Sender';

// Suppress console logs during tests (optional)
// Uncomment if you want cleaner test output
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// Set test timeout (default is 5000ms)
jest.setTimeout(10000);
