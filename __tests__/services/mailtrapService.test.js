import { jest } from '@jest/globals';

// Mock nodemailer before importing the service
const mockSendMail = jest.fn();
const mockTransport = {
  sendMail: mockSendMail
};

jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: jest.fn(() => mockTransport)
  }
}));

describe('Mailtrap Service', () => {
  const originalEnv = process.env;
  let sendEmail;

  beforeAll(async () => {
    // Set up environment variables before importing
    process.env.MAILTRAP_SMTP_USER = 'test-user';
    process.env.MAILTRAP_SMTP_PASS = 'test-pass';
    process.env.MAILTRAP_SMTP_HOST = 'sandbox.smtp.mailtrap.io';
    process.env.MAILTRAP_SMTP_PORT = '2525';
    process.env.MAIL_FROM = 'test@example.com';
    process.env.MAIL_FROM_NAME = 'Test Sender';

    // Import the service after mocking
    const module = await import('../../src/services/mailtrapService.js');
    sendEmail = module.sendEmail;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('sendEmail', () => {
    it('devrait envoyer un email avec succès', async () => {
      // Arrange
      const mockInfo = {
        messageId: '<test-message-id@example.com>',
        accepted: ['recipient@example.com']
      };
      
      mockSendMail.mockResolvedValue(mockInfo);

      // Act
      const result = await sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body',
        'Test Category'
      );

      // Assert
      expect(mockSendMail).toHaveBeenCalledWith({
        from: 'Test Sender <test@example.com>',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test Body',
        headers: { 'X-Category': 'Test Category' }
      });
      expect(result).toEqual(mockInfo);
    });

    it('devrait utiliser la catégorie par défaut si non fournie', async () => {
      // Arrange
      mockSendMail.mockResolvedValue({ messageId: 'test-id' });

      // Act
      await sendEmail(
        'recipient@example.com',
        'Test Subject',
        'Test Body'
      );

      // Assert
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-Category': 'Integration Test' }
        })
      );
    });

    it('devrait gérer les erreurs d\'envoi', async () => {
      // Arrange
      const mockError = new Error('SMTP connection failed');
      mockSendMail.mockRejectedValue(mockError);

      // Act & Assert
      await expect(
        sendEmail('recipient@example.com', 'Test Subject', 'Test Body')
      ).rejects.toThrow('SMTP connection failed');
      
      expect(mockSendMail).toHaveBeenCalled();
    });
  });
});
