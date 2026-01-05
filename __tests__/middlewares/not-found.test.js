import { jest } from '@jest/globals';

describe('Not Found Middleware', () => {
  let notFoundMiddleware;
  let req, res, next;

  beforeEach(async () => {
    // Import the not-found middleware
    const module = await import('../../src/middlewares/not-found.js');
    notFoundMiddleware = module.default;

    // Setup mock objects
    req = {
      url: '/api/non-existent',
      method: 'GET'
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    
    next = jest.fn();
  });

  it('devrait retourner un statut 404', () => {
    // Act
    notFoundMiddleware(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('devrait retourner un message "Route not found"', () => {
    // Act
    notFoundMiddleware(req, res, next);

    // Assert
    expect(res.json).toHaveBeenCalledWith({
      message: 'Route not found'
    });
  });

  it('ne devrait pas appeler next()', () => {
    // Act
    notFoundMiddleware(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
  });

  it('devrait fonctionner pour différentes méthodes HTTP', () => {
    // Test POST
    req.method = 'POST';
    notFoundMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);

    // Reset mocks
    jest.clearAllMocks();

    // Test DELETE
    req.method = 'DELETE';
    notFoundMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('devrait fonctionner pour différentes URLs', () => {
    // Test different URLs
    const urls = ['/api/users/999', '/unknown', '/api/invalid/route'];

    urls.forEach(url => {
      jest.clearAllMocks();
      req.url = url;
      
      notFoundMiddleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Route not found'
      });
    });
  });
});
