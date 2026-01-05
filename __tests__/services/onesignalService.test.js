import { jest } from '@jest/globals';

// Mock axios avant l'import du service
const mockAxiosPost = jest.fn();
jest.unstable_mockModule('axios', () => ({
  default: {
    post: mockAxiosPost
  }
}));

describe('OneSignal Service', () => {
  const originalEnv = process.env;
  let sendNotification;

  beforeAll(async () => {
    // Import the service after mocking axios
    const module = await import('../../src/services/onesignalService.js');
    sendNotification = module.sendNotification;
  });

  beforeEach(() => {
    // Reset environment variables before each test
    jest.resetModules();
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('sendNotification', () => {
    it('devrait simuler la notification si les variables d\'environnement ne sont pas définies', async () => {
      // Arrange
      delete process.env.ONESIGNAL_APP_ID;
      delete process.env.ONESIGNAL_REST_KEY;

      const notificationData = {
        headings: { en: 'Test Title' },
        contents: { en: 'Test Message' },
        include_player_ids: ['player-123']
      };

      // Act
      const result = await sendNotification(notificationData);

      // Assert
      expect(result).toEqual({ simulated: true });
      expect(mockAxiosPost).not.toHaveBeenCalled();
    });

    it('devrait envoyer une vraie notification si les variables d\'environnement sont définies', async () => {
      // Arrange
      process.env.ONESIGNAL_APP_ID = 'test-app-id';
      process.env.ONESIGNAL_REST_KEY = 'test-rest-key';

      const notificationData = {
        headings: { en: 'Test Title' },
        contents: { en: 'Test Message' },
        include_player_ids: ['player-123']
      };

      const mockResponse = {
        data: {
          id: 'notification-id-123',
          recipients: 1
        }
      };

      mockAxiosPost.mockResolvedValue(mockResponse);

      // Act
      const result = await sendNotification(notificationData);

      // Assert
      expect(mockAxiosPost).toHaveBeenCalledWith(
        'https://onesignal.com/api/v1/notifications',
        {
          app_id: 'test-app-id',
          headings: notificationData.headings,
          contents: notificationData.contents,
          include_player_ids: notificationData.include_player_ids
        },
        {
          headers: {
            Authorization: 'Basic test-rest-key',
            'Content-Type': 'application/json'
          }
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('devrait gérer les erreurs de l\'API OneSignal', async () => {
      // Arrange
      process.env.ONESIGNAL_APP_ID = 'test-app-id';
      process.env.ONESIGNAL_REST_KEY = 'test-rest-key';

      const notificationData = {
        headings: { en: 'Test Title' },
        contents: { en: 'Test Message' },
        include_player_ids: ['player-123']
      };

      const mockError = new Error('Request failed with status code 400');
      mockError.response = {
        data: {
          errors: ['Invalid player IDs']
        }
      };

      mockAxiosPost.mockRejectedValue(mockError);

      // Act & Assert
      await expect(sendNotification(notificationData)).rejects.toThrow('Request failed with status code 400');
      expect(mockAxiosPost).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs réseau', async () => {
      // Arrange
      process.env.ONESIGNAL_APP_ID = 'test-app-id';
      process.env.ONESIGNAL_REST_KEY = 'test-rest-key';

      const notificationData = {
        headings: { en: 'Test Title' },
        contents: { en: 'Test Message' },
        include_player_ids: ['player-123']
      };

      const networkError = new Error('Network Error');
      mockAxiosPost.mockRejectedValue(networkError);

      // Act & Assert
      await expect(sendNotification(notificationData)).rejects.toThrow('Network Error');
    });
  });
});
