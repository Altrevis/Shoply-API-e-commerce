import { jest } from '@jest/globals';

describe('Error Handler Middleware', () => {
  let errorHandler;
  let req, res, next, consoleErrorSpy;

  beforeEach(async () => {
    // Import the error handler
    const module = await import('../../src/middlewares/error-handler.js');
    errorHandler = module.default;

    // Mock console.error
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Setup mock objects
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('devrait retourner un statut 500 par défaut avec le message d\'erreur', () => {
    // Arrange
    const error = new Error('Something went wrong');

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong'
    });
  });

  it('devrait utiliser le statut personnalisé de l\'erreur', () => {
    // Arrange
    const error = new Error('Not found');
    error.status = 404;

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Not found'
    });
  });

  it('devrait retourner "Internal Server Error" si aucun message n\'est fourni', () => {
    // Arrange
    const error = new Error();
    error.message = '';

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.json).toHaveBeenCalledWith({
      message: 'Internal Server Error'
    });
  });

  it('devrait inclure la stack trace en mode développement', () => {
    // Arrange
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at test.js:1:1';

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
      stack: error.stack
    });

    // Cleanup
    process.env.NODE_ENV = originalEnv;
  });

  it('ne devrait pas inclure la stack trace en production', () => {
    // Arrange
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at test.js:1:1';

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error'
    });

    // Cleanup
    process.env.NODE_ENV = originalEnv;
  });

  it('devrait gérer les erreurs avec des propriétés personnalisées', () => {
    // Arrange
    const error = new Error('Validation error');
    error.status = 422;
    error.errors = ['Field1 is required', 'Field2 is invalid'];

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validation error'
      })
    );
  });

  it('devrait logger l\'erreur dans la console', () => {
    // Arrange
    const error = new Error('Test error');
    error.stack = 'Stack trace here';

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalledWith('Stack trace here');
  });
});
