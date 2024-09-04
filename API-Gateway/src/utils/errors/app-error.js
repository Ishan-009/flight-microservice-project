class AppError extends Error {
  constructor(message, statusCode, handled = false) {
    super(message);
    {
      this.statusCode = statusCode;
      this.explanation = message;
      this.handled = handled;
    }
  }
}

module.exports = AppError;
